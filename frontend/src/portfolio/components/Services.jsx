import { motion, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { SERVICES } from '../data'

function ServiceCard({ service, index }) {
  const reduce = useReducedMotion()
  const { Icon, title, desc, features, price } = service

  const book = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 52, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, type: 'spring', stiffness: 105, damping: 17 }}
      whileHover={reduce ? undefined : { y: -12 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-pink-200/70 bg-white/80 p-6 shadow-[0_18px_45px_-24px_rgba(245,61,146,.5)] backdrop-blur-md transition-shadow duration-500 hover:border-pink-400/80 hover:shadow-[0_32px_75px_-25px_rgba(245,61,146,.75),0_0_0_1px_rgba(255,140,190,.6)]"
    >
      {/* glow orb */}
      <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(255,138,181,.45),transparent_70%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* animated icon tile */}
      <div className="relative">
        <span className="absolute -left-1.5 top-1.5 h-14 w-14 rounded-2xl bg-pink-300/50 transition-transform duration-500 group-hover:rotate-[14deg]" aria-hidden="true" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-600 text-white shadow-[0_14px_30px_-10px_rgba(245,61,146,.8)] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <Icon size={26} strokeWidth={1.8} />
        </span>
      </div>

      <h3 className="relative mt-5 font-display text-[21px] font-black text-[#57203a]">{title}</h3>
      <p className="relative mt-1.5 font-rounded text-[12.5px] font-medium leading-relaxed text-[#7d4159]">{desc}</p>

      <ul className="relative mt-4 space-y-1.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 font-rounded text-[11.5px] font-semibold text-[#63324a]">
            <Check size={13} strokeWidth={3.4} className="mt-0.5 shrink-0 text-pink-500" />
            {f}
          </li>
        ))}
      </ul>

      {/* footer row */}
      <div className="relative mt-auto flex items-center justify-between border-t border-pink-100 pt-4">
        <span>
          <span className="block font-rounded text-[9px] font-bold uppercase tracking-[0.2em] text-pink-400">Starting at</span>
          <span className="font-display text-2xl font-black text-pink-600">{price}</span>
        </span>
        <button
          onClick={book}
          aria-label={`Book ${title} — jump to contact form`}
          className="group/btn inline-flex items-center gap-1.5 rounded-full bg-pink-100 py-2 pl-4 pr-2.5 font-rounded text-[11px] font-bold uppercase tracking-[0.1em] text-pink-700 outline-none transition-all duration-300 hover:bg-pink-500 hover:text-white hover:shadow-[0_10px_26px_-8px_rgba(245,61,146,.8)] focus-visible:ring-4 focus-visible:ring-pink-400/60 active:scale-95"
        >
          Book this
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-pink-600 shadow-sm transition-all duration-300 group-hover/btn:bg-white/25 group-hover/btn:text-white">
            <ArrowRight size={13} strokeWidth={2.8} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </span>
        </button>
      </div>
    </motion.article>
  )
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="pf-section px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="What I Offer"
          title="Services wrapped"
          highlight="in pink ribbon"
          sub="From fuzzy concept to flawless launch — pick a lane, or let’s mix a few into one delicious package."
          id="services-heading"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* availability ribbon */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-3xl border border-pink-200/80 bg-gradient-to-r from-pink-100/80 via-rose-100/80 to-fuchsia-100/80 px-6 py-5 text-center backdrop-blur-md sm:flex-row sm:gap-6">
          <span className="flex h-3 w-3 shrink-0 rounded-full bg-emerald-400 pf-pulse-dot" aria-hidden="true" />
          <p className="font-rounded text-[13px] font-bold text-[#6e2c48]">
            Currently booking <span className="text-pink-600">January — March 2026</span> · 2 freelance slots left · replies within 24h
          </p>
          <span className="font-hand text-xl text-pink-500">let’s make something →</span>
        </div>
      </div>
    </section>
  )
}
