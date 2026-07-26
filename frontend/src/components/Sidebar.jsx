import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiPlus, FiSearch, FiTrash2, FiEdit2, FiStar, FiSettings, FiMessageSquare, FiGrid } from 'react-icons/fi'

export default function Sidebar({ chats, activeChatId, onNewChat, onSelectChat, onDeleteChat, onRenameChat, onTogglePin }) {
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const navigate = useNavigate()

  const filtered = chats.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
  const pinned = filtered.filter((c) => c.pinned)
  const unpinned = filtered.filter((c) => !c.pinned)

  const startEdit = (chat) => {
    setEditingId(chat.id)
    setEditValue(chat.title)
  }

  const submitEdit = (id) => {
    if (editValue.trim()) onRenameChat(id, editValue.trim())
    setEditingId(null)
  }

  const renderChat = (chat) => (
    <div
      key={chat.id}
      className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
        activeChatId === chat.id
          ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800/70 text-gray-700 dark:text-gray-300'
      }`}
      onClick={() => onSelectChat(chat.id)}
    >
      <FiMessageSquare className="shrink-0 opacity-60" size={14} />
      {editingId === chat.id ? (
        <input
          autoFocus
          className="flex-1 bg-transparent border-b border-brand-400 outline-none text-sm"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => submitEdit(chat.id)}
          onKeyDown={(e) => e.key === 'Enter' && submitEdit(chat.id)}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span className="flex-1 truncate">{chat.title}</span>
      )}
      <div className="hidden group-hover:flex items-center gap-1">
        <button onClick={(e) => { e.stopPropagation(); onTogglePin(chat.id) }} className="p-1 hover:text-yellow-500">
          <FiStar size={13} fill={chat.pinned ? 'currentColor' : 'none'} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); startEdit(chat) }} className="p-1 hover:text-brand-500">
          <FiEdit2 size={13} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDeleteChat(chat.id) }} className="p-1 hover:text-red-500">
          <FiTrash2 size={13} />
        </button>
      </div>
    </div>
  )

  return (
    <aside className="w-72 shrink-0 h-full flex flex-col border-r border-gray-200 dark:border-gray-800 glass">
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center font-bold text-sm">N</div>
        <span className="font-semibold text-lg">NeuroChat AI</span>
      </div>

      <div className="px-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl btn-gradient font-medium text-sm mb-3"
        >
          <FiPlus /> New Chat
        </button>
      </div>

      <div className="px-3 mb-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800/60">
          <FiSearch className="text-gray-400" size={14} />
          <input
            className="bg-transparent outline-none text-sm w-full"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-3">
        {pinned.length > 0 && (
          <>
            <p className="text-xs uppercase text-gray-400 px-2 pt-2 pb-1">Pinned</p>
            {pinned.map(renderChat)}
          </>
        )}
        <p className="text-xs uppercase text-gray-400 px-2 pt-3 pb-1">History</p>
        {unpinned.length === 0 && pinned.length === 0 && (
          <p className="text-xs text-gray-400 px-2 py-4 text-center">No chats yet — start a new one!</p>
        )}
        {unpinned.map(renderChat)}
      </div>

      <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
        <NavLink to="/dashboard" className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive ? 'text-brand-500' : 'text-gray-600 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-800/70`}>
          <FiGrid size={15} /> Dashboard
        </NavLink>
        <NavLink to="/settings" className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive ? 'text-brand-500' : 'text-gray-600 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-800/70`}>
          <FiSettings size={15} /> Settings
        </NavLink>
      </div>
    </aside>
  )
}
