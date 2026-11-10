import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

import FloatingBackground from './components/FloatingBackground'
import CustomCursor, { useFinePointer } from './components/CustomCursor'
import PortfolioNav from './components/PortfolioNav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

/**
 * Ayesha Noor — a dreamy pink-aesthetic animated portfolio.
 * Self-contained: every effect is local, light on the main thread,
 * and fully respects prefers-reduced-motion.
 */
export default function Portfolio() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 460)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.title = 'Ayesha Noor — Creative Designer & Developer 💗'
    return () => {
      document.title = 'NeuroChat AI'
    }
  }, [])

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }, [reduce])

  return (
    <div className={`portfolio-root relative min-h-screen ${fine && !reduce ? 'pf-cursor-on' : ''}`}>
      <FloatingBackground />
      <CustomCursor />
      <PortfolioNav />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Services />
        <Contact />
      </main>

      <Footer />

      {/* floating back-to-top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, y: 24, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.7 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            onClick={scrollTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-5 z-[65] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white shadow-[0_14px_38px_-10px_rgba(245,61,146,.9),0_0_0_4px_rgba(255,255,255,.6)] outline-none transition-shadow hover:shadow-[0_18px_48px_-8px_rgba(245,61,146,1),0_0_0_4px_rgba(255,255,255,.8)] focus-visible:ring-4 focus-visible:ring-pink-300 sm:bottom-8 sm:right-8"
          >
            <ArrowUp size={22} strokeWidth={2.6} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
