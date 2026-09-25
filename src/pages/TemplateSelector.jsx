
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { getCVData, saveCVData } from "../utils/cvStorage";

const emptyCVData = {
  profile: {
    name: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
  },
  experiences: [],
  education: [],
  skills: [],
  selectedTemplate: "modern",
};

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const createExperience = () => ({
  id: createId(),
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  bullets: [],
});

const createEducation = () => ({
  id: createId(),
  degree: "",
  school: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
});

const createInitialCVData = () => ({
  ...emptyCVData,
  profile: {
    ...emptyCVData.profile,
  },
  experiences: [],
  education: [],
  skills: [],
  selectedTemplate: "modern",
});

const normalizeCVData = (savedData) => {
  if (!savedData) {
    return createInitialCVData();
  }

  return {
    ...emptyCVData,
    ...savedData,

    profile: {
      ...emptyCVData.profile,
      ...(savedData.profile || {}),
    },

    experiences: Array.isArray(savedData.experiences)
      ? savedData.experiences
      : [],

    education: Array.isArray(savedData.education)
      ? savedData.education
      : [],

    skills: Array.isArray(savedData.skills) ? savedData.skills : [],

    selectedTemplate: savedData.selectedTemplate || "modern",
  };
};

const templateOptions = [
  {
    id: "modern",
    name: "Modern",
    description:
      "Clean, contemporary, and professional. Ideal for tech, product, and high-growth roles.",
    button: "Active Template",
  },
  {
    id: "classic",
    name: "Classic",
    description:
      "Traditional and structured. Built for finance, law, consulting, and corporate leadership.",
    button: "Apply Classic Template",
  },
  {
    id: "minimal",
    name: "Minimal",
    description:
      "Simple, elegant, and typography-focused. Strips away all noise for maximum reading clarity.",
    button: "Apply Minimal Template",
  },
];

const tabIcons = ["♙", "≡", "▣", "⌂", "⌘", "+"];

function Icon({ children, className = "" }) {
  return (
    <span
      className={`inline-flex w-[17px] justify-center items-center text-brand font-serif mr-[7px] ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

function CardHeading({ icon, title, count }) {
  return (
    <div className="flex items-center justify-between mb-[14px]">
      <h3 className="text-[15px] m-0 tracking-[-0.03em] flex items-center">
        <Icon className="font-sans text-[14px]">{icon}</Icon>

        {title}

        {typeof count === "number" && (
          <small className="text-[10px] bg-[#dfe6f7] px-[5px] py-[2px] rounded-[8px] text-[#7b87a2] ml-[7px]">
            {count}
          </small>
        )}
      </h3>

      <span className="text-brand text-[16px] font-bold">✓</span>
    </div>
  );
}

function ExperienceEditor({
  experience,
  onUpdate,
  onDelete,
  onAddBullet,
  onUpdateBullet,
  onDeleteBullet,
}) {
  return (
    <div className="bg-white rounded-[5px] px-[10px] pt-[11px] pb-[10px] mt-[10px] border border-[#e0e5ef] shadow-[0_1px_1px_#20305d0a]">
      <div className="flex items-start gap-[7px]">
        <Icon className="text-[#59616f] font-sans text-[15px] !mr-[1px] mt-[5px]">
          ⁙
        </Icon>

        <div className="min-w-0 flex-1 grid grid-cols-2 gap-2">
          <input
            value={experience.title}
            onChange={(e) => onUpdate("title", e.target.value)}
            placeholder="Job title"
            className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
          />

          <input
            value={experience.company}
            onChange={(e) => onUpdate("company", e.target.value)}
            placeholder="Company"
            className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
          />

          <input
            value={experience.location}
            onChange={(e) => onUpdate("location", e.target.value)}
            placeholder="Location"
            className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
          />

          <div className="grid grid-cols-2 gap-1">
            <input
              value={experience.startDate}
              onChange={(e) => onUpdate("startDate", e.target.value)}
              placeholder="Start"
              className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
            />

            <input
              value={experience.endDate}
              onChange={(e) => onUpdate("endDate", e.target.value)}
              placeholder="End"
              disabled={experience.current}
              className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0] disabled:bg-[#f3f5f9]"
            />
          </div>

          <label className="flex items-center gap-1 text-[10px] text-[#66728a]">
            <input
              type="checkbox"
              checked={experience.current}
              onChange={(e) => onUpdate("current", e.target.checked)}
            />
            Current position
          </label>
        </div>

        <button
          type="button"
          onClick={onDelete}
          className="text-[#a05252] text-[13px] px-[2px]"
          aria-label="Delete experience"
          title="Delete experience"
        >
          ×
        </button>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[9px] text-[#66728a]">
            ACHIEVEMENTS / RESPONSIBILITIES
          </span>

          <button
            type="button"
            onClick={onAddBullet}
            className="text-brand font-mono text-[9px]"
          >
            + Bullet
          </button>
        </div>

        {experience.bullets.length === 0 && (
          <p className="text-[10px] text-[#8a93a4] bg-[#f7f8fb] rounded px-2 py-2">
            Add achievements or responsibilities for this position.
          </p>
        )}

        {experience.bullets.map((bullet, index) => (
          <div
            className="grid grid-cols-[22px_1fr_22px] gap-[3px] items-center mt-2"
            key={`${experience.id}-bullet-${index}`}
          >
            <b className="text-brand font-mono text-[9px]">
              {String(index + 1).padStart(2, "0")}
            </b>

            <input
              value={bullet}
              onChange={(e) => onUpdateBullet(index, e.target.value)}
              placeholder="Describe an achievement or responsibility..."
              className="bg-[#eef2fa] rounded-[3px] px-[7px] py-[6px] border-none outline-none text-[#334057] text-[10px] w-full"
            />

            <button
              type="button"
              onClick={() => onDeleteBullet(index)}
              className="text-[#a05252] text-[12px]"
              aria-label="Delete bullet"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationEditor({ education, onUpdate, onDelete }) {
  return (
    <div className="bg-white rounded-[5px] px-[10px] pt-[11px] pb-[10px] mt-[10px] border border-[#e0e5ef]">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 grid grid-cols-2 gap-2">
          <input
            value={education.degree}
            onChange={(e) => onUpdate("degree", e.target.value)}
            placeholder="Degree / Qualification"
            className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
          />

          <input
            value={education.school}
            onChange={(e) => onUpdate("school", e.target.value)}
            placeholder="School / University"
            className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
          />

          <input
            value={education.location}
            onChange={(e) => onUpdate("location", e.target.value)}
            placeholder="Location"
            className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
          />

          <div className="grid grid-cols-2 gap-1">
            <input
              value={education.startDate}
              onChange={(e) => onUpdate("startDate", e.target.value)}
              placeholder="Start"
              className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
            />

            <input
              value={education.endDate}
              onChange={(e) => onUpdate("endDate", e.target.value)}
              placeholder="End"
              className="border border-[#dde3f0] rounded-[4px] px-2 py-[6px] text-[11px] outline-none focus:border-[#7578f0]"
            />
          </div>

          <textarea
            value={education.description}
            onChange={(e) => onUpdate("description", e.target.value)}
            placeholder="Description, achievements, coursework..."
            className="col-span-2 border border-[#dde3f0] rounded-[4px] px-2 py-2 text-[11px] outline-none focus:border-[#7578f0] resize-y min-h-[60px]"
          />
        </div>

        <button
          type="button"
          onClick={onDelete}
          className="text-[#a05252] text-[13px]"
          aria-label="Delete education"
        >
          ×
        </button>
      </div>
    </div>
  );
}

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



function CVTemplatePreview({
  template,
  profile,
  experiences,
  education,
  skills,
}) {
  if (template === "classic") {
    return (
      <ClassicTemplate
        profile={profile}
        experiences={experiences}
        education={education}
        skills={skills}
      />
    );
  }

  if (template === "minimal") {
    return (
      <MinimalTemplate
        profile={profile}
        experiences={experiences}
        education={education}
        skills={skills}
      />
    );
  }

  return (
    <ModernTemplate
      profile={profile}
      experiences={experiences}
      education={education}
      skills={skills}
    />
  );
}



function TemplateSelector() {
  const [cvData, setCVData] = useState(() => {
    return normalizeCVData(getCVData());
  });

  const [activeTab, setActiveTab] = useState("Info");
  const [zoom, setZoom] = useState(100);
  const [isSaved, setIsSaved] = useState(true);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(true);

  const {
    profile,
    experiences,
    education,
    skills,
    selectedTemplate,
  } = cvData;

  /*
   * ---------------------------------------------------------
   * STORAGE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    saveCVData(cvData);
    setIsSaved(true);
  }, [cvData]);

  /*
   * ---------------------------------------------------------
   * PROFILE
   * ---------------------------------------------------------
   */

  const updateProfile = (field, value) => {
    setCVData((current) => ({
      ...current,
      profile: {
        ...current.profile,
        [field]: value,
      },
    }));

    setIsSaved(false);
  };

  /*
   * ---------------------------------------------------------
   * EXPERIENCE
   * ---------------------------------------------------------
   */

  const addExperience = () => {
    setCVData((current) => ({
      ...current,
      experiences: [...current.experiences, createExperience()],
    }));

    setIsSaved(false);
  };

  const updateExperience = (experienceId, field, value) => {
    setCVData((current) => ({
      ...current,
      experiences: current.experiences.map((experience) =>
        experience.id === experienceId
          ? {
              ...experience,
              [field]: value,
            }
          : experience
      ),
    }));

    setIsSaved(false);
  };

  const deleteExperience = (experienceId) => {
    setCVData((current) => ({
      ...current,
      experiences: current.experiences.filter(
        (experience) => experience.id !== experienceId
      ),
    }));

    setIsSaved(false);
  };

  const addBullet = (experienceId) => {
    setCVData((current) => ({
      ...current,
      experiences: current.experiences.map((experience) =>
        experience.id === experienceId
          ? {
              ...experience,
              bullets: [...experience.bullets, ""],
            }
          : experience
      ),
    }));

    setIsSaved(false);
  };

  const updateBullet = (experienceId, bulletIndex, value) => {
    setCVData((current) => ({
      ...current,
      experiences: current.experiences.map((experience) =>
        experience.id === experienceId
          ? {
              ...experience,
              bullets: experience.bullets.map((bullet, index) =>
                index === bulletIndex ? value : bullet
              ),
            }
          : experience
      ),
    }));

    setIsSaved(false);
  };

  const deleteBullet = (experienceId, bulletIndex) => {
    setCVData((current) => ({
      ...current,
      experiences: current.experiences.map((experience) =>
        experience.id === experienceId
          ? {
              ...experience,
              bullets: experience.bullets.filter(
                (_, index) => index !== bulletIndex
              ),
            }
          : experience
      ),
    }));

    setIsSaved(false);
  };

  /*
   * ---------------------------------------------------------
   * EDUCATION
   * ---------------------------------------------------------
   */

  const addEducation = () => {
    setCVData((current) => ({
      ...current,
      education: [...current.education, createEducation()],
    }));

    setIsSaved(false);
  };

  const updateEducation = (educationId, field, value) => {
    setCVData((current) => ({
      ...current,
      education: current.education.map((item) =>
        item.id === educationId
          ? {
              ...item,
              [field]: value,
            }
          : item
      ),
    }));

    setIsSaved(false);
  };

  const deleteEducation = (educationId) => {
    setCVData((current) => ({
      ...current,
      education: current.education.filter(
        (item) => item.id !== educationId
      ),
    }));

    setIsSaved(false);
  };

  /*
   * ---------------------------------------------------------
   * SKILLS
   * ---------------------------------------------------------
   */

  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const skill = newSkill.trim();

    if (!skill) {
      return;
    }

    if (
      skills.some(
        (existingSkill) =>
          existingSkill.toLowerCase() === skill.toLowerCase()
      )
    ) {
      setNewSkill("");
      return;
    }

    setCVData((current) => ({
      ...current,
      skills: [...current.skills, skill],
    }));

    setNewSkill("");
    setIsSaved(false);
  };

  const deleteSkill = (skillToDelete) => {
    setCVData((current) => ({
      ...current,
      skills: current.skills.filter((skill) => skill !== skillToDelete),
    }));

    setIsSaved(false);
  };

  /*
   * ---------------------------------------------------------
   * TEMPLATE
   * ---------------------------------------------------------
   */

  const setSelectedTemplate = (template) => {
    setCVData((current) => ({
      ...current,
      selectedTemplate: template,
    }));

    setIsSaved(false);
  };

  /*
   * ---------------------------------------------------------
   * TABS
   * ---------------------------------------------------------
   */

  const tabs = [
    "Info",
    "Summary",
    `Exp (${experiences.length})`,
    `Edu (${education.length})`,
    `Skills (${skills.length})`,
    "More",
  ];

  /*
   * ---------------------------------------------------------
   * PDF FILE NAME
   * ---------------------------------------------------------
   */

  const pdfFileName = useMemo(() => {
    const name = profile.name?.trim() || "Untitled";
    const headline = profile.headline?.trim() || "CV";

    return `${name}_${headline}`
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "");
  }, [profile.name, profile.headline]);

  /*
   * ---------------------------------------------------------
   * EXPERIENCE DATE DISPLAY
   * ---------------------------------------------------------
   */

  const getExperienceDates = (experience) => {
    const start = experience.startDate?.trim();
    const end = experience.current
      ? "Present"
      : experience.endDate?.trim();

    if (!start && !end) {
      return "";
    }

    if (start && end) {
      return `${start} — ${end}`;
    }

    return start || end;
  };

  /*
   * ---------------------------------------------------------
   * EDUCATION DATE DISPLAY
   * ---------------------------------------------------------
   */

  const getEducationDates = (item) => {
    const start = item.startDate?.trim();
    const end = item.endDate?.trim();

    if (!start && !end) {
      return "";
    }

    if (start && end) {
      return `${start} — ${end}`;
    }

    return start || end;
  };

  /*
   * ---------------------------------------------------------
   * WEBSITE
   * ---------------------------------------------------------
   */

  const websiteUrl = profile.website?.trim()
    ? profile.website.startsWith("http")
      ? profile.website
      : `https://${profile.website}`
    : "";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-ink text-[12px] tracking-[0.01em]">
      {/* Top bar */}
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

      {/* Workspace title */}
      <div className="h-[29px] bg-white border-b border-[#edf0f5] grid grid-cols-[445px_1fr] items-center px-5 font-mono text-[10px] max-[1050px]:grid-cols-[390px_1fr] max-[760px]:block max-[760px]:h-auto max-[760px]:py-[7px] max-[760px]:px-3">
        <div className="text-brand font-medium">
          DOCUMENT MASTER{" "}
          <span className="text-[#8a93a2] mx-[5px]">•</span>

          <small className="text-[#3c465d] text-[10px]">
            Draft
          </small>
        </div>

        <div className="text-[#1a2235] font-medium max-[760px]:mt-[5px] max-[430px]:text-[8px]">
          {pdfFileName}.pdf{" "}

          <span className="bg-[#e7eaff] text-[#433ad8] rounded-[10px] px-[7px] py-[3px] ml-[9px]">
            Single Page Fit
          </span>{" "}

          <b className="text-[#4238df] ml-[10px] text-[12px]">
            ●
          </b>{" "}
          Live Synchronized
        </div>
      </div>

      {/* Sub navigation */}
      <div className="h-[47px] bg-white border-b border-[#e2e8f2] flex items-center px-5 gap-[5px] overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            type="button"
            className={`px-[9px] py-[7px] rounded-[5px] text-[11px] flex items-center whitespace-nowrap ${
              activeTab === tab
                ? "bg-[#eff2ff] text-[#2524d2] font-semibold"
                : "text-[#606b81]"
            }`}
            onClick={() => setActiveTab(tab)}
            key={tab}
          >
            <Icon
              className={
                activeTab === tab
                  ? "text-[#2d2de7]"
                  : "text-[#6b7488]"
              }
            >
              {tabIcons[index]}
            </Icon>

            {tab}
          </button>
        ))}
      </div>

      {/* Main */}
      <main
        className="grid grid-cols-[445px_1fr] min-h-[calc(100vh-156px)] max-[1050px]:grid-cols-[390px_1fr] max-[760px]:block"
        id="builder"
      >
        {/* Editor */}
        <aside className="bg-[#f8fafc] p-[19px] pb-[22px] border-r border-[#e0e7f2] overflow-y-auto max-[1050px]:p-[14px] max-[760px]:border-r-0">
          {/* Personal information */}
          <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
            <CardHeading
              icon="♙"
              title="Personal Information"
            />

            <div className="grid grid-cols-2 gap-3 gap-x-[10px] max-[430px]:grid-cols-1">
              <label className="text-[#66728a] font-mono text-[9px]">
                Full Name

                <input
                  value={profile.name}
                  onChange={(e) =>
                    updateProfile("name", e.target.value)
                  }
                  placeholder="Your full name"
                  className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
                />
              </label>

              <label className="text-[#66728a] font-mono text-[9px]">
                Headline

                <input
                  value={profile.headline}
                  onChange={(e) =>
                    updateProfile("headline", e.target.value)
                  }
                  placeholder="e.g. Frontend Developer"
                  className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
                />
              </label>

              <label className="text-[#66728a] font-mono text-[9px]">
                Email

                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    updateProfile("email", e.target.value)
                  }
                  placeholder="you@example.com"
                  className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
                />
              </label>

              <label className="text-[#66728a] font-mono text-[9px]">
                Phone

                <input
                  value={profile.phone}
                  onChange={(e) =>
                    updateProfile("phone", e.target.value)
                  }
                  placeholder="+234..."
                  className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
                />
              </label>

              <label className="text-[#66728a] font-mono text-[9px]">
                Location

                <input
                  value={profile.location}
                  onChange={(e) =>
                    updateProfile("location", e.target.value)
                  }
                  placeholder="City, Country"
                  className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
                />
              </label>

              <label className="text-[#66728a] font-mono text-[9px]">
                Website

                <input
                  value={profile.website}
                  onChange={(e) =>
                    updateProfile("website", e.target.value)
                  }
                  placeholder="yourwebsite.com"
                  className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
                />
              </label>
            </div>
          </section>

          {/* Summary */}
          <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
            <CardHeading
              icon="≡"
              title="Executive Summary"
            />

            <textarea
              value={profile.summary}
              onChange={(e) =>
                updateProfile("summary", e.target.value)
              }
              placeholder="Write a short professional summary..."
              className="block w-full border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] h-[84px] leading-[1.45] resize-y focus:border-[#7578f0]"
            />
          </section>

          {/* Experience */}
          <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
            <div className="flex items-center justify-between">
              <CardHeading
                icon="▣"
                title="Work Experience"
                count={experiences.length}
              />

              <button
                type="button"
                onClick={addExperience}
                className="text-brand font-mono text-[9px]"
              >
                + Record
              </button>
            </div>

            {experiences.length === 0 && (
              <div className="bg-white border border-dashed border-[#d6ddeb] rounded-[5px] p-4 text-center">
                <p className="text-[10px] text-[#7b87a2] m-0">
                  No work experience added yet.
                </p>

                <button
                  type="button"
                  onClick={addExperience}
                  className="mt-2 text-brand text-[10px] font-semibold"
                >
                  + Add your first position
                </button>
              </div>
            )}

            {experiences.map((experience) => (
              <ExperienceEditor
                key={experience.id}
                experience={experience}
                onUpdate={(field, value) =>
                  updateExperience(
                    experience.id,
                    field,
                    value
                  )
                }
                onDelete={() =>
                  deleteExperience(experience.id)
                }
                onAddBullet={() =>
                  addBullet(experience.id)
                }
                onUpdateBullet={(index, value) =>
                  updateBullet(
                    experience.id,
                    index,
                    value
                  )
                }
                onDeleteBullet={(index) =>
                  deleteBullet(
                    experience.id,
                    index
                  )
                }
              />
            ))}

            {experiences.length > 0 && (
              <button
                type="button"
                onClick={addExperience}
                className="mt-[10px] w-full bg-white rounded-[4px] py-[7px] text-[11px] text-[#131c32] border border-[#dfe6f4]"
              >
                ⊕ &nbsp;Add Position
              </button>
            )}
          </section>

          {/* Education */}
          <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
            <div className="flex items-center justify-between">
              <CardHeading
                icon="⌂"
                title="Education"
                count={education.length}
              />

              <button
                type="button"
                onClick={addEducation}
                className="text-brand font-mono text-[9px]"
              >
                + Record
              </button>
            </div>

            {education.length === 0 && (
              <div className="bg-white border border-dashed border-[#d6ddeb] rounded-[5px] p-4 text-center">
                <p className="text-[10px] text-[#7b87a2] m-0">
                  No education added yet.
                </p>

                <button
                  type="button"
                  onClick={addEducation}
                  className="mt-2 text-brand text-[10px] font-semibold"
                >
                  + Add education
                </button>
              </div>
            )}

            {education.map((item) => (
              <EducationEditor
                key={item.id}
                education={item}
                onUpdate={(field, value) =>
                  updateEducation(
                    item.id,
                    field,
                    value
                  )
                }
                onDelete={() =>
                  deleteEducation(item.id)
                }
              />
            ))}
          </section>

          {/* Skills */}
          <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
            <CardHeading
              icon="⌘"
              title="Skills & Technologies"
              count={skills.length}
            />

            <div className="flex gap-[5px] flex-wrap">
              {skills.map((skill) => (
                <span
                  className="inline-flex items-center bg-white border border-[#dfe4ef] pl-2 pr-[6px] py-[5px] rounded-[3px] text-[10px]"
                  key={skill}
                >
                  {skill}

                  <button
                    type="button"
                    onClick={() => deleteSkill(skill)}
                    className="pl-[6px] text-[#a2aabc] text-[12px]"
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 mt-[10px]">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Add a skill"
                className="flex-1 border border-[#dfe4ef] bg-white rounded-[4px] px-2 py-[6px] text-[10px] outline-none focus:border-[#7578f0]"
              />

              <button
                type="button"
                onClick={addSkill}
                className="text-brand px-[9px] py-[5px] text-[11px] bg-white rounded-[4px] border border-[#dfe4ef]"
              >
                ＋ Add
              </button>
            </div>
          </section>

          {/* More */}
          <button
            type="button"
            onClick={addEducation}
            className="w-full bg-panel text-[#1d2943] rounded-[7px] py-[11px] text-[11px] shadow-[inset_0_0_0_1px_#e6eaff]"
          >
            ⊞ &nbsp;Add Section
          </button>
        </aside>

        {/* Preview */}
        <section className="bg-[#f1f5ff] relative px-10 pt-5 pb-[76px] overflow-hidden flex justify-center items-start max-[1050px]:px-5 max-[760px]:min-h-[860px] max-[760px]:px-[10px] max-[760px]:pb-[74px] max-[430px]:min-h-[700px]">
          <div
            className="absolute inset-0 opacity-35 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#b8c4dd 0.7px, transparent 0.7px)",
              backgroundSize: "17px 17px",
            }}
          />

          <article
            className="w-[530px] min-h-[750px] bg-white mt-0 p-12 pb-[75px] shadow-[0_15px_30px_#2d416e20] relative z-1 text-[#152035] transition-transform duration-200 max-[760px]:origin-top-center max-[760px]:scale-72 max-[760px]:mb-[-205px] max-[430px]:scale-57 max-[430px]:mb-[-320px]"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
          >
            {/* Header */}
            <div className="flex justify-between border-b-2 border-ink pb-2 mb-[25px] gap-[15px]">
              <div className="min-w-0">
                <h1 className="font-sans font-bold text-[29px] leading-none tracking-[-0.065em] m-0 mb-[5px] break-words">
                  {profile.name || "Your Name"}
                </h1>

                <h2 className="text-[13px] leading-none font-medium m-0">
                  {profile.headline || "Professional Headline"}
                </h2>
              </div>

              <div className="font-mono text-[8px] leading-[1.7] text-right text-[#39465d] pt-[2px] whitespace-nowrap">
                {profile.location && (
                  <>
                    {profile.location}
                    <br />
                  </>
                )}

                {profile.email && (
                  <>
                    {profile.email}
                    <br />
                  </>
                )}

                {profile.phone && (
                  <>
                    {profile.phone}
                    <br />
                  </>
                )}

                {websiteUrl && (
                  <a
                    className="text-[#2738d9] no-underline"
                    href={websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {profile.website}
                  </a>
                )}
              </div>
            </div>

            {/* Summary */}
            {profile.summary?.trim() && (
              <ResumeSection number="01" title="PROFILE">
                <p className="text-[9px] leading-[1.55] m-0 text-justify">
                  {profile.summary}
                </p>
              </ResumeSection>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
              <ResumeSection number="02" title="EXPERIENCE">
                {experiences.map((experience) => {
                  const dates =
                    getExperienceDates(experience);

                  return (
                    <div
                      className="mb-[13px]"
                      key={experience.id}
                    >
                      <div className="text-[10px] leading-[1.2] mb-[5px]">
                        <strong className="text-[12px]">
                          {experience.title ||
                            "Position"}
                        </strong>

                        {experience.company && (
                          <>
                            {" "}
                            · {experience.company}
                          </>
                        )}

                        {experience.location && (
                          <>
                            {" "}
                            · {experience.location}
                          </>
                        )}

                        {dates && (
                          <small className="float-right font-mono text-[8px] text-[#526079]">
                            {dates}
                          </small>
                        )}
                      </div>

                      {experience.bullets.length > 0 && (
                        <ul className="pl-3 m-0 list-disc marker:text-[#2b2de5]">
                          {experience.bullets
                            .filter((bullet) => bullet.trim())
                            .map((bullet, index) => (
                              <li
                                className="pl-[2px] mb-[4px] text-[8.5px] leading-[1.35]"
                                key={`${experience.id}-${index}`}
                              >
                                {bullet}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </ResumeSection>
            )}

            {/* Education + Skills */}
            {(education.length > 0 || skills.length > 0) && (
              <div className="grid grid-cols-2 gap-[25px] mt-4">
                {education.length > 0 && (
                  <ResumeSection
                    number="03"
                    title="EDUCATION"
                  >
                    {education.map((item) => {
                      const dates =
                        getEducationDates(item);

                      return (
                        <div
                          key={item.id}
                          className="mb-3"
                        >
                          {item.degree && (
                            <strong className="block text-[10px] mb-[3px]">
                              {item.degree}
                            </strong>
                          )}

                          {(item.school || dates) && (
                            <span className="block font-mono text-[8px] text-[#526079] mb-[7px]">
                              {item.school}

                              {item.school && dates
                                ? " · "
                                : ""}

                              {dates}
                            </span>
                          )}

                          {item.description && (
                            <p className="text-[8px] leading-[1.5] m-0">
                              {item.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </ResumeSection>
                )}

                {skills.length > 0 && (
                  <ResumeSection
                    number={
                      education.length > 0
                        ? "04"
                        : "03"
                    }
                    title="CORE COMPETENCIES"
                  >
                    <div className="flex flex-wrap gap-[4px]">
                      {skills.map((skill) => (
                        <span
                          className="bg-[#f0f3f9] font-mono text-[7px] px-[5px] py-1 text-[#4c5870]"
                          key={skill}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </ResumeSection>
                )}
              </div>
            )}

            {/* Empty CV state */}
            {!profile.name &&
              !profile.headline &&
              !profile.summary &&
              experiences.length === 0 &&
              education.length === 0 &&
              skills.length === 0 && (
                <div className="flex items-center justify-center min-h-[350px] text-center">
                  <div>
                    <div className="text-[35px] mb-3 opacity-20">
                      ✦
                    </div>

                    <h3 className="text-[15px] font-semibold m-0">
                      Your CV starts here
                    </h3>

                    <p className="text-[9px] text-[#71809a] mt-2">
                      Start filling in your information on
                      the left.
                    </p>
                  </div>
                </div>
              )}

            {/* Footer */}
            <div className="absolute bottom-[34px] left-12 right-12 flex justify-between font-mono text-[7px] text-[#5d6678] border-t border-[#e1e4ea] pt-2">
              <span>
                CVForge • A4 Resume
              </span>

              <span>
                Page&nbsp; 01 of 01
              </span>
            </div>
          </article>

          {/* Preview controls */}
          <div className="absolute bottom-[19px] z-2 bg-white shadow-[0_5px_19px_#29375d22] rounded-lg px-[10px] py-[7px] flex items-center gap-2 font-mono text-[10px]">
            <button
              type="button"
              className="px-[7px] py-[5px] hover:text-brand"
              onClick={() =>
                setZoom(Math.max(70, zoom - 10))
              }
            >
              −
            </button>

            <span>{zoom}%</span>

            <button
              type="button"
              className="px-[7px] py-[5px] hover:text-brand"
              onClick={() =>
                setZoom(Math.min(120, zoom + 10))
              }
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
              onClick={() =>
                setIsTemplateModalOpen(true)
              }
              className="text-[#3d43da] bg-[#f0f2ff] rounded-md text-left leading-[1.2] px-[7px] py-[5px]"
            >
              ▣ &nbsp; Editorial
              <br />
              {templateOptions.find(
                (template) =>
                  template.id === selectedTemplate
              )?.name || "Modern"}
            </button>

            <i className="h-[19px] w-px bg-[#e2e6ee]" />

            <button
              type="button"
              className="px-[7px] py-[5px] hover:text-brand"
            >
              ▦
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="h-[40px] bg-white flex justify-between items-center px-5 text-[#677289] font-mono text-[9px] border-t border-[#e6ebf2] max-[760px]:h-auto max-[760px]:py-3 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-2">
        <span>
          CVForge © 2026. Editorial Precision CV Engine.
          &nbsp;•&nbsp; Local Storage
        </span>

        <span>
          Privacy Manifesto &nbsp;&nbsp; Shortcuts ⌘K
          &nbsp;&nbsp; Plaintext / JSON Export
        </span>
      </footer>

      {/* Template modal */}
      {isTemplateModalOpen && (
        <TemplateModal
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          onClose={() => setIsTemplateModalOpen(false)}
          onApply={() => setIsTemplateModalOpen(false)}
        />
      )}
    </div>
  );
}

export default TemplateSelector;
