import React, { useState, useRef } from 'react'
import { FiMic, FiMicOff } from 'react-icons/fi'

// Uses the browser's built-in Web Speech API (no backend needed).
// Supported in Chrome/Edge; falls back gracefully elsewhere.
export default function VoiceInput({ onResult }) {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  const toggleListening = () => {
    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser. Try Chrome or Edge.')
      return
    }

    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  return (
    <button
      type="button"
      onClick={toggleListening}
      title="Voice input"
      className={`p-2.5 rounded-xl transition-colors ${
        listening ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'
      }`}
    >
      {listening ? <FiMicOff size={18} /> : <FiMic size={18} />}
    </button>
  )
}

// Text-to-speech helper, importable anywhere in the app.
export function speak(text) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 1
  window.speechSynthesis.speak(utterance)
}
