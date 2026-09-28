import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { getCVData, saveCVData } from "../utils/cvStorage";
import SkillSection from "../components/SkillSection";
import PreviewWorkspace from "../components/PreviewWorkspace";
import ExperienceEditor from "../components/ExperienceEditor";
import EducationEditor from "../components/EducationEditor";
import TemplatePreview from "../components/TemplatePreview";
import TemplateModal from "../components/TemplateModel";
import Footer from "../components/Footer";

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
        {/* Editor */}
        <aside className="bg-[#f8fafc] p-[19px] pb-[22px] border-r border-[#e0e7f2] overflow-y-auto max-[1050px]:p-[14px] max-[760px]:border-r-0">
          {/* Personal information */}
          <PersonalInformationForm profile={profile} onUpdate={updateProfile} />

          {/* Summary */}
          <SummarySection
            summary={profile.summary}
            onUpdate={(value) => updateProfile("summary", value)}
          />
          {/* Experience */}

          <ExperienceEditor
            experiences={experiences}
            onUpdate={updateExperiences}
          />
          {/* Education */}
          <EducationEditor education={education} onUpdate={updateEducation} />

          {/* Skills */}
          <SkillSection skills={skills} onUpdate={updateSkills} />

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
        <PreviewWorkspace
          cvData={cvData}
          zoom={zoom}
          setZoom={setZoom}
          onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

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
