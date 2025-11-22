export default function ProfessionalTemplate({ data, themeColor }) {
  const { personal, education, skills, experience, achievements, languages, interests } = data

  return (
    <div className="p-8">
      {/* Header */}
      <header className="text-center mb-8 pb-6 border-b-4" style={{ borderColor: themeColor }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{personal.name}</h1>
        <p className="text-xl mb-4" style={{ color: themeColor }}>{personal.title}</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span>{personal.email}</span>
          {personal.phone && <span>|</span>}
          {personal.phone && <span>{personal.phone}</span>}
          <span>|</span>
          <span>{personal.location}</span>
          {personal.linkedin && <span>|</span>}
          {personal.linkedin && <span>{personal.linkedin.replace('https://', '')}</span>}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
          Professional Experience
        </h2>
        {experience?.map((exp, i) => (
          <div key={i} className="mb-5">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-bold text-gray-900">{exp.company}</h3>
                <p style={{ color: themeColor }} className="font-medium">{exp.position}</p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{exp.location}</p>
            {exp.projects?.map((project, j) => (
              <div key={j} className="ml-4 mb-3">
                <p className="font-semibold text-gray-800">{project.name}</p>
                <p className="text-sm text-gray-600 italic mb-1">{project.role}</p>
                {project.achievements && (
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {project.achievements.slice(0, 3).map((a, k) => <li key={k}>{a}</li>)}
                  </ul>
                )}
                {project.subProjects && project.subProjects.map((sub, k) => (
                  <div key={k} className="ml-2 mt-2">
                    <p className="text-sm font-medium text-gray-700">{sub.name}</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {sub.details.slice(0, 2).map((d, l) => <li key={l}>{d}</li>)}
                    </ul>
                  </div>
                ))}
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.techStack?.map((tech, k) => (
                    <span key={k} className="px-2 py-0.5 text-xs rounded" style={{ backgroundColor: `${themeColor}20`, color: themeColor }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
          Technical Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(skills || {}).map(([category, skillList]) => (
            <div key={category}>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{category}</h3>
              <div className="flex flex-wrap gap-1">
                {skillList.map((skill, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
          Education
        </h2>
        {education?.map((edu, i) => (
          <div key={i}>
            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
            <p style={{ color: themeColor }}>{edu.institution}</p>
            <p className="text-sm text-gray-500">{edu.location} | CGPA: {edu.cgpa} | {edu.year}</p>
          </div>
        ))}
      </section>

      {/* Achievements & Languages */}
      <div className="grid grid-cols-2 gap-6">
        {achievements?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
              Key Achievements
            </h2>
            <ul className="space-y-1">
              {achievements.slice(0, 4).map((a, i) => (
                <li key={i} className="text-sm"><span className="font-semibold">{a.title}:</span> {a.description}</li>
              ))}
            </ul>
          </section>
        )}
        {languages?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
              Languages
            </h2>
            <div className="space-y-1">
              {languages.map((l, i) => (
                <div key={i} className="text-sm"><span className="font-semibold">{l.language}</span> - {l.proficiency}</div>
              ))}
            </div>
          </section>
        )}
      </div>

      {interests?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeColor, color: themeColor }}>
            Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                {interest}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
