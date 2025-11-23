import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from 'lucide-react'

export default function FrontendDevTemplate({ data, themeColor = '#3B82F6' }) {
  const {
    personal, experience, education, skills, achievements, projects,
    certifications, awards, volunteer, publications, languages, interests, references
  } = data

  const hasContent = (arr) => arr && arr.length > 0 && arr.some(item => {
    if (typeof item === 'string') return item.trim()
    if (typeof item === 'object') return Object.values(item).some(v => v && String(v).trim())
    return false
  })

  return (
    <div className="bg-white min-h-[1056px] p-8 font-sans text-gray-800" style={{ width: '816px' }}>
      {/* Header with modern design focus */}
      <header className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{personal.name}</h1>
            <p className="text-xl mt-1" style={{ color: themeColor }}>{personal.title}</p>
          </div>
          <div className="flex gap-2">
            {personal.github && (
              <a href={personal.github} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                <Github className="w-5 h-5 text-gray-700" />
              </a>
            )}
            {personal.linkedin && (
              <a href={personal.linkedin} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                <Linkedin className="w-5 h-5 text-gray-700" />
              </a>
            )}
            {personal.website && (
              <a href={personal.website} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                <Globe className="w-5 h-5 text-gray-700" />
              </a>
            )}
          </div>
        </div>

        {/* Contact Row */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
          {personal.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" /> {personal.email}
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> {personal.phone}
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {personal.location}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-6">
          <p className="text-gray-600 leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {/* Technical Skills - Prominent for Frontend */}
      {skills && Object.keys(skills).length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2" style={{ borderColor: themeColor }}>
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-gray-50 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">{category}</h3>
                <div className="flex flex-wrap gap-1">
                  {skillList.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs rounded"
                      style={{
                        backgroundColor: `${themeColor}15`,
                        color: themeColor
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2" style={{ borderColor: themeColor }}>
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>

                {/* Projects within experience - important for Frontend */}
                {exp.projects?.map((proj, j) => (
                  <div key={j} className="mt-2 ml-4 border-l-2 pl-3" style={{ borderColor: `${themeColor}40` }}>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-800">{proj.name}</h4>
                      {proj.url && <ExternalLink className="w-3 h-3 text-gray-400" />}
                    </div>
                    {proj.techStack && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        Tech: {proj.techStack.join(' • ')}
                      </p>
                    )}
                    <ul className="mt-1 space-y-0.5">
                      {proj.achievements?.map((ach, k) => (
                        <li key={k} className="text-sm text-gray-600 flex">
                          <span className="mr-2" style={{ color: themeColor }}>▸</span>
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Regular achievements */}
                {!exp.projects && exp.achievements && (
                  <ul className="mt-2 space-y-1">
                    {exp.achievements.map((ach, k) => (
                      <li key={k} className="text-sm text-gray-600 flex">
                        <span className="mr-2" style={{ color: themeColor }}>▸</span>
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
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2" style={{ borderColor: themeColor }}>
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="flex justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>{edu.year}</p>
                {edu.cgpa && <p>GPA: {edu.cgpa}</p>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2" style={{ borderColor: themeColor }}>
            Side Projects
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {projects.slice(0, 4).map((project, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                {project.description && <p className="text-sm text-gray-600 mt-1">{project.description}</p>}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.techStack.slice(0, 4).map((tech, j) => (
                      <span key={j} className="px-2 py-0.5 text-xs rounded" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {hasContent(certifications) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2" style={{ borderColor: themeColor }}>
            Certifications
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-start gap-2">
                <span style={{ color: themeColor }}>✓</span>
                <div>
                  <span className="font-medium text-gray-900">{cert.name}</span>
                  <span className="text-gray-500 text-sm ml-1">- {cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Notable Achievements */}
      {hasContent(achievements) && achievements.filter(a => a.title).length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2" style={{ borderColor: themeColor }}>
            Notable Achievements
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {achievements.filter(a => a.title).map((ach, i) => (
              <div key={i} className="flex items-start gap-2">
                <span style={{ color: themeColor }}>★</span>
                <div>
                  <span className="font-medium text-gray-900">{ach.title}:</span>
                  <span className="text-gray-600 text-sm ml-1">{ach.description}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Awards */}
      {hasContent(awards) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2" style={{ borderColor: themeColor }}>
            Awards
          </h2>
          {awards.slice(0, 3).map((award, i) => (
            <div key={i} className="mb-2">
              <span className="font-medium text-gray-900">{award.title}</span>
              {award.issuer && <span className="text-gray-500 text-sm"> - {award.issuer}</span>}
            </div>
          ))}
        </section>
      )}

      {/* Footer - Languages & Interests */}
      {(hasContent(languages) || hasContent(interests)) && (
        <div className="flex gap-6 pt-4 border-t border-gray-200">
          {hasContent(languages) && (
            <div>
              <span className="font-semibold text-gray-900">Languages: </span>
              <span className="text-gray-600">{languages.map(l => `${l.language} (${l.proficiency})`).join(' • ')}</span>
            </div>
          )}
          {hasContent(interests) && (
            <div>
              <span className="font-semibold text-gray-900">Interests: </span>
              <span className="text-gray-600">{interests.join(' • ')}</span>
            </div>
          )}
        </div>
      )}

      {/* References */}
      {hasContent(references) && references[0]?.name && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <span className="font-semibold text-gray-900">References: </span>
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
