import { useParams, Link, useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaCode,
  FaClock,
  FaLayerGroup,
  FaLightbulb,
  FaExpand,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaTag,
  FaEye,
  FaShareAlt,
  FaCopy,
} from 'react-icons/fa'

// ── Lightbox Component ──
const Lightbox = ({
  screenshots,
  activeIndex,
  onClose,
  onPrev,
  onNext,
  projectTitle,
  projectColor,
  projectImage,
}: {
  screenshots: string[]
  activeIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  projectTitle: string
  projectColor: string
  projectImage: string
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[9999] bg-[#0B0D10]/95 backdrop-blur-xl flex items-center justify-center p-4"
    onClick={onClose}
  >
    {/* Close */}
    <button
      onClick={onClose}
      className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-[#151A20] border border-[#242A32] flex items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/30 transition-all z-10"
    >
      <FaTimes />
    </button>

    {/* Counter */}
    <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#151A20] border border-[#242A32] rounded-full text-xs text-[#9AA4B2] font-['JetBrains_Mono']">
      {activeIndex + 1} / {screenshots.length}
    </div>

    {/* Prev */}
    {activeIndex > 0 && (
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-[#151A20] border border-[#242A32] flex items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/30 transition-all z-10"
      >
        <FaChevronLeft />
      </button>
    )}

    {/* Image */}
    <motion.div
      key={activeIndex}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="max-w-6xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-[#242A32] shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <ScreenshotImage
        src={screenshots[activeIndex]}
        alt={`${projectTitle} screenshot ${activeIndex + 1}`}
        color={projectColor}
        emoji={projectImage}
        className="w-full h-full object-contain"
      />
    </motion.div>

    {/* Next */}
    {activeIndex < screenshots.length - 1 && (
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-[#151A20] border border-[#242A32] flex items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/30 transition-all z-10"
      >
        <FaChevronRight />
      </button>
    )}
  </motion.div>
)

// ── Smart Screenshot Image Component ──
const ScreenshotImage = ({
  src,
  alt,
  color,
  emoji,
  className = '',
  index,
}: {
  src: string
  alt: string
  color: string
  emoji: string
  className?: string
  index?: number
}) => {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        className={`bg-gradient-to-br ${color} flex flex-col items-center justify-center gap-4 min-h-[220px] ${className}`}
      >
        {/* Fake browser chrome */}
        <div className="w-full max-w-lg bg-[#0B0D10]/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 mx-4">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0B0D10]/80 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/60" />
            </div>
            <div className="flex-1 mx-3 px-3 py-1 bg-[#151A20]/80 rounded-md text-[10px] text-[#6B7280] font-['JetBrains_Mono'] truncate">
              screenshot-coming-soon.dev
            </div>
          </div>
          <div className="p-8 text-center">
            <div className="text-5xl mb-3 opacity-80">{emoji}</div>
            <p className="text-white/50 text-xs font-['JetBrains_Mono']">
              Screenshot {index !== undefined ? `#${index + 1}` : ''} · Coming soon
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover object-top ${className}`}
      onError={() => setErrored(true)}
    />
  )
}

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === Number(id))

  const currentIndex = projects.findIndex((p) => p.id === Number(id))
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  const screenshots = project?.screenshots ?? []
  const [activeScreenshot, setActiveScreenshot] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ── Not Found ──
  if (!project) {
    return (
      <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md px-4"
        >
          <div className="w-24 h-24 rounded-3xl bg-[#151A20] border border-[#242A32] flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="text-4xl text-[#FF6B35]/40" />
          </div>
          <h2 className="font-['Space_Grotesk'] text-4xl font-bold text-[#F5F7FA] mb-3">
            Project Not Found
          </h2>
          <p className="text-[#9AA4B2] mb-8 leading-relaxed">
            The project you're looking for doesn't exist or may have been moved.
          </p>
          <Link
            to="/projects"
            className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-[#0B0D10] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all inline-flex items-center gap-2"
          >
            <FaArrowLeft className="text-sm" /> Back to Projects
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && screenshots.length > 0 && (
          <Lightbox
            screenshots={screenshots}
            activeIndex={activeScreenshot}
            onClose={() => setLightboxOpen(false)}
            onPrev={() => setActiveScreenshot((p) => Math.max(0, p - 1))}
            onNext={() =>
              setActiveScreenshot((p) =>
                Math.min(screenshots.length - 1, p + 1)
              )
            }
            projectTitle={project.title}
            projectColor={project.color}
            projectImage={project.image}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#0B0D10]"
      >
        {/* ===== FULL-WIDTH SCREENSHOT HERO ===== */}
        <div className="relative w-full bg-[#0A0C0F] pt-16 md:pt-20 overflow-hidden">
          {/* Subtle radial glow behind screenshot */}
          <div
            className={`absolute inset-0 bg-gradient-to-b ${project.color} opacity-20 pointer-events-none`}
          />

          {/* Top nav strip */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 relative z-10">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 bg-[#151A20]/80 backdrop-blur-sm border border-[#242A32] rounded-xl text-sm text-[#9AA4B2] hover:text-[#F5F7FA] hover:border-[#FF6B35]/40 transition-all"
              >
                <FaArrowLeft className="text-xs" />
                Back
              </button>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-3 py-2 bg-[#151A20]/80 backdrop-blur-sm border border-[#242A32] rounded-xl text-xs text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/30 transition-all"
                >
                  {copied ? (
                    <>
                      <FaCheckCircle className="text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy />
                      <span className="hidden sm:inline">Share</span>
                    </>
                  )}
                </button>
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-[#0B0D10] font-semibold rounded-xl text-sm hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── Main Screenshot Display ── */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-0">
            {/* Browser chrome wrapper */}
            <div className="rounded-t-2xl overflow-hidden border border-b-0 border-[#242A32]/70 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">
              {/* Browser bar */}
              <div className="flex items-center gap-3 px-5 py-3 bg-[#11151A] border-b border-[#242A32]/50">
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
                  {screenshots.length > 0 ? (
                    screenshots.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveScreenshot(i)}
                        className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all ${
                          activeScreenshot === i
                            ? 'bg-[#1E2530] text-[#F5F7FA] border border-[#242A32]'
                            : 'text-[#6B7280] hover:text-[#9AA4B2] hover:bg-[#151A20]/50'
                        }`}
                      >
                        <span className="text-sm">{project.image}</span>
                        <span className="font-['JetBrains_Mono'] hidden sm:inline">
                          {i === 0 ? 'Overview' : i === 1 ? 'Dashboard' : `View ${i + 1}`}
                        </span>
                        <span className="font-['JetBrains_Mono'] sm:hidden">
                          {i + 1}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E2530] rounded-lg border border-[#242A32]">
                      <span className="text-sm">{project.image}</span>
                      <span className="text-xs text-[#9AA4B2] font-['JetBrains_Mono'] hidden sm:inline">
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Address bar */}
                <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-[#0B0D10]/60 rounded-lg border border-[#242A32]/50 min-w-0 max-w-xs ml-auto">
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-[10px] text-[#4A5568] font-['JetBrains_Mono'] truncate">
                    {project.liveUrl && project.liveUrl !== '#'
                      ? project.liveUrl
                      : `impulsible.dev/projects/${project.id}`}
                  </span>
                </div>

                {/* Expand button */}
                {screenshots.length > 0 && (
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0B0D10]/60 border border-[#242A32]/50 flex items-center justify-center text-[#6B7280] hover:text-[#FF6B35] hover:border-[#FF6B35]/30 transition-all"
                    title="Fullscreen"
                  >
                    <FaExpand className="text-xs" />
                  </button>
                )}
              </div>

              {/* Screenshot area */}
              <div className="relative aspect-[16/9] bg-[#0D1117] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreenshot}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <ScreenshotImage
                      src={
                        screenshots[activeScreenshot] ??
                        `/src/assets/projects/screenshots/${project.id}-${activeScreenshot + 1}.png`
                      }
                      alt={`${project.title} screenshot ${activeScreenshot + 1}`}
                      color={project.color}
                      emoji={project.image}
                      index={activeScreenshot}
                      className="w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Click to expand overlay */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-[#0B0D10]/40 flex items-center justify-center group"
                >
                  <div className="bg-[#151A20]/90 backdrop-blur-sm border border-[#242A32] rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm text-[#F5F7FA] group-hover:border-[#FF6B35]/40 transition-all">
                    <FaExpand className="text-[#FF6B35] text-xs" />
                    Click to expand
                  </div>
                </button>

                {/* Screenshot nav arrows */}
                {screenshots.length > 1 && (
                  <>
                    {activeScreenshot > 0 && (
                      <button
                        onClick={() => setActiveScreenshot((p) => p - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-[#0B0D10]/80 backdrop-blur-sm border border-[#242A32] flex items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/40 transition-all"
                      >
                        <FaChevronLeft className="text-xs" />
                      </button>
                    )}
                    {activeScreenshot < screenshots.length - 1 && (
                      <button
                        onClick={() => setActiveScreenshot((p) => p + 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-[#0B0D10]/80 backdrop-blur-sm border border-[#242A32] flex items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/40 transition-all"
                      >
                        <FaChevronRight className="text-xs" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        {screenshots.length > 1 && (
          <div className="bg-[#0A0C0F] border-b border-[#1A1F27]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
                {screenshots.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveScreenshot(i)}
                    className={`relative flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      activeScreenshot === i
                        ? 'border-[#FF6B35] shadow-[0_0_12px_rgba(255,107,53,0.3)]'
                        : 'border-[#242A32] opacity-50 hover:opacity-80 hover:border-[#3A4150]'
                    }`}
                  >
                    <ScreenshotImage
                      src={src}
                      alt={`Thumbnail ${i + 1}`}
                      color={project.color}
                      emoji={project.image}
                      index={i}
                      className="w-full h-full object-cover object-top"
                    />
                    {activeScreenshot === i && (
                      <div className="absolute inset-0 border-2 border-[#FF6B35] rounded-lg pointer-events-none" />
                    )}
                  </button>
                ))}
                <span className="text-[10px] text-[#6B7280] font-['JetBrains_Mono'] ml-2 flex-shrink-0">
                  {activeScreenshot + 1}/{screenshots.length} screens
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ===== MAIN CONTENT ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 pb-24">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* ── LEFT: Content (8 cols) ── */}
            <div className="lg:col-span-8 space-y-7">
              {/* Project title & meta */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#FF6B35]/60 tracking-[0.2em] uppercase">
                    Project {String(project.id).padStart(2, '0')}
                  </span>
                  {project.flag && (
                    <span className="text-base">{project.flag}</span>
                  )}
                  {project.status === 'building' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full text-[10px] text-[#FF6B35] font-['JetBrains_Mono']">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF6B35]" />
                      </span>
                      In Progress
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] text-green-400 font-['JetBrains_Mono']">
                      <FaCheckCircle className="text-[8px]" />
                      Completed
                    </span>
                  )}
                </div>

                <h1 className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F7FA] leading-tight">
                  {project.title}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  {project.year && (
                    <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <FaCalendarAlt className="text-[#FF6B35]/50" />
                      {project.year}
                    </span>
                  )}
                  {project.type && (
                    <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <FaTag className="text-[#FF6B35]/50" />
                      {project.type}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                    <FaCode className="text-[#FF6B35]/50" />
                    {project.tech.length} technologies
                  </span>
                  {screenshots.length > 0 && (
                    <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <FaEye className="text-[#FF6B35]/50" />
                      {screenshots.length} screenshot{screenshots.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#151A20] rounded-2xl border border-[#242A32] p-7 md:p-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
                    <FaLightbulb />
                  </div>
                  <h2 className="font-['Space_Grotesk'] text-xl font-bold text-[#F5F7FA]">
                    Overview
                  </h2>
                </div>
                <p className="text-[#9AA4B2] leading-relaxed text-base">
                  {project.description}
                </p>
                {project.longDescription && (
                  <p className="text-[#9AA4B2] leading-relaxed text-base mt-4">
                    {project.longDescription}
                  </p>
                )}
              </motion.div>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-[#151A20] rounded-2xl border border-[#242A32] p-7 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
                      <FaLayerGroup />
                    </div>
                    <h2 className="font-['Space_Grotesk'] text-xl font-bold text-[#F5F7FA]">
                      Key Features
                    </h2>
                    <span className="ml-auto text-xs text-[#6B7280] font-['JetBrains_Mono']">
                      {project.features.length} features
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + idx * 0.04 }}
                        className="group flex items-start gap-3 p-4 bg-[#0B0D10]/50 rounded-xl border border-[#242A32]/50 hover:border-[#FF6B35]/20 hover:bg-[#FF6B35]/3 transition-all"
                      >
                        <div className="w-6 h-6 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#FF6B35]/20 transition-colors">
                          <FaCheckCircle className="text-[#FF6B35] text-[9px]" />
                        </div>
                        <span className="text-sm text-[#9AA4B2] group-hover:text-[#C1C7D0] transition-colors leading-relaxed">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-[#151A20] rounded-2xl border border-[#242A32] p-7 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                      <FaExclamationTriangle />
                    </div>
                    <h2 className="font-['Space_Grotesk'] text-xl font-bold text-[#F5F7FA]">
                      Challenges Solved
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {project.challenges.map((challenge, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-orange-500/5 rounded-xl border border-orange-500/10"
                      >
                        <span className="text-orange-400/60 font-['JetBrains_Mono'] text-xs mt-0.5 flex-shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm text-[#9AA4B2] leading-relaxed">
                          {challenge}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex-1 sm:flex-none px-8 py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-[#0B0D10] font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2 relative overflow-hidden"
                  >
                    <span className="relative z-10">Live Demo</span>
                    <FaExternalLinkAlt className="text-xs relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFB86B] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== '#' && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex-1 sm:flex-none px-8 py-3.5 border-2 border-[#242A32] rounded-xl hover:border-[#FF6B35]/50 transition-all duration-300 text-[#F5F7FA] inline-flex items-center justify-center gap-2 hover:bg-[#FF6B35]/5"
                  >
                    <FaGithub />
                    View Source Code
                  </a>
                )}
                <button
                  onClick={() => {
                    setActiveScreenshot(0)
                    setLightboxOpen(true)
                  }}
                  className="px-8 py-3.5 border border-[#242A32] rounded-xl text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/30 transition-all inline-flex items-center gap-2"
                >
                  <FaEye />
                  Screenshots
                </button>
              </motion.div>
            </div>

            {/* ── RIGHT: Sidebar (4 cols) ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 space-y-5"
            >
              {/* Tech Stack */}
              <div className="bg-[#151A20] rounded-2xl border border-[#242A32] p-5">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
                    <FaCode className="text-xs" />
                  </div>
                  <h3 className="font-['Space_Grotesk'] font-bold text-[#F5F7FA]">
                    Tech Stack
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-[#0B0D10] border border-[#242A32] rounded-xl text-xs font-['JetBrains_Mono'] text-[#9AA4B2] hover:border-[#FF6B35]/30 hover:text-[#FF6B35] transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Meta */}
              <div className="bg-[#151A20] rounded-2xl border border-[#242A32] p-5">
                <h3 className="font-['Space_Grotesk'] font-bold text-[#F5F7FA] mb-5 text-sm">
                  Project Details
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: 'Status',
                      value:
                        project.status === 'building' ? (
                          <span className="flex items-center gap-1.5 text-[#FF6B35]">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF6B35]" />
                            </span>
                            In Progress
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-green-400">
                            <FaCheckCircle className="text-[10px]" />
                            Completed
                          </span>
                        ),
                    },
                    ...(project.year
                      ? [{ label: 'Year', value: project.year }]
                      : []),
                    ...(project.type
                      ? [{ label: 'Type', value: project.type }]
                      : []),
                    { label: 'Project ID', value: `#${String(project.id).padStart(2, '0')}` },
                    { label: 'Technologies', value: `${project.tech.length} used` },
                    ...(project.features
                      ? [{ label: 'Features', value: `${project.features.length} listed` }]
                      : []),
                    ...(screenshots.length > 0
                      ? [{ label: 'Screenshots', value: `${screenshots.length} available` }]
                      : []),
                  ].map((item, i) => (
                    <div key={i}>
                      {i > 0 && <div className="h-px bg-[#242A32]/50 my-3" />}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-wider">
                          {item.label}
                        </span>
                        <span className="text-xs text-[#9AA4B2] font-['JetBrains_Mono']">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Development notice */}
              {project.status === 'building' && (
                <div className="bg-[#FF6B35]/5 rounded-2xl border border-[#FF6B35]/15 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <FaClock className="text-[#FF6B35] text-sm" />
                    <span className="text-sm font-['Space_Grotesk'] font-bold text-[#FF6B35]">
                      In Development
                    </span>
                  </div>
                  <p className="text-xs text-[#9AA4B2] leading-relaxed">
                    Actively being built. Features and screenshots will be
                    updated as development progresses. Follow on GitHub for
                    updates.
                  </p>
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-xs text-[#FF6B35] hover:text-[#FFB86B] transition-colors"
                    >
                      <FaGithub />
                      Follow on GitHub
                      <FaArrowRight className="text-[10px]" />
                    </a>
                  )}
                </div>
              )}

              {/* Share */}
              <div className="bg-[#151A20] rounded-2xl border border-[#242A32] p-5">
                <h3 className="font-['Space_Grotesk'] font-bold text-[#F5F7FA] text-sm mb-4">
                  Share Project
                </h3>
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-[#0B0D10]/60 border border-[#242A32] rounded-xl hover:border-[#FF6B35]/30 transition-all group"
                >
                  {copied ? (
                    <FaCheckCircle className="text-green-400 flex-shrink-0" />
                  ) : (
                    <FaShareAlt className="text-[#6B7280] group-hover:text-[#FF6B35] flex-shrink-0 transition-colors" />
                  )}
                  <span className="text-xs text-[#9AA4B2] font-['JetBrains_Mono'] truncate flex-1 text-left">
                    {copied ? 'Link copied to clipboard!' : window.location.href}
                  </span>
                  <FaCopy className="text-[#6B7280] group-hover:text-[#FF6B35] flex-shrink-0 transition-colors text-xs" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* ===== PROJECT NAVIGATION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 pt-10 border-t border-[#242A32]/50"
          >
            <p className="text-xs text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-[0.2em] text-center mb-7">
              Continue Exploring
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Prev */}
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.id}`}
                  className="group flex items-center gap-4 p-5 bg-[#151A20] rounded-2xl border border-[#242A32] hover:border-[#FF6B35]/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0B0D10] border border-[#242A32] flex items-center justify-center text-[#9AA4B2] group-hover:text-[#FF6B35] group-hover:border-[#FF6B35]/30 transition-all flex-shrink-0">
                    <FaArrowLeft className="text-sm" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-wider mb-0.5">
                      ← Previous
                    </p>
                    <p className="text-base font-['Space_Grotesk'] font-bold text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors truncate">
                      {prevProject.title}
                    </p>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      {prevProject.type ?? prevProject.category}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {/* Next */}
              {nextProject ? (
                <Link
                  to={`/projects/${nextProject.id}`}
                  className="group flex items-center justify-end gap-4 p-5 bg-[#151A20] rounded-2xl border border-[#242A32] hover:border-[#FF6B35]/40 transition-all duration-300 hover:-translate-y-1 text-right"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-wider mb-0.5">
                      Next →
                    </p>
                    <p className="text-base font-['Space_Grotesk'] font-bold text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors truncate">
                      {nextProject.title}
                    </p>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      {nextProject.type ?? nextProject.category}
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-[#0B0D10] border border-[#242A32] flex items-center justify-center text-[#9AA4B2] group-hover:text-[#FF6B35] group-hover:border-[#FF6B35]/30 transition-all flex-shrink-0">
                    <FaArrowRight className="text-sm" />
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>

            <div className="text-center mt-6">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#FF6B35] transition-colors font-['JetBrains_Mono'] group"
              >
                <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
                View all projects
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}

export default ProjectDetail