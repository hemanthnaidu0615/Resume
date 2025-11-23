import { useState } from 'react'
import { useResume } from '../context/ResumeContext'
import { Typography, Segmented, Space, Button, Card, Tooltip, Collapse, Switch, Divider, Badge } from 'antd'
import {
  BgColorsOutlined, FontSizeOutlined, FileTextOutlined, LayoutOutlined,
  PrinterOutlined, UndoOutlined, ZoomInOutlined, ZoomOutOutlined,
  EyeOutlined, EyeInvisibleOutlined, CheckOutlined
} from '@ant-design/icons'

const { Text, Title } = Typography

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

const sectionsList = [
  { key: 'experience', label: 'Experience', required: true },
  { key: 'education', label: 'Education', required: true },
  { key: 'skills', label: 'Skills', required: true },
  { key: 'projects', label: 'Projects', required: false },
  { key: 'certifications', label: 'Certifications', required: false },
  { key: 'achievements', label: 'Achievements', required: false },
  { key: 'awards', label: 'Awards', required: false },
  { key: 'publications', label: 'Publications', required: false },
  { key: 'volunteer', label: 'Volunteer', required: false },
  { key: 'languages', label: 'Languages', required: false },
  { key: 'interests', label: 'Interests', required: false },
  { key: 'references', label: 'References', required: false },
]

export default function Sidebar({ themeColor, setThemeColor, activeTemplate, setActiveTemplate }) {
  const { fontSize, setFontSize, resetToDefault, pageScale, setPageScale, sectionVisibility, setSectionVisibility } = useResume()
  const [activeGroup, setActiveGroup] = useState('General')

  // Handle section visibility toggle
  const handleSectionToggle = (sectionKey, visible) => {
    if (setSectionVisibility) {
      setSectionVisibility(prev => ({
        ...prev,
        [sectionKey]: visible
      }))
    }
  }

  // Count visible sections
  const visibleSections = sectionVisibility
    ? Object.values(sectionVisibility).filter(Boolean).length
    : sectionsList.length

  const collapseItems = [
    {
      key: 'theme',
      label: (
        <Space>
          <BgColorsOutlined style={{ color: themeColor }} />
          <Text strong>Theme Color</Text>
        </Space>
      ),
      children: (
        <div className="grid grid-cols-4 gap-2 p-1">
          {themeColors.map((color) => (
            <Tooltip key={color.value} title={color.name}>
              <button
                onClick={() => setThemeColor(color.value)}
                className="w-10 h-10 rounded-lg transition-all hover:scale-110 relative"
                style={{
                  backgroundColor: color.value,
                  border: themeColor === color.value ? '3px solid white' : 'none',
                  boxShadow: themeColor === color.value ? `0 0 0 2px ${color.value}` : 'none'
                }}
              >
                {themeColor === color.value && (
                  <CheckOutlined className="text-white absolute inset-0 m-auto" />
                )}
              </button>
            </Tooltip>
          ))}
        </div>
      )
    },
    {
      key: 'font',
      label: (
        <Space>
          <FontSizeOutlined />
          <Text strong>Font Size</Text>
        </Space>
      ),
      children: (
        <Segmented
          block
          value={fontSize}
          onChange={setFontSize}
          options={[
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ]}
        />
      )
    },
    {
      key: 'scale',
      label: (
        <Space>
          <FileTextOutlined />
          <Text strong>Page Scale</Text>
        </Space>
      ),
      children: (
        <div className="space-y-2">
          <Segmented
            block
            value={pageScale}
            onChange={(val) => setPageScale && setPageScale(val)}
            options={[
              { label: <Space><ZoomOutOutlined />90%</Space>, value: 0.9 },
              { label: '100%', value: 1 },
              { label: <Space><ZoomInOutlined />110%</Space>, value: 1.1 },
            ]}
          />
          <Text type="secondary" className="text-xs">Scale content to fit one page</Text>
        </div>
      )
    },
    {
      key: 'sections',
      label: (
        <Space>
          <EyeOutlined />
          <Text strong>Section Visibility</Text>
          <Badge count={visibleSections} style={{ backgroundColor: themeColor }} size="small" />
        </Space>
      ),
      children: (
        <div className="space-y-2">
          {sectionsList.map((section) => (
            <div key={section.key} className="flex items-center justify-between py-1">
              <Space>
                <Text className={!sectionVisibility?.[section.key] !== false ? '' : 'text-gray-400'}>
                  {section.label}
                </Text>
                {section.required && <Badge count="Core" style={{ backgroundColor: '#52c41a', fontSize: 10 }} />}
              </Space>
              <Switch
                size="small"
                checked={sectionVisibility?.[section.key] !== false}
                onChange={(checked) => handleSectionToggle(section.key, checked)}
                disabled={section.required}
              />
            </div>
          ))}
          <Text type="secondary" className="text-xs block mt-2">
            Core sections cannot be hidden. Toggle others based on relevance.
          </Text>
        </div>
      )
    }
  ]

  return (
    <aside className="w-full bg-white p-4 no-print overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Templates Section */}
      <div className="mb-4">
        <Space className="mb-2">
          <LayoutOutlined style={{ color: themeColor }} />
          <Text strong>Templates</Text>
        </Space>

        {/* Template Group Tabs */}
        <Segmented
          block
          size="small"
          value={activeGroup}
          onChange={setActiveGroup}
          options={Object.keys(templateGroups)}
          className="mb-3"
        />

        {/* Template List */}
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {templateGroups[activeGroup].map((template) => (
            <Card
              key={template.id}
              size="small"
              hoverable
              onClick={() => setActiveTemplate(template.id)}
              className={`cursor-pointer transition-all ${
                activeTemplate === template.id ? 'border-2' : 'border border-gray-200'
              }`}
              style={{
                borderColor: activeTemplate === template.id ? themeColor : undefined,
                backgroundColor: activeTemplate === template.id ? `${themeColor}08` : undefined
              }}
              bodyStyle={{ padding: '8px 12px' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <Text strong className="text-sm">{template.name}</Text>
                  <Text type="secondary" className="block text-xs">{template.description}</Text>
                </div>
                {activeTemplate === template.id && (
                  <CheckOutlined style={{ color: themeColor }} />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Divider className="my-3" />

      {/* Settings Collapse */}
      <Collapse
        ghost
        defaultActiveKey={['theme']}
        items={collapseItems}
        expandIconPosition="end"
        className="sidebar-collapse"
      />

      <Divider className="my-3" />

      {/* Quick Stats */}
      <Card size="small" className="mb-4 bg-gray-50">
        <Text type="secondary" className="text-xs uppercase tracking-wider">Current Settings</Text>
        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
          <Text type="secondary">Template:</Text>
          <Text strong className="capitalize">{activeTemplate}</Text>
          <Text type="secondary">Font:</Text>
          <Text strong className="capitalize">{fontSize}</Text>
          <Text type="secondary">Scale:</Text>
          <Text strong>{pageScale ? `${pageScale * 100}%` : '100%'}</Text>
        </div>
      </Card>

      {/* Actions */}
      <div className="space-y-2">
        <Button
          type="primary"
          icon={<PrinterOutlined />}
          block
          size="large"
          onClick={() => window.print()}
        >
          Print / Save PDF
        </Button>
        <Button
          icon={<UndoOutlined />}
          block
          onClick={resetToDefault}
        >
          Reset All Data
        </Button>
      </div>
    </aside>
  )
}
