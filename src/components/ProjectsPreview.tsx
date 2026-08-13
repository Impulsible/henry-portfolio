import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import { FaArrowRight, FaCode } from 'react-icons/fa'

const ProjectsPreview = () => {
  const featuredProjects = projects.slice(0, 4)

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#0B0D10] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,107,53,0.05)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
                <FaCode className="text-sm" />
              </div>
              <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] uppercase tracking-[0.2em]">
                Featured Work
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F7FA] leading-tight">
              Projects I'm
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                {' '}proud of
              </span>
            </h2>
            <p className="text-[#9AA4B2] text-lg max-w-xl mt-3 leading-relaxed">
              A selection of my recent work spanning full-stack apps, AI tools, and
              Nigerian market solutions.
            </p>
          </div>

          <Link
            to="/projects"
            className="group flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 border border-[#242A32] rounded-xl text-sm text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/40 hover:bg-[#FF6B35]/5 transition-all duration-300"
          >
            View All Projects
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <Link
              to={`/projects/${project.id}`}
              key={project.id}
              className="block"
            >
              <ProjectCard project={project} index={index} />
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-[#0B0D10] font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(255,107,53,0.25)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
          >
            <span className="relative z-10">Explore All Projects</span>
            <FaArrowRight className="text-sm relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFB86B] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsPreview