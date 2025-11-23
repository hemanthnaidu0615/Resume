import { useResume } from '../../context/ResumeContext'
import { Card, Button, Input, Empty, Popconfirm, Typography, Switch, Alert } from 'antd'
import { PlusOutlined, DeleteOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'

const { Text } = Typography

export default function ReferencesSection() {
  const { resumeData, updateSection } = useResume()
  const references = resumeData.references || []

  const addReference = () => {
    updateSection('references', [
      ...references,
      { name: '', title: '', company: '', email: '', phone: '', relationship: '' }
    ])
  }

  const updateReference = (index, field, value) => {
    const updated = references.map((ref, i) =>
      i === index ? { ...ref, [field]: value } : ref
    )
    updateSection('references', updated)
  }

  const removeReference = (index) => {
    updateSection('references', references.filter((_, i) => i !== index))
  }

  const setAvailableUponRequest = () => {
    updateSection('references', [
      { name: 'Available upon request', title: '', company: '', email: '', phone: '', relationship: '' }
    ])
  }

  const isOnlyAvailableUponRequest = references.length === 1 &&
    references[0].name === 'Available upon request' &&
    !references[0].title && !references[0].company

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <UserOutlined className="text-blue-500" />
            References
          </h3>
          <Text type="secondary" className="text-sm">
            Add professional references who can vouch for your work
          </Text>
        </div>
        <div className="flex gap-2">
          <Button onClick={setAvailableUponRequest}>
            Set as "Upon Request"
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={addReference}>
            Add Reference
          </Button>
        </div>
      </div>

      <Alert
        message="Privacy Note"
        description="Only include references if specifically requested. Many employers prefer 'Available upon request' to protect referee privacy."
        type="info"
        showIcon
        className="mb-4"
      />

      {isOnlyAvailableUponRequest ? (
        <Card>
          <div className="text-center py-4">
            <Text className="text-lg">References: Available upon request</Text>
            <div className="mt-4">
              <Button type="primary" icon={<PlusOutlined />} onClick={addReference}>
                Add Specific References Instead
              </Button>
            </div>
          </div>
        </Card>
      ) : references.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No references added yet"
        >
          <div className="flex gap-2 justify-center">
            <Button onClick={setAvailableUponRequest}>
              Set as "Available Upon Request"
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={addReference}>
              Add Reference
            </Button>
          </div>
        </Empty>
      ) : (
        <div className="space-y-4">
          {references.map((ref, index) => (
            <Card
              key={index}
              size="small"
              title={
                <span className="font-medium flex items-center gap-2">
                  <UserOutlined className="text-blue-500" />
                  {ref.name || 'New Reference'}
                </span>
              }
              extra={
                <Popconfirm
                  title="Delete this reference?"
                  onConfirm={() => removeReference(index)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="text" danger icon={<DeleteOutlined />} size="small">
                    Delete
                  </Button>
                </Popconfirm>
              }
            >
              {ref.name === 'Available upon request' && !ref.title ? (
                <div className="text-center py-2">
                  <Text type="secondary">This will show as "Available upon request" on your resume</Text>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <Input
                      value={ref.name || ''}
                      onChange={(e) => updateReference(index, 'name', e.target.value)}
                      placeholder="John Smith"
                      prefix={<UserOutlined />}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title
                    </label>
                    <Input
                      value={ref.title || ''}
                      onChange={(e) => updateReference(index, 'title', e.target.value)}
                      placeholder="Engineering Manager"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <Input
                      value={ref.company || ''}
                      onChange={(e) => updateReference(index, 'company', e.target.value)}
                      placeholder="Google, Microsoft, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relationship
                    </label>
                    <Input
                      value={ref.relationship || ''}
                      onChange={(e) => updateReference(index, 'relationship', e.target.value)}
                      placeholder="Former Manager, Colleague, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      value={ref.email || ''}
                      onChange={(e) => updateReference(index, 'email', e.target.value)}
                      placeholder="john@example.com"
                      prefix={<MailOutlined />}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <Input
                      value={ref.phone || ''}
                      onChange={(e) => updateReference(index, 'phone', e.target.value)}
                      placeholder="+1 234 567 8900"
                      prefix={<PhoneOutlined />}
                    />
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <Text type="secondary" className="text-sm">
          <strong>Tip:</strong> Always ask permission before listing someone as a reference.
          Include 2-3 references from different contexts (managers, colleagues, clients).
        </Text>
      </div>
    </div>
  )
}
