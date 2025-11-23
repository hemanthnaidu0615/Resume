export default function TimelineTemplate({ data, themeColor }) {
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
    <div className="p-8">
      {/* Header */}
      <header className="text-center mb-10 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{personal.name}</h1>
        <p className="text-xl mb-4" style={{ color: themeColor }}>{personal.title}</p>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
          <span>{personal.email}</span>
          {personal.phone && <span>•</span>}
          {personal.phone && <span>{personal.phone}</span>}
          <span>•</span>
          <span>{personal.location}</span>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-8 max-w-3xl mx-auto">
        <p className="text-gray-700 leading-relaxed text-center">{personal.summary}</p>
      </section>

      {/* Skills bar */}
      <section className="mb-10 py-4 px-6 rounded-lg" style={{ backgroundColor: `${themeColor}10` }}>
        <div className="flex flex-wrap justify-center gap-2">
          {Object.values(skills || {}).flat().slice(0, 12).map((skill, i) => (
            <span key={i} className="px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: themeColor }}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Timeline Experience */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-center mb-8" style={{ color: themeColor }}>Career Journey</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full" style={{ backgroundColor: themeColor }} />

          {experience?.map((exp, i) => (
            <div key={i} className={`relative flex items-center mb-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Content */}
              <div className={`w-5/12 ${i % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <div className="p-4 bg-white rounded-lg shadow-md border-l-4" style={{ borderColor: themeColor }}>
                  <h3 className="font-bold text-gray-900">{exp.company}</h3>
                  <p className="font-medium text-sm" style={{ color: themeColor }}>{exp.position}</p>
                  <p className="text-xs text-gray-500 mb-2">{exp.location}</p>
                  {exp.projects?.slice(0, 1).map((project, j) => (
                    <div key={j}>
                      <p className="text-sm font-medium text-gray-700">{project.name}</p>
                      {project.achievements && (
                        <ul className={`text-xs text-gray-600 mt-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          {project.achievements.slice(0, 2).map((a, k) => (
                            <li key={k}>• {a}</li>
                          ))}
                        </ul>
                      )}
                      <div className={`flex flex-wrap gap-1 mt-2 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        {project.techStack?.slice(0, 4).map((tech, k) => (
                          <span key={k} className="px-2 py-0.5 text-xs bg-gray-100 rounded">{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center dot and date */}
              <div className="w-2/12 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full border-4 bg-white z-10" style={{ borderColor: themeColor }} />
                <div className="text-xs font-medium mt-1" style={{ color: themeColor }}>
                  {exp.startDate}
                </div>
              </div>

              {/* Empty space for alternating */}
              <div className="w-5/12" />
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-center mb-4" style={{ color: themeColor }}>Education</h2>
        <div className="max-w-md mx-auto p-4 bg-gray-50 rounded-lg text-center">
          {education?.map((edu, i) => (
            <div key={i}>
              <h3 className="font-bold text-gray-900">{edu.degree}</h3>
              <p style={{ color: themeColor }}>{edu.institution}</p>
              <p className="text-sm text-gray-500">{edu.location} | CGPA: {edu.cgpa} | {edu.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      {hasContent(projects) && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-center mb-4" style={{ color: themeColor }}>Projects</h2>
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {projects.slice(0, 4).map((project, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                {project.description && <p className="text-sm text-gray-600 mt-1">{project.description}</p>}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.techStack.slice(0, 3).map((tech, j) => (
                      <span key={j} className="px-2 py-0.5 text-xs rounded" style={{ backgroundColor: `${themeColor}20`, color: themeColor }}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Awards Row */}
      {(hasContent(certifications) || hasContent(awards)) && (
        <div className="grid grid-cols-2 gap-6 mb-8">
          {hasContent(certifications) && (
            <section className="text-center p-4 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
              <h3 className="font-bold mb-3" style={{ color: themeColor }}>Certifications</h3>
              {certifications.slice(0, 3).map((cert, i) => (
                <p key={i} className="text-sm text-gray-600 mb-1">{cert.name}</p>
              ))}
            </section>
          )}
          {hasContent(awards) && (
            <section className="text-center p-4 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
              <h3 className="font-bold mb-3" style={{ color: themeColor }}>Awards</h3>
              {awards.slice(0, 3).map((award, i) => (
                <p key={i} className="text-sm text-gray-600 mb-1">{award.title}</p>
              ))}
            </section>
          )}
        </div>
      )}

      {/* Publications & Volunteer */}
      {(hasContent(publications) || hasContent(volunteer)) && (
        <div className="grid grid-cols-2 gap-6 mb-8">
          {hasContent(publications) && (
            <section className="text-center">
              <h3 className="font-bold mb-2" style={{ color: themeColor }}>Publications</h3>
              {publications.slice(0, 2).map((pub, i) => (
                <p key={i} className="text-sm text-gray-600 mb-1">{pub.title}</p>
              ))}
            </section>
          )}
          {hasContent(volunteer) && (
            <section className="text-center">
              <h3 className="font-bold mb-2" style={{ color: themeColor }}>Volunteer</h3>
              {volunteer.slice(0, 2).map((vol, i) => (
                <p key={i} className="text-sm text-gray-600 mb-1">{vol.organization} - {vol.role}</p>
              ))}
            </section>
          )}
        </div>
      )}

      {/* Footer grid */}
      <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
        {hasContent(achievements) && (
          <section className="text-center">
            <h3 className="font-bold mb-2" style={{ color: themeColor }}>Achievements</h3>
            {achievements.slice(0, 3).map((a, i) => (
              <p key={i} className="text-sm text-gray-600">✓ {a.title}</p>
            ))}
          </section>
        )}
        {hasContent(languages) && (
          <section className="text-center">
            <h3 className="font-bold mb-2" style={{ color: themeColor }}>Languages</h3>
            {languages.map((l, i) => (
              <p key={i} className="text-sm text-gray-600">{l.language} ({l.proficiency})</p>
            ))}
          </section>
        )}
        {hasContent(interests) && (
          <section className="text-center">
            <h3 className="font-bold mb-2" style={{ color: themeColor }}>Interests</h3>
            <p className="text-sm text-gray-600">{interests.join(' • ')}</p>
          </section>
        )}
      </div>

      {/* References */}
      {hasContent(references) && references[0]?.name && (
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <h3 className="font-bold mb-2" style={{ color: themeColor }}>References</h3>
          <p className="text-sm text-gray-600">
            {references[0].name === 'Available upon request' && !references[0].title
              ? 'Available upon request'
              : references.map(r => r.name).join(' • ')}
          </p>
        </div>
      )}
    </div>
  )
}
