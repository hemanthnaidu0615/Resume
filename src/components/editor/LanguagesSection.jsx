import { useResume } from '../../context/ResumeContext'

export default function LanguagesSection() {
  const { resumeData, updateSection } = useResume()
  const languages = resumeData.languages || []

  const addLanguage = () => {
    updateSection('languages', [...languages, { language: '', proficiency: 'Professional Working' }])
  }

  const updateLanguage = (index, field, value) => {
    const updated = languages.map((l, i) => i === index ? { ...l, [field]: value } : l)
    updateSection('languages', updated)
  }

  const removeLanguage = (index) => {
    updateSection('languages', languages.filter((_, i) => i !== index))
  }

  const proficiencyLevels = ['Native', 'Fluent', 'Professional Working', 'Intermediate', 'Basic']

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
        <button onClick={addLanguage} className="btn-primary text-sm">+ Add Language</button>
      </div>

      {languages.map((lang, index) => (
        <div key={index} className="border rounded-lg p-4 flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <input type="text" value={lang.language || ''} onChange={(e) => updateLanguage(index, 'language', e.target.value)} className="input-field" placeholder="English" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency</label>
            <select value={lang.proficiency || ''} onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)} className="input-field">
              {proficiencyLevels.map(level => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>
          <button onClick={() => removeLanguage(index)} className="text-red-500 hover:text-red-700 pb-2">Delete</button>
        </div>
      ))}
    </div>
  )
}
