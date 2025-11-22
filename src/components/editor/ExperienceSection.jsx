import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'

export default function ExperienceSection() {
  const { resumeData, updateSection } = useResume()
  const [expandedExp, setExpandedExp] = useState(0)

  const experience = resumeData.experience || []

  const addExperience = () => {
    updateSection('experience', [
      ...experience,
      {
        company: '',
        location: '',
        position: '',
        startDate: '',
        endDate: '',
        projects: []
      }
    ])
    setExpandedExp(experience.length)
  }

  const updateExperience = (index, field, value) => {
    const updated = experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    )
    updateSection('experience', updated)
  }

  const removeExperience = (index) => {
    updateSection('experience', experience.filter((_, i) => i !== index))
  }

  const addProject = (expIndex) => {
    const updated = experience.map((exp, i) =>
      i === expIndex ? {
        ...exp,
        projects: [...(exp.projects || []), {
          name: '',
          role: '',
          description: '',
          achievements: [],
          techStack: []
        }]
      } : exp
    )
    updateSection('experience', updated)
  }

  const updateProject = (expIndex, projIndex, field, value) => {
    const updated = experience.map((exp, i) =>
      i === expIndex ? {
        ...exp,
        projects: exp.projects.map((proj, j) =>
          j === projIndex ? { ...proj, [field]: value } : proj
        )
      } : exp
    )
    updateSection('experience', updated)
  }

  const removeProject = (expIndex, projIndex) => {
    const updated = experience.map((exp, i) =>
      i === expIndex ? {
        ...exp,
        projects: exp.projects.filter((_, j) => j !== projIndex)
      } : exp
    )
    updateSection('experience', updated)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <button onClick={addExperience} className="btn-primary text-sm">
          + Add Experience
        </button>
      </div>

      {experience.map((exp, expIndex) => (
        <div key={expIndex} className="border rounded-lg overflow-hidden">
          <div
            className="p-4 bg-gray-50 cursor-pointer flex justify-between items-center"
            onClick={() => setExpandedExp(expandedExp === expIndex ? -1 : expIndex)}
          >
            <div>
              <p className="font-medium text-gray-900">{exp.company || 'New Company'}</p>
              <p className="text-sm text-gray-500">{exp.position || 'Position'}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">{expandedExp === expIndex ? '▼' : '▶'}</span>
              <button
                onClick={(e) => { e.stopPropagation(); removeExperience(expIndex) }}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>

          {expandedExp === expIndex && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position/Title</label>
                <input
                  type="text"
                  value={exp.position || ''}
                  onChange={(e) => updateExperience(expIndex, 'position', e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate || ''}
                    onChange={(e) => updateExperience(expIndex, 'startDate', e.target.value)}
                    className="input-field"
                    placeholder="Mar 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="text"
                    value={exp.endDate || ''}
                    onChange={(e) => updateExperience(expIndex, 'endDate', e.target.value)}
                    className="input-field"
                    placeholder="Present"
                  />
                </div>
              </div>

              {/* Projects */}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-700">Projects</h4>
                  <button
                    onClick={() => addProject(expIndex)}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    + Add Project
                  </button>
                </div>

                {exp.projects?.map((project, projIndex) => (
                  <div key={projIndex} className="bg-gray-50 rounded-lg p-4 mb-3">
                    <div className="flex justify-between mb-3">
                      <span className="font-medium text-sm">{project.name || 'New Project'}</span>
                      <button
                        onClick={() => removeProject(expIndex, projIndex)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={project.name || ''}
                        onChange={(e) => updateProject(expIndex, projIndex, 'name', e.target.value)}
                        className="input-field"
                        placeholder="Project Name"
                      />
                      <input
                        type="text"
                        value={project.role || ''}
                        onChange={(e) => updateProject(expIndex, projIndex, 'role', e.target.value)}
                        className="input-field"
                        placeholder="Your Role"
                      />
                      <textarea
                        value={project.description || ''}
                        onChange={(e) => updateProject(expIndex, projIndex, 'description', e.target.value)}
                        className="input-field"
                        placeholder="Brief description..."
                        rows={2}
                      />
                      <textarea
                        value={(project.achievements || []).join('\n')}
                        onChange={(e) => updateProject(expIndex, projIndex, 'achievements', e.target.value.split('\n').filter(a => a.trim()))}
                        className="input-field"
                        placeholder="Achievements (one per line)"
                        rows={3}
                      />
                      <input
                        type="text"
                        value={(project.techStack || []).join(', ')}
                        onChange={(e) => updateProject(expIndex, projIndex, 'techStack', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                        className="input-field"
                        placeholder="Tech Stack (comma separated)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {experience.length === 0 && (
        <p className="text-center text-gray-500 py-8">No experience added yet. Click "Add Experience" to get started.</p>
      )}
    </div>
  )
}
