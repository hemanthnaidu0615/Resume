export default function MinimalTemplate({ data }) {
  const { personal, education, skills, experience, achievements, languages, interests } = data

  return (
    <div className="p-10 font-sans">
      {/* Header - Minimal */}
      <header className="mb-8 pb-6 border-b-2 border-gray-900">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-1">{personal.name}</h1>
        <p className="text-lg text-gray-600 mb-4">{personal.title}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>{personal.email}</span>
          {personal.phone && <span>{personal.phone}</span>}
          <span>{personal.location}</span>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Summary</h2>
        <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Experience</h2>
        {experience?.map((exp, i) => (
          <div key={i} className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-gray-900">{exp.company}</h3>
              <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-gray-700 font-medium mb-1">{exp.position}</p>
            <p className="text-sm text-gray-500 mb-2">{exp.location}</p>
            {exp.projects?.map((project, j) => (
              <div key={j} className="mb-3 pl-4 border-l-2 border-gray-200">
                <p className="font-medium text-gray-800">{project.name}</p>
                <p className="text-sm text-gray-600 italic">{project.role}</p>
                {project.achievements && (
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                    {project.achievements.slice(0, 3).map((a, k) => <li key={k}>{a}</li>)}
                  </ul>
                )}
                <p className="text-xs text-gray-500 mt-1">{project.techStack?.join(' • ')}</p>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Skills</h2>
        <div className="space-y-2">
          {Object.entries(skills || {}).map(([category, skillList]) => (
            <div key={category}>
              <span className="font-medium text-gray-700">{category}: </span>
              <span className="text-gray-600">{skillList.join(', ')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Education</h2>
        {education?.map((edu, i) => (
          <div key={i}>
            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
            <p className="text-gray-700">{edu.institution}</p>
            <p className="text-sm text-gray-500">{edu.location} • CGPA: {edu.cgpa} • {edu.year}</p>
          </div>
        ))}
      </section>

      {/* Footer sections */}
      <div className="grid grid-cols-3 gap-6 text-sm">
        {achievements?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Achievements</h2>
            <ul className="space-y-1 text-gray-600">
              {achievements.slice(0, 3).map((a, i) => <li key={i}>• {a.title}</li>)}
            </ul>
          </section>
        )}
        {languages?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Languages</h2>
            <ul className="space-y-1 text-gray-600">
              {languages.map((l, i) => <li key={i}>• {l.language} ({l.proficiency})</li>)}
            </ul>
          </section>
        )}
        {interests?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Interests</h2>
            <p className="text-gray-600">{interests.join(', ')}</p>
          </section>
        )}
      </div>
    </div>
  )
}
