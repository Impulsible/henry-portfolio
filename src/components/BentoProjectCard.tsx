import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa'
import { projects } from '../data/projects'

interface BentoProjectCardProps {
  project: typeof projects[number]
  index: number
}

const BentoProjectCard = ({ project, index }: BentoProjectCardProps) => {
  const [imgFailed, setImgFailed] = useState(false)
  const firstScreenshot = project.screenshots?.[0]
  const showImage = firstScreenshot && !imgFailed

  const statusLabel =
    project.status === 'building'
      ? 'In Progress'
      : project.status === 'completed'
      ? 'Completed'
      : project.status ?? 'In Progress'

  const isCompleted = project.status === 'completed'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Link
        to={`/projects/${project.id}`}
        className="group relative flex flex-col bg-[#0F1318] rounded-3xl border border-[#1E2530] hover:border-[#FF6B35]/60 transition-all duration-500 overflow-hidden hover:shadow-[0_0_80px_rgba(255,107,53,0.12)] h-full"
      >
        {/* ── IMAGE AREA — uniform 16:10 aspect ratio ── */}
        <div
          className={`relative flex-shrink-0 overflow-hidden bg-gradient-to-br ${project.color} aspect-[16/10]`}
        >
          {/* Subtle inner canvas */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B0D10]/40 to-[#0B0D10]/70" />

          {/* Texture behind emoji fallback */}
          {!showImage && (
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          )}

          {showImage ? (
            /* ── SCREENSHOT (full image, no cropping) ── */
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={firstScreenshot}
                alt={`${project.title} screenshot`}
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl transition-transform duration-700 group-hover:scale-[1.03] ring-1 ring-white/5"
                onError={() => setImgFailed(true)}
              />
            </div>
          ) : (
            /* ── EMOJI FALLBACK ── */
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[6rem] drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 select-none">
                {project.image}
              </span>
            </div>
          )}

          {/* Top-left: flag */}
          {project.flag && (
            <div className="absolute top-4 left-4 text-2xl drop-shadow-lg z-10">
              {project.flag}
            </div>
          )}

          {/* Top-right: status pill */}
          <div className="absolute top-4 right-4 z-10">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border shadow-lg ${
                isCompleted
                  ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40'
                  : 'bg-[#FF6B35]/25 text-[#FF6B35] border-[#FF6B35]/40'
              }`}
            >
              {isCompleted ? '✓ ' : '⚡ '}
              {statusLabel}
            </span>
          </div>

          {/* Bottom-left: category chip */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] text-[#C1C7D0] font-['JetBrains_Mono'] border border-white/10 shadow-lg">
              {project.type ?? project.category}
            </span>
          </div>

          {/* Bottom-right: year */}
          {project.year && (
            <div className="absolute bottom-4 right-4 z-10">
              <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] text-[#9AA4B2] font-['JetBrains_Mono'] border border-white/10 shadow-lg">
                {project.year}
              </span>
            </div>
          )}
        </div>

        {/* ── CONTENT AREA ── */}
        <div className="flex flex-col flex-1 p-6 gap-4">
          {/* Title */}
          <h3 className="font-['Space_Grotesk'] font-bold text-xl text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors duration-300 leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-[#9AA4B2] text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-[#151A20] border border-[#242A32] rounded-lg text-[11px] text-[#9AA4B2] font-['JetBrains_Mono'] group-hover:border-[#FF6B35]/20 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2.5 py-1 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-lg text-[11px] text-[#FF6B35] font-['JetBrains_Mono']">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1E2530] mt-1">
            <span className="text-[#FF6B35] text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
              View Case Study
              <FaArrowRight className="text-xs" />
            </span>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaExternalLinkAlt className="text-[#FF6B35] text-xs" />
            </div>
          </div>
        </div>

        {/* Subtle orange glow on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B35]/0 to-transparent group-hover:via-[#FF6B35]/60 transition-all duration-500" />
      </Link>
    </motion.div>
  )
}

export default BentoProjectCard