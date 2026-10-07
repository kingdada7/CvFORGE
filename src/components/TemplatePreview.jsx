import React from "react";

function TemplatePreview({ variant }) {
  const previewBase =
    "relative w-full aspect-[0.72] overflow-hidden border border-[#eef1f6] bg-white";

  if (variant === "classic") {
    return (
      <div className={`${previewBase} px-[5%] pt-[9%]`}>
        <div className="mx-auto mb-2 h-[3px] w-[42%] bg-black" />
        <div className="mx-auto mb-2 h-[4px] w-[48%] bg-[#7c7c83]" />
        <div className="mb-2 h-[2px] w-full bg-[#222]" />

        <div className="space-y-[6px]">
          <div className="h-[7px] w-[28%] bg-black" />
          <div className="h-[4px] w-full bg-[#dfe9fa]" />
          <div className="h-[4px] w-[80%] bg-[#dfe9fa]" />

          <div className="mt-2 h-[7px] w-[34%] bg-black" />
          <div className="h-[4px] w-full bg-[#dfe9fa]" />
          <div className="h-[4px] w-[72%] bg-[#dfe9fa]" />

          <div className="mt-2 h-[7px] w-[27%] bg-black" />
          <div className="h-[4px] w-full bg-[#dfe9fa]" />
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={`${previewBase} px-[5%] pt-[9%]`}>
        <div className="mb-2 h-[13px] w-[30%] bg-black" />
        <div className="mb-4 h-[5px] w-[39%] bg-[#777a83]" />

        <div className="space-y-[11px]">
          <div className="h-[7px] w-[15%] bg-black" />
          <div className="h-[5px] w-full bg-[#dfe9fa]" />
          <div className="h-[5px] w-[78%] bg-[#dfe9fa]" />

          <div className="mt-4 h-[7px] w-[18%] bg-black" />
          <div className="h-[5px] w-full bg-[#dfe9fa]" />
          <div className="h-[5px] w-[75%] bg-[#dfe9fa]" />

          <div className="mt-4 h-[7px] w-[15%] bg-black" />
          <div className="h-[5px] w-[90%] bg-[#dfe9fa]" />
        </div>
      </div>
    );
  }

  if (variant === "executive") {
    return (
      <div className={`${previewBase} px-[5%] pt-[8%]`}>
        {/* Executive header */}
        <div className="border-b-[2px] border-[#1f3a5f] pb-[5%]">
          <div className="h-[14px] w-[48%] bg-[#171717]" />
          <div className="mt-[5px] h-[5px] w-[42%] bg-[#1f3a5f]" />

          <div className="mt-[7px] flex gap-[5px]">
            <div className="h-[3px] w-[18%] bg-[#a0a5ae]" />
            <div className="h-[3px] w-[20%] bg-[#a0a5ae]" />
            <div className="h-[3px] w-[16%] bg-[#a0a5ae]" />
          </div>
        </div>

        {/* Summary */}
        <div className="mt-[6%]">
          <div className="mb-[4px] flex items-center gap-[5px]">
            <div className="h-[5px] w-[24%] bg-[#1f3a5f]" />
            <div className="h-px flex-1 bg-[#dfe2e7]" />
          </div>

          <div className="space-y-[3px]">
            <div className="h-[3px] w-full bg-[#dfe2e7]" />
            <div className="h-[3px] w-[92%] bg-[#dfe2e7]" />
            <div className="h-[3px] w-[74%] bg-[#dfe2e7]" />
          </div>
        </div>

        {/* Experience */}
        <div className="mt-[7%]">
          <div className="mb-[5px] flex items-center gap-[5px]">
            <div className="h-[5px] w-[20%] bg-[#1f3a5f]" />
            <div className="h-px flex-1 bg-[#dfe2e7]" />
          </div>

          <div className="space-y-[7px]">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="h-[5px] w-[30%] bg-[#171717]" />
                  <div className="mt-[3px] h-[3px] w-[24%] bg-[#1f3a5f]" />
                </div>

                <div className="h-[3px] w-[17%] bg-[#b2b6bd]" />
              </div>

              <div className="mt-[4px] space-y-[2px]">
                <div className="h-[3px] w-full bg-[#dfe2e7]" />
                <div className="h-[3px] w-[90%] bg-[#dfe2e7]" />
              </div>
            </div>

            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="h-[5px] w-[27%] bg-[#171717]" />
                  <div className="mt-[3px] h-[3px] w-[21%] bg-[#1f3a5f]" />
                </div>

                <div className="h-[3px] w-[17%] bg-[#b2b6bd]" />
              </div>

              <div className="mt-[4px] h-[3px] w-[82%] bg-[#dfe2e7]" />
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-[7%]">
          <div className="mb-[5px] flex items-center gap-[5px]">
            <div className="h-[5px] w-[19%] bg-[#1f3a5f]" />
            <div className="h-px flex-1 bg-[#dfe2e7]" />
          </div>

          <div className="flex justify-between gap-2">
            <div>
              <div className="h-[5px] w-[30%] bg-[#171717]" />
              <div className="mt-[3px] h-[3px] w-[38%] bg-[#1f3a5f]" />
            </div>

            <div className="h-[3px] w-[17%] bg-[#b2b6bd]" />
          </div>
        </div>

        {/* Skills */}
        <div className="mt-[7%]">
          <div className="mb-[5px] flex items-center gap-[5px]">
            <div className="h-[5px] w-[16%] bg-[#1f3a5f]" />
            <div className="h-px flex-1 bg-[#dfe2e7]" />
          </div>

          <div className="flex gap-[5px]">
            <div className="h-[3px] w-[17%] bg-[#8f949d]" />
            <div className="h-[3px] w-[19%] bg-[#8f949d]" />
            <div className="h-[3px] w-[16%] bg-[#8f949d]" />
            <div className="h-[3px] w-[18%] bg-[#8f949d]" />
          </div>
        </div>
      </div>
    );
  }

  // Modern
  return (
    <div className={`${previewBase} px-[5%] pt-[9%]`}>
      <div className="mb-2 h-[13px] w-[33%] rounded-[2px] bg-[#12223d]" />
      <div className="mb-3 h-[7px] w-[44%] rounded-[2px] bg-[#665bea]" />
      <div className="mb-2 h-[7px] w-[20%] rounded-[2px] bg-[#12223d]" />

      <div className="space-y-[6px]">
        <div className="h-[5px] w-full bg-[#dfe9fa]" />
        <div className="h-[5px] w-[92%] bg-[#dfe9fa]" />
        <div className="h-[5px] w-[78%] bg-[#dfe9fa]" />

        <div className="mb-2 mt-3 h-[7px] w-[20%] rounded-[2px] bg-[#12223d]" />
        <div className="h-[5px] w-full bg-[#dfe9fa]" />
        <div className="h-[5px] w-[87%] bg-[#dfe9fa]" />

        <div className="mb-2 mt-3 h-[7px] w-[20%] rounded-[2px] bg-[#12223d]" />
        <div className="h-[5px] w-full bg-[#dfe9fa]" />
      </div>

      <div className="absolute bottom-[3%] left-[5%] h-[4px] w-[14%] bg-[#cfe0ff]" />
      <div className="absolute bottom-[3%] right-[5%] h-[4px] w-[7%] bg-[#cfe0ff]" />
    </div>
  );
}

export default TemplatePreview;