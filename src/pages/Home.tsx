import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaArrowRight,
  FaArrowDown,
  FaCode,
  FaMobile,
  FaCloud,
  FaShieldAlt,
  FaCheckCircle,
  FaDownload,
  FaMapMarkerAlt,
  FaClock,
  FaLaptopCode,
  FaDatabase,
  FaServer,
  FaPaintBrush,
  FaRocket,
  FaBolt,
  FaHeart,
  FaAws
} from 'react-icons/fa'
import { 
  SiReact, 
  SiNodedotjs, 
  SiTypescript, 
  SiMongodb, 
  SiPostgresql, 
  SiTailwindcss,
  SiNextdotjs,
  SiDocker,
  SiFirebase,
  SiGit,
  SiFigma,
  SiPython,
  SiDotnet,
  SiSupabase,
  SiRender,
  SiSharp
} from 'react-icons/si'
import { projects } from '../data/projects'
import BentoProjectCard from '../components/BentoProjectCard'

// ===== ANIMATED COUNTER =====
const AnimatedCounter = ({ 
  target, 
  suffix = '', 
  duration = 2000 
}: { 
  target: number
  suffix?: string
  duration?: number 
}) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const increment = target / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration, hasAnimated])

  return <span ref={ref}>{count}{suffix}</span>
}

// ===== FLOATING PARTICLE =====
const FloatingParticle = ({ 
  delay, 
  size, 
  left, 
  top 
}: { 
  delay: number
  size: number
  left: string
  top: string 
}) => (
  <motion.div
    className="absolute rounded-full bg-[#FF6B35]/20 pointer-events-none"
    style={{ width: size, height: size, left, top }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
)

// ===== TYPING ANIMATION =====
const TypingText = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fullText = texts[currentTextIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts])

  return (
    <span className="text-[#FF6B35]">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// ===== HOME PAGE =====
const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const techStack = [
    { icon: <SiReact />, name: 'React', color: '#61DAFB' },
    { icon: <SiNodedotjs />, name: 'Node.js', color: '#339933' },
    { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6' },
    { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248' },
    { icon: <SiPostgresql />, name: 'PostgreSQL', color: '#4169E1' },
    { icon: <SiTailwindcss />, name: 'Tailwind', color: '#06B6D4' },
    { icon: <SiNextdotjs />, name: 'Next.js', color: '#ffffff' },
    { icon: <SiDocker />, name: 'Docker', color: '#2496ED' },
    { icon: <FaAws />, name: 'AWS', color: '#FF9900' },
    { icon: <SiFirebase />, name: 'Firebase', color: '#FFCA28' },
    { icon: <SiPython />, name: 'Python', color: '#3776AB' },
    { icon: <SiDotnet />, name: '.NET', color: '#512BD4' },
    { icon: <SiSupabase />, name: 'Supabase', color: '#3ECF8E' },
    { icon: <SiRender />, name: 'Render', color: '#46E3B7' },
    { icon: <SiSharp />, name: 'C#', color: '#239120' },
  ]

  // Featured projects — IDs: 6 (School Portal), 4 (AI Collaboration Platform), 3 (Inventory), 5 (SmartBudget)
  const featuredIds = [6, 4, 3, 5]
  const featuredProjects = featuredIds
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean) as typeof projects

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center pt-24 pb-20 md:pt-32 md:pb-28 relative overflow-hidden"
      >
        {/* Gradient mesh background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,107,53,0.15)_0%,_transparent_50%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,184,107,0.1)_0%,_transparent_50%)]" />
          <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(255,107,53,0.05)_0%,_transparent_40%)]" />
        </div>

        {/* Floating particles */}
        <FloatingParticle delay={0}   size={6} left="10%" top="20%" />
        <FloatingParticle delay={1}   size={4} left="80%" top="15%" />
        <FloatingParticle delay={2}   size={8} left="70%" top="60%" />
        <FloatingParticle delay={3}   size={5} left="20%" top="70%" />
        <FloatingParticle delay={1.5} size={3} left="50%" top="30%" />
        <FloatingParticle delay={2.5} size={7} left="90%" top="80%" />
        <FloatingParticle delay={0.5} size={4} left="30%" top="85%" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* ── Left: Main Content ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="lg:col-span-7"
            >
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-[#FF6B35]/10 to-[#FFB86B]/10 border border-[#FF6B35]/20 rounded-full mb-8 backdrop-blur-sm"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-sm text-[#C1C7D0] font-medium">
                  Open to work · Available for freelance &amp; full-time
                </span>
              </motion.div>

              {/* Pre-heading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-[0.2em] uppercase mb-4"
              >
                Hello, I'm
              </motion.p>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-['Space_Grotesk'] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] text-[#F5F7FA]"
              >
                Henry
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8F5E] to-[#FFB86B] bg-clip-text text-transparent">
                    Osuagwu
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
                  />
                </span>
              </motion.h1>

              {/* Typing animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-6 font-['JetBrains_Mono'] text-lg md:text-xl"
              >
                <span className="text-[#6B7280]">{'> '}</span>
                <TypingText
                  texts={[
                    'Full-Stack Developer',
                    'Problem Solver',
                    'UI/UX Enthusiast',
                    'Cloud Architect',
                    'Nigerian Innovator',
                  ]}
                />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-lg md:text-xl text-[#9AA4B2] mt-6 max-w-2xl leading-relaxed text-justify"
              >
                I craft{' '}
                <span className="text-[#F5F7FA] font-medium">
                  high-performance web applications
                </span>{' '}
                and{' '}
                <span className="text-[#F5F7FA] font-medium">
                  innovative digital solutions
                </span>{' '}
                that solve real-world problems. Passionate about building products
                that make an impact in the Nigerian tech ecosystem and beyond.
              </motion.p>

              {/* Location & timezone */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 mt-4"
              >
                <span className="flex items-center gap-2 text-sm text-[#9AA4B2]">
                  <FaMapMarkerAlt className="text-[#FF6B35]" /> Lagos, Nigeria 🇳🇬
                </span>
                <span className="w-1 h-1 bg-[#242A32] rounded-full" />
                <span className="flex items-center gap-2 text-sm text-[#9AA4B2]">
                  <FaClock className="text-[#FF6B35]" /> WAT (UTC+1)
                </span>
                <span className="w-1 h-1 bg-[#242A32] rounded-full" />
                <span className="flex items-center gap-2 text-sm text-[#FF6B35] font-['JetBrains_Mono']">
                  <img 
                    src="/logo.png" 
                    alt="IMPULSIBLE" 
                    className="w-4 h-4 object-contain"
                  />
                  IMPULSIBLE
                </span>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="flex flex-wrap gap-4 mt-10"
              >
                <Link
                  to="/projects"
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-[#0B0D10] font-semibold rounded-xl hover:shadow-[0_0_40px_rgba(255,107,53,0.3)] transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10">Explore My Work</span>
                  <FaArrowRight className="text-sm relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFB86B] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-[#242A32] rounded-xl hover:border-[#FF6B35] transition-all duration-300 text-[#F5F7FA] inline-flex items-center gap-3 hover:bg-[#FF6B35]/5 group"
                >
                  <FaEnvelope className="text-[#FF6B35]" />
                  Let's Talk
                </Link>

                {/* ── Resume Button ── */}
                <a
                  href="/resume.pdf"
                  download
                  className="px-8 py-4 rounded-xl text-[#9AA4B2] hover:text-[#FF6B35] transition-all duration-300 inline-flex items-center gap-3 hover:bg-[#151A20] group"
                >
                  <FaDownload className="group-hover:animate-bounce" />
                  Resume
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="flex items-center gap-4 mt-8"
              >
                <span className="text-xs text-[#6B7280] uppercase tracking-wider font-['JetBrains_Mono']">
                  Find me
                </span>
                <div className="w-8 h-px bg-[#242A32]" />
                {[
                  { icon: <FaGithub />, href: 'https://github.com/Impulsible', label: 'GitHub' },
                  { icon: <FaLinkedin />, href: 'https://linkedin.com/in/impulsible', label: 'LinkedIn' },
                  { icon: <FaTwitter />, href: 'https://twitter.com/impulsible', label: 'Twitter' },
                  { icon: <FaEnvelope />, href: 'mailto:henryosuagwu22@gmail.com', label: 'Email' },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-[#151A20] border border-[#242A32] flex items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35] hover:bg-[#FF6B35]/5 transition-all duration-300"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: Profile Card ── */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-md">
                {/* Decorative borders */}
                <div className="absolute -top-6 -right-6 w-24 h-24 border border-[#FF6B35]/20 rounded-2xl rotate-12 pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[#FFB86B]/10 rounded-full pointer-events-none" />

                {/* Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B35]/20 via-[#FFB86B]/10 to-[#FF6B35]/20 rounded-3xl blur-2xl pointer-events-none" />

                {/* Card */}
                <div className="relative bg-gradient-to-b from-[#151A20] to-[#11151A] rounded-2xl border border-[#242A32] overflow-hidden">
                  {/* Card header */}
                  <div className="h-28 bg-gradient-to-r from-[#FF6B35]/20 via-[#FF6B35]/10 to-[#FFB86B]/20 relative">
                    <div className="absolute inset-0 opacity-50"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B35' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                    {/* Code snippet decoration */}
                    <div className="absolute top-3 right-4 font-['JetBrains_Mono'] text-[10px] text-[#FF6B35]/40 leading-relaxed">
                      <div>{'const dev = {'}</div>
                      <div>&nbsp;&nbsp;{'name: "Henry",'}</div>
                      <div>&nbsp;&nbsp;{'passion: "∞"'}</div>
                      <div>{'}'}</div>
                    </div>
                  </div>

                  <div className="px-8 pb-8">
                    {/* Profile image */}
                    <div className="relative w-28 h-28 mx-auto -mt-14">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] p-[3px] rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="w-full h-full rounded-2xl bg-[#0B0D10] flex items-center justify-center overflow-hidden">
                          <img
                            src="/profile.jpg"
                            alt="Henry Osuagwu"
                            className="w-full h-full object-cover rounded-2xl"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              const parent = target.parentElement
                              if (parent) {
                                parent.innerHTML = '<span class="text-5xl">👨🏽‍💻</span>'
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-lg border-2 border-[#151A20] flex items-center justify-center">
                        <FaCheckCircle className="text-[8px] text-white" />
                      </div>
                    </div>

                    {/* Name & title */}
                    <div className="text-center mt-5">
                      <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#F5F7FA]">
                        Henry Osuagwu
                      </h3>
                      <p className="text-[#9AA4B2] text-sm mt-1">Full-Stack Developer</p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="px-3 py-1 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full text-[11px] text-[#FF6B35] font-['JetBrains_Mono'] font-medium">
                          🚀 IMPULSIBLE
                        </span>
                      </div>
                    </div>

                    {/* Mini stats */}
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {[
                        { value: '15+', label: 'Projects' },
                        { value: '4+',  label: 'Years Exp.' },
                        { value: '100%', label: 'Passion' },
                      ].map((stat, i) => (
                        <div
                          key={i}
                          className="bg-[#0B0D10]/60 rounded-xl p-3 text-center border border-[#242A32]/50"
                        >
                          <div className="font-['Space_Grotesk'] text-lg font-bold text-[#FF6B35]">
                            {stat.value}
                          </div>
                          <div className="text-[10px] text-[#6B7280] uppercase tracking-wider">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Core stack */}
                    <div className="mt-5">
                      <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-['JetBrains_Mono'] mb-2">
                        Core Stack
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {['React/Next.js', 'C#', 'TypeScript', 'Tailwind CSS', 'ASP.NET', 'Vercel'].map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-[#0B0D10] border border-[#242A32] rounded-lg text-[11px] text-[#9AA4B2] hover:border-[#FF6B35]/40 hover:text-[#FF6B35] transition-all cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Social links */}
                    <div className="flex justify-center gap-3 mt-6 pt-5 border-t border-[#242A32]/50">
                      {[
                        { icon: <FaGithub />, href: 'https://github.com/Impulsible' },
                        { icon: <FaLinkedin />, href: 'https://linkedin.com/in/impulsible' },
                        { icon: <FaTwitter />, href: 'https://twitter.com/impulsible' },
                        { icon: <FaEnvelope />, href: 'mailto:henryosuagwu22@gmail.com' },
                      ].map((social, i) => (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-xl bg-[#0B0D10] border border-[#242A32] flex items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35] hover:bg-[#FF6B35]/5 transition-all duration-300 text-sm"
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="flex flex-col items-center gap-2 mt-16"
          >
            <span className="text-xs text-[#6B7280] font-['JetBrains_Mono'] tracking-wider">
              SCROLL
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaArrowDown className="text-[#FF6B35] text-sm" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== MARQUEE TECH STACK ===== */}
      <section className="py-6 bg-[#0A0C0F] border-y border-[#1A1F27] overflow-hidden">
        <div className="relative">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-[#3A4150] hover:text-[#FF6B35] transition-colors duration-300 cursor-default"
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className="font-['Space_Grotesk'] text-sm font-medium tracking-wider uppercase">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT SNIPPET ===== */}
      <section className="py-24 md:py-32 bg-[#0B0D10] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,_rgba(255,107,53,0.05)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Code window */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-[#151A20] rounded-2xl border border-[#242A32] overflow-hidden shadow-2xl">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#242A32] bg-[#11151A]">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  <span className="ml-3 text-xs text-[#6B7280] font-['JetBrains_Mono']">
                    about-me.ts
                  </span>
                </div>

                {/* Code body */}
                <div className="p-6 font-['JetBrains_Mono'] text-sm leading-loose">
                  <div>
                    <span className="text-[#C678DD]">const</span>{' '}
                    <span className="text-[#E06C75]">developer</span>{' '}
                    <span className="text-[#56B6C2]">=</span>{' '}
                    <span className="text-[#ABB2BF]">{'{'}</span>
                  </div>
                  {[
                    ['name',      '"Henry Osuagwu"'],
                    ['location',  '"Lagos, Nigeria 🇳🇬"'],
                    ['role',      '"Full-Stack Developer"'],
                    ['brand',     '"IMPULSIBLE 🚀"'],
                    ['passion',   '"Building the future"'],
                    ['coffee',    'Infinity'],
                    ['available', 'true'],
                  ].map(([key, val]) => (
                    <div key={key} className="pl-4">
                      <span className="text-[#E06C75]">{key}</span>
                      <span className="text-[#ABB2BF]">: </span>
                      <span className={val === 'true' || val === 'Infinity' ? 'text-[#D19A66]' : 'text-[#98C379]'}>
                        {val}
                      </span>
                      <span className="text-[#ABB2BF]">,</span>
                    </div>
                  ))}
                  <div><span className="text-[#ABB2BF]">{'}'}</span></div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-[#151A20] border border-[#242A32] rounded-xl px-4 py-2 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">●</span>
                  <span className="text-xs text-[#9AA4B2] font-['JetBrains_Mono']">Online</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 bg-[#151A20] border border-[#FF6B35]/20 rounded-xl px-4 py-2 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <FaHeart className="text-[#FF6B35] text-xs" />
                  <span className="text-xs text-[#9AA4B2] font-['JetBrains_Mono']">Loves coding</span>
                </div>
              </motion.div>
            </motion.div>

            {/* About text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-[0.2em] uppercase">
                About Me
              </span>
              <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-[#F5F7FA] mt-3 leading-tight">
                Turning ideas into
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                  {' '}digital reality
                </span>
              </h2>
              <p className="text-[#9AA4B2] text-lg mt-6 leading-relaxed text-justify">
                I'm a passionate full-stack developer based in Lagos, Nigeria, with over 4 years of
                experience building web applications that matter. From e-commerce platforms to
                AI-powered tools, I love tackling complex problems and turning them into elegant
                solutions.
              </p>
              <p className="text-[#9AA4B2] text-lg mt-4 leading-relaxed text-justify">
                Under my brand{' '}
                <span className="text-[#FF6B35] font-semibold">IMPULSIBLE</span>, I'm focused on
                creating innovative tech solutions tailored for the African market while maintaining
                global standards.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: <FaLaptopCode />, text: 'Full-Stack Proficiency' },
                  { icon: <FaPaintBrush />, text: 'UI/UX Design Eye' },
                  { icon: <FaDatabase />,   text: 'Database Architecture' },
                  { icon: <FaServer />,     text: 'Cloud Deployment' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#C1C7D0]">
                    <span className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] text-sm">
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-8 text-[#FF6B35] font-medium hover:gap-3 transition-all group"
              >
                Learn more about me
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS BANNER ===== */}
      <section className="py-16 bg-gradient-to-r from-[#FF6B35]/5 via-[#0B0D10] to-[#FFB86B]/5 border-y border-[#242A32]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: 15,  suffix: '+',  label: 'Projects Completed', icon: <FaCode /> },
              { value: 4,   suffix: '+',  label: 'Years Experience',   icon: <FaClock /> },
              { value: 10,  suffix: '+',  label: 'Technologies',       icon: <FaBolt /> },
              { value: 100, suffix: '%',  label: 'Commitment',         icon: <FaHeart /> },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] mx-auto mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-[#F5F7FA]">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-[#6B7280] mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS — 2×2 GRID ===== */}
      <section className="py-24 md:py-32 bg-[#0B0D10] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,107,53,0.05)_0%,_transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF6B35]" />
                </span>
                <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] uppercase tracking-[0.2em]">
                  Featured Work
                </span>
              </div>
              <h2 className="font-['Space_Grotesk'] text-4xl md:text-6xl font-bold text-[#F5F7FA] leading-tight">
                Projects I'm
                <br />
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                  proud of
                </span>
              </h2>
              <p className="text-[#9AA4B2] text-lg max-w-xl mt-4 leading-relaxed text-justify">
                Each project represents a unique challenge solved with creativity, clean code, and
                modern technologies.
              </p>
            </div>
            <Link
              to="/projects"
              className="mt-6 md:mt-0 px-6 py-3 border border-[#242A32] rounded-xl hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all text-[#F5F7FA] inline-flex items-center gap-2 text-sm whitespace-nowrap"
            >
              View All <FaArrowRight className="text-xs" />
            </Link>
          </motion.div>

          {/* ── 2×2 PROJECT GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {featuredProjects.map((project, i) => (
              <BentoProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* "More projects" teaser */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-[#242A32]" />
            <Link
              to="/projects"
              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#FF6B35] transition-colors font-['JetBrains_Mono'] group"
            >
              <span>+{Math.max(0, projects.length - featuredIds.length)} more projects</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-[#242A32]" />
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-24 md:py-32 bg-[#11151A] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,53,0.05)_0%,_transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-[0.2em] uppercase">
              Services
            </span>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-6xl font-bold text-[#F5F7FA] mt-3">
              What I bring to
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                {' '}the table
              </span>
            </h2>
            <p className="text-[#9AA4B2] text-lg max-w-2xl mx-auto mt-4 text-justify">
              End-to-end development services that take your ideas from concept to deployment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaCode className="text-2xl" />,
                title: 'Full-Stack Development',
                desc: 'Building complete web applications from pixel-perfect frontends to robust backend APIs with modern frameworks and best practices.',
                features: ['React / Next.js', 'Node.js / .NET', 'REST & GraphQL APIs'],
              },
              {
                icon: <FaMobile className="text-2xl" />,
                title: 'Responsive Design',
                desc: 'Mobile-first, responsive web applications that deliver exceptional user experiences across all devices and screen sizes.',
                features: ['Mobile-First', 'Cross-Browser', 'Accessibility (A11y)'],
              },
              {
                icon: <FaCloud className="text-2xl" />,
                title: 'Cloud & DevOps',
                desc: 'Deploying, scaling, and managing applications on cloud platforms with CI/CD pipelines and containerisation.',
                features: ['AWS / Firebase', 'Docker / CI/CD', 'Performance Tuning'],
              },
              {
                icon: <FaShieldAlt className="text-2xl" />,
                title: 'African Market Solutions',
                desc: 'Purpose-built products for the Nigerian and African market with local payment integrations and offline-first capabilities.',
                features: ['Paystack / Flutterwave', 'Offline-First', 'Local Optimisation'],
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-[#0B0D10] p-8 rounded-2xl border border-[#242A32] hover:border-[#FF6B35]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,107,53,0.08)] hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B35]/20 to-[#FFB86B]/10 flex items-center justify-center text-[#FF6B35] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#F5F7FA] mb-3">
                  {service.title}
                </h3>
                <p className="text-[#9AA4B2] text-sm leading-relaxed mb-5 text-justify">
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <FaCheckCircle className="text-[#FF6B35]/60 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECH STACK GRID ===== */}
      <section className="py-24 md:py-32 bg-[#0B0D10] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-[0.2em] uppercase">
              Tech Arsenal
            </span>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-6xl font-bold text-[#F5F7FA] mt-3">
              Tools I
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                {' '}work with
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {[
              { icon: <SiReact className="text-[#61DAFB]" />,       name: 'React',       category: 'Frontend'  },
              { icon: <SiNextdotjs className="text-white" />,        name: 'Next.js',     category: 'Frontend'  },
              { icon: <SiTypescript className="text-[#3178C6]" />,   name: 'TypeScript',  category: 'Language'  },
              { icon: <SiNodedotjs className="text-[#339933]" />,    name: 'Node.js',     category: 'Backend'   },
              { icon: <SiPython className="text-[#3776AB]" />,       name: 'Python',      category: 'Language'  },
              { icon: <SiDotnet className="text-[#512BD4]" />,       name: '.NET',        category: 'Backend'   },
              { icon: <SiSharp className="text-[#239120]" />,        name: 'C#',          category: 'Language'  },
              { icon: <SiSupabase className="text-[#3ECF8E]" />,     name: 'Supabase',    category: 'Backend'   },
              { icon: <SiRender className="text-[#46E3B7]" />,       name: 'Render',      category: 'DevOps'    },
              { icon: <SiMongodb className="text-[#47A248]" />,      name: 'MongoDB',     category: 'Database'  },
              { icon: <SiPostgresql className="text-[#4169E1]" />,   name: 'PostgreSQL',  category: 'Database'  },
              { icon: <SiTailwindcss className="text-[#06B6D4]" />,  name: 'Tailwind',    category: 'Styling'   },
              { icon: <SiDocker className="text-[#2496ED]" />,       name: 'Docker',      category: 'DevOps'    },
              { icon: <FaAws className="text-[#FF9900]" />,          name: 'AWS',         category: 'Cloud'     },
              { icon: <SiFirebase className="text-[#FFCA28]" />,     name: 'Firebase',    category: 'Cloud'     },
              { icon: <SiGit className="text-[#F05032]" />,          name: 'Git',         category: 'Tools'     },
              { icon: <SiFigma className="text-[#F24E1E]" />,        name: 'Figma',       category: 'Design'    },
              { icon: <FaShieldAlt className="text-[#4FC08D]" />,    name: 'JWT/Auth',    category: 'Security'  },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="group bg-[#151A20] rounded-2xl border border-[#242A32] p-5 flex flex-col items-center gap-3 hover:border-[#FF6B35]/40 hover:bg-[#151A20]/80 transition-all duration-300 cursor-default"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </span>
                <div className="text-center">
                  <span className="text-sm text-[#F5F7FA] font-medium block">{tech.name}</span>
                  <span className="text-[10px] text-[#6B7280] font-['JetBrains_Mono']">{tech.category}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 text-[#FF6B35] font-medium hover:gap-3 transition-all group"
            >
              View complete skill set
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROCESS / WORKFLOW ===== */}
      <section className="py-24 md:py-32 bg-[#11151A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-[0.2em] uppercase">
              My Process
            </span>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-6xl font-bold text-[#F5F7FA] mt-3">
              How I
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                {' '}work
              </span>
            </h2>
            <p className="text-[#9AA4B2] text-lg max-w-2xl mx-auto mt-4 text-justify">
              A streamlined development process that ensures quality, transparency, and timely
              delivery.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-px bg-gradient-to-r from-[#FF6B35]/20 via-[#FF6B35]/40 to-[#FF6B35]/20 pointer-events-none" />

            {[
              {
                step: '01',
                title: 'Discovery',
                desc: 'Understanding your vision, goals, and requirements through in-depth discussions and research.',
                icon: '🔍',
              },
              {
                step: '02',
                title: 'Design & Plan',
                desc: 'Creating wireframes, system architecture, and a detailed development roadmap.',
                icon: '📐',
              },
              {
                step: '03',
                title: 'Development',
                desc: 'Building with clean, scalable code using agile methodology with regular updates.',
                icon: '⚡',
              },
              {
                step: '04',
                title: 'Launch & Support',
                desc: 'Deploying to production with monitoring, optimisation, and ongoing maintenance.',
                icon: '🚀',
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FFB86B] flex items-center justify-center mx-auto mb-6 relative z-10 shadow-[0_0_20px_rgba(255,107,53,0.3)]">
                  <span className="font-['Space_Grotesk'] text-lg font-bold text-[#0B0D10]">
                    {process.step}
                  </span>
                </div>
                <span className="text-3xl mb-3 block">{process.icon}</span>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#F5F7FA] mb-3">
                  {process.title}
                </h3>
                <p className="text-[#9AA4B2] text-sm leading-relaxed text-justify">
                  {process.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMPULSIBLE BRAND ===== */}
      <section className="py-24 md:py-32 bg-[#0B0D10] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6B35]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Brand icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF6B35] to-[#FFB86B] mb-8 shadow-[0_0_60px_rgba(255,107,53,0.3)] p-1">
              <div className="w-full h-full rounded-2xl bg-[#0B0D10] overflow-hidden flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="IMPULSIBLE" 
                  className="w-14 h-14 object-contain"
                />
              </div>
            </div>

            <h2 className="font-['Space_Grotesk'] text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#FF6B35] via-[#FF8F5E] to-[#FFB86B] bg-clip-text text-transparent">
              IMPULSIBLE
            </h2>
            <p className="text-[#9AA4B2] text-xl max-w-2xl mx-auto mt-6 leading-relaxed text-justify">
              More than a brand — it's a philosophy. Building innovative digital solutions from{' '}
              <span className="text-[#F5F7FA] font-medium">Nigeria</span> 🇳🇬 for the{' '}
              <span className="text-[#F5F7FA] font-medium">world</span> 🌍.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { icon: '💡', label: 'Innovation',    desc: 'Thinking differently' },
                { icon: '🎯', label: 'Precision',     desc: 'Attention to detail'  },
                { icon: '🌍', label: 'Impact',        desc: 'Solutions that matter' },
                { icon: '🤝', label: 'Collaboration', desc: 'Growing together'     },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#151A20]/50 backdrop-blur-sm rounded-2xl border border-[#242A32] p-6 hover:border-[#FF6B35]/30 transition-all"
                >
                  <span className="text-3xl mb-3 block">{value.icon}</span>
                  <h4 className="font-['Space_Grotesk'] font-bold text-[#F5F7FA] text-lg">
                    {value.label}
                  </h4>
                  <p className="text-sm text-[#6B7280] mt-1 text-justify">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 md:py-32 bg-[#11151A] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6B35]/5 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#151A20] to-[#0B0D10] rounded-3xl border border-[#242A32] p-12 md:p-16 text-center relative overflow-hidden"
          >
            {/* Decorative corner borders */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#FF6B35]/30 rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#FF6B35]/30 rounded-br-3xl pointer-events-none" />

            <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-[0.2em] uppercase">
              Let's Connect
            </span>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-6xl font-bold text-[#F5F7FA] mt-4 leading-tight">
              Have a project
              <br />
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                in mind?
              </span>
            </h2>
            <p className="text-[#9AA4B2] text-lg max-w-xl mx-auto mt-6 leading-relaxed text-justify">
              I'm always excited to discuss new projects, creative ideas, or opportunities to be part
              of your vision. Let's build something amazing together.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link
                to="/contact"
                className="group relative px-10 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-[#0B0D10] font-semibold rounded-xl hover:shadow-[0_0_40px_rgba(255,107,53,0.4)] transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-3 text-lg overflow-hidden"
              >
                <span className="relative z-10">Start a Conversation</span>
                <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFB86B] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <a
                href="mailto:henryosuagwu22@gmail.com"
                className="px-10 py-4 border-2 border-[#242A32] rounded-xl hover:border-[#FF6B35] text-[#F5F7FA] hover:text-[#FF6B35] transition-all duration-300 inline-flex items-center gap-3 text-lg hover:bg-[#FF6B35]/5"
              >
                <FaEnvelope />
                henryosuagwu22@gmail.com
              </a>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-[#242A32]/50">
              {[
                { icon: <FaGithub />,   label: 'GitHub',   href: 'https://github.com/Impulsible' },
                { icon: <FaLinkedin />, label: 'LinkedIn', href: '#' },
                { icon: <FaTwitter />,  label: 'Twitter',  href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#6B7280] hover:text-[#FF6B35] transition-colors text-sm"
                >
                  {social.icon}
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== QUICK NAVIGATION ===== */}
      <section className="py-10 sm:py-12 md:py-14 bg-[#0A0C0F] border-t border-[#1A1F27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8"
          >
            <span className="font-['JetBrains_Mono'] text-[10px] sm:text-xs text-[#6B7280] tracking-[0.2em] uppercase">
              Quick Navigation
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {/* ── Projects ── */}
            <Link
              to="/projects"
              className="group bg-[#0B0D10] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-[#1A1F27] hover:border-[#FF6B35]/40 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex items-center gap-3 sm:gap-4 min-w-0"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-[#FF6B35]/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <FaCode className="text-lg sm:text-xl text-[#FF6B35]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-['Space_Grotesk'] font-bold text-sm sm:text-base text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors truncate">
                  Projects
                </h3>
                <p className="text-[11px] sm:text-xs text-[#6B7280] truncate">
                  View my portfolio
                </p>
              </div>
              <FaArrowRight className="text-[10px] sm:text-xs text-[#3A4150] group-hover:text-[#FF6B35] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>

            {/* ── About ── */}
            <Link
              to="/about"
              className="group bg-[#0B0D10] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-[#1A1F27] hover:border-[#FF6B35]/40 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex items-center gap-3 sm:gap-4 min-w-0"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-[#FF6B35]/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <FaLaptopCode className="text-lg sm:text-xl text-[#FF6B35]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-['Space_Grotesk'] font-bold text-sm sm:text-base text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors truncate">
                  About
                </h3>
                <p className="text-[11px] sm:text-xs text-[#6B7280] truncate">
                  My journey & story
                </p>
              </div>
              <FaArrowRight className="text-[10px] sm:text-xs text-[#3A4150] group-hover:text-[#FF6B35] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>

            {/* ── Skills ── */}
            <Link
              to="/skills"
              className="group bg-[#0B0D10] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-[#1A1F27] hover:border-[#FF6B35]/40 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex items-center gap-3 sm:gap-4 min-w-0"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-[#FF6B35]/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <FaBolt className="text-lg sm:text-xl text-[#FF6B35]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-['Space_Grotesk'] font-bold text-sm sm:text-base text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors truncate">
                  Skills
                </h3>
                <p className="text-[11px] sm:text-xs text-[#6B7280] truncate">
                  Technologies I use
                </p>
              </div>
              <FaArrowRight className="text-[10px] sm:text-xs text-[#3A4150] group-hover:text-[#FF6B35] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>

            {/* ── Contact ── */}
            <Link
              to="/contact"
              className="group bg-[#0B0D10] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-[#1A1F27] hover:border-[#FF6B35]/40 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex items-center gap-3 sm:gap-4 min-w-0"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-[#FF6B35]/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <FaEnvelope className="text-lg sm:text-xl text-[#FF6B35]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-['Space_Grotesk'] font-bold text-sm sm:text-base text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors truncate">
                  Contact
                </h3>
                <p className="text-[11px] sm:text-xs text-[#6B7280] truncate">
                  Get in touch
                </p>
              </div>
              <FaArrowRight className="text-[10px] sm:text-xs text-[#3A4150] group-hover:text-[#FF6B35] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
export default Home