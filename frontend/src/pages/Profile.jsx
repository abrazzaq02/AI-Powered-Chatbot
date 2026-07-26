import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

export default function Profile() {
  const { user, updateUser, logout } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [username, setUsername] = useState(user?.username || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [chats, setChats] = useState([])
  const navigate = useNavigate()

  useEffect(() => { api.get('/chats').then((res) => setChats(res.data)) }, [])

  const saveProfile = async (e) => {
    e.preventDefault()
    const res = await api.put('/auth/me', { name, username })
    updateUser(res.data)
    setMsg('Profile updated ✓')
    setTimeout(() => setMsg(''), 2000)
  }

  const changePassword = async (e) => {
    e.preventDefault()
    try {
      await api.post('/auth/change-password', { current_password: currentPassword, new_password: newPassword })
      setMsg('Password changed ✓')
      setCurrentPassword('')
      setNewPassword('')
    } catch (err) {
      setMsg(err.response?.data?.detail || 'Failed to change password')
    }
    setTimeout(() => setMsg(''), 2500)
  }

  const deleteAccount = async () => {
    if (!confirm('This will permanently delete your account and all chats. Continue?')) return
    await api.delete('/auth/me')
    logout()
    navigate('/login')
  }

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
        <div className="flex-1 overflow-y-auto p-6 md:p-10 max-w-xl">
          <h1 className="text-2xl font-bold mb-1">Profile</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Manage your account details.</p>

          {msg && <div className="mb-4 text-sm text-green-500 bg-green-500/10 px-3 py-2 rounded-lg">{msg}</div>}

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full btn-gradient flex items-center justify-center text-xl font-bold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={saveProfile} className="glass rounded-2xl p-5 space-y-3 mb-6">
            <h2 className="font-semibold text-sm mb-1">Edit Profile</h2>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm outline-none" />
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm outline-none" />
            <button type="submit" className="px-4 py-2 rounded-lg btn-gradient text-sm font-medium">Save Changes</button>
          </form>

          <form onSubmit={changePassword} className="glass rounded-2xl p-5 space-y-3 mb-6">
            <h2 className="font-semibold text-sm mb-1">Change Password</h2>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current password" required
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm outline-none" />
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" required
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm outline-none" />
            <button type="submit" className="px-4 py-2 rounded-lg btn-gradient text-sm font-medium">Update Password</button>
          </form>

          <div className="glass rounded-2xl p-5 border border-red-500/20">
            <h2 className="font-semibold text-sm mb-1 text-red-500">Danger Zone</h2>
            <p className="text-xs text-gray-400 mb-3">Deleting your account removes all chats and data permanently.</p>
            <button onClick={deleteAccount} className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  )
}
