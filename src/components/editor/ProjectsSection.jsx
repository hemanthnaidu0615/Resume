import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { Card, Button, Input, Empty, Popconfirm, Typography, Tag, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, ProjectOutlined, LinkOutlined, GithubOutlined } from '@ant-design/icons'

const { Text } = Typography

export default function ProjectsSection() {
  const { resumeData, updateSection } = useResume()
  const projects = resumeData.projects || []
  const [newTech, setNewTech] = useState({})

  const addProject = () => {
    updateSection('projects', [
      ...projects,
      {
        name: '',
        description: '',
        role: '',
        url: '',
        github: '',
        techStack: [],
        highlights: [],
        startDate: '',
        endDate: ''
      }
    ])
  }

  const updateProject = (index, field, value) => {
    const updated = projects.map((proj, i) =>
      i === index ? { ...proj, [field]: value } : proj
    )
    updateSection('projects', updated)
  }

  const removeProject = (index) => {
    updateSection('projects', projects.filter((_, i) => i !== index))
  }

  const addTech = (index) => {
    const tech = newTech[index]?.trim()
    if (tech) {
      const project = projects[index]
      const updatedTech = [...(project.techStack || []), tech]
      updateProject(index, 'techStack', updatedTech)
      setNewTech({ ...newTech, [index]: '' })
    }
  }

  const removeTech = (projIndex, techIndex) => {
    const project = projects[projIndex]
    const updatedTech = project.techStack.filter((_, i) => i !== techIndex)
    updateProject(projIndex, 'techStack', updatedTech)
  }

  const addHighlight = (index) => {
    const project = projects[index]
    const updatedHighlights = [...(project.highlights || []), '']
    updateProject(index, 'highlights', updatedHighlights)
  }

  const updateHighlight = (projIndex, highlightIndex, value) => {
    const project = projects[projIndex]
    const updatedHighlights = project.highlights.map((h, i) =>
      i === highlightIndex ? value : h
    )
    updateProject(projIndex, 'highlights', updatedHighlights)
  }

  const removeHighlight = (projIndex, highlightIndex) => {
    const project = projects[projIndex]
    const updatedHighlights = project.highlights.filter((_, i) => i !== highlightIndex)
    updateProject(projIndex, 'highlights', updatedHighlights)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ProjectOutlined className="text-green-500" />
            Personal Projects
          </h3>
          <Text type="secondary" className="text-sm">
            Showcase side projects, open source contributions, and personal work
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={addProject}>
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No projects added yet"
        >
          <Button type="primary" icon={<PlusOutlined />} onClick={addProject}>
            Add Your First Project
          </Button>
        </Empty>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <Card
              key={index}
              size="small"
              title={
                <span className="font-medium flex items-center gap-2">
                  <ProjectOutlined className="text-green-500" />
                  {project.name || 'New Project'}
                </span>
              }
              extra={
                <Popconfirm
                  title="Delete this project?"
                  onConfirm={() => removeProject(index)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="text" danger icon={<DeleteOutlined />} size="small">
                    Delete
                  </Button>
                </Popconfirm>
              }
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name *
                  </label>
                  <Input
                    value={project.name || ''}
                    onChange={(e) => updateProject(index, 'name', e.target.value)}
                    placeholder="My Awesome Project"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Role
                  </label>
                  <Input
                    value={project.role || ''}
                    onChange={(e) => updateProject(index, 'role', e.target.value)}
                    placeholder="Lead Developer, Creator, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <Input
                    value={project.startDate || ''}
                    onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                    placeholder="Jan 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <Input
                    value={project.endDate || ''}
                    onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                    placeholder="Present or Mar 2024"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Input.TextArea
                    value={project.description || ''}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    placeholder="Brief description of what the project does..."
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Live URL
                  </label>
                  <Input
                    value={project.url || ''}
                    onChange={(e) => updateProject(index, 'url', e.target.value)}
                    placeholder="https://myproject.com"
                    prefix={<LinkOutlined />}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub URL
                  </label>
                  <Input
                    value={project.github || ''}
                    onChange={(e) => updateProject(index, 'github', e.target.value)}
                    placeholder="https://github.com/user/repo"
                    prefix={<GithubOutlined />}
                  />
                </div>

                {/* Tech Stack */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tech Stack
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(project.techStack || []).map((tech, techIndex) => (
                      <Tag
                        key={techIndex}
                        closable
                        onClose={() => removeTech(index, techIndex)}
                        color="blue"
                      >
                        {tech}
                      </Tag>
                    ))}
                  </div>
                  <Space.Compact className="w-full">
                    <Input
                      value={newTech[index] || ''}
                      onChange={(e) => setNewTech({ ...newTech, [index]: e.target.value })}
                      placeholder="Add technology..."
                      onPressEnter={() => addTech(index)}
                    />
                    <Button type="primary" onClick={() => addTech(index)}>
                      Add
                    </Button>
                  </Space.Compact>
                </div>

                {/* Highlights */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Key Highlights
                  </label>
                  {(project.highlights || []).map((highlight, hIndex) => (
                    <div key={hIndex} className="flex gap-2 mb-2">
                      <Input
                        value={highlight}
                        onChange={(e) => updateHighlight(index, hIndex, e.target.value)}
                        placeholder="Key achievement or feature..."
                      />
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeHighlight(index, hIndex)}
                      />
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => addHighlight(index)}
                  >
                    Add Highlight
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-4 p-4 bg-green-50 rounded-lg">
        <Text type="secondary" className="text-sm">
          <strong>Tip:</strong> Include projects that demonstrate relevant skills.
          Add GitHub links and live demos when possible. Focus on impact and learnings.
        </Text>
      </div>
    </div>
  )
}
