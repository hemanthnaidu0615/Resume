import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react'

// ATS-Optimized Template
// - No tables, columns, or complex layouts
// - Standard section headings
// - Clean, parseable format
// - Standard fonts
// - No graphics or icons in the main content

export default function ATSOptimizedTemplate({ data, themeColor = '#1F2937' }) {
  const { personal, experience, education, skills, achievements } = data

  return (
    <div className="bg-white min-h-[1056px] p-10 font-['Arial',sans-serif] text-gray-900" style={{ width: '816px' }}>
      {/* Header - Simple and Clean */}
      <header className="text-center mb-6 pb-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold uppercase tracking-wide">{personal.name}</h1>
        <p className="text-lg text-gray-700 mt-1">{personal.title}</p>

        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>| {personal.phone}</span>}
          {personal.location && <span>| {personal.location}</span>}
          {personal.linkedin && <span>| {personal.linkedin.replace('https://', '')}</span>}
          {personal.github && <span>| {personal.github.replace('https://', '')}</span>}
        </div>
      </header>

      {/* Professional Summary */}
      {personal.summary && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {/* Skills - Keyword Rich for ATS */}
      {skills && Object.keys(skills).length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Technical Skills
          </h2>
          <div className="space-y-1 text-sm">
            {Object.entries(skills).map(([category, skillList]) => (
              <p key={category}>
                <strong>{category}:</strong> {skillList.join(', ')}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {experience?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>

                {/* Projects */}
                {exp.projects?.map((proj, j) => (
                  <div key={j} className="mt-2">
                    <p className="font-semibold text-sm">
                      {proj.name}
                      {proj.role && ` - ${proj.role}`}
                    </p>
                    {proj.techStack && (
                      <p className="text-xs text-gray-600">
                        Technologies: {proj.techStack.join(', ')}
                      </p>
                    )}
                    <ul className="mt-1 space-y-0.5 list-disc list-inside">
                      {proj.achievements?.map((ach, k) => (
                        <li key={k} className="text-sm">{ach}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Regular achievements without projects */}
                {!exp.projects && exp.achievements && (
                  <ul className="mt-2 space-y-0.5 list-disc list-inside">
                    {exp.achievements.map((ach, k) => (
                      <li key={k} className="text-sm">
                        {typeof ach === 'string' ? ach : ach.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="flex justify-between items-baseline mb-2">
              <div>
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-gray-700">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                {edu.cgpa && <p className="text-sm text-gray-600">GPA: {edu.cgpa}</p>}
              </div>
              <span className="text-sm text-gray-600">{edu.year}</span>
            </div>
          ))}
        </section>
      )}

      {/* Key Achievements */}
      {achievements?.filter(a => a.title).length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Key Achievements
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {achievements.filter(a => a.title).map((ach, i) => (
              <li key={i}>
                <strong>{ach.title}:</strong> {ach.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Additional Information */}
      {data.languages?.filter(l => l.language).length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Additional Information
          </h2>
          <p className="text-sm">
            <strong>Languages:</strong> {data.languages.filter(l => l.language).map(l => `${l.language} (${l.proficiency})`).join(', ')}
          </p>
        </section>
      )}
    </div>
  )
}
