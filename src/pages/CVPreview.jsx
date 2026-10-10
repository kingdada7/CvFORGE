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
import ExecutiveTemplate from "../components/ExecutiveTemplate";

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

  let wrapper;

  try {
    setIsDownloading(true);

    // Wait for fonts before capturing the CV.
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    // Use the actual dimensions of the selected paper.
    const isA4 = paper === "a4";

    const pageWidth = isA4 ? 794 : 816;
    const pageHeight = isA4 ? 1123 : 1056;

    // Match the selected margin setting.
    const pageMargin = margins === "balanced" ? 18 : 12;

    // Create an isolated export container.
    wrapper = document.createElement("div");

    Object.assign(wrapper.style, {
      position: "fixed",
      left: "0",
      top: "0",
      width: `${pageWidth}px`,
      backgroundColor: "#ffffff",
      zIndex: "99999",
      pointerEvents: "none",
      opacity: "0",
      overflow: "visible",
    });

    const clone = element.cloneNode(true);

    Object.assign(clone.style, {
      width: `${pageWidth}px`,
      minWidth: `${pageWidth}px`,
      maxWidth: `${pageWidth}px`,
      minHeight: "0",
      height: "auto",
      boxSizing: "border-box",
      margin: "0",
      transform: "none",
      boxShadow: "none",
      border: "none",
      backgroundColor: "#ffffff",
      color: "#0f172a",
      overflow: "visible",
    });

    // Apply margins consistently to the exported document.
    // Remove this padding if your template already includes
    // its own page-margin system.
    clone.style.padding = `${pageMargin}mm`;

    // Avoid carrying preview-only attributes into the export.
    clone.removeAttribute("id");
    clone.id = "cv-document-export";

    // Prevent buttons, form controls, or interactive elements
    // from appearing in the downloaded CV.
    clone.querySelectorAll(
      "button, input, select, textarea"
    ).forEach((node) => node.remove());

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // Wait for the cloned document's images to finish loading.
    const images = Array.from(clone.querySelectorAll("img"));

    await Promise.all(
      images.map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    // Let the browser calculate the final layout.
    await new Promise((resolve) =>
      requestAnimationFrame(() =>
        requestAnimationFrame(resolve)
      )
    );

    const safeName =
      fullName
        .trim()
        .replace(/[^a-z0-9]/gi, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "") || "CV";

    await html2pdf()
      .set({
        filename: `${safeName}_CV.pdf`,

        margin: 0,

        image: {
          type: "jpeg",
          quality: 1,
        },

        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
          logging: false,
          width: pageWidth,
          windowWidth: pageWidth,
          scrollX: 0,
          scrollY: 0,
        },

        jsPDF: {
          unit: "mm",
          format: isA4 ? "a4" : "letter",
          orientation: "portrait",
          compress: true,
        },

        pagebreak: {
          mode: ["css", "legacy"],
          avoid: [
            "h1",
            "h2",
            "h3",
            ".cv-section",
            ".experience-item",
            ".education-item",
          ],
        },
      })
      .from(clone)
      .save();

  } catch (error) {
    console.error("PDF generation failed:", error);
    alert("Unable to generate your CV. Please try again.");

  } finally {
    // Always remove the temporary export container.
    if (wrapper?.parentNode) {
      wrapper.parentNode.removeChild(wrapper);
    }

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
        {/* CV PREVIEW */}
        <div className="w-full min-w-0 flex-1">
          {/* Scrollable preview area */}
          <div className="w-full min-w-0 overflow-x-auto">
            <div
              className="mx-auto"
              style={{
                width: "100%",
                maxWidth: pageWidth,
              }}
            >
              <div
                id="cv-document"
                className="w-full border border-slate-200 bg-white shadow-xl"
                style={{
                  minHeight: pageHeight,
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
                {selectedTemplate === "executive" && (
                  <ExecutiveTemplate
                    profile={profile}
                    experiences={experiences}
                    education={education}
                    skills={skills}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ===================================================
            EXPORT PANEL
        ==================================================== */}

        {/* ===================================================
    EXPORT PANEL — CVFORGE
==================================================== */}
        <div className="w-full min-w-0 print:hidden lg:w-[360px] lg:flex-shrink-0">
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            {/* HEADER */}
            <div className="border-b border-slate-100 px-5 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5146e5]/10">
                      <Download size={19} className="text-[#5146e5]" />
                    </div>

                    <div>
                      <h2 className="text-base font-bold tracking-tight text-slate-900">
                        Export your CV
                      </h2>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Ready when you are.
                      </p>
                    </div>
                  </div>
                </div>

                <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold tracking-wide text-slate-500">
                  CVFORGE
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5">
                <Check size={16} className="shrink-0 text-emerald-600" />
                <p className="text-xs font-medium text-emerald-800">
                  Your CV is ready for export
                </p>
              </div>
            </div>

            {/* FORMAT */}
            <div className="border-b border-slate-100 px-5 py-5">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  File format
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Choose how you want to save your CV.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat("pdf")}
                  aria-pressed={format === "pdf"}
                  className={`relative rounded-xl border p-3 text-left transition-all duration-200 ${
                    format === "pdf"
                      ? "border-[#5146e5] bg-[#5146e5]/[0.045] ring-1 ring-[#5146e5]/20"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        format === "pdf"
                          ? "bg-[#5146e5]/10 text-[#5146e5]"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <FileText size={19} />
                    </div>

                    {format === "pdf" && (
                      <Check size={15} className="text-[#5146e5]" />
                    )}
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    PDF document
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                    For applications and printing
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat("text")}
                  aria-pressed={format === "text"}
                  className={`relative rounded-xl border p-3 text-left transition-all duration-200 ${
                    format === "text"
                      ? "border-[#5146e5] bg-[#5146e5]/[0.045] ring-1 ring-[#5146e5]/20"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        format === "text"
                          ? "bg-[#5146e5]/10 text-[#5146e5]"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Copy size={18} />
                    </div>

                    {format === "text" && (
                      <Check size={15} className="text-[#5146e5]" />
                    )}
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    Plain text
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                    Easy to copy into applications
                  </p>
                </button>
              </div>
            </div>

            {/* PAGE SETTINGS */}
            <div className="space-y-5 border-b border-slate-100 px-5 py-5">
              {/* PAPER SIZE */}
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-900">
                    Paper size
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Document layout
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "a4", label: "A4", detail: "210 × 297 mm" },
                    { value: "us", label: "US Letter", detail: "8.5 × 11 in" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPaper(option.value)}
                      aria-pressed={paper === option.value}
                      className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-3 text-left transition-colors ${
                        paper === option.value
                          ? "border-[#5146e5] bg-[#5146e5]/[0.04]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          {option.label}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-500">
                          {option.detail}
                        </p>
                      </div>

                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          paper === option.value
                            ? "border-[#5146e5]"
                            : "border-slate-300"
                        }`}
                      >
                        {paper === option.value && (
                          <span className="h-2 w-2 rounded-full bg-[#5146e5]" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* MARGINS */}
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-900">
                    Page margins
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {margins === "balanced" ? "18 mm" : "12 mm"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      value: "balanced",
                      label: "Balanced",
                      detail: "18 mm · More breathing room",
                    },
                    {
                      value: "compact",
                      label: "Compact",
                      detail: "12 mm · More content",
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setMargins(option.value)}
                      aria-pressed={margins === option.value}
                      className={`rounded-lg border px-3 py-3 text-left transition-colors ${
                        margins === option.value
                          ? "border-[#5146e5] bg-[#5146e5]/[0.04]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-800">
                          {option.label}
                        </span>

                        {margins === option.value && (
                          <Check
                            size={14}
                            className="shrink-0 text-[#5146e5]"
                          />
                        )}
                      </div>

                      <p className="mt-1.5 text-[10px] leading-relaxed text-slate-500">
                        {option.detail}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* EXPORT ACTIONS */}
            <div className="space-y-3 px-5 py-5">
              {format === "pdf" ? (
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5146e5] px-4 py-3.5 text-sm font-semibold text-white shadow-sm shadow-[#5146e5]/20 transition-all hover:bg-[#4338ca] active:scale-[0.99]"
                >
                  <Download size={17} />
                  Download PDF
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCopyATS}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5146e5] px-4 py-3.5 text-sm font-semibold text-white shadow-sm shadow-[#5146e5]/20 transition-all hover:bg-[#4338ca] active:scale-[0.99]"
                >
                  {copied ? <Check size={17} /> : <Copy size={17} />}
                  {copied ? "Copied successfully" : "Copy ATS text"}
                </button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyATS}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <Copy size={15} />
                  Copy text
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <Printer size={15} />
                  Print CV
                </button>
              </div>

              {/* PRIVACY NOTE */}
              <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3">
                <ShieldCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-slate-500"
                />

                <p className="text-[11px] leading-relaxed text-slate-500">
                  <span className="font-semibold text-slate-700">
                    Your privacy matters.
                  </span>{" "}
                  Your CV stays in your browser while you build and export it.
                </p>
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
