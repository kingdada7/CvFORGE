import React, { useState } from "react";

const SkillSection = ({ skills = [], onUpdate }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const trimmedSkill = newSkill.trim();

    if (!trimmedSkill) return;

    // Prevent duplicate skills
    if (skills.includes(trimmedSkill)) {
      setNewSkill("");
      return;
    }

    onUpdate([...skills, trimmedSkill]);
    setNewSkill("");
  };

  const deleteSkill = (skillToDelete) => {
    const updatedSkills = skills.filter(
      (skill) => skill !== skillToDelete
    );

    onUpdate(updatedSkills);
  };

  return (
    <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[15px]">⌘</span>

        <h3 className="text-[13px] font-semibold text-ink">
          Skills & Technologies
        </h3>

        {skills.length > 0 && (
          <span className="text-[10px] bg-[#dfe6f7] px-[5px] py-[2px] rounded-[8px] text-[#7b87a2]">
            {skills.length}
          </span>
        )}
      </div>

      {skills.length > 0 && (
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
      )}

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
  );
};

export default SkillSection;