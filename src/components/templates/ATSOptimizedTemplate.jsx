// ATS-Optimized Template
// - No tables, columns, or complex layouts
// - Standard section headings
// - Clean, parseable format
// - Standard fonts
// - No graphics or icons in main content

export default function ATSOptimizedTemplate({ data, themeColor = '#1F2937' }) {
  const {
    personal, experience, education, skills, achievements, languages, interests,
    certifications, awards, volunteer, publications, projects, references
  } = data

  const hasContent = (arr) => arr && arr.length > 0 && arr.some(item => {
    if (typeof item === 'string') return item.trim()
    if (typeof item === 'object') return Object.values(item).some(v => v && String(v).trim())
    return false
  })

  return (
    <div className="bg-white min-h-full p-8 font-['Arial',sans-serif] text-gray-900 text-[12px]">
      {/* Header - Simple and Clean */}
      <header className="text-center mb-5 pb-3 border-b border-gray-300">
        <h1 className="text-xl font-bold uppercase tracking-wide">{personal.name}</h1>
        <p className="text-base text-gray-700 mt-1">{personal.title}</p>
        <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-gray-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>| {personal.phone}</span>}
          {personal.location && <span>| {personal.location}</span>}
          {personal.linkedin && <span>| {personal.linkedin.replace('https://', '')}</span>}
          {personal.github && <span>| {personal.github.replace('https://', '')}</span>}
        </div>
      </header>

      {/* Professional Summary */}
      {personal.summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {/* Skills - Keyword Rich for ATS */}
      {skills && Object.keys(skills).length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Technical Skills
          </h2>
          <div className="space-y-0.5 text-xs">
            {Object.entries(skills).map(([category, skillList]) => (
              <p key={category}>
                <strong>{category}:</strong> {skillList.join(', ')}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {hasContent(experience) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-sm">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</span>
                </div>
                {exp.projects?.map((proj, j) => (
                  <div key={j} className="mt-1.5">
                    <p className="font-semibold text-xs">{proj.name}{proj.role && ` - ${proj.role}`}</p>
                    {proj.techStack && proj.techStack.length > 0 && (
                      <p className="text-xs text-gray-600">Technologies: {proj.techStack.join(', ')}</p>
                    )}
                    <ul className="mt-0.5 space-y-0.5 list-disc list-inside">
                      {proj.achievements?.map((ach, k) => (
                        <li key={k} className="text-xs">{ach}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Projects
          </h2>
          {projects.map((project, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{project.name}</h3>
                {project.startDate && <span className="text-xs text-gray-600">{project.startDate} - {project.endDate || 'Present'}</span>}
              </div>
              {project.role && <p className="text-xs text-gray-700">{project.role}</p>}
              {project.description && <p className="text-xs text-gray-600">{project.description}</p>}
              {project.techStack && project.techStack.length > 0 && (
                <p className="text-xs text-gray-600">Technologies: {project.techStack.join(', ')}</p>
              )}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc list-inside text-xs">
                  {project.highlights.filter(h => h).map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {hasContent(education) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="flex justify-between items-baseline mb-1.5">
              <div>
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-gray-700">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                {edu.cgpa && <p className="text-xs text-gray-600">GPA: {edu.cgpa}</p>}
              </div>
              <span className="text-xs text-gray-600">{edu.year}</span>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {hasContent(certifications) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Certifications
          </h2>
          <ul className="list-disc list-inside space-y-0.5 text-xs">
            {certifications.map((cert, i) => (
              <li key={i}>
                <strong>{cert.name}</strong> - {cert.issuer} {cert.date && `(${cert.date})`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Awards */}
      {hasContent(awards) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Awards and Honors
          </h2>
          <ul className="list-disc list-inside space-y-0.5 text-xs">
            {awards.map((award, i) => (
              <li key={i}>
                <strong>{award.title}</strong>{award.issuer && ` - ${award.issuer}`} {award.date && `(${award.date})`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Publications */}
      {hasContent(publications) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Publications
          </h2>
          <ul className="list-disc list-inside space-y-0.5 text-xs">
            {publications.map((pub, i) => (
              <li key={i}>
                <strong>{pub.title}</strong>{pub.publisher && ` - ${pub.publisher}`} {pub.date && `(${pub.date})`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Volunteer Experience */}
      {hasContent(volunteer) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Volunteer Experience
          </h2>
          {volunteer.map((vol, i) => (
            <div key={i} className="mb-1.5">
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="font-semibold">{vol.role}</p>
                  <p className="text-gray-700">{vol.organization}</p>
                </div>
                <span className="text-xs text-gray-600">{vol.startDate} - {vol.endDate || 'Present'}</span>
              </div>
              {vol.description && <p className="text-xs text-gray-600">{vol.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Key Achievements */}
      {hasContent(achievements) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            Key Achievements
          </h2>
          <ul className="list-disc list-inside space-y-0.5 text-xs">
            {achievements.filter(a => a.title).map((ach, i) => (
              <li key={i}>
                <strong>{ach.title}:</strong> {ach.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Additional Information */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
          Additional Information
        </h2>
        {hasContent(languages) && (
          <p className="text-xs mb-1">
            <strong>Languages:</strong> {languages.filter(l => l.language).map(l => `${l.language} (${l.proficiency})`).join(', ')}
          </p>
        )}
        {hasContent(interests) && (
          <p className="text-xs">
            <strong>Interests:</strong> {interests.join(', ')}
          </p>
        )}
      </section>

      {/* References */}
      {hasContent(references) && references[0]?.name && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            References
          </h2>
          {references[0].name === 'Available upon request' && !references[0].title ? (
            <p className="text-xs">Available upon request</p>
          ) : (
            <div className="space-y-1 text-xs">
              {references.map((ref, i) => (
                <p key={i}>
                  <strong>{ref.name}</strong>
                  {ref.title && `, ${ref.title}`}
                  {ref.company && ` at ${ref.company}`}
                  {ref.email && ` - ${ref.email}`}
                </p>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
