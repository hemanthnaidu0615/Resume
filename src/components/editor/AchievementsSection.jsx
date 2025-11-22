import { useResume } from '../../context/ResumeContext'

export default function AchievementsSection() {
  const { resumeData, updateSection } = useResume()
  const achievements = resumeData.achievements || []

  const addAchievement = () => {
    updateSection('achievements', [...achievements, { title: '', description: '' }])
  }

  const updateAchievement = (index, field, value) => {
    const updated = achievements.map((a, i) => i === index ? { ...a, [field]: value } : a)
    updateSection('achievements', updated)
  }

  const removeAchievement = (index) => {
    updateSection('achievements', achievements.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Key Achievements</h3>
        <button onClick={addAchievement} className="btn-primary text-sm">+ Add Achievement</button>
      </div>

      {achievements.map((achievement, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex justify-end mb-2">
            <button onClick={() => removeAchievement(index)} className="text-red-500 text-sm">Delete</button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" value={achievement.title || ''} onChange={(e) => updateAchievement(index, 'title', e.target.value)} className="input-field" placeholder="Team Leadership" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input type="text" value={achievement.description || ''} onChange={(e) => updateAchievement(index, 'description', e.target.value)} className="input-field" placeholder="Led a team of 7 developers..." />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
