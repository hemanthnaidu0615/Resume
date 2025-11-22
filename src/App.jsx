import { useState, useEffect } from 'react'
import { useResume } from './context/ResumeContext'
import Sidebar from './components/Sidebar'
import ResumePreview from './components/ResumePreview'
import EditorPanel from './components/editor/EditorPanel'
import TemplateSelector from './components/TemplateSelector'
import ExportModal from './components/ExportModal'
import ResumeWizard from './components/wizard/ResumeWizard'
import ATSChecker from './components/ATSChecker'
import JDMatcher from './components/JDMatcher'
import AchievementGenerator from './components/AchievementGenerator'
import ContentOptimizer from './components/ContentOptimizer'
import { Sparkles, Eye, Edit3, Layout, Shield, Target, Download, Wand2, Zap } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('preview')
  const [showExport, setShowExport] = useState(false)
  const [showWizard, setShowWizard] = useState(false)
  const { activeTemplate, setActiveTemplate, themeColor, setThemeColor, resumeData } = useResume()

  // Check if this is a new user (no saved data)
  useEffect(() => {
    const hasSeenWizard = localStorage.getItem('resume_wizard_completed')
    const hasSavedData = localStorage.getItem('resume_data')

    // Show wizard for new users
    if (!hasSeenWizard && !hasSavedData) {
      setShowWizard(true)
    }
  }, [])

  const handleWizardComplete = () => {
    localStorage.setItem('resume_wizard_completed', 'true')
    setShowWizard(false)
    setActiveTab('preview')
  }

  const startNewResume = () => {
    setShowWizard(true)
  }

  // Show wizard mode
  if (showWizard) {
    return <ResumeWizard onComplete={handleWizardComplete} />
  }

  const tabs = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'edit', label: 'Edit', icon: Edit3 },
    { id: 'templates', label: 'Templates', icon: Layout },
    { id: 'ats', label: 'ATS Check', icon: Shield },
    { id: 'jd-match', label: 'JD Match', icon: Target },
    { id: 'generator', label: 'AI Writer', icon: Wand2 },
    { id: 'optimizer', label: 'Optimize', icon: Zap },
  ]

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

          <div className="flex items-center gap-1">
            <button
              onClick={startNewResume}
              className="flex items-center gap-2 px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden md:inline">Wizard</span>
            </button>

            <div className="w-px h-6 bg-gray-200 mx-1" />

            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg font-medium transition-colors text-sm ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden xl:inline">{tab.label}</span>
                </button>
              )
            })}

            <button
              onClick={() => setShowExport(true)}
              className="flex items-center gap-2 ml-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Export</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar - only show for certain tabs */}
        {['preview', 'edit', 'templates'].includes(activeTab) && (
          <Sidebar
            themeColor={themeColor}
            setThemeColor={setThemeColor}
            activeTemplate={activeTemplate}
            setActiveTemplate={setActiveTemplate}
          />
        )}

        {/* Main Area */}
        <main
          className={`flex-1 p-6 overflow-auto ${
            ['ats', 'jd-match', 'generator', 'optimizer'].includes(activeTab) ? 'max-w-5xl mx-auto' : ''
          }`}
          style={{ height: 'calc(100vh - 64px)' }}
        >
          {activeTab === 'preview' && <ResumePreview />}
          {activeTab === 'edit' && <EditorPanel />}
          {activeTab === 'templates' && <TemplateSelector />}
          {activeTab === 'ats' && <ATSChecker />}
          {activeTab === 'jd-match' && <JDMatcher />}
          {activeTab === 'generator' && <AchievementGenerator />}
          {activeTab === 'optimizer' && <ContentOptimizer />}
        </main>
      </div>

      {/* Export Modal */}
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
    </div>
  )
}

export default App
