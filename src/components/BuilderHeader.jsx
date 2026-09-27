import React from "react";

const BuilderHeader = () => {
  return (
    <header className="h-[52px] bg-white border-b border-[#edf0f5] flex items-center px-5 gap-4">
      <div className="font-bold text-[15px] tracking-[-0.04em] whitespace-nowrap">
        CVForge{" "}
        <span className="inline-block w-1 h-1 rounded-full bg-brand align-top ml-[3px] mt-[2px]" />
      </div>

      <div className="h-[18px] w-px bg-[#d8dfeb]" />

      <nav
        className="flex items-center gap-[19px] text-[11px] max-[760px]:hidden"
        aria-label="Primary navigation"
      >
        <a className="font-bold text-ink relative" href="#builder">
          Builder
          <span className="absolute -bottom-[18px] left-0 w-full h-[2px] bg-brand" />
        </a>

        <a className="text-[#394255] no-underline" href="#templates">
          Templates
        </a>

        <a
          className="text-[#394255] no-underline hidden lg:inline"
          href="#examples"
        >
          Examples
        </a>

        <a
          className="text-[#394255] no-underline hidden lg:inline"
          href="#guide"
        >
          Editorial Guide
        </a>
      </nav>

      <div className="ml-auto flex items-center gap-[18px] whitespace-nowrap">
        <button
          type="button"
          className={`text-[11px] flex items-center px-[9px] py-[6px] rounded-[4px] ${
            isSaved
              ? "bg-[#f0f4ff] text-[#485575]"
              : "bg-[#fff4e7] text-[#b76a18]"
          }`}
        >
          <Icon className="font-sans text-[12px]">✓</Icon>

          {isSaved ? "Saved" : "Unsaved"}
        </button>

        <button
          type="button"
          onClick={() => setIsTemplateModalOpen(true)}
          className="text-[11px] flex items-center hidden xl:flex"
        >
          <Icon className="text-ink font-sans">◈</Icon>
          Template
        </button>

        <button
          type="button"
          onClick={() => setZoom(100)}
          className="text-[11px] flex items-center hidden xl:flex"
        >
          <Icon className="text-ink font-sans">▣</Icon>
          Preview
        </button>

        <button className="bg-[#090b0f] text-white text-[11px] px-[13px] py-2 rounded-[4px] flex items-center shadow-[0_2px_4px_#0002] max-[760px]:px-2 max-[760px]:text-[0px]">
          <Link to="/download">
            <Icon className="text-white font-sans max-[760px]:text-[13px] max-[760px]:!mr-0">
              ⇩
            </Icon>
            Download PDF
          </Link>
        </button>
      </div>
    </header>
  );
};

export default BuilderHeader;
