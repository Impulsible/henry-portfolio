import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { FaGithub, FaExternalLinkAlt, FaCheckCircle, FaArrowRight } from 'react-icons/fa'

const ProjectShowcase = () => {
  const completedProjects = projects.filter((p) => p.status === 'completed')

  return (
    <section className="py-24 md:py-32 bg-[#11151A] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,53,0.04)_0%,_transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                <FaCheckCircle className="text-sm" />
              </div>
              <span className="font-['JetBrains_Mono'] text-sm text-green-400 uppercase tracking-[0.2em]">
                Completed
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F7FA] leading-tight">
              Shipped &
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {' '}delivered
              </span>
            </h2>
            <p className="text-[#9AA4B2] text-lg max-w-xl mt-3 leading-relaxed">
              Production-ready projects built, tested, and deployed — each one a complete solution.
            </p>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-green-500/5 border border-green-500/20 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-sm text-green-400 font-['JetBrains_Mono']">
              {completedProjects.length} shipped
            </span>
          </div>
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col bg-gradient-to-b from-[#151A20] to-[#11151A] rounded-2xl overflow-hidden border border-[#242A32] hover:border-green-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.06)] hover:-translate-y-2"
            >
              {/* Visual header */}
              <div className={`relative h-44 bg-gradient-to-br ${project.color} overflow-hidden`}>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                {/* Bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#151A20] via-transparent to-transparent opacity-60" />

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-500 drop-shadow-xl">
                    {project.image}
                  </span>
                </div>

                {/* Status badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B0D10]/70 backdrop-blur-sm border border-green-500/30 rounded-full text-xs text-green-400 font-['JetBrains_Mono']">
                    <FaCheckCircle className="text-[10px]" />
                    Completed
                  </span>
                </div>

                {/* Project ID watermark */}
                <div className="absolute bottom-2 right-3 font-['JetBrains_Mono'] text-4xl font-bold text-white/5 select-none">
                  {String(project.id).padStart(2, '0')}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#6B7280] tracking-[0.2em] uppercase">
                    Project {String(project.id).padStart(2, '0')}
                  </span>
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#F5F7FA] mt-1 mb-2 group-hover:text-green-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[#9AA4B2] text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-[#0B0D10] border border-[#242A32] rounded-lg text-[11px] font-['JetBrains_Mono'] text-[#6B7280] group-hover:border-green-500/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2.5 py-1 text-[11px] text-[#6B7280]">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#242A32]/50">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#F5F7FA] transition-colors py-1.5 px-3 rounded-lg hover:bg-[#0B0D10]"
                  >
                    <FaGithub /> Code
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-green-400 transition-colors py-1.5 px-3 rounded-lg hover:bg-[#0B0D10]"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                  <Link
                    to={`/projects/${project.id}`}
                    className="ml-auto flex items-center gap-1 text-xs text-green-400/60 hover:text-green-400 transition-colors group/link"
                  >
                    Details
                    <FaArrowRight className="text-[10px] group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectShowcase