import React from 'react'

const SkillSection = () => {
  return (
  <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
            <CardHeading
              icon="⌘"
              title="Skills & Technologies"
              count={skills.length}
            />

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
  )
}

export default SkillSection
