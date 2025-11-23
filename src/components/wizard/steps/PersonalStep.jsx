import { useState, useEffect } from 'react'
import { useResume } from '../../../context/ResumeContext'
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, ChevronRight, ChevronLeft, Lightbulb, AlertCircle } from 'lucide-react'

const TIPS = {
  name: "Use your full professional name as it appears on LinkedIn",
  title: "Match this to the job you're applying for. Be specific: 'Senior React Developer' not just 'Developer'",
  email: "Use a professional email. Avoid nicknames like coolguy123@...",
  phone: "Include country code for international applications",
  location: "City and Country is enough. Full address not needed.",
  linkedin: "Ensure your LinkedIn matches your resume",
  github: "Great for developers! Make sure pinned repos are impressive",
  summary: "2-3 sentences highlighting your unique value. Include years of experience and key skills."
}

const SUMMARY_TEMPLATES = {
  frontend: "Results-driven Frontend Developer with [X] years of experience building responsive, accessible web applications using React, TypeScript, and modern CSS. Proven track record of improving user experience and performance metrics.",
  backend: "Backend Developer with [X] years of experience designing and implementing scalable APIs and microservices. Expert in [languages/frameworks] with strong database optimization skills.",
  fullstack: "Full-Stack Developer with [X] years of experience delivering end-to-end solutions. Proficient in [frontend stack] and [backend stack], with expertise in cloud deployment and DevOps practices.",
  devops: "DevOps Engineer with [X] years of experience automating CI/CD pipelines and managing cloud infrastructure. Skilled in containerization, orchestration, and infrastructure as code.",
  data: "Data professional with [X] years of experience transforming complex data into actionable insights. Expert in Python, SQL, and machine learning with a track record of driving business decisions.",
  manager: "Engineering leader with [X] years of experience building and scaling high-performing teams. Track record of delivering complex projects on time while fostering innovation and professional growth.",
  product: "Product Manager with [X] years of experience driving product strategy and roadmap execution. Skilled in user research, data-driven decision making, and cross-functional collaboration.",
  other: "Professional with [X] years of experience in [industry/field]. Proven track record of [key achievement] with expertise in [key skills]."
}

export default function PersonalStep({ data, onNext, onPrev }) {
  const { resumeData, updatePersonal } = useResume()
  const [form, setForm] = useState({
    name: resumeData.personal.name || '',
    title: resumeData.personal.title || '',
    email: resumeData.personal.email || '',
    phone: resumeData.personal.phone || '',
    location: resumeData.personal.location || '',
    linkedin: resumeData.personal.linkedin || '',
    github: resumeData.personal.github || '',
    website: resumeData.personal.website || '',
    summary: resumeData.personal.summary || ''
  })
  const [activeTip, setActiveTip] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    updatePersonal({ [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const useSummaryTemplate = () => {
    const template = SUMMARY_TEMPLATES[data.targetRole] || SUMMARY_TEMPLATES.other
    handleChange('summary', template)
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.title.trim()) newErrors.title = 'Professional title is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format'
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validate()) {
      onNext()
    }
  }

  const InputField = ({ icon: Icon, field, label, placeholder, type = 'text', required = false }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type={type}
          value={form[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          onFocus={() => setActiveTip(field)}
          onBlur={() => setActiveTip('')}
          placeholder={placeholder}
          className={`
            w-full pl-11 pr-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-500
            focus:outline-none focus:ring-2 transition-all
            ${errors[field] ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-700 focus:ring-blue-500/50 focus:border-blue-500'}
          `}
        />
      </div>
      {errors[field] && (
        <p className="text-red-400 text-sm flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {errors[field]}
        </p>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Personal Information</h2>
        <p className="text-slate-400">Let's start with your contact details</p>
      </div>

      {/* Tip Banner */}
      {activeTip && TIPS[activeTip] && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3 animate-fadeIn">
          <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-blue-300 text-sm">{TIPS[activeTip]}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <InputField icon={User} field="name" label="Full Name" placeholder="John Doe" required />
        <InputField icon={User} field="title" label="Professional Title" placeholder="Senior Frontend Developer" required />
        <InputField icon={Mail} field="email" label="Email" placeholder="john@example.com" type="email" required />
        <InputField icon={Phone} field="phone" label="Phone" placeholder="+1 (555) 123-4567" required />
        <InputField icon={MapPin} field="location" label="Location" placeholder="San Francisco, CA" />
        <InputField icon={Linkedin} field="linkedin" label="LinkedIn URL" placeholder="linkedin.com/in/johndoe" />
        <InputField icon={Github} field="github" label="GitHub URL" placeholder="github.com/johndoe" />
        <InputField icon={Globe} field="website" label="Portfolio/Website" placeholder="johndoe.dev" />
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-300">
            Professional Summary
          </label>
          <button
            onClick={useSummaryTemplate}
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <Lightbulb className="w-4 h-4" />
            Use template for {data.targetRole || 'your role'}
          </button>
        </div>
        <textarea
          value={form.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          onFocus={() => setActiveTip('summary')}
          onBlur={() => setActiveTip('')}
          rows={4}
          placeholder="Write a compelling 2-3 sentence summary highlighting your experience and key strengths..."
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none"
        />
        <p className="text-slate-500 text-sm">
          {form.summary.length}/500 characters
          {form.summary.length > 0 && form.summary.length < 100 && (
            <span className="text-amber-400 ml-2">Consider adding more detail</span>
          )}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Continue to Experience
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
