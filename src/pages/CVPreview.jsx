import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import html2pdf from "html2pdf.js";
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  FileText,
  Minus,
  Plus,
  Printer,
  ShieldCheck,
} from "lucide-react";

import ModernTemplate from "../components/ModernTemplate";
import ClassicTemplate from "../components/ClassicTemplate";
import MinimalTemplate from "../components/MinimalTemplate";

// Change this import path if your utility lives somewhere else.
import { getCVData } from "../utils/cvStorage";

export default function CVPreview() {
  const navigate = useNavigate();

  const [format, setFormat] = useState("pdf");
  const [paper, setPaper] = useState("a4");
  const [margins, setMargins] = useState("balanced");
  const [zoom, setZoom] = useState(100);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const cvData = useMemo(() => {
    return getCVData() || {};
  }, []);

  const profile = cvData.profile || {};
  const experiences = Array.isArray(cvData.experiences)
    ? cvData.experiences
    : [];
  const education = Array.isArray(cvData.education) ? cvData.education : [];
  const skills = Array.isArray(cvData.skills) ? cvData.skills : [];

  const selectedTemplate = cvData.selectedTemplate || "modern";

  const fullName = profile.name || "Your Name";

  const jobTitle = profile.headline || "Professional Title";

  const summary =
    profile.summary ||
    "Add a professional summary to introduce your experience, skills, and career goals.";

  const email = profile.email || "email@example.com";
  const phone = profile.phone || "+234 000 000 0000";
  const location = profile.location || "Lagos, Nigeria";
  const website = profile.website || profile.linkedin || "";

  /*
   * Converts the CV data into plain text.
   * This is useful for ATS text copying and can also be
   * reused later for a .txt export.
   */
  const getATSText = () => {
    const lines = [];

    lines.push(fullName);
    lines.push(jobTitle);
    lines.push("");
    lines.push(`${location} | ${email} | ${phone}`);

    if (website) {
      lines.push(website);
    }

    lines.push("");
    lines.push("PROFESSIONAL SUMMARY");
    lines.push(summary);

    if (experiences.length > 0) {
      lines.push("");
      lines.push("EXPERIENCE");

      experiences.forEach((job) => {
        lines.push(
          `${job.position || job.title || "Position"} — ${
            job.company || "Company"
          }`,
        );

        if (job.startDate || job.endDate) {
          lines.push(`${job.startDate || ""} — ${job.endDate || "Present"}`);
        }

        if (job.description) {
          lines.push(job.description);
        }

        if (Array.isArray(job.bullets)) {
          job.bullets.forEach((bullet) => {
            if (bullet.trim()) {
              lines.push(`• ${bullet}`);
            }
          });
        }
      });
    }

    if (skills.length > 0) {
      lines.push("");
      lines.push("SKILLS");

      const skillNames = skills.map((skill) => {
        if (typeof skill === "string") return skill;
        return skill.name || skill.title || "";
      });

      lines.push(skillNames.filter(Boolean).join(", "));
    }

    if (education.length > 0) {
      lines.push("");
      lines.push("EDUCATION");

      education.forEach((school) => {
        lines.push(
          `${school.degree || school.program || "Degree"} — ${
            school.school || school.institution || "Institution"
          }`,
        );

        if (school.startDate || school.endDate) {
          lines.push(`${school.startDate || ""} — ${school.endDate || ""}`);
        }
      });
    }

    return lines.join("\n");
  };

  const handleCopyATS = async () => {
    try {
      await navigator.clipboard.writeText(getATSText());

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy ATS text:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("cv-document");

    if (!element) {
      alert("CV document was not found.");
      return;
    }

    try {
      setIsDownloading(true);

      // Create a temporary wrapper
      const wrapper = document.createElement("div");

      wrapper.style.position = "fixed";
      wrapper.style.left = "0";
      wrapper.style.top = "0";
      wrapper.style.width = "794px";
      wrapper.style.background = "#ffffff";
      wrapper.style.zIndex = "-9999";
      wrapper.style.pointerEvents = "none";

      // Clone the CV
      const clone = element.cloneNode(true);

      clone.style.width = "794px";
      clone.style.minHeight = "1123px";
      clone.style.height = "auto";
      clone.style.padding = element.style.padding;
      clone.style.margin = "0";
      clone.style.backgroundColor = "#ffffff";
      clone.style.color = "#0f172a";
      clone.style.border = "none";
      clone.style.boxShadow = "none";
      clone.style.transform = "none";

      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // Give the browser a moment to render the clone
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Replace unsupported OKLCH colors
      const allElements = clone.querySelectorAll("*");

      allElements.forEach((el) => {
        const styles = window.getComputedStyle(el);

        if (styles.color.includes("oklch")) {
          el.style.color = "#0f172a";
        }

        if (styles.backgroundColor.includes("oklch")) {
          el.style.backgroundColor = "#ffffff";
        }

        if (styles.borderColor.includes("oklch")) {
          el.style.borderColor = "#e2e8f0";
        }

        if (styles.boxShadow.includes("oklch")) {
          el.style.boxShadow = "none";
        }
      });

      const safeName =
        fullName
          .replace(/[^a-z0-9]/gi, "_")
          .replace(/_+/g, "_")
          .replace(/^_|_$/g, "") || "CV";

      await html2pdf()
        .set({
          margin: 0,

          filename: `${safeName}_CV.pdf`,

          image: {
            type: "jpeg",
            quality: 0.98,
          },

          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false,

            // Important for the cloned element
            width: 794,
            windowWidth: 794,
          },

          jsPDF: {
            unit: "mm",
            format: paper === "a4" ? "a4" : "letter",
            orientation: "portrait",
          },

          pagebreak: {
            mode: ["css", "legacy"],
          },
        })
        .from(clone)
        .save();

      // Clean up
      document.body.removeChild(wrapper);

      console.log("PDF DOWNLOAD SUCCESS");
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDF generation failed. Check the console.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleZoomIn = () => {
    setZoom((current) => Math.min(current + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom((current) => Math.max(current - 10, 50));
  };

  const pageWidth = paper === "a4" ? "210mm" : "8.5in";
  const pageHeight = paper === "a4" ? "297mm" : "11in";

  const pagePadding = margins === "balanced" ? "18mm" : "12mm";

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans text-slate-800">
      {/* =====================================================
          TOP BAR
      ====================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 py-3 text-sm print:hidden sm:px-5">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <Link
            to="/template"
            className="flex shrink-0 items-center gap-1.5 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            <span>Back to Builder</span>
          </Link>

          <div className="flex min-w-0 items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1">
            <FileText size={15} className="shrink-0 text-blue-600" />
            <span className="max-w-[150px] truncate font-medium sm:max-w-none">
              {fullName.replace(/\s+/g, "_")}_CV.pdf
            </span>
            <span className="shrink-0 text-xs text-slate-500">Ready</span>
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto sm:justify-end">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            CV Ready
          </div>

          <div className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 50}
              aria-label="Zoom out"
              className="rounded px-1.5 hover:bg-slate-200 disabled:opacity-40"
            >
              <Minus size={14} />
            </button>

            <span className="w-10 text-center text-xs">{zoom}%</span>

            <button
              onClick={handleZoomIn}
              disabled={zoom >= 150}
              aria-label="Zoom in"
              className="rounded px-1.5 hover:bg-slate-200 disabled:opacity-40"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="mx-auto flex w-full max-w-[1600px] min-w-0 flex-col gap-5 p-3 sm:gap-6 sm:p-5 lg:flex-row lg:p-6">
        {/* ===================================================
            CV PREVIEW
        ==================================================== */}
        {/* CV PREVIEW */}
        <div className="min-w-0 w-full flex-1 overflow-x-auto">
          <div
            className="mx-auto origin-top transition-transform"
            style={{
              width: `min(100%, ${pageWidth})`,
              transform: `scale(${zoom / 100})`,
              marginBottom: `${(zoom - 100) * 2}px`,
            }}
          >
            <div
              id="cv-document"
              className="w-full border border-slate-200 bg-white shadow-xl"
              style={{
                minHeight: pageHeight,
                padding: pagePadding,
                boxSizing: "border-box",
              }}
            >
              {selectedTemplate === "modern" && (
                <ModernTemplate
                  profile={profile}
                  experiences={experiences}
                  education={education}
                  skills={skills}
                />
              )}

              {selectedTemplate === "classic" && (
                <ClassicTemplate
                  profile={profile}
                  experiences={experiences}
                  education={education}
                  skills={skills}
                />
              )}

              {selectedTemplate === "minimal" && (
                <MinimalTemplate
                  profile={profile}
                  experiences={experiences}
                  education={education}
                  skills={skills}
                />
              )}
            </div>
          </div>
        </div>

        {/* ===================================================
            EXPORT PANEL
        ==================================================== */}
        <div className="w-full min-w-0 print:hidden lg:w-[380px] lg:flex-shrink-0">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
            {/* Header */}
            <div className="px-5 pt-5 pb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Download size={19} className="text-blue-600" />

                  <h2 className="text-lg font-semibold text-slate-900">
                    Export Your CV
                  </h2>
                </div>

                <p className="text-[13px] text-slate-500 mt-1">
                  Choose your document format and page settings.
                </p>
              </div>

              <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                CVForge
              </span>
            </div>

            {/* Status */}
            <div className="mx-5 mb-5 bg-blue-50 border border-blue-100 rounded-lg p-3">
              <div className="flex items-center justify-between text-[13px] mb-1.5">
                <div className="flex items-center gap-1.5 text-blue-700 font-medium">
                  <Check size={15} className="text-emerald-500" />
                  CV Ready
                </div>

                <span className="font-semibold text-blue-800">100%</span>
              </div>

              <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full w-full bg-blue-600 rounded-full" />
              </div>

              <p className="text-[11px] text-blue-700/80 mt-2 leading-snug">
                Your CV is ready to export. You can download, print, or copy the
                ATS-friendly text.
              </p>
            </div>

            {/* DOCUMENT FORMAT */}
            <div className="px-5 mb-5">
              <h3 className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase mb-2.5">
                Document Format
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                <FormatButton
                  active={format === "pdf"}
                  onClick={() => setFormat("pdf")}
                  title="PDF Document"
                  description="Print-ready PDF document."
                  icon={<FileText size={15} />}
                />

                <FormatButton
                  active={format === "text"}
                  onClick={() => setFormat("text")}
                  title="Plain Text"
                  description="ATS-friendly text format."
                  icon={<FileText size={15} />}
                />
              </div>
            </div>

            {/* PAPER */}
            <div className="px-5 mb-5">
              <div className="flex justify-between items-center mb-2.5">
                <h3 className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  Paper Dimension
                </h3>

                <span className="text-[10px] text-slate-400">Standard</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPaper("a4")}
                  className={`py-2.5 text-center text-[13px] font-medium rounded-md border transition-all ${
                    paper === "a4"
                      ? "border-blue-500 bg-blue-50 text-blue-800"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  A4
                  <span className="block text-[10px] font-normal mt-0.5">
                    210 × 297 mm
                  </span>
                </button>

                <button
                  onClick={() => setPaper("us")}
                  className={`py-2.5 text-center text-[13px] font-medium rounded-md border transition-all ${
                    paper === "us"
                      ? "border-blue-500 bg-blue-50 text-blue-800"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  US Letter
                  <span className="block text-[10px] font-normal mt-0.5">
                    8.5 × 11"
                  </span>
                </button>
              </div>
            </div>

            {/* MARGINS */}
            <div className="px-5 mb-6">
              <div className="flex justify-between items-center mb-2.5">
                <h3 className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  Page Margins
                </h3>

                <span className="text-[10px] text-slate-400">
                  {margins === "balanced" ? "18mm" : "12mm"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMargins("balanced")}
                  className={`py-2.5 text-center text-[13px] font-medium rounded-md border transition-all ${
                    margins === "balanced"
                      ? "border-blue-500 bg-blue-50 text-blue-800"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Balanced
                  <span className="block text-[10px] font-normal mt-0.5">
                    18mm
                  </span>
                </button>

                <button
                  onClick={() => setMargins("compact")}
                  className={`py-2.5 text-center text-[13px] font-medium rounded-md border transition-all ${
                    margins === "compact"
                      ? "border-blue-500 bg-blue-50 text-blue-800"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Compact
                  <span className="block text-[10px] font-normal mt-0.5">
                    12mm
                  </span>
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="px-5 pb-5 space-y-2.5">
              {format === "pdf" ? (
                <button
                  onClick={handleDownloadPDF}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Download size={17} />
                  Download PDF
                </button>
              ) : (
                <button
                  onClick={handleCopyATS}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={17} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={17} />
                      Copy ATS Text
                    </>
                  )}
                </button>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleCopyATS}
                  className="py-2.5 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5"
                >
                  <Copy size={15} />
                  Copy ATS Text
                </button>

                <button
                  onClick={handlePrint}
                  className="py-2.5 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5"
                >
                  <Printer size={15} />
                  Print
                </button>
              </div>
            </div>

            {/* PRIVACY */}
            <div className="mx-5 mb-5 bg-slate-50 border border-slate-200 rounded-lg p-3 flex gap-2.5">
              <ShieldCheck
                size={17}
                className="text-slate-400 mt-0.5 flex-shrink-0"
              />

              <div className="text-[11px] text-slate-600 leading-snug">
                <span className="font-medium text-slate-800">
                  Client-Side CV Builder
                </span>
                <br />
                Your CV data is processed in the browser while you build and
                export your document.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PRINT STYLES
      ====================================================== */}
      <style>{`
        @media print {
          @page {
            size: ${paper === "a4" ? "A4" : "Letter"};
            margin: 0;
          }

          body {
            background: white !important;
          }

          #cv-document {
            width: ${pageWidth} !important;
            min-height: ${pageHeight} !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   SECTION TITLE
============================================================ */

function SectionTitle({ title }) {
  return (
    <h2 className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-200 pb-1 mb-3">
      {title}
    </h2>
  );
}

/* ============================================================
   FORMAT BUTTON
============================================================ */

function FormatButton({ active, onClick, title, description, icon }) {
  return (
    <button
      onClick={onClick}
      className={`relative text-left p-3 rounded-lg border transition-all ${
        active
          ? "border-blue-500 bg-blue-50/50 shadow-sm"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-[13px] flex items-center gap-1.5">
          {icon}
          {title}
        </span>

        <span
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            active ? "border-blue-600" : "border-slate-300"
          }`}
        >
          {active && <span className="w-2 h-2 rounded-full bg-blue-600" />}
        </span>
      </div>

      <p className="text-[11px] text-slate-600 leading-tight">{description}</p>
    </button>
  );
}
