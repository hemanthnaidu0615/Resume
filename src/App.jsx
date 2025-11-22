import { useState } from 'react'
import { useResume } from './context/ResumeContext'
import Sidebar from './components/Sidebar'
import ResumePreview from './components/ResumePreview'
import EditorPanel from './components/editor/EditorPanel'
import TemplateSelector from './components/TemplateSelector'
import ExportModal from './components/ExportModal'

function App() {
  const [activeTab, setActiveTab] = useState('preview')
  const [showExport, setShowExport] = useState(false)
  const { activeTemplate, setActiveTemplate, themeColor, setThemeColor } = useResume()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b no-print">
        <div className="max-w-full mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Resume Builder Pro</h1>
              <p className="text-xs text-gray-500">Create stunning resumes in minutes</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'preview' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'edit' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Edit Content
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'templates' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setShowExport(true)}
              className="btn-primary ml-2"
            >
              Export
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          themeColor={themeColor}
          setThemeColor={setThemeColor}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
        />

        {/* Main Area */}
        <main className="flex-1 p-6 overflow-auto" style={{ height: 'calc(100vh - 64px)' }}>
          {activeTab === 'preview' && <ResumePreview />}
          {activeTab === 'edit' && <EditorPanel />}
          {activeTab === 'templates' && <TemplateSelector />}
        </main>
      </div>

      {/* Export Modal */}
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
    </div>
  )
}

export default App
