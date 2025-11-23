import { useState } from 'react'
import { useResume } from '../../../context/ResumeContext'
import { Briefcase, Plus, Trash2, ChevronRight, ChevronLeft, Lightbulb, Wand2, GripVertical } from 'lucide-react'

const ACHIEVEMENT_STARTERS = [
  "Led a team of [X] to deliver...",
  "Increased [metric] by [X]% through...",
  "Reduced [time/cost/errors] by [X]% by implementing...",
  "Built [feature/system] that [impact]...",
  "Migrated [system] from [old] to [new], resulting in...",
  "Automated [process] saving [X] hours per week...",
  "Collaborated with [teams] to launch...",
  "Designed and implemented [solution] for [problem]...",
  "Optimized [system] improving performance by [X]%...",
  "Mentored [X] developers in [technology/process]..."
]

const ACTION_VERBS = {
  leadership: ['Led', 'Directed', 'Managed', 'Supervised', 'Mentored', 'Coordinated', 'Guided'],
  achievement: ['Achieved', 'Exceeded', 'Delivered', 'Accomplished', 'Attained', 'Earned'],
  creation: ['Built', 'Created', 'Designed', 'Developed', 'Established', 'Implemented', 'Launched'],
  improvement: ['Improved', 'Enhanced', 'Optimized', 'Streamlined', 'Transformed', 'Modernized'],
  analysis: ['Analyzed', 'Assessed', 'Evaluated', 'Identified', 'Investigated', 'Researched']
}

export default function ExperienceStep({ data, onNext, onPrev }) {
  const { resumeData, updateSection } = useResume()
  const [experiences, setExperiences] = useState(
    resumeData.experience.length > 0 ? resumeData.experience : [{
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: ['']
    }]
  )
  const [activeExp, setActiveExp] = useState(0)
  const [showTips, setShowTips] = useState(true)

  const updateExperience = (index, field, value) => {
    const updated = [...experiences]
    updated[index] = { ...updated[index], [field]: value }
    setExperiences(updated)
    updateSection('experience', updated)
  }

  const addExperience = () => {
    const newExp = {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: ['']
    }
    setExperiences([...experiences, newExp])
    setActiveExp(experiences.length)
  }

  const removeExperience = (index) => {
    if (experiences.length === 1) return
    const updated = experiences.filter((_, i) => i !== index)
    setExperiences(updated)
    updateSection('experience', updated)
    if (activeExp >= updated.length) {
      setActiveExp(updated.length - 1)
    }
  }

  const addAchievement = (expIndex) => {
    const updated = [...experiences]
    updated[expIndex].achievements = [...(updated[expIndex].achievements || []), '']
    setExperiences(updated)
    updateSection('experience', updated)
  }

  const updateAchievement = (expIndex, achIndex, value) => {
    const updated = [...experiences]
    updated[expIndex].achievements[achIndex] = value
    setExperiences(updated)
    updateSection('experience', updated)
  }

  const removeAchievement = (expIndex, achIndex) => {
    const updated = [...experiences]
    updated[expIndex].achievements = updated[expIndex].achievements.filter((_, i) => i !== achIndex)
    setExperiences(updated)
    updateSection('experience', updated)
  }

  const insertStarter = (expIndex, achIndex, starter) => {
    const updated = [...experiences]
    updated[expIndex].achievements[achIndex] = starter
    setExperiences(updated)
    updateSection('experience', updated)
  }

  const exp = experiences[activeExp]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Work Experience</h2>
        <p className="text-slate-400">Add your relevant work history, most recent first</p>
      </div>

      {/* Tips Panel */}
      {showTips && (
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-amber-300 font-medium mb-1">Pro Tips for Experience Section:</p>
                <ul className="text-amber-200/80 space-y-1">
                  <li>Start bullets with strong action verbs (Led, Built, Improved)</li>
                  <li>Include metrics whenever possible (increased by 40%, reduced from 3 days to 4 hours)</li>
                  <li>Focus on achievements, not just responsibilities</li>
                  <li>Tailor to the job you're applying for</li>
                </ul>
              </div>
            </div>
            <button onClick={() => setShowTips(false)} className="text-amber-400 hover:text-amber-300">
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Experience Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {experiences.map((e, i) => (
          <button
            key={i}
            onClick={() => setActiveExp(i)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all
              ${activeExp === i
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }
            `}
          >
            <Briefcase className="w-4 h-4" />
            {e.company || `Experience ${i + 1}`}
          </button>
        ))}
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* Experience Form */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {exp.company || 'New Experience'}
          </h3>
          {experiences.length > 1 && (
            <button
              onClick={() => removeExperience(activeExp)}
              className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Company Name *</label>
            <input
              type="text"
              value={exp.company}
              onChange={(e) => updateExperience(activeExp, 'company', e.target.value)}
              placeholder="Google, Microsoft, Startup Inc..."
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Job Title *</label>
            <input
              type="text"
              value={exp.position}
              onChange={(e) => updateExperience(activeExp, 'position', e.target.value)}
              placeholder="Senior Software Engineer"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={exp.location}
              onChange={(e) => updateExperience(activeExp, 'location', e.target.value)}
              placeholder="San Francisco, CA or Remote"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Start Date *</label>
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) => updateExperience(activeExp, 'startDate', e.target.value)}
                placeholder="Jan 2022"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">End Date</label>
              <input
                type="text"
                value={exp.current ? 'Present' : exp.endDate}
                onChange={(e) => updateExperience(activeExp, 'endDate', e.target.value)}
                disabled={exp.current}
                placeholder="Present"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
              />
              <label className="flex items-center gap-2 mt-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(activeExp, 'current', e.target.checked)}
                  className="rounded border-slate-600"
                />
                Currently working here
              </label>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-300">
              Key Achievements & Responsibilities
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">
                {(exp.achievements || []).filter(a => a.trim()).length} bullets
              </span>
            </div>
          </div>

          {/* Achievement Starters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-slate-500">Quick starters:</span>
            {ACHIEVEMENT_STARTERS.slice(0, 5).map((starter, i) => (
              <button
                key={i}
                onClick={() => {
                  const emptyIndex = (exp.achievements || []).findIndex(a => !a.trim())
                  if (emptyIndex !== -1) {
                    insertStarter(activeExp, emptyIndex, starter)
                  } else {
                    addAchievement(activeExp)
                    setTimeout(() => insertStarter(activeExp, (exp.achievements || []).length, starter), 0)
                  }
                }}
                className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-colors"
              >
                {starter.substring(0, 25)}...
              </button>
            ))}
          </div>

          {/* Achievement Inputs */}
          <div className="space-y-3">
            {(exp.achievements || ['']).map((achievement, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-slate-500 mt-3">•</span>
                <textarea
                  value={achievement}
                  onChange={(e) => updateAchievement(activeExp, i, e.target.value)}
                  placeholder="Start with an action verb: Led, Built, Improved, Reduced..."
                  rows={2}
                  className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                />
                {(exp.achievements || []).length > 1 && (
                  <button
                    onClick={() => removeAchievement(activeExp, i)}
                    className="mt-3 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => addAchievement(activeExp)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add another achievement
          </button>
        </div>

        {/* Action Verbs Reference */}
        <div className="bg-slate-900/50 rounded-lg p-4">
          <p className="text-xs text-slate-500 mb-2">Strong action verbs by category:</p>
          <div className="flex flex-wrap gap-4 text-xs">
            {Object.entries(ACTION_VERBS).map(([category, verbs]) => (
              <div key={category}>
                <span className="text-slate-400 capitalize">{category}:</span>
                <span className="text-slate-300 ml-1">{verbs.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
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
          onClick={onNext}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Continue to Education
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
