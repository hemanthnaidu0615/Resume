export default function ExecutiveTemplate({ data, themeColor }) {
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
    <div className="p-8 text-[12px]" style={{ fontFamily: "'Georgia', serif" }}>
      {/* Header - Traditional centered */}
      <header className="text-center mb-8 pb-4 border-b-2 border-double border-gray-800">
        <h1 className="text-3xl font-normal tracking-widest text-gray-900 uppercase mb-1">{personal.name}</h1>
        <p className="text-base text-gray-600 italic mb-3">{personal.title}</p>
        <div className="flex justify-center flex-wrap gap-4 text-xs text-gray-600">
          <span>{personal.email}</span>
          <span>•</span>
          {personal.phone && <><span>{personal.phone}</span><span>•</span></>}
          <span>{personal.location}</span>
          {personal.linkedin && <><span>•</span><span>LinkedIn</span></>}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-normal uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-loose text-justify">{personal.summary}</p>
        </section>
      )}

      {/* Experience */}
      {hasContent(experience) && (
        <section className="mb-6">
          <h2 className="text-sm font-normal uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-1 mb-3">
            Professional Experience
          </h2>
          {experience?.map((exp, i) => (
            <div key={i} className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-semibold text-gray-900">{exp.company}</h3>
                <span className="text-xs text-gray-500 italic">{exp.startDate} – {exp.endDate}</span>
              </div>
              <p className="text-gray-700 italic mb-1">{exp.position}</p>
              <p className="text-xs text-gray-500 mb-2">{exp.location}</p>
              {exp.projects?.map((project, j) => (
                <div key={j} className="mb-3 pl-4 border-l-2 border-gray-300">
                  <p className="font-semibold text-gray-800">{project.name}</p>
                  <p className="text-xs text-gray-600 italic mb-1">{project.role}</p>
                  {project.achievements && (
                    <ul className="list-none space-y-0.5">
                      {project.achievements.slice(0, 3).map((a, k) => (
                        <li key={k} className="text-xs text-gray-600 pl-3 relative before:content-['—'] before:absolute before:left-0">
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.techStack && project.techStack.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1 italic">Technologies: {project.techStack.join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <section className="mb-6">
          <h2 className="text-sm font-normal uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-1 mb-3">
            Notable Projects
          </h2>
          {projects.map((project, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                {project.startDate && <span className="text-xs text-gray-500 italic">{project.startDate} – {project.endDate || 'Present'}</span>}
              </div>
              {project.role && <p className="text-gray-700 italic text-xs">{project.role}</p>}
              {project.description && <p className="text-xs text-gray-600 mt-1">{project.description}</p>}
              {project.techStack && project.techStack.length > 0 && (
                <p className="text-xs text-gray-500 mt-1 italic">Technologies: {project.techStack.join(', ')}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {hasContent(education) && (
        <section className="mb-6">
          <h2 className="text-sm font-normal uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-1 mb-3">
            Education
          </h2>
          {education?.map((edu, i) => (
            <div key={i} className="mb-2">
              <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
              <p className="text-gray-700 italic">{edu.institution}</p>
              <p className="text-xs text-gray-500">{edu.location} {edu.cgpa && `| CGPA: ${edu.cgpa}`} | Graduated {edu.year}</p>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {hasContent(certifications) && (
        <section className="mb-6">
          <h2 className="text-sm font-normal uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-1 mb-3">
            Professional Certifications
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {certifications.map((cert, i) => (
              <div key={i}>
                <p className="font-semibold text-gray-800">{cert.name}</p>
                <p className="text-xs text-gray-600">{cert.issuer} {cert.date && `| ${cert.date}`}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && Object.keys(skills).length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-normal uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-1 mb-3">
            Technical Expertise
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="font-semibold text-gray-700 mb-1">{category}</h3>
                <p className="text-xs text-gray-600">{skillList.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Awards */}
      {hasContent(awards) && (
        <section className="mb-6">
          <h2 className="text-sm font-normal uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-1 mb-3">
            Awards & Honors
          </h2>
          {awards.map((award, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold text-gray-800">{award.title}</p>
              <p className="text-xs text-gray-600">{award.issuer} {award.date && `| ${award.date}`}</p>
              {award.description && <p className="text-xs text-gray-500 italic">{award.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Publications */}
      {hasContent(publications) && (
        <section className="mb-6">
          <h2 className="text-sm font-normal uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-1 mb-3">
            Publications
          </h2>
          {publications.map((pub, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold text-gray-800">{pub.title}</p>
              <p className="text-xs text-gray-600">{pub.publisher} {pub.date && `| ${pub.date}`}</p>
            </div>
          ))}
        </section>
      )}

      {/* Volunteer */}
      {hasContent(volunteer) && (
        <section className="mb-6">
          <h2 className="text-sm font-normal uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-1 mb-3">
            Volunteer Experience
          </h2>
          {volunteer.map((vol, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-baseline">
                <p className="font-semibold text-gray-800">{vol.organization}</p>
                <span className="text-xs text-gray-500">{vol.startDate} – {vol.endDate || 'Present'}</span>
              </div>
              <p className="text-gray-700 italic text-xs">{vol.role}</p>
              {vol.description && <p className="text-xs text-gray-600 mt-1">{vol.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <div className="grid grid-cols-2 gap-6 pt-3 border-t border-gray-300">
        {hasContent(achievements) && (
          <section>
            <h2 className="text-xs font-normal uppercase tracking-widest text-gray-800 mb-2">Key Achievements</h2>
            <ul className="space-y-1">
              {achievements.slice(0, 4).map((a, i) => (
                <li key={i} className="text-xs text-gray-600">
                  <span className="font-semibold">{a.title}:</span> {a.description}
                </li>
              ))}
            </ul>
          </section>
        )}
        <div className="space-y-4">
          {hasContent(languages) && (
            <section>
              <h2 className="text-xs font-normal uppercase tracking-widest text-gray-800 mb-2">Languages</h2>
              {languages.map((l, i) => (
                <p key={i} className="text-xs text-gray-600">{l.language} — {l.proficiency}</p>
              ))}
            </section>
          )}
          {hasContent(interests) && (
            <section>
              <h2 className="text-xs font-normal uppercase tracking-widest text-gray-800 mb-2">Interests</h2>
              <p className="text-xs text-gray-600">{interests.join(' | ')}</p>
            </section>
          )}
        </div>
      </div>

      {/* References */}
      {hasContent(references) && references[0]?.name && (
        <section className="mt-4 pt-3 border-t border-gray-300">
          <h2 className="text-xs font-normal uppercase tracking-widest text-gray-800 mb-2">References</h2>
          {references[0].name === 'Available upon request' && !references[0].title ? (
            <p className="text-xs text-gray-600 italic">Available upon request</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {references.map((ref, i) => (
                <div key={i} className="text-xs">
                  <p className="font-semibold">{ref.name}</p>
                  {ref.title && <p className="text-gray-600">{ref.title}{ref.company && `, ${ref.company}`}</p>}
                  {ref.email && <p className="text-gray-500">{ref.email}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
