import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useTheme } from '../context/ThemeContext'

export default function Settings() {
  const [settings, setSettings] = useState(null)
  const [chats, setChats] = useState([])
  const [saved, setSaved] = useState(false)
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/settings').then((res) => setSettings(res.data))
    api.get('/chats').then((res) => setChats(res.data))
  }, [])

  const update = async (field, value) => {
    const updated = { ...settings, [field]: value }
    setSettings(updated)
    await api.put('/settings', { [field]: value })
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
    if (field === 'theme') setTheme(value)
  }

  const exportChats = async () => {
    const all = await Promise.all(chats.map(async (c) => {
      const res = await api.get(`/chats/${c.id}/messages`)
      return { title: c.title, messages: res.data }
    }))
    const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'neurochat-export.json'
    a.click()
  }

  const deleteHistory = async () => {
    if (!confirm('Delete all chat history? This cannot be undone.')) return
    await Promise.all(chats.map((c) => api.delete(`/chats/${c.id}`)))
    setChats([])
  }

  if (!settings) return null

  return (
    <div className="h-screen flex">
      <Sidebar
        chats={chats} activeChatId={null}
        onNewChat={() => navigate('/chat')}
        onSelectChat={(id) => navigate(`/chat/${id}`)}
        onDeleteChat={async (id) => { await api.delete(`/chats/${id}`); setChats((p) => p.filter((c) => c.id !== id)) }}
        onRenameChat={async (id, title) => { await api.put(`/chats/${id}/rename`, { title }); setChats((p) => p.map((c) => c.id === id ? { ...c, title } : c)) }}
        onTogglePin={async (id) => { const res = await api.put(`/chats/${id}/pin`); setChats((p) => p.map((c) => c.id === id ? res.data : c)) }}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-6 md:p-10 max-w-2xl">
          <h1 className="text-2xl font-bold mb-1">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Customize your NeuroChat AI experience. {saved && <span className="text-green-500">Saved ✓</span>}</p>

          <Section title="Appearance">
            <SettingRow label="Theme">
              <select value={theme} onChange={(e) => update('theme', e.target.value)} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm outline-none">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </SettingRow>
            <SettingRow label="Font Size">
              <select value={settings.font_size} onChange={(e) => update('font_size', e.target.value)} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm outline-none">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </SettingRow>
          </Section>

          <Section title="AI Model">
            <SettingRow label="Model">
              <select value={settings.ai_model} onChange={(e) => update('ai_model', e.target.value)} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm outline-none">
                <option value="llama3.2">Llama 3.2 (Ollama)</option>
                <option value="llama3.1">Llama 3.1</option>
                <option value="mistral">Mistral</option>
                <option value="phi3">Phi-3</option>
              </select>
            </SettingRow>
            <p className="text-xs text-gray-400 -mt-2">Model must be pulled locally via `ollama pull &lt;model&gt;`.</p>
          </Section>

          <Section title="Language">
            <SettingRow label="Language">
              <select value={settings.language} onChange={(e) => update('language', e.target.value)} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm outline-none">
                <option value="en">English</option>
                <option value="ur">اردو (Urdu)</option>
                <option value="es">Español</option>
              </select>
            </SettingRow>
          </Section>

          <Section title="Data">
            <button onClick={exportChats} className="w-full text-left px-4 py-3 rounded-xl glass hover:-translate-y-0.5 transition-transform text-sm mb-2">
              Export all chats (JSON)
            </button>
            <button onClick={deleteHistory} className="w-full text-left px-4 py-3 rounded-xl glass hover:-translate-y-0.5 transition-transform text-sm text-red-500">
              Delete all chat history
            </button>
          </Section>
        </div>
      </div>

    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-400">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function SettingRow({ label, children }) {
  return (
    <div className="flex items-center justify-between glass rounded-xl px-4 py-3">
      <span className="text-sm">{label}</span>
      {children}
    </div>
  )
}
