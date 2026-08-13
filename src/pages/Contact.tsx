import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaArrowRight,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaPaperPlane,
  FaRocket,
  FaWhatsapp,
  FaCalendarAlt,
  FaBolt,
  FaCode,
  FaLaptopCode,
} from 'react-icons/fa'

interface FormData {
  name: string
  email: string
  subject: string
  budget: string
  timeline: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    budget: '',
    timeline: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // Validate form
  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitStatus('loading')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitStatus('success')
    setFormData({
      name: '',
      email: '',
      subject: '',
      budget: '',
      timeline: '',
      message: '',
    })
    setErrors({})

    // Reset after 5s
    setTimeout(() => setSubmitStatus('idle'), 5000)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const contactMethods = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'henryosuagwu22@gmail.com',
      href: 'mailto:henryosuagwu22@gmail.com',
      desc: 'Best for project inquiries',
      color: 'from-[#FF6B35]/20 to-[#FFB86B]/10',
    },
    {
      icon: <FaWhatsapp />,
      label: 'WhatsApp',
      value: '+234 816 026 2300',
      href: 'https://wa.me/2348160262300',
      desc: 'Quick responses',
      color: 'from-green-500/20 to-emerald-500/10',
    },
    {
      icon: <FaCalendarAlt />,
      label: 'Schedule a Call',
      value: 'Book a 30-min session',
      href: '#',
      desc: 'Free consultation',
      color: 'from-blue-500/20 to-cyan-500/10',
    },
  ]

  const socialLinks = [
    {
      icon: <FaGithub />,
      label: 'GitHub',
      href: 'https://github.com/Impulsible',
      handle: '@Impulsible',
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      href: '#',
      handle: 'Henry Osuagwu',
    },
    {
      icon: <FaTwitter />,
      label: 'Twitter',
      href: '#',
      handle: '@impulsible',
    },
  ]

  const faqs = [
    {
      q: 'What is your typical project timeline?',
      a: 'Most projects take 4–12 weeks depending on complexity. I provide detailed timelines during our initial consultation.',
    },
    {
      q: 'Do you work with international clients?',
      a: 'Absolutely! I work with clients globally. I\'m fluent in English and comfortable with remote collaboration.',
    },
    {
      q: 'What information helps you give a quote?',
      a: 'Project scope, desired features, tech preferences, and target launch date. The more detail, the better.',
    },
  ]

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3.5 bg-[#0B0D10] border rounded-xl text-[#F5F7FA] placeholder:text-[#4A5568] focus:outline-none transition-all duration-300 font-['JetBrains_Mono'] text-sm ${
      errors[field]
        ? 'border-red-500/50 focus:border-red-500/70 bg-red-500/5'
        : focusedField === field
        ? 'border-[#FF6B35]/50 bg-[#FF6B35]/5 shadow-[0_0_0_3px_rgba(255,107,53,0.08)]'
        : 'border-[#242A32] hover:border-[#3A4150]'
    }`

  return (
    <div className="min-h-screen bg-[#0B0D10]">
      {/* ===== HERO ===== */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,107,53,0.1)_0%,_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,184,107,0.05)_0%,_transparent_50%)]" />
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
            className="text-center"
          >
            {/* Pre-label */}
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="font-['JetBrains_Mono'] text-sm text-green-400 uppercase tracking-[0.2em]">
                Available for work
              </span>
            </div>

            <h1 className="font-['Space_Grotesk'] text-5xl md:text-6xl lg:text-7xl font-bold text-[#F5F7FA] leading-tight">
              Let's build something
              <br />
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8F5E] to-[#FFB86B] bg-clip-text text-transparent">
                extraordinary
              </span>
            </h1>

            <p className="text-[#9AA4B2] text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
              Have a project in mind? Looking for a developer to join your team?
              Or just want to say hi? I'd love to hear from you.
            </p>

            {/* Quick info pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                {
                  icon: <FaMapMarkerAlt />,
                  text: 'Lagos, Nigeria 🇳🇬',
                },
                {
                  icon: <FaClock />,
                  text: 'Response within 24hrs',
                },
                {
                  icon: <FaBolt />,
                  text: 'Available for freelance',
                },
              ].map((pill, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#151A20] border border-[#242A32] rounded-full text-sm text-[#9AA4B2]"
                >
                  <span className="text-[#FF6B35] text-xs">{pill.icon}</span>
                  {pill.text}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT METHODS ===== */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4">
            {contactMethods.map((method, i) => (
              <motion.a
                key={i}
                href={method.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className={`group flex items-center gap-4 p-5 bg-gradient-to-br ${method.color} border border-[#242A32] rounded-2xl hover:border-[#FF6B35]/30 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="w-11 h-11 rounded-xl bg-[#0B0D10]/60 border border-[#242A32]/50 flex items-center justify-center text-[#FF6B35] group-hover:scale-110 transition-transform flex-shrink-0">
                  {method.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-wider">
                    {method.label}
                  </p>
                  <p className="text-sm font-medium text-[#F5F7FA] truncate mt-0.5">
                    {method.value}
                  </p>
                  <p className="text-[11px] text-[#9AA4B2] mt-0.5">
                    {method.desc}
                  </p>
                </div>
                <FaArrowRight className="text-[#3A4150] text-xs group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-all ml-auto flex-shrink-0" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* ── LEFT: Form ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="bg-gradient-to-b from-[#151A20] to-[#11151A] rounded-2xl border border-[#242A32] overflow-hidden">
                {/* Form header */}
                <div className="px-7 py-6 border-b border-[#242A32]/50 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className="ml-2 text-xs text-[#6B7280] font-['JetBrains_Mono']">
                    contact-form.tsx
                  </span>
                </div>

                <div className="p-7 md:p-10">
                  <AnimatePresence mode="wait">
                    {submitStatus === 'success' ? (
                      /* ── Success State ── */
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="py-16 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 12,
                          }}
                          className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-6"
                        >
                          <FaCheckCircle className="text-3xl text-green-400" />
                        </motion.div>
                        <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#F5F7FA] mb-3">
                          Message Sent! 🎉
                        </h3>
                        <p className="text-[#9AA4B2] leading-relaxed max-w-sm mx-auto">
                          Thank you for reaching out. I'll review your message
                          and get back to you within 24 hours.
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 px-4 py-2.5 bg-green-500/10 border border-green-500/20 rounded-xl w-fit mx-auto">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                          </span>
                          <span className="text-sm text-green-400 font-['JetBrains_Mono']">
                            Delivered to inbox
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      /* ── Form ── */
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                        noValidate
                      >
                        {/* Row 1: Name + Email */}
                        <div className="grid sm:grid-cols-2 gap-5">
                          {/* Name */}
                          <div>
                            <label className="block text-xs text-[#9AA4B2] font-['JetBrains_Mono'] uppercase tracking-wider mb-2">
                              Name <span className="text-[#FF6B35]">*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              placeholder="Henry Osuagwu"
                              className={inputClass('name')}
                            />
                            <AnimatePresence>
                              {errors.name && (
                                <motion.p
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="text-xs text-red-400 mt-1.5 font-['JetBrains_Mono']"
                                >
                                  ⚠ {errors.name}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Email */}
                          <div>
                            <label className="block text-xs text-[#9AA4B2] font-['JetBrains_Mono'] uppercase tracking-wider mb-2">
                              Email <span className="text-[#FF6B35]">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              placeholder="you@example.com"
                              className={inputClass('email')}
                            />
                            <AnimatePresence>
                              {errors.email && (
                                <motion.p
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="text-xs text-red-400 mt-1.5 font-['JetBrains_Mono']"
                                >
                                  ⚠ {errors.email}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Subject */}
                        <div>
                          <label className="block text-xs text-[#9AA4B2] font-['JetBrains_Mono'] uppercase tracking-wider mb-2">
                            Subject <span className="text-[#FF6B35]">*</span>
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('subject')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="e.g. Web App Development, Freelance, Collaboration..."
                            className={inputClass('subject')}
                          />
                          <AnimatePresence>
                            {errors.subject && (
                              <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="text-xs text-red-400 mt-1.5 font-['JetBrains_Mono']"
                              >
                                ⚠ {errors.subject}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Row 2: Budget + Timeline */}
                        <div className="grid sm:grid-cols-2 gap-5">
                          {/* Budget */}
                          <div>
                            <label className="block text-xs text-[#9AA4B2] font-['JetBrains_Mono'] uppercase tracking-wider mb-2">
                              Budget Range
                            </label>
                            <select
                              name="budget"
                              value={formData.budget}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('budget')}
                              onBlur={() => setFocusedField(null)}
                              className={`${inputClass('budget' as keyof FormErrors)} cursor-pointer appearance-none`}
                            >
                              <option value="" className="bg-[#151A20]">
                                Select budget
                              </option>
                              {[
                                'Under $500',
                                '$500 – $1,000',
                                '$1,000 – $2,500',
                                '$2,500 – $5,000',
                                '$5,000 – $10,000',
                                '$10,000+',
                                'Let\'s discuss',
                              ].map((b) => (
                                <option
                                  key={b}
                                  value={b}
                                  className="bg-[#151A20]"
                                >
                                  {b}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Timeline */}
                          <div>
                            <label className="block text-xs text-[#9AA4B2] font-['JetBrains_Mono'] uppercase tracking-wider mb-2">
                              Timeline
                            </label>
                            <select
                              name="timeline"
                              value={formData.timeline}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('timeline')}
                              onBlur={() => setFocusedField(null)}
                              className={`${inputClass('timeline' as keyof FormErrors)} cursor-pointer appearance-none`}
                            >
                              <option value="" className="bg-[#151A20]">
                                Select timeline
                              </option>
                              {[
                                'ASAP',
                                '1 – 2 weeks',
                                '1 month',
                                '2 – 3 months',
                                '3 – 6 months',
                                'Flexible',
                              ].map((t) => (
                                <option
                                  key={t}
                                  value={t}
                                  className="bg-[#151A20]"
                                >
                                  {t}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-xs text-[#9AA4B2] font-['JetBrains_Mono'] uppercase tracking-wider">
                              Message <span className="text-[#FF6B35]">*</span>
                            </label>
                            <span
                              className={`text-[10px] font-['JetBrains_Mono'] ${
                                formData.message.length >= 20
                                  ? 'text-green-400'
                                  : 'text-[#6B7280]'
                              }`}
                            >
                              {formData.message.length} chars
                              {formData.message.length < 20 &&
                                ` (min 20)`}
                            </span>
                          </div>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            rows={6}
                            placeholder="Tell me about your project — what are you building, what problems are you solving, what's your vision?..."
                            className={`${inputClass('message')} resize-none leading-relaxed`}
                          />
                          <AnimatePresence>
                            {errors.message && (
                              <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="text-xs text-red-400 mt-1.5 font-['JetBrains_Mono']"
                              >
                                ⚠ {errors.message}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Quick prompts */}
                        <div>
                          <p className="text-[10px] text-[#6B7280] font-['JetBrains_Mono'] mb-2 uppercase tracking-wider">
                            Quick fill ↓
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {[
                              '🚀 New web app project',
                              '💼 Freelance inquiry',
                              '🤝 Collaboration idea',
                              '💬 Just saying hi',
                            ].map((prompt) => (
                              <button
                                key={prompt}
                                type="button"
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    subject: prompt.slice(3),
                                  }))
                                }
                                className="px-3 py-1.5 text-[11px] bg-[#0B0D10] border border-[#242A32] rounded-lg text-[#6B7280] hover:border-[#FF6B35]/30 hover:text-[#FF6B35] transition-all font-['JetBrains_Mono']"
                              >
                                {prompt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          disabled={submitStatus === 'loading'}
                          whileHover={
                            submitStatus !== 'loading' ? { scale: 1.01 } : {}
                          }
                          whileTap={
                            submitStatus !== 'loading' ? { scale: 0.99 } : {}
                          }
                          className="relative w-full py-4 rounded-xl font-semibold text-[#0B0D10] overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {/* Background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] group-hover:from-[#FFB86B] group-hover:to-[#FF6B35] transition-all duration-300" />
                          {/* Shimmer */}
                          {submitStatus !== 'loading' && (
                            <motion.div
                              className="absolute inset-0"
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                              }}
                              style={{
                                background:
                                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                              }}
                            />
                          )}
                          {/* Content */}
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            {submitStatus === 'loading' ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: 'linear',
                                  }}
                                  className="w-5 h-5 border-2 border-[#0B0D10]/40 border-t-[#0B0D10] rounded-full"
                                />
                                Sending message...
                              </>
                            ) : (
                              <>
                                <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Send Message
                                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </span>
                        </motion.button>

                        {/* Privacy note */}
                        <p className="text-center text-[10px] text-[#4A5568] font-['JetBrains_Mono']">
                          🔒 Your information is kept private and never shared
                          with third parties.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: Sidebar ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-5 space-y-5"
            >
              {/* About / Why work with me */}
              <div className="bg-[#151A20] rounded-2xl border border-[#242A32] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFB86B] flex items-center justify-center">
                    <FaRocket className="text-[#0B0D10] text-sm" />
                  </div>
                  <h3 className="font-['Space_Grotesk'] font-bold text-[#F5F7FA]">
                    Why work with me?
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      icon: <FaCheckCircle />,
                      text: 'Clean, maintainable code with best practices',
                    },
                    {
                      icon: <FaCheckCircle />,
                      text: 'Regular updates and transparent communication',
                    },
                    {
                      icon: <FaCheckCircle />,
                      text: 'On-time delivery with milestone tracking',
                    },
                    {
                      icon: <FaCheckCircle />,
                      text: 'Post-launch support and maintenance',
                    },
                    {
                      icon: <FaCheckCircle />,
                      text: 'Nigerian market expertise & global standards',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[#9AA4B2]"
                    >
                      <span className="text-[#FF6B35] text-xs mt-0.5 flex-shrink-0">
                        {item.icon}
                      </span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability card */}
              <div className="bg-gradient-to-br from-[#FF6B35]/10 to-[#FFB86B]/5 rounded-2xl border border-[#FF6B35]/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="text-sm font-medium text-green-400">
                    Currently available
                  </span>
                </div>
                <p className="text-sm text-[#9AA4B2] leading-relaxed">
                  I'm actively taking on new projects for{' '}
                  <span className="text-[#F5F7FA] font-medium">
                    Q1 2025
                  </span>
                  . Slots are limited — reach out early to secure your spot.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { label: 'Response time', value: '< 24 hrs' },
                    { label: 'Timezone', value: 'WAT (UTC+1)' },
                    { label: 'Languages', value: 'English' },
                    { label: 'Work type', value: 'Remote / Hybrid' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#0B0D10]/50 rounded-xl p-3 border border-[#242A32]/50"
                    >
                      <p className="text-[10px] text-[#6B7280] font-['JetBrains_Mono'] uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-sm text-[#F5F7FA] font-medium mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services I offer */}
              <div className="bg-[#151A20] rounded-2xl border border-[#242A32] p-6">
                <h3 className="font-['Space_Grotesk'] font-bold text-[#F5F7FA] mb-4 flex items-center gap-2">
                  <FaCode className="text-[#FF6B35] text-sm" />
                  Services
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: <FaLaptopCode />, label: 'Web Apps' },
                    { icon: <FaCode />, label: 'APIs & Backend' },
                    { icon: <FaBolt />, label: 'UI/UX Dev' },
                    { icon: <FaRocket />, label: 'Consulting' },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 bg-[#0B0D10]/50 rounded-xl border border-[#242A32]/50 hover:border-[#FF6B35]/20 transition-colors"
                    >
                      <span className="text-[#FF6B35] text-sm">{s.icon}</span>
                      <span className="text-xs text-[#9AA4B2]">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="bg-[#151A20] rounded-2xl border border-[#242A32] p-6">
                <h3 className="font-['Space_Grotesk'] font-bold text-[#F5F7FA] mb-4 text-sm">
                  Connect elsewhere
                </h3>
                <div className="space-y-2.5">
                  {socialLinks.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-3 rounded-xl hover:bg-[#0B0D10] border border-transparent hover:border-[#242A32] transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#0B0D10] border border-[#242A32] flex items-center justify-center text-[#6B7280] group-hover:text-[#FF6B35] group-hover:border-[#FF6B35]/30 transition-all text-sm">
                        {s.icon}
                      </div>
                      <div>
                        <p className="text-sm text-[#F5F7FA] font-medium group-hover:text-[#FF6B35] transition-colors">
                          {s.label}
                        </p>
                        <p className="text-[11px] text-[#6B7280]">
                          {s.handle}
                        </p>
                      </div>
                      <FaArrowRight className="text-[#3A4150] text-xs ml-auto group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 md:py-24 bg-[#11151A] border-t border-[#242A32]/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-['JetBrains_Mono'] text-sm text-[#FF6B35] tracking-[0.2em] uppercase">
              FAQ
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-[#F5F7FA] mt-3">
              Common questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0B0D10] rounded-2xl border border-[#242A32] p-6 hover:border-[#FF6B35]/20 transition-all"
              >
                <h4 className="font-['Space_Grotesk'] font-bold text-[#F5F7FA] flex items-start gap-3">
                  <span className="text-[#FF6B35] mt-0.5 flex-shrink-0">
                    Q.
                  </span>
                  {faq.q}
                </h4>
                <p className="text-[#9AA4B2] text-sm leading-relaxed mt-3 pl-6">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact