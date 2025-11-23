import { useResume } from '../../context/ResumeContext'
import { Card, Button, Input, Form, Space, Empty, Popconfirm, Typography, Tooltip } from 'antd'
import { PlusOutlined, DeleteOutlined, SafetyCertificateOutlined, LinkOutlined } from '@ant-design/icons'

const { Text } = Typography

export default function CertificationsSection() {
  const { resumeData, updateSection } = useResume()
  const certifications = resumeData.certifications || []

  const addCertification = () => {
    updateSection('certifications', [
      ...certifications,
      { name: '', issuer: '', date: '', credentialId: '', url: '' }
    ])
  }

  const updateCertification = (index, field, value) => {
    const updated = certifications.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    )
    updateSection('certifications', updated)
  }

  const removeCertification = (index) => {
    updateSection('certifications', certifications.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <SafetyCertificateOutlined className="text-primary-500" />
            Certifications
          </h3>
          <Text type="secondary" className="text-sm">
            Add professional certifications, licenses, and credentials
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={addCertification}>
          Add Certification
        </Button>
      </div>

      {certifications.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No certifications added yet"
        >
          <Button type="primary" icon={<PlusOutlined />} onClick={addCertification}>
            Add Your First Certification
          </Button>
        </Empty>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              size="small"
              title={
                <span className="font-medium">
                  {cert.name || 'New Certification'}
                </span>
              }
              extra={
                <Popconfirm
                  title="Delete this certification?"
                  onConfirm={() => removeCertification(index)}
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
                    Certification Name *
                  </label>
                  <Input
                    value={cert.name || ''}
                    onChange={(e) => updateCertification(index, 'name', e.target.value)}
                    placeholder="AWS Solutions Architect"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issuing Organization *
                  </label>
                  <Input
                    value={cert.issuer || ''}
                    onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                    placeholder="Amazon Web Services"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Date
                  </label>
                  <Input
                    value={cert.date || ''}
                    onChange={(e) => updateCertification(index, 'date', e.target.value)}
                    placeholder="Jan 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credential ID
                  </label>
                  <Input
                    value={cert.credentialId || ''}
                    onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                    placeholder="ABC123XYZ"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credential URL
                  </label>
                  <Input
                    value={cert.url || ''}
                    onChange={(e) => updateCertification(index, 'url', e.target.value)}
                    placeholder="https://www.credly.com/badges/..."
                    prefix={<LinkOutlined />}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <Text type="secondary" className="text-sm">
          <strong>Tip:</strong> Include certifications relevant to your target role.
          Popular ones include AWS, Google Cloud, Azure, Scrum, PMP, and industry-specific credentials.
        </Text>
      </div>
    </div>
  )
}
