import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, useSpring, useMotionValue, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'

/** Detects a fine pointer (mouse / trackpad) — false on touch devices. */
export function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const onChange = () => setFine(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return fine
}

let heartId = 0

/**
 * Dreamy pink cursor: a glowing dot + a soft magnetic follower ring.
 * Clicking anywhere sprays tiny hearts; interactive elements grow the ring.
 * Renders nothing (and keeps the native cursor) on touch devices.
 */
export default function CustomCursor() {
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const enabled = fine && !reduce

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { stiffness: 900, damping: 60, mass: 0.4 })
  const dotY = useSpring(y, { stiffness: 900, damping: 60, mass: 0.4 })
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.9 })
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.9 })

  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [clickHearts, setClickHearts] = useState([])
  const trailRef = useRef(0)

  const spawnHearts = useCallback((cx, cy, count = 6, spread = 46) => {
    const now = Date.now()
    const hearts = Array.from({ length: count }, () => ({
      id: heartId++,
      x: cx + (Math.random() - 0.5) * spread,
      y: cy + (Math.random() - 0.5) * spread,
      dx: (Math.random() - 0.5) * 90,
      size: 10 + Math.random() * 13,
      rotate: (Math.random() - 0.5) * 70,
    }))
    setClickHearts((h) => [...h.slice(-24), ...hearts])
    window.setTimeout(() => {
      setClickHearts((h) => h.filter((p) => !hearts.some((n) => n.id === p.id)))
    }, 950)
    return now
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      // soft heart trail — throttled
      const now = performance.now()
      if (now - trailRef.current > 110 && e.movementX * e.movementX + e.movementY * e.movementY > 30) {
        trailRef.current = now
        const trailHeart = {
          id: heartId++,
          x: e.clientX,
          y: e.clientY,
          dx: (Math.random() - 0.5) * 36,
          size: 7 + Math.random() * 6,
          rotate: (Math.random() - 0.5) * 60,
          trail: true,
        }
        setClickHearts((h) => [...h.slice(-24), trailHeart])
        window.setTimeout(() => setClickHearts((h) => h.filter((p) => p.id !== trailHeart.id)), 800)
      }
    }
    const onOver = (e) => {
      const t = e.target
      setHovering(!!(t.closest && t.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')))
    }
    const onDown = (e) => {
      spawnHearts(e.clientX, e.clientY, 7, 60)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [enabled, x, y, spawnHearts])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      {/* glow dot */}
      <motion.div
        className="absolute h-3 w-3 rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          background: 'radial-gradient(circle at 35% 35%, #fff, #ff8ab5 55%, #f53d92)',
          boxShadow: '0 0 10px 3px rgba(255,110,175,.8), 0 0 26px 8px rgba(245,61,146,.45)',
        }}
      />
      {/* soft follower ring */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full border-2 border-pink-400/80"
        animate={{
          width: hovering ? 58 : 36,
          height: hovering ? 58 : 36,
          backgroundColor: hovering ? 'rgba(255,110,175,0.22)' : 'rgba(255,110,175,0.08)',
          borderColor: hovering ? 'rgba(245,61,146,0.95)' : 'rgba(255,140,190,0.8)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          boxShadow: hovering
            ? '0 0 24px 6px rgba(245,61,146,.45), inset 0 0 14px rgba(255,255,255,.7)'
            : '0 0 14px 2px rgba(255,140,190,.4)',
        }}
      >
        <Heart
          size={hovering ? 16 : 0}
          strokeWidth={0}
          fill="#f53d92"
          className="transition-all duration-300"
        />
      </motion.div>

      {/* trail + click hearts */}
      <AnimatePresence>
        {clickHearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute select-none"
            style={{ left: h.x, top: h.y, fontSize: h.size }}
            initial={{ opacity: 0.95, scale: h.trail ? 0.4 : 0.5, y: 0, x: 0, rotate: 0 }}
            animate={{ opacity: 0, scale: h.trail ? 0 : 1.15, y: h.trail ? -26 : -78, x: h.dx, rotate: h.rotate }}
            exit={{ opacity: 0 }}
            transition={{ duration: h.trail ? 0.8 : 0.95, ease: 'easeOut' }}
          >
            💗
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
