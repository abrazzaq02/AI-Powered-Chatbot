import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useAnimation } from 'framer-motion'
import { TEDDY_MESSAGES } from '../data'

const FUR = '#e9a668'
const FUR_DARK = '#c97e44'
const CREAM = '#f8d8b0'
const NOSE = '#54301f'
const BLUSH = '#ff8fb0'

/**
 * A hand-drawn, endlessly cute SVG teddy bear.
 *  - variant "wave": waving right paw, happy eyes
 *  - variant "heart": clutches a big pink heart
 *  - variant "mini": small decorative bear
 * Interactive when `interactive` — click for a surprise message + heart burst.
 */
export default function TeddyBear({
  variant = 'wave',
  size = 220,
  interactive = true,
  floating = true,
  className = '',
  ariaLabel = 'Cute teddy bear',
}) {
  const reduce = useReducedMotion()
  const controls = useAnimation()
  const [message, setMessage] = useState(null)
  const [bursts, setBursts] = useState([])
  const msgTimer = useRef(null)
  const idRef = useRef(0)

  useEffect(() => () => window.clearTimeout(msgTimer.current), [])

  const celebrate = useCallback(() => {
    if (!interactive) return
    setMessage(TEDDY_MESSAGES[Math.floor(Math.random() * TEDDY_MESSAGES.length)])
    window.clearTimeout(msgTimer.current)
    msgTimer.current = window.setTimeout(() => setMessage(null), 2600)

    const now = idRef.current++
    const hearts = Array.from({ length: 10 }, (_, i) => ({
      id: `${now}-${i}`,
      angle: (Math.PI * 2 * i) / 10 + Math.random() * 0.5,
      dist: 55 + Math.random() * 45,
      size: 12 + Math.random() * 14,
      delay: Math.random() * 0.12,
    }))
    setBursts((b) => [...b, ...hearts])
    window.setTimeout(() => setBursts((b) => b.filter((h) => !hearts.includes(h))), 1100)

    if (!reduce) {
      controls.start({ scale: [1, 0.88, 1.14, 0.96, 1.06, 1], transition: { duration: 0.9, ease: 'easeOut' } })
    }
  }, [controls, interactive, reduce])

  const inner = (
    <>
      {/* ======= SVG BEAR ======= */}
      <svg
        viewBox="0 0 260 282"
        width={size}
        height={(size * 282) / 260}
        role="img"
        aria-label={ariaLabel}
        className="select-none drop-shadow-[0_18px_30px_rgba(212,42,125,0.35)]"
      >
        <defs>
          <radialGradient id="pf-furSheen" cx="40%" cy="32%" r="80%">
            <stop offset="0%" stopColor="#f4bc82" />
            <stop offset="60%" stopColor={FUR} />
            <stop offset="100%" stopColor="#d18a4e" />
          </radialGradient>
          <linearGradient id="pf-bowGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff5ca8" />
            <stop offset="100%" stopColor="#e879c6" />
          </linearGradient>
          <linearGradient id="pf-heartGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff7ab8" />
            <stop offset="55%" stopColor="#f53d92" />
            <stop offset="100%" stopColor="#d42a7d" />
          </linearGradient>
        </defs>

        {/* Breathing body group */}
        <motion.g
          animate={reduce ? undefined : { scaleY: [1, 1.028, 1], scaleX: [1, 0.985, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '130px 278px' }}
          stroke={FUR_DARK}
          strokeOpacity="0.6"
          strokeWidth="2.4"
          strokeLinejoin="round"
        >
          {/* ears */}
          <circle cx="88" cy="48" r="19" fill="url(#pf-furSheen)" />
          <circle cx="172" cy="48" r="19" fill="url(#pf-furSheen)" />
          <circle cx="88" cy="48" r="9.5" fill={BLUSH} stroke="none" opacity="0.85" />
          <circle cx="172" cy="48" r="9.5" fill={BLUSH} stroke="none" opacity="0.85" />

          {/* left (viewer) arm — resting, lovingly */}
          <ellipse cx="70" cy="206" rx="13.5" ry="31" fill="url(#pf-furSheen)" transform="rotate(24 70 206)" />
          <ellipse cx="61" cy="232" rx="10.5" ry="8.5" fill={CREAM} transform="rotate(24 61 232)" />

          {/* legs */}
          <ellipse cx="94" cy="264" rx="17.5" ry="12.5" fill="url(#pf-furSheen)" transform="rotate(-14 94 264)" />
          <ellipse cx="166" cy="264" rx="17.5" ry="12.5" fill="url(#pf-furSheen)" transform="rotate(14 166 264)" />
          <ellipse cx="89" cy="264" rx="8" ry="5.6" fill={CREAM} stroke="none" />
          <ellipse cx="171" cy="264" rx="8" ry="5.6" fill={CREAM} stroke="none" />

          {/* body */}
          <ellipse cx="130" cy="216" rx="55" ry="45" fill="url(#pf-furSheen)" />
          <ellipse cx="130" cy="223" rx="31" ry="27" fill={CREAM} stroke="none" />

          {/* head (shifted down 12px so it overlaps the body) */}
          <g transform="translate(0 12)">
          <ellipse cx="130" cy="98" rx="64" ry="55" fill="url(#pf-furSheen)" />

          {/* snout */}
          <ellipse cx="130" cy="122" rx="24.5" ry="17" fill={CREAM} stroke="none" />
          <ellipse cx="130" cy="115.5" rx="8" ry="6" fill={NOSE} stroke="none" />
          <path d="M130 122 v6" stroke={NOSE} strokeWidth="2.1" strokeLinecap="round" fill="none" />
          <path d="M130 128 q-7.5 6.5 -15 1 M130 128 q7.5 6.5 15 1" stroke={NOSE} strokeWidth="2.1" strokeLinecap="round" fill="none" />

          {/* blush */}
          <ellipse cx="86" cy="112" rx="8.5" ry="5" fill={BLUSH} stroke="none" opacity="0.8" />
          <ellipse cx="174" cy="112" rx="8.5" ry="5" fill={BLUSH} stroke="none" opacity="0.8" />

          {/* eyes (blink together) */}
          <motion.g
            animate={reduce ? undefined : { scaleY: [1, 1, 0.08, 1, 1] }}
            transition={{ duration: 4.8, times: [0, 0.9, 0.945, 0.97, 1], repeat: Infinity }}
            style={{ transformOrigin: '130px 105px' }}
            stroke="none"
          >
            <circle cx="104" cy="93" r="6.4" fill="#432a1c" />
            <circle cx="156" cy="93" r="6.4" fill="#432a1c" />
            <circle cx="106.3" cy="90.6" r="1.9" fill="#ffffff" opacity="0.95" />
            <circle cx="158.3" cy="90.6" r="1.9" fill="#ffffff" opacity="0.95" />
          </motion.g>

          {/* little tuff of hair */}
          <path d="M122 42 q8 -10 16 0" stroke={FUR_DARK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
          </g>

          {/* bow tie under the chin */}
          <g transform="translate(130 160)" stroke="none">
            <path d="M0 0 C -18 -12, -30 -6, -27 5 C -24 14, -8 9, 0 2 Z" fill="url(#pf-bowGrad)" />
            <path d="M0 0 C 18 -12, 30 -6, 27 5 C 24 14, 8 9, 0 2 Z" fill="url(#pf-bowGrad)" />
            <circle r="5.2" fill="#d42a7d" />
          </g>

          {/* belly embroidery or held heart */}
          {variant === 'heart' ? (
            <g stroke="none">
              <path
                d="M130 236 C 108 219, 101 199, 112 189 C 120 182, 128 185, 130 193 C 132 185, 140 182, 148 189 C 159 199, 152 219, 130 236 Z"
                fill="url(#pf-heartGrad)"
              />
              <ellipse cx="121" cy="196" rx="5" ry="3" fill="#ffffff" opacity="0.75" transform="rotate(-28 121 196)" />
            </g>
          ) : (
            <path
              d="M130 232 C 122 225, 118.5 217, 123.4 212.6 C 127.5 208.9, 132.3 210.7, 133.8 216 C 135.3 210.7, 140.1 208.9, 144.2 212.6 C 149 217, 145 225, 130 232 Z"
              fill="#ff8fb0"
              stroke="none"
            />
          )}
        </motion.g>

        {/* Right (viewer) arm — the waving one. Drawn outside breathing group so it waves independently */}
        {variant === 'wave' ? (
          <motion.g
            animate={reduce ? undefined : { rotate: [0, -26, 6, -26, 0] }}
            transition={{ duration: 2.15, times: [0, 0.22, 0.45, 0.68, 1], repeat: Infinity, repeatDelay: 0.75, ease: 'easeInOut' }}
            style={{ transformOrigin: '192px 198px' }}
            stroke={FUR_DARK}
            strokeOpacity="0.6"
            strokeWidth="2.4"
            strokeLinejoin="round"
          >
            <ellipse cx="207" cy="166" rx="13.5" ry="31" fill="url(#pf-furSheen)" transform="rotate(-40 207 166)" />
            <ellipse cx="218" cy="137" rx="10.5" ry="8.5" fill={CREAM} transform="rotate(-40 218 137)" />
          </motion.g>
        ) : (
          <g stroke={FUR_DARK} strokeOpacity="0.6" strokeWidth="2.4" strokeLinejoin="round">
            <ellipse cx="196" cy="212" rx="12.5" ry="28" fill="url(#pf-furSheen)" transform="rotate(-52 196 212)" />
            <ellipse cx="207" cy="233" rx="9.5" ry="8" fill={CREAM} />
          </g>
        )}
      </svg>

      {/* ======= Heart burst particles ======= */}
      <AnimatePresence>
        {bursts.map((h) => (
          <motion.span
            key={h.id}
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 select-none"
            initial={{ x: 0, y: 0, scale: 0.3, opacity: 1, rotate: 0 }}
            animate={{
              x: Math.cos(h.angle) * h.dist,
              y: Math.sin(h.angle) * h.dist - 24,
              scale: [0.3, 1.15, 0.85],
              opacity: [1, 1, 0],
              rotate: (Math.random() > 0.5 ? 1 : -1) * 50,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.05, delay: h.delay, ease: 'easeOut' }}
            style={{ fontSize: h.size }}
            aria-hidden="true"
          >
            💗
          </motion.span>
        ))}
      </AnimatePresence>

      {/* ======= Cute message bubble ======= */}
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 14, scale: 0.6, rotate: -4 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.75 }}
            transition={{ type: 'spring', stiffness: 480, damping: 22 }}
            className="absolute left-1/2 top-[-8px] z-30 w-max max-w-[220px] -translate-x-1/2 -translate-y-full rounded-2xl border border-pink-200 bg-white/95 px-4 py-2 text-center shadow-[0_10px_30px_-8px_rgba(245,61,146,0.55)] backdrop-blur-md"
            role="status"
          >
            <span className="font-rounded text-[12.5px] font-bold leading-snug text-pink-600">{message}</span>
            <span className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-[7px] rotate-45 border-b border-r border-pink-200 bg-white/95" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )

  const floatProps = !reduce && floating
    ? { animate: { y: [0, -16, 0], rotate: [0, -1.6, 1.6, 0] }, transition: { duration: 5.4, repeat: Infinity, ease: 'easeInOut' } }
    : {}

  const body = (
    <motion.div animate={controls} className="relative">
      <motion.div {...floatProps} className={`relative ${className}`} aria-hidden={interactive ? undefined : true}>
        {inner}
      </motion.div>
    </motion.div>
  )

  if (!interactive) return body

  return (
    <motion.button
      type="button"
      onClick={celebrate}
      whileHover={reduce ? undefined : { scale: 1.06, rotate: -1.2 }}
      whileTap={reduce ? undefined : { scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 380, damping: 16 }}
      aria-label="Teddy bear — click me for a surprise"
      className="relative block rounded-full outline-none focus-visible:ring-4 focus-visible:ring-pink-400/70"
    >
      {body}
    </motion.button>
  )
}
