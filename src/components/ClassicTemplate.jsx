
const ClassicTemplate = ({
  profile,
  experiences = [],
  education = [],
  skills = [],
}) => {
  return (
    <article className="min-h-[750px] bg-white p-10 font-sans text-gray-900">
      {/* Header */}
      <header className="border-b-2 border-gray-900 pb-6 text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tight">
          {profile?.name || "Your Name"}
        </h1>

        <p className="mt-2 font-serif text-sm italic text-gray-600">
          {profile?.headline || "Professional Headline"}
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-500">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.phone && <span>{profile.phone}</span>}
          {profile?.location && <span>{profile.location}</span>}
          {profile?.website && <span>{profile.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {profile?.summary && (
        <section className="mt-7">
          <h2 className="border-b border-gray-300 pb-2 font-serif text-sm font-bold tracking-wide">
            SUMMARY
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-700">
            {profile.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mt-8">
          <h2 className="border-b border-gray-300 pb-2 font-serif text-sm font-bold tracking-wide">
            EXPERIENCE
          </h2>

          <div className="mt-5 space-y-7">
            {experiences.map((experience, index) => (
              <div key={experience.id || index}>
                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <h3 className="font-serif text-sm font-bold text-gray-900">
                      {experience.title || "Job Title"}
                    </h3>

                    <p className="mt-1 text-sm italic text-gray-600">
                      {experience.company || "Company"}
                      {experience.location && ` · ${experience.location}`}
                    </p>
                  </div>

                  {(experience.startDate || experience.endDate) && (
                    <span className="shrink-0 text-right text-xs text-gray-500">
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

                {/* Experience bullets */}
                {experience.bullets?.length > 0 && (
                  <ul className="mt-3 space-y-1.5 pl-5 text-sm leading-6 text-gray-700">
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
        <section className="mt-8">
          <h2 className="border-b border-gray-300 pb-2 font-serif text-sm font-bold tracking-wide">
            EDUCATION
          </h2>

          <div className="mt-5 space-y-6">
            {education.map((item, index) => (
              <div key={item.id || index}>
                <h3 className="font-serif text-sm font-bold text-gray-900">
                  {item.degree || "Degree / Qualification"}
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  {item.school || "School / University"}
                  {item.location && ` · ${item.location}`}
                </p>

                {(item.startDate || item.endDate) && (
                  <p className="mt-1 text-xs text-gray-500">
                    {item.startDate}

                    {item.startDate && item.endDate && " - "}

                    {item.endDate}
                  </p>
                )}

                {item.description && (
                  <p className="mt-2 text-sm leading-6 text-gray-700">
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
          <h2 className="border-b border-gray-300 pb-2 font-serif text-sm font-bold tracking-wide">
            SKILLS
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-700">
            {skills
              .map((skill) =>
                typeof skill === "string"
                  ? skill
                  : skill?.name || skill?.title || ""
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
