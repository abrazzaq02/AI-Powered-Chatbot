import React, { useRef, useState } from 'react'
import { FiUpload, FiFile, FiX } from 'react-icons/fi'

export default function FileUpload({ onUpload, uploading }) {
  const [dragOver, setDragOver] = useState(false)
  const [pending, setPending] = useState(null)
  const inputRef = useRef()

  const handleFiles = (files) => {
    const file = files[0]
    if (!file) return
    const ext = file.name.split('.').pop().toLowerCase()
    if (!['pdf', 'docx', 'txt'].includes(ext)) {
      alert('Only PDF, DOCX, and TXT files are supported')
      return
    }
    setPending(file)
    onUpload(file)
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
      onClick={() => inputRef.current?.click()}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed cursor-pointer text-xs transition-colors ${
        dragOver ? 'border-brand-500 bg-brand-500/5' : 'border-gray-300 dark:border-gray-700 hover:border-brand-400'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {uploading ? (
        <span className="text-gray-400">Uploading...</span>
      ) : pending ? (
        <>
          <FiFile size={13} /> <span className="truncate max-w-[120px]">{pending.name}</span>
          <FiX size={13} className="ml-1" onClick={(e) => { e.stopPropagation(); setPending(null) }} />
        </>
      ) : (
        <>
          <FiUpload size={13} /> <span className="text-gray-400">Attach PDF / DOCX / TXT</span>
        </>
      )}
    </div>
  )
}
