const MinimalTemplate = ({
  profile,
  experiences = [],
  education = [],
  skills = [],
}) => {
  return (
    <article className="min-h-[750px] bg-white p-12 text-gray-900">
      <header>
        <h1 className="text-4xl font-light">
          {profile?.name || "Your Name"}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {profile?.headline || "Professional Headline"}
        </p>

        <div className="mt-4 text-xs text-gray-400">
          {[profile?.email, profile?.location, profile?.phone]
            .filter(Boolean)
            .join("  |  ")}
        </div>
      </header>

      {profile?.summary && (
        <section className="mt-10">
          <p className="max-w-xl text-sm leading-7 text-gray-600">
            {profile.summary}
          </p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Experience
          </h2>

          <div className="mt-5 space-y-6">
            {experiences.map((experience, index) => (
              <div key={experience.id || index}>
                <h3 className="text-sm font-medium">
                  {experience.title || "Job Title"}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  {experience.company || "Company"}
                </p>

                {experience.description && (
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {experience.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Education
          </h2>

          <div className="mt-5 space-y-4">
            {education.map((item, index) => (
              <div key={item.id || index}>
                <h3 className="text-sm font-medium">
                  {item.degree || item.title || "Degree"}
                </h3>

                <p className="text-xs text-gray-400">
                  {item.school || item.institution || "Institution"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

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
                  : skill.name || skill.title;

              return (
                <span key={skill.id || index} className="text-sm text-gray-600">
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