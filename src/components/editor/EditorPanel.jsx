import { useState, useEffect } from 'react'
import { useResume } from '../../context/ResumeContext'
import { Tabs, Button, Upload, message, Space, Typography, Switch, Tooltip } from 'antd'
import {
  UserOutlined, ScheduleOutlined, BookOutlined, ToolOutlined,
  TrophyOutlined, GlobalOutlined, HeartOutlined, SafetyCertificateOutlined,
  StarOutlined, FileTextOutlined, ProjectOutlined, TeamOutlined,
  UploadOutlined, DownloadOutlined, BulbOutlined, DragOutlined, HolderOutlined
} from '@ant-design/icons'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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

const defaultSections = [
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

// Sortable Tab Item Component
function SortableTabItem({ section, isActive, onClick, isDragMode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id, disabled: !isDragMode })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition-all
        ${isActive ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'hover:bg-gray-100 text-gray-600'}
        ${isDragging ? 'shadow-lg' : ''}
        ${isDragMode ? 'border border-dashed border-gray-300' : ''}
      `}
      onClick={onClick}
    >
      {isDragMode && (
        <span {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
          <HolderOutlined />
        </span>
      )}
      {section.icon}
      <span className="text-sm font-medium whitespace-nowrap">{section.label}</span>
    </div>
  )
}

export default function EditorPanel() {
  const [activeSection, setActiveSection] = useState('personal')
  const [isDragMode, setIsDragMode] = useState(false)
  const { resumeData, importData, exportData } = useResume()

  // Load section order from localStorage
  const [sectionOrder, setSectionOrder] = useState(() => {
    const saved = localStorage.getItem('sectionOrder')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return defaultSections.map(s => s.id)
      }
    }
    return defaultSections.map(s => s.id)
  })

  // Save section order to localStorage
  useEffect(() => {
    localStorage.setItem('sectionOrder', JSON.stringify(sectionOrder))
  }, [sectionOrder])

  // Create ordered sections array
  const orderedSections = sectionOrder
    .map(id => defaultSections.find(s => s.id === id))
    .filter(Boolean)

  // DnD Kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
      message.success('Section order updated!')
    }
  }

  const resetSectionOrder = () => {
    setSectionOrder(defaultSections.map(s => s.id))
    message.info('Section order reset to default')
  }

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
    return false
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

  // Find active section component
  const ActiveComponent = orderedSections.find(s => s.id === activeSection)?.component || PersonalSection

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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Tooltip title="Enable to drag and reorder sections">
                <Switch
                  size="small"
                  checked={isDragMode}
                  onChange={setIsDragMode}
                />
              </Tooltip>
              <Text type="secondary" className="text-sm">
                <DragOutlined /> Reorder
              </Text>
            </div>
            {isDragMode && (
              <Button size="small" onClick={resetSectionOrder}>
                Reset Order
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Section Navigation with Drag & Drop */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 border-b border-gray-100">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={sectionOrder} strategy={horizontalListSortingStrategy}>
              <div className="flex flex-wrap gap-2">
                {orderedSections.map((section) => (
                  <SortableTabItem
                    key={section.id}
                    section={section}
                    isActive={activeSection === section.id}
                    onClick={() => !isDragMode && setActiveSection(section.id)}
                    isDragMode={isDragMode}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          {isDragMode && (
            <Text type="secondary" className="block text-xs mt-3">
              <DragOutlined /> Drag sections to reorder them. Click the toggle above to disable drag mode.
            </Text>
          )}
        </div>

        {/* Active Section Content */}
        <div className="p-4">
          <ActiveComponent />
        </div>
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
              {isDragMode && ' You can drag sections to customize your editing workflow.'}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
