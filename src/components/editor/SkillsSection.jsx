import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'

export default function SkillsSection() {
  const { resumeData, updateSection } = useResume()
  const [newCategory, setNewCategory] = useState('')
  const skills = resumeData.skills || {}

  const addCategory = () => {
    if (newCategory.trim()) {
      updateSection('skills', { ...skills, [newCategory.trim()]: [] })
      setNewCategory('')
    }
  }

  const updateSkills = (category, value) => {
    const skillList = value.split(',').map(s => s.trim()).filter(s => s)
    updateSection('skills', { ...skills, [category]: skillList })
  }

  const removeCategory = (category) => {
    const { [category]: _, ...rest } = skills
    updateSection('skills', rest)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills</h3>

      {/* Add new category */}
      <div className="flex gap-2 mb-6">
        <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCategory()} className="input-field flex-1" placeholder="New skill category (e.g., 'Machine Learning')" />
        <button onClick={addCategory} className="btn-primary">Add Category</button>
      </div>

      {/* Skill categories */}
      {Object.entries(skills).map(([category, skillList]) => (
        <div key={category} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">{category}</h4>
            <button onClick={() => removeCategory(category)} className="text-red-500 text-sm">Delete Category</button>
          </div>
          <textarea
            value={skillList.join(', ')}
            onChange={(e) => updateSkills(category, e.target.value)}
            className="input-field"
            placeholder="Enter skills separated by commas (e.g., React, TypeScript, Node.js)"
            rows={2}
          />
          <div className="flex flex-wrap gap-1 mt-2">
            {skillList.map((skill, i) => (
              <span key={i} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-lg">{skill}</span>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(skills).length === 0 && (
        <p className="text-center text-gray-500 py-4">No skill categories. Add one above to get started.</p>
      )}
    </div>
  )
}
