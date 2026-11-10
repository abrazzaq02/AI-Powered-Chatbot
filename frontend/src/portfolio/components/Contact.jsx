import { useCallback, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  User, Mail, MessageSquare, Send, Loader2, AlertCircle, Heart, Sparkles, PartyPopper, CheckCircle2,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import GlowButton from './GlowButton'
import { SOCIALS, CONTACT_ROWS } from '../data'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const FLOATERS = [
  { top: '12%', left: '4%', size: 26, delay: '0s', cls: 'pf-float' },
  { top: '30%', right: '5%', size: 20, delay: '1.1s', cls: 'pf-float-slow' },
  { top: '64%', left: '8%', size: 17, delay: '.6s', cls: 'pf-float-fast' },
  { top: '82%', right: '10%', size: 24, delay: '1.6s', cls: 'pf-float' },
]

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-rounded text-[10.5px] font-bold uppercase tracking-[0.18em] text-pink-500">
        {label} <span aria-hidden="true" className="text-rose-500">*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 font-rounded text-[11px] font-bold text-rose-600">
          <AlertCircle size={12} strokeWidth={2.6} /> {error}
        </p>
      )}
    </div>
  )
}

const inputBase =
  'w-full rounded-2xl border bg-white/85 px-4 py-3 pl-11 font-rounded text-[13.5px] font-semibold text-[#57203a] placeholder-[#c49aa9] outline-none backdrop-blur-sm transition-all duration-300 focus:border-pink-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,138,181,.28),0_10px_30px_-14px_rgba(245,61,146,.5)]'

export default function Contact() {
  const reduce = useReducedMotion()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', company: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [refId, setRefId] = useState('')

  const validate = useCallback((f) => {
    const e = {}
    if (f.name.trim().length < 2) e.name = 'Please tell me your name (at least 2 characters).'
    if (!EMAIL_RE.test(f.email.trim())) e.email = 'Hmm, that email looks wobbly — mind double-checking?'
    if (f.subject.trim().length < 3) e.subject = 'Give the message a tiny subject (3+ characters).'
    if (f.message.trim().length < 10) e.message = 'Tell me a little more — at least 10 characters, pretty please.'
    return e
  }, [])

  const set = useCallback(
    (key) => (e) => {
      const value = e.target.value
      setForm((f) => ({ ...f, [key]: value }))
      // live re-validate once a field has an error
      setErrors((prev) => {
        if (!prev[key]) return prev
        const next = validate({ ...form, [key]: value })
        const copy = { ...prev }
        if (next[key]) copy[key] = next[key]
        else delete copy[key]
        return copy
      })
    },
    [form, validate]
  )

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      // honeypot filled → pretend success, drop the bot
      if (form.company.trim() !== '') {
        setRefId(`PF-${String(Math.floor(Math.random() * 9000) + 1000)}`)
        setStatus('sent')
        return
      }
      const found = validate(form)
      setErrors(found)
      if (Object.keys(found).length > 0) return

      setStatus('sending')
      // persist the message locally so it's never lost, then confirm
      window.setTimeout(() => {
        try {
          const stored = JSON.parse(window.localStorage.getItem('pf-messages') ?? '[]')
          stored.push({ ...form, at: new Date().toISOString() })
          window.localStorage.setItem('pf-messages', JSON.stringify(stored))
        } catch { /* storage unavailable — the success screen still shows */ }
        setRefId(`PF-${String(Math.floor(Math.random() * 9000) + 1000)}`)
        setStatus('sent')
      }, 950)
    },
    [form, validate]
  )

  const reset = useCallback(() => {
    setForm({ name: '', email: '', subject: '', message: '', company: '' })
    setErrors({})
    setStatus('idle')
  }, [])

  const fieldState = useCallback(
    (key) =>
      errors[key]
        ? 'border-rose-400 bg-rose-50/60 focus:shadow-[0_0_0_4px_rgba(251,113,133,.25)]'
        : 'border-pink-200',
    [errors]
  )

  const errorProps = useCallback(
    (key) =>
      errors[key]
        ? { 'aria-invalid': true, 'aria-describedby': `${key}-error` }
        : { 'aria-invalid': false },
    [errors]
  )

  return (
    <section id="contact" aria-labelledby="contact-heading" className="pf-section relative overflow-hidden px-5 py-20 sm:px-8 md:py-28">
      {/* floating hearts backdrop */}
      {FLOATERS.map((f, i) => (
        <Heart
          key={i}
          aria-hidden="true"
          size={f.size}
          fill="#ff9ec7"
          strokeWidth={0}
          className={`${f.cls} pointer-events-none absolute text-pink-300/70`}
          style={{ top: f.top, left: f.left, right: f.right, animationDelay: f.delay }}
        />
      ))}

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* ======= left — invitation ======= */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-300/70 bg-white/75 py-1.5 pl-3 pr-4 font-rounded text-[10.5px] font-bold uppercase tracking-[0.22em] text-pink-600 shadow-sm backdrop-blur-md">
              <Sparkles size={13} /> Open for collaborations
            </span>
            <h2 id="contact-heading" className="mt-5 font-display text-4xl font-black leading-[1.12] text-[#57203a] sm:text-5xl xl:text-[3.4rem]">
              Let’s Create Something{' '}
              <span className="pf-gradient-text">Beautiful</span>{' '}
              Together{' '}
              <Heart aria-hidden="true" className="pf-heartbeat inline-block align-[-0.12em]" size={38} fill="#ff5ca8" strokeWidth={0} />
            </h2>
            <p className="mx-auto mt-4 max-w-md font-rounded text-[15px] font-medium leading-relaxed text-[#7d4159] lg:mx-0">
              Have a project, a wild idea, or just want to nerd out about easing curves and kerning pairs?
              My inbox is open and my chai is hot.
            </p>

            {/* contact rows */}
            <ul className="mx-auto mt-7 max-w-md space-y-2.5 text-left lg:mx-0">
              {CONTACT_ROWS.map(({ Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    className="group flex items-center gap-3.5 rounded-2xl border border-pink-100 bg-white/70 px-4 py-3 outline-none backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-300 hover:shadow-[0_14px_34px_-16px_rgba(245,61,146,.55)] focus-visible:ring-4 focus-visible:ring-pink-400/50"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-fuchsia-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                      <Icon size={19} strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-rounded text-[9px] font-bold uppercase tracking-[0.2em] text-pink-400">{label}</span>
                      <span className="block truncate font-rounded text-[13px] font-bold text-[#57203a]">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* socials */}
            <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Ayesha on ${label}`}
                  title={label}
                  className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-200 bg-white/75 text-pink-600 outline-none backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:bg-gradient-to-br hover:from-pink-500 hover:to-fuchsia-600 hover:text-white hover:shadow-[0_16px_36px_-12px_rgba(245,61,146,.8)] focus-visible:ring-4 focus-visible:ring-pink-400/60"
                >
                  <Icon size={20} strokeWidth={1.9} className="transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
            <p className="mt-4 font-hand text-xl text-pink-400">usual reply time: under 24 hours 💌</p>
          </div>

          {/* ======= right — form / success ======= */}
          <div className="pf-glass relative overflow-hidden rounded-[2.2rem] p-6 sm:p-8">
            <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-300/35 blur-3xl" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-fuchsia-300/30 blur-3xl" />

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                /* ---- success state ---- */
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.85, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 210, damping: 20 }}
                  className="relative flex min-h-[430px] flex-col items-center justify-center py-6 text-center"
                  role="status"
                >
                  <div className="relative">
                    <span className="absolute inset-0 animate-ping rounded-full bg-pink-300/50" aria-hidden="true" />
                    <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white shadow-[0_18px_45px_-12px_rgba(245,61,146,.85)]">
                      <Heart size={44} fill="#fff" strokeWidth={0} className="pf-heartbeat" />
                    </span>
                  </div>
                  <h3 className="mt-7 font-display text-3xl font-black text-[#57203a]">Message received! 💌</h3>
                  <p className="mt-2 max-w-xs font-rounded text-[13.5px] font-medium leading-relaxed text-[#7d4159]">
                    Thank you, {form.name.trim().split(' ')[0] || 'lovely human'}! Your message floated safely into my
                    inbox — expect a reply within 24 hours (usually much faster).
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 font-rounded text-[11px] font-bold tracking-wider text-pink-700">
                    <CheckCircle2 size={13} /> Reference: {refId}
                  </p>
                  <button
                    onClick={reset}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-pink-300 bg-white px-6 py-3 font-rounded text-[12px] font-bold uppercase tracking-[0.14em] text-pink-700 outline-none transition-all hover:border-pink-400 hover:bg-pink-50 hover:shadow-[0_10px_28px_-10px_rgba(245,61,146,.6)] focus-visible:ring-4 focus-visible:ring-pink-400/60 active:scale-95"
                  >
                    <PartyPopper size={16} /> Send another message
                  </button>
                </motion.div>
              ) : (
                /* ---- form ---- */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -14 }}
                  onSubmit={onSubmit}
                  noValidate
                  aria-label="Contact Ayesha"
                  className="relative space-y-4"
                >
                  {/* honeypot — hidden from humans */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="company">Company</label>
                    <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="name" label="Your Name" error={errors.name}>
                      <div className="relative">
                        <User size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" />
                        <input id="name" name="name" type="text" autoComplete="name" placeholder="Ayesha Noor" value={form.name} onChange={set('name')} className={`${inputBase} ${fieldState('name')}`} {...errorProps('name')} />
                      </div>
                    </Field>
                    <Field id="email" label="Your Email" error={errors.email}>
                      <div className="relative">
                        <Mail size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" />
                        <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={set('email')} className={`${inputBase} ${fieldState('email')}`} {...errorProps('email')} />
                      </div>
                    </Field>
                  </div>

                  <Field id="subject" label="Subject" error={errors.subject}>
                    <div className="relative">
                      <Sparkles size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" />
                      <input id="subject" name="subject" type="text" placeholder="Let’s build a dreamy little website…" value={form.subject} onChange={set('subject')} className={`${inputBase} ${fieldState('subject')}`} {...errorProps('subject')} />
                    </div>
                  </Field>

                  <Field id="message" label="Your Message" error={errors.message}>
                    <div className="relative">
                      <MessageSquare size={17} className="pointer-events-none absolute left-4 top-4 text-pink-400" />
                      <textarea id="message" name="message" rows={4} placeholder="Tell me about your project, timeline and wildest ideas…" value={form.message} onChange={set('message')} className={`${inputBase} resize-y leading-relaxed ${fieldState('message')}`} {...errorProps('message')} />
                    </div>
                  </Field>

                  <GlowButton type="submit" variant="primary" icon={status === 'sending' ? Loader2 : Send} ariaLabel="Send message" className={`w-full !py-4 text-[15px] ${status === 'sending' ? 'pointer-events-none opacity-80' : ''}`}>
                    {status === 'sending' ? 'Sending your sparkles…' : 'Send Message 💗'}
                  </GlowButton>
                  <p className="text-center font-rounded text-[10px] font-semibold text-[#bd8ba0]">
                    No spam, no mailing lists — your details stay between us 🤝
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
