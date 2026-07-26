import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiSend, FiSquare } from 'react-icons/fi'
import api from '../api/axios'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Message from '../components/Message'
import { TypingIndicator } from '../components/Loader'
import FileUpload from '../components/FileUpload'
import VoiceInput, { speak } from '../components/VoiceInput'

export default function Chat() {
  const { chatId } = useParams()
  const navigate = useNavigate()

  const [chats, setChats] = useState([])
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamedText, setStreamedText] = useState('')
  const [uploading, setUploading] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(false)

  const abortRef = useRef(null)
  const bottomRef = useRef(null)
  const activeChatId = chatId ? parseInt(chatId, 10) : null

  const loadChats = useCallback(async () => {
    const res = await api.get('/chats')
    setChats(res.data)
  }, [])

  useEffect(() => { loadChats() }, [loadChats])

  useEffect(() => {
    if (!activeChatId) {
      setMessages([])
      return
    }
    api.get(`/chats/${activeChatId}/messages`).then((res) => setMessages(res.data))
  }, [activeChatId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamedText])

  const handleNewChat = () => navigate('/chat')

  const handleSelectChat = (id) => navigate(`/chat/${id}`)

  const handleDeleteChat = async (id) => {
    await api.delete(`/chats/${id}`)
    setChats((prev) => prev.filter((c) => c.id !== id))
    if (activeChatId === id) navigate('/chat')
  }

  const handleRenameChat = async (id, title) => {
    await api.put(`/chats/${id}/rename`, { title })
    setChats((prev) => prev.map((c) => (c.id === id ? { ...c, title } : c)))
  }

  const handleTogglePin = async (id) => {
    const res = await api.put(`/chats/${id}/pin`)
    setChats((prev) => prev.map((c) => (c.id === id ? res.data : c)))
  }

  const sendMessage = async (overrideText) => {
    const text = (overrideText ?? input).trim()
    if (!text || streaming) return

    setInput('')
    setMessages((prev) => [...prev, { id: `tmp-${Date.now()}`, role: 'user', content: text }])
    setStreaming(true)
    setStreamedText('')

    try {
      const token = localStorage.getItem('nc_token')
      const controller = new AbortController()
      abortRef.current = controller

      const response = await fetch('http://localhost:8000/api/chats/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ chat_id: activeChatId, content: text }),
        signal: controller.signal,
      })

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let fullText = ''
      let newChatId = activeChatId

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n\n')
        buffer = lines.pop()

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const payload = JSON.parse(line.slice(6))
          if (payload.type === 'meta') {
            newChatId = payload.chat_id
            if (!activeChatId) navigate(`/chat/${newChatId}`, { replace: true })
          } else if (payload.type === 'chunk') {
            fullText += payload.content
            setStreamedText(fullText)
          } else if (payload.type === 'done') {
            setMessages((prev) => [...prev, { id: `ai-${Date.now()}`, role: 'assistant', content: fullText }])
            setStreamedText('')
            if (ttsEnabled) speak(fullText)
            loadChats()
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setMessages((prev) => [...prev, { id: `err-${Date.now()}`, role: 'assistant', content: '⚠️ Something went wrong. Please try again.' }])
      }
    } finally {
      setStreaming(false)
      abortRef.current = null
    }
  }

  const stopGenerating = () => abortRef.current?.abort()

  const regenerate = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user')
    if (lastUser) {
      setMessages((prev) => prev.filter((m) => m.role !== 'assistant' || m.id !== prev[prev.length - 1]?.id))
      sendMessage(lastUser.content)
    }
  }

  const handleUpload = async (file) => {
    if (!activeChatId) {
      alert('Start a chat first, then attach a file to it.')
      return
    }
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('chat_id', activeChatId)
    try {
      await api.post('/files/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      setMessages((prev) => [...prev, { id: `sys-${Date.now()}`, role: 'assistant', content: `📄 **${file.name}** uploaded. You can now ask questions about it.` }])
    } catch (err) {
      alert(err.response?.data?.detail || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="h-screen flex">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onRenameChat={handleRenameChat}
        onTogglePin={handleTogglePin}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="flex-1 overflow-y-auto px-4 md:px-0">
          <div className="max-w-3xl mx-auto py-4">
            {messages.length === 0 && !streamedText && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-16 h-16 rounded-2xl btn-gradient flex items-center justify-center text-2xl font-bold mb-4">N</div>
                <h2 className="text-xl font-semibold mb-1">How can I help you today?</h2>
                <p className="text-sm text-gray-400">Ask anything, upload a document, or use your voice.</p>
              </div>
            )}

            {messages.map((m, i) => (
              <Message
                key={m.id}
                role={m.role}
                content={m.content}
                isLast={i === messages.length - 1 && m.role === 'assistant'}
                onRegenerate={regenerate}
              />
            ))}

            {streaming && streamedText && <Message role="assistant" content={streamedText} />}
            {streaming && !streamedText && <TypingIndicator />}

            <div ref={bottomRef} />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="max-w-3xl mx-auto space-y-2">
            <div className="flex items-center gap-2">
              <FileUpload onUpload={handleUpload} uploading={uploading} />
              <label className="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer select-none">
                <input type="checkbox" checked={ttsEnabled} onChange={(e) => setTtsEnabled(e.target.checked)} />
                Read replies aloud
              </label>
            </div>

            <div className="flex items-end gap-2 glass rounded-2xl p-2">
              <VoiceInput onResult={(text) => setInput((prev) => (prev ? prev + ' ' + text : text))} />
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                placeholder="Message NeuroChat AI..."
                className="flex-1 bg-transparent outline-none resize-none text-sm py-2 max-h-32"
              />
              {streaming ? (
                <button onClick={stopGenerating} className="p-2.5 rounded-xl bg-red-500 text-white">
                  <FiSquare size={16} />
                </button>
              ) : (
                <button onClick={() => sendMessage()} disabled={!input.trim()} className="p-2.5 rounded-xl btn-gradient disabled:opacity-40">
                  <FiSend size={16} />
                </button>
              )}
            </div>
            <p className="text-[11px] text-center text-gray-400">NeuroChat AI can make mistakes. Verify important information.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
