const ModernTemplate = ({
  profile,
  experiences = [],
  education = [],
  skills = [],
}) => {
  return (
    <article className="min-h-[750px] bg-white p-10 text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold">
          {profile?.name || "Your Name"}
        </h1>

        <p className="mt-2 text-lg text-gray-600">
          {profile?.headline || "Professional Headline"}
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.location && <span>{profile.location}</span>}
          {profile?.phone && <span>{profile.phone}</span>}
        </div>
      </header>

      {/* Summary */}
      {profile?.summary && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider">
            Profile
          </h2>

          <p className="text-sm leading-6 text-gray-600">
            {profile.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider">
            Experience
          </h2>

          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <div key={experience.id || index}>
                <h3 className="font-semibold">
                  {experience.title || "Job Title"}
                </h3>

                <p className="text-sm text-gray-600">
                  {experience.company || "Company"}
                </p>

                {experience.startDate && (
                  <p className="mt-1 text-xs text-gray-400">
                    {experience.startDate}
                    {experience.endDate
                      ? ` - ${experience.endDate}`
                      : " - Present"}
                  </p>
                )}

                {experience.description && (
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {experience.description}
                  </p>
                )}

                {experience.bullets?.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                    {experience.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
     {education.length > 0 && (
  <section className="mt-8">
    <h2 className="mb-4 text-sm font-bold uppercase tracking-wider">
      Education
    </h2>

    <div className="space-y-5">
      {education.map((item, index) => (
        <div key={item.id || index}>
          {/* Degree */}
          <h3 className="font-semibold">
            {item.degree || "Degree / Qualification"}
          </h3>

          {/* School */}
          <p className="text-sm text-gray-600">
            {item.school || "School / University"}
          </p>

          {/* Location + Dates */}
          {(item.location || item.startDate || item.endDate) && (
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400">
              {item.location && (
                <span>{item.location}</span>
              )}

              {(item.startDate || item.endDate) && (
                <span>
                  {item.startDate}
                  {item.startDate && item.endDate && " - "}
                  {item.endDate}
                </span>
              )}
            </div>
          )}

          {/* Description */}
          {item.description && (
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  </section>
)}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => {
              const skillName =
                typeof skill === "string"
                  ? skill
                  : skill.name || skill.title;

              return (
                <span
                  key={skill.id || index}
                  className="rounded bg-gray-100 px-3 py-1 text-sm"
                >
                  {skillName}
                </span>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
};

export default ModernTemplate;