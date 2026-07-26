import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { FiCopy, FiCheck, FiRefreshCw, FiUser } from 'react-icons/fi'

export default function Message({ role, content, onRegenerate, isLast }) {
  const [copied, setCopied] = useState(false)
  const isUser = role === 'user'

  const copyText = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={`flex gap-3 py-4 animate-slide-up ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold ${
        isUser ? 'bg-gray-300 dark:bg-gray-700' : 'btn-gradient'
      }`}>
        {isUser ? <FiUser size={14} /> : 'N'}
      </div>

      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-brand-500 text-white rounded-tr-sm'
            : 'glass rounded-tl-sm'
        }`}>
          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" className="rounded-lg !text-xs my-2">
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded text-xs">{children}</code>
                )
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {!isUser && content && (
          <div className="flex items-center gap-2 mt-1 px-1">
            <button onClick={copyText} className="text-gray-400 hover:text-brand-500 p-1">
              {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
            </button>
            {isLast && (
              <button onClick={onRegenerate} className="text-gray-400 hover:text-brand-500 p-1">
                <FiRefreshCw size={13} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
