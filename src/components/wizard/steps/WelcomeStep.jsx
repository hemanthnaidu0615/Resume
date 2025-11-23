import { useState } from 'react'
import { Sparkles, Code, Palette, Database, Cloud, Users, TrendingUp, Briefcase, ChevronRight } from 'lucide-react'

const ROLES = [
  { id: 'frontend', title: 'Frontend Developer', icon: Palette, color: 'from-pink-500 to-rose-500', keywords: ['React', 'Vue', 'Angular', 'CSS', 'UI/UX'] },
  { id: 'backend', title: 'Backend Developer', icon: Database, color: 'from-green-500 to-emerald-500', keywords: ['Node.js', 'Python', 'Java', 'APIs', 'Databases'] },
  { id: 'fullstack', title: 'Full-Stack Developer', icon: Code, color: 'from-blue-500 to-cyan-500', keywords: ['React', 'Node.js', 'Databases', 'DevOps'] },
  { id: 'devops', title: 'DevOps Engineer', icon: Cloud, color: 'from-orange-500 to-amber-500', keywords: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] },
  { id: 'data', title: 'Data Engineer/Scientist', icon: TrendingUp, color: 'from-purple-500 to-violet-500', keywords: ['Python', 'SQL', 'ML', 'Analytics'] },
  { id: 'manager', title: 'Engineering Manager', icon: Users, color: 'from-indigo-500 to-blue-500', keywords: ['Leadership', 'Strategy', 'Team Building'] },
  { id: 'product', title: 'Product Manager', icon: Briefcase, color: 'from-teal-500 to-cyan-500', keywords: ['Roadmap', 'Analytics', 'User Research'] },
  { id: 'other', title: 'Other Role', icon: Sparkles, color: 'from-slate-500 to-slate-600', keywords: ['Customizable'] }
]

const EXPERIENCE_LEVELS = [
  { id: 'student', title: 'Student/Fresh Graduate', years: '0 years', description: 'Focus on education, projects, and internships' },
  { id: 'entry', title: 'Entry Level', years: '0-2 years', description: 'Highlight projects and learning ability' },
  { id: 'mid', title: 'Mid Level', years: '3-5 years', description: 'Balance skills and achievements' },
  { id: 'senior', title: 'Senior Level', years: '6-10 years', description: 'Emphasize leadership and impact' },
  { id: 'executive', title: 'Executive/Lead', years: '10+ years', description: 'Focus on strategy and business impact' }
]

export default function WelcomeStep({ data, onUpdate, onNext }) {
  const [step, setStep] = useState(data.targetRole ? 2 : 1)
  const [selectedRole, setSelectedRole] = useState(data.targetRole || '')
  const [selectedLevel, setSelectedLevel] = useState(data.experienceLevel || '')

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId)
    onUpdate({ targetRole: roleId })
    setTimeout(() => setStep(2), 300)
  }

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId)
    onUpdate({ experienceLevel: levelId })
  }

  const canProceed = selectedRole && selectedLevel

  return (
    <div className="space-y-8">
      {step === 1 && (
        <div className="animate-fadeIn">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Let's Build Your Resume</h1>
            <p className="text-slate-400 text-lg">What role are you targeting?</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ROLES.map((role) => {
              const Icon = role.icon
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`
                    group relative p-6 rounded-xl border-2 transition-all duration-300
                    ${selectedRole === role.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                    }
                  `}
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${role.color} mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{role.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {role.keywords.slice(0, 3).map(kw => (
                      <span key={kw} className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fadeIn">
          <div className="text-center mb-8">
            <button
              onClick={() => setStep(1)}
              className="text-slate-400 hover:text-white mb-4 inline-flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4 rotate-180" /> Change role
            </button>
            <h2 className="text-3xl font-bold text-white mb-2">What's your experience level?</h2>
            <p className="text-slate-400">
              Targeting: <span className="text-blue-400 font-medium">
                {ROLES.find(r => r.id === selectedRole)?.title}
              </span>
            </p>
          </div>

          <div className="grid gap-3 max-w-2xl mx-auto">
            {EXPERIENCE_LEVELS.map((level) => (
              <button
                key={level.id}
                onClick={() => handleLevelSelect(level.id)}
                className={`
                  flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left
                  ${selectedLevel === level.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }
                `}
              >
                <div>
                  <h3 className="font-semibold text-white">{level.title}</h3>
                  <p className="text-sm text-slate-400">{level.description}</p>
                </div>
                <span className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${selectedLevel === level.id ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'}
                `}>
                  {level.years}
                </span>
              </button>
            ))}
          </div>

          {canProceed && (
            <div className="mt-8 text-center animate-fadeIn">
              <button
                onClick={onNext}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Continue to Personal Info
                <ChevronRight className="w-5 h-5" />
              </button>
              <p className="text-slate-500 text-sm mt-3">
                We'll customize your resume structure based on your selections
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
