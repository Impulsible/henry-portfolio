import { useParams, Link, useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
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

// Helper CSS injection to hide scrollbars globally AND lock horizontal scrolling
const scrollbarHideStyle = `
  html, body, #root {
    overflow-x: hidden !important;
    max-width: 100vw !important;
  }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`

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
        className={`bg-gradient-to-br ${color} flex flex-col items-center justify-center gap-4 w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px] ${className}`}
      >
        <div className="w-full max-w-lg bg-[#0B0D10]/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 mx-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0B0D10]/80 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5F56]/60" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFBD2E]/60" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27C93F]/60" />
            </div>
            <div className="flex-1 mx-3 px-3 py-1 bg-[#151A20]/80 rounded-md text-[8px] sm:text-[10px] text-[#6B7280] font-['JetBrains_Mono'] truncate">
              screenshot-coming-soon.dev
            </div>
          </div>
          <div className="p-8 text-center">
            <div className="text-3xl sm:text-5xl mb-2 sm:mb-3 opacity-80">{emoji}</div>
            <p className="text-white/50 text-[10px] sm:text-xs font-['JetBrains_Mono']">
              Screenshot {index !== undefined ? `#${index + 1}` : ''} · Coming soon
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`w-full h-full bg-[#0D1117] flex items-center justify-center overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        onError={() => setErrored(true)}
      />
    </div>
  )
}

// ── Lightbox Component (with Touch/Swipe support) ──
const Lightbox = ({
  screenshots,
  activeIndex,
  onClose,
  onPrev,
  onNext,
  projectTitle,
}: {
  screenshots: string[]
  activeIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  projectTitle: string
  projectColor: string
  projectImage: string
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && activeIndex < screenshots.length - 1) {
      onNext()
    }
    if (isRightSwipe && activeIndex > 0) {
      onPrev()
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-[#0B0D10]/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 touch-none select-none"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#151A20] border border-[#242A32] flex items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/30 transition-all z-10 active:scale-95"
      >
        <FaTimes className="text-base" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#151A20] border border-[#242A32] rounded-full text-xs text-[#9AA4B2] font-['JetBrains_Mono']">
        {activeIndex + 1} / {screenshots.length}
      </div>

      {/* Prev Button (Hidden on Mobile, rely on swipes) */}
      {activeIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-[#151A20] border border-[#242A32] items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/30 transition-all z-10"
        >
          <FaChevronLeft className="text-sm" />
        </button>
      )}

      {/* Image Container */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="max-w-7xl w-full max-h-[70vh] sm:max-h-[85vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-[#0D1117]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={screenshots[activeIndex]}
          alt={`${projectTitle} screenshot ${activeIndex + 1}`}
          className="w-full h-full object-contain max-h-[70vh] sm:max-h-[85vh]"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
      </motion.div>

      {/* Next Button (Hidden on Mobile, rely on swipes) */}
      {activeIndex < screenshots.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-[#151A20] border border-[#242A32] items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/30 transition-all z-10"
        >
          <FaChevronRight className="text-sm" />
        </button>
      )}

      {/* Bottom hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] text-[#6B7280] font-['JetBrains_Mono'] whitespace-nowrap">
        <span className="sm:inline hidden">← → Navigate</span>
        <span className="sm:hidden">Swipe to navigate</span>
        <span className="w-1 h-1 rounded-full bg-[#242A32]" />
        <span>ESC to close</span>
      </div>
    </motion.div>
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

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft' && activeScreenshot > 0) {
        setActiveScreenshot((prev) => prev - 1)
      }
      if (e.key === 'ArrowRight' && activeScreenshot < screenshots.length - 1) {
        setActiveScreenshot((prev) => prev + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, activeScreenshot, screenshots.length])

  // Modern Native Share API on Mobile
  const handleShare = async () => {
    if (navigator.share && project) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        })
      } catch (error) {
        console.warn('Native share failed or dismissed. Copying instead:', error)
        handleCopyLink()
      }
    } else {
      handleCopyLink()
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center pt-20 px-4 w-full max-w-full overflow-x-hidden">
        <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyle }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md w-full"
        >
          <div className="w-20 h-20 rounded-2xl bg-[#151A20] border border-[#242A32] flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="text-3xl text-[#FF6B35]/40" />
          </div>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-bold text-[#F5F7FA] mb-3">
            Project Not Found
          </h2>
          <p className="text-sm sm:text-base text-[#9AA4B2] mb-8 leading-relaxed">
            The project you're looking for doesn't exist or may have been moved.
          </p>
          <Link
            to="/projects"
            className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-[#0B0D10] font-semibold rounded-xl text-sm sm:text-base hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all inline-flex items-center gap-2"
          >
            <FaArrowLeft className="text-xs" /> Back to Projects
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyle }} />

      {/* ── Lightbox ── */}
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
        className="min-h-screen bg-[#0B0D10] w-full max-w-full overflow-x-hidden"
      >
        {/* ===== FULL-WIDTH SCREENSHOT HERO ===== */}
        <div className="relative w-full bg-[#0A0C0F] pt-14 sm:pt-20 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-b ${project.color} opacity-20 pointer-events-none`}
          />

          {/* Top navigation actions */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-3 relative z-10 w-full min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 w-full min-w-0">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#151A20]/80 backdrop-blur-sm border border-[#242A32] rounded-xl text-xs sm:text-sm text-[#9AA4B2] hover:text-[#F5F7FA] hover:border-[#FF6B35]/40 transition-all active:scale-95"
              >
                <FaArrowLeft className="text-[10px] sm:text-xs" />
                <span>Back</span>
              </button>

              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#151A20]/80 backdrop-blur-sm border border-[#242A32] rounded-xl text-xs sm:text-sm text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/30 transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <FaCheckCircle className="text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaShareAlt className="text-xs" />
                      <span>Share</span>
                    </>
                  )}
                </button>
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-[#0B0D10] font-semibold rounded-xl text-xs sm:text-sm hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all active:scale-95 whitespace-nowrap"
                  >
                    <FaExternalLinkAlt className="text-[9px] sm:text-xs" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── Main Screenshot Display ── */}
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 pb-0 w-full min-w-0">
            <div className="rounded-t-xl sm:rounded-t-2xl overflow-hidden border border-b-0 border-[#242A32]/70 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] w-full min-w-0">
              {/* Browser chrome mockup header */}
              <div className="flex items-center gap-3 px-3 sm:px-5 py-3 bg-[#11151A] border-b border-[#242A32]/50 w-full min-w-0">
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>

                {/* Tabs - horizontally scrollable with scrollbar hidden on mobile */}
                <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar flex-1 min-w-0">
                  {screenshots.length > 0 ? (
                    screenshots.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveScreenshot(i)}
                        className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs transition-all whitespace-nowrap ${
                          activeScreenshot === i
                            ? 'bg-[#1E2530] text-[#F5F7FA] border border-[#242A32]'
                            : 'text-[#6B7280] hover:text-[#9AA4B2] hover:bg-[#151A20]/50'
                        }`}
                      >
                        <span>{project.image}</span>
                        <span className="font-['JetBrains_Mono']">
                          {i === 0
                            ? 'Overview'
                            : i === 1
                            ? 'Dashboard'
                            : `View ${i + 1}`}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E2530] rounded-lg border border-[#242A32]">
                      <span>{project.image}</span>
                      <span className="text-[10px] sm:text-xs text-[#9AA4B2] font-['JetBrains_Mono']">
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Expanded Fullscreen trigger */}
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

              {/* Screenshot Display wrapper */}
              <div
                className="relative bg-[#0D1117] overflow-hidden w-full"
                style={{ minHeight: '220px', height: '40vh', maxHeight: '550px' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreenshot}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <ScreenshotImage
                      src={
                        screenshots[activeScreenshot] ??
                        `/src/assets/projects/screenshots/${project.id}-${
                          activeScreenshot + 1
                        }.png`
                      }
                      alt={`${project.title} screenshot ${activeScreenshot + 1}`}
                      color={project.color}
                      emoji={project.image}
                      index={activeScreenshot}
                      className="w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Expand button on image overlay */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-3 right-3 z-10 group flex items-center gap-1.5 px-3 py-2 bg-[#0B0D10]/80 backdrop-blur-md border border-[#242A32] rounded-xl text-xs text-[#F5F7FA] hover:border-[#FF6B35]/40 transition-all shadow-lg active:scale-95"
                  title="View fullscreen"
                >
                  <FaExpand className="text-[#FF6B35] text-xs" />
                  <span>Expand</span>
                </button>

                {/* Screenshot Navigation arrows (Hidden on mobile context) */}
                {screenshots.length > 1 && (
                  <>
                    {activeScreenshot > 0 && (
                      <button
                        onClick={() => setActiveScreenshot((p) => p - 1)}
                        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-[#0B0D10]/80 backdrop-blur-sm border border-[#242A32] items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] transition-all z-10"
                      >
                        <FaChevronLeft className="text-xs" />
                      </button>
                    )}
                    {activeScreenshot < screenshots.length - 1 && (
                      <button
                        onClick={() => setActiveScreenshot((p) => p + 1)}
                        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-[#0B0D10]/80 backdrop-blur-sm border border-[#242A32] items-center justify-center text-[#9AA4B2] hover:text-[#FF6B35] transition-all z-10"
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

        {/* Thumbnail Preview Selector */}
        {screenshots.length > 1 && (
          <div className="bg-[#0A0C0F] border-b border-[#1A1F27] w-full min-w-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 w-full min-w-0">
              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full">
                {screenshots.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveScreenshot(i)}
                    className={`relative flex-shrink-0 w-16 h-10 sm:w-20 sm:h-12 rounded-lg overflow-hidden border-2 transition-all active:scale-95 ${
                      activeScreenshot === i
                        ? 'border-[#FF6B35] shadow-[0_0_12px_rgba(255,107,53,0.3)]'
                        : 'border-[#242A32] opacity-50 hover:opacity-80'
                    }`}
                  >
                    <ScreenshotImage
                      src={src}
                      alt={`Thumbnail ${i + 1}`}
                      color={project.color}
                      emoji={project.image}
                      index={i}
                      className="w-full h-full"
                    />
                  </button>
                ))}
                <span className="text-[10px] text-[#6B7280] font-['JetBrains_Mono'] ml-2 flex-shrink-0">
                  {activeScreenshot + 1}/{screenshots.length}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ===== MAIN CONTENT ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 pb-20 sm:pb-24 w-full min-w-0">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-10 w-full min-w-0">
            {/* ── LEFT Side (8 columns) ── */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0 w-full">
              {/* Project Title & Status tags */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full min-w-0"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3 min-w-0">
                  <span className="font-['JetBrains_Mono'] text-[10px] sm:text-[11px] text-[#FF6B35]/60 tracking-[0.15em] uppercase">
                    Project {String(project.id).padStart(2, '0')}
                  </span>
                  {project.flag && (
                    <span className="text-sm sm:text-base">{project.flag}</span>
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

                <h1 className="font-['Space_Grotesk'] text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F5F7FA] leading-tight break-words min-w-0">
                  {project.title}
                </h1>

                {/* Info Pills */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 min-w-0">
                  {project.year && (
                    <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <FaCalendarAlt className="text-[#FF6B35]/50 text-xs" />
                      {project.year}
                    </span>
                  )}
                  {project.type && (
                    <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <FaTag className="text-[#FF6B35]/50 text-xs" />
                      {project.type}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                    <FaCode className="text-[#FF6B35]/50 text-xs" />
                    {project.tech.length} technologies
                  </span>
                  {screenshots.length > 0 && (
                    <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <FaEye className="text-[#FF6B35]/50 text-xs" />
                      {screenshots.length} screenshot{screenshots.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Overview Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#151A20] rounded-2xl border border-[#242A32] p-5 sm:p-8 w-full min-w-0 overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-3 mb-5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] flex-shrink-0">
                    <FaLightbulb className="text-base" />
                  </div>
                  <h2 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-[#F5F7FA] min-w-0">
                    Overview
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-[#9AA4B2] leading-relaxed break-words min-w-0">
                  {project.description}
                </p>
                {project.longDescription && (
                  <p className="text-sm sm:text-base text-[#9AA4B2] leading-relaxed mt-4 break-words min-w-0">
                    {project.longDescription}
                  </p>
                )}
              </motion.div>

              {/* Features Card */}
              {project.features && project.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-[#151A20] rounded-2xl border border-[#242A32] p-5 sm:p-8 w-full min-w-0 overflow-hidden"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-6 min-w-0 w-full">
                    <div className="w-9 h-9 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] flex-shrink-0">
                      <FaLayerGroup className="text-base" />
                    </div>
                    {/* The flex-1 min-w-0 ensures the title shrinks and pushes the count over, rather than overflowing */}
                    <h2 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-[#F5F7FA] flex-1 min-w-0 truncate">
                      Key Features
                    </h2>
                    <span className="text-xs text-[#6B7280] font-['JetBrains_Mono'] flex-shrink-0">
                      {project.features.length} features
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full min-w-0">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="group flex items-start gap-3 p-4 bg-[#0B0D10]/50 rounded-xl border border-[#242A32]/50 hover:border-[#FF6B35]/20 transition-all min-w-0 w-full"
                      >
                        <div className="w-6 h-6 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FaCheckCircle className="text-[#FF6B35] text-[9px]" />
                        </div>
                        <span className="text-xs sm:text-sm text-[#9AA4B2] leading-relaxed break-words min-w-0 flex-1">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Challenges Card */}
              {project.challenges && project.challenges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-[#151A20] rounded-2xl border border-[#242A32] p-5 sm:p-8 w-full min-w-0 overflow-hidden"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-6 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                      <FaExclamationTriangle className="text-base" />
                    </div>
                    <h2 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-[#F5F7FA] min-w-0">
                      Challenges Solved
                    </h2>
                  </div>
                  <div className="space-y-3 w-full min-w-0">
                    {project.challenges.map((challenge, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-orange-500/5 rounded-xl border border-orange-500/10 min-w-0 w-full"
                      >
                        <span className="text-orange-400/60 font-['JetBrains_Mono'] text-xs mt-0.5 flex-shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xs sm:text-sm text-[#9AA4B2] leading-relaxed break-words min-w-0 flex-1">
                          {challenge}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Primary Call-to-Actions (Optimized Mobile Sizes) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 w-full min-w-0"
              >
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-[#0B0D10] font-semibold rounded-xl text-sm sm:text-base hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] transition-all duration-300 inline-flex items-center justify-center gap-2.5 active:scale-95 whitespace-nowrap"
                  >
                    <span>Live Demo</span>
                    <FaExternalLinkAlt className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== '#' && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 border-2 border-[#242A32] rounded-xl hover:border-[#FF6B35]/50 transition-all text-[#F5F7FA] text-sm sm:text-base inline-flex items-center justify-center gap-2.5 hover:bg-[#FF6B35]/5 active:scale-95 whitespace-nowrap"
                  >
                    <FaGithub className="text-lg" />
                    <span>View Source</span>
                  </a>
                )}
              </motion.div>
            </div>

            {/* ── RIGHT Side: Sidebar (4 columns) ── */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 space-y-5 min-w-0 w-full"
            >
              {/* Tech Stack */}
              <div className="bg-[#151A20] rounded-2xl border border-[#242A32] p-5 w-full min-w-0">
                <div className="flex items-center gap-2.5 mb-5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] flex-shrink-0">
                    <FaCode className="text-xs" />
                  </div>
                  <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#F5F7FA] min-w-0">
                    Tech Stack
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 min-w-0">
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

              {/* Quick Specs Table */}
              <div className="bg-[#151A20] rounded-2xl border border-[#242A32] p-5 w-full min-w-0">
                <h3 className="font-['Space_Grotesk'] font-bold text-[#F5F7FA] mb-5 text-sm">
                  Project Details
                </h3>
                <div className="space-y-3 w-full min-w-0">
                  {[
                    {
                      label: 'Status',
                      value:
                        project.status === 'building' ? (
                          <span className="flex items-center justify-end gap-1.5 text-[#FF6B35] text-xs">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF6B35]" />
                            </span>
                            In Progress
                          </span>
                        ) : (
                          <span className="flex items-center justify-end gap-1.5 text-green-400 text-xs">
                            <FaCheckCircle className="text-[10px]" />
                            Completed
                          </span>
                        ),
                    },
                    ...(project.year ? [{ label: 'Year', value: project.year }] : []),
                    ...(project.type ? [{ label: 'Type', value: project.type }] : []),
                    {
                      label: 'Project ID',
                      value: `#${String(project.id).padStart(2, '0')}`,
                    },
                    {
                      label: 'Technologies',
                      value: `${project.tech.length} used`,
                    },
                  ].map((item, i) => (
                    <div key={i} className="min-w-0">
                      {i > 0 && <div className="h-px bg-[#242A32]/50 my-3" />}
                      <div className="flex items-center justify-between gap-4 min-w-0">
                        <span className="text-[10px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-wider flex-shrink-0">
                          {item.label}
                        </span>
                        <span className="text-xs text-[#9AA4B2] font-['JetBrains_Mono'] text-right truncate flex-1 min-w-0">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dev notice banner */}
              {project.status === 'building' && (
                <div className="bg-[#FF6B35]/5 rounded-2xl border border-[#FF6B35]/15 p-5 w-full min-w-0">
                  <div className="flex items-center gap-2 mb-2 min-w-0">
                    <FaClock className="text-[#FF6B35] text-sm flex-shrink-0" />
                    <span className="text-sm font-['Space_Grotesk'] font-bold text-[#FF6B35] truncate min-w-0">
                      In Development
                    </span>
                  </div>
                  <p className="text-xs text-[#9AA4B2] leading-relaxed break-words min-w-0">
                    Actively being built. Features and screenshots will be updated as development progresses.
                  </p>
                </div>
              )}

              {/* Bottom Native Share Box */}
              <div className="bg-[#151A20] rounded-2xl border border-[#242A32] p-5 w-full min-w-0 overflow-hidden">
                <h3 className="font-['Space_Grotesk'] font-bold text-[#F5F7FA] text-sm mb-4">
                  Share Project
                </h3>
                <button
                  onClick={handleShare}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-[#0B0D10]/60 border border-[#242A32] rounded-xl hover:border-[#FF6B35]/30 transition-all group active:scale-95 min-w-0"
                >
                  {copied ? (
                    <FaCheckCircle className="text-green-400 text-sm flex-shrink-0" />
                  ) : (
                    <FaShareAlt className="text-[#6B7280] group-hover:text-[#FF6B35] text-sm flex-shrink-0 transition-colors" />
                  )}
                  <span className="text-xs text-[#9AA4B2] font-['JetBrains_Mono'] truncate flex-1 text-left min-w-0">
                    {copied ? 'Link copied!' : window.location.href}
                  </span>
                  <FaCopy className="text-[#6B7280] group-hover:text-[#FF6B35] flex-shrink-0 transition-colors text-xs" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* ===== PROJECT NAVIGATION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 pt-10 border-t border-[#242A32]/50 w-full min-w-0"
          >
            <p className="text-[11px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-[0.2em] text-center mb-8">
              Continue Exploring
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
              {/* Prev */}
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.id}`}
                  className="group flex items-center gap-4 p-5 bg-[#151A20] rounded-2xl border border-[#242A32] hover:border-[#FF6B35]/40 transition-all duration-300 active:scale-98 min-w-0 w-full"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0B0D10] border border-[#242A32] flex items-center justify-center text-[#9AA4B2] group-hover:text-[#FF6B35] transition-all flex-shrink-0">
                    <FaArrowLeft className="text-sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-wider mb-0.5">
                      ← Previous
                    </p>
                    <p className="text-base font-['Space_Grotesk'] font-bold text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors truncate min-w-0 w-full">
                      {prevProject.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="hidden md:block" />
              )}

              {/* Next */}
              {nextProject ? (
                <Link
                  to={`/projects/${nextProject.id}`}
                  className="group flex items-center justify-between gap-4 p-5 bg-[#151A20] rounded-2xl border border-[#242A32] hover:border-[#FF6B35]/40 transition-all duration-300 text-right active:scale-98 min-w-0 w-full"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-wider mb-0.5">
                      Next →
                    </p>
                    <p className="text-base font-['Space_Grotesk'] font-bold text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors truncate min-w-0 w-full">
                      {nextProject.title}
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-[#0B0D10] border border-[#242A32] flex items-center justify-center text-[#9AA4B2] group-hover:text-[#FF6B35] transition-all flex-shrink-0">
                    <FaArrowRight className="text-sm" />
                  </div>
                </Link>
              ) : (
                <div className="hidden md:block" />
              )}
            </div>

            <div className="text-center mt-8">
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