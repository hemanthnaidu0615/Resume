import { createContext, useContext, useState, useCallback } from 'react'
import { Lightbulb, X, ChevronRight, Sparkles } from 'lucide-react'

const TipsContext = createContext()

// Comprehensive tips database
const TIPS_DATABASE = {
  personal: {
    name: {
      tip: "Use your full professional name as it appears on LinkedIn and legal documents.",
      examples: ["John David Smith", "Maria Garcia-Lopez"],
      avoid: ["JD Smith", "Johnny", "M. Garcia"]
    },
    title: {
      tip: "Match your title to the job you're applying for. Be specific and include seniority level.",
      examples: ["Senior Frontend Developer", "Full-Stack Engineer | Team Lead", "Product Manager - Growth"],
      avoid: ["Developer", "Engineer", "Worker"]
    },
    email: {
      tip: "Use a professional email address based on your name.",
      examples: ["john.smith@gmail.com", "maria.garcia@outlook.com"],
      avoid: ["cooldev123@gmail.com", "partyanimal@yahoo.com"]
    },
    phone: {
      tip: "Include country code for international applications. Use a professional voicemail.",
      examples: ["+1 (555) 123-4567", "+91 98765 43210"],
      avoid: ["Call me maybe", "555-1234"]
    },
    summary: {
      tip: "Write 2-3 impactful sentences highlighting years of experience, key skills, and unique value.",
      examples: [
        "Full-Stack Developer with 5+ years of experience building scalable web applications. Specialized in React and Node.js with a track record of leading teams and delivering products that serve millions of users."
      ],
      avoid: ["I am a hardworking developer...", "Looking for new opportunities..."]
    },
    linkedin: {
      tip: "Ensure your LinkedIn profile is complete and matches your resume.",
      examples: ["linkedin.com/in/johnsmith"],
      avoid: ["linkedin.com/in/yourprofile", "Not having one"]
    },
    github: {
      tip: "Make sure your pinned repositories showcase your best work.",
      examples: ["github.com/johnsmith"],
      avoid: ["Empty profile", "Only forked repos"]
    }
  },
  experience: {
    company: {
      tip: "Use the official company name. Add brief description if it's not well-known.",
      examples: ["Google", "TechStartup Inc. (AI-powered analytics platform)"],
      avoid: ["Goog", "That one tech company"]
    },
    position: {
      tip: "Use industry-standard job titles. Include progression if you were promoted.",
      examples: ["Software Engineer → Senior Software Engineer", "Junior Developer → Team Lead"],
      avoid: ["Code Ninja", "Tech Guru"]
    },
    achievements: {
      tip: "Start with action verbs and include quantifiable results. Focus on impact, not tasks.",
      formula: "[Action Verb] + [What you did] + [Result with metrics]",
      examples: [
        "Led migration of monolithic app to microservices, reducing deployment time by 80%",
        "Built real-time analytics dashboard used by 500+ enterprise customers",
        "Mentored 5 junior developers, with 3 promoted within 18 months"
      ],
      avoid: [
        "Responsible for coding",
        "Worked on various projects",
        "Helped with team tasks"
      ],
      action_verbs: ["Led", "Built", "Designed", "Implemented", "Improved", "Reduced", "Increased", "Launched", "Automated", "Optimized"]
    },
    dates: {
      tip: "Use consistent date format (Month Year). Be honest about employment gaps.",
      examples: ["Jan 2022 - Present", "Mar 2020 - Dec 2021"],
      avoid: ["2022-now", "Started last year"]
    }
  },
  education: {
    degree: {
      tip: "Use the full official degree name. Include field of study.",
      examples: ["Bachelor of Science in Computer Science", "Master of Business Administration"],
      avoid: ["BS", "Degree in computers"]
    },
    institution: {
      tip: "Use the official institution name. Add location for lesser-known schools.",
      examples: ["Stanford University", "Indian Institute of Technology, Delhi"],
      avoid: ["Stanford", "IIT"]
    },
    cgpa: {
      tip: "Only include GPA if it's 3.5+ (or equivalent). Remove if you have 3+ years of experience.",
      examples: ["3.8/4.0", "First Class Honours", "8.5/10"],
      avoid: ["2.9/4.0", "Passed"]
    }
  },
  skills: {
    general: {
      tip: "Group skills by category. List most relevant skills first. Only include skills you can discuss confidently.",
      examples: [
        "Frontend: React, TypeScript, Next.js, Tailwind CSS",
        "Backend: Node.js, Python, PostgreSQL, Redis"
      ],
      avoid: [
        "Microsoft Word, Microsoft Excel",
        "Listing 50+ skills",
        "Skills you used once 5 years ago"
      ]
    }
  },
  achievements: {
    general: {
      tip: "Use the STAR method: Situation, Task, Action, Result. Always quantify when possible.",
      formula: "Challenge faced → Action taken → Measurable result",
      examples: [
        "Inherited legacy codebase with 2-hour deployment cycles; implemented CI/CD pipeline reducing deployments to 15 minutes",
        "Identified performance bottleneck causing $50K/month in excess cloud costs; optimized queries saving 40%"
      ],
      avoid: [
        "Was a good team player",
        "Worked hard on projects"
      ]
    }
  }
}

export function TipsProvider({ children }) {
  const [activeTip, setActiveTip] = useState(null)
  const [dismissedTips, setDismissedTips] = useState(new Set())

  const showTip = useCallback((section, field) => {
    const key = `${section}.${field}`
    if (!dismissedTips.has(key)) {
      const sectionTips = TIPS_DATABASE[section]
      const tip = sectionTips?.[field] || sectionTips?.general
      if (tip) {
        setActiveTip({ key, section, field, ...tip })
      }
    }
  }, [dismissedTips])

  const hideTip = useCallback(() => {
    setActiveTip(null)
  }, [])

  const dismissTip = useCallback((key) => {
    setDismissedTips(prev => new Set([...prev, key]))
    setActiveTip(null)
  }, [])

  return (
    <TipsContext.Provider value={{ activeTip, showTip, hideTip, dismissTip }}>
      {children}
    </TipsContext.Provider>
  )
}

export function useTips() {
  const context = useContext(TipsContext)
  if (!context) {
    throw new Error('useTips must be used within a TipsProvider')
  }
  return context
}

// Floating tip component
export function TipPopover() {
  const { activeTip, hideTip, dismissTip } = useTips()

  if (!activeTip) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slideIn max-w-md">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Lightbulb className="w-4 h-4" />
            <span className="font-medium text-sm">Pro Tip</span>
          </div>
          <button onClick={hideTip} className="text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-gray-700 text-sm">{activeTip.tip}</p>

          {activeTip.formula && (
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-xs text-purple-600 font-medium mb-1">Formula:</p>
              <p className="text-purple-800 text-sm">{activeTip.formula}</p>
            </div>
          )}

          {activeTip.examples && (
            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-green-500" />
                Good examples:
              </p>
              <ul className="space-y-1">
                {activeTip.examples.slice(0, 2).map((ex, i) => (
                  <li key={i} className="text-sm text-green-700 bg-green-50 rounded px-2 py-1">
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTip.avoid && (
            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-medium">Avoid:</p>
              <ul className="space-y-1">
                {activeTip.avoid.slice(0, 2).map((ex, i) => (
                  <li key={i} className="text-sm text-red-600 bg-red-50 rounded px-2 py-1 line-through opacity-70">
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTip.action_verbs && (
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Strong action verbs:</p>
              <div className="flex flex-wrap gap-1">
                {activeTip.action_verbs.map(verb => (
                  <span key={verb} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                    {verb}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-2 flex items-center justify-between bg-gray-50">
          <button
            onClick={() => dismissTip(activeTip.key)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Don't show again
          </button>
          <button
            onClick={hideTip}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            Got it <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Input wrapper with tip support
export function TipInput({ section, field, children, className = '' }) {
  const { showTip, hideTip } = useTips()

  return (
    <div
      className={className}
      onFocus={() => showTip(section, field)}
      onBlur={() => setTimeout(hideTip, 200)}
    >
      {children}
    </div>
  )
}
