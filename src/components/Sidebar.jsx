import { useState } from 'react'
import { useResume } from '../context/ResumeContext'
import { Minimize2, Maximize2, FileText, Palette, Type, Layout, RotateCcw, Printer } from 'lucide-react'

const themeColors = [
  { name: 'Blue', value: '#0ea5e9' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Slate', value: '#475569' },
]

const templateGroups = {
  'General': [
    { id: 'professional', name: 'Professional', description: 'Clean & modern' },
    { id: 'minimal', name: 'Minimal', description: 'ATS-friendly' },
    { id: 'modern', name: 'Modern', description: 'Two-column' },
    { id: 'creative', name: 'Creative', description: 'Bold colors' },
    { id: 'elegant', name: 'Elegant', description: 'Sophisticated' },
  ],
  'Role-Based': [
    { id: 'frontend', name: 'Frontend Dev', description: 'UI/React focus' },
    { id: 'devops', name: 'DevOps', description: 'Terminal style' },
    { id: 'product-manager', name: 'PM', description: 'Metrics-driven' },
    { id: 'data-science', name: 'Data Science', description: 'Analytics style' },
    { id: 'ats-optimized', name: 'ATS Max', description: 'Best parsing' },
  ],
  'Specialty': [
    { id: 'executive', name: 'Executive', description: 'Senior roles' },
    { id: 'compact', name: 'Compact', description: 'One-page dense' },
    { id: 'tech', name: 'Tech', description: 'Developer theme' },
    { id: 'timeline', name: 'Timeline', description: 'Career journey' },
    { id: 'sidebar', name: 'Sidebar', description: 'Side panel' },
  ]
}

export default function Sidebar({ themeColor, setThemeColor, activeTemplate, setActiveTemplate }) {
  const { fontSize, setFontSize, resetToDefault, pageScale, setPageScale } = useResume()
  const [activeGroup, setActiveGroup] = useState('General')

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 no-print overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Theme Color */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Palette className="w-3 h-3" /> Theme Color
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {themeColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setThemeColor(color.value)}
              className={`w-8 h-8 rounded-lg transition-all hover:scale-110 ${
                themeColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Type className="w-3 h-3" /> Font Size
        </h3>
        <div className="flex gap-1">
          {['small', 'medium', 'large'].map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`flex-1 py-1.5 px-2 rounded text-xs font-medium capitalize transition-colors ${
                fontSize === size
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L'}
            </button>
          ))}
        </div>
      </div>

      {/* Page Fit */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
          <FileText className="w-3 h-3" /> Page Fit
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => setPageScale && setPageScale(0.9)}
            className={`flex-1 py-1.5 px-2 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
              pageScale === 0.9 ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Minimize2 className="w-3 h-3" /> Fit
          </button>
          <button
            onClick={() => setPageScale && setPageScale(1)}
            className={`flex-1 py-1.5 px-2 rounded text-xs font-medium transition-colors ${
              pageScale === 1 ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            100%
          </button>
          <button
            onClick={() => setPageScale && setPageScale(1.1)}
            className={`flex-1 py-1.5 px-2 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
              pageScale === 1.1 ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Maximize2 className="w-3 h-3" /> +
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1">Scale content to fit one page</p>
      </div>

      {/* Templates */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Layout className="w-3 h-3" /> Templates
        </h3>

        {/* Template Group Tabs */}
        <div className="flex gap-1 mb-2">
          {Object.keys(templateGroups).map((group) => (
            <button
              key={group}
              onClick={() => setActiveGroup(group)}
              className={`flex-1 py-1 px-1 rounded text-xs font-medium transition-colors ${
                activeGroup === group
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {group.split('-')[0]}
            </button>
          ))}
        </div>

        {/* Template List */}
        <div className="space-y-1.5 max-h-52 overflow-y-auto">
          {templateGroups[activeGroup].map((template) => (
            <button
              key={template.id}
              onClick={() => setActiveTemplate(template.id)}
              className={`w-full text-left p-2 rounded-lg transition-all ${
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

      {/* Quick Stats */}
      <div className="mb-5 p-3 bg-gray-50 rounded-lg">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-gray-600">Template:</div>
          <div className="font-medium text-gray-900 capitalize">{activeTemplate}</div>
          <div className="text-gray-600">Font:</div>
          <div className="font-medium text-gray-900 capitalize">{fontSize}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={() => window.print()}
          className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4" /> Print / PDF
        </button>
        <button
          onClick={resetToDefault}
          className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Reset Data
        </button>
      </div>
    </aside>
  )
}
