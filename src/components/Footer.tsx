import { Link, useLocation } from 'react-router-dom'
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope,
  FaHeart,
  FaArrowUp,
  FaMapMarkerAlt,
  FaRocket
} from 'react-icons/fa'

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
        {/* ── Main Footer Grid ── */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFB86B] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(255,107,53,0.4)] transition-all duration-300">
                <span className="font-['Space_Grotesk'] text-sm font-bold text-[#0B0D10]">HO</span>
              </div>
              <div>
                <span className="font-['Space_Grotesk'] text-lg font-bold text-[#F5F7FA] tracking-tight">
                  HENRY<span className="text-[#FF6B35]">.</span>
                </span>
                <span className="block text-[9px] text-[#6B7280] font-['JetBrains_Mono'] tracking-[0.15em] -mt-1">
                  DEVELOPER
                </span>
              </div>
            </Link>

            <p className="text-[#6B7280] text-sm leading-relaxed mt-4 max-w-xs">
              Crafting digital experiences with clean code and thoughtful design. 
              Every line of code is written with purpose.
            </p>

            <div className="flex items-center gap-2 mt-4 text-xs text-[#6B7280]">
              <FaMapMarkerAlt className="text-[#FF6B35]/60" />
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
                { name: 'Home',     path: '/' },
                { name: 'Projects', path: '/projects' },
                { name: 'About',    path: '/about' },
                { name: 'Skills',   path: '/skills' },
                { name: 'Contact',  path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`text-sm transition-colors duration-200 inline-flex items-center gap-1.5 group ${
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
                { name: 'GitHub Repos', href: 'https://github.com/IMPULSIBLE', external: true },
                { name: 'Tech Blog', href: '#', external: false, badge: 'Soon' },
                { name: 'Uses / Setup', href: '#', external: false, badge: 'Soon' },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-[#6B7280] hover:text-[#F5F7FA] transition-colors duration-200 inline-flex items-center gap-2"
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
          <div className="md:col-span-4">
            <h4 className="font-['JetBrains_Mono'] text-[10px] text-[#6B7280] uppercase tracking-[0.2em] mb-4">
              Get in Touch
            </h4>

            {/* Email card */}
            <a
              href="mailto:hello@impulsible.com"
              className="group block bg-[#0B0D10] border border-[#242A32]/50 rounded-xl p-4 hover:border-[#FF6B35]/30 transition-all duration-300 mb-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] group-hover:scale-110 transition-transform flex-shrink-0">
                  <FaEnvelope className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Email me at</p>
                  <p className="text-sm text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors font-medium">
                    hello@impulsible.com
                  </p>
                </div>
              </div>
            </a>

            {/* Social links */}
            <div className="flex items-center gap-2.5">
              {[
                { icon: <FaGithub />,   href: 'https://github.com/IMPULSIBLE', label: 'GitHub' },
                { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
                { icon: <FaTwitter />,  href: '#', label: 'Twitter' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-[#0B0D10] border border-[#242A32]/50 flex items-center justify-center text-[#6B7280] hover:text-[#FF6B35] hover:border-[#FF6B35]/30 hover:bg-[#FF6B35]/5 transition-all duration-300 text-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="py-6 border-t border-[#1A1F27]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3 text-xs text-[#4A5568]">
            <span>© {currentYear} Henry Osuagwu</span>
            <span className="w-1 h-1 rounded-full bg-[#242A32]" />
            <span className="flex items-center gap-1.5">
              Built with <FaHeart className="text-[#FF6B35]/60 text-[10px]" /> and lots of coffee
            </span>
          </div>

          {/* Center – Brand */}
          <div className="flex items-center gap-1.5 text-xs">
            <FaRocket className="text-[#FF6B35]/40 text-[10px]" />
            <span className="font-['JetBrains_Mono'] text-[#4A5568] tracking-wider">
              IMPULSIBLE
            </span>
          </div>

          {/* Right – Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-[#4A5568] hover:text-[#FF6B35] transition-colors duration-300"
            aria-label="Back to top"
          >
            Back to top
            <div className="w-7 h-7 rounded-lg bg-[#0B0D10] border border-[#242A32]/50 flex items-center justify-center group-hover:border-[#FF6B35]/30 group-hover:bg-[#FF6B35]/5 transition-all">
              <FaArrowUp className="text-[10px] group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer