import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import SectionHeading from './SectionHeading'
import TeddyBear from './TeddyBear'
import { TIMELINE } from '../data'

const KIND_STYLES = {
  Experience: 'from-pink-500 to-rose-500',
  Certification: 'from-amber-400 to-orange-500',
  Education: 'from-violet-500 to-purple-600',
  Achievement: 'from-yellow-400 to-pink-500',
}

function TimelineItem({ item, index }) {
  const reduce = useReducedMotion()
  const left = index % 2 === 0
  const { Icon, kind, title, org, period, points } = item

  return (
    <li className="relative pl-16 sm:pl-20 lg:pl-0">
      {/* node dot */}
      <span
        aria-hidden="true"
        className="pf-pulse-dot absolute left-[22px] top-6 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-pink-400 to-fuchsia-600 lg:left-1/2"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </span>

      {/* card */}
      <motion.article
        initial={reduce ? false : { opacity: 0, x: left ? -64 : 64, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 90, damping: 18 }}
        className={`pf-glow-card group relative max-w-xl rounded-3xl bg-white/80 p-5 backdrop-blur-md sm:p-6 ${
          left ? 'lg:mr-auto lg:ml-0 lg:pr-8' : 'lg:ml-auto lg:mr-0 lg:pl-8'
        } lg:w-[calc(50%-3.2rem)]`}
      >
        <div className="flex items-start gap-4">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${KIND_STYLES[kind] ?? KIND_STYLES.Experience} text-white shadow-[0_12px_26px_-10px_rgba(245,61,146,.7)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}
          >
            <Icon size={25} strokeWidth={1.9} />
          </span>
          <div className="min-w-0">
            <span className="inline-block rounded-full border border-pink-200 bg-pink-50 px-2.5 py-0.5 font-rounded text-[8.5px] font-bold uppercase tracking-[0.2em] text-pink-600">
              {kind}
            </span>
            <h3 className="mt-1.5 font-rounded text-[15.5px] font-bold leading-snug text-[#57203a]">{title}</h3>
            <p className="mt-0.5 font-rounded text-[11px] font-semibold text-[#a1667f]">{org}</p>
            <p className="mt-1 font-hand text-lg leading-none text-pink-500">{period}</p>
          </div>
        </div>
        <ul className="mt-4 space-y-1.5 border-t border-pink-100 pt-3.5">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2 font-rounded text-[12px] font-medium leading-snug text-[#63324a]">
              <Check size={13} strokeWidth={3.4} className="mt-0.5 shrink-0 text-pink-500" />
              {p}
            </li>
          ))}
        </ul>
      </motion.article>
    </li>
  )
}

export default function Timeline() {
  return (
    <section id="journey" aria-label="Experience and education" className="pf-section px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="The Journey"
          title="Experience &"
          highlight="education"
          sub="From SZABIST lecture halls to shipping for real clients — the winding pink road so far."
        />

        <div className="relative mx-auto max-w-5xl">
          {/* glowing spine */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[22px] top-8 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-300 via-fuchsia-500 to-amber-300 lg:left-1/2"
            style={{ boxShadow: '0 0 16px rgba(232,121,198,.65)' }}
          />
          {/* tiny teddy riding the spine, desktop only */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-4 top-10 z-10 hidden select-none opacity-95 xl:block">
            <TeddyBear variant="mini" size={76} interactive={false} floating ariaLabel="" />
          </div>

          <ol className="space-y-8 md:space-y-10">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={`${item.title}-${i}`} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
