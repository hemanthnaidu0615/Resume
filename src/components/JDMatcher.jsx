import { useState, useMemo } from 'react'
import { useResume } from '../context/ResumeContext'
import {
  Target, CheckCircle2, XCircle, AlertTriangle, Clipboard,
  Sparkles, TrendingUp, Lightbulb, Copy, ArrowRight
} from 'lucide-react'

// Common tech keywords to look for
const KEYWORD_CATEGORIES = {
  languages: ['javascript', 'typescript', 'python', 'java', 'go', 'rust', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin', 'scala'],
  frontend: ['react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt', 'html', 'css', 'sass', 'tailwind', 'bootstrap', 'redux', 'webpack', 'vite'],
  backend: ['node', 'express', 'django', 'flask', 'spring', 'fastapi', 'rails', 'laravel', '.net', 'graphql', 'rest', 'api'],
  database: ['sql', 'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'dynamodb', 'firebase', 'oracle', 'cassandra'],
  cloud: ['aws', 'azure', 'gcp', 'cloud', 'ec2', 's3', 'lambda', 'kubernetes', 'docker', 'terraform', 'cloudformation'],
  devops: ['ci/cd', 'jenkins', 'github actions', 'gitlab', 'devops', 'linux', 'bash', 'ansible', 'puppet'],
  methodologies: ['agile', 'scrum', 'kanban', 'waterfall', 'lean', 'tdd', 'bdd'],
  soft_skills: ['leadership', 'communication', 'team', 'collaborate', 'mentor', 'problem-solving', 'analytical']
}

export default function JDMatcher() {
  const { resumeData } = useResume()
  const [jobDescription, setJobDescription] = useState('')
  const [hasAnalyzed, setHasAnalyzed] = useState(false)

  const analysis = useMemo(() => {
    if (!jobDescription.trim()) return null

    const jdLower = jobDescription.toLowerCase()
    const results = {
      matchScore: 0,
      matchedKeywords: [],
      missingKeywords: [],
      strongMatches: [],
      suggestions: [],
      categoryScores: {}
    }

    // Get all resume content as searchable text
    const getResumeText = () => {
      let text = ''
      text += resumeData.personal?.name || ''
      text += ' ' + (resumeData.personal?.title || '')
      text += ' ' + (resumeData.personal?.summary || '')

      resumeData.experience?.forEach(exp => {
        text += ' ' + (exp.company || '')
        text += ' ' + (exp.position || '')
        exp.achievements?.forEach(ach => {
          text += ' ' + (typeof ach === 'string' ? ach : '')
        })
        exp.projects?.forEach(proj => {
          text += ' ' + (proj.name || '')
          text += ' ' + (proj.description || '')
          text += ' ' + (proj.techStack?.join(' ') || '')
          proj.achievements?.forEach(a => text += ' ' + a)
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

    const resumeText = getResumeText()

    // Extract keywords from JD
    const extractKeywords = (text) => {
      const words = new Set()
      const lowerText = text.toLowerCase()

      // Check each category
      Object.entries(KEYWORD_CATEGORIES).forEach(([category, keywords]) => {
        keywords.forEach(keyword => {
          if (lowerText.includes(keyword)) {
            words.add({ keyword, category })
          }
        })
      })

      // Also extract years of experience requirements
      const yearsMatch = text.match(/(\d+)\+?\s*years?/gi)
      if (yearsMatch) {
        yearsMatch.forEach(match => {
          words.add({ keyword: match, category: 'experience' })
        })
      }

      return Array.from(words)
    }

    const jdKeywords = extractKeywords(jobDescription)

    // Check which keywords are in resume
    jdKeywords.forEach(({ keyword, category }) => {
      if (resumeText.includes(keyword.toLowerCase())) {
        results.matchedKeywords.push({ keyword, category })

        // Track category scores
        if (!results.categoryScores[category]) {
          results.categoryScores[category] = { matched: 0, total: 0 }
        }
        results.categoryScores[category].matched++
        results.categoryScores[category].total++
      } else {
        results.missingKeywords.push({ keyword, category })

        if (!results.categoryScores[category]) {
          results.categoryScores[category] = { matched: 0, total: 0 }
        }
        results.categoryScores[category].total++
      }
    })

    // Calculate match score
    const totalKeywords = jdKeywords.length
    if (totalKeywords > 0) {
      results.matchScore = Math.round((results.matchedKeywords.length / totalKeywords) * 100)
    }

    // Identify strong matches (skills that appear multiple times or are emphasized)
    results.matchedKeywords.forEach(({ keyword }) => {
      const jdCount = (jdLower.match(new RegExp(keyword.toLowerCase(), 'g')) || []).length
      if (jdCount >= 2) {
        results.strongMatches.push(keyword)
      }
    })

    // Generate suggestions
    if (results.missingKeywords.length > 0) {
      const topMissing = results.missingKeywords.slice(0, 5)
      topMissing.forEach(({ keyword, category }) => {
        results.suggestions.push({
          type: 'add_skill',
          keyword,
          category,
          message: `Consider adding "${keyword}" to your ${category} skills if you have experience with it`
        })
      })
    }

    if (results.matchScore < 60) {
      results.suggestions.push({
        type: 'general',
        message: 'Your resume may need significant tailoring for this role'
      })
    }

    return results
  }, [jobDescription, resumeData])

  const handleAnalyze = () => {
    if (jobDescription.trim()) {
      setHasAnalyzed(true)
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setJobDescription(text)
    } catch (err) {
      console.error('Failed to read clipboard')
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    if (score >= 40) return 'text-orange-500'
    return 'text-red-500'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-500'
    if (score >= 60) return 'from-yellow-500 to-amber-500'
    if (score >= 40) return 'from-orange-500 to-amber-500'
    return 'from-red-500 to-orange-500'
  }

  const getCategoryLabel = (category) => {
    const labels = {
      languages: 'Programming Languages',
      frontend: 'Frontend Technologies',
      backend: 'Backend Technologies',
      database: 'Databases',
      cloud: 'Cloud & Infrastructure',
      devops: 'DevOps',
      methodologies: 'Methodologies',
      soft_skills: 'Soft Skills',
      experience: 'Experience Requirements'
    }
    return labels[category] || category
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Target className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Job Description Matcher</h2>
          <p className="text-sm text-gray-500">See how well your resume matches a specific job</p>
        </div>
      </div>

      {/* Job Description Input */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="font-medium text-gray-700">Paste Job Description</label>
          <button
            onClick={handlePaste}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Clipboard className="w-4 h-4" />
            Paste from clipboard
          </button>
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => {
            setJobDescription(e.target.value)
            setHasAnalyzed(false)
          }}
          placeholder="Paste the full job description here to analyze keyword match..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-500">
            {jobDescription.length} characters
          </span>
          <button
            onClick={handleAnalyze}
            disabled={!jobDescription.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" />
            Analyze Match
          </button>
        </div>
      </div>

      {/* Results */}
      {hasAnalyzed && analysis && (
        <div className="space-y-6 animate-fadeIn">
          {/* Match Score */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Job Match Score</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-bold ${getScoreColor(analysis.matchScore)}`}>
                    {analysis.matchScore}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {analysis.matchScore >= 80 && "Excellent match! Your resume aligns well with this role."}
                  {analysis.matchScore >= 60 && analysis.matchScore < 80 && "Good match! Consider adding a few missing keywords."}
                  {analysis.matchScore >= 40 && analysis.matchScore < 60 && "Partial match. Tailor your resume to improve."}
                  {analysis.matchScore < 40 && "Low match. Significant tailoring recommended."}
                </p>
              </div>
              <div className="relative w-28 h-28">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="48" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="56" cy="56" r="48" fill="none"
                    className={`stroke-current ${getScoreColor(analysis.matchScore)}`}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(analysis.matchScore / 100) * 302} 302`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className={`w-8 h-8 ${getScoreColor(analysis.matchScore)}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          {Object.keys(analysis.categoryScores).length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Category Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {Object.entries(analysis.categoryScores).map(([category, scores]) => {
                  const percentage = scores.total > 0 ? Math.round((scores.matched / scores.total) * 100) : 0
                  return (
                    <div key={category} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{getCategoryLabel(category)}</span>
                        <span className={`text-sm font-medium ${getScoreColor(percentage)}`}>
                          {scores.matched}/{scores.total}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getScoreBg(percentage)}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Matched Keywords */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5" />
                Matched Keywords ({analysis.matchedKeywords.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.matchedKeywords.map(({ keyword }, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded text-sm ${
                      analysis.strongMatches.includes(keyword)
                        ? 'bg-green-200 text-green-800 font-medium'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {keyword}
                    {analysis.strongMatches.includes(keyword) && ' *'}
                  </span>
                ))}
                {analysis.matchedKeywords.length === 0 && (
                  <p className="text-green-600 text-sm">No matching keywords found</p>
                )}
              </div>
              {analysis.strongMatches.length > 0 && (
                <p className="text-xs text-green-600 mt-2">* Emphasized in job description</p>
              )}
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5" />
                Missing Keywords ({analysis.missingKeywords.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.slice(0, 15).map(({ keyword }, i) => (
                  <span key={i} className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm">
                    {keyword}
                  </span>
                ))}
                {analysis.missingKeywords.length > 15 && (
                  <span className="text-red-600 text-sm">+{analysis.missingKeywords.length - 15} more</span>
                )}
                {analysis.missingKeywords.length === 0 && (
                  <p className="text-red-600 text-sm">Great! All keywords are covered</p>
                )}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5" />
                Improvement Suggestions
              </h4>
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion, i) => (
                  <li key={i} className="text-sm text-blue-700 flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {suggestion.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <button
              onClick={() => {
                const text = analysis.missingKeywords.map(k => k.keyword).join(', ')
                navigator.clipboard.writeText(text)
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Copy className="w-4 h-4" />
              Copy missing keywords
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!hasAnalyzed && (
        <div className="text-center py-8 text-gray-500">
          <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Paste a job description above to see how well your resume matches</p>
        </div>
      )}
    </div>
  )
}
