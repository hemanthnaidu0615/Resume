import { useState, useEffect } from 'react'
import { useResume } from './context/ResumeContext'
import { Layout, Button, Typography, Tooltip, Dropdown, message, Segmented } from 'antd'
import {
  EyeOutlined, EditOutlined, AppstoreOutlined, SafetyCertificateOutlined,
  AimOutlined, RocketOutlined, ThunderboltOutlined, DownloadOutlined,
  ExperimentOutlined, MenuOutlined
} from '@ant-design/icons'
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
import ResumeCompletenessScore from './components/ResumeCompletenessScore'
import AutoSaveIndicator from './components/AutoSaveIndicator'

const { Header, Content, Sider } = Layout
const { Title, Text } = Typography

function App() {
  const [activeTab, setActiveTab] = useState('preview')
  const [showExport, setShowExport] = useState(false)
  const [showWizard, setShowWizard] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
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
    message.success('Resume created successfully! You can now preview and edit.')
  }

  const startNewResume = () => {
    setShowWizard(true)
  }

  // Show wizard mode
  if (showWizard) {
    return <ResumeWizard onComplete={handleWizardComplete} />
  }

  const menuItems = [
    { key: 'preview', icon: <EyeOutlined />, label: 'Preview' },
    { key: 'edit', icon: <EditOutlined />, label: 'Edit' },
    { key: 'templates', icon: <AppstoreOutlined />, label: 'Templates' },
    { key: 'ats', icon: <SafetyCertificateOutlined />, label: 'ATS Check' },
    { key: 'jd-match', icon: <AimOutlined />, label: 'JD Match' },
    { key: 'generator', icon: <RocketOutlined />, label: 'AI Writer' },
    { key: 'optimizer', icon: <ThunderboltOutlined />, label: 'Optimize' },
  ]

  const showSidebar = ['preview', 'edit', 'templates'].includes(activeTab)

  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <Header className="bg-white shadow-sm border-b px-4 flex items-center justify-between no-print" style={{ height: 64, lineHeight: 'normal' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}
          >
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <div className="hidden sm:block">
            <Title level={4} style={{ margin: 0, lineHeight: 1.2 }}>Resume Builder Pro</Title>
            <Text type="secondary" className="text-xs">Create professional resumes in minutes</Text>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto-save indicator */}
          <div className="hidden sm:flex items-center mr-2">
            <AutoSaveIndicator />
          </div>

          {/* Resume completeness score */}
          <div className="hidden md:block mr-2">
            <ResumeCompletenessScore compact />
          </div>

          <Tooltip title="Start New Resume with Wizard">
            <Button
              icon={<ExperimentOutlined />}
              onClick={startNewResume}
              className="hidden sm:flex"
            >
              Wizard
            </Button>
          </Tooltip>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {menuItems.map(item => (
              <Tooltip key={item.key} title={item.label}>
                <Button
                  type={activeTab === item.key ? 'primary' : 'text'}
                  icon={item.icon}
                  onClick={() => setActiveTab(item.key)}
                  size="middle"
                  className={activeTab === item.key ? '' : 'text-gray-600'}
                >
                  <span className="hidden lg:inline ml-1">{item.label}</span>
                </Button>
              </Tooltip>
            ))}
          </div>

          {/* Mobile Menu */}
          <Dropdown
            menu={{
              items: menuItems.map(item => ({
                key: item.key,
                icon: item.icon,
                label: item.label,
                onClick: () => setActiveTab(item.key)
              })),
              selectedKeys: [activeTab]
            }}
            trigger={['click']}
            className="md:hidden"
          >
            <Button icon={<MenuOutlined />} />
          </Dropdown>

          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => setShowExport(true)}
          >
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </Header>

      {/* Main Content */}
      <Layout>
        {/* Sidebar - only show for certain tabs */}
        {showSidebar && (
          <Sider
            width={280}
            collapsible
            collapsed={sidebarCollapsed}
            onCollapse={setSidebarCollapsed}
            collapsedWidth={0}
            breakpoint="lg"
            className="bg-white border-r no-print"
            style={{ height: 'calc(100vh - 64px)', overflow: 'auto' }}
            trigger={null}
          >
            <Sidebar
              themeColor={themeColor}
              setThemeColor={setThemeColor}
              activeTemplate={activeTemplate}
              setActiveTemplate={setActiveTemplate}
            />
          </Sider>
        )}

        {/* Main Area */}
        <Content
          className={`p-4 md:p-6 overflow-auto bg-gray-50 ${
            ['ats', 'jd-match', 'generator', 'optimizer'].includes(activeTab) ? 'max-w-5xl mx-auto w-full' : ''
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
        </Content>
      </Layout>

      {/* Export Modal */}
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
    </Layout>
  )
}

export default App
