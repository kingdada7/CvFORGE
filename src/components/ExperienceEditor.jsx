
import React from "react";

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const createExperience = () => ({
  id: createId(),
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  bullets: [],
});

function ExperienceItem({ experience, onUpdate, onDelete }) {
  const addBullet = () => {
    onUpdate("bullets", [...experience.bullets, ""]);
  };

  const updateBullet = (index, value) => {
    const updatedBullets = experience.bullets.map((bullet, bulletIndex) =>
      bulletIndex === index ? value : bullet
    );

    onUpdate("bullets", updatedBullets);
  };

  const deleteBullet = (index) => {
    const updatedBullets = experience.bullets.filter(
      (_, bulletIndex) => bulletIndex !== index
    );

    onUpdate("bullets", updatedBullets);
  };

  return (
    <div className="bg-white rounded-[5px] px-[10px] pt-[11px] pb-[10px] mt-[10px] border border-[#e0e5ef] shadow-[0_1px_1px_#20305d0a]">
      <div className="flex items-start gap-[7px]">
        <span
          className="text-[#59616f] font-sans text-[15px] mt-[5px]"
          aria-hidden="true"
        >
          ⁙
        </span>

        <div className="min-w-0 flex-1 grid grid-cols-2 gap-2">
          <input
            value={experience.title}
            onChange={(e) => onUpdate("title", e.target.value)}
            placeholder="Job title"
            className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
          />

          <input
            value={experience.company}
            onChange={(e) => onUpdate("company", e.target.value)}
            placeholder="Company"
            className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
          />

          <input
            value={experience.location}
            onChange={(e) => onUpdate("location", e.target.value)}
            placeholder="Location"
            className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
          />

          <div className="grid grid-cols-2 gap-1">
            <input
              value={experience.startDate}
              onChange={(e) => onUpdate("startDate", e.target.value)}
              placeholder="Start"
              className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
            />

            <input
              value={experience.endDate}
              onChange={(e) => onUpdate("endDate", e.target.value)}
              placeholder="End"
              disabled={experience.current}
              className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0] disabled:bg-[#f3f5f9]"
            />
          </div>

          <label className="flex items-center gap-1 text-[10px] text-[#66728a]">
            <input
              type="checkbox"
              checked={experience.current}
              onChange={(e) => onUpdate("current", e.target.checked)}
            />
            Current position
          </label>
        </div>

        <button
          type="button"
          onClick={onDelete}
          className="text-[#a05252] text-[13px] px-[2px]"
          aria-label="Delete experience"
          title="Delete experience"
        >
          ×
        </button>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[9px] text-[#66728a]">
            ACHIEVEMENTS / RESPONSIBILITIES
          </span>

          <button
            type="button"
            onClick={addBullet}
            className="text-brand font-mono text-[9px]"
          >
            + Bullet
          </button>
        </div>

        {experience.bullets.length === 0 && (
          <p className="text-[10px] text-[#8a93a4] bg-[#f7f8fb] rounded px-2 py-2">
            Add achievements or responsibilities for this position.
          </p>
        )}

        {experience.bullets.map((bullet, index) => (
          <div
            className="grid grid-cols-[22px_1fr_22px] gap-[3px] items-center mt-2"
            key={`${experience.id}-bullet-${index}`}
          >
            <b className="text-brand font-mono text-[9px]">
              {String(index + 1).padStart(2, "0")}
            </b>

            <input
              value={bullet}
              onChange={(e) => updateBullet(index, e.target.value)}
              placeholder="Describe an achievement or responsibility..."
              className="bg-[#eef2fa] rounded-[3px] px-[7px] py-[6px] border-none outline-none text-[#334057] text-[10px] w-full"
            />

            <button
              type="button"
              onClick={() => deleteBullet(index)}
              className="text-[#a05252] text-[12px]"
              aria-label="Delete bullet"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceEditor({ experiences = [], onUpdate }) {
  const addExperience = () => {
    onUpdate([...experiences, createExperience()]);
  };

  const updateExperience = (id, field, value) => {
    const updatedExperiences = experiences.map((experience) =>
      experience.id === id
        ? {
            ...experience,
            [field]: value,
          }
        : experience
    );

    onUpdate(updatedExperiences);
  };

  const deleteExperience = (id) => {
    const updatedExperiences = experiences.filter(
      (experience) => experience.id !== id
    );

    onUpdate(updatedExperiences);
  };

  return (
    <section className="mt-[14px]">
      <div className="flex items-center justify-between mb-[10px]">
        <h3 className="text-[15px] font-semibold tracking-[-0.03em]">
          Experience

          {experiences.length > 0 && (
            <span className="text-[10px] bg-[#dfe6f7] px-[5px] py-[2px] rounded-[8px] text-[#7b87a2] ml-[7px]">
              {experiences.length}
            </span>
          )}
        </h3>

        <button
          type="button"
          onClick={addExperience}
          className="text-[#2732d5] text-[11px] font-semibold"
        >
          + Add
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="bg-white border border-dashed border-[#d8dfeb] rounded-[5px] p-[14px] text-center">
          <p className="text-[11px] text-[#7b8497] m-0">
            No experience added yet.
          </p>

          <button
            type="button"
            onClick={addExperience}
            className="mt-[8px] text-[11px] text-[#2732d5] font-semibold"
          >
            + Add experience
          </button>
        </div>
      ) : (
        experiences.map((experience) => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
            onUpdate={(field, value) =>
              updateExperience(experience.id, field, value)
            }
            onDelete={() => deleteExperience(experience.id)}
          />
        ))
      )}
    </section>
  );
}

export default ExperienceEditor;
