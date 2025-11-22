export default function CompactTemplate({ data, themeColor }) {
  const { personal, education, skills, experience, achievements, languages, interests } = data

  return (
    <div className="p-6 text-xs">
      {/* Compact Header */}
      <header className="mb-4 pb-3 border-b-2" style={{ borderColor: themeColor }}>
        <h1 className="text-2xl font-bold" style={{ color: themeColor }}>{personal.name}</h1>
        <p className="text-sm text-gray-600 mb-2">{personal.title}</p>
        <div className="flex flex-wrap gap-3 text-gray-600">
          <span>{personal.email}</span>
          {personal.phone && <span>• {personal.phone}</span>}
          <span>• {personal.location}</span>
          {personal.linkedin && <span>• {personal.linkedin.replace('https://', '')}</span>}
        </div>
      </header>

      {/* Summary - Very compact */}
      <p className="text-gray-700 mb-4 leading-snug">{personal.summary}</p>

      {/* Two column layout for skills and education */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <section>
          <h2 className="font-bold uppercase tracking-wide mb-2" style={{ color: themeColor }}>Skills</h2>
          {Object.entries(skills || {}).slice(0, 4).map(([category, skillList]) => (
            <div key={category} className="mb-2">
              <span className="font-semibold text-gray-700">{category}: </span>
              <span className="text-gray-600">{skillList.join(', ')}</span>
            </div>
          ))}
        </section>

        <section>
          <h2 className="font-bold uppercase tracking-wide mb-2" style={{ color: themeColor }}>Education</h2>
          {education?.map((edu, i) => (
            <div key={i}>
              <p className="font-semibold text-gray-800">{edu.degree}</p>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-500">CGPA: {edu.cgpa} | {edu.year}</p>
            </div>
          ))}

          {achievements?.length > 0 && (
            <>
              <h2 className="font-bold uppercase tracking-wide mt-3 mb-2" style={{ color: themeColor }}>Achievements</h2>
              {achievements.slice(0, 3).map((a, i) => (
                <p key={i} className="text-gray-600">• {a.title}</p>
              ))}
            </>
          )}
        </section>
      </div>

      {/* Experience - Compact */}
      <section className="mb-4">
        <h2 className="font-bold uppercase tracking-wide mb-2" style={{ color: themeColor }}>Experience</h2>
        {experience?.map((exp, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between items-baseline">
              <span className="font-bold" style={{ color: themeColor }}>{exp.company}</span>
              <span className="text-gray-500">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-gray-700 font-medium">{exp.position}</p>
            <p className="text-gray-500 mb-1">{exp.location}</p>
            {exp.projects?.slice(0, 2).map((project, j) => (
              <div key={j} className="ml-3 mb-2">
                <p className="font-semibold text-gray-700">{project.name} <span className="font-normal italic text-gray-500">- {project.role}</span></p>
                {project.achievements && (
                  <ul className="text-gray-600 ml-2">
                    {project.achievements.slice(0, 2).map((a, k) => <li key={k}>• {a}</li>)}
                  </ul>
                )}
                <p className="text-gray-500 mt-1">Tech: {project.techStack?.join(', ')}</p>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Footer row */}
      <div className="flex gap-6 pt-2 border-t" style={{ borderColor: themeColor }}>
        {languages?.length > 0 && (
          <div>
            <span className="font-bold" style={{ color: themeColor }}>Languages: </span>
            <span className="text-gray-600">{languages.map(l => `${l.language} (${l.proficiency})`).join(' • ')}</span>
          </div>
        )}
        {interests?.length > 0 && (
          <div>
            <span className="font-bold" style={{ color: themeColor }}>Interests: </span>
            <span className="text-gray-600">{interests.join(' • ')}</span>
          </div>
        )}
      </div>
    </div>
  )
}
