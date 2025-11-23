import { useState, useMemo } from 'react'
import { useResume } from '../context/ResumeContext'
import {
  Zap, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw,
  Wand2, Target, TrendingUp, FileText, Lightbulb
} from 'lucide-react'

// Weak phrases and their strong replacements
const WEAK_PHRASES = {
  'responsible for': 'Led',
  'worked on': 'Delivered',
  'helped with': 'Contributed to',
  'was involved in': 'Drove',
  'assisted in': 'Supported',
  'participated in': 'Engaged in',
  'handled': 'Managed',
  'dealt with': 'Resolved',
  'in charge of': 'Directed',
  'tasked with': 'Executed',
}

// Vague words to avoid
const VAGUE_WORDS = ['various', 'several', 'many', 'some', 'things', 'stuff', 'good', 'great', 'nice', 'helped']

// Action verbs by impact level
const STRONG_VERBS = {
  high: ['Led', 'Drove', 'Spearheaded', 'Pioneered', 'Transformed', 'Revolutionized'],
  medium: ['Developed', 'Implemented', 'Designed', 'Built', 'Created', 'Launched'],
  low: ['Assisted', 'Supported', 'Contributed', 'Participated', 'Helped']
}

export default function ContentOptimizer() {
  const { resumeData, updatePersonal, updateSection } = useResume()
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [appliedSuggestions, setAppliedSuggestions] = useState(new Set())

  // Analyze the resume and generate suggestions
  const analysis = useMemo(() => {
    const suggestions = []
    let improvementScore = 0
    const maxScore = 100

    // Analyze Summary
    const summary = resumeData.personal?.summary || ''
    if (summary) {
      // Check length
      if (summary.length < 100) {
        suggestions.push({
          id: 'summary-short',
          section: 'Summary',
          type: 'length',
          severity: 'warning',
          current: summary,
          suggestion: 'Your summary is too short. Aim for 100-300 characters to provide enough context.',
          action: null
        })
      } else {
        improvementScore += 10
      }

      // Check for first person
      if (summary.match(/\b(I|my|me)\b/gi)) {
        suggestions.push({
          id: 'summary-firstperson',
          section: 'Summary',
          type: 'style',
          severity: 'info',
          current: summary.substring(0, 100) + '...',
          suggestion: 'Consider removing first-person pronouns (I, my, me) for a more professional tone.',
          action: null
        })
      }

      // Check for quantified achievements in summary
      if (!summary.match(/\d+/)) {
        suggestions.push({
          id: 'summary-metrics',
          section: 'Summary',
          type: 'impact',
          severity: 'warning',
          current: summary.substring(0, 100) + '...',
          suggestion: 'Add quantified achievements to your summary (e.g., "5+ years experience", "led team of 10").',
          action: null
        })
      } else {
        improvementScore += 10
      }
    }

    // Analyze Experience
    const experience = resumeData.experience || []
    experience.forEach((exp, expIndex) => {
      // Check for projects/achievements
      const hasContent = exp.projects?.length > 0 || exp.achievements?.length > 0
      if (!hasContent) {
        suggestions.push({
          id: `exp-${expIndex}-empty`,
          section: `Experience: ${exp.company || 'Unknown'}`,
          type: 'content',
          severity: 'error',
          current: `${exp.position} at ${exp.company}`,
          suggestion: 'Add achievements or projects to this role. Empty experience entries hurt your resume.',
          action: null
        })
      } else {
        improvementScore += 15 / experience.length

        // Analyze achievements
        const allAchievements = [
          ...(exp.achievements || []),
          ...(exp.projects?.flatMap(p => p.achievements || []) || [])
        ]

        allAchievements.forEach((ach, achIndex) => {
          const achText = typeof ach === 'string' ? ach : ''
          if (!achText) return

          // Check for weak phrases
          Object.entries(WEAK_PHRASES).forEach(([weak, strong]) => {
            if (achText.toLowerCase().includes(weak)) {
              const improved = achText.replace(new RegExp(weak, 'gi'), strong)
              suggestions.push({
                id: `exp-${expIndex}-ach-${achIndex}-weak`,
                section: `Experience: ${exp.company}`,
                type: 'language',
                severity: 'warning',
                current: achText,
                improved: improved,
                suggestion: `Replace "${weak}" with stronger action verb "${strong}"`,
                action: { expIndex, achIndex, newText: improved }
              })
            }
          })

          // Check for metrics
          if (!achText.match(/\d+%|\$[\d,]+|\d+x|\d+ (users|team|developers|hours|days|months|projects)/i)) {
            suggestions.push({
              id: `exp-${expIndex}-ach-${achIndex}-metrics`,
              section: `Experience: ${exp.company}`,
              type: 'impact',
              severity: 'info',
              current: achText,
              suggestion: 'Add quantifiable metrics (percentages, dollar amounts, team sizes, time saved).',
              action: null
            })
          } else {
            improvementScore += 5 / allAchievements.length
          }

          // Check for vague words
          VAGUE_WORDS.forEach(word => {
            if (achText.toLowerCase().includes(word)) {
              suggestions.push({
                id: `exp-${expIndex}-ach-${achIndex}-vague-${word}`,
                section: `Experience: ${exp.company}`,
                type: 'language',
                severity: 'info',
                current: achText,
                suggestion: `"${word}" is vague. Be more specific about what you did and the impact.`,
                action: null
              })
            }
          })

          // Check if starts with action verb
          const firstWord = achText.split(' ')[0]
          const isActionVerb = Object.values(STRONG_VERBS).flat().some(
            v => v.toLowerCase() === firstWord?.toLowerCase()
          )
          if (!isActionVerb && achText.length > 10) {
            suggestions.push({
              id: `exp-${expIndex}-ach-${achIndex}-verb`,
              section: `Experience: ${exp.company}`,
              type: 'structure',
              severity: 'info',
              current: achText,
              suggestion: 'Start with a strong action verb (Led, Built, Developed, Implemented, etc.).',
              action: null
            })
          } else if (isActionVerb) {
            improvementScore += 3 / allAchievements.length
          }
        })
      }
    })

    // Analyze Skills
    const skills = resumeData.skills || {}
    const totalSkills = Object.values(skills).flat().length
    if (totalSkills < 10) {
      suggestions.push({
        id: 'skills-count',
        section: 'Skills',
        type: 'content',
        severity: 'warning',
        current: `${totalSkills} skills listed`,
        suggestion: 'Add more relevant skills. Aim for 15-25 skills organized by category.',
        action: null
      })
    } else {
      improvementScore += 15
    }

    if (Object.keys(skills).length < 3) {
      suggestions.push({
        id: 'skills-categories',
        section: 'Skills',
        type: 'structure',
        severity: 'info',
        current: `${Object.keys(skills).length} categories`,
        suggestion: 'Organize skills into more categories (Frontend, Backend, Tools, etc.) for better readability.',
        action: null
      })
    } else {
      improvementScore += 10
    }

    // Analyze Education
    const education = resumeData.education || []
    if (education.length === 0 || !education[0].degree) {
      suggestions.push({
        id: 'education-missing',
        section: 'Education',
        type: 'content',
        severity: 'warning',
        current: 'No education listed',
        suggestion: 'Add your educational background. Even bootcamps and certifications count.',
        action: null
      })
    } else {
      improvementScore += 10
    }

    return {
      suggestions: suggestions.sort((a, b) => {
        const severityOrder = { error: 0, warning: 1, info: 2 }
        return severityOrder[a.severity] - severityOrder[b.severity]
      }),
      score: Math.min(Math.round(improvementScore), maxScore),
      totalIssues: suggestions.length,
      byType: suggestions.reduce((acc, s) => {
        acc[s.type] = (acc[s.type] || 0) + 1
        return acc
      }, {})
    }
  }, [resumeData])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'text-red-500 bg-red-50 border-red-200'
      case 'warning': return 'text-amber-500 bg-amber-50 border-amber-200'
      case 'info': return 'text-blue-500 bg-blue-50 border-blue-200'
      default: return 'text-gray-500 bg-gray-50 border-gray-200'
    }
  }

  const runOptimization = () => {
    setIsOptimizing(true)
    setTimeout(() => setIsOptimizing(false), 1000)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Content Optimizer</h2>
            <p className="text-sm text-gray-500">AI-powered suggestions to improve your resume</p>
          </div>
        </div>
        <button
          onClick={runOptimization}
          disabled={isOptimizing}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
          {isOptimizing ? 'Analyzing...' : 'Re-analyze'}
        </button>
      </div>

      {/* Score Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Optimization Score</p>
              <p className="text-4xl font-bold text-gray-900">{analysis.score}<span className="text-lg text-gray-400">/100</span></p>
            </div>
            <div className="w-20 h-20 relative">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="36" fill="none"
                  stroke={analysis.score >= 70 ? '#10b981' : analysis.score >= 50 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(analysis.score / 100) * 226} 226`}
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-4">
          <AlertTriangle className="w-5 h-5 text-amber-500 mb-2" />
          <p className="text-2xl font-bold text-amber-700">{analysis.suggestions.filter(s => s.severity === 'warning').length}</p>
          <p className="text-sm text-amber-600">Warnings</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <Lightbulb className="w-5 h-5 text-blue-500 mb-2" />
          <p className="text-2xl font-bold text-blue-700">{analysis.suggestions.filter(s => s.severity === 'info').length}</p>
          <p className="text-sm text-blue-600">Suggestions</p>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-emerald-500" />
          Improvement Suggestions ({analysis.totalIssues})
        </h3>

        {analysis.suggestions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-emerald-500" />
            <p>Your resume is well-optimized! No major issues found.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {analysis.suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={`p-4 rounded-lg border ${getSeverityColor(suggestion.severity)} ${
                  appliedSuggestions.has(suggestion.id) ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-white/50">
                        {suggestion.section}
                      </span>
                      <span className="text-xs opacity-75">{suggestion.type}</span>
                    </div>
                    <p className="text-sm font-medium">{suggestion.suggestion}</p>
                    {suggestion.current && (
                      <p className="text-xs mt-1 opacity-75 line-clamp-2">
                        Current: "{suggestion.current}"
                      </p>
                    )}
                    {suggestion.improved && (
                      <p className="text-xs mt-1 text-emerald-700 font-medium">
                        Suggested: "{suggestion.improved}"
                      </p>
                    )}
                  </div>
                  {suggestion.action && !appliedSuggestions.has(suggestion.id) && (
                    <button
                      onClick={() => {
                        // Apply the suggestion
                        setAppliedSuggestions(prev => new Set([...prev, suggestion.id]))
                      }}
                      className="ml-4 px-3 py-1 text-xs font-medium bg-white rounded hover:bg-gray-50 flex items-center gap-1"
                    >
                      Apply <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          Quick Optimization Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
            <TrendingUp className="w-4 h-4 text-emerald-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Add Metrics</p>
              <p className="text-gray-600">Quantify achievements with numbers, percentages, and dollar amounts.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
            <FileText className="w-4 h-4 text-emerald-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Use Action Verbs</p>
              <p className="text-gray-600">Start bullets with Led, Built, Developed, Improved, etc.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
