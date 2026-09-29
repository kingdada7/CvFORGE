const MinimalTemplate = ({
  profile,
  experiences = [],
  education = [],
  skills = [],
}) => {
  return (
    <article className="min-h-[750px] bg-white p-12 text-gray-900">
      {/* Header */}
      <header>
        <h1 className="text-4xl font-light">
          {profile?.name || "Your Name"}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {profile?.headline || "Professional Headline"}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.location && <span>{profile.location}</span>}
          {profile?.phone && <span>{profile.phone}</span>}
          {profile?.website && <span>{profile.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {profile?.summary && (
        <section className="mt-10">
          <p className="max-w-xl text-sm leading-7 text-gray-600">
            {profile.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Experience
          </h2>

          <div className="mt-5 space-y-7">
            {experiences.map((experience, index) => (
              <div key={experience.id || index}>
                <h3 className="text-sm font-medium">
                  {experience.title || "Job Title"}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  {experience.company || "Company"}
                  {experience.location && ` · ${experience.location}`}
                </p>

                {(experience.startDate || experience.endDate) && (
                  <p className="mt-1 text-xs text-gray-400">
                    {experience.startDate}
                    {experience.startDate && experience.endDate && " - "}
                    {experience.endDate ||
                      (experience.startDate && experience.current
                        ? "Present"
                        : "")}
                  </p>
                )}

                {experience.bullets?.length > 0 && (
                  <ul className="mt-3 space-y-1 pl-4 text-sm leading-6 text-gray-600">
                    {experience.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="list-disc">
                        {bullet}
                      </li>
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
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Education
          </h2>

          <div className="mt-5 space-y-6">
            {education.map((item, index) => (
              <div key={item.id || index}>
                <h3 className="text-sm font-medium">
                  {item.degree || "Degree / Qualification"}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
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
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Skills
          </h2>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {skills.map((skill, index) => {
              const skillName =
                typeof skill === "string"
                  ? skill
                  : skill?.name || skill?.title || "";

              if (!skillName) return null;

              return (
                <span
                  key={skill.id || index}
                  className="text-sm text-gray-600"
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

export default MinimalTemplate;