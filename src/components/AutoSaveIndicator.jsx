import { useState, useEffect, useRef } from 'react'
import { useResume } from '../context/ResumeContext'
import { Typography, Tooltip, Space } from 'antd'
import { CloudSyncOutlined, CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'

const { Text } = Typography

export default function AutoSaveIndicator() {
  const { resumeData } = useResume()
  const [saveStatus, setSaveStatus] = useState('saved') // 'saving', 'saved'
  const [lastSaved, setLastSaved] = useState(null)
  const previousDataRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Skip initial render
    if (previousDataRef.current === null) {
      previousDataRef.current = JSON.stringify(resumeData)
      setLastSaved(new Date())
      return
    }

    const currentData = JSON.stringify(resumeData)

    // Check if data actually changed
    if (currentData !== previousDataRef.current) {
      previousDataRef.current = currentData
      setSaveStatus('saving')

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Simulate save delay (localStorage is instant but we show feedback)
      timeoutRef.current = setTimeout(() => {
        setSaveStatus('saved')
        setLastSaved(new Date())
      }, 500)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [resumeData])

  const formatTime = (date) => {
    if (!date) return ''

    const now = new Date()
    const diff = Math.floor((now - date) / 1000)

    if (diff < 5) return 'Just now'
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`

    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Update display every 10 seconds
  const [, forceUpdate] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => forceUpdate(n => n + 1), 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Tooltip
      title={
        saveStatus === 'saving'
          ? 'Saving changes...'
          : `All changes saved to browser storage${lastSaved ? ` at ${lastSaved.toLocaleTimeString()}` : ''}`
      }
    >
      <Space size={4} className="text-gray-500 cursor-default select-none">
        {saveStatus === 'saving' ? (
          <>
            <SyncOutlined spin className="text-blue-500" />
            <Text type="secondary" className="text-xs hidden sm:inline">Saving...</Text>
          </>
        ) : (
          <>
            <CheckCircleOutlined className="text-green-500" />
            <Text type="secondary" className="text-xs hidden sm:inline">
              Saved {formatTime(lastSaved)}
            </Text>
          </>
        )}
      </Space>
    </Tooltip>
  )
}
