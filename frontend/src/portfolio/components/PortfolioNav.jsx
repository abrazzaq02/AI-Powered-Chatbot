import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'
import { NAV_LINKS } from '../data'

/** Mini teddy-face logo mark */
function TeddyMark({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Ayesha Noor — teddy mark">
      <circle cx="17" cy="15" r="9" fill="#e9a668" />
      <circle cx="47" cy="15" r="9" fill="#e9a668" />
      <circle cx="17" cy="15" r="4.4" fill="#ffb3cd" />
      <circle cx="47" cy="15" r="4.4" fill="#ffb3cd" />
      <circle cx="32" cy="36" r="21" fill="#e9a668" />
      <ellipse cx="32" cy="44" rx="9" ry="6.4" fill="#f8d8b0" />
      <circle cx="24.5" cy="32.5" r="2.7" fill="#432a1c" />
      <circle cx="39.5" cy="32.5" r="2.7" fill="#432a1c" />
      <ellipse cx="32" cy="41.6" rx="3.4" ry="2.4" fill="#54301f" />
      <path d="M32 44 v2.4 M32 46.4 q-3 2.4 -5.6 .5 M32 46.4 q3 2.4 5.6 .5" stroke="#54301f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function PortfolioNav() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 })

  /* scroll-spy */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-32% 0px -58% 0px', threshold: 0 }
    )
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  /* lock body scroll when the mobile sheet is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = useCallback(
    (id) => {
      setOpen(false)
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    },
    [reduce]
  )

  return (
    <>
      {/* scroll progress ribbon */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[75] h-[3px] origin-left bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400"
        style={{ scaleX }}
      />

      <header className="fixed inset-x-0 top-3 z-[70] flex justify-center px-3 sm:top-4 sm:px-6">
        <nav
          aria-label="Portfolio navigation"
          className="flex w-full max-w-5xl items-center justify-between gap-2 rounded-full border border-white/80 bg-white/70 py-2 pl-3 pr-2 shadow-[0_18px_45px_-18px_rgba(245,61,146,.5)] backdrop-blur-2xl sm:pl-4"
        >
          {/* logo */}
          <button
            onClick={() => go('home')}
            className="group flex shrink-0 items-center gap-2 rounded-full outline-none transition-transform focus-visible:ring-4 focus-visible:ring-pink-400/60 hover:scale-105 active:scale-95"
            aria-label="Ayesha Noor — back to top"
          >
            <span className="transition-transform duration-500 group-hover:rotate-[-8deg]">
              <TeddyMark size={36} />
            </span>
            <span className="font-display text-[19px] font-black leading-none text-[#57203a]">
              ayesha<span className="pf-gradient-text">.</span>
              <span className="hidden font-rounded text-[11px] font-bold uppercase tracking-[0.18em] text-pink-500 sm:block">portfolio</span>
            </span>
          </button>

          {/* desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map(({ label, id }) => {
              const isActive = active === id
              return (
                <li key={id}>
                  <button
                    onClick={() => go(id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-full px-3.5 py-2 font-rounded text-[13px] font-bold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-pink-400 xl:px-4 ${
                      isActive ? 'text-white' : 'text-[#7a3a54] hover:text-pink-600'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="pf-nav-pill"
                        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 shadow-[0_8px_24px_-6px_rgba(245,61,146,.8),inset_0_1px_0_rgba(255,255,255,.5)]"
                      />
                    )}
                    {label}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            {/* tiny heart easter egg */}
            <span className="hidden text-lg md:block pf-heartbeat" aria-hidden="true">💗</span>
            {/* hire me CTA */}
            <button
              onClick={() => go('contact')}
              className="hidden rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2 font-rounded text-[12.5px] font-bold text-white shadow-[0_10px_26px_-8px_rgba(245,61,146,.8)] outline-none transition-all duration-300 hover:shadow-[0_12px_34px_-6px_rgba(245,61,146,.95)] focus-visible:ring-4 focus-visible:ring-pink-400/70 active:scale-95 sm:block"
            >
              Hire Me ✨
            </button>
            {/* hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="pf-mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="rounded-full border border-pink-200 bg-white/80 p-2.5 text-pink-600 outline-none transition-all hover:bg-pink-50 hover:text-pink-700 focus-visible:ring-2 focus-visible:ring-pink-400 lg:hidden"
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </nav>

        {/* mobile sheet */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="pf-mobile-menu"
              initial={{ opacity: 0, y: -18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="absolute left-3 right-3 top-[calc(100%+10px)] rounded-3xl border border-pink-100 bg-white/90 p-4 shadow-[0_30px_70px_-25px_rgba(245,61,146,.55)] backdrop-blur-2xl lg:hidden"
            >
              <ul className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map(({ label, id }) => {
                  const isActive = active === id
                  return (
                    <li key={id}>
                      <button
                        onClick={() => go(id)}
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 font-rounded text-sm font-bold transition-all duration-200 active:scale-[0.97] ${
                          isActive
                            ? 'border-pink-400 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-lg shadow-pink-400/40'
                            : 'border-pink-100 bg-pink-50/70 text-[#7a3a54] hover:border-pink-300 hover:text-pink-700'
                        }`}
                      >
                        {label}
                        <Heart size={14} fill={isActive ? '#fff' : '#ff8ab5'} strokeWidth={0} />
                      </button>
                    </li>
                  )
                })}
              </ul>
              <button
                onClick={() => go('contact')}
                className="mt-3 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 py-3.5 font-rounded text-sm font-bold text-white shadow-lg shadow-pink-400/50 transition-transform active:scale-[0.98]"
              >
                Let’s work together 💗
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
