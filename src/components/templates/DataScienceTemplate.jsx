import { Mail, Phone, MapPin, Linkedin, Github, BarChart3, Brain, Database, BookOpen } from 'lucide-react'

export default function DataScienceTemplate({ data, themeColor = '#10B981' }) {
  const { personal, experience, education, skills, achievements, publications, certifications } = data

  return (
    <div className="bg-white min-h-[1056px] p-8 font-sans" style={{ width: '816px' }}>
      {/* Header with data visualization accent */}
      <header className="mb-6 relative">
        <div className="absolute top-0 right-0 opacity-10">
          <BarChart3 className="w-24 h-24" style={{ color: themeColor }} />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">{personal.name}</h1>
        <p className="text-lg mt-1" style={{ color: themeColor }}>{personal.title}</p>

        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
          {personal.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {personal.email}</span>}
          {personal.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {personal.phone}</span>}
          {personal.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {personal.location}</span>}
          {personal.github && <span className="flex items-center gap-1"><Github className="w-4 h-4" /> GitHub</span>}
          {personal.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-4 h-4" /> LinkedIn</span>}
        </div>

        {personal.summary && (
          <p className="mt-4 text-gray-600 text-sm leading-relaxed border-l-4 pl-4" style={{ borderColor: themeColor }}>
            {personal.summary}
          </p>
        )}
      </header>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Sidebar - Skills, Education, Certs */}
        <div className="space-y-5">
          {/* Technical Skills */}
          {skills && Object.keys(skills).length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2 pb-1 border-b" style={{ borderColor: themeColor }}>
                <Brain className="w-4 h-4" style={{ color: themeColor }} />
                Technical Skills
              </h2>
              <div className="space-y-3">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase">{category}</h3>
                    <div className="mt-1 space-y-1">
                      {skillList.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                backgroundColor: themeColor,
                                width: `${Math.min(100, 70 + Math.random() * 30)}%`
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-700 w-20 truncate">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2 pb-1 border-b" style={{ borderColor: themeColor }}>
                <BookOpen className="w-4 h-4" style={{ color: themeColor }} />
                Education
              </h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <p className="font-medium text-gray-900 text-sm">{edu.degree}</p>
                  <p className="text-gray-600 text-xs">{edu.institution}</p>
                  <p className="text-gray-500 text-xs">{edu.year} {edu.cgpa && `• GPA: ${edu.cgpa}`}</p>
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certifications?.filter(c => c.name).length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-3 pb-1 border-b" style={{ borderColor: themeColor }}>
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.filter(c => c.name).map((cert, i) => (
                  <div key={i} className="text-xs">
                    <p className="font-medium text-gray-900">{cert.name}</p>
                    <p className="text-gray-500">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Publications if any */}
          {publications?.filter(p => p.title).length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-3 pb-1 border-b" style={{ borderColor: themeColor }}>
                Publications
              </h2>
              <div className="space-y-2">
                {publications.filter(p => p.title).map((pub, i) => (
                  <div key={i} className="text-xs">
                    <p className="font-medium text-gray-900">{pub.title}</p>
                    <p className="text-gray-500">{pub.venue} • {pub.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Main Content - Experience & Projects */}
        <div className="col-span-2">
          {/* Key Achievements */}
          {achievements?.filter(a => a.title).length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" style={{ color: themeColor }} />
                Impact Highlights
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {achievements.filter(a => a.title).slice(0, 4).map((ach, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border-l-4"
                    style={{ backgroundColor: `${themeColor}08`, borderColor: themeColor }}
                  >
                    <p className="font-semibold text-gray-900 text-sm">{ach.title}</p>
                    <p className="text-gray-600 text-xs">{ach.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Database className="w-4 h-4" style={{ color: themeColor }} />
                Professional Experience
              </h2>
              <div className="space-y-5">
                {experience.map((exp, i) => (
                  <div key={i} className="relative pl-4 border-l-2" style={{ borderColor: `${themeColor}40` }}>
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: themeColor }} />

                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-600 text-sm">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>

                    {exp.projects?.map((proj, j) => (
                      <div key={j} className="mt-3">
                        <h4 className="font-medium text-gray-800 text-sm">{proj.name}</h4>
                        {proj.techStack && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            Tools: {proj.techStack.join(' | ')}
                          </p>
                        )}
                        <ul className="mt-1 space-y-1">
                          {proj.achievements?.map((ach, k) => (
                            <li key={k} className="text-xs text-gray-600 flex">
                              <span className="mr-2" style={{ color: themeColor }}>→</span>
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {!exp.projects && exp.achievements && (
                      <ul className="mt-2 space-y-1">
                        {exp.achievements.map((ach, k) => (
                          <li key={k} className="text-xs text-gray-600 flex">
                            <span className="mr-2" style={{ color: themeColor }}>→</span>
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
        </div>
      </div>
    </div>
  )
}
