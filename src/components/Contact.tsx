import { motion } from 'framer-motion'

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#F5F7FA]">
            Let's Build Together
          </h2>
          <p className="text-[#9AA4B2] text-lg max-w-2xl mx-auto mb-10">
            Have a project in mind? I'd love to hear about it. Let's create something amazing.
          </p>
          <div className="bg-[#151A20] p-8 rounded-2xl border border-[#242A32]">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-[#0B0D10]/50 border border-[#242A32] rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors text-[#F5F7FA] placeholder:text-[#9AA4B2]"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-[#0B0D10]/50 border border-[#242A32] rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors text-[#F5F7FA] placeholder:text-[#9AA4B2]"
              />
              <textarea
                placeholder="Tell me about your project..."
                rows={4}
                className="w-full px-4 py-3 bg-[#0B0D10]/50 border border-[#242A32] rounded-lg focus:border-[#FF6B35] focus:outline-none transition-colors resize-none text-[#F5F7FA] placeholder:text-[#9AA4B2]"
              />
              <button
                type="submit"
                className="w-full px-8 py-3 bg-[#FF6B35] text-[#0B0D10] font-medium rounded-lg hover:bg-[#FFB86B] transition-all hover:scale-105"
              >
                Send Message
              </button>
            </form>
            <div className="flex justify-center gap-6 mt-6">
              <a href="#" className="text-[#9AA4B2] hover:text-[#FF6B35] transition-colors">GitHub</a>
              <a href="#" className="text-[#9AA4B2] hover:text-[#FF6B35] transition-colors">LinkedIn</a>
              <a href="#" className="text-[#9AA4B2] hover:text-[#FF6B35] transition-colors">Twitter</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact