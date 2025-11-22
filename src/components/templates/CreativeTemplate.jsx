export default function CreativeTemplate({ data, themeColor }) {
  const { personal, education, skills, experience, achievements, languages, interests } = data

  return (
    <div className="min-h-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Header with gradient */}
      <header className="p-8 text-white" style={{ background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)` }}>
        <h1 className="text-5xl font-bold mb-2">{personal.name}</h1>
        <p className="text-2xl opacity-90 mb-4">{personal.title}</p>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{personal.email}</span>
          {personal.phone && <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{personal.phone}</span>}
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{personal.location}</span>
        </div>
      </header>

      <div className="p-8">
        {/* Summary with number */}
        <section className="mb-8 relative">
          <span className="absolute -left-4 top-0 text-8xl font-bold opacity-10" style={{ color: themeColor }}>01</span>
          <h2 className="text-2xl font-bold mb-3" style={{ color: themeColor }}>About Me</h2>
          <p className="text-gray-700 leading-relaxed pl-4">{personal.summary}</p>
        </section>

        {/* Skills as pills */}
        <section className="mb-8 relative">
          <span className="absolute -left-4 top-0 text-8xl font-bold opacity-10" style={{ color: themeColor }}>02</span>
          <h2 className="text-2xl font-bold mb-4" style={{ color: themeColor }}>Skills</h2>
          <div className="grid grid-cols-2 gap-4 pl-4">
            {Object.entries(skills || {}).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="font-semibold text-gray-700 mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, i) => (
                    <span key={i} className="px-3 py-1 text-white text-sm rounded-full" style={{ backgroundColor: themeColor }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-8 relative">
          <span className="absolute -left-4 top-0 text-8xl font-bold opacity-10" style={{ color: themeColor }}>03</span>
          <h2 className="text-2xl font-bold mb-4" style={{ color: themeColor }}>Experience</h2>
          {experience?.map((exp, i) => (
            <div key={i} className="mb-6 pl-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themeColor }} />
                <h3 className="text-xl font-bold text-gray-900">{exp.company}</h3>
                <span className="px-3 py-1 text-xs rounded-full text-white" style={{ backgroundColor: themeColor }}>
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="font-semibold ml-6" style={{ color: themeColor }}>{exp.position}</p>
              <p className="text-sm text-gray-500 ml-6 mb-3">{exp.location}</p>
              {exp.projects?.map((project, j) => (
                <div key={j} className="ml-6 mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-bold text-gray-800">{project.name}</p>
                  <p className="text-sm text-gray-600 italic mb-2">{project.role}</p>
                  {project.achievements && (
                    <ul className="space-y-1">
                      {project.achievements.slice(0, 3).map((a, k) => (
                        <li key={k} className="text-sm text-gray-600 flex items-start gap-2">
                          <span style={{ color: themeColor }}>▸</span> {a}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.techStack?.map((tech, k) => (
                      <span key={k} className="px-2 py-0.5 text-xs bg-white border rounded" style={{ borderColor: themeColor, color: themeColor }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="mb-8 relative">
          <span className="absolute -left-4 top-0 text-8xl font-bold opacity-10" style={{ color: themeColor }}>04</span>
          <h2 className="text-2xl font-bold mb-4" style={{ color: themeColor }}>Education</h2>
          {education?.map((edu, i) => (
            <div key={i} className="pl-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-900">{edu.degree}</h3>
              <p style={{ color: themeColor }} className="font-medium">{edu.institution}</p>
              <p className="text-sm text-gray-500">{edu.location} | CGPA: {edu.cgpa} | {edu.year}</p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <div className="grid grid-cols-3 gap-6">
          {languages?.length > 0 && (
            <div>
              <h3 className="font-bold mb-2" style={{ color: themeColor }}>Languages</h3>
              {languages.map((l, i) => (
                <p key={i} className="text-sm text-gray-600">{l.language} - {l.proficiency}</p>
              ))}
            </div>
          )}
          {interests?.length > 0 && (
            <div className="col-span-2">
              <h3 className="font-bold mb-2" style={{ color: themeColor }}>Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, i) => (
                  <span key={i} className="px-3 py-1 text-sm rounded-full bg-gray-100">{interest}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
