export default function CompactTemplate({ data, themeColor }) {
  const {
    personal, education, skills, experience, achievements, languages, interests,
    certifications, awards, volunteer, publications, projects, references
  } = data

  const hasContent = (arr) => arr && arr.length > 0 && arr.some(item => {
    if (typeof item === 'string') return item.trim()
    if (typeof item === 'object') return Object.values(item).some(v => v && String(v).trim())
    return false
  })

  return (
    <div className="p-5 text-[11px]">
      {/* Compact Header */}
      <header className="mb-3 pb-2 border-b-2" style={{ borderColor: themeColor }}>
        <h1 className="text-xl font-bold" style={{ color: themeColor }}>{personal.name}</h1>
        <p className="text-sm text-gray-600 mb-1">{personal.title}</p>
        <div className="flex flex-wrap gap-2 text-gray-600">
          <span>{personal.email}</span>
          {personal.phone && <span>• {personal.phone}</span>}
          <span>• {personal.location}</span>
          {personal.linkedin && <span>• LinkedIn</span>}
          {personal.github && <span>• GitHub</span>}
        </div>
      </header>

      {/* Summary - Very compact */}
      {personal.summary && <p className="text-gray-700 mb-3 leading-snug">{personal.summary}</p>}

      {/* Two column layout for skills and education */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <section>
          <h2 className="font-bold uppercase tracking-wide mb-1 text-xs" style={{ color: themeColor }}>Skills</h2>
          {Object.entries(skills || {}).slice(0, 4).map(([category, skillList]) => (
            <div key={category} className="mb-1">
              <span className="font-semibold text-gray-700">{category}: </span>
              <span className="text-gray-600">{skillList.join(', ')}</span>
            </div>
          ))}
        </section>

        <section>
          <h2 className="font-bold uppercase tracking-wide mb-1 text-xs" style={{ color: themeColor }}>Education</h2>
          {education?.map((edu, i) => (
            <div key={i} className="mb-1">
              <p className="font-semibold text-gray-800">{edu.degree}</p>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-500">{edu.cgpa && `CGPA: ${edu.cgpa} |`} {edu.year}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Experience - Compact */}
      {hasContent(experience) && (
        <section className="mb-3">
          <h2 className="font-bold uppercase tracking-wide mb-1 text-xs" style={{ color: themeColor }}>Experience</h2>
          {experience?.map((exp, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="font-bold" style={{ color: themeColor }}>{exp.company}</span>
                <span className="text-gray-500">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-gray-700 font-medium">{exp.position}</p>
              <p className="text-gray-500 mb-0.5">{exp.location}</p>
              {exp.projects?.slice(0, 2).map((project, j) => (
                <div key={j} className="ml-2 mb-1">
                  <p className="font-semibold text-gray-700">{project.name} <span className="font-normal italic text-gray-500">- {project.role}</span></p>
                  {project.achievements && (
                    <ul className="text-gray-600 ml-2">
                      {project.achievements.slice(0, 2).map((a, k) => <li key={k}>• {a}</li>)}
                    </ul>
                  )}
                  {project.techStack && project.techStack.length > 0 && (
                    <p className="text-gray-500">Tech: {project.techStack.join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* Projects - Compact */}
      {hasContent(projects) && (
        <section className="mb-3">
          <h2 className="font-bold uppercase tracking-wide mb-1 text-xs" style={{ color: themeColor }}>Projects</h2>
          {projects.slice(0, 2).map((project, i) => (
            <div key={i} className="mb-1">
              <p className="font-semibold text-gray-700">{project.name}</p>
              {project.description && <p className="text-gray-600">{project.description}</p>}
              {project.techStack && project.techStack.length > 0 && (
                <p className="text-gray-500">Tech: {project.techStack.join(', ')}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications - Inline */}
      {hasContent(certifications) && (
        <section className="mb-2">
          <h2 className="font-bold uppercase tracking-wide mb-1 text-xs" style={{ color: themeColor }}>Certifications</h2>
          <p className="text-gray-600">{certifications.map(c => c.name).join(' • ')}</p>
        </section>
      )}

      {/* Two column: Achievements & Awards */}
      <div className="grid grid-cols-2 gap-3 mb-2">
        {hasContent(achievements) && (
          <section>
            <h2 className="font-bold uppercase tracking-wide mb-1 text-xs" style={{ color: themeColor }}>Achievements</h2>
            {achievements.slice(0, 3).map((a, i) => (
              <p key={i} className="text-gray-600">• {a.title}</p>
            ))}
          </section>
        )}
        {hasContent(awards) && (
          <section>
            <h2 className="font-bold uppercase tracking-wide mb-1 text-xs" style={{ color: themeColor }}>Awards</h2>
            {awards.slice(0, 3).map((a, i) => (
              <p key={i} className="text-gray-600">• {a.title}</p>
            ))}
          </section>
        )}
      </div>

      {/* Publications & Volunteer - Compact */}
      {(hasContent(publications) || hasContent(volunteer)) && (
        <div className="grid grid-cols-2 gap-3 mb-2">
          {hasContent(publications) && (
            <section>
              <h2 className="font-bold uppercase tracking-wide mb-1 text-xs" style={{ color: themeColor }}>Publications</h2>
              {publications.slice(0, 2).map((p, i) => (
                <p key={i} className="text-gray-600">• {p.title}</p>
              ))}
            </section>
          )}
          {hasContent(volunteer) && (
            <section>
              <h2 className="font-bold uppercase tracking-wide mb-1 text-xs" style={{ color: themeColor }}>Volunteer</h2>
              {volunteer.slice(0, 2).map((v, i) => (
                <p key={i} className="text-gray-600">• {v.organization} - {v.role}</p>
              ))}
            </section>
          )}
        </div>
      )}

      {/* Footer row */}
      <div className="flex gap-4 pt-2 border-t flex-wrap" style={{ borderColor: themeColor }}>
        {hasContent(languages) && (
          <div>
            <span className="font-bold" style={{ color: themeColor }}>Languages: </span>
            <span className="text-gray-600">{languages.map(l => `${l.language} (${l.proficiency})`).join(' • ')}</span>
          </div>
        )}
        {hasContent(interests) && (
          <div>
            <span className="font-bold" style={{ color: themeColor }}>Interests: </span>
            <span className="text-gray-600">{interests.join(' • ')}</span>
          </div>
        )}
      </div>

      {/* References */}
      {hasContent(references) && references[0]?.name && (
        <div className="mt-2 pt-1 border-t" style={{ borderColor: themeColor }}>
          <span className="font-bold" style={{ color: themeColor }}>References: </span>
          <span className="text-gray-600">
            {references[0].name === 'Available upon request' && !references[0].title
              ? 'Available upon request'
              : references.map(r => r.name).join(', ')}
          </span>
        </div>
      )}
    </div>
  )
}
