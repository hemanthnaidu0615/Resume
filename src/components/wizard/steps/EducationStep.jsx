import { useState } from 'react'
import { useResume } from '../../../context/ResumeContext'
import { GraduationCap, Plus, Trash2, ChevronRight, ChevronLeft, Lightbulb, Award } from 'lucide-react'

const DEGREE_SUGGESTIONS = [
  "Bachelor of Technology (B.Tech)",
  "Bachelor of Science (B.S.)",
  "Bachelor of Engineering (B.E.)",
  "Master of Science (M.S.)",
  "Master of Business Administration (MBA)",
  "Master of Technology (M.Tech)",
  "Doctor of Philosophy (Ph.D.)",
  "Associate Degree",
  "High School Diploma",
  "Bootcamp Certificate"
]

export default function EducationStep({ data, onNext, onPrev }) {
  const { resumeData, updateSection } = useResume()
  const [education, setEducation] = useState(
    resumeData.education.length > 0 ? resumeData.education : [{
      degree: '',
      institution: '',
      location: '',
      year: '',
      cgpa: '',
      achievements: ''
    }]
  )
  const [showSuggestions, setShowSuggestions] = useState(false)

  const updateEducation = (index, field, value) => {
    const updated = [...education]
    updated[index] = { ...updated[index], [field]: value }
    setEducation(updated)
    updateSection('education', updated)
  }

  const addEducation = () => {
    const newEdu = {
      degree: '',
      institution: '',
      location: '',
      year: '',
      cgpa: '',
      achievements: ''
    }
    setEducation([...education, newEdu])
  }

  const removeEducation = (index) => {
    if (education.length === 1) return
    const updated = education.filter((_, i) => i !== index)
    setEducation(updated)
    updateSection('education', updated)
  }

  const isStudent = data.experienceLevel === 'student' || data.experienceLevel === 'entry'

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Education</h2>
        <p className="text-slate-400">Add your educational background</p>
      </div>

      {/* Tips for Students */}
      {isStudent && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-green-300 font-medium mb-1">As a student/entry-level candidate:</p>
              <ul className="text-green-200/80 space-y-1">
                <li>Your education section is MORE important - put it before experience</li>
                <li>Include relevant coursework, projects, and achievements</li>
                <li>Mention GPA if it's 3.5+ (or equivalent)</li>
                <li>Add dean's list, scholarships, honors if applicable</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Education Cards */}
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">
                  {edu.institution || `Education ${index + 1}`}
                </h3>
              </div>
              {education.length > 1 && (
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-slate-300 mb-1">Degree/Certificate *</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Bachelor of Technology"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                {showSuggestions && (
                  <div className="absolute z-10 mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {DEGREE_SUGGESTIONS.filter(d =>
                      d.toLowerCase().includes(edu.degree.toLowerCase())
                    ).map(suggestion => (
                      <button
                        key={suggestion}
                        onClick={() => updateEducation(index, 'degree', suggestion)}
                        className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Field of Study</label>
                <input
                  type="text"
                  value={edu.field || ''}
                  onChange={(e) => updateEducation(index, 'field', e.target.value)}
                  placeholder="Computer Science, Engineering, etc."
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Institution *</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  placeholder="Stanford University"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => updateEducation(index, 'location', e.target.value)}
                  placeholder="Stanford, CA"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Year of Completion</label>
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => updateEducation(index, 'year', e.target.value)}
                  placeholder="2024 or Expected 2025"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">GPA/CGPA (optional)</label>
                <input
                  type="text"
                  value={edu.cgpa}
                  onChange={(e) => updateEducation(index, 'cgpa', e.target.value)}
                  placeholder="3.8/4.0 or 8.5/10"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <p className="text-xs text-slate-500 mt-1">Only include if above average (3.5+ or 70%+)</p>
              </div>
            </div>

            {/* Additional Achievements */}
            {isStudent && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  <Award className="w-4 h-4 inline mr-1" />
                  Achievements, Honors, Relevant Coursework
                </label>
                <textarea
                  value={edu.achievements || ''}
                  onChange={(e) => updateEducation(index, 'achievements', e.target.value)}
                  placeholder="Dean's List, Relevant coursework: Data Structures, Algorithms, Machine Learning..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addEducation}
        className="flex items-center gap-2 px-4 py-2 text-blue-400 hover:text-blue-300 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add another education
      </button>

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
          Continue to Skills
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
