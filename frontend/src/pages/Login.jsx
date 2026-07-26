import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock } from 'react-icons/fi'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/auth/login', { email, password, remember_me: remember })
      login(res.data.access_token, res.data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="w-full max-w-sm glass rounded-2xl p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center font-bold">N</div>
          <span className="font-bold text-lg">NeuroChat AI</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Log in to continue your conversations.</p>

        {error && <div className="mb-4 text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/60">
            <FiMail className="text-gray-400" size={16} />
            <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none text-sm w-full" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/60">
            <FiLock className="text-gray-400" size={16} />
            <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none text-sm w-full" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>
            <span className="text-brand-500 cursor-pointer hover:underline">Forgot password?</span>
          </div>

          <button disabled={loading} type="submit" className="w-full py-2.5 rounded-xl btn-gradient font-semibold text-sm disabled:opacity-60">
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500 dark:text-gray-400">
          Don't have an account? <Link to="/signup" className="text-brand-500 font-medium hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  )
}
