import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiZap, FiFileText, FiMic, FiShield, FiCode, FiMoon } from 'react-icons/fi'

const features = [
  { icon: FiZap, title: 'Real-time Streaming', desc: 'Watch responses generate live, just like ChatGPT.' },
  { icon: FiFileText, title: 'Document Q&A', desc: 'Upload PDFs, DOCX, or TXT and ask questions instantly.' },
  { icon: FiMic, title: 'Voice Input & Output', desc: 'Speak your questions and hear the answers back.' },
  { icon: FiShield, title: 'Secure by Design', desc: 'JWT auth, hashed passwords, and protected routes.' },
  { icon: FiCode, title: 'Code Highlighting', desc: 'Beautifully formatted code blocks in every response.' },
  { icon: FiMoon, title: 'Dark & Light Mode', desc: 'A polished interface that adapts to your system.' },
]

const testimonials = [
  { name: 'Ayesha K.', role: 'Frontend Developer', text: 'Feels as polished as ChatGPT — great reference project for my portfolio.' },
  { name: 'Bilal R.', role: 'CS Student', text: 'The document Q&A feature saved me hours while studying for finals.' },
  { name: 'Sara M.', role: 'Freelancer', text: 'Clients were impressed the moment I shared the live demo link.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center font-bold">N</div>
          <span className="font-bold text-xl">NeuroChat AI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 text-sm font-medium hover:text-brand-500">Login</Link>
          <Link to="/signup" className="px-4 py-2 text-sm font-medium rounded-lg btn-gradient">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 md:px-12 pt-16 pb-24 text-center max-w-4xl mx-auto">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-brand-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          Your AI Assistant, <span className="bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">Reimagined</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="relative text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Chat, upload documents, and talk to your own locally-hosted AI — with a ChatGPT-grade interface built for speed and clarity.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex items-center justify-center gap-4"
        >
          <Link to="/signup" className="px-6 py-3 rounded-xl btn-gradient font-semibold">Start Chatting Free</Link>
          <Link to="/login" className="px-6 py-3 rounded-xl glass font-semibold">I have an account</Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Everything you need, built in</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-6 hover:-translate-y-1 transition-transform"
            >
              <div className="w-11 h-11 rounded-xl btn-gradient flex items-center justify-center mb-4">
                <f.icon size={20} />
              </div>
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 md:px-12 py-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">Simple Pricing</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10">Demo pricing — self-hosted, so it's free forever.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-8">
            <h3 className="font-semibold text-lg mb-1">Free</h3>
            <p className="text-3xl font-bold mb-4">$0</p>
            <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2 text-left">
              <li>✓ Unlimited chats</li>
              <li>✓ Document Q&A</li>
              <li>✓ Voice input & output</li>
            </ul>
          </div>
          <div className="rounded-2xl p-8 btn-gradient">
            <h3 className="font-semibold text-lg mb-1">Pro (Demo)</h3>
            <p className="text-3xl font-bold mb-4">$9<span className="text-base font-normal">/mo</span></p>
            <ul className="text-sm space-y-2 text-left opacity-90">
              <li>✓ Everything in Free</li>
              <li>✓ Priority model access</li>
              <li>✓ Team workspaces</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Loved by builders</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6">
              <p className="text-sm mb-4">"{t.text}"</p>
              <p className="font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-gray-400">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-10 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} NeuroChat AI. Built with React, FastAPI & Ollama.
      </footer>
    </div>
  )
}
