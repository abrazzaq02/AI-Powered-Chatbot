import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Cake, Briefcase, Mail, Sparkles, Heart, Star, BadgeCheck, Download } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { ABOUT_BARS } from '../data'

const FACTS = [
  { Icon: Briefcase, label: 'Role', value: 'Creative Dev & Designer' },
  { Icon: MapPin, label: 'Location', value: 'Hyderabad, Pakistan' },
  { Icon: Cake, label: 'Age', value: '23 — forever young ✨' },
  { Icon: Mail, label: 'Email', value: 'ayesha.creates@gmail.com' },
]

function Bar({ label, level, index }) {
  const reduce = useReducedMotion()
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="font-rounded text-[12.5px] font-bold text-[#6e2c48]">{label}</span>
        <span className="font-rounded text-[11px] font-bold text-pink-500">{level}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-2.5 overflow-hidden rounded-full bg-pink-100"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-500 to-fuchsia-500 shadow-[0_0_12px_rgba(245,61,146,.6)]"
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.25, delay: 0.18 + index * 0.14, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export default function About() {
  const reduce = useReducedMotion()

  const downloadVCard = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Noor;Ayesha;;;',
      'FN:Ayesha Noor',
      'TITLE:Creative Designer | Developer | Digital Creator',
      'EMAIL:ayesha.creates@gmail.com',
      'TEL:+923001234567',
      'ADR:;;Hyderabad;Sindh;;Pakistan',
      'URL:https://github.com/ayeshanoor',
      'END:VCARD',
    ].join('\r\n')
    const url = URL.createObjectURL(new Blob([vcard], { type: 'text/vcard' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'Ayesha-Noor.vcf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section id="about" aria-labelledby="about-heading" className="pf-section px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="About Me"
          title="The human behind"
          highlight="the pixels"
          sub="A little about me — my story, my toolkit, and why everything I touch ends up at least a little bit pink."
          id="about-heading"
        />

        <div className="pf-glass relative mx-auto grid max-w-5xl gap-10 overflow-hidden rounded-[2.2rem] p-7 sm:p-10 md:grid-cols-[auto_1fr] md:gap-14">
          {/* floating decorations */}
          <Sparkles aria-hidden="true" size={30} className="pf-float pointer-events-none absolute left-6 top-6 text-pink-300" />
          <Heart aria-hidden="true" size={22} fill="#ffb3cd" strokeWidth={0} className="pf-float-slow pointer-events-none absolute right-8 top-10 text-pink-300" />
          <Star aria-hidden="true" size={18} fill="#ffd166" strokeWidth={0} className="pf-float-fast pointer-events-none absolute bottom-24 right-10 hidden text-amber-300 md:block" />
          <Heart aria-hidden="true" size={16} fill="#ffc2e0" strokeWidth={0} className="pf-float pointer-events-none absolute bottom-10 left-8 hidden text-pink-200 md:block" style={{ animationDelay: '1.4s' }} />

          {/* ===== avatar w/ rotating conic glow ring ===== */}
          <div className="relative mx-auto flex flex-col items-center md:mx-0">
            <div className="relative">
              <div className="pf-ring relative h-48 w-48 rounded-full p-[5px] sm:h-60 sm:w-60 md:h-64 md:w-64">
                <img
                  src="/portfolio/avatar.jpg"
                  alt="Illustrated portrait of Ayesha Noor, smiling warmly in a pastel pink outfit with gold earrings"
                  className="relative z-[1] h-full w-full rounded-full object-cover object-[50%_15%]"
                  loading="lazy"
                  width={256}
                  height={256}
                />
              </div>
              {/* verified badge — outside the clipped ring so it never gets cut */}
              <span className="absolute -right-2 bottom-2 z-[3] flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg" title="Verified human (and professional chai taster)">
                <BadgeCheck size={22} className="text-white" strokeWidth={2.4} />
              </span>
            </div>

            <button
              onClick={downloadVCard}
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-pink-300 bg-white/80 px-5 py-2.5 font-rounded text-xs font-bold uppercase tracking-[0.14em] text-pink-700 shadow-sm outline-none transition-all duration-300 hover:border-pink-400 hover:bg-pink-50 hover:text-pink-800 hover:shadow-[0_10px_28px_-10px_rgba(245,61,146,.6)] focus-visible:ring-4 focus-visible:ring-pink-400/60 active:scale-95"
              aria-label="Download Ayesha's contact card (vCard)"
            >
              <Download size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              Save my contact
            </button>
          </div>

          {/* ===== bio ===== */}
          <div className="relative">
            <h3 className="font-display text-3xl font-black text-[#57203a] sm:text-4xl">
              Ayesha Noor <span className="align-middle text-2xl">🌸</span>
            </h3>
            <p className="mt-1.5 font-hand text-2xl text-pink-500">“designing with heart, shipping with sparkle”</p>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {FACTS.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-2xl border border-pink-100 bg-white/60 px-3.5 py-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-fuchsia-500 text-white shadow-sm">
                    <Icon size={15} strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-rounded text-[9.5px] font-bold uppercase tracking-[0.16em] text-pink-400">{label}</span>
                    <span className="block truncate font-rounded text-[12px] font-bold text-[#5e2940]" title={value}>{value}</span>
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-5 font-rounded text-[14.5px] font-medium leading-relaxed text-[#6e3a52]">
              Hey! I’m Ayesha — a <strong className="text-pink-700">creative frontend developer</strong> and{' '}
              <strong className="text-pink-700">UI/UX designer</strong> based in Hyderabad, Pakistan, with 3+ years of
              turning “what if…” into shippable, delightful products. I live at the intersection of{' '}
              <em>buttery motion design</em> and <em>engineering rigor</em> — building design systems, storefronts and
              playful interfaces for startups across Pakistan, the Gulf and beyond. When I’m not pushing pixels, I’m
              sketching logos, curating my “99 cups of chai” collection, or hunting for the perfect pastel shade of — obviously — pink.
            </p>

            {/* animated bars */}
            <div className="mt-6 space-y-4">
              {ABOUT_BARS.map((b, i) => (
                <Bar key={b.label} {...b} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
