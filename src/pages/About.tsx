import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHeart,
  FaCode,
  FaRocket,
  FaArrowRight,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaLaptopCode,
  FaDatabase,
  FaServer,
  FaPaintBrush,
  FaMobile,
  FaCloud,
  FaClock,
  FaCheckCircle,
  FaGamepad,
  FaMusic,
  FaBook,
  FaPlane,
  FaCoffee,
  FaBolt,
  FaUsers,
  FaLightbulb,
  FaShieldAlt,
  FaQuoteLeft,
  FaAward,
  FaUniversity,
} from 'react-icons/fa'

// Animated counter
const AnimatedCounter = ({
  target,
  suffix = '',
}: {
  target: number
  suffix?: string
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
          const increment = target / (2000 / 16)
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
  }, [target, hasAnimated])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const About = () => {
  const [activeTimeline, setActiveTimeline] = useState(0)

  const timeline = [
    {
      year: '2024 — Present',
      title: 'Full-Stack Developer & Founder',
      subtitle: 'IMPULSIBLE — Building Innovative Solutions',
      description:
        'Currently focused on building impactful digital products for the Nigerian market and beyond. Leading development of Naija Snacks logistics platform, AI-powered collaboration tools, and interactive detective investigation games. Driving the vision of IMPULSIBLE as a brand that creates purpose-driven technology solutions.',
      icon: <FaRocket />,
      color: 'from-[#FF6B35] to-[#FFB86B]',
      tags: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AI/ML'],
    },
    {
      year: '2024 — 2026',
      title: 'B.Sc. Software Development',
      subtitle: 'Brigham Young University — Idaho (Completed)',
      description:
        'Earned a Bachelor of Science in Software Development from BYU-Idaho (2024—2026), with a strong emphasis on Web Development. This comprehensive program deepened my understanding of software engineering principles, agile methodologies, modern web technologies, and full-stack development practices. Graduated with a strong foundation in building scalable, maintainable web applications and software systems.',
      icon: <FaGraduationCap />,
      color: 'from-blue-500 to-cyan-500',
      tags: ['Software Engineering', 'Web Development', 'Agile', 'Systems Design'],
    },
    {
      year: '2017 — 2022',
      title: 'B.Tech. Statistics',
      subtitle: 'Federal University of Technology, Owerri (Completed)',
      description:
        'Completed a Bachelor of Technology in Statistics from FUTO (2017—2022). This rigorous program provided a strong mathematical and analytical foundation — teaching data analysis, statistical modeling, and critical thinking skills that directly inform my approach to software development and problem-solving.',
      icon: <FaUniversity />,
      color: 'from-purple-500 to-pink-500',
      tags: ['Statistics', 'Data Analysis', 'Mathematics', 'Research'],
    },
    {
      year: '2019 — 2020',
      title: 'Self-Taught Programming',
      subtitle: 'Independent Learning Journey',
      description:
        'Began my self-taught programming journey during the gap year between degrees. Immersed myself in HTML, CSS, JavaScript, and Python. Built foundational projects and discovered my passion for creating digital solutions that solve real-world problems.',
      icon: <FaLightbulb />,
      color: 'from-green-500 to-emerald-500',
      tags: ['HTML', 'CSS', 'JavaScript', 'Python'],
    },
  ]

  const education = [
    {
      degree: 'Bachelor of Science',
      field: 'Software Development',
      subfield: 'Web Development',
      school: 'Brigham Young University — Idaho',
      year: '2024 — 2026',
      status: 'Completed',
      icon: <FaGraduationCap />,
      highlights: [
        'Software Engineering Principles',
        'Full-Stack Web Development',
        'Agile Development Methodologies',
        'Systems Architecture & Design',
        'Database Management & Optimization',
      ],
    },
    {
      degree: 'Bachelor of Technology',
      field: 'Statistics',
      school: 'Federal University of Technology, Owerri',
      year: '2017 — 2022',
      status: 'Completed',
      icon: <FaUniversity />,
      highlights: [
        'Statistical Modeling & Inference',
        'Data Analysis & Visualization',
        'Mathematical Foundations',
        'Research Methodology',
      ],
    },
  ]

  const values = [
    {
      icon: <FaLightbulb />,
      title: 'Innovation First',
      desc: 'Every project is an opportunity to think differently and push the boundaries of what\'s possible with technology.',
    },
    {
      icon: <FaUsers />,
      title: 'User-Centered Design',
      desc: 'Great software starts with empathy. I design for real people with real needs, focusing on usability and accessibility.',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Quality & Integrity',
      desc: 'Clean, maintainable, well-tested code is non-negotiable. No shortcuts — every line is written with purpose and precision.',
    },
    {
      icon: <FaBolt />,
      title: 'Continuous Growth',
      desc: 'Technology evolves rapidly, and so do I. I\'m committed to lifelong learning, experimentation, and staying at the forefront of innovation.',
    },
  ]

  const interests = [
    { icon: <FaGamepad />, label: 'Gaming' },
    { icon: <FaMusic />, label: 'Music' },
    { icon: <FaBook />, label: 'Reading' },
    { icon: <FaCoffee />, label: 'Coffee' },
    { icon: <FaPlane />, label: 'Travel' },
    { icon: <FaCode />, label: 'Open Source' },
  ]

  return (
    <div className="min-h-screen bg-[#0B0D10]">
      {/* ===== HERO SECTION ===== */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,107,53,0.1)_0%,_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,184,107,0.05)_0%,_transparent_50%)]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Photo + Visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div className="relative max-w-md mx-auto lg:mx-0">
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 border border-[#FF6B35]/20 rounded-2xl rotate-12 pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-28 h-28 border border-[#FFB86B]/10 rounded-full pointer-events-none" />
                <div className="absolute -inset-2 bg-gradient-to-r from-[#FF6B35]/15 via-[#FFB86B]/10 to-[#FF6B35]/15 rounded-3xl blur-2xl pointer-events-none" />

                {/* Main photo container */}
                <div className="relative bg-gradient-to-b from-[#151A20] to-[#11151A] rounded-2xl border border-[#242A32] overflow-hidden">
                  {/* Photo area */}
                  <div className="relative aspect-[4/5] bg-gradient-to-br from-[#FF6B35]/20 via-[#FF6B35]/10 to-[#FFB86B]/20 overflow-hidden">
                    {/* Pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B35' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                    {/* Bottom gradient fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151A20] via-transparent to-transparent" />

                    {/* Actual photo */}
                    <img
                      src="/profile.jpg"
                      alt="Henry Osuagwu — Full-Stack Developer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          const fallback = document.createElement('div')
                          fallback.className =
                            'w-full h-full flex items-center justify-center'
                          fallback.innerHTML =
                            '<span class="text-[8rem]">👨🏽‍💻</span>'
                          parent.appendChild(fallback)
                        }
                      }}
                    />

                    {/* Code snippet overlay — top right */}
                    <div className="absolute top-4 right-4 bg-[#0B0D10]/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-[#242A32]/50">
                      <div className="font-['JetBrains_Mono'] text-[9px] text-[#FF6B35]/60 leading-relaxed">
                        <div>
                          <span className="text-[#C678DD]">const</span>{' '}
                          <span className="text-[#E06C75]">me</span>{' '}
                          <span className="text-[#56B6C2]">=</span> {'{'}
                        </div>
                        <div>
                          &nbsp;&nbsp;
                          <span className="text-[#98C379]">"passionate"</span>
                        </div>
                        <div>{'}'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Info bar below photo */}
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#F5F7FA]">
                          Henry Osuagwu
                        </h3>
                        <p className="text-sm text-[#9AA4B2]">
                          Full-Stack Developer
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                        </span>
                        <span className="text-xs text-green-400 font-['JetBrains_Mono']">
                          Available
                        </span>
                      </div>
                    </div>

                    {/* Quick info */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0B0D10] border border-[#242A32] rounded-lg text-[11px] text-[#9AA4B2]">
                        <FaMapMarkerAlt className="text-[#FF6B35] text-[10px]" />
                        Lagos, Nigeria 🇳🇬
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0B0D10] border border-[#242A32] rounded-lg text-[11px] text-[#9AA4B2]">
                        <FaClock className="text-[#FF6B35] text-[10px]" />
                        WAT (UTC+1)
                      </span>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#242A32]/50">
                      {[
                        {
                          icon: <FaGithub />,
                          href: 'https://github.com/IMPULSIBLE',
                        },
                        { icon: <FaLinkedin />, href: '#' },
                        { icon: <FaTwitter />, href: '#' },
                        {
                          icon: <FaEnvelope />,
                          href: 'mailto:hello@impulsible.com',
                        },
                      ].map((s, i) => (
                        <a
                          key={i}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-[#0B0D10] border border-[#242A32] flex items-center justify-center text-[#6B7280] hover:text-[#FF6B35] hover:border-[#FF6B35]/40 transition-all text-sm"
                        >
                          {s.icon}
                        </a>
                      ))}
                      <a
                        href="#"
                        className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-lg text-xs text-[#FF6B35] hover:bg-[#FF6B35]/20 transition-all"
                      >
                        <FaDownload className="text-[10px]" />
                        Resume
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: About text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              {/* Pre-label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
                  <FaHeart className="text-sm" />
                </div>
                <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] uppercase tracking-[0.2em]">
                  About Me
                </span>
              </div>

              <h1 className="font-['Space_Grotesk'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F7FA] leading-tight">
                Passionate about
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                  {' '}
                  building the future
                </span>
              </h1>

              <div className="space-y-4 mt-6">
                <p className="text-[#C1C7D0] text-lg leading-relaxed text-justify">
                  I'm{' '}
                  <span className="text-[#F5F7FA] font-semibold">
                    Henry Osuagwu
                  </span>
                  , a full-stack developer based in{' '}
                  <span className="text-[#F5F7FA] font-semibold">
                    Lagos, Nigeria
                  </span>
                  . I hold a{' '}
                  <span className="text-[#FF6B35] font-semibold">
                    B.Sc. in Software Development from Brigham Young University — Idaho (2024—2026)
                  </span>
                  , with a focus on{' '}
                  <span className="text-[#FF6B35] font-semibold">
                    Web Development
                  </span>
                  , and a{' '}
                  <span className="text-[#FF6B35] font-semibold">
                    B.Tech. in Statistics from the Federal University of Technology, Owerri (2017—2022)
                  </span>
                  . This unique combination of statistical reasoning and software engineering gives me a powerful analytical approach to building high-performance web applications.
                </p>

                <p className="text-[#9AA4B2] text-lg leading-relaxed text-justify">
                  With over{' '}
                  <span className="text-[#FF6B35] font-semibold">
                    4 years of experience
                  </span>
                  , I've crafted everything from e-commerce platforms to AI-powered collaboration tools. My journey started with a curiosity for data and patterns, evolved through a self-taught programming phase, and matured into a full-fledged development career. I'm driven by the belief that technology can transform lives — especially across Africa.
                </p>

                <p className="text-[#9AA4B2] text-lg leading-relaxed text-justify">
                  Under my brand{' '}
                  <span className="text-[#FF6B35] font-semibold font-['JetBrains_Mono']">
                    IMPULSIBLE
                  </span>
                  , I'm building purpose-driven digital solutions tailored for the Nigerian market while maintaining global standards. My background in statistics gives me a unique edge in data-driven development, ensuring that the products I build are not just functional but also analytically sound and user-centric.
                </p>

                <p className="text-[#9AA4B2] text-lg leading-relaxed text-justify">
                  When I'm not coding, I'm exploring new technologies, contributing to open source, reading about emerging trends, or brainstorming the next product that could make a meaningful difference. I believe in writing clean, maintainable code and creating experiences that users genuinely enjoy.
                </p>
              </div>

              {/* Quick quote */}
              <div className="mt-8 p-5 bg-[#151A20] rounded-xl border border-[#242A32] relative">
                <FaQuoteLeft className="absolute top-4 right-4 text-[#FF6B35]/10 text-3xl" />
                <p className="text-[#C1C7D0] italic leading-relaxed">
                  "I don't just write code — I craft solutions. Every project is a chance to solve a real problem and make technology accessible to everyone."
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#FF6B35] to-[#FFB86B] flex items-center justify-center text-[#0B0D10] text-[9px] font-bold">
                    H
                  </div>
                  <span className="text-xs text-[#6B7280]">
                    — Henry Osuagwu
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS BANNER ===== */}
      <section className="py-12 bg-gradient-to-r from-[#FF6B35]/5 via-[#0B0D10] to-[#FFB86B]/5 border-y border-[#242A32]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              {
                value: 15,
                suffix: '+',
                label: 'Projects Built',
                icon: <FaCode />,
              },
              {
                value: 4,
                suffix: '+',
                label: 'Years Experience',
                icon: <FaCalendarAlt />,
              },
              {
                value: 2,
                suffix: '',
                label: 'Degrees Earned',
                icon: <FaGraduationCap />,
              },
              {
                value: 100,
                suffix: '%',
                label: 'Dedication',
                icon: <FaHeart />,
              },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] mx-auto mb-2 group-hover:scale-110 transition-transform text-sm">
                  {stat.icon}
                </div>
                <div className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-[#F5F7FA]">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-xs text-[#6B7280] mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== WHAT I DO ===== */}
      <section className="py-24 md:py-32 bg-[#11151A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,_rgba(255,107,53,0.04)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-[0.2em] uppercase">
              Expertise
            </span>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-[#F5F7FA] mt-3">
              What I
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                {' '}
                bring
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <FaLaptopCode />,
                title: 'Frontend Development',
                desc: 'Pixel-perfect, responsive interfaces with React, Next.js, TypeScript, and Tailwind CSS. Crafting accessible, performant user experiences.',
                skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
              },
              {
                icon: <FaServer />,
                title: 'Backend Development',
                desc: 'Robust APIs and server-side logic with Node.js, ASP.NET Core, and Express. Building secure, scalable systems architecture.',
                skills: ['Node.js', 'ASP.NET Core', 'Express', 'REST APIs'],
              },
              {
                icon: <FaDatabase />,
                title: 'Database Design',
                desc: 'Efficient data modeling and management with PostgreSQL, MongoDB, and SQL Server. Optimizing queries and data structures.',
                skills: [
                  'PostgreSQL',
                  'MongoDB',
                  'SQL Server',
                  'Prisma ORM',
                ],
              },
              {
                icon: <FaPaintBrush />,
                title: 'UI/UX Design',
                desc: 'User-centered interfaces with clean aesthetics, accessibility, and great usability. Designing intuitive, engaging experiences.',
                skills: ['Figma', 'Responsive', 'Accessibility', 'Prototyping'],
              },
              {
                icon: <FaCloud />,
                title: 'Cloud & DevOps',
                desc: 'Deploying and scaling applications with AWS, Docker, and CI/CD pipelines. Streamlining development and deployment workflows.',
                skills: ['AWS', 'Docker', 'Firebase', 'CI/CD'],
              },
              {
                icon: <FaMobile />,
                title: 'Mobile-First Approach',
                desc: 'Building applications that work flawlessly on every device and screen size. Optimizing for performance and user experience.',
                skills: [
                  'Progressive Web Apps',
                  'Responsive',
                  'Performance',
                  'Testing',
                ],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group bg-[#0B0D10] p-6 rounded-2xl border border-[#242A32] hover:border-[#FF6B35]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,107,53,0.06)] hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF6B35]/20 to-[#FFB86B]/10 flex items-center justify-center text-[#FF6B35] mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#F5F7FA] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#9AA4B2] text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-[#151A20] border border-[#242A32]/50 rounded-md text-[10px] font-['JetBrains_Mono'] text-[#6B7280] group-hover:border-[#FF6B35]/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EDUCATION ===== */}
      <section className="py-24 md:py-32 bg-[#0B0D10] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
                <FaGraduationCap className="text-sm" />
              </div>
              <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] uppercase tracking-[0.2em]">
                Education
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-[#F5F7FA] leading-tight">
              Academic
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                {' '}
                foundation
              </span>
            </h2>
            <p className="text-[#9AA4B2] text-lg max-w-xl mt-3">
              A dual-degree background that combines statistical reasoning with software engineering excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group bg-[#151A20] rounded-2xl border border-[#242A32] p-7 hover:border-[#FF6B35]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,107,53,0.06)]"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35]/20 to-[#FFB86B]/10 flex items-center justify-center text-[#FF6B35] flex-shrink-0 group-hover:scale-110 transition-transform">
                    {edu.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#F5F7FA]">
                          {edu.degree}
                        </h3>
                        <p className="text-[#FF6B35] text-sm font-medium">
                          {edu.field}
                        </p>
                        {edu.subfield && (
                          <p className="text-[#9AA4B2] text-xs font-['JetBrains_Mono'] mt-0.5">
                            Focus: {edu.subfield}
                          </p>
                        )}
                      </div>
                      <span
                        className={`flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-['JetBrains_Mono'] bg-green-500/10 text-green-400 border border-green-500/20`}
                      >
                        <FaCheckCircle className="text-[8px]" />
                        {edu.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-[#6B7280]">
                      <span>{edu.school}</span>
                      <span className="w-1 h-1 rounded-full bg-[#242A32]" />
                      <span>{edu.year}</span>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-2">
                  {edu.highlights.map((h, hi) => (
                    <div
                      key={hi}
                      className="flex items-center gap-2 px-3 py-2 bg-[#0B0D10]/50 rounded-lg border border-[#242A32]/50"
                    >
                      <span className="text-[#FF6B35]/50 text-[8px]">▸</span>
                      <span className="text-xs text-[#9AA4B2]">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== JOURNEY TIMELINE ===== */}
      <section className="py-24 md:py-32 bg-[#11151A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,107,53,0.03)_0%,_transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-[0.2em] uppercase">
              Timeline
            </span>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-[#F5F7FA] mt-3">
              My
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                {' '}
                journey
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: Timeline nav */}
            <div className="lg:col-span-4">
              <div className="space-y-2 sticky top-28">
                {timeline.map((item, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveTimeline(index)}
                    className={`w-full group flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${
                      activeTimeline === index
                        ? 'bg-[#FF6B35]/10 border border-[#FF6B35]/20'
                        : 'bg-transparent border border-transparent hover:bg-[#0B0D10] hover:border-[#242A32]'
                    }`}
                  >
                    {/* Year */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                        activeTimeline === index
                          ? `bg-gradient-to-br ${item.color} text-white shadow-lg`
                          : 'bg-[#0B0D10] border border-[#242A32] text-[#6B7280] group-hover:border-[#FF6B35]/30'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                    </div>

                    <div>
                      <span
                        className={`font-['JetBrains_Mono'] text-xs tracking-wider ${
                          activeTimeline === index
                            ? 'text-[#FF6B35]'
                            : 'text-[#6B7280]'
                        }`}
                      >
                        {item.year}
                      </span>
                      <p
                        className={`font-['Space_Grotesk'] font-bold text-sm mt-0.5 ${
                          activeTimeline === index
                            ? 'text-[#F5F7FA]'
                            : 'text-[#9AA4B2]'
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>

                    {/* Active indicator */}
                    {activeTimeline === index && (
                      <motion.div
                        layoutId="timeline-indicator"
                        className="absolute left-0 w-1 h-8 bg-[#FF6B35] rounded-r-full"
                        transition={{ type: 'spring', bounce: 0.2 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right: Timeline content */}
            <div className="lg:col-span-8">
              <motion.div
                key={activeTimeline}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#0B0D10] rounded-2xl border border-[#242A32] p-8 md:p-10"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${timeline[activeTimeline].color} flex items-center justify-center text-white text-xl shadow-lg flex-shrink-0`}
                  >
                    {timeline[activeTimeline].icon}
                  </div>
                  <div>
                    <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-wider">
                      {timeline[activeTimeline].year}
                    </span>
                    <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#F5F7FA] mt-1">
                      {timeline[activeTimeline].title}
                    </h3>
                    <p className="text-[#9AA4B2] text-sm mt-0.5">
                      {timeline[activeTimeline].subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#C1C7D0] leading-relaxed text-lg">
                  {timeline[activeTimeline].description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[#242A32]/50">
                  <span className="text-[10px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-wider mr-2 self-center">
                    Tech:
                  </span>
                  {timeline[activeTimeline].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#151A20] border border-[#242A32] rounded-lg text-xs font-['JetBrains_Mono'] text-[#9AA4B2]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Navigation dots */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  {timeline.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTimeline(i)}
                      className={`rounded-full transition-all duration-300 ${
                        activeTimeline === i
                          ? 'w-8 h-2 bg-[#FF6B35]'
                          : 'w-2 h-2 bg-[#242A32] hover:bg-[#FF6B35]/40'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-24 md:py-32 bg-[#0B0D10] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-[0.2em] uppercase">
              Philosophy
            </span>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-[#F5F7FA] mt-3">
              What drives
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                {' '}
                me
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-[#151A20] p-6 rounded-2xl border border-[#242A32] hover:border-[#FF6B35]/30 transition-all duration-500 text-center hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B35]/20 to-[#FFB86B]/10 flex items-center justify-center text-[#FF6B35] mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#F5F7FA] mb-2">
                  {value.title}
                </h3>
                <p className="text-[#9AA4B2] text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEYOND THE CODE ===== */}
      <section className="py-24 md:py-32 bg-[#11151A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-[0.2em] uppercase">
                Beyond the Code
              </span>
              <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-[#F5F7FA] mt-3 leading-tight">
                More than just a
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                  {' '}
                  developer
                </span>
              </h2>
              <p className="text-[#9AA4B2] text-lg mt-6 leading-relaxed text-justify">
                I believe the best developers are well-rounded individuals who bring diverse perspectives to problem-solving. Outside of coding, I invest time in activities that fuel creativity, broaden perspectives, and keep life interesting.
              </p>
              <p className="text-[#9AA4B2] text-lg mt-4 leading-relaxed text-justify">
                Whether it's exploring new music, diving into a great book, planning the next travel adventure, or contributing to open-source projects — these experiences shape how I think about problems and design solutions. They remind me that technology is ultimately about people and the lives we can improve.
              </p>

              {/* Interests */}
              <div className="flex flex-wrap gap-3 mt-8">
                {interests.map((interest, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-2 px-4 py-2.5 bg-[#0B0D10] border border-[#242A32] rounded-xl hover:border-[#FF6B35]/30 transition-all cursor-default"
                  >
                    <span className="text-[#FF6B35] group-hover:scale-110 transition-transform">
                      {interest.icon}
                    </span>
                    <span className="text-sm text-[#9AA4B2] group-hover:text-[#F5F7FA] transition-colors">
                      {interest.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Fun facts card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#0B0D10] rounded-2xl border border-[#242A32] p-7">
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#F5F7FA] mb-6 flex items-center gap-2">
                  <span className="text-2xl">⚡</span> Quick Facts
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      emoji: '🌍',
                      fact: "Based in Lagos, Nigeria — building for Africa and the world",
                    },
                    {
                      emoji: '🎓',
                      fact: 'Dual-degree holder: B.Sc. Software Development (BYU-Idaho, 2024—2026) with focus on Web Development + B.Tech. Statistics (FUTO, 2017—2022)',
                    },
                    {
                      emoji: '☕',
                      fact: 'Fueled by coffee — my productivity partner since day one',
                    },
                    {
                      emoji: '🌙',
                      fact: 'Night owl developer — best ideas come after midnight',
                    },
                    {
                      emoji: '📚',
                      fact: 'Constant learner — always exploring new technologies and frameworks',
                    },
                    {
                      emoji: '🎯',
                      fact: 'Detail-oriented — pixel perfection is a lifestyle, not a goal',
                    },
                    {
                      emoji: '🚀',
                      fact: 'IMPULSIBLE — my brand, my philosophy, my mission to build impactful solutions',
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#151A20] transition-colors"
                    >
                      <span className="text-xl flex-shrink-0">{item.emoji}</span>
                      <span className="text-sm text-[#9AA4B2] leading-relaxed">
                        {item.fact}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 md:py-32 bg-[#0B0D10] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6B35]/5 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#151A20] to-[#0B0D10] rounded-3xl border border-[#242A32] p-12 md:p-16 text-center relative overflow-hidden"
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#FF6B35]/30 rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#FF6B35]/30 rounded-br-3xl pointer-events-none" />

            <span className="text-4xl mb-4 block">🤝</span>
            <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-bold text-[#F5F7FA] leading-tight">
              Let's build something
              <br />
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                amazing together
              </span>
            </h2>
            <p className="text-[#9AA4B2] text-lg max-w-xl mx-auto mt-4 leading-relaxed">
              I'm always looking for new opportunities, interesting projects, and great people to work with. Let's connect!
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                to="/contact"
                className="group relative px-8 py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-[#0B0D10] font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">Get in Touch</span>
                <FaArrowRight className="text-sm relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFB86B] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                to="/projects"
                className="px-8 py-3.5 border-2 border-[#242A32] rounded-xl hover:border-[#FF6B35] text-[#F5F7FA] hover:text-[#FF6B35] transition-all duration-300 inline-flex items-center gap-2 hover:bg-[#FF6B35]/5"
              >
                <FaCode />
                View My Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About