import {
  FileCode2, Paintbrush, Braces, Atom, Figma, PenTool, Lightbulb, MessagesSquare,
  Globe, MonitorSmartphone, LayoutTemplate, Palette, Sparkles, Code2,
  GraduationCap, Briefcase, Award, Trophy, BadgeCheck,
  Instagram, Linkedin, Github, Facebook, Mail, MapPin, Phone,
} from 'lucide-react'

/* ============ NAV ============ */
export const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
]

export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/ayeshanoor.designs', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayeshanoor-dev', Icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/ayeshanoor', Icon: Github },
  { label: 'Facebook', href: 'https://www.facebook.com/ayeshanoor.creates', Icon: Facebook },
  { label: 'Email', href: 'mailto:ayesha.creates@gmail.com', Icon: Mail },
]

export const CONTACT_ROWS = [
  { Icon: Mail, label: 'Email', value: 'ayesha.creates@gmail.com', href: 'mailto:ayesha.creates@gmail.com' },
  { Icon: Phone, label: 'Phone', value: '+92 300 1234567', href: 'tel:+923001234567' },
  { Icon: MapPin, label: 'Studio', value: 'Hyderabad, Sindh, Pakistan', href: 'https://maps.google.com/?q=Hyderabad+Pakistan' },
]

/* ============ SKILLS ============ */
export const SKILLS = [
  { name: 'HTML', level: 96, Icon: FileCode2, hue: 'from-rose-400 to-orange-400', tag: 'Expert' },
  { name: 'CSS', level: 93, Icon: Paintbrush, hue: 'from-sky-400 to-indigo-400', tag: 'Expert' },
  { name: 'JavaScript', level: 90, Icon: Braces, hue: 'from-amber-400 to-yellow-500', tag: 'Expert' },
  { name: 'React', level: 92, Icon: Atom, hue: 'from-cyan-400 to-sky-500', tag: 'Expert' },
  { name: 'UI/UX Design', level: 88, Icon: Figma, hue: 'from-fuchsia-400 to-purple-500', tag: 'Advanced' },
  { name: 'Graphic Design', level: 84, Icon: PenTool, hue: 'from-pink-400 to-rose-500', tag: 'Advanced' },
  { name: 'Creativity', level: 97, Icon: Lightbulb, hue: 'from-yellow-400 to-pink-400', tag: 'Off the charts' },
  { name: 'Communication', level: 91, Icon: MessagesSquare, hue: 'from-emerald-400 to-teal-500', tag: 'Advanced' },
]

export const ABOUT_BARS = [
  { label: 'Frontend Development', level: 92 },
  { label: 'UI/UX & Product Design', level: 88 },
  { label: 'Motion & Interaction', level: 85 },
  { label: 'Branding & Illustration', level: 78 },
]

/* ============ PROJECTS ============ */
export const PROJECTS = [
  {
    slug: 'aurora-fashion',
    title: 'Aurora — Fashion E-Commerce',
    category: 'Full-Stack Web App',
    year: '2025',
    art: 'store',
    gradient: 'from-rose-400 via-pink-500 to-fuchsia-600',
    blurb: 'A dreamy headless storefront for a Lahore-based couture label — 3D lookbook, instant search, Stripe checkout and a 38% lift in mobile conversion.',
    tags: ['React', 'Next.js', 'Tailwind', 'Stripe', 'Sanity CMS'],
    metrics: [ { value: '+38%', label: 'Mobile conversion' }, { value: '1.2s', label: 'LCP on 4G' }, { value: '12k', label: 'Monthly visits' } ],
    features: ['Headless storefront with visual page builder', '3D lookbook & virtual try-on teaser', 'Stripe checkout + one-click reorder', 'Live inventory synced to Instagram shop'],
    role: 'Lead Frontend & UI/UX',
    span: 'lg:col-span-2 lg:row-span-2',
    featured: true,
  },
  {
    slug: 'blossom-dashboard',
    title: 'Blossom — Creator Analytics',
    category: 'Product Design & Dev',
    year: '2025',
    art: 'dashboard',
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
    blurb: 'A pastel analytics suite for 4,000+ creators — revenue, engagement and audience health at a glance, with AI-written weekly recaps.',
    tags: ['React', 'D3.js', 'Firebase', 'OpenAI API'],
    metrics: [ { value: '4k+', label: 'Creators onboarded' }, { value: '96', label: 'Lighthouse a11y' }, { value: '4.9★', label: 'Avg. rating' } ],
    features: ['Realtime revenue & engagement charts', 'AI-generated weekly growth recaps', 'Audience cohorts & churn alerts', 'White-label PDF reports'],
    role: 'Solo Designer & Developer',
    span: 'lg:col-span-2',
  },
  {
    slug: 'petal-wellness',
    title: 'Petal — Wellness Companion',
    category: 'Mobile App (iOS & Android)',
    year: '2024',
    art: 'wellness',
    gradient: 'from-pink-400 via-rose-400 to-orange-300',
    blurb: 'A gentle mood-tracking & journaling app with a breathing blossom, streaks and a teddy-bear companion that reacts to your feelings.',
    tags: ['React Native', 'Expo', 'Reanimated', 'Supabase'],
    metrics: [ { value: '8.4k', label: 'Downloads' }, { value: '4.8★', label: 'Store rating' }, { value: '32k', label: 'Journal entries' } ],
    features: ['Adaptive breathing-blossom exercises', 'Emotion journal with gentle insights', 'Customisable teddy companion (hi there 🧸)', 'Offline-first with end-to-end encrypted sync'],
    role: 'Design Lead & Developer',
    span: '',
  },
  {
    slug: 'rosewood-restaurant',
    title: 'Rosewood — Bistro Identity',
    category: 'Branding & Website',
    year: '2024',
    art: 'restaurant',
    gradient: 'from-red-400 via-rose-500 to-pink-700',
    blurb: 'Full identity + site for a Karachi fusion bistro — logo, menu system, signage and a reservation-first website with 9pm Saturday sell-outs.',
    tags: ['Figma', 'React', 'Sanity', 'Illustrator'],
    metrics: [ { value: '+52%', label: 'Online reservations' }, { value: '9', label: 'Brand touchpoints' }, { value: '3', label: 'Design awards' } ],
    features: ['Complete visual identity & logo suite', 'Menu & signage design system', 'Reservation flow with waitlist SMS', 'Photo art-direction for shoot'],
    role: 'Brand & Web Designer',
    span: '',
  },
  {
    slug: 'lumen-portfolio',
    title: 'Lumen — 3D Portfolio Engine',
    category: 'Open Source / Creative Dev',
    year: '2024',
    art: 'lumen',
    gradient: 'from-fuchsia-400 via-pink-500 to-rose-600',
    blurb: 'An open-source, WebGL portfolio template with scene transitions — 900+ GitHub stars and a few “where did you get this?” DMs.',
    tags: ['Next.js', 'Three.js', 'GSAP', 'TypeScript'],
    metrics: [ { value: '900+', label: 'GitHub stars' }, { value: '60fps', label: 'Scene transitions' }, { value: '#1', label: 'Product Hunt (daily)' } ],
    features: ['Declarative scene-graph API', 'Buttery GSAP + R3F page transitions', 'One-command deploy to Vercel', 'Accessible, reduced-motion aware'],
    role: 'Creator & Maintainer',
    span: 'lg:col-span-2',
  },
  {
    slug: 'butterfly-saas',
    title: 'Butterfly — SaaS Design System',
    category: 'Design System & Docs',
    year: '2023',
    art: 'saas',
    gradient: 'from-purple-400 via-fuchsia-500 to-pink-500',
    blurb: 'A 60-component pink-glass design system + docs site used by 3 product teams — tokens, a11y baked in, 10× faster feature design.',
    tags: ['Storybook', 'React', 'Radix UI', 'Figma Tokens'],
    metrics: [ { value: '60+', label: 'Components' }, { value: '10×', label: 'Faster feature design' }, { value: '3', label: 'Product teams' } ],
    features: ['Full token pipeline (Figma → code)', 'WCAG AA contrast audits', 'Theming: light, dark & “rose” modes', 'Interactive docs with live playroom'],
    role: 'Design Systems Engineer',
    span: 'lg:col-span-2',
  },
]

/* ============ TIMELINE ============ */
export const TIMELINE = [
  {
    Icon: Briefcase,
    kind: 'Experience',
    title: 'Junior Frontend Developer',
    org: 'PixelNest Studio — Karachi (Remote)',
    period: 'Jan 2025 — Present',
    points: ['Shipping Next.js storefronts for fashion & F&B clients', 'Own motion & interaction design across 4 active builds', 'Mentored 2 interns on React + Tailwind'],
  },
  {
    Icon: Sparkles,
    kind: 'Experience',
    title: 'Freelance UI/UX & Brand Designer',
    org: 'Self-employed — worldwide clients',
    period: 'Jun 2023 — Present',
    points: ['25+ happy clients across PK, UAE, UK & USA', 'Identity systems, landing pages & full web apps', '100% on-time delivery, 5.0★ average on Fiverr'],
  },
  {
    Icon: BadgeCheck,
    kind: 'Certification',
    title: 'Meta Front-End Developer + Google UX Design',
    org: 'Coursera Professional Certificates',
    period: '2023 — 2024',
    points: ['Meta Front-End Developer Professional Certificate (2024)', 'Google UX Design Professional Certificate (2023)', 'freeCodeCamp Responsive Web Design (2022)'],
  },
  {
    Icon: GraduationCap,
    kind: 'Education',
    title: 'BS Computer Science — CGPA 3.8 / 4.0',
    org: 'SZABIST — Hyderabad Campus',
    period: '2021 — 2025',
    points: ['Dean’s List — 5 consecutive semesters', 'FYP: “Lumen”, a WebGL portfolio engine (this site’s cousin)', 'President — Women in Tech Society, 2024'],
  },
  {
    Icon: Trophy,
    kind: 'Achievement',
    title: '1st Place — DevPost Hackathon 2024',
    org: 'National AI Hackathon, Karachi',
    period: 'Nov 2024',
    points: ['Built “Petal” mood companion prototype in 36 hours', 'Won “Best Design” + “Judge’s Choice”', 'Featured on dev.to front page, 18k reads'],
  },
]

/* ============ SERVICES ============ */
export const SERVICES = [
  {
    Icon: Globe,
    title: 'Web Development',
    desc: 'End-to-end websites that feel handcrafted — from idea and wireframe to deploy, fast and accessible.',
    features: ['Custom React / Next.js builds', 'CMS & e-commerce integration', 'SEO + Core Web Vitals > 90'],
    price: '$300',
  },
  {
    Icon: Figma,
    title: 'UI/UX Design',
    desc: 'Interfaces people fall in love with — research-driven flows, dreamy visuals and delightful details.',
    features: ['User research & journey maps', 'High-fidelity Figma prototypes', 'Usability testing & iteration'],
    price: '$250',
  },
  {
    Icon: PenTool,
    title: 'Graphic Design',
    desc: 'Scroll-stopping visuals for social, print and packaging — always on-brand, never generic.',
    features: ['Social & campaign creatives', 'Packaging & print collateral', 'Illustration & iconography'],
    price: '$120',
  },
  {
    Icon: MonitorSmartphone,
    title: 'Frontend Development',
    desc: 'Pixel-perfect, buttery-smooth interfaces — 60fps animation, clean architecture, no spaghetti.',
    features: ['React / TypeScript architecture', 'Framer Motion & WebGL flair', 'Design-system implementation'],
    price: '$280',
  },
  {
    Icon: Palette,
    title: 'Creative Branding',
    desc: 'Identities with a heartbeat — logo suites, palettes, type systems and voice, wrapped in story.',
    features: ['Logo & full identity suites', 'Brand guidelines & tokens', 'Naming, taglines & voice'],
    price: '$400',
  },
  {
    Icon: LayoutTemplate,
    title: 'Website Design',
    desc: 'Marketing sites and portfolios that sell — art-directed sections, conversion baked in.',
    features: ['Conversion-focused page design', 'Interactive prototypes', 'Launch & handoff support'],
    price: '$220',
  },
]

/* ============ CUTE TEDDY MESSAGES ============ */
export const TEDDY_MESSAGES = [
  'Hehe! That tickles 💗',
  'You make my heart go boop! 🧸',
  'Sending you virtual cuddles!',
  'You’re officially paw-some ✨',
  'Psst… the projects section is extra pretty 👀',
  'Beeboop! A wild compliment appeared!',
  'Stay soft, stay sparkle-y 🌸',
]
