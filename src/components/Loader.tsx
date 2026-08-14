import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Logo from './Logo'

const Loader = () => {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Initializing')
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const stages = [
      { progress: 15, text: 'Loading assets', delay: 400 },
      { progress: 35, text: 'Compiling components', delay: 800 },
      { progress: 55, text: 'Fetching projects', delay: 1200 },
      { progress: 75, text: 'Building interface', delay: 1600 },
      { progress: 90, text: 'Almost ready', delay: 2000 },
      { progress: 100, text: 'Welcome!', delay: 2300 },
    ]

    const timers: ReturnType<typeof setTimeout>[] = []

    stages.forEach(({ progress: p, text, delay }) => {
      timers.push(
        setTimeout(() => {
          setProgress(p)
          setStatusText(text)
        }, delay)
      )
    })

    timers.push(
      setTimeout(() => {
        setLoading(false)
      }, 2800)
    )

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 0.8, ease: [0.32, 0, 0.67, 0] },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0D10] overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,107,53,0.08)_0%,_transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,184,107,0.05)_0%,_transparent_50%)]" />
          </div>

          {/* Grid pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,107,53,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,107,53,0.4) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#FF6B35]/30 rounded-full pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* ── Main content ── */}
          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-6">
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className="relative"
            >
              {/* Outer glow ring */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-6 bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] rounded-3xl blur-2xl"
              />

              {/* Spinning border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -inset-1 rounded-2xl"
                style={{
                  background:
                    'conic-gradient(from 0deg, #FF6B35, transparent, transparent, #FFB86B, transparent, transparent, #FF6B35)',
                }}
              />

              {/* Logo container */}
              <div className="relative w-20 h-20 rounded-2xl bg-[#0B0D10] flex items-center justify-center border border-[#242A32]/50 overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="IMPULSIBLE" 
                  className="w-16 h-16 object-contain"
                />
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FF6B35] via-[#FF8F5E] to-[#FFB86B] bg-clip-text text-transparent"
            >
              IMPULSIBLE
            </motion.h1>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <div className="w-6 h-px bg-[#242A32]" />
              <span className="text-xs text-[#6B7280] font-['JetBrains_Mono'] tracking-[0.3em] uppercase">
                Henry Osuagwu
              </span>
              <div className="w-6 h-px bg-[#242A32]" />
            </motion.div>

            {/* Progress section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="w-full space-y-3"
            >
              <div className="relative">
                <div className="w-full h-1.5 bg-[#151A20] rounded-full overflow-hidden border border-[#242A32]/30">
                  <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                      background:
                        'linear-gradient(90deg, #FF6B35, #FF8F5E, #FFB86B)',
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      }}
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="absolute top-0 left-0 h-1.5 rounded-full blur-md opacity-50"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{
                    background:
                      'linear-gradient(90deg, #FF6B35, #FFB86B)',
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full"
                  />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={statusText}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 5 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs text-[#9AA4B2] font-['JetBrains_Mono']"
                    >
                      {statusText}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-[#FF6B35]"
                      >
                        _
                      </motion.span>
                    </motion.span>
                  </AnimatePresence>
                </div>

                <motion.span
                  key={progress}
                  initial={{ scale: 1.3, color: '#FF6B35' }}
                  animate={{ scale: 1, color: '#6B7280' }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-['JetBrains_Mono'] font-medium"
                >
                  {progress}%
                </motion.span>
              </div>
            </motion.div>

            {/* Terminal-style log */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="w-full bg-[#0A0C0F] rounded-xl border border-[#1A1F27] p-4 overflow-hidden"
            >
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                <span className="ml-2 text-[9px] text-[#4A5568] font-['JetBrains_Mono']">
                  terminal
                </span>
              </div>

              <div className="space-y-1.5 font-['JetBrains_Mono'] text-[10px] leading-relaxed">
                {[
                  { text: '→ Loading portfolio...', delay: 0.4, color: 'text-[#9AA4B2]' },
                  { text: '✓ Assets compiled', delay: 0.8, color: 'text-green-400/70' },
                  { text: '✓ Components mounted', delay: 1.2, color: 'text-green-400/70' },
                  { text: '✓ Projects loaded (7)', delay: 1.6, color: 'text-green-400/70' },
                  { text: '⚡ Ready to launch!', delay: 2.2, color: 'text-[#FF6B35]' },
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: line.delay, duration: 0.3 }}
                    className={line.color}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom branding with dynamic year */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex items-center gap-3 text-[10px] text-[#3A4150] font-['JetBrains_Mono']"
            >
              <span>🇳🇬 Lagos, Nigeria</span>
              <span className="w-1 h-1 rounded-full bg-[#242A32]" />
              <span>Full-Stack Developer</span>
              <span className="w-1 h-1 rounded-full bg-[#242A32]" />
              <span>© {currentYear}</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader