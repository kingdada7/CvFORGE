import React, { useState, useEffect, useMemo } from "react";

function TemplateModal({
  selectedTemplate,
  setSelectedTemplate,
  onClose,
  onApply,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[#20232b]/45 backdrop-blur-[4px] flex items-center justify-center p-6 max-[760px]:p-3">
      <div className="w-full max-w-[1095px] bg-white rounded-[5px] shadow-[0_22px_60px_#151a2b45] overflow-hidden border-t-[3px] border-brand">
        <div className="px-9 pt-5 pb-3 max-[760px]:px-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#e9e6ff] text-[#3f35d5] font-mono text-[10px] font-bold tracking-[0.06em] px-1 py-[2px]">
                  DESIGN SYSTEM
                </span>

                <span className="font-mono text-[10px] text-[#5e6471]">
                  CV Templates
                </span>
              </div>

              <h2 className="text-[22px] leading-none tracking-[-0.04em] font-bold m-0">
                Choose your template
              </h2>

              <p className="text-[13px] text-[#505866] mt-3 mb-0">
                Select a layout that highlights your experience. Your content
                adapts automatically without re-entering data.
              </p>
            </div>

            <button
              type="button"
              className="text-[#41454d] text-[28px] leading-none font-light px-1 -mt-1"
              onClick={onClose}
              aria-label="Close template chooser"
            >
              ×
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 px-9 py-3 max-[760px]:grid-cols-1 max-[760px]:px-5 max-[760px]:gap-3">
          {templateOptions.map((template) => {
            const isSelected = selectedTemplate === template.id;

            return (
              <button
                type="button"
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`text-left rounded-[7px] p-3 pb-[10px] border bg-[#fbfcff] transition-all duration-150 ${
                  isSelected
                    ? "border-[#bdb8ff] shadow-[0_2px_8px_#5a54d52a]"
                    : "border-[#eef1f6] hover:border-[#bdb8ff]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[17px] font-bold">
                    <span
                      className={`w-[8px] h-[8px] rounded-full ${
                        template.id === "modern"
                          ? "bg-[#4f45e3]"
                          : "bg-[#233044]"
                      }`}
                    />

                    {template.name}
                  </div>

                  {isSelected && (
                    <span className="bg-[#5146e5] text-white rounded-[2px] text-[10px] font-semibold px-2 py-1">
                      ✓ Selected
                    </span>
                  )}
                </div>

                <TemplatePreview variant={template.id} />

                <p className="text-[12px] leading-[1.45] text-[#515967] min-h-[38px] mt-[10px] mb-[9px]">
                  {template.description}
                </p>

                <span
                  className={`block text-center rounded-[4px] text-[12px] font-semibold py-[7px] ${
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

        <div className="bg-[#f1f5ff] border-t border-[#e4eafa] px-9 py-3 flex items-center justify-between max-[760px]:px-5 max-[760px]:gap-3 max-[430px]:flex-col max-[430px]:items-stretch">
          <span className="text-[12px] text-[#657084] flex items-center">
            <span className="text-brand text-[17px] mr-2">◉</span>
            All templates are ATS-friendly and PDF export ready.
          </span>

          <div className="flex gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-[#e1e6f0] text-[#374256] rounded-[4px] px-5 py-[7px] text-[12px] font-semibold"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onApply}
              className="bg-black text-white rounded-[4px] px-5 py-[7px] text-[12px] font-semibold"
            >
              Confirm &amp; Apply&nbsp; →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateModal;