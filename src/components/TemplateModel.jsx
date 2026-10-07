import React from "react";
import TemplatePreview from "./TemplatePreview";

const templateOptions = [
  {
    id: "modern",
    name: "Modern",
    description: "A clean contemporary layout with strong visual hierarchy.",
    button: "Use Modern",
  },
  {
    id: "classic",
    name: "Classic",
    description: "A traditional professional layout suitable for formal CVs.",
    button: "Use Classic",
  },
  {
    id: "minimal",
    name: "Minimal",
    description:
      "A simple, spacious layout focused on clarity and readability.",
    button: "Use Minimal",
  },

  {
    id: "executive",
    name: "Executive",
    description:
      "A refined corporate layout built for experienced professionals and leadership roles.",
    button: "Use Executive",
  },
];

function TemplateModal({
  selectedTemplate,
  setSelectedTemplate,
  onClose,
  onApply,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20232b]/45 p-3 backdrop-blur-[4px] sm:p-5">
      <div className="flex max-h-[calc(100dvh-24px)] w-full max-w-[1095px] flex-col overflow-hidden rounded-[5px] border-t-[3px] border-brand bg-white shadow-[0_22px_60px_#151a2b45] sm:max-h-[calc(100dvh-40px)]">
        {/* Header */}
        <div className="shrink-0 px-4 pb-4 pt-4 sm:px-7 sm:pb-5 sm:pt-5 lg:px-9">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="bg-[#e9e6ff] px-1 py-[2px] font-mono text-[10px] font-bold tracking-[0.06em] text-[#3f35d5]">
                  DESIGN SYSTEM
                </span>

                <span className="font-mono text-[10px] text-[#5e6471]">
                  CV Templates
                </span>
              </div>

              <h2 className="m-0 text-xl font-bold leading-tight tracking-[-0.04em] sm:text-[22px]">
                Choose your template
              </h2>

              <p className="mb-0 mt-2 max-w-2xl text-xs leading-relaxed text-[#505866] sm:mt-3 sm:text-[13px]">
                Select a layout that highlights your experience. Your content
                adapts automatically without re-entering data.
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded text-2xl font-light leading-none text-[#41454d] hover:text-black sm:text-[28px]"
              onClick={onClose}
              aria-label="Close template chooser"
            >
              ×
            </button>
          </div>
        </div>

        {/* Scrollable templates */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-7 lg:px-9">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {templateOptions.map((template) => {
              const isSelected = selectedTemplate === template.id;

              return (
                <button
                  type="button"
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  aria-pressed={isSelected}
                  className={`min-w-0 rounded-[7px] border bg-[#fbfcff] p-3 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5146e5] focus-visible:ring-offset-2 ${
                    isSelected
                      ? "border-[#bdb8ff] shadow-[0_2px_8px_#5a54d52a]"
                      : "border-[#eef1f6] hover:border-[#bdb8ff]"
                  }`}
                >
                  {/* Template title */}
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2 text-base font-bold sm:text-[17px]">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          template.id === "modern"
                            ? "bg-[#4f45e3]"
                            : template.id === "classic"
                              ? "bg-[#233044]"
                              : template.id === "minimal"
                                ? "bg-[#737887]"
                                : "bg-[#1f3a5f]"
                        }`}
                      />

                      <span>{template.name}</span>
                    </div>

                    {isSelected && (
                      <span className="shrink-0 rounded-[2px] bg-[#5146e5] px-2 py-1 text-[10px] font-semibold text-white">
                        ✓ Selected
                      </span>
                    )}
                  </div>

                  {/* Template preview */}
                  <div className="w-full overflow-hidden">
                    <TemplatePreview variant={template.id} />
                  </div>

                  {/* Description */}
                  <p className="mb-3 mt-[10px] text-xs leading-[1.5] text-[#515967]">
                    {template.description}
                  </p>

                  {/* Selection button */}
                  <span
                    className={`block rounded-[4px] py-2 text-center text-xs font-semibold ${
                      isSelected
                        ? "bg-[#5146e5] text-white"
                        : "bg-[#edf2ff] text-[#26344a]"
                    }`}
                  >
                    {isSelected ? "◉ Active Template" : template.button}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-[#e4eafa] bg-[#f1f5ff] px-4 py-3 sm:px-7 lg:px-9">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-start text-[11px] leading-relaxed text-[#657084] sm:text-xs">
              <span className="mr-2 text-[17px] leading-none text-brand">
                ◉
              </span>
              <span>All templates are ATS-friendly and PDF export ready.</span>
            </span>

            <div className="flex w-full gap-2 sm:w-auto sm:shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-[4px] border border-[#e1e6f0] bg-white px-4 py-2 text-xs font-semibold text-[#374256] hover:bg-gray-50 sm:flex-none sm:px-5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onApply}
                className="flex-1 rounded-[4px] bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-[#252525] sm:flex-none sm:px-5"
              >
                Confirm &amp; Apply →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateModal;
