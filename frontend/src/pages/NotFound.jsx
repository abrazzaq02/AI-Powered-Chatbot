import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 text-center px-4">
      <h1 className="text-7xl font-extrabold bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent mb-2">404</h1>
      <p className="text-lg font-medium mb-2">Lost in the neural network</p>
      <p className="text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-5 py-2.5 rounded-xl btn-gradient font-medium text-sm">Back to Home</Link>
    </div>
  )
}
