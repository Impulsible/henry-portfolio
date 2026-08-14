import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const Logo = ({ className = "", showText = true, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-9 h-9',
    lg: 'w-14 h-14'
  }

  const textSize = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl'
  }

  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <motion.div
        whileHover={{ rotate: -5, scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFB86B] p-[2px] shadow-lg shadow-[#FF6B35]/20`}>
          <div className="w-full h-full rounded-xl bg-[#0B0D10] overflow-hidden flex items-center justify-center">
            <img 
              src="/logo.png"
              alt="IMPULSIBLE"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFB86B] opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 -z-10" />
      </motion.div>
      {showText && (
        <span className={`font-['Space_Grotesk'] font-bold ${textSize[size]} text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors`}>
          IMPULSIBLE
        </span>
      )}
    </Link>
  )
}

export default Logo