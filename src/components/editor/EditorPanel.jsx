import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import PersonalSection from './PersonalSection'
import ExperienceSection from './ExperienceSection'
import EducationSection from './EducationSection'
import SkillsSection from './SkillsSection'
import AchievementsSection from './AchievementsSection'
import LanguagesSection from './LanguagesSection'
import InterestsSection from './InterestsSection'

const sections = [
  { id: 'personal', label: 'Personal Info', icon: '👤' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'achievements', label: 'Achievements', icon: '🏆' },
  { id: 'languages', label: 'Languages', icon: '🌍' },
  { id: 'interests', label: 'Interests', icon: '💡' },
]

export default function EditorPanel() {
  const [activeSection, setActiveSection] = useState('personal')
  const { resumeData, importData, exportData } = useResume()

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result)
          importData(data)
          alert('Resume data imported successfully!')
        } catch (error) {
          alert('Invalid JSON file')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleExportJSON = () => {
    const dataStr = exportData()
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resume-data.json'
    a.click()
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Import/Export Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="btn-secondary cursor-pointer">
            Import JSON
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          <button onClick={handleExportJSON} className="btn-secondary">
            Export JSON
          </button>
        </div>
        <p className="text-sm text-gray-500">Changes are saved automatically</p>
      </div>

      {/* Section Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="flex overflow-x-auto border-b">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeSection === section.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>

        {/* Section Content */}
        <div className="p-6">
          {activeSection === 'personal' && <PersonalSection />}
          {activeSection === 'experience' && <ExperienceSection />}
          {activeSection === 'education' && <EducationSection />}
          {activeSection === 'skills' && <SkillsSection />}
          {activeSection === 'achievements' && <AchievementsSection />}
          {activeSection === 'languages' && <LanguagesSection />}
          {activeSection === 'interests' && <InterestsSection />}
        </div>
      </div>
    </div>
  )
}
