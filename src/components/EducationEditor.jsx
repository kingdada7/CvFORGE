function EducationEditor({ education, onUpdate, onDelete }) {
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

export default EducationEditor;