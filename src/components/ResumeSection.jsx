import React from "react";
function ResumeSection({ number, title, children }) {
  return (
    <section className="mb-5">
      <h3 className="m-0 mb-[10px] text-[#2732d5] font-mono font-bold text-[9px] tracking-[0.08em]">
        <span className="font-normal">{number} /</span> {title}
      </h3>

      {children}
    </section>
  );
}

export default ResumeSection;
