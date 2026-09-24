import { useState } from 'react'
import './App.css'

const initialProfile = {
  name: 'Elena Rostova',
  headline: 'Staff Product Designer & Systems Architect',
  email: 'elena.rostova@forge.design',
  location: 'San Francisco, CA',
  summary: 'Staff Product Designer and Systems Architect specializing in zero-latency developer tooling, design token infrastructure, and enterprise typography. Over 9 years translating complex distributed systems into minimalist, ergonomic computational interfaces.',
}

const experiences = [
  { title: 'Staff Product Designer', company: 'Linear', dates: '2022 — Present', bullets: ['Architected design token engine adopted across 14 product surfaces, cutting release-cycle design by 84% between iOS, web, and Electron clients.', 'Spearheaded the Project Milestones paradigm, increasing weekly active engineering teams by 320,000+ globally.', 'Crafted sub-50ms keyboard shortcut navigation system and ultra-dense computational timeline viewports with zero visual lag.'] },
  { title: 'Senior Design Technologist', company: 'Stripe', dates: '2019 — 2022', bullets: ['Maintained core Dashboard primitives, establishing typographic scales and high-contrast WCAG AAA compliance standards.', 'Authored automated visual regression pipeline processing 1,400+ daily screenshot test suites for merchant checkout experiences.', 'Partnered with Developer Experience teams to author the public Stripe CLI documentation schema and terminal UI library.'] },
  { title: 'Interaction Designer', company: 'Framestore Labs', dates: '2016 — 2019', bullets: ['Built interactive generative exhibits and algorithmic spatial installations for civic institutions and technology showcases.'] },
]

const skills = ['Design Systems', 'Figma Tokens', 'React / TypeScript', 'Tailwind Architecture', 'Interaction Typography', 'Prototyping']

function Icon({ children }) {
  return <span className="icon" aria-hidden="true">{children}</span>
}

function DocumentBuilder() {
  const [profile, setProfile] = useState(initialProfile)
  const [activeTab, setActiveTab] = useState('Info')
  const [zoom, setZoom] = useState(100)
  const [isSaved, setIsSaved] = useState(true)

  const updateProfile = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }))
    setIsSaved(false)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">CVForge <span className="brand-dot" /></div>
        <div className="top-divider" />
        <nav className="main-nav" aria-label="Primary navigation">
          <a className="active" href="#builder">Builder</a>
          <a href="#templates">Templates</a>
          <a href="#examples">Examples</a>
          <a href="#guide">Editorial Guide</a>
        </nav>
        <div className="top-actions">
          <button className={`save-status ${isSaved ? '' : 'unsaved'}`} onClick={() => setIsSaved(true)}><Icon>✓</Icon>{isSaved ? 'Saved' : 'Unsaved'}</button>
          <button className="text-action"><Icon>◈</Icon>Template</button>
          <button className="text-action"><Icon>▣</Icon>Preview</button>
          <button className="download-button"><Icon>⇩</Icon>Download PDF</button>
          <button className="avatar-button" aria-label="Account">A</button>
        </div>
      </header>

      <div className="workspace-titlebar">
        <div className="document-name">DOCUMENT MASTER <span>•</span> <small>v2.4 Draft</small></div>
        <div className="document-tools"><Icon>☷</Icon><Icon>▦</Icon></div>
        <div className="file-name">Elena_Rostova_Staff_Product_Designer_2025.pdf <span>Single Page Fit</span><b>●</b> Live Synchronized</div>
      </div>

      <div className="subnav">
        {['Info', 'Summary', 'Exp (2)', 'Edu (1)', 'Skills (6)', 'More'].map((tab, index) => (
          <button className={activeTab === tab ? 'selected' : ''} onClick={() => setActiveTab(tab)} key={tab}>
            <Icon>{['♙', '≡', '▣', '⌂', '⌘', '+'][index]}</Icon>{tab}
          </button>
        ))}
      </div>

      <main className="main-content" id="builder">
        <aside className="editor-panel">
          <section className="editor-card personal-card">
            <CardHeading icon="♙" title="Personal Information" />
            <div className="field-grid">
              <label>Full Name<input value={profile.name} onChange={(event) => updateProfile('name', event.target.value)} /></label>
              <label>Headline<input value={profile.headline} onChange={(event) => updateProfile('headline', event.target.value)} /></label>
              <label>Email<input value={profile.email} onChange={(event) => updateProfile('email', event.target.value)} /></label>
              <label>Location<input value={profile.location} onChange={(event) => updateProfile('location', event.target.value)} /></label>
            </div>
          </section>

          <section className="editor-card summary-card">
            <CardHeading icon="≡" title="Executive Summary" />
            <textarea value={profile.summary} onChange={(event) => updateProfile('summary', event.target.value)} />
          </section>

          <section className="editor-card experience-card">
            <div className="section-heading"><CardHeading icon="▣" title="Work Experience" count="2" /><button className="record-button">+ Record</button></div>
            {experiences.slice(0, 2).map((experience) => <ExperienceEditor experience={experience} key={experience.title} />)}
            <button className="add-position">⊕ &nbsp;Add Position</button>
          </section>

          <section className="editor-card skills-card">
            <CardHeading icon="⌘" title="Skills & Technologies" count="6" />
            <div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}<button aria-label={`Remove ${skill}`}>×</button></span>)}</div>
            <button className="add-skill">＋ Add Skill</button>
          </section>
          <button className="add-section">⊞ &nbsp;Add Section (Projects, Education, Patents)</button>
        </aside>

        <section className="preview-panel">
          <article className="resume-paper" style={{ transform: `scale(${zoom / 100})` }}>
            <div className="resume-header">
              <div><h1>{profile.name}</h1><h2>{profile.headline}</h2></div>
              <div className="contact-block">San Francisco, California<br />{profile.email}<br /><a href="mailto:elena.rostova@forge.design">portfolio.elena.rostova.io</a></div>
            </div>
            <ResumeSection number="01" title="PROFILE"><p>{profile.summary}</p></ResumeSection>
            <ResumeSection number="02" title="EXPERIENCE">
              {experiences.map((experience) => <div className="resume-job" key={experience.title}><div className="job-heading"><strong>{experience.title}</strong> · {experience.company}<small>{experience.dates}</small></div><ul>{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>)}
            </ResumeSection>
            <div className="resume-columns"><ResumeSection number="03" title="EDUCATION"><div className="education"><strong>B.S. in Symbolic Systems</strong><span>Stanford University · 2012 — 2016</span><p>Focus in Human-Computer Interaction & Cognitive Computation. Graduated with Honors.</p></div></ResumeSection><ResumeSection number="04" title="CORE COMPETENCIES"><div className="resume-tags">{skills.slice(0, 5).map((skill) => <span key={skill}>{skill}</span>)}</div></ResumeSection></div>
            <div className="paper-footer"><span>CVForge Precision Engine • Output Profile ISO 216 (A4)</span><span>Page&nbsp; 01 of 01</span></div>
          </article>
          <div className="preview-controls"><button onClick={() => setZoom(Math.max(70, zoom - 10))}>−</button><span>{zoom}%</span><button onClick={() => setZoom(Math.min(120, zoom + 10))}>+</button><i /><button>⌗ Fit</button><i /><button className="mode-button">▣ &nbsp; Editorial<br />Modern</button><i /><button>▦</button></div>
        </section>
      </main>
      <footer className="app-footer"><span>CVForge © 2025. Editorial Precision CV Engine. &nbsp;•&nbsp; Accounts & Local Storage</span><span>Privacy Manifesto &nbsp;&nbsp; Shortcuts ⌘K &nbsp;&nbsp; Plaintext / JSON Export</span></footer>
    </div>
  )
}

function CardHeading({ icon, title, count }) {
  return <div className="card-heading"><h3><Icon>{icon}</Icon>{title}{count && <small>{count}</small>}</h3><span className="check-mark">✓</span></div>
}

function ExperienceEditor({ experience }) {
  return <div className="experience-item"><div className="experience-title"><Icon>⁙</Icon><div><strong>{experience.title}</strong><span>{experience.company} · San Francisco · {experience.dates}</span></div><button>♧</button><button>⌃</button></div>{experience.bullets.map((bullet, index) => <div className="bullet-row" key={bullet}><b>0{index + 1}</b><p>{bullet}</p></div>)}</div>
}

function ResumeSection({ number, title, children }) {
  return <section className="resume-section"><h3><span>{number} /</span> {title}</h3>{children}</section>
}

export default DocumentBuilder
