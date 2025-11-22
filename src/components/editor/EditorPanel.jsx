import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { Tabs, Button, Upload, message, Space, Typography } from 'antd'
import {
  UserOutlined, ScheduleOutlined, BookOutlined, ToolOutlined,
  TrophyOutlined, GlobalOutlined, HeartOutlined, SafetyCertificateOutlined,
  StarOutlined, FileTextOutlined, ProjectOutlined, TeamOutlined,
  UploadOutlined, DownloadOutlined, BulbOutlined
} from '@ant-design/icons'

import PersonalSection from './PersonalSection'
import ExperienceSection from './ExperienceSection'
import EducationSection from './EducationSection'
import SkillsSection from './SkillsSection'
import AchievementsSection from './AchievementsSection'
import LanguagesSection from './LanguagesSection'
import InterestsSection from './InterestsSection'
import CertificationsSection from './CertificationsSection'
import AwardsSection from './AwardsSection'
import VolunteerSection from './VolunteerSection'
import PublicationsSection from './PublicationsSection'
import ProjectsSection from './ProjectsSection'
import ReferencesSection from './ReferencesSection'

const { Text } = Typography

const sections = [
  { id: 'personal', label: 'Personal', icon: <UserOutlined />, component: PersonalSection },
  { id: 'experience', label: 'Experience', icon: <ScheduleOutlined />, component: ExperienceSection },
  { id: 'education', label: 'Education', icon: <BookOutlined />, component: EducationSection },
  { id: 'skills', label: 'Skills', icon: <ToolOutlined />, component: SkillsSection },
  { id: 'projects', label: 'Projects', icon: <ProjectOutlined />, component: ProjectsSection },
  { id: 'certifications', label: 'Certifications', icon: <SafetyCertificateOutlined />, component: CertificationsSection },
  { id: 'achievements', label: 'Achievements', icon: <TrophyOutlined />, component: AchievementsSection },
  { id: 'awards', label: 'Awards', icon: <StarOutlined />, component: AwardsSection },
  { id: 'publications', label: 'Publications', icon: <FileTextOutlined />, component: PublicationsSection },
  { id: 'volunteer', label: 'Volunteer', icon: <HeartOutlined />, component: VolunteerSection },
  { id: 'languages', label: 'Languages', icon: <GlobalOutlined />, component: LanguagesSection },
  { id: 'interests', label: 'Interests', icon: <BulbOutlined />, component: InterestsSection },
  { id: 'references', label: 'References', icon: <TeamOutlined />, component: ReferencesSection },
]

export default function EditorPanel() {
  const [activeSection, setActiveSection] = useState('personal')
  const { resumeData, importData, exportData } = useResume()

  const handleImport = (file) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        importData(data)
        message.success('Resume data imported successfully!')
      } catch (error) {
        message.error('Invalid JSON file. Please check the file format.')
      }
    }
    reader.readAsText(file)
    return false // Prevent default upload behavior
  }

  const handleExportJSON = () => {
    const dataStr = exportData()
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resume-data.json'
    a.click()
    URL.revokeObjectURL(url)
    message.success('Resume data exported!')
  }

  const tabItems = sections.map(section => ({
    key: section.id,
    label: (
      <span className="flex items-center gap-1.5">
        {section.icon}
        <span className="hidden lg:inline">{section.label}</span>
      </span>
    ),
    children: <section.component />
  }))

  return (
    <div className="max-w-5xl mx-auto">
      {/* Import/Export Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Upload
              accept=".json"
              showUploadList={false}
              beforeUpload={handleImport}
            >
              <Button icon={<UploadOutlined />}>
                Import JSON
              </Button>
            </Upload>
            <Button icon={<DownloadOutlined />} onClick={handleExportJSON}>
              Export JSON
            </Button>
          </div>
          <Text type="secondary" className="text-sm">
            All changes are saved automatically to local storage
          </Text>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <Tabs
          activeKey={activeSection}
          onChange={setActiveSection}
          items={tabItems}
          tabPosition="top"
          size="middle"
          className="resume-editor-tabs"
          tabBarStyle={{
            padding: '0 16px',
            marginBottom: 0,
          }}
          tabBarGutter={8}
        />
      </div>

      {/* Quick Tips */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BulbOutlined className="text-blue-600 text-lg" />
          </div>
          <div>
            <Text strong className="text-gray-900">Quick Tip</Text>
            <Text type="secondary" className="block text-sm mt-1">
              Complete all relevant sections to increase your resume's ATS score.
              Focus on quantifiable achievements and use action verbs.
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
