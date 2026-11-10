import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

/** Centered, sparkling section heading with a kicker chip. */
export default function SectionHeading({ kicker, title, highlight, sub, id }) {
  const reduce = useReducedMotion()
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
      <motion.span
        initial={{ opacity: 0, y: 18, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 160, damping: 16 }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-300/70 bg-white/70 py-1.5 pl-3 pr-4 font-rounded text-[11px] font-bold uppercase tracking-[0.22em] text-pink-600 shadow-[0_8px_22px_-10px_rgba(245,61,146,.6)] backdrop-blur-md"
      >
        <Sparkles size={13} className="text-pink-500" />
        {kicker}
        <Sparkles size={13} className="text-pink-500" />
      </motion.span>
      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65, delay: 0.08 }}
        className="font-display text-4xl font-black leading-[1.12] text-[#57203a] sm:text-5xl"
      >
        {title} {highlight && <span className="pf-gradient-text">{highlight}</span>}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mx-auto mt-4 max-w-xl font-rounded text-[15px] font-medium leading-relaxed text-[#8a4b63]"
        >
          {sub}
        </motion.p>
      )}
      {/* tiny divider hearts */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mt-6 flex items-center justify-center gap-2"
        aria-hidden="true"
      >
        <span className="h-px w-16 bg-gradient-to-r from-transparent via-pink-400 to-pink-400" />
        <span className="text-pink-500">💗</span>
        <span className="h-px w-16 bg-gradient-to-l from-transparent via-pink-400 to-pink-400" />
      </motion.div>
    </div>
  )
}
