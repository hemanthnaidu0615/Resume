import { Mail, Phone, MapPin, Linkedin, Github, Cloud, Server, Shield } from 'lucide-react'

export default function DevOpsTemplate({ data, themeColor = '#F97316' }) {
  const { personal, experience, education, skills, achievements, certifications } = data

  return (
    <div className="bg-slate-900 min-h-[1056px] p-8 font-mono text-slate-200" style={{ width: '816px' }}>
      {/* Terminal-style Header */}
      <header className="mb-6 bg-slate-800 rounded-lg p-4 border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-slate-500 text-sm ml-2">~/{personal.name?.toLowerCase().replace(' ', '-')}</span>
        </div>

        <div className="space-y-1">
          <p><span style={{ color: themeColor }}>$</span> whoami</p>
          <h1 className="text-2xl font-bold text-white pl-4">{personal.name}</h1>

          <p><span style={{ color: themeColor }}>$</span> echo $ROLE</p>
          <p className="pl-4" style={{ color: themeColor }}>{personal.title}</p>

          <p><span style={{ color: themeColor }}>$</span> cat contact.txt</p>
          <div className="pl-4 text-sm space-y-0.5">
            {personal.email && <p>email: {personal.email}</p>}
            {personal.phone && <p>phone: {personal.phone}</p>}
            {personal.location && <p>location: {personal.location}</p>}
            {personal.github && <p>github: {personal.github}</p>}
            {personal.linkedin && <p>linkedin: {personal.linkedin}</p>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-6">
          <p className="text-slate-400 text-sm leading-relaxed">{personal.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Skills & Certs */}
        <div className="space-y-6">
          {/* Skills - Tech Stack */}
          {skills && Object.keys(skills).length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Server className="w-4 h-4" style={{ color: themeColor }} />
                TECH_STACK
              </h2>
              <div className="space-y-3">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h3 className="text-xs text-slate-500 uppercase mb-1"># {category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skillList.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs rounded bg-slate-800 border border-slate-700"
                          style={{ color: themeColor }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications?.filter(c => c.name).length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: themeColor }} />
                CERTIFICATIONS
              </h2>
              <div className="space-y-2">
                {certifications.filter(c => c.name).map((cert, i) => (
                  <div key={i} className="text-xs">
                    <p className="text-white">{cert.name}</p>
                    <p className="text-slate-500">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-white mb-3">EDUCATION</h2>
              {education.map((edu, i) => (
                <div key={i} className="text-xs">
                  <p className="text-white">{edu.degree}</p>
                  <p className="text-slate-500">{edu.institution}</p>
                  <p className="text-slate-600">{edu.year}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column - Experience */}
        <div className="col-span-2">
          {experience?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Cloud className="w-4 h-4" style={{ color: themeColor }} />
                DEPLOYMENT_HISTORY
              </h2>
              <div className="space-y-5">
                {experience.map((exp, i) => (
                  <div key={i} className="border-l-2 pl-4" style={{ borderColor: themeColor }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white">{exp.position}</h3>
                        <p className="text-slate-400 text-sm">{exp.company}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {exp.startDate} → {exp.endDate || 'running'}
                      </span>
                    </div>

                    {exp.projects?.map((proj, j) => (
                      <div key={j} className="mt-3">
                        <h4 className="text-sm text-white flex items-center gap-2">
                          <span style={{ color: themeColor }}>▶</span>
                          {proj.name}
                        </h4>
                        {proj.techStack && (
                          <p className="text-xs text-slate-600 mt-0.5 font-mono">
                            [{proj.techStack.join(', ')}]
                          </p>
                        )}
                        <ul className="mt-1 space-y-1">
                          {proj.achievements?.map((ach, k) => (
                            <li key={k} className="text-xs text-slate-400 flex">
                              <span className="text-slate-600 mr-2">-</span>
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {!exp.projects && exp.achievements && (
                      <ul className="mt-2 space-y-1">
                        {exp.achievements.map((ach, k) => (
                          <li key={k} className="text-xs text-slate-400 flex">
                            <span className="text-slate-600 mr-2">-</span>
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

          {/* Key Metrics/Achievements */}
          {achievements?.filter(a => a.title).length > 0 && (
            <section className="mt-6">
              <h2 className="text-sm font-bold text-white mb-3">KEY_METRICS</h2>
              <div className="grid grid-cols-2 gap-2">
                {achievements.filter(a => a.title).map((ach, i) => (
                  <div key={i} className="bg-slate-800 rounded p-2 border border-slate-700">
                    <p className="text-xs font-bold" style={{ color: themeColor }}>{ach.title}</p>
                    <p className="text-xs text-slate-400">{ach.description}</p>
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
