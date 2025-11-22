import { useResume } from '../../context/ResumeContext'
import { Card, Button, Input, Empty, Popconfirm, Typography } from 'antd'
import { PlusOutlined, DeleteOutlined, TrophyOutlined } from '@ant-design/icons'

const { Text, TextArea } = Typography

export default function AwardsSection() {
  const { resumeData, updateSection } = useResume()
  const awards = resumeData.awards || []

  const addAward = () => {
    updateSection('awards', [
      ...awards,
      { title: '', issuer: '', date: '', description: '' }
    ])
  }

  const updateAward = (index, field, value) => {
    const updated = awards.map((award, i) =>
      i === index ? { ...award, [field]: value } : award
    )
    updateSection('awards', updated)
  }

  const removeAward = (index) => {
    updateSection('awards', awards.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <TrophyOutlined className="text-yellow-500" />
            Awards & Honors
          </h3>
          <Text type="secondary" className="text-sm">
            Showcase your achievements, awards, and recognitions
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={addAward}>
          Add Award
        </Button>
      </div>

      {awards.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No awards added yet"
        >
          <Button type="primary" icon={<PlusOutlined />} onClick={addAward}>
            Add Your First Award
          </Button>
        </Empty>
      ) : (
        <div className="space-y-4">
          {awards.map((award, index) => (
            <Card
              key={index}
              size="small"
              title={
                <span className="font-medium flex items-center gap-2">
                  <TrophyOutlined className="text-yellow-500" />
                  {award.title || 'New Award'}
                </span>
              }
              extra={
                <Popconfirm
                  title="Delete this award?"
                  onConfirm={() => removeAward(index)}
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
                    Award Title *
                  </label>
                  <Input
                    value={award.title || ''}
                    onChange={(e) => updateAward(index, 'title', e.target.value)}
                    placeholder="Employee of the Year"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issuing Organization
                  </label>
                  <Input
                    value={award.issuer || ''}
                    onChange={(e) => updateAward(index, 'issuer', e.target.value)}
                    placeholder="Company Name / Institution"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Received
                  </label>
                  <Input
                    value={award.date || ''}
                    onChange={(e) => updateAward(index, 'date', e.target.value)}
                    placeholder="Dec 2023"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Input.TextArea
                    value={award.description || ''}
                    onChange={(e) => updateAward(index, 'description', e.target.value)}
                    placeholder="Brief description of the award and why you received it..."
                    rows={2}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
        <Text type="secondary" className="text-sm">
          <strong>Tip:</strong> Include academic awards, professional recognitions,
          hackathon wins, scholarships, and any other notable achievements.
        </Text>
      </div>
    </div>
  )
}
