import { useResume } from '../../context/ResumeContext'
import { Form, Input, Typography, Row, Col, Alert } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, LinkedinOutlined, GithubOutlined, EnvironmentOutlined } from '@ant-design/icons'

const { TextArea } = Input
const { Text } = Typography

export default function PersonalSection() {
  const { resumeData, updatePersonal } = useResume()
  const { personal } = resumeData

  // Validation patterns
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const phonePattern = /^[\d\s+()-]{7,20}$/
  const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/

  // Validation states
  const isEmailValid = !personal.email || emailPattern.test(personal.email)
  const isPhoneValid = !personal.phone || phonePattern.test(personal.phone)
  const isLinkedInValid = !personal.linkedin || urlPattern.test(personal.linkedin)
  const isGithubValid = !personal.github || urlPattern.test(personal.github)
  const isWebsiteValid = !personal.website || urlPattern.test(personal.website)

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>

      <Form layout="vertical" className="space-y-2">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<Text strong>Full Name</Text>}
              required
              validateStatus={!personal.name?.trim() ? 'warning' : 'success'}
              help={!personal.name?.trim() ? 'Name is required for your resume' : null}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                value={personal.name || ''}
                onChange={(e) => updatePersonal('name', e.target.value)}
                placeholder="John Doe"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<Text strong>Job Title</Text>}
              required
              validateStatus={!personal.title?.trim() ? 'warning' : 'success'}
              help={!personal.title?.trim() ? 'Job title helps recruiters understand your role' : null}
            >
              <Input
                value={personal.title || ''}
                onChange={(e) => updatePersonal('title', e.target.value)}
                placeholder="Full-Stack Developer"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<Text strong>Email</Text>}
              required
              validateStatus={!personal.email?.trim() ? 'warning' : !isEmailValid ? 'error' : 'success'}
              help={
                !personal.email?.trim()
                  ? 'Email is required'
                  : !isEmailValid
                    ? 'Please enter a valid email address'
                    : null
              }
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                type="email"
                value={personal.email || ''}
                onChange={(e) => updatePersonal('email', e.target.value)}
                placeholder="john@example.com"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<Text strong>Phone</Text>}
              validateStatus={!isPhoneValid ? 'error' : undefined}
              help={!isPhoneValid ? 'Please enter a valid phone number' : null}
            >
              <Input
                prefix={<PhoneOutlined className="text-gray-400" />}
                value={personal.phone || ''}
                onChange={(e) => updatePersonal('phone', e.target.value)}
                placeholder="+1 234 567 8900"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={<Text strong>Location</Text>}
          validateStatus={!personal.location?.trim() ? 'warning' : 'success'}
          help={!personal.location?.trim() ? 'Location helps with job matching' : null}
        >
          <Input
            prefix={<EnvironmentOutlined className="text-gray-400" />}
            value={personal.location || ''}
            onChange={(e) => updatePersonal('location', e.target.value)}
            placeholder="City, State, Country"
            size="large"
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<Text strong>LinkedIn URL</Text>}
              validateStatus={!isLinkedInValid ? 'error' : undefined}
              help={!isLinkedInValid ? 'Please enter a valid LinkedIn URL' : null}
            >
              <Input
                prefix={<LinkedinOutlined className="text-gray-400" />}
                value={personal.linkedin || ''}
                onChange={(e) => updatePersonal('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<Text strong>GitHub URL</Text>}
              validateStatus={!isGithubValid ? 'error' : undefined}
              help={!isGithubValid ? 'Please enter a valid GitHub URL' : null}
            >
              <Input
                prefix={<GithubOutlined className="text-gray-400" />}
                value={personal.github || ''}
                onChange={(e) => updatePersonal('github', e.target.value)}
                placeholder="https://github.com/username"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={<Text strong>Website (Optional)</Text>}
          validateStatus={!isWebsiteValid ? 'error' : undefined}
          help={!isWebsiteValid ? 'Please enter a valid URL' : null}
        >
          <Input
            prefix={<GlobalOutlined className="text-gray-400" />}
            value={personal.website || ''}
            onChange={(e) => updatePersonal('website', e.target.value)}
            placeholder="https://yourwebsite.com"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label={<Text strong>Professional Summary</Text>}
          extra={
            <div className="flex justify-between mt-1">
              <Text type="secondary" className="text-xs">
                {(personal.summary || '').length < 100 && 'Aim for 100-300 characters for best results'}
              </Text>
              <Text type={personal.summary?.length > 500 ? 'danger' : 'secondary'} className="text-xs">
                {(personal.summary || '').length}/500 characters
              </Text>
            </div>
          }
          validateStatus={
            !personal.summary?.trim()
              ? 'warning'
              : personal.summary?.length < 50
                ? 'warning'
                : personal.summary?.length > 500
                  ? 'error'
                  : 'success'
          }
          help={
            !personal.summary?.trim()
              ? 'A professional summary helps recruiters understand your profile'
              : personal.summary?.length < 50
                ? 'Summary is too short - add more details'
                : personal.summary?.length > 500
                  ? 'Summary is too long - keep it concise'
                  : null
          }
        >
          <TextArea
            value={personal.summary || ''}
            onChange={(e) => updatePersonal('summary', e.target.value)}
            placeholder="Write a compelling summary about your professional background, key skills, and career objectives..."
            rows={5}
            showCount
            maxLength={500}
          />
        </Form.Item>
      </Form>

      {/* Validation Summary */}
      {(!personal.name?.trim() || !personal.email?.trim() || !personal.title?.trim()) && (
        <Alert
          message="Complete Required Fields"
          description="Name, job title, and email are essential for a professional resume."
          type="warning"
          showIcon
          className="mt-4"
        />
      )}
    </div>
  )
}
