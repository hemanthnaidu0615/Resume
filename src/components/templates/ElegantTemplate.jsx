export default function ElegantTemplate({ data, themeColor }) {
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
    <div className="p-10" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
      {/* Elegant Header with lines */}
      <header className="text-center mb-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 h-px bg-gray-300" />
          <div className="w-3 h-3 rotate-45 border-2" style={{ borderColor: themeColor }} />
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <h1 className="text-4xl font-normal tracking-wide mb-2">{personal.name}</h1>
        <p className="text-lg italic" style={{ color: themeColor }}>{personal.title}</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex-1 h-px bg-gray-300" />
          <div className="w-3 h-3 rotate-45 border-2" style={{ borderColor: themeColor }} />
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-600 mt-4">
          <span>{personal.email}</span>
          {personal.phone && <span>{personal.phone}</span>}
          <span>{personal.location}</span>
        </div>
      </header>

      {/* Summary with decorative border */}
      <section className="mb-8 p-6 border-l-4" style={{ borderColor: themeColor, backgroundColor: `${themeColor}08` }}>
        <h2 className="text-lg font-semibold mb-3" style={{ color: themeColor }}>About</h2>
        <p className="text-gray-700 leading-relaxed italic">{personal.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
          <span style={{ color: themeColor }}>Experience</span>
          <div className="flex-1 h-px bg-gray-300" />
        </h2>
        {experience?.map((exp, i) => (
          <div key={i} className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-lg font-semibold">{exp.company}</h3>
              <span className="text-sm italic text-gray-500">{exp.startDate} — {exp.endDate}</span>
            </div>
            <p style={{ color: themeColor }} className="italic mb-1">{exp.position}</p>
            <p className="text-sm text-gray-500 mb-3">{exp.location}</p>
            {exp.projects?.map((project, j) => (
              <div key={j} className="mb-4 ml-4">
                <p className="font-medium">{project.name}</p>
                <p className="text-sm italic text-gray-600 mb-2">{project.role}</p>
                {project.achievements && (
                  <ul className="space-y-1">
                    {project.achievements.slice(0, 3).map((a, k) => (
                      <li key={k} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: themeColor }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-xs text-gray-500 mt-2 italic">{project.techStack?.join(' · ')}</p>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
          <span style={{ color: themeColor }}>Expertise</span>
          <div className="flex-1 h-px bg-gray-300" />
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(skills || {}).map(([category, skillList]) => (
            <div key={category}>
              <h3 className="font-medium text-gray-700 mb-2">{category}</h3>
              <p className="text-sm text-gray-600">{skillList.join(' · ')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
          <span style={{ color: themeColor }}>Education</span>
          <div className="flex-1 h-px bg-gray-300" />
        </h2>
        {education?.map((edu, i) => (
          <div key={i}>
            <h3 className="font-semibold">{edu.degree}</h3>
            <p className="italic" style={{ color: themeColor }}>{edu.institution}</p>
            <p className="text-sm text-gray-500">{edu.location} · CGPA: {edu.cgpa} · {edu.year}</p>
          </div>
        ))}
      </section>

      {/* Projects */}
      {hasContent(projects) && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <span style={{ color: themeColor }}>Projects</span>
            <div className="flex-1 h-px bg-gray-300" />
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {projects.slice(0, 4).map((project, i) => (
              <div key={i} className="p-4 border-l-4" style={{ borderColor: themeColor, backgroundColor: `${themeColor}05` }}>
                <h3 className="font-semibold">{project.name}</h3>
                {project.role && <p className="text-sm italic text-gray-600">{project.role}</p>}
                {project.description && <p className="text-sm text-gray-600 mt-1">{project.description}</p>}
                {project.techStack && project.techStack.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2 italic">{project.techStack.join(' · ')}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {hasContent(certifications) && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <span style={{ color: themeColor }}>Certifications</span>
            <div className="flex-1 h-px bg-gray-300" />
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <div key={i}>
                <p className="font-medium">{cert.name}</p>
                <p className="text-sm text-gray-500">{cert.issuer} {cert.date && `· ${cert.date}`}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Awards */}
      {hasContent(awards) && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <span style={{ color: themeColor }}>Awards & Honors</span>
            <div className="flex-1 h-px bg-gray-300" />
          </h2>
          {awards.map((award, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{award.title} {award.issuer && <span className="text-gray-500">— {award.issuer}</span>}</p>
              {award.description && <p className="text-sm text-gray-600 italic">{award.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Publications */}
      {hasContent(publications) && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <span style={{ color: themeColor }}>Publications</span>
            <div className="flex-1 h-px bg-gray-300" />
          </h2>
          {publications.map((pub, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium italic">"{pub.title}"</p>
              <p className="text-sm text-gray-500">{pub.publisher} {pub.date && `· ${pub.date}`}</p>
            </div>
          ))}
        </section>
      )}

      {/* Volunteer */}
      {hasContent(volunteer) && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <span style={{ color: themeColor }}>Volunteer Experience</span>
            <div className="flex-1 h-px bg-gray-300" />
          </h2>
          {volunteer.map((vol, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{vol.role}</h3>
                <span className="text-sm italic text-gray-500">{vol.startDate} — {vol.endDate || 'Present'}</span>
              </div>
              <p className="italic" style={{ color: themeColor }}>{vol.organization}</p>
              {vol.description && <p className="text-sm text-gray-600">{vol.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-300">
        {hasContent(achievements) && (
          <section>
            <h3 className="font-semibold mb-2" style={{ color: themeColor }}>Achievements</h3>
            {achievements.slice(0, 3).map((a, i) => (
              <p key={i} className="text-sm text-gray-600 mb-1">{a.title}</p>
            ))}
          </section>
        )}
        {hasContent(languages) && (
          <section>
            <h3 className="font-semibold mb-2" style={{ color: themeColor }}>Languages</h3>
            {languages.map((l, i) => (
              <p key={i} className="text-sm text-gray-600">{l.language} — {l.proficiency}</p>
            ))}
          </section>
        )}
        {hasContent(interests) && (
          <section>
            <h3 className="font-semibold mb-2" style={{ color: themeColor }}>Interests</h3>
            <p className="text-sm text-gray-600">{interests.join(' · ')}</p>
          </section>
        )}
      </div>

      {/* References */}
      {hasContent(references) && references[0]?.name && (
        <div className="mt-6 pt-4 border-t border-gray-300 text-center">
          <h3 className="font-semibold mb-2" style={{ color: themeColor }}>References</h3>
          <p className="text-sm text-gray-600 italic">
            {references[0].name === 'Available upon request' && !references[0].title
              ? 'Available upon request'
              : references.map(r => `${r.name}${r.title ? `, ${r.title}` : ''}`).join(' · ')}
          </p>
        </div>
      )}
    </div>
  )
}
