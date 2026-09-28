
import React from "react";

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const createEducation = () => ({
  id: createId(),
  degree: "",
  school: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
});

function EducationItem({ education, onUpdate, onDelete }) {
  return (
    <div className="bg-white rounded-[5px] px-[10px] pt-[11px] pb-[10px] mt-[10px] border border-[#e0e5ef]">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 grid grid-cols-2 gap-2">
          <input
            value={education.degree}
            onChange={(e) => onUpdate("degree", e.target.value)}
            placeholder="Degree / Qualification"
            className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
          />

          <input
            value={education.school}
            onChange={(e) => onUpdate("school", e.target.value)}
            placeholder="School / University"
            className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
          />

          <input
            value={education.location}
            onChange={(e) => onUpdate("location", e.target.value)}
            placeholder="Location"
            className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
          />

          <div className="grid grid-cols-2 gap-1">
            <input
              value={education.startDate}
              onChange={(e) => onUpdate("startDate", e.target.value)}
              placeholder="Start"
              className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
            />

            <input
              value={education.endDate}
              onChange={(e) => onUpdate("endDate", e.target.value)}
              placeholder="End"
              className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
            />
          </div>

          <textarea
            value={education.description}
            onChange={(e) => onUpdate("description", e.target.value)}
            placeholder="Description, achievements, coursework..."
            className="col-span-2 border border-[#dde3f0] rounded-[4px] px-2 py-2 text-[11px] outline-none focus:border-[#7578f0] resize-y min-h-[60px]"
          />
        </div>

        <button
          type="button"
          onClick={onDelete}
          className="text-[#a05252] text-[13px]"
          aria-label="Delete education"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function EducationEditor({ education = [], onUpdate }) {
  const addEducation = () => {
    onUpdate([...education, createEducation()]);
  };

  const updateEducation = (id, field, value) => {
    const updatedEducation = education.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]: value,
          }
        : item
    );

    onUpdate(updatedEducation);
  };

  const deleteEducation = (id) => {
    const updatedEducation = education.filter((item) => item.id !== id);

    onUpdate(updatedEducation);
  };

  return (
    <section className="mt-[14px]">
      <div className="flex items-center justify-between mb-[10px]">
        <h3 className="text-[15px] font-semibold tracking-[-0.03em]">
          Education
          {education.length > 0 && (
            <span className="text-[10px] bg-[#dfe6f7] px-[5px] py-[2px] rounded-[8px] text-[#7b87a2] ml-[7px]">
              {education.length}
            </span>
          )}
        </h3>

        <button
          type="button"
          onClick={addEducation}
          className="text-[#2732d5] text-[11px] font-semibold"
        >
          + Add
        </button>
      </div>

      {education.length === 0 ? (
        <div className="bg-white border border-dashed border-[#d8dfeb] rounded-[5px] p-[14px] text-center">
          <p className="text-[11px] text-[#7b8497] m-0">
            No education added yet.
          </p>

          <button
            type="button"
            onClick={addEducation}
            className="mt-[8px] text-[11px] text-[#2732d5] font-semibold"
          >
            + Add education
          </button>
        </div>
      ) : (
        education.map((item) => (
          <EducationItem
            key={item.id}
            education={item}
            onUpdate={(field, value) =>
              updateEducation(item.id, field, value)
            }
            onDelete={() => deleteEducation(item.id)}
          />
        ))
      )}
    </section>
  );
}

export default EducationEditor;
