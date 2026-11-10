import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Heart, Star, Sparkles } from 'lucide-react'

/**
 * The dreamy pink sky everything floats in.
 * Pure transform/opacity animation — 60fps friendly, zero layout thrash.
 * Respects prefers-reduced-motion (renders a calm static blush instead).
 */
export default function FloatingBackground() {
  const reduce = useReducedMotion()

  const particles = useMemo(() => {
    const rand = (min, max) => min + Math.random() * (max - min)
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      kind: pick(['heart', 'star', 'sparkle', 'bubble', 'petal', 'petal', 'heart']),
      left: rand(2, 98),
      size: rand(10, 26),
      delay: rand(0, 14),
      duration: rand(15, 30),
      drift: rand(-70, 70),
      rotate: rand(120, 420) * (Math.random() > 0.5 ? 1 : -1),
      opacity: rand(0.4, 0.85),
    }))
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base animated gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(165deg, #fff2f8 0%, #ffdfea 26%, #ffcede 52%, #ffc2da 78%, #ffd6e7 100%)',
        }}
      />
      {/* dreamy radial glows */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 600px at 12% -10%, rgba(255,255,255,.95), transparent 60%),' +
            'radial-gradient(800px 620px at 108% 18%, rgba(232,121,198,.4), transparent 60%),' +
            'radial-gradient(720px 620px at -15% 62%, rgba(255,92,168,.28), transparent 62%),' +
            'radial-gradient(900px 700px at 55% 115%, rgba(255,138,92,.22), transparent 60%)',
        }}
      />
      {/* subtle polka dots */}
      <div className="pf-dots absolute inset-0 opacity-70" />

      {/* drifting aurora blobs */}
      {!reduce && (
        <>
          <div
            className="absolute -left-32 top-[8%] h-[30rem] w-[30rem] rounded-full opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(circle, #ffb3cd 0%, rgba(255,179,205,0) 70%)', animation: 'pf-blob-a 24s ease-in-out infinite' }}
          />
          <div
            className="absolute right-[-9rem] top-[30%] h-[34rem] w-[34rem] rounded-full opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(circle, #f0a8e0 0%, rgba(240,168,224,0) 70%)', animation: 'pf-blob-b 28s ease-in-out infinite' }}
          />
          <div
            className="absolute bottom-[-10rem] left-[22%] h-[32rem] w-[36rem] rounded-full opacity-55 blur-3xl"
            style={{ background: 'radial-gradient(circle, #ffc2a3 0%, rgba(255,194,163,0) 70%)', animation: 'pf-blob-c 22s ease-in-out infinite' }}
          />
        </>
      )}

      {/* floating particles */}
      {!reduce &&
        particles.map((p) => {
          const common = {
            key: p.id,
            className: 'absolute will-change-transform',
            style: { left: `${p.left}%` },
          }
          if (p.kind === 'petal') {
            // petals drift DOWN like falling blossom
            return (
              <motion.span
                {...common}
                initial={{ y: '-12vh', x: 0, rotate: 0, opacity: 0 }}
                animate={{ y: '112vh', x: [0, p.drift, 0, -p.drift], rotate: p.rotate, opacity: [0, p.opacity, p.opacity, 0] }}
                transition={{ duration: p.duration + 6, delay: p.delay, repeat: Infinity, ease: 'linear' }}
              >
                <span
                  className="pf-petal block"
                  style={{
                    width: p.size,
                    height: p.size * 0.72,
                    background: 'linear-gradient(135deg,#ffd3e3,#ff9ec7)',
                    boxShadow: 'inset -2px -2px 5px rgba(212,42,125,.35)',
                  }}
                />
              </motion.span>
            )
          }
          // everything else rises upward like sparkles from a dream
          const fall = { y: ['108vh', '-14vh'] }
          const anim = {
            y: fall.y,
            x: [0, p.drift, 0],
            opacity: [0, p.opacity, p.opacity, 0],
            rotate: [0, p.rotate],
          }
          const transition = { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }
          if (p.kind === 'bubble') {
            return (
              <motion.span {...common} animate={anim} transition={transition} initial={false}>
                <span
                  className="block rounded-full border border-white/80"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: 'radial-gradient(circle at 34% 34%, rgba(255,255,255,.95), rgba(255,255,255,.08) 62%)',
                    boxShadow: '0 0 10px rgba(255,255,255,.5), inset -2px -3px 6px rgba(255,158,199,.4)',
                  }}
                />
              </motion.span>
            )
          }
          const IconCmp = p.kind === 'heart' ? Heart : p.kind === 'star' ? Star : Sparkles
          const color = p.kind === 'star' ? '#ffd166' : p.kind === 'sparkle' ? '#ffffff' : '#ff5ca8'
          return (
            <motion.span {...common} animate={anim} transition={transition} initial={false}>
              <IconCmp
                size={p.size}
                strokeWidth={p.kind === 'sparkle' ? 1.6 : 2}
                fill={p.kind === 'sparkle' ? 'none' : color}
                color={p.kind === 'sparkle' ? '#fffbff' : color}
                style={{ filter: `drop-shadow(0 0 ${p.size / 2}px ${color}aa)` }}
              />
            </motion.span>
          )
        })}
    </div>
  )
}
