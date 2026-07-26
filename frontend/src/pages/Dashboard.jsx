import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMessageSquare, FiSend, FiCpu, FiFileText, FiClock } from 'react-icons/fi'
import api from '../api/axios'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [chats, setChats] = useState([])
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/dashboard/stats').then((res) => setStats(res.data))
    api.get('/chats').then((res) => setChats(res.data))
  }, [])

  const cards = stats ? [
    { label: 'Total Chats', value: stats.total_chats, icon: FiMessageSquare },
    { label: 'Messages Sent', value: stats.messages_sent, icon: FiSend },
    { label: 'AI Responses', value: stats.ai_responses, icon: FiCpu },
    { label: 'Documents Uploaded', value: stats.documents_uploaded, icon: FiFileText },
  ] : []

  return (
    <div className="h-screen flex">
      <Sidebar
        chats={chats}
        activeChatId={null}
        onNewChat={() => navigate('/chat')}
        onSelectChat={(id) => navigate(`/chat/${id}`)}
        onDeleteChat={async (id) => { await api.delete(`/chats/${id}`); setChats((p) => p.filter((c) => c.id !== id)) }}
        onRenameChat={async (id, title) => { await api.put(`/chats/${id}/rename`, { title }); setChats((p) => p.map((c) => c.id === id ? { ...c, title } : c)) }}
        onTogglePin={async (id) => { const res = await api.put(`/chats/${id}/pin`); setChats((p) => p.map((c) => c.id === id ? res.data : c)) }}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Here's a snapshot of your NeuroChat AI activity.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {cards.map((c) => (
              <div key={c.label} className="glass rounded-2xl p-5 animate-fade-in">
                <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center mb-3">
                  <c.icon size={18} />
                </div>
                <p className="text-2xl font-bold">{c.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{c.label}</p>
              </div>
            ))}
          </div>

          {stats?.last_login && (
            <div className="glass rounded-2xl p-5 flex items-center gap-3 mb-10 max-w-md">
              <FiClock className="text-brand-500" />
              <div>
                <p className="text-sm font-medium">Last login</p>
                <p className="text-xs text-gray-400">{new Date(stats.last_login).toLocaleString()}</p>
              </div>
            </div>
          )}

          <h2 className="font-semibold mb-3">Recent Conversations</h2>
          <div className="space-y-2 max-w-2xl">
            {chats.slice(0, 6).map((c) => (
              <div key={c.id} onClick={() => navigate(`/chat/${c.id}`)}
                className="glass rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:-translate-y-0.5 transition-transform">
                <span className="text-sm truncate">{c.title}</span>
                <span className="text-xs text-gray-400">{new Date(c.updated_at).toLocaleDateString()}</span>
              </div>
            ))}
            {chats.length === 0 && <p className="text-sm text-gray-400">No conversations yet. Start a new chat!</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
