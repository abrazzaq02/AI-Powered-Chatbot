import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { Heart, ArrowRight, MessagesSquare, Sparkles, Rocket, Star, ChevronDown, Wand2 } from 'lucide-react'
import TeddyBear from './TeddyBear'
import GlowButton from './GlowButton'

const ROLES = ['Creative Designer', 'Frontend Developer', 'UI/UX Enthusiast', 'Digital Creator', 'Brand Storyteller']

function useTypewriter() {
  const reduce = useReducedMotion()
  const [ri, setRi] = useState(0)
  const [typed, setTyped] = useState(reduce ? ROLES[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) {
      setTyped(ROLES[0])
      return
    }
    const full = ROLES[ri]
    if (!deleting && typed === full) {
      const t = window.setTimeout(() => setDeleting(true), 1750)
      return () => window.clearTimeout(t)
    }
    if (deleting && typed === '') {
      const t = window.setTimeout(() => {
        setDeleting(false)
        setRi((i) => (i + 1) % ROLES.length)
      }, 380)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(
      () => setTyped(full.slice(0, deleting ? typed.length - 1 : typed.length + 1)),
      deleting ? 30 : 58 + Math.random() * 45
    )
    return () => window.clearTimeout(t)
  }, [typed, deleting, ri, reduce])

  return typed
}

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(6px)' },
  show: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: 0.14 * i, ease: [0.22, 1, 0.36, 1] },
  }),
}

const STATS = [
  { value: '3+', label: 'Years crafting' },
  { value: '40+', label: 'Projects shipped' },
  { value: '25+', label: 'Happy clients' },
  { value: '∞', label: 'Cups of chai' },
]

const CHIPS = [
  { Icon: Rocket, text: '40+ projects shipped', pos: 'left-0 top-[16%] sm:-left-2', delay: '0.55s', cls: 'pf-float' },
  { Icon: Star, text: '4.9/5 client rating', pos: 'right-0 top-[8%] sm:-right-2', delay: '1.1s', cls: 'pf-float-slow' },
  { Icon: Wand2, text: 'UI/UX + Code magic', pos: 'left-1 bottom-[24%] sm:-left-4', delay: '0.8s', cls: 'pf-float-slow' },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const typed = useTypewriter()
  const heroRef = useRef(null)

  /* mouse parallax */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const teddyX = useSpring(mx, { stiffness: 90, damping: 16, mass: 0.7 })
  const teddyY = useSpring(my, { stiffness: 90, damping: 16, mass: 0.7 })
  const teddyRotate = useSpring(mx, { stiffness: 70, damping: 14 })
  const chipX = useSpring(mx, { stiffness: 60, damping: 18 })
  const chipY = useSpring(my, { stiffness: 60, damping: 18 })

  const onMouseMove = useCallback(
    (e) => {
      if (reduce || !heroRef.current) return
      const r = heroRef.current.getBoundingClientRect()
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 2) // -1..1
      my.set(((e.clientY - r.top) / r.height - 0.5) * 2)
    },
    [mx, my, reduce]
  )
  const onMouseLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
  }, [mx, my])

  const scrollTo = useCallback(
    (id) => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }),
    [reduce]
  )

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label="Portfolio introduction"
      className="pf-section relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-20 pt-28 sm:pt-32"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.08fr_1fr] lg:gap-6 xl:gap-14">
        {/* ============ LEFT — COPY ============ */}
        <div className="relative z-10 order-2 text-center lg:order-1 lg:text-left">
          {/* availability badge */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="mb-5 flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-pink-300/70 bg-white/80 py-1.5 pl-2 pr-4 font-rounded text-[11px] font-bold uppercase tracking-[0.18em] text-pink-700 shadow-[0_10px_28px_-12px_rgba(245,61,146,.6)] backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Available for freelance
            </span>
          </motion.div>

          {/* hello line */}
          <motion.p custom={1} variants={fadeUp} initial="hidden" animate="show" className="font-hand text-2xl text-pink-500 sm:text-3xl">
            welcome to my little corner of the internet ✨
          </motion.p>

          {/* main heading */}
          <motion.h1
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-1 font-display text-[2.75rem] font-black leading-[1.06] tracking-tight text-[#57203a] sm:text-6xl xl:text-[4.35rem]"
          >
            Hey! I’m{' '}
            <span className="pf-gradient-text whitespace-nowrap">Ayesha Noor</span>
            <Heart
              aria-hidden="true"
              className="pf-heartbeat ml-3 inline-block align-[-0.08em] text-pink-500 drop-shadow-[0_4px_10px_rgba(245,61,146,.6)]"
              size={44}
              fill="#ff5ca8"
              strokeWidth={1.4}
            />
          </motion.h1>

          {/* subtitle roles */}
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 font-rounded text-[13px] font-bold uppercase tracking-[0.24em] text-[#a8557a] sm:text-sm"
          >
            Creative Designer <span className="text-pink-400">|</span> Developer <span className="text-pink-400">|</span> Digital Creator
          </motion.p>

          {/* typewriter line */}
          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            aria-live="polite"
            className="mt-3 h-8 font-rounded text-lg font-bold text-pink-600 sm:text-xl"
          >
            <span className="text-pink-400">~/</span> currently:{' '}
            <span className="pf-gradient-text">{typed}</span>
            <span className="pf-caret ml-0.5 inline-block h-[1.15em] w-[3px] translate-y-[0.2em] rounded-full bg-pink-500 align-baseline" />
          </motion.p>

          {/* intro */}
          <motion.p
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto mt-4 max-w-md font-rounded text-[15px] font-medium leading-relaxed text-[#7d4159] lg:mx-0"
          >
            I’m a Hyderabad-based designer & developer who turns chai-fuelled sketches into{' '}
            <span className="font-bold text-pink-600">living, breathing web experiences</span> — where every pixel
            cuddles the last and every animation has a reason to exist.
          </motion.p>

          {/* CTAs */}
          <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show" className="mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 lg:justify-start">
            <GlowButton href="#projects" variant="primary" icon={ArrowRight} ariaLabel="Explore my work — jump to projects">
              Explore My Work
            </GlowButton>
            <GlowButton href="#contact" variant="ghost" icon={MessagesSquare} ariaLabel="Let's talk — jump to contact">
              Let’s Talk
            </GlowButton>
          </motion.div>

          {/* stats */}
          <motion.dl custom={7} variants={fadeUp} initial="hidden" animate="show" className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 lg:justify-start">
            {STATS.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-black text-[#57203a] sm:text-3xl">
                  {s.value}
                </dd>
                <dd className="font-rounded text-[10px] font-bold uppercase tracking-[0.14em] text-pink-500">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ============ RIGHT — TEDDY UNIVERSE ============ */}
        <div className="relative order-1 mx-auto flex h-[330px] w-full max-w-[420px] items-center justify-center sm:h-[420px] sm:max-w-[480px] lg:order-2 lg:h-[560px] lg:max-w-none">
          {/* rotating dashed rings */}
          <div aria-hidden="true" className="pf-spin-slower absolute h-[270px] w-[270px] rounded-full border-[3px] border-dashed border-pink-400/50 sm:h-[350px] sm:w-[350px] lg:h-[460px] lg:w-[460px]" />
          <div aria-hidden="true" className="pf-spin-reverse absolute h-[200px] w-[200px] rounded-full border-2 border-pink-300/60 sm:h-[260px] sm:w-[260px] lg:h-[330px] lg:w-[330px]" />
          {/* pedestal glow */}
          <div
            aria-hidden="true"
            className="absolute h-[220px] w-[220px] rounded-full sm:h-[300px] sm:w-[300px] lg:h-[380px] lg:w-[380px]"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(255,205,226,.75) 48%, rgba(255,205,226,0) 72%)' }}
          />

          {/* twinkling stars */}
          {[
            { top: '6%', left: '14%', delay: '0s', size: 22 },
            { top: '16%', right: '8%', delay: '.7s', size: 16 },
            { top: '58%', left: '2%', delay: '1.3s', size: 18 },
            { top: '38%', right: '0%', delay: '.4s', size: 24 },
            { top: '80%', right: '18%', delay: '1.8s', size: 14 },
          ].map((s, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="pf-twinkle absolute text-amber-300"
              style={{ top: s.top, left: s.left, right: s.right, animationDelay: s.delay, filter: 'drop-shadow(0 0 6px #ffd166)' }}
            >
              <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z"/></svg>
            </span>
          ))}

          {/* floating hearts */}
          <Heart aria-hidden="true" size={30} fill="#ff5ca8" strokeWidth={0} className="pf-float-fast absolute left-[8%] top-[30%] text-pink-500 drop-shadow-[0_0_10px_rgba(255,92,168,.7)]" />
          <Heart aria-hidden="true" size={20} fill="#e879c6" strokeWidth={0} className="pf-float absolute bottom-[18%] right-[10%] text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,198,.7)]" style={{ animationDelay: '1.2s' }} />
          <Heart aria-hidden="true" size={15} fill="#ffb3cd" strokeWidth={0} className="pf-float-slow absolute right-[22%] top-[4%] text-pink-300" />

          {/* the star himself — mouse-aware */}
          <motion.div style={{ x: teddyX, y: teddyY, rotate: teddyRotate }} className="relative z-10 scale-[0.78] sm:scale-95 lg:scale-110 xl:scale-[1.18]">
            <TeddyBear variant="wave" size={218} interactive ariaLabel="Beebo the teddy bear, waving hello" />
          </motion.div>

          {/* floating info chips (counter-parallax) */}
          <motion.div style={{ x: chipX, y: chipY }} className="pointer-events-none absolute inset-0 z-20 hidden sm:block" aria-hidden="true">
            {CHIPS.map(({ Icon, text, pos, delay, cls }) => (
              <div key={text} className={`absolute ${pos}`}>
                <div className={cls} style={{ animationDelay: delay }}>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/90 bg-white/85 px-3.5 py-2 shadow-[0_14px_34px_-14px_rgba(245,61,146,.65)] backdrop-blur-xl">
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-fuchsia-500 text-white">
                      <Icon size={15} strokeWidth={2.2} />
                    </span>
                    <span className="font-rounded text-[11.5px] font-bold text-[#6e2c48]">{text}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-label="Scroll down to about section"
        className="group absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 outline-none focus-visible:ring-4 focus-visible:ring-pink-400/60 rounded-2xl"
      >
        <span className="font-hand text-lg leading-none text-pink-500 transition-colors group-hover:text-pink-600">scroll for magic</span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-pink-400/80 bg-white/50 p-1 backdrop-blur-sm">
          <motion.span
            animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-1.5 rounded-full bg-pink-500"
          />
        </span>
        <ChevronDown size={16} className="text-pink-400" />
      </motion.button>
    </section>
  )
}
