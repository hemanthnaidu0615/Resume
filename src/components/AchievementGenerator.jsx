import { useState } from 'react'
import { Wand2, Copy, Check, RefreshCw, Lightbulb, Target, ArrowRight, Sparkles } from 'lucide-react'

const ACTION_VERBS = {
  leadership: ['Led', 'Directed', 'Managed', 'Supervised', 'Mentored', 'Coordinated', 'Guided', 'Oversaw'],
  creation: ['Built', 'Created', 'Designed', 'Developed', 'Established', 'Implemented', 'Launched', 'Architected'],
  improvement: ['Improved', 'Enhanced', 'Optimized', 'Streamlined', 'Transformed', 'Modernized', 'Upgraded', 'Revamped'],
  achievement: ['Achieved', 'Exceeded', 'Delivered', 'Accomplished', 'Attained', 'Surpassed', 'Completed'],
  analysis: ['Analyzed', 'Assessed', 'Evaluated', 'Identified', 'Investigated', 'Researched', 'Diagnosed'],
  collaboration: ['Collaborated', 'Partnered', 'Coordinated', 'Facilitated', 'Liaised', 'Aligned']
}

const METRICS = {
  percentage: ['10%', '20%', '30%', '40%', '50%', '60%', '80%'],
  time: ['2x faster', '3x faster', '50% faster', 'from 3 days to 4 hours', 'from weeks to days'],
  scale: ['100+', '500+', '1000+', '10K+', '100K+', '1M+'],
  money: ['$10K', '$50K', '$100K', '$500K', '$1M'],
  team: ['3', '5', '7', '10', '15', '20']
}

const TEMPLATES = [
  {
    category: 'Performance Improvement',
    template: '[Verb] [what] resulting in [X]% improvement in [metric]',
    examples: [
      'Optimized database queries resulting in 60% improvement in API response time',
      'Streamlined CI/CD pipeline resulting in 80% faster deployment cycles',
      'Enhanced caching strategy resulting in 40% reduction in server costs'
    ]
  },
  {
    category: 'Project Delivery',
    template: '[Verb] [project/feature] that [impact] for [scale] users/customers',
    examples: [
      'Built real-time notification system that improved user engagement for 500K+ users',
      'Delivered payment integration that enabled $2M in monthly transactions',
      'Launched mobile app feature that increased daily active users by 35%'
    ]
  },
  {
    category: 'Team Leadership',
    template: '[Verb] team of [X] to [achievement], resulting in [outcome]',
    examples: [
      'Led team of 7 developers to deliver enterprise platform, resulting in $5M contract',
      'Mentored 5 junior engineers, with 3 promoted within 18 months',
      'Managed cross-functional team of 12 to launch product 2 weeks ahead of schedule'
    ]
  },
  {
    category: 'Cost Reduction',
    template: '[Verb] [process/system] reducing [cost/time] by [X]%',
    examples: [
      'Automated testing pipeline reducing QA time by 70%',
      'Implemented caching layer reducing cloud infrastructure costs by $50K annually',
      'Refactored legacy code reducing maintenance overhead by 40%'
    ]
  },
  {
    category: 'Technical Migration',
    template: '[Verb] [system] from [old] to [new], improving [metric] by [X]%',
    examples: [
      'Migrated monolithic application to microservices, improving scalability by 300%',
      'Upgraded frontend from jQuery to React, reducing load time by 50%',
      'Transitioned from on-premise to AWS, achieving 99.99% uptime'
    ]
  },
  {
    category: 'Process Innovation',
    template: '[Verb] [new process/tool] that [benefit], saving [X] hours/week',
    examples: [
      'Developed automated reporting tool that eliminated manual work, saving 20 hours/week',
      'Created documentation system that improved onboarding efficiency by 60%',
      'Established code review guidelines that reduced bugs in production by 45%'
    ]
  }
]

export default function AchievementGenerator({ onInsert }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [inputText, setInputText] = useState('')
  const [generatedBullets, setGeneratedBullets] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)

  const generateBullets = () => {
    const bullets = []
    const input = inputText.toLowerCase()

    // Analyze input and generate relevant bullets
    const categories = Object.keys(ACTION_VERBS)
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const verbs = ACTION_VERBS[randomCategory]

    // Generate 3-5 bullet variations
    for (let i = 0; i < 4; i++) {
      const verb = verbs[Math.floor(Math.random() * verbs.length)]
      const metric = METRICS.percentage[Math.floor(Math.random() * METRICS.percentage.length)]
      const scale = METRICS.scale[Math.floor(Math.random() * METRICS.scale.length)]

      let bullet = ''

      if (input.includes('lead') || input.includes('team') || input.includes('manage')) {
        const teamSize = METRICS.team[Math.floor(Math.random() * METRICS.team.length)]
        bullet = `${verb} team of ${teamSize} engineers to deliver ${inputText || 'project'}, achieving ${metric} improvement in delivery speed`
      } else if (input.includes('build') || input.includes('create') || input.includes('develop')) {
        bullet = `${verb} ${inputText || 'feature/system'} serving ${scale} users, resulting in ${metric} increase in engagement`
      } else if (input.includes('improve') || input.includes('optimize') || input.includes('enhance')) {
        bullet = `${verb} ${inputText || 'system performance'}, reducing latency by ${metric} and improving user satisfaction`
      } else if (input.includes('migrate') || input.includes('upgrade') || input.includes('transition')) {
        bullet = `${verb} ${inputText || 'legacy system'} to modern architecture, improving scalability by ${metric}`
      } else {
        // Default template
        bullet = `${verb} ${inputText || 'key initiative'} that impacted ${scale} users, delivering ${metric} improvement in key metrics`
      }

      bullets.push(bullet)
    }

    setGeneratedBullets(bullets)
  }

  const copyBullet = (bullet, index) => {
    navigator.clipboard.writeText(bullet)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const insertBullet = (bullet) => {
    if (onInsert) {
      onInsert(bullet)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg">
          <Wand2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Achievement Bullet Generator</h2>
          <p className="text-sm text-gray-500">Turn your tasks into impactful achievement statements</p>
        </div>
      </div>

      {/* Quick Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What did you work on? (brief description)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g., payment integration, team leadership, API optimization..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <button
            onClick={generateBullets}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:opacity-90 font-medium"
          >
            <Sparkles className="w-4 h-4" />
            Generate
          </button>
        </div>
      </div>

      {/* Generated Bullets */}
      {generatedBullets.length > 0 && (
        <div className="mb-6 space-y-3">
          <h3 className="font-medium text-gray-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-500" />
            Generated Achievement Bullets
          </h3>
          {generatedBullets.map((bullet, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors"
            >
              <span className="text-amber-500 font-bold">•</span>
              <p className="flex-1 text-gray-700">{bullet}</p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => copyBullet(bullet, i)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded"
                  title="Copy"
                >
                  {copiedIndex === i ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                {onInsert && (
                  <button
                    onClick={() => insertBullet(bullet)}
                    className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-100 rounded"
                    title="Insert into resume"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            onClick={generateBullets}
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Generate more variations
          </button>
        </div>
      )}

      {/* Template Categories */}
      <div className="border-t pt-6">
        <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Achievement Templates by Category
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {TEMPLATES.map((template, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-amber-300 transition-colors"
            >
              <button
                onClick={() => setSelectedCategory(selectedCategory === i ? null : i)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100"
              >
                <span className="font-medium text-gray-800">{template.category}</span>
                <span className="text-gray-400">
                  {selectedCategory === i ? '−' : '+'}
                </span>
              </button>

              {selectedCategory === i && (
                <div className="p-3 space-y-3">
                  <div className="bg-amber-50 rounded p-2">
                    <p className="text-xs text-amber-700 font-medium mb-1">Template:</p>
                    <p className="text-sm text-amber-900">{template.template}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-2">Examples:</p>
                    <div className="space-y-2">
                      {template.examples.map((ex, j) => (
                        <div key={j} className="flex items-start gap-2 group">
                          <span className="text-green-500">•</span>
                          <p className="flex-1 text-sm text-gray-600">{ex}</p>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(ex)
                              setCopiedIndex(`${i}-${j}`)
                              setTimeout(() => setCopiedIndex(null), 2000)
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600"
                          >
                            {copiedIndex === `${i}-${j}` ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Verbs Reference */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="font-medium text-gray-900 mb-3">Strong Action Verbs</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(ACTION_VERBS).map(([category, verbs]) => (
            <div key={category} className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-medium text-gray-500 capitalize mb-2">{category}</p>
              <div className="flex flex-wrap gap-1">
                {verbs.slice(0, 5).map(verb => (
                  <span key={verb} className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-700">
                    {verb}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
