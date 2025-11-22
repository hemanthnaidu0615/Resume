import { Mail, Phone, MapPin, Linkedin, TrendingUp, Users, Target, Award } from 'lucide-react'

export default function ProductManagerTemplate({ data, themeColor = '#8B5CF6' }) {
  const { personal, experience, education, skills, achievements } = data

  return (
    <div className="bg-white min-h-[1056px] p-8 font-sans" style={{ width: '816px' }}>
      {/* Header - Clean Executive Style */}
      <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: themeColor }}>
        <h1 className="text-4xl font-light text-gray-900 tracking-wide">{personal.name}</h1>
        <p className="text-lg mt-2 font-medium" style={{ color: themeColor }}>{personal.title}</p>

        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
          {personal.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" /> {personal.email}
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> {personal.phone}
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {personal.location}
            </span>
          )}
          {personal.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </span>
          )}
        </div>
      </header>

      {/* Executive Summary */}
      {personal.summary && (
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Executive Summary</h2>
          <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {/* Key Impact Metrics - Important for PMs */}
      {achievements?.filter(a => a.title).length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" style={{ color: themeColor }} />
            Key Impact Metrics
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {achievements.filter(a => a.title).slice(0, 6).map((ach, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-lg"
                style={{ backgroundColor: `${themeColor}08` }}
              >
                <p className="text-2xl font-bold" style={{ color: themeColor }}>
                  {ach.description.match(/\d+[%KMx+]?/)?.[0] || '✓'}
                </p>
                <p className="text-sm text-gray-600 mt-1">{ach.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Main Content - Experience */}
        <div className="col-span-2">
          {experience?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Target className="w-4 h-4" style={{ color: themeColor }} />
                Professional Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>

                    {exp.projects?.map((proj, j) => (
                      <div key={j} className="mt-3">
                        <h4 className="font-medium text-gray-800 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
                          {proj.name}
                          {proj.role && <span className="text-sm text-gray-500">({proj.role})</span>}
                        </h4>
                        <ul className="mt-2 space-y-1.5 ml-4">
                          {proj.achievements?.map((ach, k) => (
                            <li key={k} className="text-sm text-gray-600 relative pl-4">
                              <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-gray-400" />
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {!exp.projects && exp.achievements && (
                      <ul className="mt-3 space-y-1.5">
                        {exp.achievements.map((ach, k) => (
                          <li key={k} className="text-sm text-gray-600 relative pl-4">
                            <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-gray-400" />
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Core Competencies */}
          {skills && Object.keys(skills).length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" style={{ color: themeColor }} />
                Core Competencies
              </h2>
              <div className="space-y-3">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h3 className="text-xs font-semibold text-gray-700 mb-1">{category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skillList.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs rounded-full border"
                          style={{ borderColor: themeColor, color: themeColor }}
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

          {/* Education */}
          {education?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Education</h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <p className="font-medium text-gray-900 text-sm">{edu.degree}</p>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                  <p className="text-gray-500 text-xs">{edu.year}</p>
                </div>
              ))}
            </section>
          )}

          {/* Leadership Style / Philosophy */}
          <section className="p-4 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
            <h2 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" style={{ color: themeColor }} />
              Leadership Approach
            </h2>
            <p className="text-xs text-gray-600 italic">
              "Data-driven decision making with a focus on user outcomes and cross-functional collaboration."
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
