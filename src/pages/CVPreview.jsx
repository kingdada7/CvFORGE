import React, { useState } from "react";

export default function CVPreview() {
  const [format, setFormat] = useState("pdf");
  const [paper, setPaper] = useState("a4");
  const [margins, setMargins] = useState("balanced");

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans text-slate-800">
      {/* ===== TOP BAR ===== */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200 text-sm">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
            <span className="text-lg leading-none">←</span>
            <span>Back to Builder</span>
          </button>
          <div className="flex items-center gap-2 bg-slate-100 rounded-md px-2.5 py-1">
            <span className="text-blue-600">📄</span>
            <span className="font-medium">Elena_Rostova_Staff_Product_Designer_2025.pdf</span>
            <span className="text-slate-500 text-xs">142 KB</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            ATS Score 98/100
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium">
            <span>◎</span>
            1 Page Exact Fit 0.0mm overflow
          </div>
          <div className="flex items-center gap-1 bg-slate-100 rounded-md px-2 py-1">
            <button className="px-1.5 hover:bg-slate-200 rounded">−</button>
            <span className="w-10 text-center text-xs">100%</span>
            <button className="px-1.5 hover:bg-slate-200 rounded">+</button>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
        {/* LEFT – CV PREVIEW */}
        <div className="flex-1">
          <div className="bg-white shadow-xl rounded-sm overflow-hidden border border-slate-200">
            {/* Page header meta */}
            <div className="px-8 pt-4 pb-2 flex justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>ISO 216 • A4 (210 × 297 mm) • Monospaced & Geometric Precision Grid</span>
              </div>
              <span>Vector Preview Mode</span>
            </div>

            {/* Actual CV content */}
            <div className="px-10 pb-10 pt-2">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-[32px] font-bold tracking-tight text-slate-900 leading-none">
                    Elena Rostova<span className="text-blue-600">•</span>
                  </h1>
                  <p className="text-blue-600 font-medium text-[15px] mt-1">
                    Staff Product Designer & Design Systems Architect
                  </p>
                  <p className="text-slate-600 text-[13px] mt-2 max-w-xl leading-snug">
                    Pioneering systems-driven workflows, multi-platform design architectures, and low-
                    latency interaction models across high-growth enterprise infrastructure.
                  </p>
                </div>
                <div className="text-right text-[12px] text-slate-600 leading-relaxed">
                  <div className="font-medium text-slate-800">Zurich, Switzerland</div>
                  <div>elena.rostova@engineer.ch</div>
                  <div>+41 44 829 1042</div>
                  <div className="text-blue-600">github.com/rostova</div>
                </div>
              </div>

              {/* PROFESSIONAL TRAJECTORY */}
              <section className="mb-7">
                <div className="flex justify-between items-baseline border-b border-slate-200 pb-1 mb-3">
                  <h2 className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                    Professional Trajectory
                  </h2>
                  <span className="text-[11px] text-slate-500">2018 — Present</span>
                </div>

                {/* Job 1 */}
                <div className="mb-5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-[15px]">
                      Staff Design Systems Lead{" "}
                      <span className="font-normal text-slate-500">• Syntropy Cloud AG</span>
                    </h3>
                    <span className="text-[12px] text-slate-500">2022 — Present</span>
                  </div>
                  <ul className="mt-1.5 space-y-1 text-[13px] text-slate-700 leading-snug">
                    <li className="flex gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span>
                        Engineered unified design tokens and multi-framework distribution pipelines powering 42 micro-
                        frontends with zero regression velocity.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span>
                        Reduced runtime bundle overhead by 34% by establishing native web component primitives and
                        automated headless design telemetry.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span>
                        Architected cross-functional sync workflows with 200+ product engineers, reducing time-to-production
                        for net-new patterns by 60%.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Job 2 */}
                <div className="mb-5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-[15px]">
                      Senior Interaction Designer{" "}
                      <span className="font-normal text-slate-500">• Kinetix Precision Software</span>
                    </h3>
                    <span className="text-[12px] text-slate-500">2019 — 2022</span>
                  </div>
                  <ul className="mt-1.5 space-y-1 text-[13px] text-slate-700 leading-snug">
                    <li className="flex gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span>
                        Led core interaction models for high-frequency financial modeling interfaces operating under strict sub-
                        16ms render budgets.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span>
                        Constructed accessibility test harnesses resulting in 100% WCAG 2.1 AAA compliance rating across all
                        client-facing data dashboards.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Job 3 */}
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-[15px]">
                      Product Interface Specialist{" "}
                      <span className="font-normal text-slate-500">• VectorLab Studio</span>
                    </h3>
                    <span className="text-[12px] text-slate-500">2018 — 2019</span>
                  </div>
                  <ul className="mt-1.5 space-y-1 text-[13px] text-slate-700 leading-snug">
                    <li className="flex gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span>
                        Designed desktop-first CAD navigation palettes and bespoke vector visualization widgets for
                        architectural engineering software.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* SYSTEMS & TECHNICAL CAPABILITIES */}
              <section className="mb-7">
                <h2 className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-200 pb-1 mb-3">
                  Systems & Technical Capabilities
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 rounded-md p-3">
                    <div className="text-[12px] font-semibold text-slate-800 mb-1">Architecture & Tokens</div>
                    <div className="text-[11px] text-slate-600 leading-tight">
                      Design Tokens (W3C), Tailwind
                      <br />
                      CSS, Figma Variables, Web
                      <br />
                      Components, Stencil
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-md p-3">
                    <div className="text-[12px] font-semibold text-slate-800 mb-1">Frontend Prototyping</div>
                    <div className="text-[11px] text-slate-600 leading-tight">
                      TypeScript, React, Canvas 2D,
                      <br />
                      SVG DOM, Performance
                      <br />
                      Profiling, Headless UI
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-md p-3">
                    <div className="text-[12px] font-semibold text-slate-800 mb-1">Operational Methods</div>
                    <div className="text-[11px] text-slate-600 leading-tight">
                      Semantic Versioning, Micro-
                      <br />
                      Interactions, WCAG 2.2 AAA
                      <br />
                      Audit, ATS Typography
                    </div>
                  </div>
                </div>
              </section>

              {/* ACADEMIC BACKGROUND */}
              <section>
                <h2 className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-200 pb-1 mb-3">
                  Academic Background & Honors
                </h2>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-semibold text-[15px]">
                      M.Sc. Human-Computer Interaction & Cognitive Systems
                    </h3>
                    <p className="text-[13px] text-slate-600 mt-0.5">
                      ETH Zurich • Summa Cum Laude
                    </p>
                  </div>
                  <span className="text-[12px] text-slate-500">2016 — 2018</span>
                </div>
              </section>
            </div>

            {/* Footer of the page */}
            <div className="px-10 py-3 border-t border-slate-100 flex justify-between text-[10px] text-slate-400">
              <span>Compiled via CVForge Engine v3.4.1</span>
              <span>PAGE 01 / 01 • REVISION H</span>
              <span>Checksum: a7f893e • 300 DPI Vector</span>
            </div>
          </div>

          {/* Bottom helper text */}
          <div className="mt-3 flex justify-between text-[11px] text-slate-500 px-1">
            <span>Click & drag document text to inspect selectable vector paths</span>
            <span className="flex items-center gap-1">
              <span className="text-blue-500">⚡</span>
              Zero font rasterization artifacts detected
            </span>
          </div>
        </div>

        {/* RIGHT – EXPORT PANEL */}
        <div className="w-[380px] flex-shrink-0">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="px-5 pt-5 pb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-lg">⧉</span>
                  <h2 className="text-lg font-semibold text-slate-900">Export Your CV</h2>
                </div>
                <p className="text-[13px] text-slate-500 mt-1">
                  High-fidelity vector pipeline ready for production distribution.
                </p>
              </div>
              <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                v.300DPI
              </span>
            </div>

            {/* Compilation status */}
            <div className="mx-5 mb-5 bg-blue-50 border border-blue-100 rounded-lg p-3">
              <div className="flex items-center justify-between text-[13px] mb-1.5">
                <div className="flex items-center gap-1.5 text-blue-700 font-medium">
                  <span className="text-emerald-500">✓</span>
                  Compilation Complete
                </div>
                <span className="font-semibold text-blue-800">100%</span>
              </div>
              <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full w-full bg-blue-600 rounded-full"></div>
              </div>
              <p className="text-[11px] text-blue-700/80 mt-2 leading-snug">
                Vector typography compiled at 300 DPI. Ready for instant digital
                submission and precision offset printing.
              </p>
            </div>

            {/* DOCUMENT FORMAT */}
            <div className="px-5 mb-5">
              <h3 className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase mb-2.5">
                Document Format
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setFormat("pdf")}
                  className={`relative text-left p-3 rounded-lg border transition-all ${
                    format === "pdf"
                      ? "border-blue-500 bg-blue-50/50 shadow-sm"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[13px]">PDF Document</span>
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        format === "pdf" ? "border-blue-600" : "border-slate-300"
                      }`}
                    >
                      {format === "pdf" && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    Print-ready vector PDF. Crisp font
                    <br />
                    embeds & exact margins.
                  </p>
                  <div className="mt-2 text-[10px] text-blue-600 font-medium flex items-center gap-1">
                    <span>✦</span> Recommended
                  </div>
                </button>

                <button
                  onClick={() => setFormat("text")}
                  className={`relative text-left p-3 rounded-lg border transition-all ${
                    format === "text"
                      ? "border-blue-500 bg-blue-50/50 shadow-sm"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[13px]">Plain Text</span>
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        format === "text" ? "border-blue-600" : "border-slate-300"
                      }`}
                    >
                      {format === "text" && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    Raw UTF-8 string format for legacy
                    <br />
                    keyword parsing bots.
                  </p>
                  <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1">
                    <span>📄</span> 0 KB Assets
                  </div>
                </button>
              </div>
            </div>

            {/* PAPER DIMENSION */}
            <div className="px-5 mb-5">
              <div className="flex justify-between items-center mb-2.5">
                <h3 className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  Paper Dimension
                </h3>
                <span className="text-[10px] text-slate-400">Global Standard</span>
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
                  A4 (210 × 297 mm)
                </button>
                <button
                  onClick={() => setPaper("us")}
                  className={`py-2.5 text-center text-[13px] font-medium rounded-md border transition-all ${
                    paper === "us"
                      ? "border-blue-500 bg-blue-50 text-blue-800"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  US Letter (8.5 × 11")
                </button>
              </div>
            </div>

            {/* PAGE MARGINS */}
            <div className="px-5 mb-6">
              <div className="flex justify-between items-center mb-2.5">
                <h3 className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  Page Margins & Density
                </h3>
                <span className="text-[10px] text-slate-400">Balanced (18mm)</span>
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
                  Balanced (18mm)
                </button>
                <button
                  onClick={() => setMargins("compact")}
                  className={`py-2.5 text-center text-[13px] font-medium rounded-md border transition-all ${
                    margins === "compact"
                      ? "border-blue-500 bg-blue-50 text-blue-800"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Compact (12mm)
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="px-5 pb-5 space-y-2.5">
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <span>↓</span>
                Download PDF (Instant)
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <button className="py-2.5 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5">
                  <span>⧉</span>
                  Copy ATS Text
                </button>
                <button className="py-2.5 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5">
                  <span>🖨</span>
                  Print Directly
                </button>
              </div>
            </div>

            {/* Privacy note */}
            <div className="mx-5 mb-5 bg-slate-50 border border-slate-200 rounded-lg p-3 flex gap-2.5">
              <span className="text-slate-400 mt-0.5">🔒</span>
              <div className="text-[11px] text-slate-600 leading-snug">
                <span className="font-medium text-slate-800">Zero Account Required • 100% Client-Side</span>
                <br />
                Your sensitive career trajectory data never touches our cloud servers.
                All rendering logic executes privately within your local browser
                runtime.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}