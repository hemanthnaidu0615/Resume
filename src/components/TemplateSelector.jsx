import { useResume } from '../context/ResumeContext'
import { Code, Briefcase, Server, BarChart3, Shield, Palette } from 'lucide-react'

const templateCategories = [
  {
    name: 'General Purpose',
    icon: Palette,
    templates: [
      { id: 'professional', name: 'Professional', description: 'Clean, modern design with clear sections.', color: '#0ea5e9', best: 'Corporate, Traditional' },
      { id: 'minimal', name: 'Minimal', description: 'Simple black and white. ATS-friendly.', color: '#374151', best: 'ATS Systems' },
      { id: 'creative', name: 'Creative', description: 'Bold colors and gradient header.', color: '#8b5cf6', best: 'Design, Marketing' },
      { id: 'executive', name: 'Executive', description: 'Traditional serif fonts. Senior positions.', color: '#1e293b', best: 'Leadership' },
      { id: 'modern', name: 'Modern', description: 'Two-column with colored sidebar.', color: '#f43f5e', best: 'Tech, Product' },
    ]
  },
  {
    name: 'Role-Based',
    icon: Briefcase,
    templates: [
      { id: 'frontend', name: 'Frontend Dev', description: 'Optimized for frontend/UI developers.', color: '#3B82F6', best: 'React, Vue, Angular' },
      { id: 'devops', name: 'DevOps/SRE', description: 'Terminal-style theme for ops engineers.', color: '#F97316', best: 'Cloud, Infrastructure' },
      { id: 'product-manager', name: 'Product Manager', description: 'Metrics-focused executive style.', color: '#8B5CF6', best: 'PM, Strategy' },
      { id: 'data-science', name: 'Data Science', description: 'Analytics-focused with skill bars.', color: '#10B981', best: 'ML, Analytics' },
    ]
  },
  {
    name: 'Specialty',
    icon: Shield,
    templates: [
      { id: 'ats-optimized', name: 'ATS Optimized', description: 'Maximum ATS compatibility. No graphics.', color: '#1F2937', best: 'Large Companies' },
      { id: 'compact', name: 'Compact', description: 'Dense single-page layout.', color: '#10b981', best: 'Entry Level' },
      { id: 'elegant', name: 'Elegant', description: 'Sophisticated with decorative elements.', color: '#6366f1', best: 'Finance, Consulting' },
      { id: 'tech', name: 'Tech/Terminal', description: 'Code-like dark theme presentation.', color: '#22c55e', best: 'Software Engineers' },
      { id: 'sidebar', name: 'Sidebar', description: 'Right sidebar layout for skills.', color: '#ec4899', best: 'Creative, Sales' },
      { id: 'timeline', name: 'Timeline', description: 'Visual career progression.', color: '#f97316', best: 'Career Growth' },
    ]
  }
]

export default function TemplateSelector() {
  const { activeTemplate, setActiveTemplate, themeColor, setThemeColor } = useResume()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">15 professional templates optimized for different roles and industries</p>
      </div>

      {templateCategories.map((category) => {
        const Icon = category.icon
        return (
          <div key={category.name} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Icon className="w-5 h-5 text-primary-500" />
              {category.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {category.templates.map((template) => (
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
                    className="w-full h-20 rounded-lg mb-3 flex items-center justify-center text-white text-xs font-medium"
                    style={{ backgroundColor: template.color }}
                  >
                    {template.name}
                  </div>

                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{template.name}</h4>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{template.description}</p>
                  <p className="text-xs font-medium" style={{ color: template.color }}>
                    {template.best}
                  </p>

                  {activeTemplate === template.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )
      })}

      <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Template Selection Guide</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-blue-600 mb-2 flex items-center gap-1">
              <Shield className="w-4 h-4" /> For ATS Systems
            </h4>
            <p className="text-gray-600">Use <strong>ATS Optimized</strong> or <strong>Minimal</strong>. Simple formatting ensures parsing.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-purple-600 mb-2 flex items-center gap-1">
              <Code className="w-4 h-4" /> For Tech Roles
            </h4>
            <p className="text-gray-600">Try <strong>Frontend Dev</strong>, <strong>DevOps</strong>, or <strong>Tech</strong> templates.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-green-600 mb-2 flex items-center gap-1">
              <BarChart3 className="w-4 h-4" /> For Data/Analytics
            </h4>
            <p className="text-gray-600"><strong>Data Science</strong> template with skill proficiency bars.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-amber-600 mb-2 flex items-center gap-1">
              <Briefcase className="w-4 h-4" /> For Leadership
            </h4>
            <p className="text-gray-600"><strong>Product Manager</strong> or <strong>Executive</strong> for senior roles.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
