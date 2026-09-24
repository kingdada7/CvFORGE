import React, { useState } from "react";
import {
  ArrowLeft,
  FileText,
  BadgeCheck,
  CheckCircle2,
  Circle,
  Download,
  Copy,
  Printer,
  ShieldCheck,
  Sparkles,
  Minus,
  Plus,
  LockKeyhole,
} from "lucide-react";

const profile = {
  name: "Elena Rostova",
  title: "Staff Product Designer & Design Systems Architect",
  location: "Zurich, Switzerland",
  email: "elena.rostova@engineer.ch",
  phone: "+41 44 829 1042",
  website: "github.com/rostova",
  summary:
    "Pioneering systems-driven workflows, multi-platform design architectures, and low-latency interaction models across high-growth enterprise infrastructure.",
};

const experiences = [
  {
    title: "Staff Design Systems Lead",
    company: "Syntropy Cloud AG",
    dates: "2022 — Present",
    bullets: [
      "Engineered unified design tokens and multi-framework distribution pipelines powering 42 micro-frontends with zero regression velocity.",
      "Reduced runtime bundle overhead by 34% by establishing native web component primitives and automated headless design telemetry.",
      "Architected cross-functional sync workflows with 200+ product engineers, reducing time-to-production for net-new patterns by 60%.",
    ],
  },
  {
    title: "Senior Interaction Designer",
    company: "Kinetix Precision Software",
    dates: "2019 — 2022",
    bullets: [
      "Led core interaction models for high-frequency financial modeling interfaces operating under strict sub-16ms render budgets.",
      "Constructed accessibility test harnesses resulting in 100% WCAG 2.1 AAA compliance rating across all client-facing data dashboards.",
    ],
  },
  {
    title: "Product Interface Specialist",
    company: "VectorLab Studio",
    dates: "2018 — 2019",
    bullets: [
      "Designed desktop-first CAD navigation palettes and bespoke vector visualization widgets for architectural engineering software.",
    ],
  },
];

const skills = [
  {
    title: "Architecture & Tokens",
    text: "Design Tokens (W3C), Tailwind CSS, Figma Variables, Web Components, Stencil",
  },
  {
    title: "Frontend Prototyping",
    text: "TypeScript, React, Canvas 2D, SVG DOM, Performance Profiling, Headless UI",
  },
  {
    title: "Operational Methods",
    text: "Semantic Versioning, Micro-Interactions, WCAG 2.2 AAA Audit, ATS Typography",
  },
];

function CVPreview() {
  return (
    <div className="relative flex justify-center">
      <div
        className="
          relative
          w-[794px]
          min-h-[1123px]
          bg-white
          px-[58px]
          pt-[64px]
          pb-[58px]
          shadow-[0_12px_35px_rgba(31,45,75,0.10)]
          text-[#161a22]
          font-sans
        "
      >
        {/* CV Header */}
        <header className="border-b-2 border-[#111827] pb-4 mb-7">
          <div className="flex justify-between gap-8">
            <div>
              <h1 className="text-[34px] leading-none font-bold tracking-[-0.055em]">
                {profile.name}
                <span className="text-[#3f3cff]">•</span>
              </h1>

              <h2 className="mt-3 text-[17px] leading-none font-medium text-[#3936ee] tracking-[0.01em]">
                {profile.title}
              </h2>

              <p className="mt-5 max-w-[540px] text-[12px] leading-[1.55] text-[#3d414b]">
                {profile.summary}
              </p>
            </div>

            <div className="text-right text-[10px] leading-[1.65] text-[#454b58] whitespace-nowrap">
              <strong className="text-[#252a34]">
                {profile.location}
              </strong>

              <br />

              {profile.email}

              <br />

              {profile.phone}

              <br />

              <span className="text-[#3835ee]">
                {profile.website}
              </span>
            </div>
          </div>
        </header>

        {/* Experience */}
        <CVSection title="PROFESSIONAL TRAJECTORY">
          <div className="flex justify-end -mt-5 mb-4">
            <span className="font-serif text-[10px] text-[#555b65]">
              2018 — Present
            </span>
          </div>

          {experiences.map((experience) => (
            <div key={experience.title} className="mb-5">
              <div className="flex justify-between items-baseline gap-5">
                <div>
                  <span className="font-bold text-[15px]">
                    {experience.title}
                  </span>

                  <span className="text-[12px] text-[#4e535d]">
                    {" "}
                    · {experience.company}
                  </span>
                </div>

                <span className="font-serif text-[10px] text-[#555b65] whitespace-nowrap">
                  {experience.dates}
                </span>
              </div>

              <ul className="mt-2 space-y-1.5 pl-4 list-disc marker:text-black">
                {experience.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-[10.5px] leading-[1.55] text-[#383d47] pl-1"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CVSection>

        {/* Skills */}
        <CVSection title="SYSTEMS & TECHNICAL CAPABILITIES">
          <div className="grid grid-cols-3 gap-3">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="bg-[#edf2fc] px-3 py-3 min-h-[90px]"
              >
                <h4 className="text-[10px] font-bold mb-2">
                  {skill.title}
                </h4>

                <p className="text-[9.5px] leading-[1.55] text-[#3e4550]">
                  {skill.text}
                </p>
              </div>
            ))}
          </div>
        </CVSection>

        {/* Education */}
        <CVSection title="ACADEMIC BACKGROUND & HONORS">
          <div className="flex justify-between">
            <div>
              <h3 className="text-[16px] font-bold">
                M.Sc. Human-Computer Interaction & Cognitive Systems
              </h3>

              <p className="mt-1 text-[11px] text-[#4c525d]">
                ETH Zurich · Summa Cum Laude
              </p>
            </div>

            <span className="font-serif text-[10px] text-[#555b65]">
              2016 — 2018
            </span>
          </div>
        </CVSection>

        {/* Footer */}
        <div className="absolute bottom-[38px] left-[58px] right-[58px]">
          <div className="border-t border-[#dfe2e8] pt-2 flex justify-between text-[8px] font-serif text-[#626873]">
            <span>
              Compiled via CVForge Engine v3.4.1
            </span>

            <span>
              PAGE 01 / 01 • REVISION H
            </span>

            <span>
              Checksum: a7f893e • 300 DPI Vector
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CVSection({ title, children }) {
  return (
    <section className="mb-7">
      <h2 className="text-[11px] font-serif tracking-[0.08em] text-[#3333e9] font-bold mb-5">
        {title}
      </h2>

      {children}
    </section>
  );
}

function ExportPanel() {
  const [format, setFormat] = useState("pdf");
  const [paper, setPaper] = useState("a4");
  const [margin, setMargin] = useState("balanced");

  return (
    <aside className="w-[470px] shrink-0 bg-white rounded-xl shadow-[0_12px_30px_rgba(35,48,80,0.13)] p-6">
      {/* Heading */}
      <div className="flex items-center gap-2">
        <Download className="w-5 h-5 text-[#403cff]" />

        <h1 className="text-[24px] font-bold tracking-[-0.04em]">
          Export Your CV
        </h1>

        <span className="ml-auto bg-[#edf0ff] text-[#3e3be5] text-[9px] font-mono px-2 py-1">
          v300DPI
        </span>
      </div>

      <p className="mt-2 text-[12px] text-[#4d535f]">
        High-fidelity vector pipeline ready for production distribution.
      </p>

      {/* Compilation */}
      <div className="mt-6 bg-[#eef2ff] rounded-md p-4">
        <div className="flex justify-between items-center text-[#3935ed]">
          <span className="flex items-center gap-2 text-[11px] font-serif font-bold">
            <CheckCircle2 size={15} />
            Compilation Complete
          </span>

          <span className="text-[11px] font-bold">
            100%
          </span>
        </div>

        <div className="mt-2 h-[6px] rounded-full bg-[#d4d8ff] overflow-hidden">
          <div className="h-full w-full bg-[#443df0]" />
        </div>

        <p className="mt-3 text-[11px] leading-[1.5] text-[#424754]">
          Vector typography compiled at 300 DPI. Ready for instant digital
          submission and precision offset printing.
        </p>
      </div>

      <PanelLabel>DOCUMENT FORMAT</PanelLabel>

      <div className="grid grid-cols-2 gap-2">
        <OptionCard
          selected={format === "pdf"}
          onClick={() => setFormat("pdf")}
          title="PDF Document"
          description="Print-ready vector PDF. Crisp font embeds & exact margins."
          recommended
        />

        <OptionCard
          selected={format === "text"}
          onClick={() => setFormat("text")}
          title="Plain Text"
          description="Raw UTF-8 string format for legacy keyword parsing bots."
          small="0 KB Assets"
        />
      </div>

      <PanelLabel>Paper Dimension</PanelLabel>

      <Segmented
        value={paper}
        onChange={setPaper}
        options={[
          ["a4", "A4 (210 × 297 mm)"],
          ["letter", 'US Letter (8.5 × 11")'],
        ]}
      />

      <PanelLabel>
        <span>PAGE MARGINS & DENSITY</span>

        <span className="text-[#4c48e8] font-normal">
          {margin === "balanced"
            ? "Balanced (18mm)"
            : "Compact (12mm)"}
        </span>
      </PanelLabel>

      <Segmented
        value={margin}
        onChange={setMargin}
        options={[
          ["balanced", "Balanced (18mm)"],
          ["compact", "Compact (12mm)"],
        ]}
      />

      {/* Download */}
      <button className="mt-6 w-full h-[54px] bg-black text-white rounded-md flex items-center justify-center gap-3 text-[16px] font-medium hover:bg-[#111] transition">
        <Download size={18} />
        Download PDF (Instant)
      </button>

      {/* Secondary actions */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button className="h-[46px] rounded-md bg-[#edf2ff] text-[13px] flex items-center justify-center gap-2">
          <Copy size={15} />
          Copy ATS Text
        </button>

        <button className="h-[46px] rounded-md bg-[#edf2ff] text-[13px] flex items-center justify-center gap-2">
          <Printer size={15} />
          Print Directly
        </button>
      </div>

      {/* Privacy */}
      <div className="mt-5 bg-[#eef2ff] rounded-md p-4 flex gap-3">
        <ShieldCheck
          size={18}
          className="text-[#403cff] shrink-0 mt-0.5"
        />

        <div>
          <h3 className="text-[10px] font-bold">
            Zero Account Required • 100% Client-Side
          </h3>

          <p className="mt-1 text-[10px] leading-[1.5] text-[#454b57]">
            Your sensitive career trajectory data never touches our cloud
            servers. All rendering logic executes entirely within your local
            browser runtime.
          </p>
        </div>
      </div>
    </aside>
  );
}

function PanelLabel({ children }) {
  return (
    <div className="flex justify-between items-center mt-6 mb-2 text-[10px] font-serif font-bold tracking-[0.05em]">
      {children}
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  title,
  description,
  recommended,
  small,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        text-left rounded-md border p-3 min-h-[112px]
        transition
        ${
          selected
            ? "bg-[#eaf0ff] border-[#dce5ff]"
            : "bg-[#f4f6fb] border-transparent"
        }
      `}
    >
      <div className="flex justify-between">
        <h3 className="text-[16px] font-semibold">
          {title}
        </h3>

        {selected ? (
          <CheckCircle2
            size={17}
            className="text-[#423cf0]"
          />
        ) : (
          <Circle
            size={17}
            className="text-[#707684]"
          />
        )}
      </div>

      <p className="mt-2 text-[10px] leading-[1.45] text-[#535966]">
        {description}
      </p>

      {recommended && (
        <span className="inline-flex items-center gap-1 mt-3 text-[9px] text-[#423cf0]">
          <Sparkles size={11} />
          Recommended
        </span>
      )}

      {small && (
        <span className="inline-flex items-center gap-1 mt-3 text-[9px] text-[#6a6f79]">
          <FileText size={10} />
          {small}
        </span>
      )}
    </button>
  );
}

function Segmented({ value, onChange, options }) {
  return (
    <div className="grid grid-cols-2 bg-[#e8edfa] rounded-md p-1">
      {options.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`
            h-[34px] rounded-sm text-[11px]
            transition
            ${
              value === key
                ? "bg-white shadow-sm font-semibold"
                : "text-[#525966]"
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function ExportCV() {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="min-h-screen bg-[#eef3ff] text-[#171b24]">
      {/* TOP BAR */}
      <header className="h-[70px] bg-white border-b border-[#dfe5ef] flex items-center px-8">
        <button className="flex items-center gap-2 text-[14px] text-[#333943]">
          <ArrowLeft size={18} />
          Back to Builder
        </button>

        <span className="mx-4 text-[#b3b8c2]">•</span>

        <div className="flex items-center gap-2">
          <FileText
            size={17}
            className="text-[#3937ef]"
          />

          <strong className="text-[17px] font-medium">
            Elena_Rostova_Staff_Product_Designer_2025.pdf
          </strong>

          <span className="bg-[#e7edf9] rounded px-2 py-1 text-[9px] text-[#697083]">
            142 KB
          </span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="bg-[#eef2ff] rounded-full px-3 py-2 text-[11px] text-[#403be8]">
            ⚙ ATS Score{" "}
            <strong>98/100</strong>
          </div>

          <div className="bg-[#f2f4f8] rounded-full px-3 py-2 text-[11px]">
            ✓ 1 Page Exact Fit{" "}
            <span className="text-[#403be8]">
              0.0mm overflow
            </span>
          </div>

          <div className="flex items-center bg-[#edf1f8] rounded-full px-2 py-1">
            <button
              onClick={() =>
                setZoom(Math.max(70, zoom - 10))
              }
              className="p-1"
            >
              <Minus size={14} />
            </button>

            <span className="px-3 text-[11px]">
              {zoom}%
            </span>

            <button
              onClick={() =>
                setZoom(Math.min(130, zoom + 10))
              }
              className="p-1"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="px-10 py-8">
        {/* workspace meta */}
        <div className="max-w-[1500px] mx-auto flex justify-between items-center mb-3 text-[11px] font-serif text-[#454c5b]">
          <span>
            <span className="text-[#3734ec]">●</span>{" "}
            ISO 216 • A4 (210 × 297 mm) • Monospaced & Geometric Precision Grid
          </span>

          <span>
            Vector Preview Mode
          </span>
        </div>

        <div className="max-w-[1500px] mx-auto flex gap-10 items-start">
          {/* CV */}
          <div className="flex-1 overflow-hidden">
            <CVPreview />
          </div>

          {/* EXPORT */}
          <ExportPanel />
        </div>
      </main>

      {/* BOTTOM */}
      <footer className="fixed bottom-0 left-0 right-0 h-[31px] bg-white border-t border-[#dce2ec] px-8 flex items-center justify-between text-[9px] font-mono text-[#626a78]">
        <span>
          ◉ Click & drag document text to inspect selectable vector paths
        </span>

        <span className="text-[#403bea]">
          ⚡ Zero rasterization artifacts detected
        </span>
      </footer>
    </div>
  );
}