import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaDownload,
  FaArrowRight
} from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHover, setActiveHover] = useState<string | null>(null)
  const location = useLocation()
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const navItems = [
    { name: 'Home',     path: '/',         icon: '🏠', desc: 'Back to start' },
    { name: 'Projects', path: '/projects', icon: '💻', desc: 'View my work' },
    { name: 'About',    path: '/about',    icon: '👨🏽‍💻', desc: 'Learn about me' },
    { name: 'Skills',   path: '/skills',   icon: '🛠️', desc: 'Tech stack' },
    { name: 'Contact',  path: '/contact',  icon: '📬', desc: 'Get in touch' },
  ]

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0B0D10]/80 backdrop-blur-xl border-b border-[#242A32]/50 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ── Logo ── */}
            <Link
              to="/"
              className="relative z-50 flex items-center gap-2 group"
            >
              {/* Logo image */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFB86B] p-[2px] shadow-lg shadow-[#FF6B35]/20 group-hover:shadow-[0_0_30px_rgba(255,107,53,0.4)] transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-xl bg-[#0B0D10] overflow-hidden flex items-center justify-center">
                  <img 
                    src="/logo.png" 
                    alt="IMPULSIBLE" 
                    className="w-7 h-7 object-contain"
                  />
                </div>
              </div>
              {/* Logo text */}
              <div className="hidden sm:block">
                <span className="font-['Space_Grotesk'] text-lg font-bold text-[#F5F7FA] tracking-tight">
                  HENRY
                  <span className="text-[#FF6B35]">.</span>
                </span>
                <span className="block text-[9px] text-[#6B7280] font-['JetBrains_Mono'] tracking-[0.15em] -mt-1">
                  DEVELOPER
                </span>
              </div>
            </Link>

            {/* ── Desktop Navigation ── */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'text-[#FF6B35]'
                        : 'text-[#9AA4B2] hover:text-[#F5F7FA]'
                    }`}
                    onMouseEnter={() => setActiveHover(item.name)}
                    onMouseLeave={() => setActiveHover(null)}
                  >
                    {(isActive || activeHover === item.name) && (
                      <motion.div
                        layoutId="navbar-pill"
                        className={`absolute inset-0 rounded-xl ${
                          isActive
                            ? 'bg-[#FF6B35]/10 border border-[#FF6B35]/20'
                            : 'bg-[#151A20] border border-[#242A32]/50'
                        }`}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="active-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF6B35] rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* ── Desktop Right Actions ── */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/Impulsible"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#151A20] border border-[#242A32] flex items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/50 transition-all duration-300 text-sm"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="group px-5 py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-[#0B0D10] font-semibold rounded-xl text-sm hover:shadow-[0_0_25px_rgba(255,107,53,0.3)] transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10">Resume</span>
                <FaDownload className="text-xs relative z-10 group-hover:animate-bounce" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFB86B] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>

            {/* ── Mobile Hamburger Button ── */}
            <button
              className="relative z-50 md:hidden w-12 h-12 rounded-xl flex items-center justify-center group"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                isOpen 
                  ? 'bg-[#FF6B35]/10 border border-[#FF6B35]/30' 
                  : 'bg-[#151A20]/50 border border-[#242A32]/50 group-hover:border-[#FF6B35]/30'
              }`} />

              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 origin-center ${
                    isOpen
                      ? 'bg-[#FF6B35] rotate-45 translate-y-[7px]'
                      : 'bg-[#F5F7FA] group-hover:bg-[#FF6B35] w-full'
                  }`}
                />
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 ${
                    isOpen
                      ? 'bg-[#FF6B35] opacity-0 scale-0'
                      : 'bg-[#F5F7FA] group-hover:bg-[#FF6B35] w-3/4 ml-auto'
                  }`}
                />
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 origin-center ${
                    isOpen
                      ? 'bg-[#FF6B35] -rotate-45 -translate-y-[7px]'
                      : 'bg-[#F5F7FA] group-hover:bg-[#FF6B35] w-1/2 ml-auto'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ===== FULL-SCREEN MOBILE MENU ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-[#0B0D10]/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-[85%] max-w-sm bg-gradient-to-b from-[#11151A] to-[#0B0D10] border-l border-[#242A32]/50 md:hidden overflow-y-auto"
            >
              {/* Menu header */}
              <div className="px-6 pt-20 pb-6 border-b border-[#242A32]/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFB86B] p-[2px]">
                    <div className="w-full h-full rounded-xl bg-[#0B0D10] overflow-hidden flex items-center justify-center">
                      <img 
                        src="/logo.png" 
                        alt="IMPULSIBLE" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-['Space_Grotesk'] font-bold text-[#F5F7FA]">
                      Henry Osuagwu
                    </p>
                    <p className="text-xs text-[#FF6B35] font-['JetBrains_Mono']">
                      IMPULSIBLE
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation links */}
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="px-4 py-6"
              >
                <p className="px-3 text-[10px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-[0.2em] mb-3">
                  Navigation
                </p>
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                      <motion.div key={item.name} variants={itemVariants}>
                        <Link
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                            isActive
                              ? 'bg-[#FF6B35]/10 border border-[#FF6B35]/20'
                              : 'hover:bg-[#151A20] border border-transparent hover:border-[#242A32]/50'
                          }`}
                        >
                          <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${
                            isActive ? 'scale-110' : ''
                          }`}>
                            {item.icon}
                          </span>

                          <div className="flex-1">
                            <span className={`block font-['Space_Grotesk'] font-semibold transition-colors ${
                              isActive ? 'text-[#FF6B35]' : 'text-[#F5F7FA] group-hover:text-[#FF6B35]'
                            }`}>
                              {item.name}
                            </span>
                            <span className="block text-xs text-[#6B7280]">
                              {item.desc}
                            </span>
                          </div>

                          <FaArrowRight className={`text-xs transition-all duration-300 ${
                            isActive 
                              ? 'text-[#FF6B35] opacity-100' 
                              : 'text-[#3A4150] opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                          }`} />

                          {isActive && (
                            <motion.div
                              layoutId="mobile-active"
                              className="absolute left-0 w-1 h-8 bg-[#FF6B35] rounded-r-full"
                              transition={{ type: 'spring', bounce: 0.2 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Divider */}
                <div className="my-6 mx-3 h-px bg-gradient-to-r from-transparent via-[#242A32] to-transparent" />

                {/* Actions */}
                <p className="px-3 text-[10px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-[0.2em] mb-3">
                  Quick Actions
                </p>
                <motion.div variants={itemVariants} className="space-y-2">
                  <a
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B35]/10 to-[#FFB86B]/5 border border-[#FF6B35]/20 hover:border-[#FF6B35]/40 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/20 flex items-center justify-center">
                      <FaDownload className="text-[#FF6B35] text-sm group-hover:animate-bounce" />
                    </div>
                    <div>
                      <span className="block font-['Space_Grotesk'] font-semibold text-[#F5F7FA]">
                        Download Resume
                      </span>
                      <span className="block text-xs text-[#6B7280]">
                        PDF · Updated {currentYear}
                      </span>
                    </div>
                  </a>

                  <a
                    href="mailto:henryosuagwu22@gmail.com"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-[#151A20] border border-transparent hover:border-[#242A32]/50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#151A20] border border-[#242A32] flex items-center justify-center">
                      <FaEnvelope className="text-[#9AA4B2] group-hover:text-[#FF6B35] transition-colors text-sm" />
                    </div>
                    <div>
                      <span className="block font-['Space_Grotesk'] font-semibold text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors">
                        Email Me
                      </span>
                      <span className="block text-xs text-[#6B7280]">henryosuagwu22@gmail.com</span>
                    </div>
                  </a>
                </motion.div>

                {/* Divider */}
                <div className="my-6 mx-3 h-px bg-gradient-to-r from-transparent via-[#242A32] to-transparent" />

                {/* Social Links */}
                <p className="px-3 text-[10px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-[0.2em] mb-3">
                  Connect
                </p>
                <motion.div variants={itemVariants} className="flex items-center gap-3 px-3">
                  {[
                    { icon: <FaGithub />,   href: 'https://github.com/Impulsible', label: 'GitHub' },
                    { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
                    { icon: <FaTwitter />,  href: '#', label: 'Twitter' },
                    { icon: <FaEnvelope />, href: 'mailto:henryosuagwu22@gmail.com', label: 'Email' },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      onClick={() => setIsOpen(false)}
                      className="w-11 h-11 rounded-xl bg-[#151A20] border border-[#242A32] flex items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/50 hover:bg-[#FF6B35]/5 transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Footer brand */}
              <div className="px-6 py-6 mt-auto border-t border-[#242A32]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-['JetBrains_Mono'] text-[10px] text-[#6B7280] tracking-wider">
                      © {currentYear}
                    </p>
                    <p className="font-['Space_Grotesk'] text-xs font-bold text-[#FF6B35]">
                      IMPULSIBLE
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-[10px] text-[#6B7280] font-['JetBrains_Mono']">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar