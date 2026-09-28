import React from "react";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import MinimalTemplate from "./MinimalTemplate";

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

const PreviewWorkspace = ({
  cvData,
  zoom,
  setZoom,
  onOpenTemplateModal,
}) => {
  const {
    profile,
    experiences,
    education,
    skills,
    selectedTemplate,
  } = cvData;

  const selectedTemplateName =
    templateOptions.find(
      (template) => template.id === selectedTemplate
    )?.name || "Modern";

  return (
    <section className="bg-[#f1f5ff] relative px-10 pt-5 pb-[76px] overflow-hidden flex justify-center items-start max-[1050px]:px-5 max-[760px]:min-h-[860px] max-[760px]:px-[10px] max-[760px]:pb-[74px] max-[430px]:min-h-[700px]">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#b8c4dd 0.7px, transparent 0.7px)",
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
          className="text-[#3d43da] bg-[#f0f2ff] rounded-md text-left leading-[1.2] px-[7px] py-[5px]"
        >
          ▣ &nbsp; Editorial
          <br />
          {selectedTemplateName}
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