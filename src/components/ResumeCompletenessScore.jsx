import { useMemo } from 'react'
import { useResume } from '../context/ResumeContext'
import { Progress, Tooltip, Typography, Popover, List, Badge, Space } from 'antd'
import {
  CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled,
  UserOutlined, ScheduleOutlined, BookOutlined, ToolOutlined,
  TrophyOutlined, SafetyCertificateOutlined, ProjectOutlined
} from '@ant-design/icons'

const { Text } = Typography

const scoreConfig = {
  personal: {
    label: 'Personal Info',
    icon: <UserOutlined />,
    weight: 25,
    fields: [
      { key: 'name', label: 'Full Name', required: true, points: 5 },
      { key: 'title', label: 'Job Title', required: true, points: 4 },
      { key: 'email', label: 'Email', required: true, points: 4 },
      { key: 'phone', label: 'Phone', required: false, points: 3 },
      { key: 'location', label: 'Location', required: false, points: 3 },
      { key: 'summary', label: 'Summary', required: true, points: 4, minLength: 50 },
      { key: 'linkedin', label: 'LinkedIn', required: false, points: 2 },
    ]
  },
  experience: {
    label: 'Work Experience',
    icon: <ScheduleOutlined />,
    weight: 30,
    isArray: true,
    minItems: 1,
    fields: [
      { key: 'company', label: 'Company', required: true },
      { key: 'position', label: 'Position', required: true },
      { key: 'startDate', label: 'Start Date', required: true },
      { key: 'projects', label: 'Projects/Achievements', required: false, isArray: true, minItems: 1 },
    ]
  },
  education: {
    label: 'Education',
    icon: <BookOutlined />,
    weight: 15,
    isArray: true,
    minItems: 1,
    fields: [
      { key: 'institution', label: 'Institution', required: true },
      { key: 'degree', label: 'Degree', required: true },
      { key: 'field', label: 'Field of Study', required: false },
      { key: 'graduationDate', label: 'Graduation Date', required: false },
    ]
  },
  skills: {
    label: 'Skills',
    icon: <ToolOutlined />,
    weight: 15,
    isArray: true,
    minItems: 3,
    fields: [
      { key: 'name', label: 'Skill Name', required: true },
    ]
  },
  projects: {
    label: 'Projects',
    icon: <ProjectOutlined />,
    weight: 8,
    isArray: true,
    minItems: 1,
    optional: true,
  },
  certifications: {
    label: 'Certifications',
    icon: <SafetyCertificateOutlined />,
    weight: 4,
    isArray: true,
    minItems: 1,
    optional: true,
  },
  achievements: {
    label: 'Achievements',
    icon: <TrophyOutlined />,
    weight: 3,
    isArray: true,
    minItems: 1,
    optional: true,
  },
}

function calculateSectionScore(data, config) {
  if (!config) return { score: 0, maxScore: 0, details: [] }

  const details = []
  let score = 0
  let maxScore = config.weight

  if (config.isArray) {
    const items = data || []
    const hasItems = items.length >= (config.minItems || 1)

    if (hasItems) {
      // Check if items have required fields filled
      const validItems = items.filter(item => {
        if (!config.fields) return true
        return config.fields
          .filter(f => f.required)
          .every(f => {
            if (f.isArray) return item[f.key]?.length >= (f.minItems || 1)
            return item[f.key]?.toString().trim()
          })
      })

      const completeness = validItems.length / Math.max(items.length, config.minItems || 1)
      score = Math.round(config.weight * Math.min(completeness, 1))

      if (validItems.length < items.length) {
        details.push({
          status: 'warning',
          message: `${items.length - validItems.length} incomplete entries`
        })
      }
    } else {
      details.push({
        status: config.optional ? 'info' : 'error',
        message: config.optional ? 'Consider adding for a stronger resume' : `Add at least ${config.minItems || 1} entry`
      })
    }
  } else {
    // Object with individual fields
    let fieldScore = 0
    let fieldMax = 0

    config.fields?.forEach(field => {
      const value = data?.[field.key]
      const points = field.points || 1
      fieldMax += points

      let isValid = false
      if (field.minLength) {
        isValid = value?.toString().trim().length >= field.minLength
      } else {
        isValid = value?.toString().trim()
      }

      if (isValid) {
        fieldScore += points
      } else if (field.required) {
        details.push({
          status: 'error',
          message: `${field.label} is required`
        })
      } else {
        details.push({
          status: 'info',
          message: `Add ${field.label} for better results`
        })
      }
    })

    score = Math.round((fieldScore / fieldMax) * config.weight)
  }

  return { score, maxScore, details }
}

export default function ResumeCompletenessScore({ compact = false }) {
  const { resumeData } = useResume()

  const scoreData = useMemo(() => {
    const sections = []
    let totalScore = 0
    let totalMax = 0

    Object.entries(scoreConfig).forEach(([key, config]) => {
      const data = key === 'personal' ? resumeData.personal : resumeData[key]
      const result = calculateSectionScore(data, config)

      sections.push({
        key,
        ...config,
        ...result,
        percentage: result.maxScore > 0 ? Math.round((result.score / result.maxScore) * 100) : 0
      })

      totalScore += result.score
      totalMax += result.maxScore
    })

    const percentage = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0

    let status = 'exception'
    let statusText = 'Needs Work'
    let statusColor = '#ff4d4f'

    if (percentage >= 90) {
      status = 'success'
      statusText = 'Excellent'
      statusColor = '#52c41a'
    } else if (percentage >= 70) {
      status = 'normal'
      statusText = 'Good'
      statusColor = '#1890ff'
    } else if (percentage >= 50) {
      status = 'active'
      statusText = 'Fair'
      statusColor = '#faad14'
    }

    return { sections, totalScore, totalMax, percentage, status, statusText, statusColor }
  }, [resumeData])

  const popoverContent = (
    <div className="w-72">
      <div className="mb-3 pb-3 border-b">
        <div className="flex items-center justify-between mb-1">
          <Text strong>Resume Completeness</Text>
          <Text strong style={{ color: scoreData.statusColor }}>{scoreData.percentage}%</Text>
        </div>
        <Progress
          percent={scoreData.percentage}
          status={scoreData.status}
          showInfo={false}
          size="small"
        />
        <Text type="secondary" className="text-xs">{scoreData.statusText}</Text>
      </div>

      <List
        size="small"
        dataSource={scoreData.sections}
        renderItem={(section) => (
          <List.Item className="!px-0 !py-1.5">
            <div className="flex items-center justify-between w-full">
              <Space size="small">
                {section.percentage >= 80 ? (
                  <CheckCircleFilled className="text-green-500" />
                ) : section.percentage >= 50 ? (
                  <ExclamationCircleFilled className="text-yellow-500" />
                ) : (
                  <CloseCircleFilled className="text-red-500" />
                )}
                <Text className="text-sm">{section.label}</Text>
              </Space>
              <Text type="secondary" className="text-xs">
                {section.score}/{section.maxScore}
              </Text>
            </div>
          </List.Item>
        )}
      />

      <div className="mt-3 pt-3 border-t">
        <Text type="secondary" className="text-xs">
          Complete more sections to improve your resume's impact and ATS compatibility.
        </Text>
      </div>
    </div>
  )

  if (compact) {
    return (
      <Popover content={popoverContent} title={null} trigger="hover" placement="bottomRight">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <Progress
            type="circle"
            percent={scoreData.percentage}
            size={36}
            strokeColor={scoreData.statusColor}
            format={(percent) => <span className="text-xs font-semibold">{percent}</span>}
          />
        </div>
      </Popover>
    )
  }

  return (
    <Popover content={popoverContent} title={null} trigger="hover" placement="bottom">
      <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
        <Progress
          type="circle"
          percent={scoreData.percentage}
          size={44}
          strokeColor={scoreData.statusColor}
          format={(percent) => <span className="text-sm font-semibold">{percent}</span>}
        />
        <div>
          <Text strong className="text-sm block">{scoreData.statusText}</Text>
          <Text type="secondary" className="text-xs">Resume Score</Text>
        </div>
      </div>
    </Popover>
  )
}
