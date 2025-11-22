export default function SidebarTemplate({ data, themeColor }) {
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
    <div className="min-h-full flex">
      {/* Main Content - Left */}
      <div className="flex-1 p-8 bg-white">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{personal.name}</h1>
          <p className="text-xl" style={{ color: themeColor }}>{personal.title}</p>
        </header>

        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            Work Experience
          </h2>
          {experience?.map((exp, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900">{exp.company}</h3>
                <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="font-medium mb-1" style={{ color: themeColor }}>{exp.position}</p>
              <p className="text-sm text-gray-500 mb-2">{exp.location}</p>
              {exp.projects?.map((project, j) => (
                <div key={j} className="mb-3 pl-3 border-l-2" style={{ borderColor: `${themeColor}50` }}>
                  <p className="font-semibold text-gray-800">{project.name}</p>
                  <p className="text-sm text-gray-600 italic">{project.role}</p>
                  {project.achievements && (
                    <ul className="mt-1 space-y-1">
                      {project.achievements.slice(0, 3).map((a, k) => (
                        <li key={k} className="text-sm text-gray-600">• {a}</li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.techStack?.map((tech, k) => (
                      <span key={k} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Projects */}
        {hasContent(projects) && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
              Projects
            </h2>
            {projects.slice(0, 3).map((project, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                {project.role && <p className="text-sm text-gray-600 italic">{project.role}</p>}
                {project.description && <p className="text-sm text-gray-600 mt-1">{project.description}</p>}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.techStack.map((tech, j) => (
                      <span key={j} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Publications */}
        {hasContent(publications) && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
              Publications
            </h2>
            {publications.slice(0, 3).map((pub, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold text-gray-800">{pub.title}</p>
                <p className="text-sm text-gray-500">{pub.publisher} {pub.date && `(${pub.date})`}</p>
              </div>
            ))}
          </section>
        )}

        {/* Volunteer */}
        {hasContent(volunteer) && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
              Volunteer Experience
            </h2>
            {volunteer.slice(0, 2).map((vol, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900">{vol.organization}</h3>
                  <span className="text-sm text-gray-500">{vol.startDate} - {vol.endDate || 'Present'}</span>
                </div>
                <p className="font-medium mb-1" style={{ color: themeColor }}>{vol.role}</p>
                {vol.description && <p className="text-sm text-gray-600">{vol.description}</p>}
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Sidebar - Right */}
      <div className="w-72 p-6 text-white" style={{ backgroundColor: themeColor }}>
        {/* Contact */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80">Contact</h3>
          <div className="space-y-2 text-sm">
            <p className="break-words">{personal.email}</p>
            {personal.phone && <p>{personal.phone}</p>}
            <p>{personal.location}</p>
            {personal.linkedin && <p className="break-words opacity-80">{personal.linkedin.replace('https://', '')}</p>}
            {personal.github && <p className="break-words opacity-80">{personal.github.replace('https://', '')}</p>}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80">Skills</h3>
          {Object.entries(skills || {}).map(([category, skillList]) => (
            <div key={category} className="mb-4">
              <p className="text-xs font-medium opacity-70 mb-2">{category}</p>
              <div className="flex flex-wrap gap-1">
                {skillList.map((skill, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white/20 rounded text-xs">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80">Education</h3>
          {education?.map((edu, i) => (
            <div key={i}>
              <p className="font-medium text-sm">{edu.degree}</p>
              <p className="text-xs opacity-80">{edu.institution}</p>
              <p className="text-xs opacity-60">CGPA: {edu.cgpa}</p>
              <p className="text-xs opacity-60">{edu.year}</p>
            </div>
          ))}
        </div>

        {/* Languages */}
        {languages?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80">Languages</h3>
            {languages.map((l, i) => (
              <p key={i} className="text-sm mb-1">{l.language} <span className="opacity-60">({l.proficiency})</span></p>
            ))}
          </div>
        )}

        {/* Achievements */}
        {achievements?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80">Highlights</h3>
            {achievements.slice(0, 4).map((a, i) => (
              <p key={i} className="text-sm mb-2">✓ {a.title}</p>
            ))}
          </div>
        )}

        {/* Certifications */}
        {hasContent(certifications) && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80">Certifications</h3>
            {certifications.slice(0, 3).map((cert, i) => (
              <div key={i} className="mb-2">
                <p className="text-sm">{cert.name}</p>
                <p className="text-xs opacity-60">{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Awards */}
        {hasContent(awards) && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80">Awards</h3>
            {awards.slice(0, 3).map((award, i) => (
              <p key={i} className="text-sm mb-1">★ {award.title}</p>
            ))}
          </div>
        )}

        {/* Interests */}
        {hasContent(interests) && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80">Interests</h3>
            <div className="flex flex-wrap gap-1">
              {interests.map((int, i) => (
                <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs">{int}</span>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {hasContent(references) && references[0]?.name && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80">References</h3>
            <p className="text-sm opacity-80">
              {references[0].name === 'Available upon request' && !references[0].title
                ? 'Available upon request'
                : references.slice(0, 2).map(r => r.name).join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
