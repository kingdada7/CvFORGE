const ClassicTemplate = ({
  profile,
  experiences = [],
  education = [],
  skills = [],
}) => {
  return (
    <article className="min-h-[750px] bg-white p-10 text-gray-900">
      {/* Header */}
      <header className="border-b-2 border-gray-900 pb-5 text-center">
        <h1 className="font-serif text-3xl font-bold">
          {profile?.name || "Your Name"}
        </h1>

        <p className="mt-2 font-serif text-gray-600">
          {profile?.headline || "Professional Headline"}
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-gray-500">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.phone && <span>{profile.phone}</span>}
          {profile?.location && <span>{profile.location}</span>}
          {profile?.website && <span>{profile.website}</span>}
        </div>
      </header>

      {/* Summary */}
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

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mt-7">
          <h2 className="border-b border-gray-300 pb-1 font-serif font-bold">
            EXPERIENCE
          </h2>

          <div className="mt-4 space-y-6">
            {experiences.map((experience, index) => (
              <div key={experience.id || index}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold">
                      {experience.title || "Job Title"}
                    </h3>

                    <p className="text-sm italic text-gray-600">
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
                  <ul className="mt-2 space-y-1 pl-5 text-sm leading-6 text-gray-700">
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
        <section className="mt-7">
          <h2 className="border-b border-gray-300 pb-1 font-serif font-bold">
            EDUCATION
          </h2>

          <div className="mt-4 space-y-5">
            {education.map((item, index) => (
              <div key={item.id || index}>
                <h3 className="font-semibold">
                  {item.degree || "Degree / Qualification"}
                </h3>

                <p className="text-sm text-gray-600">
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
        <section className="mt-7">
          <h2 className="border-b border-gray-300 pb-1 font-serif font-bold">
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