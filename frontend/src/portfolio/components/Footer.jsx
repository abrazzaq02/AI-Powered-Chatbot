import { useCallback } from 'react'
import { Heart, ArrowUp } from 'lucide-react'
import TeddyBear from './TeddyBear'
import { NAV_LINKS, SOCIALS } from '../data'

const QUICK_LINKS = NAV_LINKS

export default function Footer() {
  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }, [])

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <footer className="relative z-10" aria-label="Footer">
      {/* scalloped wave divider */}
      <div className="relative -mb-px h-16 w-full overflow-hidden sm:h-20" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute bottom-0 h-full w-full">
          <path
            d="M0,40 C60,70 120,10 180,40 C240,70 300,10 360,40 C420,70 480,10 540,40 C600,70 660,10 720,40 C780,70 840,10 900,40 C960,70 1020,10 1080,40 C1140,70 1200,10 1260,40 C1320,70 1380,10 1440,40 L1440,80 L0,80 Z"
            fill="url(#pfFooterWave)"
          />
          <defs>
            <linearGradient id="pfFooterWave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e0447c" />
              <stop offset="50%" stopColor="#d6337f" />
              <stop offset="100%" stopColor="#c02670" />
            </linearGradient>
          </defs>
        </svg>
      </div>

        <div
        className="relative overflow-hidden pb-8 pt-8 text-pink-100"
        style={{ background: 'linear-gradient(160deg, #e0447c 0%, #d6337f 45%, #b12a66 100%)' }}
      >
        {/* soft glow orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.22),transparent_70%)] blur-2xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,190,220,.28),transparent_70%)] blur-2xl" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8">
          {/* brand */}
          <div>
            <p className="font-display text-3xl font-black text-white">
              ayesha<span className="text-pink-200">.</span>
            </p>
            <p className="mt-2 max-w-xs font-rounded text-[13px] font-medium leading-relaxed text-pink-100/90">
              Creative designer & frontend developer crafting dreamy, high-performance web experiences from Hyderabad, Pakistan.
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-pink-50 outline-none backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white hover:text-pink-700 focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Icon size={18} strokeWidth={1.9} />
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <nav aria-label="Footer quick links">
            <p className="font-rounded text-[10.5px] font-bold uppercase tracking-[0.24em] text-pink-200">Explore</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
              {QUICK_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => go(id)}
                    className="group inline-flex items-center gap-1.5 rounded font-rounded text-[13px] font-semibold text-pink-50/95 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Heart size={11} className="text-pink-300 transition-transform duration-300 group-hover:scale-125" fill="currentColor" strokeWidth={0} />
                    <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-white/70">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* availability + back to top */}
          <div className="flex flex-col items-start md:items-end">
            <p className="font-rounded text-[10.5px] font-bold uppercase tracking-[0.24em] text-pink-200">Right now</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/15 px-4 py-2 font-rounded text-[12px] font-bold text-emerald-200 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Open for freelance · Jan–Mar ’26
            </p>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="group mt-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 py-2.5 pl-5 pr-3 font-rounded text-[11.5px] font-bold uppercase tracking-[0.2em] text-white outline-none backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-pink-700 hover:shadow-[0_14px_40px_-10px_rgba(255,255,255,.6)] focus-visible:ring-4 focus-visible:ring-white/70 active:scale-95"
            >
              Back to top
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-pink-700 transition-transform duration-300 group-hover:-translate-y-1">
                <ArrowUp size={16} strokeWidth={2.6} />
              </span>
            </button>
          </div>
        </div>

        {/* bottom bar */}
        <div className="relative mx-auto mt-8 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/20 px-6 pt-5 text-center font-rounded text-[11px] font-semibold text-pink-100/85 sm:px-8 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Ayesha Noor. All pixels reserved.</p>
          <p className="inline-flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex flex-wrap items-center justify-center gap-1.5">
              Made with <Heart size={12} fill="#ffd166" strokeWidth={0} className="text-amber-300" /> and a little magic.
              <span className="hidden lg:inline text-pink-200/70">· Powered by chai & 2AM ideas</span>
            </span>
            <span className="hidden h-6 w-px bg-white/25 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center" title="Beebo, my footer teddy — boop the nose">
              <TeddyBear variant="heart" size={64} interactive ariaLabel="Beebo the footer teddy — click for love" />
            </span>
          </p>
          <a
            href="/welcome"
            className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-pink-100 outline-none transition-colors hover:bg-white hover:text-pink-800 focus-visible:ring-2 focus-visible:ring-white"
          >
            NeuroChat AI ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
