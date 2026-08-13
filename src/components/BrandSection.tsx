import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'

const BrandSection = () => {
  return (
    <section className="py-16 md:py-20 bg-[#11151A] border-y border-[#242A32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-4xl">🚀</span>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
              IMPULSIBLE
            </h2>
            <span className="text-4xl">🇳🇬</span>
          </div>
          <p className="text-[#9AA4B2] text-lg max-w-2xl mx-auto">
            Building innovative digital solutions from Nigeria for the world.
          </p>
          
          <div className="flex justify-center gap-6 mt-6">
            <a
              href="https://github.com/IMPULSIBLE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9AA4B2] hover:text-[#FF6B35] transition-colors text-2xl"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="text-[#9AA4B2] hover:text-[#FF6B35] transition-colors text-2xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className="text-[#9AA4B2] hover:text-[#FF6B35] transition-colors text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="mailto:hello@impulsible.com"
              className="text-[#9AA4B2] hover:text-[#FF6B35] transition-colors text-2xl"
            >
              <FaEnvelope />
            </a>
          </div>
          
          <div className="flex justify-center gap-4 mt-4">
            <span className="px-3 py-1 bg-[#0B0D10] border border-[#242A32] rounded-full text-xs text-[#9AA4B2]">
              🇳🇬 Nigeria
            </span>
            <span className="px-3 py-1 bg-[#0B0D10] border border-[#242A32] rounded-full text-xs text-[#9AA4B2]">
              🌍 Global
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BrandSection