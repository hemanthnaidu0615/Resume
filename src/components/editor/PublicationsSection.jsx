import { useResume } from '../../context/ResumeContext'
import { Card, Button, Input, Empty, Popconfirm, Typography, Select } from 'antd'
import { PlusOutlined, DeleteOutlined, FileTextOutlined, LinkOutlined } from '@ant-design/icons'

const { Text } = Typography

const publicationTypes = [
  { value: 'journal', label: 'Journal Article' },
  { value: 'conference', label: 'Conference Paper' },
  { value: 'book', label: 'Book/Chapter' },
  { value: 'patent', label: 'Patent' },
  { value: 'thesis', label: 'Thesis/Dissertation' },
  { value: 'blog', label: 'Technical Blog' },
  { value: 'whitepaper', label: 'White Paper' },
  { value: 'other', label: 'Other' },
]

export default function PublicationsSection() {
  const { resumeData, updateSection } = useResume()
  const publications = resumeData.publications || []

  const addPublication = () => {
    updateSection('publications', [
      ...publications,
      { title: '', type: 'journal', publisher: '', date: '', authors: '', url: '', description: '' }
    ])
  }

  const updatePublication = (index, field, value) => {
    const updated = publications.map((pub, i) =>
      i === index ? { ...pub, [field]: value } : pub
    )
    updateSection('publications', updated)
  }

  const removePublication = (index) => {
    updateSection('publications', publications.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileTextOutlined className="text-purple-500" />
            Publications & Papers
          </h3>
          <Text type="secondary" className="text-sm">
            Add your research papers, articles, patents, and publications
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={addPublication}>
          Add Publication
        </Button>
      </div>

      {publications.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No publications added yet"
        >
          <Button type="primary" icon={<PlusOutlined />} onClick={addPublication}>
            Add Your First Publication
          </Button>
        </Empty>
      ) : (
        <div className="space-y-4">
          {publications.map((pub, index) => (
            <Card
              key={index}
              size="small"
              title={
                <span className="font-medium flex items-center gap-2">
                  <FileTextOutlined className="text-purple-500" />
                  {pub.title || 'New Publication'}
                </span>
              }
              extra={
                <Popconfirm
                  title="Delete this publication?"
                  onConfirm={() => removePublication(index)}
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
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <Input
                    value={pub.title || ''}
                    onChange={(e) => updatePublication(index, 'title', e.target.value)}
                    placeholder="Publication title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <Select
                    value={pub.type || 'journal'}
                    onChange={(value) => updatePublication(index, 'type', value)}
                    options={publicationTypes}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publisher/Journal/Conference
                  </label>
                  <Input
                    value={pub.publisher || ''}
                    onChange={(e) => updatePublication(index, 'publisher', e.target.value)}
                    placeholder="IEEE, ACM, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publication Date
                  </label>
                  <Input
                    value={pub.date || ''}
                    onChange={(e) => updatePublication(index, 'date', e.target.value)}
                    placeholder="Mar 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Authors
                  </label>
                  <Input
                    value={pub.authors || ''}
                    onChange={(e) => updatePublication(index, 'authors', e.target.value)}
                    placeholder="John Doe, Jane Smith"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL/DOI
                  </label>
                  <Input
                    value={pub.url || ''}
                    onChange={(e) => updatePublication(index, 'url', e.target.value)}
                    placeholder="https://doi.org/..."
                    prefix={<LinkOutlined />}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Abstract/Description
                  </label>
                  <Input.TextArea
                    value={pub.description || ''}
                    onChange={(e) => updatePublication(index, 'description', e.target.value)}
                    placeholder="Brief description of the publication..."
                    rows={2}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-4 p-4 bg-purple-50 rounded-lg">
        <Text type="secondary" className="text-sm">
          <strong>Tip:</strong> Include journal articles, conference papers, patents,
          technical blogs, and other publications. Links to online versions are helpful.
        </Text>
      </div>
    </div>
  )
}
