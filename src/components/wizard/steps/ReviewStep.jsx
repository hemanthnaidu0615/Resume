import { useState, useMemo } from 'react'
import { useResume } from '../../../context/ResumeContext'
import { Check, AlertTriangle, ChevronLeft, Sparkles, FileText, Eye, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'

export default function ReviewStep({ data, onComplete, onPrev }) {
  const { resumeData } = useResume()
  const [isReviewing, setIsReviewing] = useState(false)

  // Calculate resume score and issues
  const analysis = useMemo(() => {
    const issues = []
    const warnings = []
    const good = []
    let score = 0
    const maxScore = 100

    // Personal Info Checks (20 points)
    if (resumeData.personal.name?.trim()) {
      score += 5
      good.push('Name provided')
    } else {
      issues.push('Missing name')
    }

    if (resumeData.personal.email?.trim()) {
      if (resumeData.personal.email.includes('@gmail.com') || resumeData.personal.email.includes('@outlook.com')) {
        score += 5
        good.push('Professional email format')
      } else {
        score += 3
        warnings.push('Consider using a common email provider for better deliverability')
      }
    } else {
      issues.push('Missing email')
    }

    if (resumeData.personal.phone?.trim()) {
      score += 3
      good.push('Phone number provided')
    } else {
      warnings.push('Missing phone number')
    }

    if (resumeData.personal.summary?.trim()) {
      const summaryLength = resumeData.personal.summary.length
      if (summaryLength >= 100 && summaryLength <= 500) {
        score += 7
        good.push('Good summary length')
      } else if (summaryLength < 100) {
        score += 3
        warnings.push('Summary is too short (aim for 100-500 characters)')
      } else {
        score += 4
        warnings.push('Summary is too long (aim for 100-500 characters)')
      }
    } else {
      issues.push('Missing professional summary')
    }

    // Experience Checks (30 points)
    const experiences = resumeData.experience || []
    if (experiences.length > 0) {
      score += 10
      good.push(`${experiences.length} work experience(s) listed`)

      let hasAchievements = false
      let hasMetrics = false
      experiences.forEach(exp => {
        if (exp.achievements?.length > 0) {
          hasAchievements = true
          exp.achievements.forEach(ach => {
            if (/\d+%|\$\d+|\d+ (users|customers|team|developers|months|years|hours|days)/i.test(ach)) {
              hasMetrics = true
            }
          })
        }
      })

      if (hasAchievements) {
        score += 10
        good.push('Achievements listed for experience')
      } else {
        issues.push('Add achievements to your work experience')
      }

      if (hasMetrics) {
        score += 10
        good.push('Quantified achievements with metrics')
      } else {
        warnings.push('Add metrics to your achievements (numbers, percentages, dollar amounts)')
      }
    } else {
      issues.push('No work experience listed')
    }

    // Education Checks (10 points)
    const education = resumeData.education || []
    if (education.length > 0 && education[0].institution?.trim()) {
      score += 10
      good.push('Education information provided')
    } else {
      if (data.experienceLevel === 'student' || data.experienceLevel === 'entry') {
        issues.push('Education is crucial for entry-level candidates')
      } else {
        warnings.push('Consider adding education details')
      }
    }

    // Skills Checks (20 points)
    const skills = resumeData.skills || {}
    const totalSkills = Object.values(skills).flat().length
    if (totalSkills >= 10) {
      score += 20
      good.push(`${totalSkills} skills listed`)
    } else if (totalSkills >= 5) {
      score += 10
      warnings.push('Add more skills (aim for 10-20)')
    } else if (totalSkills > 0) {
      score += 5
      warnings.push('Skills section is sparse (aim for 10-20 skills)')
    } else {
      issues.push('No skills listed')
    }

    // Achievements Checks (10 points)
    const achievements = resumeData.achievements || []
    const validAchievements = achievements.filter(a => a.title?.trim() && a.description?.trim())
    if (validAchievements.length >= 3) {
      score += 10
      good.push('Strong achievements section')
    } else if (validAchievements.length > 0) {
      score += 5
      warnings.push('Add more key achievements')
    } else {
      warnings.push('Consider adding key achievements')
    }

    // Links Checks (10 points)
    if (resumeData.personal.linkedin?.trim() && !resumeData.personal.linkedin.includes('yourprofile')) {
      score += 5
      good.push('LinkedIn profile linked')
    } else {
      warnings.push('Add your LinkedIn profile URL')
    }

    if (resumeData.personal.github?.trim()) {
      score += 5
      good.push('GitHub profile linked')
    } else if (['frontend', 'backend', 'fullstack', 'devops'].includes(data.targetRole)) {
      warnings.push('GitHub is valuable for technical roles')
    }

    return {
      score: Math.min(score, maxScore),
      issues,
      warnings,
      good,
      grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'
    }
  }, [resumeData, data])

  const handleComplete = () => {
    setIsReviewing(true)
    setTimeout(() => {
      onComplete()
    }, 1500)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getGradeColor = (grade) => {
    if (grade === 'A') return 'from-green-500 to-emerald-500'
    if (grade === 'B') return 'from-blue-500 to-cyan-500'
    if (grade === 'C') return 'from-yellow-500 to-amber-500'
    return 'from-red-500 to-orange-500'
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Resume Review</h2>
        <p className="text-slate-400">Let's make sure your resume is ready to impress</p>
      </div>

      {/* Score Card */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Resume Score</h3>
            <p className="text-slate-400 text-sm">Based on completeness and best practices</p>
          </div>
          <div className="text-right">
            <div className={`text-5xl font-bold ${getScoreColor(analysis.score)}`}>
              {analysis.score}
            </div>
            <div className="text-slate-400 text-sm">out of 100</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full bg-gradient-to-r ${getGradeColor(analysis.grade)} transition-all duration-1000`}
            style={{ width: `${analysis.score}%` }}
          />
        </div>

        {/* Grade */}
        <div className="flex items-center justify-center gap-4">
          <span className={`
            inline-flex items-center justify-center w-12 h-12 rounded-full
            bg-gradient-to-br ${getGradeColor(analysis.grade)} text-white text-xl font-bold
          `}>
            {analysis.grade}
          </span>
          <span className="text-slate-300">
            {analysis.score >= 80 && "Great job! Your resume is well-structured."}
            {analysis.score >= 60 && analysis.score < 80 && "Good start! A few improvements will make it stronger."}
            {analysis.score < 60 && "Your resume needs more work. Check the issues below."}
          </span>
        </div>
      </div>

      {/* Issues & Recommendations */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Critical Issues */}
        {analysis.issues.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <h4 className="font-semibold text-red-400 flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5" />
              Issues ({analysis.issues.length})
            </h4>
            <ul className="space-y-2">
              {analysis.issues.map((issue, i) => (
                <li key={i} className="text-red-300 text-sm flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings */}
        {analysis.warnings.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <h4 className="font-semibold text-amber-400 flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5" />
              Suggestions ({analysis.warnings.length})
            </h4>
            <ul className="space-y-2">
              {analysis.warnings.map((warning, i) => (
                <li key={i} className="text-amber-300 text-sm flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* What's Good */}
        {analysis.good.length > 0 && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <h4 className="font-semibold text-green-400 flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5" />
              Looking Good ({analysis.good.length})
            </h4>
            <ul className="space-y-2">
              {analysis.good.map((item, i) => (
                <li key={i} className="text-green-300 text-sm flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Resume Summary */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-400" />
          Resume Summary
        </h3>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Name:</span>
              <span className="text-white">{resumeData.personal.name || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Title:</span>
              <span className="text-white">{resumeData.personal.title || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Target Role:</span>
              <span className="text-white capitalize">{data.targetRole || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Experience Level:</span>
              <span className="text-white capitalize">{data.experienceLevel || 'Not set'}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Work Experiences:</span>
              <span className="text-white">{resumeData.experience?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Education Entries:</span>
              <span className="text-white">{resumeData.education?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Skills:</span>
              <span className="text-white">{Object.values(resumeData.skills || {}).flat().length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Achievements:</span>
              <span className="text-white">{resumeData.achievements?.filter(a => a.title).length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Edit
        </button>

        <div className="flex items-center gap-4">
          {analysis.issues.length > 0 && (
            <span className="text-amber-400 text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {analysis.issues.length} issues to fix
            </span>
          )}

          <button
            onClick={handleComplete}
            disabled={isReviewing}
            className={`
              flex items-center gap-2 px-8 py-3 font-semibold rounded-xl transition-all
              ${isReviewing
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90'
              }
            `}
          >
            {isReviewing ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                Finishing up...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Complete & View Resume
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
