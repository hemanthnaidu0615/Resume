export default function ExecutiveTemplate({ data }) {
  const { personal, education, skills, experience, achievements, languages } = data

  return (
    <div className="p-12" style={{ fontFamily: "'Georgia', serif" }}>
      {/* Header - Traditional centered */}
      <header className="text-center mb-10 pb-6 border-b-2 border-double border-gray-800">
        <h1 className="text-4xl font-normal tracking-widest text-gray-900 uppercase mb-2">{personal.name}</h1>
        <p className="text-lg text-gray-600 italic mb-4">{personal.title}</p>
        <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-600">
          <span>{personal.email}</span>
          <span>•</span>
          {personal.phone && <><span>{personal.phone}</span><span>•</span></>}
          <span>{personal.location}</span>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-lg font-normal uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-2 mb-4">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-loose text-justify">{personal.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-lg font-normal uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-2 mb-4">
          Professional Experience
        </h2>
        {experience?.map((exp, i) => (
          <div key={i} className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{exp.company}</h3>
              <span className="text-sm text-gray-500 italic">{exp.startDate} – {exp.endDate}</span>
            </div>
            <p className="text-gray-700 italic mb-1">{exp.position}</p>
            <p className="text-sm text-gray-500 mb-3">{exp.location}</p>
            {exp.projects?.map((project, j) => (
              <div key={j} className="mb-4 pl-6 border-l-2 border-gray-300">
                <p className="font-semibold text-gray-800">{project.name}</p>
                <p className="text-sm text-gray-600 italic mb-2">{project.role}</p>
                {project.achievements && (
                  <ul className="list-none space-y-1">
                    {project.achievements.slice(0, 3).map((a, k) => (
                      <li key={k} className="text-sm text-gray-600 pl-4 relative before:content-['—'] before:absolute before:left-0">
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-xs text-gray-500 mt-2 italic">Technologies: {project.techStack?.join(', ')}</p>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-lg font-normal uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-2 mb-4">
          Education
        </h2>
        {education?.map((edu, i) => (
          <div key={i}>
            <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
            <p className="text-gray-700 italic">{edu.institution}</p>
            <p className="text-sm text-gray-500">{edu.location} | CGPA: {edu.cgpa} | Graduated {edu.year}</p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-lg font-normal uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-2 mb-4">
          Technical Expertise
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(skills || {}).map(([category, skillList]) => (
            <div key={category}>
              <h3 className="font-semibold text-gray-700 mb-1">{category}</h3>
              <p className="text-sm text-gray-600">{skillList.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-300">
        {achievements?.length > 0 && (
          <section>
            <h2 className="text-sm font-normal uppercase tracking-widest text-gray-800 mb-3">Key Achievements</h2>
            <ul className="space-y-2">
              {achievements.slice(0, 4).map((a, i) => (
                <li key={i} className="text-sm text-gray-600">
                  <span className="font-semibold">{a.title}:</span> {a.description}
                </li>
              ))}
            </ul>
          </section>
        )}
        {languages?.length > 0 && (
          <section>
            <h2 className="text-sm font-normal uppercase tracking-widest text-gray-800 mb-3">Languages</h2>
            {languages.map((l, i) => (
              <p key={i} className="text-sm text-gray-600">{l.language} — {l.proficiency}</p>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}
