export default function CreativeTemplate({ data, themeColor }) {
  const {
    personal, education, skills, experience, achievements, languages, interests,
    certifications, awards, volunteer, publications, projects, references
  } = data

  const hasContent = (arr) => arr && arr.length > 0 && arr.some(item => {
    if (typeof item === 'string') return item.trim()
    if (typeof item === 'object') return Object.values(item).some(v => v && String(v).trim())
    return false
  })

  let sectionNum = 1

  return (
    <div className="min-h-full text-[13px]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Header with gradient */}
      <header className="p-6 text-white" style={{ background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)` }}>
        <h1 className="text-3xl font-bold mb-1">{personal.name}</h1>
        <p className="text-lg opacity-90 mb-3">{personal.title}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-white/20 rounded-full text-xs">{personal.email}</span>
          {personal.phone && <span className="px-2 py-1 bg-white/20 rounded-full text-xs">{personal.phone}</span>}
          <span className="px-2 py-1 bg-white/20 rounded-full text-xs">{personal.location}</span>
          {personal.linkedin && <span className="px-2 py-1 bg-white/20 rounded-full text-xs">LinkedIn</span>}
          {personal.github && <span className="px-2 py-1 bg-white/20 rounded-full text-xs">GitHub</span>}
        </div>
      </header>

      <div className="p-6">
        {/* Summary */}
        {personal.summary && (
          <section className="mb-6 relative">
            <span className="absolute -left-2 top-0 text-6xl font-bold opacity-10" style={{ color: themeColor }}>0{sectionNum++}</span>
            <h2 className="text-xl font-bold mb-2" style={{ color: themeColor }}>About Me</h2>
            <p className="text-gray-700 leading-relaxed pl-3">{personal.summary}</p>
          </section>
        )}

        {/* Skills */}
        {skills && Object.keys(skills).length > 0 && (
          <section className="mb-6 relative">
            <span className="absolute -left-2 top-0 text-6xl font-bold opacity-10" style={{ color: themeColor }}>0{sectionNum++}</span>
            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>Skills</h2>
            <div className="grid grid-cols-2 gap-3 pl-3">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category}>
                  <h3 className="font-semibold text-gray-700 mb-1 text-sm">{category}</h3>
                  <div className="flex flex-wrap gap-1">
                    {skillList.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 text-white text-xs rounded-full" style={{ backgroundColor: themeColor }}>
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
        {hasContent(experience) && (
          <section className="mb-6 relative">
            <span className="absolute -left-2 top-0 text-6xl font-bold opacity-10" style={{ color: themeColor }}>0{sectionNum++}</span>
            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>Experience</h2>
            {experience?.map((exp, i) => (
              <div key={i} className="mb-4 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                  <h3 className="font-bold text-gray-900">{exp.company}</h3>
                  <span className="px-2 py-0.5 text-xs rounded-full text-white" style={{ backgroundColor: themeColor }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="font-semibold ml-4 text-sm" style={{ color: themeColor }}>{exp.position}</p>
                <p className="text-xs text-gray-500 ml-4 mb-2">{exp.location}</p>
                {exp.projects?.map((project, j) => (
                  <div key={j} className="ml-4 mb-3 p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-gray-800 text-sm">{project.name}</p>
                    <p className="text-xs text-gray-600 italic mb-1">{project.role}</p>
                    {project.achievements && (
                      <ul className="space-y-0.5">
                        {project.achievements.slice(0, 3).map((a, k) => (
                          <li key={k} className="text-xs text-gray-600 flex items-start gap-1">
                            <span style={{ color: themeColor }}>▸</span> {a}
                          </li>
                        ))}
                      </ul>
                    )}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.techStack.map((tech, k) => (
                          <span key={k} className="px-1.5 py-0.5 text-xs bg-white border rounded" style={{ borderColor: themeColor, color: themeColor }}>
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
          <section className="mb-6 relative">
            <span className="absolute -left-2 top-0 text-6xl font-bold opacity-10" style={{ color: themeColor }}>0{sectionNum++}</span>
            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>Projects</h2>
            {projects?.map((project, i) => (
              <div key={i} className="mb-3 pl-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-gray-800 text-sm">{project.name}</p>
                  {project.startDate && <span className="text-xs text-gray-500">{project.startDate} - {project.endDate || 'Present'}</span>}
                </div>
                {project.role && <p className="text-xs text-gray-600 italic">{project.role}</p>}
                {project.description && <p className="text-xs text-gray-600 mt-1">{project.description}</p>}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.techStack.map((tech, j) => (
                      <span key={j} className="px-1.5 py-0.5 text-xs rounded-full text-white" style={{ backgroundColor: themeColor }}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {hasContent(education) && (
          <section className="mb-6 relative">
            <span className="absolute -left-2 top-0 text-6xl font-bold opacity-10" style={{ color: themeColor }}>0{sectionNum++}</span>
            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>Education</h2>
            {education?.map((edu, i) => (
              <div key={i} className="pl-3 p-3 bg-gray-50 rounded-lg mb-2">
                <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                <p style={{ color: themeColor }} className="font-medium text-sm">{edu.institution}</p>
                <p className="text-xs text-gray-500">{edu.location} | CGPA: {edu.cgpa} | {edu.year}</p>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {hasContent(certifications) && (
          <section className="mb-6 relative">
            <span className="absolute -left-2 top-0 text-6xl font-bold opacity-10" style={{ color: themeColor }}>0{sectionNum++}</span>
            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>Certifications</h2>
            <div className="grid grid-cols-2 gap-2 pl-3">
              {certifications.map((cert, i) => (
                <div key={i} className="p-2 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-800 text-sm">{cert.name}</p>
                  <p className="text-xs text-gray-600">{cert.issuer} {cert.date && `| ${cert.date}`}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {hasContent(awards) && (
          <section className="mb-6 relative">
            <span className="absolute -left-2 top-0 text-6xl font-bold opacity-10" style={{ color: themeColor }}>0{sectionNum++}</span>
            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>Awards</h2>
            {awards.map((award, i) => (
              <div key={i} className="pl-3 mb-2">
                <p className="font-semibold text-gray-800 text-sm">{award.title}</p>
                <p className="text-xs text-gray-600">{award.issuer} {award.date && `| ${award.date}`}</p>
              </div>
            ))}
          </section>
        )}

        {/* Publications */}
        {hasContent(publications) && (
          <section className="mb-6 relative">
            <span className="absolute -left-2 top-0 text-6xl font-bold opacity-10" style={{ color: themeColor }}>0{sectionNum++}</span>
            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>Publications</h2>
            {publications.map((pub, i) => (
              <div key={i} className="pl-3 mb-2">
                <p className="font-semibold text-gray-800 text-sm">{pub.title}</p>
                <p className="text-xs text-gray-600">{pub.publisher} {pub.date && `| ${pub.date}`}</p>
              </div>
            ))}
          </section>
        )}

        {/* Volunteer */}
        {hasContent(volunteer) && (
          <section className="mb-6 relative">
            <span className="absolute -left-2 top-0 text-6xl font-bold opacity-10" style={{ color: themeColor }}>0{sectionNum++}</span>
            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>Volunteer</h2>
            {volunteer.map((vol, i) => (
              <div key={i} className="pl-3 mb-2">
                <p className="font-semibold text-gray-800 text-sm">{vol.organization}</p>
                <p className="text-xs" style={{ color: themeColor }}>{vol.role}</p>
                <p className="text-xs text-gray-500">{vol.startDate} - {vol.endDate || 'Present'}</p>
              </div>
            ))}
          </section>
        )}

        {/* Footer */}
        <div className="grid grid-cols-3 gap-4">
          {hasContent(achievements) && (
            <div>
              <h3 className="font-bold mb-2 text-sm" style={{ color: themeColor }}>Achievements</h3>
              {achievements.slice(0, 3).map((a, i) => (
                <p key={i} className="text-xs text-gray-600 mb-1">▸ {a.title}</p>
              ))}
            </div>
          )}
          {hasContent(languages) && (
            <div>
              <h3 className="font-bold mb-2 text-sm" style={{ color: themeColor }}>Languages</h3>
              {languages.map((l, i) => (
                <p key={i} className="text-xs text-gray-600">{l.language} - {l.proficiency}</p>
              ))}
            </div>
          )}
          {hasContent(interests) && (
            <div>
              <h3 className="font-bold mb-2 text-sm" style={{ color: themeColor }}>Interests</h3>
              <div className="flex flex-wrap gap-1">
                {interests.map((interest, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-gray-100">{interest}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* References */}
        {hasContent(references) && references[0]?.name && (
          <section className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-bold mb-2 text-sm" style={{ color: themeColor }}>References</h3>
            {references[0].name === 'Available upon request' && !references[0].title ? (
              <p className="text-xs text-gray-600 italic">Available upon request</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {references.map((ref, i) => (
                  <div key={i} className="text-xs">
                    <p className="font-semibold">{ref.name}</p>
                    {ref.title && <p className="text-gray-600">{ref.title}</p>}
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
