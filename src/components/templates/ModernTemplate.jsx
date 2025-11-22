export default function ModernTemplate({ data, themeColor }) {
  const { personal, education, skills, experience, achievements, languages, interests } = data

  return (
    <div className="min-h-full grid grid-cols-3">
      {/* Left Sidebar */}
      <div className="col-span-1 text-white p-6" style={{ backgroundColor: themeColor }}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">{personal.name}</h1>
          <p className="text-sm opacity-90">{personal.title}</p>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-70">Contact</h3>
          <div className="space-y-2 text-sm opacity-90">
            <p className="break-words">{personal.email}</p>
            {personal.phone && <p>{personal.phone}</p>}
            <p>{personal.location}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-70">Skills</h3>
          {Object.entries(skills || {}).map(([category, skillList]) => (
            <div key={category} className="mb-3">
              <p className="text-xs font-medium opacity-70 mb-1">{category}</p>
              <div className="space-y-1">
                {skillList.slice(0, 4).map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-white rounded-full opacity-70" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-70">Education</h3>
          {education?.map((edu, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium text-sm">{edu.degree}</p>
              <p className="text-xs opacity-80">{edu.institution}</p>
              <p className="text-xs opacity-60">CGPA: {edu.cgpa} | {edu.year}</p>
            </div>
          ))}
        </div>

        {/* Languages */}
        {languages?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-70">Languages</h3>
            {languages.map((l, i) => (
              <div key={i} className="flex items-center gap-2 text-sm mb-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-70" />
                <span>{l.language}</span>
                <span className="text-xs opacity-60">({l.proficiency})</span>
              </div>
            ))}
          </div>
        )}

        {/* Interests */}
        {interests?.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-70">Interests</h3>
            <div className="flex flex-wrap gap-1">
              {interests.map((int, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-white/20 rounded">{int}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div className="col-span-2 p-6 bg-white">
        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{personal.summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: themeColor }}>Experience</h2>
          {experience?.map((exp, i) => (
            <div key={i} className="mb-5 border-l-3 pl-4" style={{ borderLeftColor: themeColor }}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900">{exp.company}</h3>
                <span className="text-xs px-2 py-1 rounded text-white" style={{ backgroundColor: themeColor }}>
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="font-medium text-sm" style={{ color: themeColor }}>{exp.position}</p>
              <p className="text-xs text-gray-500 mb-2">{exp.location}</p>
              {exp.projects?.map((project, j) => (
                <div key={j} className="mb-3 p-3 bg-gray-50 rounded">
                  <p className="font-semibold text-gray-800 text-sm">{project.name}</p>
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
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.techStack?.map((tech, k) => (
                      <span key={k} className="px-1.5 py-0.5 text-xs border rounded" style={{ borderColor: themeColor, color: themeColor }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Achievements */}
        {achievements?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>Key Achievements</h2>
            <div className="grid grid-cols-2 gap-2">
              {achievements.slice(0, 4).map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-lg" style={{ color: themeColor }}>✓</span>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{a.title}</p>
                    <p className="text-xs text-gray-600">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
