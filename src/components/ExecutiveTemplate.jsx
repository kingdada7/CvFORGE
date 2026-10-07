const ExecutiveTemplate = ({
  profile,
  experiences = [],
  education = [],
  skills = [],
}) => {
  return (
    <article className="min-h-[750px] bg-white px-8 py-10 font-sans text-[#171717] sm:px-10 lg:px-12">
      {/* Header */}
      <header className="border-b-2 border-[#1f3a5f] pb-7">
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-[-0.03em] text-[#171717] sm:text-4xl">
              {profile?.name || "Your Name"}
            </h1>

            <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-[#1f3a5f]">
              {profile?.headline || "Professional Headline"}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-gray-500">
            {profile?.email && <span>{profile.email}</span>}
            {profile?.phone && <span>{profile.phone}</span>}
            {profile?.location && <span>{profile.location}</span>}
            {profile?.website && <span>{profile.website}</span>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {profile?.summary && (
        <section className="mt-7">
          <SectionHeading title="Professional Summary" />

          <p className="max-w-4xl text-[13px] leading-6 text-gray-600">
            {profile.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mt-8">
          <SectionHeading title="Experience" />

          <div className="space-y-7">
            {experiences.map((experience, index) => (
              <div
                key={experience.id || index}
                className="grid grid-cols-[1fr_auto] gap-6"
              >
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#171717]">
                    {experience.title || "Job Title"}
                  </h3>

                  <p className="mt-1 text-[12px] font-medium text-[#1f3a5f]">
                    {experience.company || "Company"}
                    {experience.location &&
                      ` · ${experience.location}`}
                  </p>

                  {experience.bullets?.length > 0 && (
                    <ul className="mt-3 space-y-1.5 pl-4 text-[12px] leading-5 text-gray-600">
                      {experience.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="list-disc">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {experience.description && (
                    <p className="mt-3 text-[12px] leading-5 text-gray-600">
                      {experience.description}
                    </p>
                  )}
                </div>

                {(experience.startDate || experience.endDate) && (
                  <div className="whitespace-nowrap pt-0.5 text-right text-[10px] font-medium uppercase tracking-wide text-gray-400">
                    <span>{experience.startDate}</span>

                    {experience.startDate && (
                      <>
                        {" – "}
                        <span>
                          {experience.endDate ||
                            (experience.current ? "Present" : "")}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mt-8">
          <SectionHeading title="Education" />

          <div className="space-y-5">
            {education.map((item, index) => (
              <div
                key={item.id || index}
                className="grid grid-cols-[1fr_auto] gap-6"
              >
                <div>
                  <h3 className="text-sm font-bold text-[#171717]">
                    {item.degree || "Degree / Qualification"}
                  </h3>

                  <p className="mt-1 text-[12px] font-medium text-[#1f3a5f]">
                    {item.school || "School / University"}
                    {item.location && ` · ${item.location}`}
                  </p>

                  {item.description && (
                    <p className="mt-2 text-[12px] leading-5 text-gray-600">
                      {item.description}
                    </p>
                  )}
                </div>

                {(item.startDate || item.endDate) && (
                  <p className="whitespace-nowrap pt-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                    {item.startDate}

                    {item.startDate && item.endDate && " – "}

                    {item.endDate}
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
          <SectionHeading title="Core Skills" />

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-gray-600">
            {skills.map((skill, index) => {
              const skillName =
                typeof skill === "string"
                  ? skill
                  : skill?.name || skill?.title || "";

              if (!skillName) return null;

              return (
                <span key={skill.id || index}>
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


/* Reusable section heading */
const SectionHeading = ({ title }) => {
  return (
    <div className="mb-4 flex items-center gap-4">
      <h2 className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1f3a5f]">
        {title}
      </h2>

      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
};

export default ExecutiveTemplate;