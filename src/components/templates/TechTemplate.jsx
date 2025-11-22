export default function TechTemplate({ data, themeColor }) {
  const { personal, education, skills, experience, achievements, languages, interests } = data

  return (
    <div className="p-8 font-mono bg-gray-900 text-gray-100 min-h-full">
      {/* Terminal-style header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-gray-500 ml-2">resume.tsx</span>
        </div>
        <div className="text-green-400 mb-2">
          <span className="text-gray-500">const</span> developer <span className="text-gray-500">=</span> {'{'}
        </div>
        <div className="pl-4">
          <p><span className="text-purple-400">name</span>: <span className="text-yellow-300">"{personal.name}"</span>,</p>
          <p><span className="text-purple-400">title</span>: <span className="text-yellow-300">"{personal.title}"</span>,</p>
          <p><span className="text-purple-400">email</span>: <span className="text-yellow-300">"{personal.email}"</span>,</p>
          <p><span className="text-purple-400">location</span>: <span className="text-yellow-300">"{personal.location}"</span>,</p>
        </div>
        <div className="text-green-400">{'}'}</div>
      </header>

      {/* Summary as comment */}
      <section className="mb-6">
        <p className="text-gray-500">{'/**'}</p>
        <p className="text-gray-400 pl-2">* {personal.summary}</p>
        <p className="text-gray-500">{' */'}</p>
      </section>

      {/* Skills as object */}
      <section className="mb-6">
        <p className="text-green-400"><span className="text-gray-500">const</span> skills <span className="text-gray-500">=</span> {'{'}</p>
        {Object.entries(skills || {}).map(([category, skillList], i) => (
          <p key={i} className="pl-4">
            <span className="text-purple-400">{category.replace(/\s+/g, '_').toLowerCase()}</span>: [
            <span className="text-yellow-300">{skillList.map(s => `"${s}"`).join(', ')}</span>],
          </p>
        ))}
        <p className="text-green-400">{'}'}</p>
      </section>

      {/* Experience as array */}
      <section className="mb-6">
        <p className="text-green-400"><span className="text-gray-500">const</span> experience <span className="text-gray-500">=</span> [</p>
        {experience?.map((exp, i) => (
          <div key={i} className="pl-4 mb-4">
            <p className="text-gray-500">{'{'}</p>
            <div className="pl-4">
              <p><span className="text-purple-400">company</span>: <span className="text-yellow-300">"{exp.company}"</span>,</p>
              <p><span className="text-purple-400">role</span>: <span className="text-yellow-300">"{exp.position}"</span>,</p>
              <p><span className="text-purple-400">period</span>: <span className="text-yellow-300">"{exp.startDate} - {exp.endDate}"</span>,</p>
              <p><span className="text-purple-400">projects</span>: [</p>
              {exp.projects?.map((project, j) => (
                <div key={j} className="pl-4">
                  <p className="text-cyan-400">{'{'} name: "{project.name}", role: "{project.role}" {'}'}</p>
                  {project.achievements && (
                    <div className="text-gray-500 text-sm pl-2">
                      {project.achievements.slice(0, 2).map((a, k) => (
                        <p key={k}>// {a}</p>
                      ))}
                    </div>
                  )}
                  <p className="text-gray-400 text-sm pl-2">
                    stack: [{project.techStack?.map(t => <span key={t} className="text-orange-400">"{t}"</span>).reduce((a, b) => [a, ', ', b])}]
                  </p>
                </div>
              ))}
              <p>]</p>
            </div>
            <p className="text-gray-500">{'},'}</p>
          </div>
        ))}
        <p className="text-green-400">]</p>
      </section>

      {/* Education */}
      <section className="mb-6">
        <p className="text-green-400"><span className="text-gray-500">const</span> education <span className="text-gray-500">=</span> {'{'}</p>
        {education?.map((edu, i) => (
          <div key={i} className="pl-4">
            <p><span className="text-purple-400">degree</span>: <span className="text-yellow-300">"{edu.degree}"</span>,</p>
            <p><span className="text-purple-400">school</span>: <span className="text-yellow-300">"{edu.institution}"</span>,</p>
            <p><span className="text-purple-400">cgpa</span>: <span className="text-orange-400">{edu.cgpa.replace('/10', '')}</span>,</p>
            <p><span className="text-purple-400">year</span>: <span className="text-orange-400">{edu.year}</span></p>
          </div>
        ))}
        <p className="text-green-400">{'}'}</p>
      </section>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-gray-700">
        {languages?.length > 0 && (
          <div>
            <p className="text-gray-500">// Languages</p>
            {languages.map((l, i) => (
              <p key={i} className="text-gray-400">{l.language}: <span className="text-green-400">{l.proficiency}</span></p>
            ))}
          </div>
        )}
        {interests?.length > 0 && (
          <div>
            <p className="text-gray-500">// Interests</p>
            <p className="text-cyan-400">[{interests.map(i => `"${i}"`).join(', ')}]</p>
          </div>
        )}
      </div>
    </div>
  )
}
