import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSun, FiMoon, FiMonitor, FiLogOut, FiUser } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const cycleTheme = () => {
    const order = ['light', 'dark', 'system']
    setTheme(order[(order.indexOf(theme) + 1) % order.length])
  }

  const ThemeIcon = theme === 'light' ? FiSun : theme === 'dark' ? FiMoon : FiMonitor

  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 glass">
      <div />
      <div className="flex items-center gap-3">
        <button onClick={cycleTheme} title={`Theme: ${theme}`} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <ThemeIcon size={18} />
        </button>
        <div className="relative">
          <button onClick={() => setMenuOpen((v) => !v)} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full btn-gradient flex items-center justify-center font-semibold text-sm overflow-hidden">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                user?.name?.[0]?.toUpperCase() || 'U'
              )}
            </div>
          </button>
          {menuOpen && (
            <div
              onMouseLeave={() => setMenuOpen(false)}
              className="absolute right-0 mt-2 w-48 rounded-xl glass shadow-xl py-2 z-50 animate-fade-in"
            >
              <p className="px-4 py-1 text-sm font-medium truncate">{user?.name}</p>
              <p className="px-4 pb-2 text-xs text-gray-400 truncate">{user?.email}</p>
              <hr className="border-gray-200 dark:border-gray-800 my-1" />
              <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                <FiUser size={14} /> Profile
              </Link>
              <button
                onClick={() => { logout(); navigate('/login') }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiLogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
