import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center py-20 md:py-28 pt-32 md:pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-['JetBrains_Mono'] text-sm text-[#FFB86B] uppercase tracking-wider">
              Software Developer
            </span>
            <h1 className="font-['Space_Grotesk'] text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mt-4 text-[#F5F7FA]">
              I build digital<br />
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                products
              </span> that<br />
              solve real problems
            </h1>
            <p className="text-[#9AA4B2] text-lg mt-6 max-w-lg">
              Software developer focused on building modern, scalable web applications with thoughtful user experiences.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#projects"
                className="px-8 py-3 bg-[#FF6B35] text-[#0B0D10] font-medium rounded-full hover:bg-[#FFB86B] transition-all hover:scale-105"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-[#242A32] rounded-full hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all text-[#F5F7FA]"
              >
                Download Resume
              </a>
            </div>
            <div className="flex items-center gap-2 mt-8 text-sm text-[#9AA4B2]">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available for opportunities
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="aspect-square bg-gradient-to-br from-[#FF6B35]/20 to-[#FFB86B]/20 rounded-2xl border border-[#242A32] p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">👨🏽‍💻</div>
                <h3 className="font-['Space_Grotesk'] text-2xl text-[#F5F7FA]">Henry Osuagwu</h3>
                <p className="text-[#9AA4B2]">Full-Stack Developer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero