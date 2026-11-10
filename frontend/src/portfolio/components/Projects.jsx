import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ExternalLink, ArrowUpRight, X, Check, Github, Heart, Bookmark, Share2,
  MonitorPlay, LayoutList, Copy, Sparkles,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import { PROJECTS } from '../data'

/* ============================================================
   Hand-drawn SVG cover art — each project gets its own scene
   ============================================================ */
function ProjectArt({ art, idPrefix }) {
  const gid = (n) => `${idPrefix}-${n}`
  switch (art) {
    case 'store':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <rect x="30" y="26" width="340" height="248" rx="18" fill="#fff" opacity="0.14" stroke="#ffffff" strokeOpacity="0.5" />
          <rect x="30" y="26" width="340" height="34" rx="18" fill="#fff" opacity="0.22" />
          <circle cx="52" cy="43" r="5" fill="#ff8ab5" /><circle cx="70" cy="43" r="5" fill="#ffd166" /><circle cx="88" cy="43" r="5" fill="#8affd1" />
          {/* dress on mannequin */}
          <path d="M158 108 C 146 130, 138 168, 126 208 L 226 208 C 214 168, 206 130, 194 108 C 182 96, 170 96, 158 108 Z" fill="#fff" opacity="0.92" />
          <path d="M158 108 C 170 116, 182 116, 194 108" stroke="#f53d92" strokeWidth="4" fill="none" />
          <rect x="172" y="208" width="8" height="30" fill="#fff" opacity="0.85" /><ellipse cx="176" cy="244" rx="34" ry="7" fill="#fff" opacity="0.5" />
          {/* product cards */}
          <rect x="248" y="96" width="96" height="62" rx="12" fill="#fff" opacity="0.2" />
          <rect x="260" y="110" width="72" height="10" rx="5" fill="#fff" opacity="0.8" />
          <rect x="260" y="128" width="46" height="10" rx="5" fill="#ffd166" opacity="0.9" />
          <rect x="248" y="172" width="96" height="62" rx="12" fill="#fff" opacity="0.2" />
          <rect x="260" y="186" width="72" height="10" rx="5" fill="#fff" opacity="0.8" />
          <rect x="260" y="204" width="46" height="10" rx="5" fill="#ffd166" opacity="0.9" />
          {/* sparkles */}
          <path d="M112 78 l4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 12 -4 z" fill="#fff" opacity="0.9" />
          <path d="M300 52 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3 z" fill="#fff" opacity="0.8" />
        </svg>
      )
    case 'dashboard':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <rect x="24" y="30" width="352" height="240" rx="18" fill="#2a0a3e" opacity="0.35" stroke="#fff" strokeOpacity="0.4" />
          {/* sidebar */}
          <rect x="24" y="30" width="84" height="240" rx="18" fill="#fff" opacity="0.12" />
          <circle cx="66" cy="66" r="16" fill="#ff8ab5" />
          <rect x="44" y="98" width="44" height="7" rx="3.5" fill="#fff" opacity="0.7" />
          <rect x="44" y="116" width="44" height="7" rx="3.5" fill="#fff" opacity="0.4" />
          <rect x="44" y="134" width="44" height="7" rx="3.5" fill="#fff" opacity="0.4" />
          {/* line chart */}
          <polyline points="128,196 172,158 210,176 252,120 296,132 352,84" fill="none" stroke="#ffd166" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          {[[128,196],[172,158],[210,176],[252,120],[296,132],[352,84]].map(([x,y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="#fff" />)}
          {/* bars */}
          <rect x="128" y="216" width="26" height="34" rx="5" fill="#ff8ab5" opacity="0.9" />
          <rect x="166" y="206" width="26" height="44" rx="5" fill="#e879c6" opacity="0.9" />
          <rect x="204" y="222" width="26" height="28" rx="5" fill="#c084fc" opacity="0.9" />
          <rect x="242" y="212" width="26" height="38" rx="5" fill="#ff8ab5" opacity="0.9" />
          {/* donut */}
          <circle cx="330" cy="212" r="27" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="11" />
          <circle cx="330" cy="212" r="27" fill="none" stroke="#8affd1" strokeWidth="11" strokeDasharray="118 170" strokeLinecap="round" transform="rotate(-90 330 212)" />
        </svg>
      )
    case 'wellness':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <circle cx="200" cy="150" r="108" fill="#fff" opacity="0.1" />
          <circle cx="200" cy="150" r="78" fill="#fff" opacity="0.14" />
          <circle cx="200" cy="150" r="48" fill="#fff" opacity="0.22" />
          {/* blossom petals */}
          {[0, 60, 120, 180, 240, 300].map((r) => (
            <ellipse key={r} cx="200" cy="150" rx="17" ry="42" fill="#ffd9e8" opacity="0.9" transform={`rotate(${r} 200 150)`} />
          ))}
          <circle cx="200" cy="150" r="19" fill="#ff5ca8" />
          <circle cx="200" cy="150" r="8" fill="#ffd166" />
          {/* breathing wave */}
          <path d="M0 262 q50 -22 100 0 t100 0 t100 0 t100 0" stroke="#fff" strokeOpacity="0.7" strokeWidth="4" fill="none" />
          <path d="M0 284 q50 -22 100 0 t100 0 t100 0 t100 0" stroke="#fff" strokeOpacity="0.4" strokeWidth="4" fill="none" />
        </svg>
      )
    case 'restaurant':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          {/* cloche */}
          <path d="M118 176 A82 62 0 0 1 282 176 Z" fill="#fff" opacity="0.92" />
          <rect x="100" y="176" width="200" height="10" rx="5" fill="#ffd166" />
          <circle cx="200" cy="106" r="9" fill="#fff" />
          <rect x="196" y="112" width="8" height="12" fill="#fff" />
          {/* steam */}
          <path d="M160 82 q8 -14 0 -26 M200 76 q10 -16 0 -30 M240 82 q-8 -14 0 -26" stroke="#fff" strokeOpacity="0.85" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* plate + text lines */}
          <ellipse cx="200" cy="226" rx="96" ry="12" fill="#fff" opacity="0.3" />
          <rect x="140" y="252" width="120" height="9" rx="4.5" fill="#fff" opacity="0.6" />
          {/* fork & knife */}
          <path d="M60 150 v-46 M52 150 v-30 M68 150 v-30 M52 118 h16" stroke="#fff" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M340 104 v46 M340 104 q-14 12 0 26" stroke="#fff" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      )
    case 'lumen':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          {/* sun */}
          <circle cx="200" cy="128" r="46" fill="#ffd166" opacity="0.95" />
          <circle cx="200" cy="128" r="66" fill="#ffd166" opacity="0.25" />
          {/* mountains */}
          <path d="M0 190 L110 84 L196 190 Z" fill="#fff" opacity="0.28" />
          <path d="M140 190 L250 70 L372 190 Z" fill="#fff" opacity="0.35" />
          {/* perspective grid */}
          {[-160, -96, -40, 40, 96, 160].map((dx) => (
            <line key={dx} x1="200" y1="192" x2={200 + dx} y2="300" stroke="#fff" strokeOpacity="0.65" strokeWidth="2.5" />
          ))}
          {[206, 224, 246, 272].map((y) => (
            <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />
          ))}
          {/* stars */}
          {[[70,52],[140,36],[288,44],[338,92],[108,112],[316,150]].map(([x,y]) => (
            <path key={`${x}${y}`} d={`M${x} ${y} l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z`} fill="#fff" opacity="0.95" />
          ))}
        </svg>
      )
    case 'saas':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <rect x="24" y="28" width="352" height="244" rx="18" fill="#fff" opacity="0.12" stroke="#fff" strokeOpacity="0.4" />
          {/* button swatches */}
          <rect x="48" y="52" width="110" height="30" rx="15" fill="#fff" opacity="0.95" />
          <rect x="48" y="94" width="110" height="30" rx="15" fill="none" stroke="#fff" strokeWidth="2.4" />
          {/* toggle */}
          <rect x="186" y="52" width="66" height="30" rx="15" fill="#ff8ab5" />
          <circle cx="234" cy="67" r="11" fill="#fff" />
          {/* checkbox */}
          <rect x="186" y="94" width="22" height="22" rx="6" fill="#8affd1" />
          <path d="M191 105 l5.5 5.5 9.5 -10" stroke="#14412f" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          {/* slider */}
          <line x1="286" y1="104" x2="352" y2="104" stroke="#fff" strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
          <circle cx="330" cy="104" r="9" fill="#ffd166" />
          {/* cards row */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={48 + i * 112} y="150" width="96" height="104" rx="14" fill="#fff" opacity="0.2" />
              <circle cx={96 + i * 112} cy="186" r="16" fill="#fff" opacity="0.85" />
              <rect x={66 + i * 112} y="214" width="60" height="8" rx="4" fill="#fff" opacity="0.75" />
              <rect x={76 + i * 112} y="230" width="40" height="7" rx="3.5" fill="#fff" opacity="0.45" />
            </g>
          ))}
        </svg>
      )
    default:
      return null
  }
}

/* ============================================================
   Interactive like / bookmark / share row (persisted locally)
   ============================================================ */
function usePersistentToggle(key, initial = 0) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? JSON.parse(raw) : { liked: false, count: initial }
    } catch {
      return { liked: false, count: initial }
    }
  })
  const toggle = useCallback(() => {
    setValue((v) => {
      const next = { liked: !v.liked, count: Math.max(0, v.count + (v.liked ? -1 : 1)) }
      try { window.localStorage.setItem(key, JSON.stringify(next)) } catch { /* private mode */ }
      return next
    })
  }, [key])
  return [value, toggle]
}

function ProjectModal({ project, initialTab, onClose }) {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState(initialTab)
  const [copied, setCopied] = useState(false)
  const [{ liked, count }, toggleLike] = usePersistentToggle(`pf-like-${project.slug}`, 24 + project.title.length % 30)
  const [{ liked: saved }, toggleSave] = usePersistentToggle(`pf-save-${project.slug}`, 0)
  const closeRef = useRef(null)

  /* esc to close + scroll lock + autofocus */
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  const share = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}#${project.slug}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch { /* noop */ }
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }, [project.slug])

  const liveUrl = `https://example.com/ayesha/${project.slug}`
  const repoUrl = `https://github.com/ayeshanoor/${project.slug}`

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — project details`}
    >
      {/* backdrop */}
      <motion.button
        aria-label="Close project details"
        className="absolute inset-0 cursor-pointer bg-[#2b0518]/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      {/* panel */}
      <motion.div
        layout={reduce ? undefined : 'position'}
        initial={{ opacity: 0, y: 80, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative z-10 flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[1.8rem] bg-[#fff7fb] shadow-2xl sm:rounded-[1.8rem]"
      >
        {/* header art */}
        <div className={`relative h-36 shrink-0 overflow-hidden bg-gradient-to-br sm:h-44 ${project.gradient}`}>
          <ProjectArt art={project.art} idPrefix={`modal-${project.slug}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b0518]/85 via-[#2b0518]/15 to-transparent" />
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full border border-white/40 bg-black/30 p-2 text-white outline-none backdrop-blur-md transition-all hover:rotate-90 hover:bg-black/50 focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-3 left-5 right-5 sm:bottom-4">
            <p className="font-rounded text-[10px] font-bold uppercase tracking-[0.22em] text-pink-200">{project.category} · {project.year}</p>
            <h3 className="font-display text-xl font-black leading-snug text-white sm:text-2xl">{project.title}</h3>
          </div>
        </div>

        {/* tab switcher */}
        <div className="flex shrink-0 items-center gap-2 border-b border-pink-100 bg-white/70 px-5 pb-0 pt-3">
          {[
            { id: 'preview', label: 'Live Preview', Icon: MonitorPlay },
            { id: 'details', label: 'Case Study', Icon: LayoutList },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              aria-pressed={tab === id}
              className={`-mb-px flex items-center gap-2 rounded-t-2xl border-b-2 px-4 py-2.5 font-rounded text-[12.5px] font-bold outline-none transition-all focus-visible:ring-2 focus-visible:ring-pink-400 ${
                tab === id
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-[#a1667f] hover:text-pink-600'
              }`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* scrollable body */}
        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          {tab === 'preview' ? (
            <div>
              <div className={`relative h-44 overflow-hidden rounded-2xl bg-gradient-to-br sm:h-52 ${project.gradient} ring-1 ring-pink-200`}>
                <ProjectArt art={project.art} idPrefix={`preview-${project.slug}`} />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 font-rounded text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Interactive demo
                </span>
              </div>

              {/* interactive action row */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  onClick={toggleLike}
                  aria-pressed={liked}
                  aria-label={liked ? 'Unlike this project' : 'Like this project'}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 font-rounded text-[12px] font-bold outline-none transition-all active:scale-90 focus-visible:ring-2 focus-visible:ring-pink-400 ${
                    liked
                      ? 'border-pink-400 bg-pink-500 text-white shadow-[0_8px_20px_-6px_rgba(245,61,146,.7)]'
                      : 'border-pink-200 bg-white text-pink-600 hover:border-pink-400'
                  }`}
                >
                  <Heart size={14} fill={liked ? '#fff' : 'transparent'} /> {count}
                </button>
                <button
                  onClick={toggleSave}
                  aria-pressed={saved}
                  aria-label={saved ? 'Remove from saved projects' : 'Save this project'}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 font-rounded text-[12px] font-bold outline-none transition-all active:scale-90 focus-visible:ring-2 focus-visible:ring-pink-400 ${
                    saved
                      ? 'border-fuchsia-400 bg-fuchsia-500 text-white shadow-[0_8px_20px_-6px_rgba(217,70,239,.6)]'
                      : 'border-pink-200 bg-white text-fuchsia-600 hover:border-fuchsia-400'
                  }`}
                >
                  <Bookmark size={14} fill={saved ? '#fff' : 'transparent'} /> {saved ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={share}
                  aria-label="Copy link to this project"
                  className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-white px-3.5 py-2 font-rounded text-[12px] font-bold text-[#7a3a54] outline-none transition-all hover:border-pink-400 hover:text-pink-700 active:scale-90 focus-visible:ring-2 focus-visible:ring-pink-400"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
                  {copied ? 'Link copied!' : 'Share'}
                </button>
              </div>
              <p className="mt-4 font-rounded text-[13px] font-medium leading-relaxed text-[#7d4159]">
                This is a self-contained interactive preview of the project. The full experience is deployed and
                lovingly maintained — tap below to visit it.
              </p>
            </div>
          ) : (
            <div>
              <p className="font-rounded text-[13.5px] font-medium leading-relaxed text-[#6e3a52]">{project.blurb}</p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {project.metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-pink-100 bg-white px-3 py-3 text-center shadow-sm">
                    <p className="font-display text-lg font-black text-pink-600 sm:text-xl">{m.value}</p>
                    <p className="mt-0.5 font-rounded text-[8.5px] font-bold uppercase leading-tight tracking-[0.12em] text-[#a1667f]">{m.label}</p>
                  </div>
                ))}
              </div>

              <h4 className="mt-5 font-rounded text-[11px] font-bold uppercase tracking-[0.2em] text-pink-500">What I did</h4>
              <ul className="mt-2 space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 font-rounded text-[13px] font-medium text-[#63324a]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                      <Check size={12} strokeWidth={3.2} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-pink-100 bg-pink-50/60 px-4 py-3">
                <div>
                  <p className="font-rounded text-[9.5px] font-bold uppercase tracking-[0.18em] text-pink-400">My role</p>
                  <p className="font-rounded text-[12.5px] font-bold text-[#57203a]">{project.role}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1.5 font-rounded text-[11px] font-bold text-pink-600 shadow-sm">{project.year}</span>
              </div>
            </div>
          )}

          {/* tech tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="rounded-full border border-pink-200/80 bg-white px-2.5 py-1 font-rounded text-[10px] font-bold text-[#8a4b63] shadow-sm">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* footer CTAs — real links */}
        <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-pink-100 bg-white/80 p-4 backdrop-blur-sm">
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2.5 font-rounded text-[12.5px] font-bold text-white shadow-[0_10px_26px_-8px_rgba(245,61,146,.8)] outline-none transition-all hover:shadow-[0_12px_32px_-6px_rgba(245,61,146,.95)] focus-visible:ring-4 focus-visible:ring-pink-400/60"
          >
            <ExternalLink size={15} /> Visit Live Demo
          </a>
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-pink-300 bg-white px-4 py-2.5 font-rounded text-[12.5px] font-bold text-pink-700 outline-none transition-all hover:border-pink-400 hover:bg-pink-50 focus-visible:ring-4 focus-visible:ring-pink-400/60"
          >
            <Github size={15} /> View Source
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ============================================================
   The gallery grid
   ============================================================ */
function ProjectCard({ project, index, onOpen }) {
  const reduce = useReducedMotion()
  const featured = !!project.featured

  return (
    <motion.article
      id={project.slug}
      initial={reduce ? false : { opacity: 0, y: 60, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.09, type: 'spring', stiffness: 95, damping: 17 }}
      className={`group relative min-h-[15.5rem] overflow-hidden rounded-3xl border border-white/50 shadow-[0_20px_50px_-22px_rgba(87,32,58,.55)] ring-1 ring-pink-200/60 outline-none transition-shadow duration-500 hover:shadow-[0_28px_70px_-20px_rgba(245,61,146,.65),0_0_0_1.5px_rgba(255,140,190,.75)] focus-within:ring-4 focus-within:ring-pink-400/70 ${project.span}`}
    >
      {/* artwork */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-transform duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.12] ${project.gradient}`}>
        <ProjectArt art={project.art} idPrefix={`card-${project.slug}`} />
      </div>
      {/* readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#26040f]/90 via-[#3d0a1e]/35 to-transparent transition-opacity duration-500" />
      {/* glare sweep on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[130%]"
      />

      {/* top badges */}
      <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
        <span className="rounded-full border border-white/35 bg-black/35 px-3 py-1.5 font-rounded text-[9px] font-bold uppercase tracking-[0.2em] text-pink-100 backdrop-blur-md">
          {project.category}
        </span>
        <span className="rounded-full border border-white/25 bg-black/30 px-2.5 py-1.5 font-rounded text-[10px] font-bold text-white/90 backdrop-blur-md">
          {project.year}
        </span>
      </div>

      {/* bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className={`font-display font-black leading-tight text-white drop-shadow ${featured ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
          {project.title}
        </h3>
        <p className={`mt-1.5 font-rounded text-[12px] font-medium leading-snug text-pink-100/95 ${featured ? 'line-clamp-3' : 'hidden line-clamp-2 sm:block'}`}>
          {project.blurb}
        </p>
        <div className={`mt-2 flex flex-wrap gap-1.5 ${featured ? '' : 'hidden sm:flex'}`}>
          {project.tags.slice(0, featured ? 5 : 3).map((t) => (
            <span key={t} className="rounded-full bg-white/15 px-2 py-0.5 font-rounded text-[9px] font-bold text-white/95 backdrop-blur-sm ring-1 ring-white/25">
              {t}
            </span>
          ))}
        </div>
        {/* actions — always visible, extra glow on hover */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => onOpen(project, 'preview')}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 font-rounded text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#a02058] shadow-lg outline-none transition-all duration-300 hover:scale-105 hover:bg-pink-50 focus-visible:ring-2 focus-visible:ring-white active:scale-95"
            aria-label={`Open live preview of ${project.title}`}
          >
            <ExternalLink size={12.5} strokeWidth={2.6} /> Live Demo
          </button>
          <button
            onClick={() => onOpen(project, 'details')}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 px-3.5 py-2 font-rounded text-[10.5px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_26px_-8px_rgba(245,61,146,.9)] outline-none transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_-6px_rgba(245,61,146,1)] focus-visible:ring-2 focus-visible:ring-white active:scale-95"
            aria-label={`View case study of ${project.title}`}
          >
            View Project <ArrowUpRight size={12.5} strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null) // { project, tab } | null
  const open = useCallback((project, tab) => setSelected({ project, tab }), [])
  const close = useCallback(() => setSelected(null), [])

  const featuredFirst = useMemo(() => [...PROJECTS].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)), [])

  return (
    <section id="projects" aria-labelledby="projects-heading" className="pf-section px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Selected Work"
          title="Projects that"
          highlight="sparkle back"
          sub="Six favourites from forty-plus shipped builds — hover to peek under the gloss, click to open the full case study."
          id="projects-heading"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:auto-rows-[16.5rem] lg:grid-cols-4 lg:gap-6">
          {featuredFirst.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} onOpen={open} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/ayeshanoor?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-rounded text-[13px] font-bold text-pink-600 outline-none transition-colors hover:text-pink-800 focus-visible:ring-2 focus-visible:ring-pink-400 rounded-lg px-2 py-1"
          >
            <Sparkles size={15} className="transition-transform duration-300 group-hover:rotate-12" />
            …and 34 more experiments in the lab — see them on GitHub
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected.project} initialTab={selected.tab} onClose={close} />
        )}
      </AnimatePresence>
    </section>
  )
}
