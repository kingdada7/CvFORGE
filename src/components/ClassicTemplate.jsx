const ClassicTemplate = ({
  profile,
  experiences = [],
  education = [],
  skills = [],
}) => {
  return (
    <article className="min-h-[750px] bg-white p-10 text-gray-900">
      <header className="border-b-2 border-gray-900 pb-5 text-center">
        <h1 className="text-3xl font-serif font-bold">
          {profile?.name || "Your Name"}
        </h1>

        <p className="mt-2 font-serif text-gray-600">
          {profile?.headline || "Professional Headline"}
        </p>

        <div className="mt-3 text-sm text-gray-500">
          {[profile?.email, profile?.phone, profile?.location]
            .filter(Boolean)
            .join(" • ")}
        </div>
      </header>

      {profile?.summary && (
        <section className="mt-6">
          <h2 className="border-b border-gray-300 pb-1 font-serif font-bold">
            SUMMARY
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-700">
            {profile.summary}
          </p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mt-7">
          <h2 className="border-b border-gray-300 pb-1 font-serif font-bold">
            EXPERIENCE
          </h2>

          <div className="mt-4 space-y-5">
            {experiences.map((experience, index) => (
              <div key={experience.id || index}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {experience.title || "Job Title"}
                    </h3>

                    <p className="text-sm italic text-gray-600">
                      {experience.company || "Company"}
                    </p>
                  </div>

                  <span className="text-xs text-gray-500">
                    {experience.startDate}
                    {experience.endDate
                      ? ` - ${experience.endDate}`
                      : " - Present"}
                  </span>
                </div>

                {experience.description && (
                  <p className="mt-2 text-sm leading-6 text-gray-700">
                    {experience.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mt-7">
          <h2 className="border-b border-gray-300 pb-1 font-serif font-bold">
            EDUCATION
          </h2>

          <div className="mt-4 space-y-4">
            {education.map((item, index) => (
              <div key={item.id || index}>
                <h3 className="font-semibold">
                  {item.degree || item.title || "Degree"}
                </h3>

                <p className="text-sm text-gray-600">
                  {item.school || item.institution || "Institution"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-7">
          <h2 className="border-b border-gray-300 pb-1 font-serif font-bold">
            SKILLS
          </h2>

          <p className="mt-3 text-sm text-gray-700">
            {skills
              .map((skill) =>
                typeof skill === "string"
                  ? skill
                  : skill.name || skill.title
              )
              .filter(Boolean)
              .join(" • ")}
          </p>
        </section>
      )}
    </article>
  );
};

export default ClassicTemplate;