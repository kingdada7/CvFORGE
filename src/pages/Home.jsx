import {
  ArrowRight,
  Check,
  CircleHelp,
  Code2,
  Download,
  FileText,
  LayoutTemplate,
  LockKeyhole,
  Menu,
  MousePointer2,
  NotebookPen,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Table2,
  UserRound,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const templates = [
  {
    name: "Modern",
    tag: "Mordern Layout",
    description:
      "Clean contemporary layout featuring a dual-column header, subtle secondary accents, and crisp editorial metadata grouping.",
    type: "modern",
  },
  {
    name: "Classic",
    tag: "Traditional Grade",
    description:
      "Traditional professional CV layout with centered executive headers, full-width dividers, and formal chronological clarity.",
    type: "classic",
  },
  {
    name: "Minimal",
    tag: "High Contrast",
    description:
      "High-contrast monochrome typography with generous negative space, intentionally asymmetric and zero decorative fluff.",
    type: "minimal",
  },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="CVForge home">
          <span className="brand-mark">CV</span>
          <span>Forge</span>
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
          <a href="#builder">Builder</a>
          <a href="#templates">Templates</a>
          <a href="#templates">Examples</a>
          <a href="#privacy">Editorial Guide</a>
        </nav>
        <div className="top-actions">
          <button className="saved-pill">
            <Check size={11} strokeWidth={3} /> Saved
          </button>
          <button className="utility-button">
            <MousePointer2 size={12} /> Template
          </button>
          <button className="utility-button">
            <FileText size={12} /> Preview
          </button>
          <button className="download-button">
            <Download size={12} /> Download PDF
          </button>
          <button className="profile-button" aria-label="Account">
            <UserRound size={13} />
          </button>
        </div>
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <div className="subbar">
        <nav>
          <a href="#builder">Templates</a>
          <a href="#workflow">How it works</a>
          <span className="no-account">
            <LockKeyhole size={9} /> No account required
          </span>
        </nav>
        <div className="sub-actions">
          <span>
            <CircleHelp size={10} /> Client-Side In-Memory
          </span>
          {/* <button>
            <Link to="/template">Create my CV </Link>
            <ArrowRight size={12} />
          </button> */}
        </div>
      </div>

      <main id="top">
        <section className="hero" id="builder">
          <div className="hero-copy">
            <span className="eyebrow">
              CVFORGE V1.0 <i /> EDITORIAL TYPOGRAPHY ENGINE
            </span>
            <h1>Build a CV that gets noticed.</h1>
            <p>
              Create a professional CV in minutes. Choose a template, add your
              experience, and download a polished PDF — no account required.
            </p>
            <div className="hero-buttons">
              <Link to="/template" className="primary-button">
                Create my CV <ArrowRight size={13} />
              </Link>
              <button className="secondary-button">
                <LayoutTemplate size={13} /> Explore templates
              </button>
            </div>
            <div className="hero-stats">
              <div>
                <strong>0.0s</strong>
                <span>Sign-up friction</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Local in your browser</span>
              </div>
              <div>
                <strong>A4 / LTR</strong>
                <span>Print-ready PDF</span>
              </div>
            </div>
            <div className="hero-note">
              <Sparkles size={12} /> Engineered for clarity: precise design,
              clean code, and zero ad trackers
            </div>
          </div>
          <ResumePreview />
        </section>

        <section className="workflow section" id="workflow">
          <SectionHeading
            eyebrow="EFFORTLESS WORKFLOW"
            title="How it works"
            description="From empty canvas to a LaTeX-grade curriculum vitae in less than five minutes."
            aside="No tracking · No subscription lock-in"
          />
          <div className="workflow-grid">
            <WorkflowCard
              number="01"
              icon={<NotebookPen size={14} />}
              title="Add your details"
              text="Enter your experience, education, skills, and professional history via a structured, zero-friction markdown field with smart monitoring."
              footer="Local Auto-Save"
              footerIcon={<Zap size={11} />}
            />
            <WorkflowCard
              number="02"
              icon={<Table2 size={14} />}
              title="Choose your template"
              text="Select an editorial layout calibrated for readability, ATS scanners, and print density. Switch anytime without retyping a single line."
              footer="3 Handcrafted Modes"
              footerIcon={<WandSparkles size={11} />}
            />
            <WorkflowCard
              number="03"
              icon={<Download size={14} />}
              title="Download"
              text="Review your live typography in true A4 viewport and export a pixel-exact, searchable vector PDF in 1 click. Zero watermarks, ever."
              footer="Vector 300 DPI"
              footerIcon={<ScanLine size={11} />}
            />
          </div>
        </section>

        <section className="templates section" id="templates">
          <SectionHeading
            eyebrow="EDITORIAL PRESETS"
            title="Professional templates. Built to be read."
            description="Choose a clean design that puts your experience first. Each layout adheres to strict typographic scales and printer-safe margins."
          />
          <div className="template-grid">
            {templates.map((template) => (
              <TemplateCard key={template.name} {...template} />
            ))}
          </div>
        </section>

        <section className="ats-callout">
          <div>
            <span className="eyebrow">ATS-FRIENDLY CVs</span>

            <h2>Build a CV that's easy to read and scan.</h2>

            <p>
              CVForge uses clean layouts and structured text to help keep your
              CV readable for both recruiters and applicant tracking systems.
            </p>
          </div>

          <div className="callout-actions">
            <Link to="/template" className="primary-button">
              Start building now <ArrowRight size={13} />
            </Link>
          </div>
        </section>
        <section className="privacy section" id="privacy">
          <SectionHeading
            eyebrow="BUILT FOR PRIVACY"
            title="Your CV stays in your browser."
            description="CVForge is designed as a client-side CV builder. Your resume data is stored locally in your browser while you work."
          />

          <div className="privacy-grid">
            <PrivacyCard
              icon={<ShieldCheck size={15} />}
              title="Client-Side"
              text="Your CV is created and edited directly in your browser. The current MVP does not use a CV database or user accounts."
            />

            <PrivacyCard
              icon={<FileText size={15} />}
              title="PDF Export"
              text="Export your finished CV as a PDF using clean, print-ready A4 or US Letter layouts."
            />

            <PrivacyCard
              icon={<Code2 size={15} />}
              title="Local Storage"
              text="Your current CV data is saved in your browser so you can continue working without creating an account."
            />

            <PrivacyCard
              icon={<Table2 size={15} />}
              title="Simple Workflow"
              text="Fill in your information, choose a template, preview your CV, and export it when you're ready."
            />
          </div>
        </section>
      </main>

      <footer className="footer-cta">
        <div>
          <h2>Your career deserves editorial craft.</h2>
          <p>
            No credit cards. No sign-up modals. Build your document now and
            export immediately.
          </p>
        </div>
      </footer>
      <div className="footer-bottom">
        <span>CVForge © 2026. Editorial Precision CV Engine.</span>
        <span>Accessibility &amp; Local Storage</span>
        <span>
          Privacy Manifesto &nbsp;&nbsp; Shortcuts ⌘K &nbsp;&nbsp; Plaintext /
          JSON Export
        </span>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, aside }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {aside && <span className="heading-aside">{aside}</span>}
    </div>
  );
}

function WorkflowCard({ number, icon, title, text, footer, footerIcon }) {
  return (
    <article className="workflow-card">
      <div className="card-top">
        <span className="number">{number}</span>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="card-footer">
        <span>{footer}</span>
        {footerIcon}
      </div>
    </article>
  );
}

function PrivacyCard({ icon, title, text }) {
  return (
    <article className="privacy-card">
      <span className="privacy-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function TemplateCard({ name, tag, description, type }) {
  return (
    <article className="template-card">
      <div className={`paper-wrap paper-${type}`}>
        <div className="paper">
          <div className="paper-header">
            <strong>
              {type === "classic"
                ? "ARTHUR PENDLETON, ESQ."
                : type === "minimal"
                  ? "KAI LIN"
                  : "Marcus Sterling"}
            </strong>
            <span>
              {type === "modern"
                ? "Marketing Strategist"
                : type === "classic"
                  ? "London · 28 Years Experience"
                  : "Cloud Data · Design Systems"}
            </span>
          </div>
          <div className="paper-rule" />
          <div className="paper-lines">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="paper-cols">
            <div>
              <i />
              <i />
              <i />
              <i />
            </div>
            <div>
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <small>CVF 2025.04</small>
        </div>
      </div>
      <div className="template-info">
        <div className="template-title">
          <h3>{name}</h3>
          <span>{tag}</span>
        </div>
        <p>{description}</p>
        <div className="template-actions">
          {/* <button>
            <MousePointer2 size={11} /> Preview
          </button>
          <button>
            Use template <ArrowRight size={11} />
          </button> */}
        </div>
      </div>
    </article>
  );
}

function ResumePreview() {
  return (
    <div className="resume-stage">
      <div className="resume-toolbar">
        <span>
          <i />
          <i />
          <i /> live_preview_sheet.pdf
        </span>
        <span>
          <b>ATS-Optimized</b> Scale: 100%
        </span>
      </div>
      <div className="resume-paper">
        <div className="resume-heading">
          <h3>Elena Rostova</h3>
          <strong>Staff Product Design &amp; Systems Architect</strong>
          <span>
            Zurich, Switzerland · elena.rostova@forge.design ·
            github.com/erostova
          </span>
        </div>
        <ResumeBlock title="EXECUTIVE PROFILE">
          Design systems leader specialized in developer ergonomics, tactile UI
          frameworks, and high-frequency desktop applications. Spearheaded
          interface architectures supporting 542B in enterprise trade volumes
          with sub-15ms latency guarantees.
        </ResumeBlock>
        <ResumeBlock title="SELECTED TRAJECTORY" meta="2014 — Present">
          Staff Design Systems Architect · Vercel Labs
          <br />
          <small>
            Directing the foundational multi-platform token engine serving 140+
            engineers. Reduced component delivery by 82% across React, Flutter,
            and Swift toolchains.
          </small>
        </ResumeBlock>
        <ResumeBlock
          title="LEAD PRODUCT DESIGNER · HIDDEN FINANCIAL SYSTEMS"
          meta="2018 — 2021"
        >
          <small>
            Redesigned institutional terminal workspace. Introduced density
            switcher and real-time canvas charting resulting in 44% increase in
            user retention.
          </small>
        </ResumeBlock>
        <div className="resume-columns">
          <ResumeBlock title="EDUCATION">
            M.Sc. Human-Computer Interaction
            <br />
            <small>ETH Zürich · 2014 · Honors</small>
          </ResumeBlock>
          <ResumeBlock title="COMPETENCIES">
            Typography Ergonomics, Token Architecture, WCAG 2.2 Compliance
          </ResumeBlock>
        </div>
        <div className="resume-footer">
          CVF-PDF-ENGINE <span>Page 1 of 1 · 210 × 297 mm</span>
        </div>
      </div>
    </div>
  );
}

function ResumeBlock({ title, children, meta }) {
  return (
    <div className="resume-block">
      <div className="resume-block-title">
        <b>{title}</b>
        {meta && <span>{meta}</span>}
      </div>
      <p>{children}</p>
    </div>
  );
}

export default Home;
