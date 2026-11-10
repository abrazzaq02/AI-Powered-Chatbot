import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Magnetic, shimmering, ripple-ready pill button.
 * variant: 'primary' (hot pink gradient glow) | 'ghost' (frosted glass)
 */
export default function GlowButton({
  children,
  variant = 'primary',
  href,
  onClick,
  icon: Icon,
  iconRight = true,
  className = '',
  ariaLabel,
  type = 'button',
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [ripples, setRipples] = useState([])
  const rippleId = useRef(0)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.6 })
  const springY = useSpring(my, { stiffness: 260, damping: 18, mass: 0.6 })

  const onMouseMove = useCallback(
    (e) => {
      if (reduce || !ref.current) return
      const r = ref.current.getBoundingClientRect()
      mx.set((e.clientX - (r.left + r.width / 2)) * 0.32)
      my.set((e.clientY - (r.top + r.height / 2)) * 0.32)
    },
    [mx, my, reduce]
  )
  const onMouseLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
  }, [mx, my])

  const addRipple = useCallback(
    (e) => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      const x = (e.clientX ?? r.left + r.width / 2) - r.left
      const y = (e.clientY ?? r.top + r.height / 2) - r.top
      const id = rippleId.current++
      setRipples((rp) => [...rp, { id, x, y, size: Math.max(r.width, r.height) }])
      window.setTimeout(() => setRipples((rp) => rp.filter((p) => p.id !== id)), 780)
    },
    []
  )

  const handleClick = useCallback(
    (e) => {
      addRipple(e)
      if (href) {
        e.preventDefault()
        document.querySelector(href)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      }
      onClick?.(e)
    },
    [addRipple, href, onClick, reduce]
  )

  const base =
    'relative inline-flex items-center justify-center gap-2.5 rounded-full font-rounded font-bold tracking-wide outline-none transition-shadow duration-300 select-none focus-visible:ring-4 focus-visible:ring-pink-400/70 whitespace-nowrap'
  const styles =
    variant === 'primary'
      ? 'pf-shimmer px-7 py-3.5 text-[15px] text-white bg-gradient-to-r from-[#ff6fae] via-[#f53d92] to-[#d42a7d] shadow-[0_16px_40px_-10px_rgba(245,61,146,0.75),0_0_0_1px_rgba(255,255,255,.35)_inset] hover:shadow-[0_20px_55px_-8px_rgba(245,61,146,0.9),0_0_38px_-4px_rgba(255,92,168,.65)]'
      : 'px-7 py-3.5 text-[15px] text-pink-700 bg-white/70 border border-pink-300/80 backdrop-blur-md shadow-[0_10px_28px_-12px_rgba(245,61,146,.4)] hover:bg-white/90 hover:border-pink-400 hover:text-pink-800 hover:shadow-[0_14px_40px_-10px_rgba(245,61,146,.55)]'

  const content = (
    <>
      {/* ripples */}
      {ripples.map((r) => (
        <span key={r.id} className="pf-ripple-span" style={{ left: r.x, top: r.y, width: r.size, height: r.size }} />
      ))}
      {Icon && !iconRight && <Icon size={19} strokeWidth={2.4} className="relative z-[1] transition-transform duration-300 group-hover:-rotate-6" />}
      <span className="relative z-[1]">{children}</span>
      {Icon && iconRight && (
        <Icon size={19} strokeWidth={2.4} className="relative z-[1] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-rotate-6" />
      )}
    </>
  )

  return (
    <motion.button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      whileHover={reduce ? undefined : { scale: 1.06 }}
      whileTap={reduce ? undefined : { scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`${base} ${styles} ${className} group`}
    >
      {content}
    </motion.button>
  )
}
