import React from 'react'

export function TypingIndicator() {
  return (
    <div className="flex gap-3 py-4">
      <div className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center text-sm font-semibold shrink-0">N</div>
      <div className="glass px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
        <span className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
        <span className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
        <span className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
      </div>
    </div>
  )
}

export function ChatSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <div className="w-8 h-8 skeleton rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-3 skeleton w-3/4" />
            <div className="h-3 skeleton w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function Spinner({ size = 20 }) {
  return (
    <div
      className="border-2 border-brand-500 border-t-transparent rounded-full animate-spin"
      style={{ width: size, height: size }}
    />
  )
}
