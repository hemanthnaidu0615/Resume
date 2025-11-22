import { createContext, useContext, useState, useEffect } from 'react'
import { defaultResumeData } from '../utils/defaultData'

const ResumeContext = createContext()

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData')
    return saved ? JSON.parse(saved) : defaultResumeData
  })

  const [activeTemplate, setActiveTemplate] = useState(() => {
    return localStorage.getItem('activeTemplate') || 'professional'
  })

  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem('themeColor') || '#0ea5e9'
  })

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize') || 'medium'
  })

  const [pageScale, setPageScale] = useState(() => {
    const saved = localStorage.getItem('pageScale')
    return saved ? parseFloat(saved) : 1
  })

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData))
  }, [resumeData])

  useEffect(() => {
    localStorage.setItem('activeTemplate', activeTemplate)
  }, [activeTemplate])

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor)
  }, [themeColor])

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize)
  }, [fontSize])

  useEffect(() => {
    localStorage.setItem('pageScale', pageScale.toString())
  }, [pageScale])

  const updatePersonal = (updates) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, ...updates }
    }))
  }

  const updateSection = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  const addToSection = (section, item) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), item]
    }))
  }

  const removeFromSection = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }))
  }

  const updateItemInSection = (section, index, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => i === index ? { ...item, ...data } : item)
    }))
  }

  const importData = (data) => {
    setResumeData(data)
  }

  const exportData = () => {
    return JSON.stringify(resumeData, null, 2)
  }

  const resetToDefault = () => {
    setResumeData(defaultResumeData)
    setActiveTemplate('professional')
    setThemeColor('#0ea5e9')
    setFontSize('medium')
    setPageScale(1)
  }

  const value = {
    resumeData,
    setResumeData,
    activeTemplate,
    setActiveTemplate,
    themeColor,
    setThemeColor,
    fontSize,
    setFontSize,
    pageScale,
    setPageScale,
    updatePersonal,
    updateSection,
    addToSection,
    removeFromSection,
    updateItemInSection,
    importData,
    exportData,
    resetToDefault
  }

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}
