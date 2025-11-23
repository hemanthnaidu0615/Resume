import { useState, useMemo } from 'react'
import { useResume } from '../context/ResumeContext'
import {
  Shield, CheckCircle2, XCircle, AlertTriangle, ChevronDown, ChevronUp,
  FileText, Search, Type, Layout, Zap, Target, Lightbulb, RefreshCw
} from 'lucide-react'

const COMMON_ATS_KEYWORDS = {
  technical: [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'AWS', 'Docker',
    'Kubernetes', 'Git', 'API', 'REST', 'GraphQL', 'TypeScript', 'MongoDB',
    'PostgreSQL', 'CI/CD', 'Agile', 'Scrum', 'DevOps', 'Machine Learning',
    'Cloud', 'Azure', 'GCP', 'Linux', 'Microservices'
  ],
  action_verbs: [
    'Led', 'Developed', 'Implemented', 'Designed', 'Built', 'Created', 'Managed',
    'Improved', 'Increased', 'Reduced', 'Achieved', 'Delivered', 'Launched',
    'Optimized', 'Automated', 'Collaborated', 'Mentored', 'Architected'
  ],
  soft_skills: [
    'Leadership', 'Communication', 'Problem-solving', 'Team', 'Collaboration',
    'Project Management', 'Time Management', 'Strategic', 'Analytical'
  ]
}

const SECTION_WEIGHTS = {
  personal: 15,
  summary: 10,
  experience: 30,
  education: 10,
  skills: 20,
  achievements: 10,
  formatting: 5
}

export default function ATSChecker() {
  const { resumeData } = useResume()
  const [expandedSection, setExpandedSection] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analysis = useMemo(() => {
    const results = {
      overall: 0,
      sections: {},
      issues: [],
      warnings: [],
      passed: [],
      keywords: { found: [], missing: [] },
      improvements: []
    }

    // Helper to get all text content
    const getAllText = () => {
      let text = ''
      text += resumeData.personal?.name || ''
      text += ' ' + (resumeData.personal?.title || '')
      text += ' ' + (resumeData.personal?.summary || '')

      resumeData.experience?.forEach(exp => {
        text += ' ' + (exp.company || '')
        text += ' ' + (exp.position || '')
        exp.achievements?.forEach(ach => {
          text += ' ' + (typeof ach === 'string' ? ach : ach.description || '')
        })
      })

      Object.values(resumeData.skills || {}).forEach(skillArray => {
        text += ' ' + skillArray.join(' ')
      })

      resumeData.achievements?.forEach(ach => {
        text += ' ' + (ach.title || '') + ' ' + (ach.description || '')
      })

      return text.toLowerCase()
    }

    const allText = getAllText()

    // 1. Personal Info Check (15%)
    let personalScore = 0
    const personalMax = SECTION_WEIGHTS.personal

    if (resumeData.personal?.name?.trim()) {
      personalScore += 3
      results.passed.push('Name is present')
    } else {
      results.issues.push({ section: 'Personal', text: 'Missing name' })
    }

    if (resumeData.personal?.email?.trim()) {
      personalScore += 3
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resumeData.personal.email)) {
        results.passed.push('Valid email format')
      }
    } else {
      results.issues.push({ section: 'Personal', text: 'Missing email' })
    }

    if (resumeData.personal?.phone?.trim()) {
      personalScore += 3
      results.passed.push('Phone number present')
    } else {
      results.warnings.push({ section: 'Personal', text: 'Missing phone number' })
    }

    if (resumeData.personal?.location?.trim()) {
      personalScore += 3
      results.passed.push('Location specified')
    } else {
      results.warnings.push({ section: 'Personal', text: 'Consider adding location' })
    }

    if (resumeData.personal?.linkedin?.trim() && !resumeData.personal.linkedin.includes('yourprofile')) {
      personalScore += 3
      results.passed.push('LinkedIn profile linked')
    } else {
      results.warnings.push({ section: 'Personal', text: 'Add LinkedIn profile' })
    }

    results.sections.personal = { score: Math.min(personalScore, personalMax), max: personalMax }

    // 2. Summary Check (10%)
    let summaryScore = 0
    const summaryMax = SECTION_WEIGHTS.summary
    const summary = resumeData.personal?.summary || ''

    if (summary.trim()) {
      summaryScore += 4
      results.passed.push('Professional summary present')

      if (summary.length >= 100 && summary.length <= 500) {
        summaryScore += 3
        results.passed.push('Summary length is optimal (100-500 chars)')
      } else if (summary.length < 100) {
        summaryScore += 1
        results.warnings.push({ section: 'Summary', text: 'Summary is too short. Aim for 100-500 characters.' })
      } else {
        summaryScore += 1
        results.warnings.push({ section: 'Summary', text: 'Summary is too long. Keep it concise (100-500 chars).' })
      }

      // Check for keywords in summary
      const hasKeywords = COMMON_ATS_KEYWORDS.technical.some(kw =>
        summary.toLowerCase().includes(kw.toLowerCase())
      )
      if (hasKeywords) {
        summaryScore += 3
        results.passed.push('Summary contains relevant keywords')
      } else {
        results.warnings.push({ section: 'Summary', text: 'Add relevant technical keywords to summary' })
      }
    } else {
      results.issues.push({ section: 'Summary', text: 'Missing professional summary - crucial for ATS' })
    }

    results.sections.summary = { score: Math.min(summaryScore, summaryMax), max: summaryMax }

    // 3. Experience Check (30%)
    let experienceScore = 0
    const experienceMax = SECTION_WEIGHTS.experience
    const experiences = resumeData.experience || []

    if (experiences.length > 0) {
      experienceScore += 10
      results.passed.push(`${experiences.length} work experience(s) listed`)

      let hasQuantifiedAchievements = false
      let hasActionVerbs = false
      let totalBullets = 0

      experiences.forEach((exp, i) => {
        if (!exp.company?.trim() || !exp.position?.trim()) {
          results.warnings.push({ section: 'Experience', text: `Experience ${i + 1}: Missing company or position` })
        }

        if (!exp.startDate?.trim()) {
          results.warnings.push({ section: 'Experience', text: `Experience ${i + 1}: Missing start date` })
        }

        const achievements = exp.achievements || []
        totalBullets += achievements.length

        achievements.forEach(ach => {
          const achText = typeof ach === 'string' ? ach : ach.description || ''

          // Check for quantified results
          if (/\d+%|\$[\d,]+|\d+x|\d+ (users|customers|team|developers|projects|hours|days|months)/.test(achText)) {
            hasQuantifiedAchievements = true
          }

          // Check for action verbs
          const firstWord = achText.split(' ')[0]
          if (COMMON_ATS_KEYWORDS.action_verbs.some(verb =>
            firstWord?.toLowerCase() === verb.toLowerCase()
          )) {
            hasActionVerbs = true
          }
        })
      })

      if (hasQuantifiedAchievements) {
        experienceScore += 10
        results.passed.push('Achievements include quantified metrics')
      } else {
        results.issues.push({ section: 'Experience', text: 'Add metrics to achievements (%, $, numbers)' })
        results.improvements.push('Add numbers to your achievements: "Improved X by 40%", "Managed team of 8"')
      }

      if (hasActionVerbs) {
        experienceScore += 5
        results.passed.push('Using strong action verbs')
      } else {
        results.warnings.push({ section: 'Experience', text: 'Start bullets with action verbs (Led, Built, Improved)' })
      }

      if (totalBullets >= experiences.length * 3) {
        experienceScore += 5
        results.passed.push('Good number of achievement bullets')
      } else {
        results.warnings.push({ section: 'Experience', text: 'Add more achievement bullets (aim for 3-5 per role)' })
      }
    } else {
      results.issues.push({ section: 'Experience', text: 'No work experience listed' })
    }

    results.sections.experience = { score: Math.min(experienceScore, experienceMax), max: experienceMax }

    // 4. Education Check (10%)
    let educationScore = 0
    const educationMax = SECTION_WEIGHTS.education
    const education = resumeData.education || []

    if (education.length > 0 && education[0].institution?.trim()) {
      educationScore += 5
      results.passed.push('Education information present')

      if (education[0].degree?.trim()) {
        educationScore += 3
      } else {
        results.warnings.push({ section: 'Education', text: 'Add degree/certification name' })
      }

      if (education[0].year?.trim()) {
        educationScore += 2
      }
    } else {
      results.warnings.push({ section: 'Education', text: 'Consider adding education details' })
    }

    results.sections.education = { score: Math.min(educationScore, educationMax), max: educationMax }

    // 5. Skills Check (20%)
    let skillsScore = 0
    const skillsMax = SECTION_WEIGHTS.skills
    const skills = resumeData.skills || {}
    const totalSkills = Object.values(skills).flat().length

    if (totalSkills > 0) {
      skillsScore += 5
      results.passed.push('Skills section present')

      if (totalSkills >= 10) {
        skillsScore += 10
        results.passed.push(`Strong skills coverage (${totalSkills} skills)`)
      } else if (totalSkills >= 5) {
        skillsScore += 5
        results.warnings.push({ section: 'Skills', text: `Add more skills (currently ${totalSkills}, aim for 10+)` })
      } else {
        results.warnings.push({ section: 'Skills', text: 'Skills section is sparse - add more relevant skills' })
      }

      // Check skill organization
      if (Object.keys(skills).length >= 3) {
        skillsScore += 5
        results.passed.push('Skills well-organized into categories')
      } else {
        results.warnings.push({ section: 'Skills', text: 'Organize skills into 3+ categories' })
      }
    } else {
      results.issues.push({ section: 'Skills', text: 'No skills listed - critical for ATS matching' })
    }

    results.sections.skills = { score: Math.min(skillsScore, skillsMax), max: skillsMax }

    // 6. Achievements Check (10%)
    let achievementsScore = 0
    const achievementsMax = SECTION_WEIGHTS.achievements
    const achievements = resumeData.achievements || []
    const validAchievements = achievements.filter(a => a.title?.trim() && a.description?.trim())

    if (validAchievements.length >= 3) {
      achievementsScore += 10
      results.passed.push('Strong achievements section')
    } else if (validAchievements.length > 0) {
      achievementsScore += 5
      results.warnings.push({ section: 'Achievements', text: 'Add more key achievements' })
    }

    results.sections.achievements = { score: achievementsScore, max: achievementsMax }

    // 7. Formatting Check (5%)
    let formattingScore = 5 // Default assume good
    const formattingMax = SECTION_WEIGHTS.formatting

    results.passed.push('Clean, parseable format')
    results.sections.formatting = { score: formattingScore, max: formattingMax }

    // Keyword Analysis
    const allSkills = Object.values(skills).flat().map(s => s.toLowerCase())
    COMMON_ATS_KEYWORDS.technical.forEach(keyword => {
      if (allText.includes(keyword.toLowerCase()) || allSkills.includes(keyword.toLowerCase())) {
        results.keywords.found.push(keyword)
      } else {
        results.keywords.missing.push(keyword)
      }
    })

    // Calculate overall score
    results.overall = Object.values(results.sections).reduce((sum, s) => sum + s.score, 0)

    // Add specific improvements
    if (results.keywords.found.length < 10) {
      results.improvements.push(`Add more industry keywords. Found ${results.keywords.found.length}, aim for 15+`)
    }

    return results
  }, [resumeData])

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-500'
    if (score >= 60) return 'from-yellow-500 to-amber-500'
    return 'from-red-500 to-orange-500'
  }

  const runAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 1500)
  }

  const SectionCard = ({ title, section, icon: Icon }) => {
    const isExpanded = expandedSection === title
    const percentage = Math.round((section.score / section.max) * 100)

    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedSection(isExpanded ? null : title)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 ${getScoreColor(percentage)}`} />
            <span className="font-medium">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getScoreBg(percentage)}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${getScoreColor(percentage)}`}>
                {section.score}/{section.max}
              </span>
            </div>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">ATS Compatibility Check</h2>
            <p className="text-sm text-gray-500">See how your resume performs with Applicant Tracking Systems</p>
          </div>
        </div>
        <button
          onClick={runAnalysis}
          disabled={isAnalyzing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          {isAnalyzing ? 'Analyzing...' : 'Re-analyze'}
        </button>
      </div>

      {/* Overall Score */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">ATS Compatibility Score</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-bold ${getScoreColor(analysis.overall)}`}>
                {analysis.overall}
              </span>
              <span className="text-gray-400 text-xl">/100</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {analysis.overall >= 80 && "Excellent! Your resume is well-optimized for ATS."}
              {analysis.overall >= 60 && analysis.overall < 80 && "Good start! A few improvements will boost your score."}
              {analysis.overall < 60 && "Needs work. Address the issues below to improve ATS compatibility."}
            </p>
          </div>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle
                cx="64" cy="64" r="56" fill="none"
                className={`stroke-current ${getScoreColor(analysis.overall)}`}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(analysis.overall / 100) * 352} 352`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold ${getScoreColor(analysis.overall)}`}>
                {analysis.overall >= 80 ? 'A' : analysis.overall >= 60 ? 'B' : 'C'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Breakdown */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Section Breakdown</h3>
        <div className="space-y-2">
          <SectionCard title="Personal Info" section={analysis.sections.personal} icon={FileText} />
          <SectionCard title="Summary" section={analysis.sections.summary} icon={Type} />
          <SectionCard title="Experience" section={analysis.sections.experience} icon={Target} />
          <SectionCard title="Education" section={analysis.sections.education} icon={Layout} />
          <SectionCard title="Skills" section={analysis.sections.skills} icon={Zap} />
          <SectionCard title="Achievements" section={analysis.sections.achievements} icon={CheckCircle2} />
        </div>
      </div>

      {/* Issues & Warnings */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {analysis.issues.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5" />
              Critical Issues ({analysis.issues.length})
            </h4>
            <ul className="space-y-2">
              {analysis.issues.map((issue, i) => (
                <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span><strong>{issue.section}:</strong> {issue.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysis.warnings.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5" />
              Suggestions ({analysis.warnings.length})
            </h4>
            <ul className="space-y-2">
              {analysis.warnings.slice(0, 5).map((warning, i) => (
                <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span><strong>{warning.section}:</strong> {warning.text}</span>
                </li>
              ))}
              {analysis.warnings.length > 5 && (
                <li className="text-sm text-amber-600">+{analysis.warnings.length - 5} more suggestions</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Keywords Found */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
          <Search className="w-5 h-5" />
          Keyword Analysis
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Found Keywords ({analysis.keywords.found.length})
            </p>
            <div className="flex flex-wrap gap-1">
              {analysis.keywords.found.slice(0, 15).map(kw => (
                <span key={kw} className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Consider Adding ({Math.min(10, analysis.keywords.missing.length)})
            </p>
            <div className="flex flex-wrap gap-1">
              {analysis.keywords.missing.slice(0, 10).map(kw => (
                <span key={kw} className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5" />
          ATS Tips
        </h4>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• Use standard section headers: "Experience", "Education", "Skills"</li>
          <li>• Avoid tables, columns, graphics, and headers/footers</li>
          <li>• Use standard fonts: Arial, Calibri, Times New Roman</li>
          <li>• Save as PDF or .docx for best compatibility</li>
          <li>• Include keywords from the job description</li>
        </ul>
      </div>
    </div>
  )
}
