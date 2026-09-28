import React from "react";

const PersonalInformationForm = ({ profile, onUpdate }) => {
  const fields = [
    {
      name: "name",
      label: "Full Name",
      placeholder: "Your full name",
    },
    {
      name: "headline",
      label: "Headline",
      placeholder: "e.g. Frontend Developer",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "you@example.com",
      type: "email",
    },
    {
      name: "phone",
      label: "Phone",
      placeholder: "+234...",
    },
    {
      name: "location",
      label: "Location",
      placeholder: "City, Country",
    },
    {
      name: "website",
      label: "Website",
      placeholder: "yourwebsite.com",
    },
  ];

  return (
    <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[15px]">♙</span>

        <h3 className="text-[13px] font-semibold text-ink">
          Personal Information
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3 gap-x-[10px] max-[430px]:grid-cols-1">
        {fields.map((field) => (
          <label
            key={field.name}
            className="text-[#66728a] font-mono text-[9px]"
          >
            {field.label}

            <input
              type={field.type || "text"}
              value={profile?.[field.name] || ""}
              onChange={(e) => onUpdate(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
            />
          </label>
        ))}
      </div>
    </section>
  );
};

export default PersonalInformationForm;