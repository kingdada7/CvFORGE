import React from "react";

const SummarySection = () => {
  return (
    <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
      <CardHeading icon="≡" title="Executive Summary" />

      <textarea
        value={profile.summary}
        onChange={(e) => updateProfile("summary", e.target.value)}
        placeholder="Write a short professional summary..."
        className="block w-full border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] h-[84px] leading-[1.45] resize-y focus:border-[#7578f0]"
      />
    </section>
  );
};

export default SummarySection;
