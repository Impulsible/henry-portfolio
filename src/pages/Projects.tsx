import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaCode,
  FaHammer,
  FaCheckCircle,
  FaSearch,
  FaGithub,
} from 'react-icons/fa'

const Projects = () => {
  const [filter, setFilter] = useState<'all' | 'building' | 'completed'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projects
    .filter((p) => (filter === 'all' ? true : p.status === filter))
    .filter(
      (p) =>
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )

  const counts = {
    all:       projects.length,
    building:  projects.filter((p) => p.status === 'building').length,
    completed: projects.filter((p) => p.status === 'completed').length,
  }

  const filterOptions = [
    {
      key:   'all'       as const,
      label: 'All Projects',
      icon:  <FaCode />,
      count: counts.all,
    },
    {
      key:   'building'  as const,
      label: 'In Progress',
      icon:  <FaHammer />,
      count: counts.building,
    },
    {
      key:   'completed' as const,
      label: 'Completed',
      icon:  <FaCheckCircle />,
      count: counts.completed,
    },
  ]

  return (
    <div className="min-h-screen bg-[#0B0D10]">
      {/* ===== PAGE HERO ===== */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,107,53,0.1)_0%,_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,184,107,0.05)_0%,_transparent_50%)]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Pre-label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6B35]" />
              </span>
              <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] uppercase tracking-[0.2em]">
                Portfolio
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <h1 className="font-['Space_Grotesk'] text-5xl md:text-6xl lg:text-7xl font-bold text-[#F5F7FA] leading-tight">
                  My
                  <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                    {' '}Projects
                  </span>
                </h1>
                <p className="text-[#9AA4B2] text-lg max-w-xl mt-4 leading-relaxed">
                  A complete collection of my work — from full-stack web applications to 
                  AI-powered tools, each built to solve real problems.
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 lg:gap-8 flex-shrink-0">
                {[
                  { label: 'Total',     value: counts.all,       color: 'text-[#F5F7FA]' },
                  { label: 'Building',  value: counts.building,  color: 'text-[#FF6B35]' },
                  { label: 'Completed', value: counts.completed, color: 'text-green-400' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className={`font-['Space_Grotesk'] text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FILTERS & SEARCH ===== */}
      <section className="sticky top-16 md:top-20 z-30 bg-[#0B0D10]/90 backdrop-blur-xl border-b border-[#242A32]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Filter tabs */}
            <div className="flex items-center gap-2 p-1 bg-[#11151A] rounded-xl border border-[#242A32]/50 flex-shrink-0">
              {filterOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setFilter(option.key)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filter === option.key
                      ? 'text-[#0B0D10]'
                      : 'text-[#9AA4B2] hover:text-[#F5F7FA]'
                  }`}
                >
                  {filter === option.key && (
                    <motion.div
                      layoutId="filter-pill"
                      className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{option.icon}</span>
                  <span className="relative z-10 hidden sm:inline">{option.label}</span>
                  <span
                    className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-md font-['JetBrains_Mono'] ${
                      filter === option.key
                        ? 'bg-[#0B0D10]/20 text-[#0B0D10]'
                        : 'bg-[#242A32] text-[#6B7280]'
                    }`}
                  >
                    {option.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm" />
              <input
                type="text"
                placeholder="Search by name, description, or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#11151A] border border-[#242A32]/50 rounded-xl text-sm text-[#F5F7FA] placeholder-[#6B7280] focus:outline-none focus:border-[#FF6B35]/50 focus:bg-[#151A20] transition-all duration-300 font-['JetBrains_Mono']"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#FF6B35] transition-colors text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* GitHub link */}
            <a
              href="https://github.com/IMPULSIBLE"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#11151A] border border-[#242A32]/50 rounded-xl text-sm text-[#9AA4B2] hover:text-[#FF6B35] hover:border-[#FF6B35]/30 transition-all duration-300 flex-shrink-0"
            >
              <FaGithub />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS GRID ===== */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={`${filter}-${searchQuery}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Result count */}
                <div className="flex items-center justify-between mb-8">
                  <p className="text-sm text-[#6B7280] font-['JetBrains_Mono']">
                    Showing{' '}
                    <span className="text-[#FF6B35]">{filteredProjects.length}</span>{' '}
                    {filteredProjects.length === 1 ? 'project' : 'projects'}
                    {searchQuery && (
                      <span> for "<span className="text-[#F5F7FA]">{searchQuery}</span>"</span>
                    )}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProjects.map((project, index) => (
                    <Link
                      to={`/projects/${project.id}`}
                      key={project.id}
                      className="block"
                    >
                      <ProjectCard project={project} index={index} />
                    </Link>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="text-center py-24"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#F5F7FA] mb-2">
                  No projects found
                </h3>
                <p className="text-[#9AA4B2] mb-6">
                  Try adjusting your search or filter.
                </p>
                <button
                  onClick={() => { setFilter('all'); setSearchQuery('') }}
                  className="px-6 py-2.5 bg-[#FF6B35] text-[#0B0D10] font-semibold rounded-xl hover:bg-[#FFB86B] transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default Projects