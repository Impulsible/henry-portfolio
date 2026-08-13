import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#11151A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#F5F7FA]">
            About Me
          </h2>
          <div className="max-w-3xl">
            <p className="text-[#9AA4B2] text-lg leading-relaxed">
              I'm Henry Osuagwu, a software developer who enjoys turning ideas into practical digital products. 
              I work across frontend and backend development, building applications that combine clean interfaces, 
              solid architecture, and real-world functionality.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {[
                { number: '15+', label: 'Projects Built' },
                { number: '4+', label: 'Years Learning' },
                { number: '10+', label: 'Technologies' },
                { number: '∞', label: 'Problems to Solve' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-[#151A20] rounded-xl border border-[#242A32]">
                  <div className="font-['Space_Grotesk'] text-3xl font-bold text-[#FF6B35]">{stat.number}</div>
                  <div className="text-[#9AA4B2] text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About