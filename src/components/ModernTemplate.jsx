const ModernTemplate = ({
  profile,
  experiences = [],
  education = [],
  skills = [],
}) => {
  return (
  <article className="min-h-[750px] bg-white p-5 font-sans text-gray-900 sm:p-8 lg:p-10">
      {/* Header */}
      <header className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold tracking-tight">
          {profile?.name || "Your Name"}
        </h1>

        <p className="mt-2 text-base font-medium tracking-wide text-gray-500">
          {profile?.headline || "Professional Headline"}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-gray-500">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.location && <span>{profile.location}</span>}
          {profile?.phone && <span>{profile.phone}</span>}
          {profile?.website && <span>{profile.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {profile?.summary && (
        <section className="mt-7">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-gray-900">
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
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-gray-900">
            Experience
          </h2>

          <div className="space-y-7">
            {experiences.map((experience, index) => (
              <div key={experience.id || index}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {experience.title || "Job Title"}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {experience.company || "Company"}
                      {experience.location && ` · ${experience.location}`}
                    </p>
                  </div>

                  {(experience.startDate || experience.endDate) && (
                    <span className="shrink-0 text-right text-xs text-gray-400">
                      {experience.startDate}

                      {experience.startDate && (
                        <>
                          {" - "}
                          {experience.endDate ||
                            (experience.current ? "Present" : "")}
                        </>
                      )}
                    </span>
                  )}
                </div>

                {experience.bullets?.length > 0 && (
                  <ul className="mt-3 space-y-1.5 pl-5 text-sm leading-6 text-gray-600">
                    {experience.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {experience.description && (
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {experience.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-gray-900">
            Education
          </h2>

          <div className="space-y-6">
            {education.map((item, index) => (
              <div key={item.id || index}>
                <h3 className="text-sm font-semibold text-gray-900">
                  {item.degree || "Degree / Qualification"}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {item.school || "School / University"}
                  {item.location && ` · ${item.location}`}
                </p>

                {(item.startDate || item.endDate) && (
                  <p className="mt-1 text-xs text-gray-400">
                    {item.startDate}

                    {item.startDate && item.endDate && " - "}

                    {item.endDate}
                  </p>
                )}

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
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gray-900">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => {
              const skillName =
                typeof skill === "string"
                  ? skill
                  : skill?.name || skill?.title || "";

              if (!skillName) return null;

              return (
                <span
                  key={skill.id || index}
                  className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
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