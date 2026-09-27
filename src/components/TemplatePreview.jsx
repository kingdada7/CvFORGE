function TemplatePreview({ variant }) {
  if (variant === "classic") {
    return (
      <div className="h-[425px] bg-white border border-[#eef1f6] px-3 pt-10">
        <div className="mx-auto h-[3px] w-[150px] bg-black mb-2" />
        <div className="mx-auto h-[4px] w-[170px] bg-[#7c7c83] mb-2" />
        <div className="h-[2px] bg-[#222] mb-2" />

        <div className="space-y-[6px]">
          <div className="h-[7px] w-[92px] bg-black" />
          <div className="h-[4px] w-full bg-[#dfe9fa]" />
          <div className="h-[4px] w-[80%] bg-[#dfe9fa]" />

          <div className="h-[7px] w-[110px] bg-black mt-2" />
          <div className="h-[4px] w-full bg-[#dfe9fa]" />
          <div className="h-[4px] w-[72%] bg-[#dfe9fa]" />

          <div className="h-[7px] w-[86px] bg-black mt-2" />
          <div className="h-[4px] w-full bg-[#dfe9fa]" />
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="h-[425px] bg-white border border-[#eef1f6] px-3 pt-10">
        <div className="h-[13px] w-[100px] bg-black mb-2" />
        <div className="h-[5px] w-[130px] bg-[#777a83] mb-4" />

        <div className="space-y-[11px]">
          <div className="h-[7px] w-[50px] bg-black" />
          <div className="h-[5px] w-full bg-[#dfe9fa]" />
          <div className="h-[5px] w-[78%] bg-[#dfe9fa]" />

          <div className="h-[7px] w-[58px] bg-black mt-4" />
          <div className="h-[5px] w-full bg-[#dfe9fa]" />
          <div className="h-[5px] w-[75%] bg-[#dfe9fa]" />

          <div className="h-[7px] w-[48px] bg-black mt-4" />
          <div className="h-[5px] w-[90%] bg-[#dfe9fa]" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[425px] bg-white border border-[#eef1f6] px-3 pt-10 relative">
      <div className="h-[13px] w-[110px] bg-[#12223d] rounded-[2px] mb-2" />
      <div className="h-[7px] w-[145px] bg-[#665bea] rounded-[2px] mb-3" />
      <div className="h-[7px] w-[65px] bg-[#12223d] rounded-[2px] mb-2" />

      <div className="space-y-[6px]">
        <div className="h-[5px] w-full bg-[#dfe9fa]" />
        <div className="h-[5px] w-[92%] bg-[#dfe9fa]" />
        <div className="h-[5px] w-[78%] bg-[#dfe9fa]" />

        <div className="h-[7px] w-[65px] bg-[#12223d] rounded-[2px] mt-3 mb-2" />
        <div className="h-[5px] w-full bg-[#dfe9fa]" />
        <div className="h-[5px] w-[87%] bg-[#dfe9fa]" />

        <div className="h-[7px] w-[65px] bg-[#12223d] rounded-[2px] mt-3 mb-2" />
        <div className="h-[5px] w-full bg-[#dfe9fa]" />
      </div>

      <div className="absolute bottom-3 left-3 h-[4px] w-[45px] bg-[#cfe0ff]" />
      <div className="absolute bottom-3 right-3 h-[4px] w-[22px] bg-[#cfe0ff]" />
    </div>
  );
}

export default TemplatePreview;