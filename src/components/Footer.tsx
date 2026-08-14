import { Link, useLocation } from 'react-router-dom'
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaArrowUp,
  FaMapMarkerAlt,
  FaRocket,
} from 'react-icons/fa'
import { SiReact, SiTypescript, SiTailwindcss } from 'react-icons/si'

const Footer = () => {
  const location = useLocation()
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0A0C0F] relative overflow-hidden">
      {/* Subtle top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#FF6B35]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MAIN FOOTER GRID (mobile-first) */}
        <div className="py-12 sm:py-14 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 sm:gap-8 md:gap-8 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFB86B] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(255,107,53,0.4)] transition-all duration-300 flex-shrink-0">
                <span className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#0B0D10]">
                  HO
                </span>
              </div>
              <div className="min-w-0">
                <span className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#F5F7FA] tracking-tight">
                  HENRY<span className="text-[#FF6B35]">.</span>
                </span>
                <span className="block text-[9px] sm:text-[10px] text-[#6B7280] font-['JetBrains_Mono'] tracking-[0.15em] -mt-1">
                  DEVELOPER
                </span>
              </div>
            </Link>

            <p className="text-[#6B7280] text-[13px] sm:text-sm leading-relaxed mt-4 max-w-md sm:max-w-xs">
              Crafting digital experiences with clean code and thoughtful design. Every line of code is
              written with purpose.
            </p>

            <div className="flex items-center gap-2 mt-4 text-xs text-[#6B7280]">
              <FaMapMarkerAlt className="text-[#FF6B35]/60 flex-shrink-0" />
              <span>Lagos, Nigeria 🇳🇬</span>
            </div>

            {/* Availability status */}
            <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 bg-[#0B0D10] border border-[#242A32]/50 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[11px] text-[#9AA4B2] font-['JetBrains_Mono']">
                Available for hire
              </span>
            </div>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-2">
            <h4 className="font-['JetBrains_Mono'] text-[10px] text-[#6B7280] uppercase tracking-[0.2em] mb-4">
              Sitemap
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', path: '/' },
                { name: 'Projects', path: '/projects' },
                { name: 'About', path: '/about' },
                { name: 'Skills', path: '/skills' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`text-[13px] sm:text-sm transition-colors duration-200 inline-flex items-center gap-1.5 ${
                      location.pathname === item.path
                        ? 'text-[#FF6B35]'
                        : 'text-[#6B7280] hover:text-[#F5F7FA]'
                    }`}
                  >
                    {location.pathname === item.path && (
                      <span className="w-1 h-1 rounded-full bg-[#FF6B35]" />
                    )}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h4 className="font-['JetBrains_Mono'] text-[10px] text-[#6B7280] uppercase tracking-[0.2em] mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Resume / CV', href: '#', external: false },
                { name: 'GitHub Repos', href: 'https://github.com/Impulsible', external: true },
                { name: 'Tech Blog', href: '#', external: false, badge: 'Soon' },
                { name: 'Uses / Setup', href: '#', external: false, badge: 'Soon' },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-[13px] sm:text-sm text-[#6B7280] hover:text-[#F5F7FA] transition-colors duration-200 inline-flex items-center gap-2 flex-wrap"
                  >
                    {item.name}
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-['JetBrains_Mono'] bg-[#FF6B35]/10 text-[#FF6B35] rounded-md border border-[#FF6B35]/20">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="sm:col-span-2 md:col-span-4">
            <h4 className="font-['JetBrains_Mono'] text-[10px] text-[#6B7280] uppercase tracking-[0.2em] mb-4">
              Get in Touch
            </h4>

            <a
              href="mailto:henryosuagwu22@gmail.com"
              className="group block bg-[#0B0D10] border border-[#242A32]/50 rounded-xl p-3 sm:p-4 hover:border-[#FF6B35]/30 transition-all duration-300 mb-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] group-hover:scale-110 transition-transform flex-shrink-0">
                  <FaEnvelope className="text-sm" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[#6B7280]">Email</p>
                  <p className="text-[13px] sm:text-sm text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors font-medium truncate">
                    henryosuagwu22@gmail.com
                  </p>
                </div>
              </div>
            </a>

            <div className="flex items-center gap-2.5">
              {[
                { icon: <FaGithub />, href: 'https://github.com/Impulsible', label: 'GitHub' },
                { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
                { icon: <FaTwitter />, href: '#', label: 'Twitter' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-[#0B0D10] border border-[#242A32]/50 flex items-center justify-center text-[#6B7280] hover:text-[#FF6B35] hover:border-[#FF6B35]/30 hover:bg-[#FF6B35]/5 transition-all duration-300 text-sm active:scale-95"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────
            "BUILT WITH" STRIP
            Sits above the bottom bar as a subtle attribution row
            ────────────────────────────────────────────── */}
        <div className="py-4 border-t border-[#1A1F27]/50">
          <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-[#4A5568]">
            <span className="font-['JetBrains_Mono'] tracking-wider uppercase">Built with</span>
            <span className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex items-center gap-1.5 hover:text-[#61DAFB] transition-colors cursor-default">
                <SiReact className="text-sm" />
                <span className="hidden sm:inline">React</span>
              </span>
              <span className="text-[#242A32]">·</span>
              <span className="flex items-center gap-1.5 hover:text-[#3178C6] transition-colors cursor-default">
                <SiTypescript className="text-sm" />
                <span className="hidden sm:inline">TypeScript</span>
              </span>
              <span className="text-[#242A32]">·</span>
              <span className="flex items-center gap-1.5 hover:text-[#06B6D4] transition-colors cursor-default">
                <SiTailwindcss className="text-sm" />
                <span className="hidden sm:inline">Tailwind CSS</span>
              </span>
            </span>
          </div>
        </div>

        {/* ──────────────────────────────────────────────
            BOTTOM BAR — modern, professional, mobile-first
            ────────────────────────────────────────────── */}
        <div className="py-5 sm:py-6 border-t border-[#1A1F27]/50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            {/* Left: Brand */}
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#4A5568]">
              <FaRocket className="text-[#FF6B35]/40 text-[11px]" />
              <span className="font-['JetBrains_Mono'] tracking-wider">IMPULSIBLE</span>
            </div>

            {/* Center: Copyright */}
            <div className="text-center text-[11px] sm:text-xs text-[#4A5568]">
              © {currentYear} Henry Osuagwu. All rights reserved.
            </div>

            {/* Right: Back to top */}
            <div className="flex justify-center sm:justify-end">
              <button
                onClick={scrollToTop}
                className="group inline-flex items-center gap-2 text-[11px] sm:text-xs text-[#4A5568] hover:text-[#FF6B35] transition-colors duration-300"
                aria-label="Back to top"
              >
                Back to top
                <div className="w-7 h-7 rounded-lg bg-[#0B0D10] border border-[#242A32]/50 flex items-center justify-center group-hover:border-[#FF6B35]/30 group-hover:bg-[#FF6B35]/5 transition-all">
                  <FaArrowUp className="text-[10px] group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer