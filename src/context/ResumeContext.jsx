import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { message } from 'antd'
import { defaultResumeData } from '../utils/defaultData'

const ResumeContext = createContext()

const MAX_HISTORY = 50

// Parse shared URL data
const parseSharedData = () => {
  try {
    const params = new URLSearchParams(window.location.search)
    const encodedData = params.get('data')
    if (encodedData) {
      // Decode the data (reverse of what we do in ExportModal)
      const decodedUri = decodeURIComponent(encodedData)
      const jsonStr = decodeURIComponent(escape(atob(decodedUri)))
      const data = JSON.parse(jsonStr)

      // Validate basic structure
      if (data && typeof data === 'object' && data.personal) {
        // Clear URL params after loading
        window.history.replaceState({}, '', window.location.pathname)
        return data
      }
    }
  } catch (error) {
    console.error('Failed to parse shared resume data:', error)
  }
  return null
}

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(() => {
    // First, check for shared data in URL
    const sharedData = parseSharedData()
    if (sharedData) {
      // Show notification in next tick to avoid rendering issues
      setTimeout(() => message.success('Resume loaded from shared link!'), 100)
      return sharedData
    }

    // Then check localStorage
    const saved = localStorage.getItem('resumeData')
    return saved ? JSON.parse(saved) : defaultResumeData
  })

  // Undo/Redo history
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const isUndoRedoRef = useRef(false)

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

  const [sectionVisibility, setSectionVisibility] = useState(() => {
    const saved = localStorage.getItem('sectionVisibility')
    return saved ? JSON.parse(saved) : {
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      achievements: true,
      awards: true,
      publications: true,
      volunteer: true,
      languages: true,
      interests: true,
      references: true,
    }
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

  useEffect(() => {
    localStorage.setItem('sectionVisibility', JSON.stringify(sectionVisibility))
  }, [sectionVisibility])

  // Track history for undo/redo
  useEffect(() => {
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false
      return
    }

    const currentState = JSON.stringify(resumeData)
    const lastState = history[historyIndex]

    // Only add to history if state actually changed
    if (currentState !== lastState) {
      setHistory(prev => {
        // Remove any future history if we're in the middle of the stack
        const newHistory = prev.slice(0, historyIndex + 1)
        newHistory.push(currentState)

        // Limit history size
        if (newHistory.length > MAX_HISTORY) {
          newHistory.shift()
          return newHistory
        }
        return newHistory
      })
      setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1))
    }
  }, [resumeData])

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  const undo = useCallback(() => {
    if (canUndo) {
      isUndoRedoRef.current = true
      setHistoryIndex(prev => prev - 1)
      setResumeData(JSON.parse(history[historyIndex - 1]))
    }
  }, [canUndo, history, historyIndex])

  const redo = useCallback(() => {
    if (canRedo) {
      isUndoRedoRef.current = true
      setHistoryIndex(prev => prev + 1)
      setResumeData(JSON.parse(history[historyIndex + 1]))
    }
  }, [canRedo, history, historyIndex])

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault()
          redo()
        } else {
          e.preventDefault()
          undo()
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  const updatePersonal = (keyOrUpdates, value) => {
    // Support both updatePersonal({ field: value }) and updatePersonal('field', value)
    const updates = typeof keyOrUpdates === 'string'
      ? { [keyOrUpdates]: value }
      : keyOrUpdates

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
    setSectionVisibility({
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      achievements: true,
      awards: true,
      publications: true,
      volunteer: true,
      languages: true,
      interests: true,
      references: true,
    })
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
    sectionVisibility,
    setSectionVisibility,
    updatePersonal,
    updateSection,
    addToSection,
    removeFromSection,
    updateItemInSection,
    importData,
    exportData,
    resetToDefault,
    // Undo/Redo
    undo,
    redo,
    canUndo,
    canRedo,
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
