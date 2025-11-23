import { useState } from 'react'
import { useResume } from '../../../context/ResumeContext'
import { Trophy, Plus, Trash2, ChevronRight, ChevronLeft, Lightbulb, Star, Award, Target } from 'lucide-react'

const ACHIEVEMENT_EXAMPLES = {
  frontend: [
    { title: "Performance Optimization", description: "Improved Core Web Vitals score from 45 to 92, resulting in 30% faster page loads" },
    { title: "Component Library", description: "Built reusable component library used across 5 products, reducing development time by 40%" },
    { title: "Accessibility", description: "Led accessibility audit and fixes, achieving WCAG 2.1 AA compliance across all user-facing applications" }
  ],
  backend: [
    { title: "API Performance", description: "Optimized database queries reducing API response time from 2s to 200ms" },
    { title: "System Reliability", description: "Achieved 99.99% uptime for critical payment processing system serving 1M+ transactions daily" },
    { title: "Cost Reduction", description: "Implemented caching strategy that reduced cloud infrastructure costs by 35%" }
  ],
  fullstack: [
    { title: "End-to-End Delivery", description: "Designed and delivered complete e-commerce platform from scratch, handling 10K+ daily orders" },
    { title: "Tech Migration", description: "Led migration from monolith to microservices, improving deployment frequency from monthly to daily" },
    { title: "Team Leadership", description: "Mentored 5 junior developers, with 3 promoted within 18 months" }
  ],
  devops: [
    { title: "CI/CD Implementation", description: "Reduced deployment time from 4 hours to 15 minutes through automated CI/CD pipelines" },
    { title: "Infrastructure as Code", description: "Migrated 50+ servers to Terraform, eliminating configuration drift and enabling disaster recovery in <1 hour" },
    { title: "Cost Optimization", description: "Implemented auto-scaling and spot instances, reducing cloud spend by $200K annually" }
  ],
  data: [
    { title: "ML Model Impact", description: "Developed recommendation engine that increased user engagement by 45% and revenue by $5M" },
    { title: "Data Pipeline", description: "Built real-time data pipeline processing 10TB daily with 99.9% accuracy" },
    { title: "Business Intelligence", description: "Created executive dashboards adopted by C-suite, enabling data-driven decisions" }
  ],
  manager: [
    { title: "Team Growth", description: "Scaled engineering team from 5 to 25 while maintaining high performance and low attrition" },
    { title: "On-Time Delivery", description: "Delivered 12 major projects on time and under budget over 3 years" },
    { title: "Process Improvement", description: "Implemented Agile practices that improved team velocity by 60%" }
  ],
  product: [
    { title: "Product Launch", description: "Led launch of flagship product that acquired 100K users in first quarter" },
    { title: "Revenue Growth", description: "Defined and executed product strategy that grew ARR from $1M to $5M" },
    { title: "User Research", description: "Established user research program that informed roadmap and improved NPS by 40 points" }
  ],
  other: [
    { title: "Project Success", description: "Successfully delivered [project] that [impact/result]" },
    { title: "Process Improvement", description: "Streamlined [process] resulting in [X]% improvement in [metric]" },
    { title: "Recognition", description: "Received [award/recognition] for [achievement]" }
  ]
}

export default function AchievementsStep({ data, onNext, onPrev }) {
  const { resumeData, updateSection } = useResume()
  const [achievements, setAchievements] = useState(
    resumeData.achievements?.length > 0 ? resumeData.achievements : [{ title: '', description: '' }]
  )

  const examples = ACHIEVEMENT_EXAMPLES[data.targetRole] || ACHIEVEMENT_EXAMPLES.other

  const updateAchievement = (index, field, value) => {
    const updated = [...achievements]
    updated[index] = { ...updated[index], [field]: value }
    setAchievements(updated)
    updateSection('achievements', updated)
  }

  const addAchievement = () => {
    setAchievements([...achievements, { title: '', description: '' }])
  }

  const removeAchievement = (index) => {
    if (achievements.length === 1) return
    const updated = achievements.filter((_, i) => i !== index)
    setAchievements(updated)
    updateSection('achievements', updated)
  }

  const useExample = (example) => {
    const emptyIndex = achievements.findIndex(a => !a.title.trim())
    if (emptyIndex !== -1) {
      updateAchievement(emptyIndex, 'title', example.title)
      updateAchievement(emptyIndex, 'description', example.description)
    } else {
      const updated = [...achievements, example]
      setAchievements(updated)
      updateSection('achievements', updated)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Key Achievements</h2>
        <p className="text-slate-400">Highlight your most impressive accomplishments</p>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Trophy className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-amber-300 font-medium">What makes a great achievement?</p>
            <ul className="mt-1 space-y-1 text-amber-200/80">
              <li><strong>Quantify:</strong> Use numbers (%, $, time saved, users impacted)</li>
              <li><strong>Context:</strong> What was the challenge or situation?</li>
              <li><strong>Result:</strong> What was the business impact?</li>
              <li><strong>Uniqueness:</strong> What makes this stand out from others?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Example Achievements */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          Example achievements for {data.targetRole || 'your role'} (click to use):
        </h3>
        <div className="grid gap-2">
          {examples.map((example, i) => (
            <button
              key={i}
              onClick={() => useExample(example)}
              className="text-left p-3 bg-slate-900/50 rounded-lg hover:bg-slate-700 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white font-medium">{example.title}</p>
                  <p className="text-slate-400 text-sm">{example.description}</p>
                </div>
                <Plus className="w-4 h-4 text-slate-500 group-hover:text-blue-400 flex-shrink-0 ml-2" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Achievement Inputs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-400" />
          Your Achievements
        </h3>

        {achievements.map((achievement, index) => (
          <div key={index} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Achievement {index + 1}</span>
              {achievements.length > 1 && (
                <button
                  onClick={() => removeAchievement(index)}
                  className="text-slate-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Title/Category</label>
              <input
                type="text"
                value={achievement.title}
                onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                placeholder="e.g., Performance Optimization, Team Leadership"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Description (with metrics)</label>
              <textarea
                value={achievement.description}
                onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                placeholder="e.g., Improved API response time by 60% through query optimization, reducing customer complaints by 40%"
                rows={3}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              />
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-slate-500">Include numbers and business impact</p>
                <p className="text-xs text-slate-500">{achievement.description.length}/300</p>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addAchievement}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <Plus className="w-4 h-4" />
          Add another achievement
        </button>
      </div>

      {/* Quick Tips */}
      <div className="bg-slate-900/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Formula for writing achievements:
        </h4>
        <p className="text-slate-400 text-sm">
          <span className="text-blue-400">[Action Verb]</span> +
          <span className="text-green-400"> [What you did]</span> +
          <span className="text-purple-400"> [Result with numbers]</span>
        </p>
        <p className="text-slate-500 text-xs mt-2">
          Example: <span className="text-slate-300">"Redesigned checkout flow, increasing conversion rate from 2.1% to 3.8% (80% improvement)"</span>
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
          onClick={onNext}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Review Your Resume
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
