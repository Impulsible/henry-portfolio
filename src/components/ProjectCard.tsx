import { motion } from 'framer-motion'
import type { Project } from '../data/projects'
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa'

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-gradient-to-b from-[#151A20] to-[#11151A] rounded-2xl overflow-hidden border border-[#242A32] hover:border-[#FF6B35]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,107,53,0.08)] hover:-translate-y-2 flex flex-col h-full"
    >
      {/* ── Project Visual Header ── */}
      <div className={`relative h-52 bg-gradient-to-br ${project.color} overflow-hidden flex-shrink-0`}>
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Project icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
            {project.image}
          </span>
        </div>

        {/* Top badges row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {/* Status badge */}
          {project.status === 'building' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B0D10]/70 backdrop-blur-sm border border-[#FF6B35]/30 rounded-full text-xs text-[#FF6B35] font-['JetBrains_Mono']">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF6B35]" />
              </span>
              Building
            </span>
          )}
          {project.status === 'completed' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B0D10]/70 backdrop-blur-sm border border-green-500/30 rounded-full text-xs text-green-400 font-['JetBrains_Mono']">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Completed
            </span>
          )}

          {/* Flag */}
          {project.flag && (
            <span className="text-xl drop-shadow-md">{project.flag}</span>
          )}
        </div>

        {/* Bottom – hover reveal arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="w-9 h-9 rounded-xl bg-[#FF6B35] flex items-center justify-center shadow-lg">
            <FaExternalLinkAlt className="text-[#0B0D10] text-xs" />
          </div>
        </div>

        {/* Project ID watermark */}
        <div className="absolute bottom-3 left-4 font-['JetBrains_Mono'] text-5xl font-bold text-white/5 select-none leading-none">
          {String(project.id).padStart(2, '0')}
        </div>
      </div>

      {/* ── Project Content ── */}
      <div className="p-6 flex flex-col flex-1">
        {/* Number + Title */}
        <div className="mb-3">
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#FF6B35]/60 tracking-[0.2em] uppercase">
            Project {String(project.id).padStart(2, '0')}
          </span>
          <h3 className="font-['Space_Grotesk'] text-xl font-bold mt-1 text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[#9AA4B2] text-sm leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Features preview */}
        {project.features && project.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.features.slice(0, 2).map((feature, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] text-[#6B7280] bg-[#0B0D10]/50 px-2.5 py-1 rounded-lg border border-[#242A32]/50"
              >
                <span className="text-[#FF6B35]/50">▸</span>
                {feature}
              </span>
            ))}
            {project.features.length > 2 && (
              <span className="text-[11px] text-[#6B7280] px-2.5 py-1">
                +{project.features.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="mt-4 pt-4 border-t border-[#242A32]/50">
          <div className="flex items-center justify-between">
            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#0B0D10] border border-[#242A32] rounded-lg text-[11px] font-['JetBrains_Mono'] text-[#6B7280] group-hover:border-[#FF6B35]/20 transition-colors"
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

            {/* Arrow CTA */}
            <span className="flex items-center gap-1 text-[11px] text-[#FF6B35] font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap ml-2">
              View <FaArrowRight className="text-[10px]" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard