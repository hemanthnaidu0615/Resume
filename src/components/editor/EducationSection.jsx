import { useResume } from '../../context/ResumeContext'

export default function EducationSection() {
  const { resumeData, updateSection } = useResume()
  const education = resumeData.education || []

  const addEducation = () => {
    updateSection('education', [...education, { degree: '', institution: '', location: '', cgpa: '', year: '' }])
  }

  const updateEducation = (index, field, value) => {
    const updated = education.map((edu, i) => i === index ? { ...edu, [field]: value } : edu)
    updateSection('education', updated)
  }

  const removeEducation = (index) => {
    updateSection('education', education.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <button onClick={addEducation} className="btn-primary text-sm">+ Add Education</button>
      </div>

      {education.map((edu, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex justify-between mb-3">
            <span className="font-medium">{edu.institution || 'New Education'}</span>
            <button onClick={() => removeEducation(index)} className="text-red-500 text-sm">Delete</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input type="text" value={edu.degree || ''} onChange={(e) => updateEducation(index, 'degree', e.target.value)} className="input-field" placeholder="B.Tech in Computer Science" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input type="text" value={edu.institution || ''} onChange={(e) => updateEducation(index, 'institution', e.target.value)} className="input-field" placeholder="University Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" value={edu.location || ''} onChange={(e) => updateEducation(index, 'location', e.target.value)} className="input-field" placeholder="City, Country" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CGPA/Grade</label>
              <input type="text" value={edu.cgpa || ''} onChange={(e) => updateEducation(index, 'cgpa', e.target.value)} className="input-field" placeholder="3.8/4.0 or 8.5/10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input type="text" value={edu.year || ''} onChange={(e) => updateEducation(index, 'year', e.target.value)} className="input-field" placeholder="2024" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
