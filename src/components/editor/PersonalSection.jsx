import { useResume } from '../../context/ResumeContext'

export default function PersonalSection() {
  const { resumeData, updatePersonal } = useResume()
  const { personal } = resumeData

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={personal.name || ''}
            onChange={(e) => updatePersonal('name', e.target.value)}
            className="input-field"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            value={personal.title || ''}
            onChange={(e) => updatePersonal('title', e.target.value)}
            className="input-field"
            placeholder="Full-Stack Developer"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={personal.email || ''}
            onChange={(e) => updatePersonal('email', e.target.value)}
            className="input-field"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={personal.phone || ''}
            onChange={(e) => updatePersonal('phone', e.target.value)}
            className="input-field"
            placeholder="+1 234 567 8900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          value={personal.location || ''}
          onChange={(e) => updatePersonal('location', e.target.value)}
          className="input-field"
          placeholder="City, State, Country"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
          <input
            type="url"
            value={personal.linkedin || ''}
            onChange={(e) => updatePersonal('linkedin', e.target.value)}
            className="input-field"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
          <input
            type="url"
            value={personal.github || ''}
            onChange={(e) => updatePersonal('github', e.target.value)}
            className="input-field"
            placeholder="https://github.com/username"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Website (Optional)</label>
        <input
          type="url"
          value={personal.website || ''}
          onChange={(e) => updatePersonal('website', e.target.value)}
          className="input-field"
          placeholder="https://yourwebsite.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
        <textarea
          value={personal.summary || ''}
          onChange={(e) => updatePersonal('summary', e.target.value)}
          className="input-field min-h-[120px]"
          placeholder="Write a compelling summary about your professional background..."
          rows={5}
        />
        <p className="text-xs text-gray-500 mt-1">{(personal.summary || '').length} characters</p>
      </div>
    </div>
  )
}
