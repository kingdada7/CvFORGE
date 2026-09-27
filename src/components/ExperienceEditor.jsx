function ExperienceEditor({
  experience,
  onUpdate,
  onDelete,
  onAddBullet,
  onUpdateBullet,
  onDeleteBullet,
}) {
  return (
    <div className="bg-white rounded-[5px] px-[10px] pt-[11px] pb-[10px] mt-[10px] border border-[#e0e5ef] shadow-[0_1px_1px_#20305d0a]">
      <div className="flex items-start gap-[7px]">
        <Icon className="text-[#59616f] font-sans text-[15px] !mr-[1px] mt-[5px]">
          ⁙
        </Icon>

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
            onClick={onAddBullet}
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
              onChange={(e) => onUpdateBullet(index, e.target.value)}
              placeholder="Describe an achievement or responsibility..."
              className="bg-[#eef2fa] rounded-[3px] px-[7px] py-[6px] border-none outline-none text-[#334057] text-[10px] w-full"
            />

            <button
              type="button"
              onClick={() => onDeleteBullet(index)}
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
 
export default ExperienceEditor;