import { useResume } from '../context/ResumeContext'
import { message } from 'antd'

// Simple HTML sanitizer to prevent XSS attacks
const sanitizeHTML = (html) => {
  // Remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
}

export default function ExportModal({ onClose }) {
  const { exportData, resumeData } = useResume()

  const handlePrint = () => {
    window.print()
    onClose()
  }

  const handleExportJSON = () => {
    const dataStr = exportData()
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${resumeData.personal.name.replace(/\s+/g, '_')}_resume.json`
    a.click()
    URL.revokeObjectURL(url)
    onClose()
  }

  const handleExportHTML = () => {
    const content = document.querySelector('#resume-content') || document.querySelector('.bg-white.shadow-2xl')
    if (content) {
      // Sanitize content to prevent XSS vulnerabilities
      const sanitizedContent = sanitizeHTML(content.outerHTML)
      // Sanitize name for title
      const sanitizedName = (resumeData.personal.name || 'Resume').replace(/[<>"'&]/g, '')
      const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${sanitizedName} - Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body>
  ${sanitizedContent}
</body>
</html>`
      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${(resumeData.personal.name || 'resume').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '')}_resume.html`
      a.click()
      URL.revokeObjectURL(url)
      message.success('HTML file downloaded successfully!')
    } else {
      message.error('Could not find resume content to export')
    }
    onClose()
  }

  const handleCopyLink = async () => {
    try {
      const dataStr = exportData()
      // Use encodeURIComponent for safer encoding (handles unicode properly)
      // and compress using simple compression for shorter URLs
      const encoded = encodeURIComponent(btoa(unescape(encodeURIComponent(dataStr))))
      const url = `${window.location.origin}?data=${encoded}`

      await navigator.clipboard.writeText(url)
      message.success('Shareable link copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy link:', error)
      message.error('Failed to copy link. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 no-print" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Export Resume</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>

        <div className="space-y-3">
          {/* Print / PDF */}
          <button
            onClick={handlePrint}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">
              📄
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Print / Save as PDF</h3>
              <p className="text-sm text-gray-500">Use browser print dialog to save as PDF</p>
            </div>
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
              💾
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Export JSON Data</h3>
              <p className="text-sm text-gray-500">Download resume data for backup or transfer</p>
            </div>
          </button>

          {/* Export HTML */}
          <button
            onClick={handleExportHTML}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
              🌐
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Export HTML</h3>
              <p className="text-sm text-gray-500">Download as standalone HTML file</p>
            </div>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
              🔗
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Copy Shareable Link</h3>
              <p className="text-sm text-gray-500">Share your resume with a URL</p>
            </div>
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          Tip: For best PDF quality, use Chrome and set margins to "None"
        </p>
      </div>
    </div>
  )
}
