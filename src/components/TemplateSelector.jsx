import { useState } from 'react'
import { useResume } from '../context/ResumeContext'
import { Card, Row, Col, Typography, Tag, Modal, Button, Segmented, Tooltip, Badge } from 'antd'
import {
  CheckOutlined, EyeOutlined, AppstoreOutlined, UserOutlined,
  SafetyCertificateOutlined, CodeOutlined, BarChartOutlined,
  CrownOutlined, LayoutOutlined
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

// Template thumbnail preview components
const TemplateThumbnail = ({ type, color }) => {
  const baseStyle = "w-full h-32 rounded-lg overflow-hidden relative"

  const thumbnails = {
    professional: (
      <div className={baseStyle} style={{ backgroundColor: '#f8fafc' }}>
        <div className="h-8 w-full" style={{ backgroundColor: color }} />
        <div className="p-2 space-y-1.5">
          <div className="w-16 h-1.5 rounded bg-gray-300" />
          <div className="w-12 h-1 rounded bg-gray-200" />
          <div className="flex gap-2 mt-2">
            <div className="flex-1 space-y-1">
              <div className="w-full h-1 rounded bg-gray-200" />
              <div className="w-3/4 h-1 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    ),
    minimal: (
      <div className={baseStyle} style={{ backgroundColor: '#fff' }}>
        <div className="p-3 space-y-2 border-b">
          <div className="w-20 h-2 rounded bg-gray-800" />
          <div className="w-16 h-1 rounded bg-gray-400" />
        </div>
        <div className="p-3 space-y-1">
          <div className="w-full h-1 rounded bg-gray-200" />
          <div className="w-3/4 h-1 rounded bg-gray-200" />
          <div className="w-5/6 h-1 rounded bg-gray-200" />
        </div>
      </div>
    ),
    modern: (
      <div className={baseStyle} style={{ backgroundColor: '#fff' }}>
        <div className="flex h-full">
          <div className="w-1/3 h-full p-2" style={{ backgroundColor: color }}>
            <div className="w-8 h-8 rounded-full bg-white/30 mb-2" />
            <div className="w-full h-1 rounded bg-white/40 mb-1" />
            <div className="w-2/3 h-1 rounded bg-white/30" />
          </div>
          <div className="flex-1 p-2 space-y-1.5">
            <div className="w-16 h-1.5 rounded bg-gray-300" />
            <div className="w-full h-1 rounded bg-gray-200" />
            <div className="w-3/4 h-1 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    ),
    creative: (
      <div className={baseStyle} style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}>
        <div className="p-3 space-y-2">
          <div className="w-20 h-2 rounded bg-white" />
          <div className="w-14 h-1 rounded bg-white/60" />
        </div>
        <div className="bg-white mx-2 p-2 rounded-t-lg mt-2 space-y-1">
          <div className="w-full h-1 rounded bg-gray-200" />
          <div className="w-2/3 h-1 rounded bg-gray-200" />
        </div>
      </div>
    ),
    executive: (
      <div className={baseStyle} style={{ backgroundColor: '#fafafa' }}>
        <div className="p-3 border-b-2 border-gray-800">
          <div className="w-24 h-2 rounded bg-gray-800" />
          <div className="w-16 h-1 rounded bg-gray-400 mt-1" />
        </div>
        <div className="p-3 space-y-1">
          <div className="w-12 h-1 rounded bg-gray-600" />
          <div className="w-full h-1 rounded bg-gray-200" />
          <div className="w-3/4 h-1 rounded bg-gray-200" />
        </div>
      </div>
    ),
    frontend: (
      <div className={baseStyle} style={{ backgroundColor: '#f0f9ff' }}>
        <div className="h-10 w-full flex items-center px-3" style={{ backgroundColor: color }}>
          <div className="w-14 h-2 rounded bg-white" />
        </div>
        <div className="p-2 space-y-1.5">
          <div className="flex gap-1">
            <div className="px-1.5 py-0.5 rounded text-[6px] bg-blue-100 text-blue-600">React</div>
            <div className="px-1.5 py-0.5 rounded text-[6px] bg-green-100 text-green-600">Vue</div>
          </div>
          <div className="w-full h-1 rounded bg-gray-200" />
        </div>
      </div>
    ),
    devops: (
      <div className={baseStyle} style={{ backgroundColor: '#1a1a2e' }}>
        <div className="p-2 space-y-1">
          <div className="flex items-center gap-1">
            <span className="text-green-400 text-[8px]">$</span>
            <div className="w-20 h-1.5 rounded bg-green-500/60" />
          </div>
          <div className="w-16 h-1 rounded bg-orange-400/40" />
          <div className="w-24 h-1 rounded bg-gray-600" />
        </div>
      </div>
    ),
    'product-manager': (
      <div className={baseStyle} style={{ backgroundColor: '#faf5ff' }}>
        <div className="h-8 px-3 flex items-center" style={{ backgroundColor: color }}>
          <div className="w-16 h-2 rounded bg-white" />
        </div>
        <div className="p-2 flex gap-2">
          <div className="text-center">
            <div className="text-[10px] font-bold" style={{ color }}>+40%</div>
            <div className="text-[6px] text-gray-400">Growth</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-bold" style={{ color }}>5M</div>
            <div className="text-[6px] text-gray-400">Users</div>
          </div>
        </div>
      </div>
    ),
    'data-science': (
      <div className={baseStyle} style={{ backgroundColor: '#ecfdf5' }}>
        <div className="h-8 px-3 flex items-center" style={{ backgroundColor: color }}>
          <div className="w-14 h-2 rounded bg-white" />
        </div>
        <div className="p-2 space-y-1.5">
          <div className="flex items-center gap-1">
            <span className="text-[6px] text-gray-500">Python</span>
            <div className="flex-1 h-1.5 rounded-full bg-gray-200">
              <div className="h-full w-4/5 rounded-full" style={{ backgroundColor: color }} />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[6px] text-gray-500">ML</span>
            <div className="flex-1 h-1.5 rounded-full bg-gray-200">
              <div className="h-full w-3/4 rounded-full" style={{ backgroundColor: color }} />
            </div>
          </div>
        </div>
      </div>
    ),
    'ats-optimized': (
      <div className={baseStyle} style={{ backgroundColor: '#fff' }}>
        <div className="p-3 space-y-2">
          <div className="w-20 h-2 rounded bg-gray-800" />
          <div className="text-[6px] text-gray-500">email@example.com | 123-456</div>
          <div className="border-t pt-2 space-y-1">
            <div className="w-full h-1 rounded bg-gray-300" />
            <div className="w-5/6 h-1 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    ),
    compact: (
      <div className={baseStyle} style={{ backgroundColor: '#fff' }}>
        <div className="p-2 space-y-1" style={{ fontSize: '4px' }}>
          <div className="w-16 h-1.5 rounded" style={{ backgroundColor: color }} />
          <div className="grid grid-cols-2 gap-1">
            <div className="space-y-0.5">
              <div className="w-full h-0.5 rounded bg-gray-300" />
              <div className="w-3/4 h-0.5 rounded bg-gray-200" />
            </div>
            <div className="space-y-0.5">
              <div className="w-full h-0.5 rounded bg-gray-300" />
              <div className="w-2/3 h-0.5 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    ),
    elegant: (
      <div className={baseStyle} style={{ backgroundColor: '#fefefe' }}>
        <div className="text-center p-3 border-b" style={{ borderColor: color }}>
          <div className="w-16 h-2 rounded bg-gray-800 mx-auto" />
          <div className="w-10 h-1 rounded bg-gray-400 mx-auto mt-1" />
        </div>
        <div className="p-2 space-y-1">
          <div className="w-full h-1 rounded bg-gray-200" />
          <div className="w-3/4 h-1 rounded bg-gray-200 mx-auto" />
        </div>
      </div>
    ),
    tech: (
      <div className={baseStyle} style={{ backgroundColor: '#0d1117' }}>
        <div className="p-2 space-y-1.5">
          <div className="w-16 h-2 rounded" style={{ backgroundColor: color }} />
          <div className="flex gap-1">
            <div className="px-1 py-0.5 rounded text-[5px] border border-green-500/50 text-green-400">JS</div>
            <div className="px-1 py-0.5 rounded text-[5px] border border-blue-500/50 text-blue-400">TS</div>
          </div>
          <div className="w-full h-1 rounded bg-gray-700" />
        </div>
      </div>
    ),
    sidebar: (
      <div className={baseStyle} style={{ backgroundColor: '#fff' }}>
        <div className="flex h-full">
          <div className="flex-1 p-2 space-y-1">
            <div className="w-14 h-1.5 rounded bg-gray-800" />
            <div className="w-full h-1 rounded bg-gray-200" />
            <div className="w-3/4 h-1 rounded bg-gray-200" />
          </div>
          <div className="w-1/3 h-full p-2" style={{ backgroundColor: color }}>
            <div className="w-full h-1 rounded bg-white/40 mb-1" />
            <div className="w-2/3 h-1 rounded bg-white/30" />
          </div>
        </div>
      </div>
    ),
    timeline: (
      <div className={baseStyle} style={{ backgroundColor: '#fff8f0' }}>
        <div className="p-2">
          <div className="w-16 h-2 rounded mb-2" style={{ backgroundColor: color }} />
          <div className="flex items-start gap-1">
            <div className="w-1.5 h-1.5 rounded-full mt-0.5" style={{ backgroundColor: color }} />
            <div className="flex-1 space-y-0.5">
              <div className="w-full h-1 rounded bg-gray-300" />
              <div className="w-2/3 h-1 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    ),
  }

  return thumbnails[type] || thumbnails.professional
}

const templateCategories = [
  {
    name: 'General Purpose',
    icon: <LayoutOutlined />,
    description: 'Versatile templates for any industry',
    templates: [
      { id: 'professional', name: 'Professional', description: 'Clean, modern design with clear sections. Perfect for corporate roles.', color: '#0ea5e9', best: 'Corporate, Traditional', ats: 85 },
      { id: 'minimal', name: 'Minimal', description: 'Simple black and white. Maximum ATS compatibility.', color: '#374151', best: 'ATS Systems', ats: 98 },
      { id: 'creative', name: 'Creative', description: 'Bold colors and gradient header for creative roles.', color: '#8b5cf6', best: 'Design, Marketing', ats: 70 },
      { id: 'executive', name: 'Executive', description: 'Traditional serif fonts for senior positions.', color: '#1e293b', best: 'Leadership', ats: 90 },
      { id: 'modern', name: 'Modern', description: 'Two-column layout with colored sidebar.', color: '#f43f5e', best: 'Tech, Product', ats: 75 },
    ]
  },
  {
    name: 'Role-Based',
    icon: <UserOutlined />,
    description: 'Optimized for specific job roles',
    templates: [
      { id: 'frontend', name: 'Frontend Dev', description: 'Optimized for frontend/UI developers. Highlights tech stack.', color: '#3B82F6', best: 'React, Vue, Angular', ats: 82 },
      { id: 'devops', name: 'DevOps/SRE', description: 'Terminal-style theme for ops engineers.', color: '#F97316', best: 'Cloud, Infrastructure', ats: 78 },
      { id: 'product-manager', name: 'Product Manager', description: 'Metrics-focused style highlighting impact.', color: '#8B5CF6', best: 'PM, Strategy', ats: 85 },
      { id: 'data-science', name: 'Data Science', description: 'Analytics-focused with skill proficiency bars.', color: '#10B981', best: 'ML, Analytics', ats: 80 },
    ]
  },
  {
    name: 'Specialty',
    icon: <AppstoreOutlined />,
    description: 'Unique layouts for specific needs',
    templates: [
      { id: 'ats-optimized', name: 'ATS Max', description: 'Maximum ATS compatibility. No graphics.', color: '#1F2937', best: 'Large Companies', ats: 100 },
      { id: 'compact', name: 'Compact', description: 'Dense single-page layout for entry level.', color: '#10b981', best: 'Entry Level', ats: 88 },
      { id: 'elegant', name: 'Elegant', description: 'Sophisticated with decorative elements.', color: '#6366f1', best: 'Finance, Consulting', ats: 82 },
      { id: 'tech', name: 'Tech/Terminal', description: 'Code-like dark theme presentation.', color: '#22c55e', best: 'Software Engineers', ats: 72 },
      { id: 'sidebar', name: 'Sidebar', description: 'Right sidebar layout for skills showcase.', color: '#ec4899', best: 'Creative, Sales', ats: 76 },
      { id: 'timeline', name: 'Timeline', description: 'Visual career progression layout.', color: '#f97316', best: 'Career Growth', ats: 74 },
    ]
  }
]

export default function TemplateSelector() {
  const { activeTemplate, setActiveTemplate, themeColor, setThemeColor, resumeData } = useResume()
  const [previewTemplate, setPreviewTemplate] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const allTemplates = templateCategories.flatMap(cat => cat.templates)

  const filteredCategories = activeCategory === 'all'
    ? templateCategories
    : templateCategories.filter(cat => cat.name.toLowerCase().includes(activeCategory.toLowerCase()))

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Title level={2} className="!mb-2">Choose Your Template</Title>
        <Text type="secondary" className="text-base">
          15 professional templates optimized for different roles and industries
        </Text>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-6">
        <Segmented
          value={activeCategory}
          onChange={setActiveCategory}
          options={[
            { label: 'All Templates', value: 'all' },
            { label: 'General', value: 'general' },
            { label: 'Role-Based', value: 'role' },
            { label: 'Specialty', value: 'specialty' },
          ]}
          size="large"
        />
      </div>

      {/* Template Grid */}
      {filteredCategories.map((category) => (
        <div key={category.name} className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl" style={{ color: themeColor }}>{category.icon}</span>
            <Title level={4} className="!mb-0">{category.name}</Title>
            <Text type="secondary" className="ml-2">- {category.description}</Text>
          </div>

          <Row gutter={[16, 16]}>
            {category.templates.map((template) => (
              <Col key={template.id} xs={12} sm={8} md={6} lg={4}>
                <Card
                  hoverable
                  className={`transition-all duration-200 ${
                    activeTemplate === template.id
                      ? 'ring-2 ring-offset-2'
                      : ''
                  }`}
                  style={{
                    borderColor: activeTemplate === template.id ? template.color : undefined,
                    ringColor: activeTemplate === template.id ? template.color : undefined,
                  }}
                  cover={
                    <div className="relative group">
                      <TemplateThumbnail type={template.id} color={template.color} />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Tooltip title="Preview">
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<EyeOutlined />}
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              setPreviewTemplate(template)
                            }}
                          />
                        </Tooltip>
                      </div>
                      {/* Active badge */}
                      {activeTemplate === template.id && (
                        <div
                          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: template.color }}
                        >
                          <CheckOutlined className="text-white text-xs" />
                        </div>
                      )}
                      {/* ATS score badge */}
                      <Tooltip title="ATS Compatibility Score">
                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/90 shadow-sm">
                          ATS: {template.ats}%
                        </div>
                      </Tooltip>
                    </div>
                  }
                  bodyStyle={{ padding: '12px' }}
                  onClick={() => {
                    setActiveTemplate(template.id)
                    setThemeColor(template.color)
                  }}
                >
                  <div>
                    <Text strong className="text-sm block">{template.name}</Text>
                    <Text type="secondary" className="text-xs block mb-2 line-clamp-2">
                      {template.description}
                    </Text>
                    <Tag color={template.color} className="text-xs m-0">
                      {template.best}
                    </Tag>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}

      {/* Selection Guide */}
      <Card className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <Title level={4} className="!mb-4">Template Selection Guide</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="h-full">
              <SafetyCertificateOutlined className="text-2xl text-blue-500 mb-2" />
              <Text strong className="block text-blue-600">For ATS Systems</Text>
              <Paragraph className="text-sm text-gray-600 !mb-0">
                Use <strong>ATS Max</strong> or <strong>Minimal</strong>. Simple formatting ensures parsing.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="h-full">
              <CodeOutlined className="text-2xl text-purple-500 mb-2" />
              <Text strong className="block text-purple-600">For Tech Roles</Text>
              <Paragraph className="text-sm text-gray-600 !mb-0">
                Try <strong>Frontend Dev</strong>, <strong>DevOps</strong>, or <strong>Tech</strong> templates.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="h-full">
              <BarChartOutlined className="text-2xl text-green-500 mb-2" />
              <Text strong className="block text-green-600">For Data/Analytics</Text>
              <Paragraph className="text-sm text-gray-600 !mb-0">
                <strong>Data Science</strong> template with skill proficiency visualization.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="h-full">
              <CrownOutlined className="text-2xl text-amber-500 mb-2" />
              <Text strong className="block text-amber-600">For Leadership</Text>
              <Paragraph className="text-sm text-gray-600 !mb-0">
                <strong>Product Manager</strong> or <strong>Executive</strong> for senior roles.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Preview Modal */}
      <Modal
        open={!!previewTemplate}
        onCancel={() => setPreviewTemplate(null)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setPreviewTemplate(null)}>
            Close
          </Button>,
          <Button
            key="select"
            type="primary"
            onClick={() => {
              if (previewTemplate) {
                setActiveTemplate(previewTemplate.id)
                setThemeColor(previewTemplate.color)
                setPreviewTemplate(null)
              }
            }}
          >
            Use This Template
          </Button>
        ]}
        title={
          <div className="flex items-center gap-2">
            <span>{previewTemplate?.name}</span>
            <Tag color={previewTemplate?.color}>{previewTemplate?.best}</Tag>
          </div>
        }
      >
        {previewTemplate && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="transform scale-150 origin-top">
                <TemplateThumbnail type={previewTemplate.id} color={previewTemplate.color} />
              </div>
            </div>
            <div className="text-center pt-4 border-t">
              <Paragraph className="text-gray-600">{previewTemplate.description}</Paragraph>
              <div className="flex justify-center gap-4 text-sm">
                <div>
                  <Text type="secondary">ATS Score: </Text>
                  <Text strong style={{ color: previewTemplate.ats >= 85 ? '#10b981' : previewTemplate.ats >= 70 ? '#f59e0b' : '#ef4444' }}>
                    {previewTemplate.ats}%
                  </Text>
                </div>
                <div>
                  <Text type="secondary">Best for: </Text>
                  <Text strong>{previewTemplate.best}</Text>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
