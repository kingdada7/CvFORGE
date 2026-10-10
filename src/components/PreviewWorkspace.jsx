import React from "react";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ExecutiveTemplate from "./ExecutiveTemplate";

const templateOptions = [
  {
    id: "modern",
    name: "Modern",
  },
  {
    id: "classic",
    name: "Classic",
  },
  {
    id: "minimal",
    name: "Minimal",
  },
];

const PreviewWorkspace = ({ cvData, zoom, setZoom, onOpenTemplateModal }) => {
  const { profile, experiences, education, skills, selectedTemplate } = cvData;

  const selectedTemplateName =
    templateOptions.find((template) => template.id === selectedTemplate)
      ?.name || "Modern";

  return (
    <section className="bg-[#f1f5ff] relative px-10 pt-5 pb-[76px] overflow-hidden flex justify-center items-start max-[1050px]:px-5 max-[760px]:min-h-[860px] max-[760px]:px-[10px] max-[760px]:pb-[74px] max-[430px]:min-h-[700px]">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#b8c4dd 0.7px, transparent 0.7px)",
          backgroundSize: "17px 17px",
        }}
      />

      {/* CV document */}
      <article
        id="cv-document"
        className="w-[530px] min-h-[750px]"
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: "top center",
        }}
      >
        {selectedTemplate === "modern" && (
          <ModernTemplate
            profile={profile}
            experiences={experiences}
            education={education}
            skills={skills}
          />
        )}

        {selectedTemplate === "classic" && (
          <ClassicTemplate
            profile={profile}
            experiences={experiences}
            education={education}
            skills={skills}
          />
        )}

        {selectedTemplate === "minimal" && (
          <MinimalTemplate
            profile={profile}
            experiences={experiences}
            education={education}
            skills={skills}
          />
        )}


        {selectedTemplate === "executive" && (
          <ExecutiveTemplate
            profile={profile}
            experiences={experiences}
            education={education}
            skills={skills}
          />
        )}
       

      </article>

      {/* Preview controls */}
      <div className="absolute bottom-[19px] z-2 bg-white shadow-[0_5px_19px_#29375d22] rounded-lg px-[10px] py-[7px] flex items-center gap-2 font-mono text-[10px]">
        <button
          type="button"
          className="px-[7px] py-[5px] hover:text-brand"
          onClick={() => setZoom(Math.max(70, zoom - 10))}
          aria-label="Zoom out"
        >
          −
        </button>

        <span>{zoom}%</span>

        <button
          type="button"
          className="px-[7px] py-[5px] hover:text-brand"
          onClick={() => setZoom(Math.min(120, zoom + 10))}
          aria-label="Zoom in"
        >
          +
        </button>

        <i className="h-[19px] w-px bg-[#e2e6ee]" />

        <button
          type="button"
          className="px-[7px] py-[5px] hover:text-brand"
          onClick={() => setZoom(100)}
        >
          ⌗ Fit
        </button>

        <i className="h-[19px] w-px bg-[#e2e6ee]" />

        <button
          type="button"
          onClick={onOpenTemplateModal}
          className="flex min-w-0 items-center gap-1 rounded-md bg-[#f0f2ff] px-1.5 py-1 text-left text-[#3d43da] sm:px-2 sm:py-1.5"
        >
          <span className="shrink-0 text-xs">▣</span>

          <span className="min-w-0">
            <span className="block text-[9px] leading-none text-[#666b80] sm:text-[10px]">
              Template
            </span>

            <span className="block max-w-[75px] truncate text-[10px] font-medium sm:max-w-[100px] sm:text-xs">
              {selectedTemplateName}
            </span>
          </span>
        </button>

        <i className="h-[19px] w-px bg-[#e2e6ee]" />

        <button
          type="button"
          className="px-[7px] py-[5px] hover:text-brand"
          aria-label="Preview options"
        >
          ▦
        </button>
      </div>
    </section>
  );
};

export default PreviewWorkspace;
