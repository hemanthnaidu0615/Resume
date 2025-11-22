export default function MinimalTemplate({ data, themeColor }) {
  const {
    personal, education, skills, experience, achievements, languages, interests,
    certifications, awards, volunteer, publications, projects, references
  } = data

  const hasContent = (arr) => arr && arr.length > 0 && arr.some(item => {
    if (typeof item === 'string') return item.trim()
    if (typeof item === 'object') {
      return Object.values(item).some(v => v && String(v).trim())
    }
    return false
  })

  return (
    <div className="p-8 text-[13px] font-sans">
      {/* Header - Simple and ATS-friendly */}
      <header className="mb-6 border-b-2 border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">{personal.name}</h1>
        <p className="text-gray-700 font-medium mt-1">{personal.title}</p>
        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
          <span>{personal.email}</span>
          {personal.phone && <span>| {personal.phone}</span>}
          {personal.location && <span>| {personal.location}</span>}
          {personal.linkedin && <span>| {personal.linkedin.replace('https://', '')}</span>}
          {personal.github && <span>| {personal.github.replace('https://', '')}</span>}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {/* Experience */}
      {hasContent(experience) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Professional Experience
          </h2>
          {experience?.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-gray-700">{exp.company}, {exp.location}</p>
              {exp.projects?.map((project, j) => (
                <div key={j} className="mt-2">
                  <p className="font-medium text-gray-800">{project.name} - {project.role}</p>
                  {project.achievements && (
                    <ul className="list-disc ml-5 mt-1 text-gray-700 space-y-0.5">
                      {project.achievements.map((a, k) => <li key={k}>{a}</li>)}
                    </ul>
                  )}
                  {project.subProjects && project.subProjects.map((sub, k) => (
                    <div key={k} className="ml-4 mt-1">
                      <p className="font-medium text-gray-700">{sub.name}</p>
                      <ul className="list-disc ml-5 text-gray-600">
                        {sub.details.map((d, l) => <li key={l}>{d}</li>)}
                      </ul>
                    </div>
                  ))}
                  {project.techStack && project.techStack.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Technologies:</strong> {project.techStack.join(', ')}
                    </p>
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
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Projects
          </h2>
          {projects?.map((project, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                {project.startDate && (
                  <span className="text-sm text-gray-600">{project.startDate} - {project.endDate || 'Present'}</span>
                )}
              </div>
              {project.role && <p className="text-gray-700">{project.role}</p>}
              {project.description && <p className="text-gray-700 mt-1">{project.description}</p>}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc ml-5 mt-1 text-gray-700">
                  {project.highlights.filter(h => h).map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              )}
              {project.techStack && project.techStack.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Technologies:</strong> {project.techStack.join(', ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && Object.keys(skills).length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Technical Skills
          </h2>
          {Object.entries(skills).map(([category, skillList]) => (
            <p key={category} className="mb-1">
              <strong>{category}:</strong> {skillList.join(', ')}
            </p>
          ))}
        </section>
      )}

      {/* Education */}
      {hasContent(education) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Education
          </h2>
          {education?.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                <span className="text-sm text-gray-600">{edu.year}</span>
              </div>
              <p className="text-gray-700">{edu.institution}, {edu.location}</p>
              {edu.cgpa && <p className="text-sm text-gray-600">CGPA: {edu.cgpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {hasContent(certifications) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Certifications
          </h2>
          {certifications?.map((cert, i) => (
            <div key={i} className="mb-1">
              <p><strong>{cert.name}</strong> - {cert.issuer} {cert.date && `(${cert.date})`}</p>
              {cert.credentialId && <p className="text-sm text-gray-600">Credential ID: {cert.credentialId}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Awards */}
      {hasContent(awards) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Awards & Honors
          </h2>
          {awards?.map((award, i) => (
            <div key={i} className="mb-1">
              <p><strong>{award.title}</strong> {award.issuer && `- ${award.issuer}`} {award.date && `(${award.date})`}</p>
              {award.description && <p className="text-sm text-gray-600">{award.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Publications */}
      {hasContent(publications) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Publications
          </h2>
          {publications?.map((pub, i) => (
            <div key={i} className="mb-1">
              <p><strong>{pub.title}</strong></p>
              <p className="text-sm text-gray-600">
                {pub.publisher} {pub.date && `(${pub.date})`}
                {pub.authors && ` - ${pub.authors}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Volunteer */}
      {hasContent(volunteer) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Volunteer Experience
          </h2>
          {volunteer?.map((vol, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{vol.role}</h3>
                <span className="text-sm text-gray-600">{vol.startDate} - {vol.endDate || 'Present'}</span>
              </div>
              <p className="text-gray-700">{vol.organization}</p>
              {vol.description && <p className="text-sm text-gray-600 mt-1">{vol.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Key Achievements */}
      {hasContent(achievements) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Key Achievements
          </h2>
          <ul className="list-disc ml-5 text-gray-700">
            {achievements.map((a, i) => (
              <li key={i}><strong>{a.title}:</strong> {a.description}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {hasContent(languages) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Languages
          </h2>
          <p>{languages.map(l => `${l.language} (${l.proficiency})`).join(' | ')}</p>
        </section>
      )}

      {/* Interests */}
      {hasContent(interests) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            Interests
          </h2>
          <p>{interests.join(' | ')}</p>
        </section>
      )}

      {/* References */}
      {hasContent(references) && references[0]?.name && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-2">
            References
          </h2>
          {references[0].name === 'Available upon request' && !references[0].title ? (
            <p className="text-gray-600">Available upon request</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {references.map((ref, i) => (
                <div key={i}>
                  <p className="font-bold">{ref.name}</p>
                  {ref.title && <p className="text-sm text-gray-600">{ref.title}{ref.company && `, ${ref.company}`}</p>}
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
