import { useResume } from '../../context/ResumeContext'
import { Card, Button, Input, Empty, Popconfirm, Typography } from 'antd'
import { PlusOutlined, DeleteOutlined, HeartOutlined } from '@ant-design/icons'

const { Text } = Typography

export default function VolunteerSection() {
  const { resumeData, updateSection } = useResume()
  const volunteer = resumeData.volunteer || []

  const addVolunteer = () => {
    updateSection('volunteer', [
      ...volunteer,
      { organization: '', role: '', startDate: '', endDate: '', description: '', highlights: [] }
    ])
  }

  const updateVolunteer = (index, field, value) => {
    const updated = volunteer.map((vol, i) =>
      i === index ? { ...vol, [field]: value } : vol
    )
    updateSection('volunteer', updated)
  }

  const removeVolunteer = (index) => {
    updateSection('volunteer', volunteer.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <HeartOutlined className="text-red-500" />
            Volunteer Experience
          </h3>
          <Text type="secondary" className="text-sm">
            Highlight your community involvement and volunteer work
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={addVolunteer}>
          Add Volunteer Work
        </Button>
      </div>

      {volunteer.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No volunteer experience added yet"
        >
          <Button type="primary" icon={<PlusOutlined />} onClick={addVolunteer}>
            Add Volunteer Experience
          </Button>
        </Empty>
      ) : (
        <div className="space-y-4">
          {volunteer.map((vol, index) => (
            <Card
              key={index}
              size="small"
              title={
                <span className="font-medium flex items-center gap-2">
                  <HeartOutlined className="text-red-500" />
                  {vol.organization || 'New Volunteer Work'}
                </span>
              }
              extra={
                <Popconfirm
                  title="Delete this volunteer experience?"
                  onConfirm={() => removeVolunteer(index)}
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
                    Organization *
                  </label>
                  <Input
                    value={vol.organization || ''}
                    onChange={(e) => updateVolunteer(index, 'organization', e.target.value)}
                    placeholder="Red Cross, Local NGO, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role/Position *
                  </label>
                  <Input
                    value={vol.role || ''}
                    onChange={(e) => updateVolunteer(index, 'role', e.target.value)}
                    placeholder="Volunteer Coordinator"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <Input
                    value={vol.startDate || ''}
                    onChange={(e) => updateVolunteer(index, 'startDate', e.target.value)}
                    placeholder="Jan 2023"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <Input
                    value={vol.endDate || ''}
                    onChange={(e) => updateVolunteer(index, 'endDate', e.target.value)}
                    placeholder="Present or Dec 2023"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description & Achievements
                  </label>
                  <Input.TextArea
                    value={vol.description || ''}
                    onChange={(e) => updateVolunteer(index, 'description', e.target.value)}
                    placeholder="Describe your contributions and impact..."
                    rows={3}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-4 p-4 bg-red-50 rounded-lg">
        <Text type="secondary" className="text-sm">
          <strong>Tip:</strong> Volunteer experience shows character and soft skills.
          Include leadership roles, community service, and pro-bono work.
        </Text>
      </div>
    </div>
  )
}
