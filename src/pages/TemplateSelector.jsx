import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { getCVData, saveCVData } from "../utils/cvStorage";
import ClassicTemplate from "../components/ClassicTemplate";
import MinimalTemplate from "../components/MinimalTemplate";
import ModernTemplate from "../components/ModernTemplate";

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

    education: Array.isArray(savedData.education) ? savedData.education : [],

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

function TemplateSelector() {
  const [cvData, setCVData] = useState(() => {
    return normalizeCVData(getCVData());
  });

  const [activeTab, setActiveTab] = useState("Info");
  const [zoom, setZoom] = useState(100);
  const [isSaved, setIsSaved] = useState(true);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(true);

  const { profile, experiences, education, skills, selectedTemplate } = cvData;

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
          : experience,
      ),
    }));

    setIsSaved(false);
  };

  const deleteExperience = (experienceId) => {
    setCVData((current) => ({
      ...current,
      experiences: current.experiences.filter(
        (experience) => experience.id !== experienceId,
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
          : experience,
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
                index === bulletIndex ? value : bullet,
              ),
            }
          : experience,
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
                (_, index) => index !== bulletIndex,
              ),
            }
          : experience,
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
          : item,
      ),
    }));

    setIsSaved(false);
  };

  const deleteEducation = (educationId) => {
    setCVData((current) => ({
      ...current,
      education: current.education.filter((item) => item.id !== educationId),
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
        (existingSkill) => existingSkill.toLowerCase() === skill.toLowerCase(),
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
    const end = experience.current ? "Present" : experience.endDate?.trim();

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
          DOCUMENT MASTER <span className="text-[#8a93a2] mx-[5px]">•</span>
          <small className="text-[#3c465d] text-[10px]">Draft</small>
        </div>

        <div className="text-[#1a2235] font-medium max-[760px]:mt-[5px] max-[430px]:text-[8px]">
          {pdfFileName}.pdf{" "}
          <span className="bg-[#e7eaff] text-[#433ad8] rounded-[10px] px-[7px] py-[3px] ml-[9px]">
            Single Page Fit
          </span>{" "}
          <b className="text-[#4238df] ml-[10px] text-[12px]">●</b> Live
          Synchronized
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
                activeTab === tab ? "text-[#2d2de7]" : "text-[#6b7488]"
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
            className="w-[530px] min-h-[750px] ..."
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
                getExperienceDates={getExperienceDates}
                getEducationDates={getEducationDates}
                websiteUrl={websiteUrl}
              />
            )}

            {selectedTemplate === "classic" && (
              <ClassicTemplate
                profile={profile}
                experiences={experiences}
                education={education}
                skills={skills}
                getExperienceDates={getExperienceDates}
                getEducationDates={getEducationDates}
                websiteUrl={websiteUrl}
              />
            )}

            {selectedTemplate === "minimal" && (
              <MinimalTemplate
                profile={profile}
                experiences={experiences}
                education={education}
                skills={skills}
                getExperienceDates={getExperienceDates}
                getEducationDates={getEducationDates}
                websiteUrl={websiteUrl}
              />
            )}
          </article>

          {/* Preview controls */}
          <div className="absolute bottom-[19px] z-2 bg-white shadow-[0_5px_19px_#29375d22] rounded-lg px-[10px] py-[7px] flex items-center gap-2 font-mono text-[10px]">
            <button
              type="button"
              className="px-[7px] py-[5px] hover:text-brand"
              onClick={() => setZoom(Math.max(70, zoom - 10))}
            >
              −
            </button>

            <span>{zoom}%</span>

            <button
              type="button"
              className="px-[7px] py-[5px] hover:text-brand"
              onClick={() => setZoom(Math.min(120, zoom + 10))}
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
              onClick={() => setIsTemplateModalOpen(true)}
              className="text-[#3d43da] bg-[#f0f2ff] rounded-md text-left leading-[1.2] px-[7px] py-[5px]"
            >
              ▣ &nbsp; Editorial
              <br />
              {templateOptions.find(
                (template) => template.id === selectedTemplate,
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
          CVForge © 2026. Editorial Precision CV Engine. &nbsp;•&nbsp; Local
          Storage
        </span>

        <span>
          Privacy Manifesto &nbsp;&nbsp; Shortcuts ⌘K &nbsp;&nbsp; Plaintext /
          JSON Export
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
