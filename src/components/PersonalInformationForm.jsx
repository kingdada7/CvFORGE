import React from "react";
<aside className="bg-[#f8fafc] p-[19px] pb-[22px] border-r border-[#e0e7f2] overflow-y-auto max-[1050px]:p-[14px] max-[760px]:border-r-0">
  {/* Personal information */}
  <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
    <CardHeading icon="♙" title="Personal Information" />

    <div className="grid grid-cols-2 gap-3 gap-x-[10px] max-[430px]:grid-cols-1">
      <label className="text-[#66728a] font-mono text-[9px]">
        Full Name
        <input
          value={profile.name}
          onChange={(e) => updateProfile("name", e.target.value)}
          placeholder="Your full name"
          className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
        />
      </label>

      <label className="text-[#66728a] font-mono text-[9px]">
        Headline
        <input
          value={profile.headline}
          onChange={(e) => updateProfile("headline", e.target.value)}
          placeholder="e.g. Frontend Developer"
          className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
        />
      </label>

      <label className="text-[#66728a] font-mono text-[9px]">
        Email
        <input
          type="email"
          value={profile.email}
          onChange={(e) => updateProfile("email", e.target.value)}
          placeholder="you@example.com"
          className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
        />
      </label>

      <label className="text-[#66728a] font-mono text-[9px]">
        Phone
        <input
          value={profile.phone}
          onChange={(e) => updateProfile("phone", e.target.value)}
          placeholder="+234..."
          className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
        />
      </label>

      <label className="text-[#66728a] font-mono text-[9px]">
        Location
        <input
          value={profile.location}
          onChange={(e) => updateProfile("location", e.target.value)}
          placeholder="City, Country"
          className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
        />
      </label>

      <label className="text-[#66728a] font-mono text-[9px]">
        Website
        <input
          value={profile.website}
          onChange={(e) => updateProfile("website", e.target.value)}
          placeholder="yourwebsite.com"
          className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
        />
      </label>
    </div>
  </section>

  {/* Summary */}
  <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
    <CardHeading icon="≡" title="Executive Summary" />

    <textarea
      value={profile.summary}
      onChange={(e) => updateProfile("summary", e.target.value)}
      placeholder="Write a short professional summary..."
      className="block w-full border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] h-[84px] leading-[1.45] resize-y focus:border-[#7578f0]"
    />
  </section>

  {/* Experience */}
  <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
    <div className="flex items-center justify-between">
      <CardHeading
        icon="▣"
        title="Work Experience"
        count={experiences.length}
      />

      <button
        type="button"
        onClick={addExperience}
        className="text-brand font-mono text-[9px]"
      >
        + Record
      </button>
    </div>

    {experiences.length === 0 && (
      <div className="bg-white border border-dashed border-[#d6ddeb] rounded-[5px] p-4 text-center">
        <p className="text-[10px] text-[#7b87a2] m-0">
          No work experience added yet.
        </p>

        <button
          type="button"
          onClick={addExperience}
          className="mt-2 text-brand text-[10px] font-semibold"
        >
          + Add your first position
        </button>
      </div>
    )}

    {experiences.map((experience) => (
      <ExperienceEditor
        key={experience.id}
        experience={experience}
        onUpdate={(field, value) =>
          updateExperience(experience.id, field, value)
        }
        onDelete={() => deleteExperience(experience.id)}
        onAddBullet={() => addBullet(experience.id)}
        onUpdateBullet={(index, value) =>
          updateBullet(experience.id, index, value)
        }
        onDeleteBullet={(index) => deleteBullet(experience.id, index)}
      />
    ))}

    {experiences.length > 0 && (
      <button
        type="button"
        onClick={addExperience}
        className="mt-[10px] w-full bg-white rounded-[4px] py-[7px] text-[11px] text-[#131c32] border border-[#dfe6f4]"
      >
        ⊕ &nbsp;Add Position
      </button>
    )}
  </section>

  {/* Education */}
  <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
    <div className="flex items-center justify-between">
      <CardHeading icon="⌂" title="Education" count={education.length} />

      <button
        type="button"
        onClick={addEducation}
        className="text-brand font-mono text-[9px]"
      >
        + Record
      </button>
    </div>

    {education.length === 0 && (
      <div className="bg-white border border-dashed border-[#d6ddeb] rounded-[5px] p-4 text-center">
        <p className="text-[10px] text-[#7b87a2] m-0">
          No education added yet.
        </p>

        <button
          type="button"
          onClick={addEducation}
          className="mt-2 text-brand text-[10px] font-semibold"
        >
          + Add education
        </button>
      </div>
    )}

    {education.map((item) => (
      <EducationEditor
        key={item.id}
        education={item}
        onUpdate={(field, value) => updateEducation(item.id, field, value)}
        onDelete={() => deleteEducation(item.id)}
      />
    ))}
  </section>

  {/* Skills */}
  <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
    <CardHeading icon="⌘" title="Skills & Technologies" count={skills.length} />

    <div className="flex gap-[5px] flex-wrap">
      {skills.map((skill) => (
        <span
          className="inline-flex items-center bg-white border border-[#dfe4ef] pl-2 pr-[6px] py-[5px] rounded-[3px] text-[10px]"
          key={skill}
        >
          {skill}

          <button
            type="button"
            onClick={() => deleteSkill(skill)}
            className="pl-[6px] text-[#a2aabc] text-[12px]"
            aria-label={`Remove ${skill}`}
          >
            ×
          </button>
        </span>
      ))}
    </div>

    <div className="flex gap-2 mt-[10px]">
      <input
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
          }
        }}
        placeholder="Add a skill"
        className="flex-1 border border-[#dfe4ef] bg-white rounded-[4px] px-2 py-[6px] text-[10px] outline-none focus:border-[#7578f0]"
      />

      <button
        type="button"
        onClick={addSkill}
        className="text-brand px-[9px] py-[5px] text-[11px] bg-white rounded-[4px] border border-[#dfe4ef]"
      >
        ＋ Add
      </button>
    </div>
  </section>

  {/* More */}
  <button
    type="button"
    onClick={addEducation}
    className="w-full bg-panel text-[#1d2943] rounded-[7px] py-[11px] text-[11px] shadow-[inset_0_0_0_1px_#e6eaff]"
  >
    ⊞ &nbsp;Add Section
  </button>
</aside>;


export default PersonalInformationForm;
