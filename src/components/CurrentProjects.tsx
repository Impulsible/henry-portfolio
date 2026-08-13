import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa'

const CurrentProjects = () => {
  const currentProjects = projects.filter((p) => p.status === 'building')

  return (
    <section className="py-24 md:py-32 bg-[#0B0D10] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,107,53,0.06)_0%,_transparent_50%)] pointer-events-none" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,107,53,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,53,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

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
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF6B35]" />
              </span>
              <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] uppercase tracking-[0.2em]">
                Currently Building
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F7FA] leading-tight">
              What I'm building
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                {' '}right now
              </span>
            </h2>
            <p className="text-[#9AA4B2] text-lg max-w-xl mt-3 leading-relaxed">
              Active projects in development. Each one solving a real problem —
              follow the progress on GitHub.
            </p>
          </div>

          {/* Live count badge */}
          <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B35]" />
            </span>
            <span className="text-sm text-[#FF6B35] font-['JetBrains_Mono']">
              {currentProjects.length} in progress
            </span>
          </div>
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col bg-gradient-to-b from-[#151A20] to-[#11151A] rounded-2xl overflow-hidden border border-[#242A32] hover:border-[#FF6B35]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,107,53,0.08)] hover:-translate-y-2"
            >
              {/* Visual header */}
              <div className={`relative h-52 bg-gradient-to-br ${project.color} overflow-hidden`}>
                {/* Pattern */}
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
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                    {project.image}
                  </span>
                </div>

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B0D10]/70 backdrop-blur-sm border border-[#FF6B35]/30 rounded-full text-xs text-[#FF6B35] font-['JetBrains_Mono']">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF6B35]" />
                    </span>
                    Building
                  </span>
                  {project.flag && (
                    <span className="text-xl drop-shadow-md">{project.flag}</span>
                  )}
                </div>

                {/* Watermark ID */}
                <div className="absolute bottom-2 right-3 font-['JetBrains_Mono'] text-4xl font-bold text-white/5 select-none">
                  {String(project.id).padStart(2, '0')}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#FF6B35]/50 tracking-[0.2em] uppercase">
                    Project {String(project.id).padStart(2, '0')}
                  </span>
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#F5F7FA] mt-1 mb-2 group-hover:text-[#FF6B35] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[#9AA4B2] text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] text-[#6B7280] bg-[#0B0D10]/50 px-2.5 py-1 rounded-lg border border-[#242A32]/50"
                        >
                          <span className="text-[#FF6B35]/40">▸</span>
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 3 && (
                        <span className="text-[11px] text-[#6B7280] px-2 py-1">
                          +{project.features.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-[#0B0D10] border border-[#242A32] rounded-lg text-[11px] font-['JetBrains_Mono'] text-[#6B7280] group-hover:border-[#FF6B35]/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2.5 py-1 text-[11px] text-[#6B7280]">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[#242A32]/50">
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
                    className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#FF6B35] transition-colors py-1.5 px-3 rounded-lg hover:bg-[#0B0D10]"
                  >
                    <FaExternalLinkAlt /> Preview
                  </a>
                  <Link
                    to={`/projects/${project.id}`}
                    className="ml-auto flex items-center gap-1 text-xs text-[#FF6B35]/60 hover:text-[#FF6B35] transition-colors group/link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Details
                    <FaArrowRight className="text-[10px] group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
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
            className="group inline-flex items-center gap-3 px-8 py-3.5 border border-[#242A32] rounded-xl text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/40 hover:bg-[#FF6B35]/5 transition-all duration-300 text-sm font-medium"
          >
            View All Projects
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CurrentProjects