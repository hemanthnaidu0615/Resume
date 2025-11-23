export default function ModernTemplate({ data, themeColor }) {
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
    <div className="min-h-full grid grid-cols-3 text-[12px]">
      {/* Left Sidebar */}
      <div className="col-span-1 text-white p-5" style={{ backgroundColor: themeColor }}>
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-1">{personal.name}</h1>
          <p className="text-xs opacity-90">{personal.title}</p>
        </div>

        {/* Contact */}
        <div className="mb-5">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Contact</h3>
          <div className="space-y-1 text-xs opacity-90">
            <p className="break-words">{personal.email}</p>
            {personal.phone && <p>{personal.phone}</p>}
            <p>{personal.location}</p>
            {personal.linkedin && <p>LinkedIn</p>}
            {personal.github && <p>GitHub</p>}
          </div>
        </div>

        {/* Skills */}
        {skills && Object.keys(skills).length > 0 && (
          <div className="mb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Skills</h3>
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="mb-2">
                <p className="text-xs font-medium opacity-70 mb-1">{category}</p>
                <div className="space-y-0.5">
                  {skillList.slice(0, 4).map((skill, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs">
                      <div className="w-1 h-1 bg-white rounded-full opacity-70" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {hasContent(education) && (
          <div className="mb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Education</h3>
            {education?.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="font-medium text-xs">{edu.degree}</p>
                <p className="text-xs opacity-80">{edu.institution}</p>
                <p className="text-xs opacity-60">{edu.cgpa && `CGPA: ${edu.cgpa} |`} {edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {hasContent(certifications) && (
          <div className="mb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} className="mb-1">
                <p className="text-xs font-medium">{cert.name}</p>
                <p className="text-xs opacity-60">{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {hasContent(languages) && (
          <div className="mb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Languages</h3>
            {languages.map((l, i) => (
              <div key={i} className="flex items-center gap-1 text-xs mb-1">
                <div className="w-1 h-1 bg-white rounded-full opacity-70" />
                <span>{l.language}</span>
                <span className="opacity-60">({l.proficiency})</span>
              </div>
            ))}
          </div>
        )}

        {/* Interests */}
        {hasContent(interests) && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Interests</h3>
            <div className="flex flex-wrap gap-1">
              {interests.map((int, i) => (
                <span key={i} className="text-xs px-1.5 py-0.5 bg-white/20 rounded">{int}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div className="col-span-2 p-5 bg-white">
        {/* Summary */}
        {personal.summary && (
          <section className="mb-5">
            <h2 className="text-lg font-bold mb-2" style={{ color: themeColor }}>Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed text-xs">{personal.summary}</p>
          </section>
        )}

        {/* Experience */}
        {hasContent(experience) && (
          <section className="mb-5">
            <h2 className="text-lg font-bold mb-3" style={{ color: themeColor }}>Experience</h2>
            {experience?.map((exp, i) => (
              <div key={i} className="mb-4 border-l-2 pl-3" style={{ borderLeftColor: themeColor }}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 text-sm">{exp.company}</h3>
                  <span className="text-xs px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: themeColor }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="font-medium text-xs" style={{ color: themeColor }}>{exp.position}</p>
                <p className="text-xs text-gray-500 mb-2">{exp.location}</p>
                {exp.projects?.map((project, j) => (
                  <div key={j} className="mb-2 p-2 bg-gray-50 rounded">
                    <p className="font-semibold text-gray-800 text-xs">{project.name}</p>
                    <p className="text-xs text-gray-600 italic mb-1">{project.role}</p>
                    {project.achievements && (
                      <ul className="space-y-0.5">
                        {project.achievements.slice(0, 2).map((a, k) => (
                          <li key={k} className="text-xs text-gray-600 flex items-start gap-1">
                            <span style={{ color: themeColor }}>▸</span> {a}
                          </li>
                        ))}
                      </ul>
                    )}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.techStack.map((tech, k) => (
                          <span key={k} className="px-1 py-0.5 text-xs border rounded" style={{ borderColor: themeColor, color: themeColor }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {hasContent(projects) && (
          <section className="mb-5">
            <h2 className="text-lg font-bold mb-3" style={{ color: themeColor }}>Projects</h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-2 p-2 bg-gray-50 rounded">
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800 text-xs">{project.name}</p>
                  {project.startDate && <span className="text-xs text-gray-500">{project.startDate} - {project.endDate || 'Present'}</span>}
                </div>
                {project.description && <p className="text-xs text-gray-600 mt-1">{project.description}</p>}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.techStack.map((tech, j) => (
                      <span key={j} className="px-1 py-0.5 text-xs border rounded" style={{ borderColor: themeColor, color: themeColor }}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Awards */}
        {hasContent(awards) && (
          <section className="mb-5">
            <h2 className="text-lg font-bold mb-2" style={{ color: themeColor }}>Awards</h2>
            {awards.map((award, i) => (
              <div key={i} className="mb-1">
                <p className="font-semibold text-xs">{award.title}</p>
                <p className="text-xs text-gray-600">{award.issuer} {award.date && `| ${award.date}`}</p>
              </div>
            ))}
          </section>
        )}

        {/* Publications */}
        {hasContent(publications) && (
          <section className="mb-5">
            <h2 className="text-lg font-bold mb-2" style={{ color: themeColor }}>Publications</h2>
            {publications.map((pub, i) => (
              <div key={i} className="mb-1">
                <p className="font-semibold text-xs">{pub.title}</p>
                <p className="text-xs text-gray-600">{pub.publisher} {pub.date && `| ${pub.date}`}</p>
              </div>
            ))}
          </section>
        )}

        {/* Volunteer */}
        {hasContent(volunteer) && (
          <section className="mb-5">
            <h2 className="text-lg font-bold mb-2" style={{ color: themeColor }}>Volunteer</h2>
            {volunteer.map((vol, i) => (
              <div key={i} className="mb-1">
                <p className="font-semibold text-xs">{vol.organization} - {vol.role}</p>
                <p className="text-xs text-gray-500">{vol.startDate} - {vol.endDate || 'Present'}</p>
              </div>
            ))}
          </section>
        )}

        {/* Achievements */}
        {hasContent(achievements) && (
          <section className="mb-5">
            <h2 className="text-lg font-bold mb-2" style={{ color: themeColor }}>Key Achievements</h2>
            <div className="grid grid-cols-2 gap-2">
              {achievements.slice(0, 4).map((a, i) => (
                <div key={i} className="flex items-start gap-1">
                  <span className="text-sm" style={{ color: themeColor }}>✓</span>
                  <div>
                    <p className="font-medium text-xs text-gray-800">{a.title}</p>
                    <p className="text-xs text-gray-600">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {hasContent(references) && references[0]?.name && (
          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: themeColor }}>References</h2>
            {references[0].name === 'Available upon request' && !references[0].title ? (
              <p className="text-xs text-gray-600 italic">Available upon request</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {references.map((ref, i) => (
                  <div key={i} className="text-xs">
                    <p className="font-semibold">{ref.name}</p>
                    {ref.title && <p className="text-gray-600">{ref.title}{ref.company && `, ${ref.company}`}</p>}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
