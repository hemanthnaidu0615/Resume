import { useResume } from '../../context/ResumeContext'

export default function InterestsSection() {
  const { resumeData, updateSection } = useResume()
  const interests = resumeData.interests || []

  const handleChange = (value) => {
    const interestList = value.split(',').map(i => i.trim()).filter(i => i)
    updateSection('interests', interestList)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests & Hobbies</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Interests (comma separated)</label>
        <textarea
          value={interests.join(', ')}
          onChange={(e) => handleChange(e.target.value)}
          className="input-field"
          placeholder="Cloud Architecture, AI/ML Integration, Open Source, Team Leadership"
          rows={3}
        />
      </div>

      {interests.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, i) => (
              <span key={i} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">{interest}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
