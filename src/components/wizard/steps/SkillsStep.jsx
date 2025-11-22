import { useState } from 'react'
import { useResume } from '../../../context/ResumeContext'
import { Code, Plus, X, ChevronRight, ChevronLeft, Lightbulb, Sparkles } from 'lucide-react'

const ROLE_SKILLS = {
  frontend: {
    'Core Technologies': ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
    'Frameworks': ['React', 'Vue.js', 'Angular', 'Next.js', 'Svelte'],
    'Styling': ['Tailwind CSS', 'Sass/SCSS', 'Styled Components', 'Material UI', 'Bootstrap'],
    'Tools & Testing': ['Webpack', 'Vite', 'Jest', 'React Testing Library', 'Cypress', 'Playwright'],
    'State Management': ['Redux', 'Zustand', 'React Query', 'MobX']
  },
  backend: {
    'Languages': ['Node.js', 'Python', 'Java', 'Go', 'C#', 'PHP', 'Ruby'],
    'Frameworks': ['Express.js', 'FastAPI', 'Spring Boot', 'Django', '.NET', 'Laravel'],
    'Databases': ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch'],
    'APIs & Architecture': ['REST', 'GraphQL', 'Microservices', 'gRPC', 'Message Queues'],
    'Tools': ['Docker', 'Git', 'Linux', 'Nginx', 'Postman']
  },
  fullstack: {
    'Frontend': ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'],
    'Backend': ['Node.js', 'Express.js', 'Spring Boot', 'Python', 'Django'],
    'Databases': ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
    'DevOps': ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux'],
    'Tools': ['REST APIs', 'GraphQL', 'Jest', 'Webpack', 'Vite']
  },
  devops: {
    'Cloud Platforms': ['AWS', 'Azure', 'GCP', 'DigitalOcean'],
    'Containers & Orchestration': ['Docker', 'Kubernetes', 'Helm', 'Podman'],
    'CI/CD': ['Jenkins', 'GitHub Actions', 'GitLab CI', 'CircleCI', 'ArgoCD'],
    'Infrastructure as Code': ['Terraform', 'Ansible', 'CloudFormation', 'Pulumi'],
    'Monitoring': ['Prometheus', 'Grafana', 'ELK Stack', 'Datadog', 'New Relic']
  },
  data: {
    'Languages': ['Python', 'SQL', 'R', 'Scala'],
    'Data Processing': ['Pandas', 'NumPy', 'Spark', 'Airflow', 'dbt'],
    'ML/AI': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras'],
    'Databases & Warehouses': ['PostgreSQL', 'BigQuery', 'Snowflake', 'Redshift'],
    'Visualization': ['Tableau', 'Power BI', 'Matplotlib', 'Plotly']
  },
  manager: {
    'Leadership': ['Team Building', 'Mentoring', 'Performance Management', 'Hiring'],
    'Methodology': ['Agile', 'Scrum', 'Kanban', 'SAFe'],
    'Tools': ['Jira', 'Confluence', 'Linear', 'Notion'],
    'Skills': ['Project Management', 'Stakeholder Management', 'Budget Planning', 'Risk Management'],
    'Technical': ['Architecture Review', 'Code Review', 'Technical Strategy']
  },
  product: {
    'Core Skills': ['Product Strategy', 'Roadmap Planning', 'User Research', 'A/B Testing'],
    'Analytics': ['SQL', 'Amplitude', 'Mixpanel', 'Google Analytics'],
    'Tools': ['Jira', 'Figma', 'Notion', 'Miro', 'Productboard'],
    'Methodology': ['Agile', 'Scrum', 'Design Thinking', 'Jobs-to-be-Done'],
    'Communication': ['PRDs', 'Stakeholder Management', 'Presentations', 'User Stories']
  },
  other: {
    'Technical': ['Microsoft Office', 'Google Workspace', 'Project Management'],
    'Soft Skills': ['Communication', 'Problem Solving', 'Time Management', 'Leadership'],
    'Tools': ['Slack', 'Zoom', 'Trello', 'Asana']
  }
}

export default function SkillsStep({ data, onNext, onPrev }) {
  const { resumeData, updateSection } = useResume()
  const [skills, setSkills] = useState(resumeData.skills || {})
  const [newCategory, setNewCategory] = useState('')
  const [newSkill, setNewSkill] = useState({})
  const [showAddCategory, setShowAddCategory] = useState(false)

  const suggestedSkills = ROLE_SKILLS[data.targetRole] || ROLE_SKILLS.other

  const addSkillToCategory = (category, skill) => {
    const updated = { ...skills }
    if (!updated[category]) {
      updated[category] = []
    }
    if (!updated[category].includes(skill)) {
      updated[category] = [...updated[category], skill]
      setSkills(updated)
      updateSection('skills', updated)
    }
  }

  const removeSkillFromCategory = (category, skill) => {
    const updated = { ...skills }
    updated[category] = updated[category].filter(s => s !== skill)
    if (updated[category].length === 0) {
      delete updated[category]
    }
    setSkills(updated)
    updateSection('skills', updated)
  }

  const addCustomSkill = (category) => {
    const skill = newSkill[category]?.trim()
    if (skill) {
      addSkillToCategory(category, skill)
      setNewSkill({ ...newSkill, [category]: '' })
    }
  }

  const addNewCategory = () => {
    if (newCategory.trim() && !skills[newCategory]) {
      const updated = { ...skills, [newCategory]: [] }
      setSkills(updated)
      updateSection('skills', updated)
      setNewCategory('')
      setShowAddCategory(false)
    }
  }

  const removeCategory = (category) => {
    const updated = { ...skills }
    delete updated[category]
    setSkills(updated)
    updateSection('skills', updated)
  }

  const autoPopulate = () => {
    setSkills(suggestedSkills)
    updateSection('skills', suggestedSkills)
  }

  const totalSkills = Object.values(skills).flat().length

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Skills</h2>
        <p className="text-slate-400">Showcase your technical and professional abilities</p>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-400">
          {totalSkills} skills added
          {totalSkills < 10 && <span className="text-amber-400 ml-2">(Aim for 10-20)</span>}
        </div>
        <button
          onClick={autoPopulate}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
        >
          <Sparkles className="w-4 h-4" />
          Auto-populate for {data.targetRole || 'your role'}
        </button>
      </div>

      {/* Tips */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-300">
            <p className="font-medium">Skills that get noticed:</p>
            <ul className="mt-1 space-y-1 text-blue-200/80">
              <li>Group skills by category for better readability</li>
              <li>Put most relevant skills first in each category</li>
              <li>Match keywords from the job description</li>
              <li>Avoid listing skills you can't discuss in an interview</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Suggested Skills (for empty state or reference) */}
      {Object.keys(skills).length === 0 && (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Suggested Skills for {ROLE_SKILLS[data.targetRole] ? data.targetRole : 'your role'}
          </h3>
          <p className="text-slate-400 text-sm mb-4">Click any skill to add it, or use auto-populate above</p>
          <div className="space-y-4">
            {Object.entries(suggestedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <h4 className="text-sm font-medium text-slate-300 mb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => addSkillToCategory(category, skill)}
                      className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Skills */}
      {Object.keys(skills).length > 0 && (
        <div className="space-y-4">
          {Object.entries(skills).map(([category, categorySkills]) => (
            <div key={category} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">{category}</h3>
                <button
                  onClick={() => removeCategory(category)}
                  className="text-slate-500 hover:text-red-400 text-sm"
                >
                  Remove category
                </button>
              </div>

              {/* Current skills in category */}
              <div className="flex flex-wrap gap-2 mb-3">
                {categorySkills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkillFromCategory(category, skill)}
                      className="hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add new skill input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSkill[category] || ''}
                  onChange={(e) => setNewSkill({ ...newSkill, [category]: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomSkill(category)}
                  placeholder="Add a skill..."
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button
                  onClick={() => addCustomSkill(category)}
                  className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Quick add from suggestions */}
              {suggestedSkills[category] && (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <p className="text-xs text-slate-500 mb-2">Quick add:</p>
                  <div className="flex flex-wrap gap-1">
                    {suggestedSkills[category]
                      .filter(s => !categorySkills.includes(s))
                      .slice(0, 5)
                      .map(skill => (
                        <button
                          key={skill}
                          onClick={() => addSkillToCategory(category, skill)}
                          className="px-2 py-0.5 bg-slate-700 text-slate-400 rounded text-xs hover:bg-slate-600"
                        >
                          + {skill}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add new category */}
          {showAddCategory ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addNewCategory()}
                placeholder="Category name (e.g., Cloud Platforms)"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                autoFocus
              />
              <button
                onClick={addNewCategory}
                className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddCategory(false)}
                className="px-4 py-3 text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddCategory(true)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              <Plus className="w-4 h-4" />
              Add new category
            </button>
          )}
        </div>
      )}

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
          Continue to Achievements
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
