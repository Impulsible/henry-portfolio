import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#11151A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F7FA]">
                About Me
              </h2>
              <p className="text-[#9AA4B2] text-lg max-w-2xl mt-2">
                Building innovative solutions from Nigeria 🇳🇬
              </p>
            </div>
            <Link to="/about" className="text-[#FF6B35] hover:text-[#FFB86B] transition-colors text-sm font-medium hidden md:block">
              More About Me →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-[#9AA4B2] text-lg leading-relaxed mb-6">
                I'm Henry Osuagwu, a software developer who enjoys turning ideas into practical digital products. 
                I work across frontend and backend development, building applications that combine clean interfaces, 
                solid architecture, and real-world functionality.
              </p>
              <p className="text-[#9AA4B2] text-lg leading-relaxed mb-6">
                Currently building <span className="text-[#FF6B35] font-semibold">IMPULSIBLE</span> — 
                a brand focused on creating innovative digital solutions for the Nigerian market and beyond.
                My current focus includes a Nigerian food delivery platform, an interactive detective game,
                and an AI-powered collaboration platform.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-[#0B0D10] border border-[#242A32] rounded-full text-sm text-[#9AA4B2]">
                  🇳🇬 Nigerian Developer
                </span>
                <span className="px-3 py-1 bg-[#0B0D10] border border-[#242A32] rounded-full text-sm text-[#9AA4B2]">
                  🚀 IMPULSIBLE
                </span>
                <span className="px-3 py-1 bg-[#0B0D10] border border-[#242A32] rounded-full text-sm text-[#9AA4B2]">
                  💻 Full-Stack
                </span>
              </div>
            </div>

            <div className="bg-[#151A20] p-6 rounded-xl border border-[#242A32]">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold mb-4 text-[#F5F7FA]">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-['Space_Grotesk'] font-bold text-[#FF6B35]">15+</div>
                  <div className="text-sm text-[#9AA4B2]">Projects Built</div>
                </div>
                <div>
                  <div className="text-2xl font-['Space_Grotesk'] font-bold text-[#FF6B35]">4+</div>
                  <div className="text-sm text-[#9AA4B2]">Years of Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-['Space_Grotesk'] font-bold text-[#FF6B35]">🇳🇬</div>
                  <div className="text-sm text-[#9AA4B2]">Based in Nigeria</div>
                </div>
                <div>
                  <div className="text-2xl font-['Space_Grotesk'] font-bold text-[#FF6B35]">🚀</div>
                  <div className="text-sm text-[#9AA4B2]">Building IMPULSIBLE</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link to="/about" className="text-[#FF6B35] hover:text-[#FFB86B] transition-colors text-sm font-medium">
              More About Me →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection