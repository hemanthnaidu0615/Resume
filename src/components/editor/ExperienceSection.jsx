import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { Form, Input, Button, Card, Collapse, Space, Typography, Tag, Alert, Row, Col, Tooltip, Empty } from 'antd'
import { PlusOutlined, DeleteOutlined, DownOutlined, ProjectOutlined, CalendarOutlined, EnvironmentOutlined, TagsOutlined } from '@ant-design/icons'

const { TextArea } = Input
const { Text, Title } = Typography
const { Panel } = Collapse

export default function ExperienceSection() {
  const { resumeData, updateSection } = useResume()
  const [expandedExp, setExpandedExp] = useState(['0'])

  const experience = resumeData.experience || []

  const addExperience = () => {
    updateSection('experience', [
      ...experience,
      {
        company: '',
        location: '',
        position: '',
        startDate: '',
        endDate: '',
        projects: []
      }
    ])
    setExpandedExp([String(experience.length)])
  }

  const updateExperience = (index, field, value) => {
    const updated = experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    )
    updateSection('experience', updated)
  }

  const removeExperience = (index) => {
    updateSection('experience', experience.filter((_, i) => i !== index))
  }

  const addProject = (expIndex) => {
    const updated = experience.map((exp, i) =>
      i === expIndex ? {
        ...exp,
        projects: [...(exp.projects || []), {
          name: '',
          role: '',
          description: '',
          achievements: [],
          techStack: []
        }]
      } : exp
    )
    updateSection('experience', updated)
  }

  const updateProject = (expIndex, projIndex, field, value) => {
    const updated = experience.map((exp, i) =>
      i === expIndex ? {
        ...exp,
        projects: exp.projects.map((proj, j) =>
          j === projIndex ? { ...proj, [field]: value } : proj
        )
      } : exp
    )
    updateSection('experience', updated)
  }

  const removeProject = (expIndex, projIndex) => {
    const updated = experience.map((exp, i) =>
      i === expIndex ? {
        ...exp,
        projects: exp.projects.filter((_, j) => j !== projIndex)
      } : exp
    )
    updateSection('experience', updated)
  }

  const isExpValid = (exp) => {
    return exp.company?.trim() && exp.position?.trim() && exp.startDate?.trim()
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Title level={4} className="!mb-0">Work Experience</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={addExperience}>
          Add Experience
        </Button>
      </div>

      {experience.length === 0 ? (
        <Empty
          description="No experience added yet"
          className="py-8"
        >
          <Button type="primary" onClick={addExperience}>Add Your First Experience</Button>
        </Empty>
      ) : (
        <Collapse
          activeKey={expandedExp}
          onChange={(keys) => setExpandedExp(keys)}
          expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 0 : -90} />}
        >
          {experience.map((exp, expIndex) => (
            <Panel
              key={String(expIndex)}
              header={
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Text strong>{exp.company || 'New Company'}</Text>
                    <Text type="secondary" className="ml-2">{exp.position || 'Position'}</Text>
                  </div>
                  {!isExpValid(exp) && (
                    <Tag color="warning">Incomplete</Tag>
                  )}
                </div>
              }
              extra={
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => { e.stopPropagation(); removeExperience(expIndex) }}
                  size="small"
                >
                  Delete
                </Button>
              }
            >
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={<Text strong>Company Name</Text>}
                      required
                      validateStatus={!exp.company?.trim() ? 'error' : 'success'}
                      help={!exp.company?.trim() ? 'Company name is required' : null}
                    >
                      <Input
                        value={exp.company || ''}
                        onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                        placeholder="Company Name"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={<Text strong>Location</Text>}>
                      <Input
                        prefix={<EnvironmentOutlined className="text-gray-400" />}
                        value={exp.location || ''}
                        onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
                        placeholder="City, Country"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label={<Text strong>Position/Title</Text>}
                  required
                  validateStatus={!exp.position?.trim() ? 'error' : 'success'}
                  help={!exp.position?.trim() ? 'Position is required' : null}
                >
                  <Input
                    value={exp.position || ''}
                    onChange={(e) => updateExperience(expIndex, 'position', e.target.value)}
                    placeholder="Software Engineer, Product Manager, etc."
                    size="large"
                  />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={<Text strong>Start Date</Text>}
                      required
                      validateStatus={!exp.startDate?.trim() ? 'error' : 'success'}
                      help={!exp.startDate?.trim() ? 'Start date is required' : null}
                    >
                      <Input
                        prefix={<CalendarOutlined className="text-gray-400" />}
                        value={exp.startDate || ''}
                        onChange={(e) => updateExperience(expIndex, 'startDate', e.target.value)}
                        placeholder="Mar 2024"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={<Text strong>End Date</Text>}
                      extra={<Text type="secondary" className="text-xs">Leave empty or write "Present" for current job</Text>}
                    >
                      <Input
                        prefix={<CalendarOutlined className="text-gray-400" />}
                        value={exp.endDate || ''}
                        onChange={(e) => updateExperience(expIndex, 'endDate', e.target.value)}
                        placeholder="Present"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Projects Section */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <Space>
                      <ProjectOutlined />
                      <Text strong>Projects & Achievements</Text>
                    </Space>
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() => addProject(expIndex)}
                      size="small"
                    >
                      Add Project
                    </Button>
                  </div>

                  {exp.projects?.length === 0 && (
                    <Alert
                      message="Add projects to showcase your work"
                      description="Projects help demonstrate your impact. Include key achievements and technologies used."
                      type="info"
                      showIcon
                      className="mb-3"
                    />
                  )}

                  {exp.projects?.map((project, projIndex) => (
                    <Card
                      key={projIndex}
                      size="small"
                      className="mb-3"
                      title={
                        <Space>
                          <ProjectOutlined />
                          <span>{project.name || 'New Project'}</span>
                        </Space>
                      }
                      extra={
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => removeProject(expIndex, projIndex)}
                          size="small"
                        />
                      }
                    >
                      <Form layout="vertical">
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              label="Project Name"
                              validateStatus={!project.name?.trim() ? 'warning' : undefined}
                            >
                              <Input
                                value={project.name || ''}
                                onChange={(e) => updateProject(expIndex, projIndex, 'name', e.target.value)}
                                placeholder="Project Name"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="Your Role">
                              <Input
                                value={project.role || ''}
                                onChange={(e) => updateProject(expIndex, projIndex, 'role', e.target.value)}
                                placeholder="Lead Developer, Contributor, etc."
                              />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Form.Item label="Description">
                          <TextArea
                            value={project.description || ''}
                            onChange={(e) => updateProject(expIndex, projIndex, 'description', e.target.value)}
                            placeholder="Brief description of the project..."
                            rows={2}
                          />
                        </Form.Item>

                        <Form.Item
                          label={
                            <Tooltip title="Use action verbs and quantify results when possible">
                              <span>Key Achievements (one per line)</span>
                            </Tooltip>
                          }
                          extra={<Text type="secondary" className="text-xs">Tip: Start with action verbs like "Developed", "Improved", "Reduced"</Text>}
                        >
                          <TextArea
                            value={(project.achievements || []).join('\n')}
                            onChange={(e) => updateProject(expIndex, projIndex, 'achievements', e.target.value.split('\n').filter(a => a.trim()))}
                            placeholder="Increased performance by 40%&#10;Reduced load time from 3s to 1s&#10;Led team of 5 developers"
                            rows={4}
                          />
                        </Form.Item>

                        <Form.Item
                          label={
                            <Space>
                              <TagsOutlined />
                              <span>Tech Stack (comma separated)</span>
                            </Space>
                          }
                        >
                          <Input
                            value={(project.techStack || []).join(', ')}
                            onChange={(e) => updateProject(expIndex, projIndex, 'techStack', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                            placeholder="React, Node.js, PostgreSQL, AWS"
                          />
                          {project.techStack?.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {project.techStack.map((tech, i) => (
                                <Tag key={i} color="blue">{tech}</Tag>
                              ))}
                            </div>
                          )}
                        </Form.Item>
                      </Form>
                    </Card>
                  ))}
                </div>
              </Form>
            </Panel>
          ))}
        </Collapse>
      )}

      {experience.some(exp => !isExpValid(exp)) && (
        <Alert
          message="Incomplete Experience Entries"
          description="Some experience entries are missing required fields (company, position, start date). Complete them for a professional resume."
          type="warning"
          showIcon
          className="mt-4"
        />
      )}
    </div>
  )
}
