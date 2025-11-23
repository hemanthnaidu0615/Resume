export default function ProfessionalTemplate({ data, themeColor }) {
  const {
    personal, education, skills, experience, achievements, languages, interests,
    certifications, awards, volunteer, publications, projects, references
  } = data

  // Helper to check if section has content
  const hasContent = (arr) => arr && arr.length > 0 && arr.some(item => {
    if (typeof item === 'string') return item.trim()
    if (typeof item === 'object') {
      return Object.values(item).some(v => v && String(v).trim())
    }
    return false
  })

  return (
    <div className="p-8 text-[13px] leading-relaxed">
      {/* Header */}
      <header className="text-center mb-6 pb-4 border-b-4" style={{ borderColor: themeColor }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personal.name}</h1>
        <p className="text-lg mb-3" style={{ color: themeColor }}>{personal.title}</p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          <span>{personal.email}</span>
          {personal.phone && <span>|</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>|</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>|</span>}
          {personal.linkedin && (
            <a href={personal.linkedin} className="hover:underline" style={{ color: themeColor }}>
              LinkedIn
            </a>
          )}
          {personal.github && <span>|</span>}
          {personal.github && (
            <a href={personal.github} className="hover:underline" style={{ color: themeColor }}>
              GitHub
            </a>
          )}
          {personal.website && <span>|</span>}
          {personal.website && (
            <a href={personal.website} className="hover:underline" style={{ color: themeColor }}>
              Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {/* Experience */}
      {hasContent(experience) && (
        <section className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            Professional Experience
          </h2>
          {experience?.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.company}</h3>
                  <p style={{ color: themeColor }} className="font-medium">{exp.position}</p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{exp.location}</p>
              {exp.projects?.map((project, j) => (
                <div key={j} className="ml-3 mb-3">
                  <p className="font-semibold text-gray-800">{project.name}</p>
                  <p className="text-sm text-gray-600 italic mb-1">{project.role}</p>
                  {project.achievements && (
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5">
                      {project.achievements.slice(0, 4).map((a, k) => <li key={k}>{a}</li>)}
                    </ul>
                  )}
                  {project.subProjects && project.subProjects.map((sub, k) => (
                    <div key={k} className="ml-2 mt-1">
                      <p className="text-sm font-medium text-gray-700">{sub.name}</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {sub.details.slice(0, 2).map((d, l) => <li key={l}>{d}</li>)}
                      </ul>
                    </div>
                  ))}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.techStack?.map((tech, k) => (
                        <span key={k} className="px-1.5 py-0.5 text-xs rounded" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
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

      {/* Personal Projects */}
      {hasContent(projects) && (
        <section className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            Projects
          </h2>
          {projects?.map((project, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  {project.role && <p className="text-sm text-gray-600 italic">{project.role}</p>}
                </div>
                {(project.startDate || project.endDate) && (
                  <span className="text-sm text-gray-500">{project.startDate} - {project.endDate || 'Present'}</span>
                )}
              </div>
              {project.description && <p className="text-sm text-gray-700 mt-1">{project.description}</p>}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {project.highlights.map((h, j) => h && <li key={j}>{h}</li>)}
                </ul>
              )}
              <div className="flex flex-wrap gap-2 mt-1">
                {project.techStack?.map((tech, j) => (
                  <span key={j} className="px-1.5 py-0.5 text-xs rounded" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                    {tech}
                  </span>
                ))}
                {project.url && (
                  <a href={project.url} className="text-xs hover:underline" style={{ color: themeColor }}>Live Demo</a>
                )}
                {project.github && (
                  <a href={project.github} className="text-xs hover:underline" style={{ color: themeColor }}>GitHub</a>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && Object.keys(skills).length > 0 && (
        <section className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(skills || {}).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{category}</h3>
                <div className="flex flex-wrap gap-1">
                  {skillList.map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {hasContent(education) && (
        <section className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            Education
          </h2>
          {education?.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p style={{ color: themeColor }}>{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-500">{edu.year}</span>
              </div>
              <p className="text-sm text-gray-500">{edu.location} {edu.cgpa && `| CGPA: ${edu.cgpa}`}</p>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {hasContent(certifications) && (
        <section className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            Certifications
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {certifications?.map((cert, i) => (
              <div key={i} className="flex items-start gap-2">
                <span style={{ color: themeColor }}>&#10003;</span>
                <div>
                  <p className="font-medium text-gray-900">{cert.name}</p>
                  <p className="text-sm text-gray-600">{cert.issuer} {cert.date && `| ${cert.date}`}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Awards */}
      {hasContent(awards) && (
        <section className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            Awards & Honors
          </h2>
          {awards?.map((award, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-900">{award.title}</h3>
                {award.date && <span className="text-sm text-gray-500">{award.date}</span>}
              </div>
              {award.issuer && <p className="text-sm text-gray-600">{award.issuer}</p>}
              {award.description && <p className="text-sm text-gray-600">{award.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Publications */}
      {hasContent(publications) && (
        <section className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            Publications
          </h2>
          {publications?.map((pub, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium text-gray-900">{pub.title}</p>
              <p className="text-sm text-gray-600">
                {pub.publisher} {pub.date && `| ${pub.date}`}
                {pub.url && (
                  <a href={pub.url} className="ml-2 hover:underline" style={{ color: themeColor }}>View</a>
                )}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Volunteer */}
      {hasContent(volunteer) && (
        <section className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            Volunteer Experience
          </h2>
          {volunteer?.map((vol, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{vol.organization}</h3>
                  <p style={{ color: themeColor }} className="font-medium">{vol.role}</p>
                </div>
                <span className="text-sm text-gray-500">{vol.startDate} - {vol.endDate || 'Present'}</span>
              </div>
              {vol.description && <p className="text-sm text-gray-600 mt-1">{vol.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Two Column: Achievements & Languages */}
      <div className="grid grid-cols-2 gap-4">
        {hasContent(achievements) && (
          <section>
            <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
              Key Achievements
            </h2>
            <ul className="space-y-1">
              {achievements.slice(0, 4).map((a, i) => (
                <li key={i} className="text-sm">
                  <span className="font-semibold">{a.title}:</span> {a.description}
                </li>
              ))}
            </ul>
          </section>
        )}
        {hasContent(languages) && (
          <section>
            <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
              Languages
            </h2>
            <div className="space-y-1">
              {languages.map((l, i) => (
                <div key={i} className="text-sm">
                  <span className="font-semibold">{l.language}</span> - {l.proficiency}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Interests */}
      {hasContent(interests) && (
        <section className="mt-4">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, i) => (
              <span key={i} className="px-2 py-1 rounded-full text-sm" style={{ backgroundColor: `${themeColor}10`, color: themeColor }}>
                {interest}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {hasContent(references) && references[0]?.name && (
        <section className="mt-4">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            References
          </h2>
          {references[0].name === 'Available upon request' && !references[0].title ? (
            <p className="text-sm text-gray-600 italic">Available upon request</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {references.map((ref, i) => (
                <div key={i}>
                  <p className="font-medium text-gray-900">{ref.name}</p>
                  {ref.title && <p className="text-sm text-gray-600">{ref.title}{ref.company && ` at ${ref.company}`}</p>}
                  {ref.email && <p className="text-sm text-gray-600">{ref.email}</p>}
                  {ref.phone && <p className="text-sm text-gray-600">{ref.phone}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
