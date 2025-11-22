import { useResume } from '../context/ResumeContext'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import ExecutiveTemplate from './templates/ExecutiveTemplate'
import ModernTemplate from './templates/ModernTemplate'
import CompactTemplate from './templates/CompactTemplate'
import ElegantTemplate from './templates/ElegantTemplate'
import TechTemplate from './templates/TechTemplate'
import SidebarTemplate from './templates/SidebarTemplate'
import TimelineTemplate from './templates/TimelineTemplate'
// Role-based templates
import FrontendDevTemplate from './templates/FrontendDevTemplate'
import DevOpsTemplate from './templates/DevOpsTemplate'
import ProductManagerTemplate from './templates/ProductManagerTemplate'
import DataScienceTemplate from './templates/DataScienceTemplate'
import ATSOptimizedTemplate from './templates/ATSOptimizedTemplate'

const templates = {
  professional: ProfessionalTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  executive: ExecutiveTemplate,
  modern: ModernTemplate,
  compact: CompactTemplate,
  elegant: ElegantTemplate,
  tech: TechTemplate,
  sidebar: SidebarTemplate,
  timeline: TimelineTemplate,
  // Role-based templates
  frontend: FrontendDevTemplate,
  devops: DevOpsTemplate,
  'product-manager': ProductManagerTemplate,
  'data-science': DataScienceTemplate,
  'ats-optimized': ATSOptimizedTemplate,
}

export default function ResumePreview() {
  const { resumeData, activeTemplate, themeColor, fontSize } = useResume()

  const Template = templates[activeTemplate] || ProfessionalTemplate

  const fontSizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }[fontSize] || 'text-base'

  return (
    <div className="flex justify-center">
      <div
        className={`bg-white shadow-2xl ${fontSizeClass}`}
        style={{
          width: '210mm',
          minHeight: '297mm',
          '--theme-color': themeColor
        }}
      >
        <Template data={resumeData} themeColor={themeColor} />
      </div>
    </div>
  )
}
