import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { ChevronRight, ChevronLeft, User, Briefcase, GraduationCap, Code, Trophy, Check, Sparkles, Target } from 'lucide-react'
import WelcomeStep from './steps/WelcomeStep'
import PersonalStep from './steps/PersonalStep'
import ExperienceStep from './steps/ExperienceStep'
import EducationStep from './steps/EducationStep'
import SkillsStep from './steps/SkillsStep'
import AchievementsStep from './steps/AchievementsStep'
import ReviewStep from './steps/ReviewStep'

const STEPS = [
  { id: 'welcome', title: 'Welcome', icon: Sparkles, description: 'Choose your path' },
  { id: 'personal', title: 'Personal Info', icon: User, description: 'Your contact details' },
  { id: 'experience', title: 'Experience', icon: Briefcase, description: 'Work history' },
  { id: 'education', title: 'Education', icon: GraduationCap, description: 'Academic background' },
  { id: 'skills', title: 'Skills', icon: Code, description: 'Technical abilities' },
  { id: 'achievements', title: 'Achievements', icon: Trophy, description: 'Key accomplishments' },
  { id: 'review', title: 'Review', icon: Check, description: 'Final check' }
]

export default function ResumeWizard({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [wizardData, setWizardData] = useState({
    targetRole: '',
    experienceLevel: '',
    industry: ''
  })
  const { updatePersonal, updateSection } = useResume()

  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const updateWizardData = (data) => {
    setWizardData(prev => ({ ...prev, ...data }))
  }

  const renderStep = () => {
    switch (STEPS[currentStep].id) {
      case 'welcome':
        return <WelcomeStep data={wizardData} onUpdate={updateWizardData} onNext={goNext} />
      case 'personal':
        return <PersonalStep data={wizardData} onNext={goNext} onPrev={goPrev} />
      case 'experience':
        return <ExperienceStep data={wizardData} onNext={goNext} onPrev={goPrev} />
      case 'education':
        return <EducationStep data={wizardData} onNext={goNext} onPrev={goPrev} />
      case 'skills':
        return <SkillsStep data={wizardData} onNext={goNext} onPrev={goPrev} />
      case 'achievements':
        return <AchievementsStep data={wizardData} onNext={goNext} onPrev={goPrev} />
      case 'review':
        return <ReviewStep data={wizardData} onComplete={onComplete} onPrev={goPrev} />
      default:
        return null
    }
  }

  const progress = ((currentStep) / (STEPS.length - 1)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-700">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            return (
              <button
                key={step.id}
                onClick={() => index < currentStep && setCurrentStep(index)}
                disabled={index > currentStep}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-full transition-all
                  ${isActive ? 'bg-blue-500 text-white' : ''}
                  ${isCompleted ? 'bg-green-500/20 text-green-400 cursor-pointer hover:bg-green-500/30' : ''}
                  ${!isActive && !isCompleted ? 'text-slate-500' : ''}
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden md:block">{step.title}</span>
                {isCompleted && <Check className="w-3 h-3" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8 px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {renderStep()}
        </div>
      </div>
    </div>
  )
}
