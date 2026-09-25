import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getCVData, saveCVData } from "../utils/cvStorage";
import ClassicTemplate from "../components/ClassicTemplate";
import MinimalTemplate from "../components/MinimalTemplate";
import ModernTemplate from "../components/ModernTemplate";


const TemplateSelector = () => {
  const [cvData, setCVData] = useState(() => {
    const savedData = getCVData();

    return {
      profile: savedData?.profile || {},
      experiences: savedData?.experiences || [],
      education: savedData?.education || [],
      skills: savedData?.skills || [],
      selectedTemplate: savedData?.selectedTemplate || "modern",
    };
  });

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [isSaved, setIsSaved] = useState(true);

  const selectedTemplate = cvData.selectedTemplate;

  // Save CV data whenever something changes
  useEffect(() => {
    saveCVData(cvData);
    setIsSaved(true);
  }, [cvData]);

  // Change selected template
  const handleTemplateChange = (templateId) => {
    setCVData((current) => ({
      ...current,
      selectedTemplate: templateId,
    }));

    setIsSaved(false);
  };

  // Render selected template
  const renderTemplate = () => {
    const templateProps = {
      profile: cvData.profile,
      experiences: cvData.experiences,
      education: cvData.education,
      skills: cvData.skills,
    };

    switch (selectedTemplate) {
      case "classic":
        return <ClassicTemplate {...templateProps} />;

      case "minimal":
        return <MinimalTemplate {...templateProps} />;

      case "modern":
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  const templateName = {
    modern: "Modern",
    classic: "Classic",
    minimal: "Minimal",
  };

  return (
    <div className="min-h-screen bg-panel text-ink">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-xl font-bold">Choose a Template</h1>

          <p className="text-sm text-gray-500">
            Select a template for your CV
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {isSaved ? "Saved" : "Saving..."}
          </span>

          <Link
            to="/builder"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Back to Builder
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex min-h-[calc(100vh-80px)] flex-col items-center px-6 py-8">
        {/* Template controls */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => setZoom((value) => Math.max(value - 10, 50))}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            −
          </button>

          <span className="min-w-[60px] text-center text-sm font-medium">
            {zoom}%
          </span>

          <button
            onClick={() => setZoom((value) => Math.min(value + 10, 150))}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            +
          </button>

          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="ml-4 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white"
          >
            Change Template
          </button>
        </div>

        {/* CV Preview */}
        <div
          className="w-[530px] min-h-[750px] bg-white shadow-xl"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
            marginBottom: `${(zoom - 100) * 2}px`,
          }}
        >
          {renderTemplate()}
        </div>

        {/* Selected template */}
        <div className="mt-6 text-center">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Selected Template
          </p>

          <p className="mt-1 text-sm font-semibold">
            {templateName[selectedTemplate] || "Modern"}
          </p>
        </div>
      </main>

      {/* Template Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Choose your template</h2>

                <p className="mt-1 text-sm text-gray-500">
                  Select a design for your CV.
                </p>
              </div>

              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Template options */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Modern */}
              <button
                onClick={() => handleTemplateChange("modern")}
                className={`rounded-xl border-2 p-3 text-left transition ${
                  selectedTemplate === "modern"
                    ? "border-brand"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="mb-3 h-64 overflow-hidden rounded-lg bg-gray-100">
                  <ModernTemplate
                    profile={cvData.profile}
                    experiences={cvData.experiences}
                    education={cvData.education}
                    skills={cvData.skills}
                  />
                </div>

                <h3 className="font-semibold">Modern</h3>

                <p className="mt-1 text-sm text-gray-500">
                  Clean and professional
                </p>

                {selectedTemplate === "modern" && (
                  <span className="mt-3 inline-block text-sm font-medium text-brand">
                    ✓ Selected
                  </span>
                )}
              </button>

              {/* Classic */}
              <button
                onClick={() => handleTemplateChange("classic")}
                className={`rounded-xl border-2 p-3 text-left transition ${
                  selectedTemplate === "classic"
                    ? "border-brand"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="mb-3 h-64 overflow-hidden rounded-lg bg-gray-100">
                  <ClassicTemplate
                    profile={cvData.profile}
                    experiences={cvData.experiences}
                    education={cvData.education}
                    skills={cvData.skills}
                  />
                </div>

                <h3 className="font-semibold">Classic</h3>

                <p className="mt-1 text-sm text-gray-500">
                  Traditional and formal
                </p>

                {selectedTemplate === "classic" && (
                  <span className="mt-3 inline-block text-sm font-medium text-brand">
                    ✓ Selected
                  </span>
                )}
              </button>

              {/* Minimal */}
              <button
                onClick={() => handleTemplateChange("minimal")}
                className={`rounded-xl border-2 p-3 text-left transition ${
                  selectedTemplate === "minimal"
                    ? "border-brand"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="mb-3 h-64 overflow-hidden rounded-lg bg-gray-100">
                  <MinimalTemplate
                    profile={cvData.profile}
                    experiences={cvData.experiences}
                    education={cvData.education}
                    skills={cvData.skills}
                  />
                </div>

                <h3 className="font-semibold">Minimal</h3>

                <p className="mt-1 text-sm text-gray-500">
                  Simple and elegant
                </p>

                {selectedTemplate === "minimal" && (
                  <span className="mt-3 inline-block text-sm font-medium text-brand">
                    ✓ Selected
                  </span>
                )}
              </button>
            </div>

            {/* Apply */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="rounded-lg bg-brand px-6 py-3 font-medium text-white"
              >
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;