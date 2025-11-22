import { useResume } from '../context/ResumeContext'

const templates = [
  { id: 'professional', name: 'Professional', description: 'Clean, modern design with clear sections. Great for corporate roles.', color: '#0ea5e9', best: 'Corporate, Traditional' },
  { id: 'minimal', name: 'Minimal', description: 'Simple black and white design. Maximum ATS compatibility.', color: '#374151', best: 'ATS Systems, Conservative' },
  { id: 'creative', name: 'Creative', description: 'Bold colors and gradient header. Stand out from the crowd.', color: '#8b5cf6', best: 'Design, Marketing, Startups' },
  { id: 'executive', name: 'Executive', description: 'Traditional serif fonts. Perfect for senior positions.', color: '#1e293b', best: 'Leadership, Management' },
  { id: 'modern', name: 'Modern', description: 'Two-column layout with colored sidebar. Balanced and organized.', color: '#f43f5e', best: 'Tech, Product, Engineering' },
  { id: 'compact', name: 'Compact', description: 'Dense single-page layout. Fits maximum content.', color: '#10b981', best: 'Entry Level, Internships' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated design with decorative elements. Refined look.', color: '#6366f1', best: 'Finance, Consulting' },
  { id: 'tech', name: 'Tech', description: 'Developer-style terminal theme. Unique code-like presentation.', color: '#22c55e', best: 'Software Engineers, DevOps' },
  { id: 'sidebar', name: 'Sidebar', description: 'Right sidebar with contact and skills. Clear visual hierarchy.', color: '#ec4899', best: 'Creative, HR, Sales' },
  { id: 'timeline', name: 'Timeline', description: 'Visual career timeline. Great for showing progression.', color: '#f97316', best: 'Career Growth Stories' },
]

export default function TemplateSelector() {
  const { activeTemplate, setActiveTemplate, themeColor, setThemeColor } = useResume()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select a template that matches your industry and style</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => {
              setActiveTemplate(template.id)
              setThemeColor(template.color)
            }}
            className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg ${
              activeTemplate === template.id
                ? 'border-primary-500 bg-primary-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            {/* Preview box */}
            <div
              className="w-full h-24 rounded-lg mb-3 flex items-center justify-center text-white text-xs font-medium"
              style={{ backgroundColor: template.color }}
            >
              {template.name}
            </div>

            <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
            <p className="text-xs text-gray-500 mb-2 line-clamp-2">{template.description}</p>
            <p className="text-xs font-medium" style={{ color: template.color }}>Best for: {template.best}</p>

            {activeTemplate === template.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Template Tips</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-primary-600 mb-1">For ATS Systems</h4>
            <p className="text-gray-600">Use Minimal or Professional templates. Simple formatting ensures your resume gets parsed correctly.</p>
          </div>
          <div>
            <h4 className="font-medium text-primary-600 mb-1">For Startups</h4>
            <p className="text-gray-600">Creative and Modern templates show personality. Tech template is perfect for engineering roles.</p>
          </div>
          <div>
            <h4 className="font-medium text-primary-600 mb-1">For Corporate</h4>
            <p className="text-gray-600">Executive and Elegant templates convey professionalism. Stick to traditional colors.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
