import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import TeddyBear from './TeddyBear'
import { SKILLS } from '../data'

function SkillCard({ skill, index }) {
  const reduce = useReducedMotion()
  const { Icon, name, level, hue, tag } = skill

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 46, rotate: index % 2 ? 2.5 : -2.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.09, type: 'spring', stiffness: 110, damping: 16 }}
      whileHover={reduce ? undefined : { y: -10, scale: 1.03 }}
      className="pf-glow-card group relative overflow-hidden rounded-3xl bg-white/75 p-5 backdrop-blur-md"
    >
      {/* soft corner glow on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-pink-300/40 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${hue} text-white shadow-[0_10px_22px_-8px_rgba(245,61,146,.7)] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110`}
          >
            <Icon size={26} strokeWidth={1.9} />
          </span>
          <span>
            <h3 className="font-rounded text-[15px] font-bold leading-tight text-[#57203a]">{name}</h3>
            <span className="mt-1 inline-block rounded-full border border-pink-200 bg-pink-50 px-2 py-0.5 font-rounded text-[9px] font-bold uppercase tracking-[0.16em] text-pink-600">
              {tag}
            </span>
          </span>
        </div>
        <span className="font-display text-[26px] font-black leading-none text-pink-300 transition-colors duration-300 group-hover:text-pink-500">
          {level}
        </span>
      </div>

      {/* progress track */}
      <div className="relative mt-4">
        <div
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} proficiency`}
          className="h-2.5 overflow-hidden rounded-full bg-pink-100/90"
        >
          <motion.div
            className="relative h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-500 to-fuchsia-500"
            initial={reduce ? false : { width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.15, delay: 0.15 + (index % 4) * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/4 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,140,190,.9)]" />
          </motion.div>
        </div>
        <div className="mt-1.5 flex justify-between font-rounded text-[9px] font-bold uppercase tracking-[0.18em] text-pink-300">
          <span>newbie</span>
          <span>wizard ✨</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="pf-section px-5 py-20 sm:px-8 md:py-28">
      {/* hidden mini teddy on wide screens, cheering from the side */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-16 left-2 hidden select-none opacity-90 xl:block 2xl:left-8">
        <TeddyBear variant="heart" size={104} interactive={false} floating ariaLabel="" />
      </div>

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="My Toolkit"
          title="Skills, sprinkled"
          highlight="with magic"
          sub="Eight superpowers, endlessly levelled up. Hover a card — they glow when you do."
          id="skills-heading"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        <p className="mt-10 text-center font-hand text-2xl text-pink-400">
          …plus an unhealthy obsession with spacing systems & pastel palettes 💗
        </p>
      </div>
    </section>
  )
}
