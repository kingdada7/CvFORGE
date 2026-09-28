import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { getCVData, saveCVData } from "../utils/cvStorage";

import PersonalInformationForm from "../components/PersonalInformationForm";
import SummarySection from "../components/SummarySection";
import SkillSection from "../components/SkillSection";
import PreviewWorkspace from "../components/PreviewWorkspace";
import ExperienceEditor from "../components/ExperienceEditor";
import EducationEditor from "../components/EducationEditor";
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

const tabIcons = ["♙", "≡", "▣", "⌂", "⌘", "+"];

function TemplateSelector() {
  const [cvData, setCVData] = useState(() => {
    return normalizeCVData(getCVData());
  });

  const [activeTab, setActiveTab] = useState("Info");
  const [zoom, setZoom] = useState(100);
  const [isSaved, setIsSaved] = useState(true);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

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

  const updateExperiences = (experiences) => {
    setCVData((current) => ({
      ...current,
      experiences,
    }));

    setIsSaved(false);
  };

  /*
   * ---------------------------------------------------------
   * EDUCATION
   * ---------------------------------------------------------
   */

  const updateEducation = (education) => {
    setCVData((current) => ({
      ...current,
      education,
    }));

    setIsSaved(false);
  };

  /*
   * ---------------------------------------------------------
   * SKILLS
   * ---------------------------------------------------------
   */

  const updateSkills = (skills) => {
    setCVData((current) => ({
      ...current,
      skills,
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

  return (
    <div className="min-h-screen bg-[#f8fafc] text-ink text-[12px] tracking-[0.01em]">
      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header className="h-[52px] bg-white border-b border-[#edf0f5] flex items-center px-5 gap-4">
        <Link to="/" className="font-bold text-[15px] tracking-[-0.04em] whitespace-nowrap">
          CVForge{" "}
          <span className="inline-block w-1 h-1 rounded-full bg-brand align-top ml-[3px] mt-[2px]" />
        </Link>

        <div className="h-[18px] w-px bg-[#d8dfeb]" />

        {/* <nav
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
        </nav> */}

        <div className="ml-auto flex items-center gap-[18px] whitespace-nowrap">
          {/* Save status */}

          <button
            type="button"
            className={`text-[11px] flex items-center px-[9px] py-[6px] rounded-[4px] ${
              isSaved
                ? "bg-[#f0f4ff] text-[#485575]"
                : "bg-[#fff4e7] text-[#b76a18]"
            }`}
          >
            <span className="font-sans text-[12px] mr-[7px]">✓</span>

            {isSaved ? "Saved" : "Unsaved"}
          </button>

          {/* Template */}

          <button
            type="button"
            onClick={() => setIsTemplateModalOpen(true)}
            className="text-[11px] flex items-center hidden xl:flex"
          >
            <span className="text-ink font-sans mr-[7px]">◈</span>
            Template
          </button>

          {/* Preview */}

          <button
            type="button"
            onClick={() => setZoom(100)}
            className="text-[11px] flex items-center hidden xl:flex"
          >
            <span className="text-ink font-sans mr-[7px]">▣</span>
            Preview
          </button>

          {/* Download */}

          <Link
            to="/download"
            className="bg-[#090b0f] text-white text-[11px] px-[13px] py-2 rounded-[4px] flex items-center shadow-[0_2px_4px_#0002] max-[760px]:px-2 max-[760px]:text-[0px]"
          >
            <span className="text-white font-sans mr-[7px] max-[760px]:text-[13px] max-[760px]:mr-0">
              ⇩
            </span>
          <span className="text-white">  Download PDF</span>
          </Link>
        </div>
      </header>

      {/*WORKSPACE TITLE*/}

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

      {/*SUB NAVIGATION*/}

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
            <span
              className={`inline-flex w-[17px] justify-center items-center font-serif mr-[7px] ${
                activeTab === tab ? "text-[#2d2de7]" : "text-[#6b7488]"
              }`}
              aria-hidden="true"
            >
              {tabIcons[index]}
            </span>

            {tab}
          </button>
        ))}
      </div>

      {/*MAIN WORKSPACE */}

      <main
        className="grid grid-cols-[445px_1fr] min-h-[calc(100vh-156px)] max-[1050px]:grid-cols-[390px_1fr] max-[760px]:block"
        id="builder"
      >
        {/*EDITOR */}

        <aside className="bg-[#f8fafc] p-[19px] pb-[22px] border-r border-[#e0e7f2] overflow-y-auto max-[1050px]:p-[14px] max-[760px]:border-r-0">
          {/* Personal Information */}

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
        </aside>

        {/* =================================================
            PREVIEW
        ================================================= */}

        <PreviewWorkspace
          cvData={cvData}
          zoom={zoom}
          setZoom={setZoom}
          onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
        />
      </main>

      {/*  FOOTER*/}

      <Footer />

      {/*TEMPLATE MODAL */}

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
