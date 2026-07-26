import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiAtSign } from 'react-icons/fi'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', confirm_password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const res = await api.post('/auth/signup', form)
      login(res.data.access_token, res.data.user)
      navigate('/dashboard')
    } catch (err) {
      const detail = err.response?.data?.detail
      setError(Array.isArray(detail) ? detail[0]?.msg : detail || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="w-full max-w-sm glass rounded-2xl p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center font-bold">N</div>
          <span className="font-bold text-lg">NeuroChat AI</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Create your account</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Start chatting with your own AI in seconds.</p>

        {error && <div className="mb-4 text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <Field icon={FiUser} placeholder="Full name" value={form.name} onChange={update('name')} />
          <Field icon={FiAtSign} placeholder="Username" value={form.username} onChange={update('username')} />
          <Field icon={FiMail} placeholder="Email" type="email" value={form.email} onChange={update('email')} />
          <Field icon={FiLock} placeholder="Password" type="password" value={form.password} onChange={update('password')} />
          <Field icon={FiLock} placeholder="Confirm password" type="password" value={form.confirm_password} onChange={update('confirm_password')} />

          <button disabled={loading} type="submit" className="w-full py-2.5 rounded-xl btn-gradient font-semibold text-sm disabled:opacity-60">
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-brand-500 font-medium hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  )
}

function Field({ icon: Icon, ...props }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/60">
      <Icon className="text-gray-400" size={16} />
      <input required className="bg-transparent outline-none text-sm w-full" {...props} />
    </div>
  )
}
