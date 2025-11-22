export default function SidebarTemplate({ data, themeColor }) {
  const { personal, education, skills, experience, achievements, languages, interests } = data

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

        {/* Interests */}
        {interests?.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80">Interests</h3>
            <div className="flex flex-wrap gap-1">
              {interests.map((int, i) => (
                <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs">{int}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
