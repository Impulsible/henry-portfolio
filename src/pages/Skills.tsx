import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillCategories, coreCompetencies, softSkills } from '../data/skills'
import type { SkillCategory } from '../data/skills'
import {
  FaCode,
  FaArrowRight,
  FaDownload,
  FaBolt,
  FaCheckCircle,
  FaStar,
  FaSearch,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

// Animated progress bar
const SkillBar = ({
  name,
  level,
  years,
  delay = 0,
}: {
  name: string
  level: number
  years?: number
  delay?: number
}) => {
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), delay)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  const getLevelLabel = (lvl: number) => {
    if (lvl >= 90) return { label: 'Expert',    color: 'text-[#FF6B35]' }
    if (lvl >= 75) return { label: 'Advanced',  color: 'text-blue-400' }
    if (lvl >= 60) return { label: 'Proficient',color: 'text-purple-400' }
    return               { label: 'Learning',   color: 'text-green-400' }
  }

  const { label, color } = getLevelLabel(level)

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#C1C7D0] group-hover:text-[#F5F7FA] transition-colors">
            {name}
          </span>
          {years && (
            <span className="text-[10px] text-[#6B7280] font-['JetBrains_Mono']">
              {years}yr{years > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-['JetBrains_Mono'] font-medium ${color}`}>
            {label}
          </span>
          <span className="text-[10px] text-[#6B7280] font-['JetBrains_Mono']">
            {level}%
          </span>
        </div>
      </div>
      <div className="h-1.5 bg-[#0B0D10] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: animated ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-60" />
        </motion.div>
      </div>
    </div>
  )
}

// Animated counter
const Counter = ({
  target,
  suffix = '',
}: {
  target: number
  suffix?: string
}) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          setDone(true)
          let start = 0
          const inc = target / (1800 / 16)
          const t = setInterval(() => {
            start += inc
            if (start >= target) {
              setCount(target)
              clearInterval(t)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, done])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const Skills = () => {
  const [activeCategory, setActiveCategory] =
    useState<SkillCategory>(skillCategories[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [view, setView] = useState<'grid' | 'bars'>('bars')

  // Flatten all skills for search
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, category: cat.name, catIcon: cat.icon }))
  )

  const searchResults = searchQuery
    ? allSkills.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const totalSkills = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  )

  return (
    <div className="min-h-screen bg-[#0B0D10]">
      {/* ===== HERO ===== */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,107,53,0.1)_0%,_transparent_50%)]" />
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
                Tech Arsenal
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <h1 className="font-['Space_Grotesk'] text-5xl md:text-6xl lg:text-7xl font-bold text-[#F5F7FA] leading-tight">
                  Skills &
                  <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                    {' '}Technologies
                  </span>
                </h1>
                <p className="text-[#9AA4B2] text-lg max-w-2xl mt-4 leading-relaxed">
                  A curated collection of technologies, tools, and frameworks I
                  use to build modern, scalable, and impactful digital
                  solutions.
                </p>
              </div>

              {/* Quick stats */}
              <div className="flex items-center gap-6 flex-shrink-0">
                {[
                  { value: totalSkills, suffix: '+', label: 'Skills' },
                  {
                    value: skillCategories.length,
                    suffix: '',
                    label: 'Categories',
                  },
                  { value: 4, suffix: '+', label: 'Years' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-['Space_Grotesk'] text-3xl font-bold text-[#FF6B35]">
                      <Counter target={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-wider mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SEARCH BAR ===== */}
      <section className="sticky top-16 md:top-20 z-30 bg-[#0B0D10]/90 backdrop-blur-xl border-b border-[#242A32]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] text-xs" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#11151A] border border-[#242A32]/50 rounded-xl text-sm text-[#F5F7FA] placeholder-[#6B7280] focus:outline-none focus:border-[#FF6B35]/50 transition-all font-['JetBrains_Mono']"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#FF6B35] text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 p-1 bg-[#11151A] rounded-xl border border-[#242A32]/50">
              {(['bars', 'grid'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`relative px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    view === v ? 'text-[#0B0D10]' : 'text-[#9AA4B2] hover:text-[#F5F7FA]'
                  }`}
                >
                  {view === v && (
                    <motion.div
                      layoutId="view-pill"
                      className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 capitalize">{v === 'bars' ? '📊 Progress' : '🏷️ Tags'}</span>
                </button>
              ))}
            </div>

            {/* Resume CTA */}
            <a
              href="#"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-xl text-sm text-[#FF6B35] hover:bg-[#FF6B35]/20 transition-all"
            >
              <FaDownload className="text-xs" />
              Resume
            </a>
          </div>
        </div>
      </section>

      {/* ===== SEARCH RESULTS ===== */}
      <AnimatePresence>
        {searchQuery && (
          <motion.section
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="py-8 bg-[#0B0D10] border-b border-[#242A32]/50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-sm text-[#6B7280] font-['JetBrains_Mono'] mb-4">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "
                <span className="text-[#FF6B35]">{searchQuery}</span>"
              </p>
              {searchResults.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {searchResults.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-[#151A20] border border-[#242A32] rounded-xl hover:border-[#FF6B35]/40 transition-all"
                    >
                      <span className="text-sm">{skill.catIcon}</span>
                      <div>
                        <span className="text-sm text-[#F5F7FA] font-medium block">
                          {skill.name}
                        </span>
                        <span className="text-[10px] text-[#6B7280]">
                          {skill.category} · {skill.level}%
                        </span>
                      </div>
                      <div className="ml-2 w-12 h-1 bg-[#0B0D10] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-[#9AA4B2] text-sm">No skills found.</p>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ===== MAIN SKILLS SECTION ===== */}
      {!searchQuery && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* ── Sidebar: Category tabs ── */}
              <div className="lg:col-span-3">
                <div className="sticky top-36">
                  <p className="text-[10px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-[0.2em] mb-3 px-1">
                    Categories
                  </p>
                  <div className="space-y-1">
                    {skillCategories.map((cat) => {
                      const isActive = activeCategory.name === cat.name
                      return (
                        <button
                          key={cat.name}
                          onClick={() => setActiveCategory(cat)}
                          className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                            isActive
                              ? 'bg-[#FF6B35]/10 border border-[#FF6B35]/20'
                              : 'border border-transparent hover:bg-[#151A20] hover:border-[#242A32]'
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="cat-indicator"
                              className="absolute left-0 w-0.5 h-6 bg-[#FF6B35] rounded-r-full"
                              transition={{ type: 'spring', bounce: 0.2 }}
                            />
                          )}
                          <span className="text-lg">{cat.icon}</span>
                          <div className="flex-1 min-w-0">
                            <span
                              className={`block text-sm font-['Space_Grotesk'] font-semibold truncate ${
                                isActive ? 'text-[#FF6B35]' : 'text-[#9AA4B2]'
                              }`}
                            >
                              {cat.name}
                            </span>
                            <span className="text-[10px] text-[#6B7280]">
                              {cat.skills.length} skills
                            </span>
                          </div>
                          {isActive && (
                            <FaArrowRight className="text-[#FF6B35] text-xs flex-shrink-0" />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Category overview card */}
                  <div className="mt-6 p-4 bg-[#151A20] rounded-xl border border-[#242A32]">
                    <div className="text-2xl mb-2">{activeCategory.icon}</div>
                    <h4 className="font-['Space_Grotesk'] font-bold text-[#F5F7FA] text-sm">
                      {activeCategory.name}
                    </h4>
                    <p className="text-xs text-[#9AA4B2] mt-1 leading-relaxed">
                      {activeCategory.description}
                    </p>
                    <div className="mt-3 pt-3 border-t border-[#242A32]/50 flex items-center justify-between">
                      <span className="text-[10px] text-[#6B7280]">
                        Total skills
                      </span>
                      <span className="text-sm font-bold text-[#FF6B35] font-['Space_Grotesk']">
                        {activeCategory.skills.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Main: Skill display ── */}
              <div className="lg:col-span-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory.name + view}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Category header */}
                    <div
                      className={`relative bg-gradient-to-br ${activeCategory.color} rounded-2xl p-7 mb-6 overflow-hidden border border-[#242A32]`}
                    >
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                      <div className="relative z-10 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-3xl">{activeCategory.icon}</span>
                            <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#F5F7FA]">
                              {activeCategory.name}
                            </h2>
                          </div>
                          <p className="text-[#9AA4B2] text-sm">
                            {activeCategory.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-['Space_Grotesk'] text-4xl font-bold text-white/20">
                            {activeCategory.skills.length}
                          </div>
                          <div className="text-xs text-[#6B7280]">skills</div>
                        </div>
                      </div>
                    </div>

                    {/* Skills display */}
                    {view === 'bars' ? (
                      <div className="bg-[#151A20] rounded-2xl border border-[#242A32] p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
                          {activeCategory.skills.map((skill, i) => (
                            <SkillBar
                              key={skill.name}
                              name={skill.name}
                              level={skill.level}
                              years={skill.years}
                              delay={i * 60}
                            />
                          ))}
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-[#242A32]/50">
                          {[
                            { color: 'text-[#FF6B35]', label: 'Expert (90%+)' },
                            { color: 'text-blue-400', label: 'Advanced (75–89%)' },
                            { color: 'text-purple-400', label: 'Proficient (60–74%)' },
                            { color: 'text-green-400', label: 'Learning (<60%)' },
                          ].map((l) => (
                            <div
                              key={l.label}
                              className="flex items-center gap-1.5 text-xs"
                            >
                              <FaStar className={`${l.color} text-[10px]`} />
                              <span className="text-[#6B7280]">{l.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {activeCategory.skills.map((skill, i) => {
                          const lvl =
                            skill.level >= 90
                              ? { label: 'Expert', color: 'border-[#FF6B35]/40 text-[#FF6B35]' }
                              : skill.level >= 75
                              ? { label: 'Advanced', color: 'border-blue-400/30 text-blue-400' }
                              : skill.level >= 60
                              ? { label: 'Proficient', color: 'border-purple-400/30 text-purple-400' }
                              : { label: 'Learning', color: 'border-green-400/30 text-green-400' }

                          return (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.04 }}
                              className={`group bg-[#151A20] rounded-xl border ${lvl.color} p-4 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300 cursor-default`}
                            >
                              <span className="text-2xl mb-2">{activeCategory.icon}</span>
                              <span className="text-sm font-medium text-[#F5F7FA] group-hover:text-[#FF6B35] transition-colors leading-tight">
                                {skill.name}
                              </span>
                              <span className={`text-[10px] font-['JetBrains_Mono'] mt-1.5 ${lvl.color.split(' ')[1]}`}>
                                {lvl.label}
                              </span>
                              <div className="w-full h-1 bg-[#0B0D10] rounded-full mt-2 overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 1, delay: i * 0.05, ease: 'easeOut' }}
                                />
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== ALL SKILLS OVERVIEW (tag cloud) ===== */}
      {!searchQuery && (
        <section className="py-24 md:py-32 bg-[#11151A] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,107,53,0.04)_0%,_transparent_60%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-[0.2em] uppercase">
                Full Overview
              </span>
              <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-[#F5F7FA] mt-3">
                Everything at a
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                  {' '}glance
                </span>
              </h2>
            </motion.div>

            <div className="space-y-8">
              {skillCategories.map((cat, ci) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: ci * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="font-['Space_Grotesk'] font-bold text-[#F5F7FA]">
                      {cat.name}
                    </span>
                    <div className="flex-1 h-px bg-[#242A32]/50" />
                    <span className="text-xs text-[#6B7280] font-['JetBrains_Mono']">
                      {cat.skills.length} skills
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, si) => {
                      const isExpert = skill.level >= 90
                      const isAdvanced = skill.level >= 75
                      return (
                        <motion.span
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: si * 0.04 }}
                          viewport={{ once: true }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-['JetBrains_Mono'] border transition-all cursor-default hover:-translate-y-0.5 ${
                            isExpert
                              ? 'bg-[#FF6B35]/10 border-[#FF6B35]/30 text-[#FF6B35]'
                              : isAdvanced
                              ? 'bg-[#151A20] border-[#242A32] text-[#C1C7D0] hover:border-[#FF6B35]/20'
                              : 'bg-[#0B0D10] border-[#242A32]/50 text-[#6B7280] hover:border-[#242A32]'
                          }`}
                        >
                          {isExpert && <FaCheckCircle className="text-[10px]" />}
                          {skill.name}
                        </motion.span>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CORE COMPETENCIES ===== */}
      {!searchQuery && (
        <section className="py-24 md:py-32 bg-[#0B0D10] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-[0.2em] uppercase">
                  Core Strengths
                </span>
                <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-[#F5F7FA] mt-3 leading-tight">
                  Where I
                  <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                    {' '}excel
                  </span>
                </h2>
                <p className="text-[#9AA4B2] text-lg mt-4 leading-relaxed">
                  Beyond technical skills — these are the core competencies
                  that define how I approach software development and deliver
                  quality results consistently.
                </p>

                {/* Soft skills */}
                <div className="grid grid-cols-2 gap-2.5 mt-8">
                  {softSkills.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2.5 px-3 py-2.5 bg-[#151A20] rounded-xl border border-[#242A32] hover:border-[#FF6B35]/20 transition-colors"
                    >
                      <span>{s.icon}</span>
                      <span className="text-sm text-[#9AA4B2]">{s.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Progress bars */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-[#151A20] rounded-2xl border border-[#242A32] p-8 space-y-6"
              >
                {coreCompetencies.map((comp, i) => (
                  <SkillBar
                    key={comp.label}
                    name={comp.label}
                    level={comp.value}
                    delay={i * 100}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ===== CURRENTLY LEARNING ===== */}
      {!searchQuery && (
        <section className="py-20 bg-[#11151A] border-y border-[#242A32]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6B35]" />
                  </span>
                  <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] uppercase tracking-[0.2em]">
                    Currently Learning
                  </span>
                </div>
                <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-[#F5F7FA]">
                  Always growing
                </h2>
                <p className="text-[#9AA4B2] mt-2 max-w-lg">
                  Technologies and concepts I'm actively exploring and adding
                  to my toolkit.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'React Native',  icon: '📱', progress: 40 },
                  { label: 'Rust',          icon: '⚙️', progress: 20 },
                  { label: 'Machine Learning',icon: '🤖', progress: 35 },
                  { label: 'Web3 / Blockchain',icon: '⛓️', progress: 25 },
                  { label: 'Kubernetes',    icon: '🐳', progress: 30 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-2.5 px-4 py-2.5 bg-[#0B0D10] border border-[#242A32] rounded-xl hover:border-[#FF6B35]/30 transition-all"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <span className="text-sm text-[#F5F7FA] font-medium block">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-16 h-1 bg-[#151A20] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#FF6B35]/60 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <span className="text-[10px] text-[#6B7280] font-['JetBrains_Mono']">
                          {item.progress}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="py-24 md:py-32 bg-[#0B0D10] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6B35]/5 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#151A20] to-[#0B0D10] rounded-3xl border border-[#242A32] p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#FF6B35]/30 rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#FF6B35]/30 rounded-br-3xl pointer-events-none" />

            <FaCode className="text-5xl text-[#FF6B35]/20 mx-auto mb-4" />
            <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-bold text-[#F5F7FA] leading-tight">
              Want to see these skills
              <br />
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB86B] bg-clip-text text-transparent">
                in action?
              </span>
            </h2>
            <p className="text-[#9AA4B2] text-lg max-w-xl mx-auto mt-4 leading-relaxed">
              Check out my projects to see how I apply these technologies to
              build real-world solutions.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                to="/projects"
                className="group relative px-8 py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-[#0B0D10] font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <FaArrowRight className="text-sm relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFB86B] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 border-2 border-[#242A32] rounded-xl hover:border-[#FF6B35] text-[#F5F7FA] hover:text-[#FF6B35] transition-all duration-300 inline-flex items-center gap-2 hover:bg-[#FF6B35]/5"
              >
                <FaBolt />
                Hire Me
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Skills