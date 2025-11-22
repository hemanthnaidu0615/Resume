import { useResume } from '../context/ResumeContext'

const themeColors = [
  { name: 'Blue', value: '#0ea5e9' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Pink', value: '#ec4899' },
]

const templates = [
  { id: 'professional', name: 'Professional', description: 'Clean & modern' },
  { id: 'minimal', name: 'Minimal', description: 'ATS-friendly' },
  { id: 'creative', name: 'Creative', description: 'Bold & colorful' },
  { id: 'executive', name: 'Executive', description: 'Traditional serif' },
  { id: 'modern', name: 'Modern', description: 'Two-column layout' },
  { id: 'compact', name: 'Compact', description: 'One-page dense' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated' },
  { id: 'tech', name: 'Tech', description: 'Developer-focused' },
  { id: 'sidebar', name: 'Sidebar', description: 'Side info panel' },
  { id: 'timeline', name: 'Timeline', description: 'Visual timeline' },
]

export default function Sidebar({ themeColor, setThemeColor, activeTemplate, setActiveTemplate }) {
  const { fontSize, setFontSize, resetToDefault } = useResume()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 no-print overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Theme Color */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Theme Color</h3>
        <div className="grid grid-cols-4 gap-2">
          {themeColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setThemeColor(color.value)}
              className={`w-8 h-8 rounded-lg transition-transform hover:scale-110 ${
                themeColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Font Size</h3>
        <div className="flex gap-2">
          {['small', 'medium', 'large'].map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium capitalize transition-colors ${
                fontSize === size
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Templates */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Template</h3>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setActiveTemplate(template.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeTemplate === template.id
                  ? 'bg-primary-50 border-2 border-primary-500'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="font-medium text-sm text-gray-800">{template.name}</div>
              <div className="text-xs text-gray-500">{template.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={() => window.print()}
          className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Print Resume
        </button>
        <button
          onClick={resetToDefault}
          className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Reset to Default
        </button>
      </div>
    </aside>
  )
}
