import { useState } from 'react'

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

const tabIcons = ['♙', '≡', '▣', '⌂', '⌘', '+']

const templateOptions = [
  { id: 'modern', name: 'Modern', description: 'Clean, contemporary, and professional. Ideal for tech, product, and high-growth roles.', accent: 'bg-[#5146e5]', button: 'Active Template' },
  { id: 'classic', name: 'Classic', description: 'Traditional and structured. Built for finance, law, consulting, and corporate leadership.', accent: 'bg-[#eef2ff]', button: 'Apply Classic Template' },
  { id: 'minimal', name: 'Minimal', description: 'Simple, elegant, and typography-focused. Strips away all noise for maximum reading clarity.', accent: 'bg-[#eef2ff]', button: 'Apply Minimal Template' },
]

function Icon({ children, className = '' }) {
  return <span className={`inline-flex w-[17px] justify-center items-center text-brand font-serif mr-[7px] ${className}`} aria-hidden="true">{children}</span>
}

function CardHeading({ icon, title, count }) {
  return (
    <div className="flex items-center justify-between mb-[14px]">
      <h3 className="text-[15px] m-0 tracking-[-0.03em] flex items-center">
        <Icon className="font-sans text-[14px]">{icon}</Icon>
        {title}
        {count && <small className="text-[10px] bg-[#dfe6f7] px-[5px] py-[2px] rounded-[8px] text-[#7b87a2] ml-[7px]">{count}</small>}
      </h3>
      <span className="text-brand text-[16px] font-bold">✓</span>
    </div>
  )
}

function ExperienceEditor({ experience }) {
  return (
    <div className="bg-white rounded-[5px] px-[10px] pt-[11px] pb-[9px] mt-[10px] border border-[#e0e5ef] shadow-[0_1px_1px_#20305d0a]">
      <div className="flex items-start gap-[7px]">
        <Icon className="text-[#59616f] font-sans text-[15px] !mr-[1px] mt-[1px]">⁙</Icon>
        <div className="min-w-0 flex-1">
          <strong className="text-[15px] tracking-[-0.03em] block">{experience.title}</strong>
          <span className="block text-[10px] text-[#66728a] mt-[2px]">{experience.company} · San Francisco · {experience.dates}</span>
        </div>
        <button className="text-[#8a93a4] text-[13px] px-[2px]">♧</button>
        <button className="text-[#8a93a4] text-[13px] px-[2px]">⌃</button>
      </div>
      {experience.bullets.map((bullet, index) => (
        <div className="grid grid-cols-[22px_1fr] gap-[3px] items-center mt-2" key={bullet}>
          <b className="text-brand font-mono text-[9px]">0{index + 1}</b>
          <p className="bg-[#eef2fa] rounded-[3px] px-[7px] py-[5px] m-0 text-[#334057] text-[10px] leading-[1.3] whitespace-nowrap overflow-hidden text-ellipsis">{bullet}</p>
        </div>
      ))}
    </div>
  )
}

function TemplatePreview({ variant }) {
  if (variant === 'classic') {
    return <div className="h-[425px] bg-white border border-[#eef1f6] px-3 pt-10"><div className="mx-auto h-[3px] w-[150px] bg-black mb-2" /><div className="mx-auto h-[4px] w-[170px] bg-[#7c7c83] mb-2" /><div className="h-[2px] bg-[#222] mb-2" /><div className="space-y-[6px]"><div className="h-[7px] w-[92px] bg-black" /><div className="h-[4px] w-full bg-[#dfe9fa]" /><div className="h-[4px] w-[80%] bg-[#dfe9fa]" /><div className="h-[7px] w-[110px] bg-black mt-2" /><div className="h-[4px] w-full bg-[#dfe9fa]" /><div className="h-[4px] w-[72%] bg-[#dfe9fa]" /><div className="h-[7px] w-[86px] bg-black mt-2" /><div className="h-[4px] w-full bg-[#dfe9fa]" /></div></div>
  }
  if (variant === 'minimal') {
    return <div className="h-[425px] bg-white border border-[#eef1f6] px-3 pt-10"><div className="h-[13px] w-[100px] bg-black mb-2" /><div className="h-[5px] w-[130px] bg-[#777a83] mb-4" /><div className="space-y-[11px]"><div className="h-[7px] w-[50px] bg-black" /><div className="h-[5px] w-full bg-[#dfe9fa]" /><div className="h-[5px] w-[78%] bg-[#dfe9fa]" /><div className="h-[7px] w-[58px] bg-black mt-4" /><div className="h-[5px] w-full bg-[#dfe9fa]" /><div className="h-[5px] w-[75%] bg-[#dfe9fa]" /><div className="h-[7px] w-[48px] bg-black mt-4" /><div className="h-[5px] w-[90%] bg-[#dfe9fa]" /></div></div>
  }
  return <div className="h-[425px] bg-white border border-[#eef1f6] px-3 pt-10 relative"><div className="h-[13px] w-[110px] bg-[#12223d] rounded-[2px] mb-2" /><div className="h-[7px] w-[145px] bg-[#665bea] rounded-[2px] mb-3" /><div className="h-[7px] w-[65px] bg-[#12223d] rounded-[2px] mb-2" /><div className="space-y-[6px]"><div className="h-[5px] w-full bg-[#dfe9fa]" /><div className="h-[5px] w-[92%] bg-[#dfe9fa]" /><div className="h-[5px] w-[78%] bg-[#dfe9fa]" /><div className="h-[7px] w-[65px] bg-[#12223d] rounded-[2px] mt-3 mb-2" /><div className="h-[5px] w-full bg-[#dfe9fa]" /><div className="h-[5px] w-[87%] bg-[#dfe9fa]" /><div className="h-[7px] w-[65px] bg-[#12223d] rounded-[2px] mt-3 mb-2" /><div className="h-[5px] w-full bg-[#dfe9fa]" /></div><div className="absolute bottom-3 left-3 h-[4px] w-[45px] bg-[#cfe0ff]" /><div className="absolute bottom-3 right-3 h-[4px] w-[22px] bg-[#cfe0ff]" /></div>
}

function TemplateModal({ selectedTemplate, setSelectedTemplate, onClose, onApply }) {
  return <div className="fixed inset-0 z-50 bg-[#20232b]/45 backdrop-blur-[4px] flex items-center justify-center p-6 max-[760px]:p-3">
    <div className="w-full max-w-[1095px] bg-white rounded-[5px] shadow-[0_22px_60px_#151a2b45] overflow-hidden border-t-[3px] border-brand">
      <div className="px-9 pt-5 pb-3 max-[760px]:px-5">
        <div className="flex items-start justify-between"><div><div className="flex items-center gap-2 mb-2"><span className="bg-[#e9e6ff] text-[#3f35d5] font-mono text-[10px] font-bold tracking-[0.06em] px-1 py-[2px]">DESIGN SYSTEM</span><span className="font-mono text-[10px] text-[#5e6471]">v2.4 Editorial Layouts</span></div><h2 className="text-[22px] leading-none tracking-[-0.04em] font-bold m-0">Choose your template</h2><p className="text-[13px] text-[#505866] mt-3 mb-0">Select a layout that highlights your experience. Your content adapts automatically without re-entering<br className="max-[760px]:hidden" /> data.</p></div><button className="text-[#41454d] text-[28px] leading-none font-light px-1 -mt-1" onClick={onClose} aria-label="Close template chooser">×</button></div>
      </div>
      <div className="grid grid-cols-3 gap-5 px-9 py-3 max-[760px]:grid-cols-1 max-[760px]:px-5 max-[760px]:gap-3">
        {templateOptions.map((template) => { const isSelected = selectedTemplate === template.id; return <button key={template.id} onClick={() => setSelectedTemplate(template.id)} className={`text-left rounded-[7px] p-3 pb-[10px] border bg-[#fbfcff] transition-all duration-150 ${isSelected ? 'border-[#bdb8ff] shadow-[0_2px_8px_#5a54d52a]' : 'border-[#eef1f6] hover:border-[#bdb8ff]'}`}><div className="flex items-center justify-between mb-3"><div className="flex items-center gap-1 text-[17px] font-bold"><span className={`w-[8px] h-[8px] rounded-full ${template.id === 'modern' ? 'bg-[#4f45e3]' : 'bg-[#233044]'}`} />{template.name}</div>{isSelected && <span className="bg-[#5146e5] text-white rounded-[2px] text-[10px] font-semibold px-2 py-1">✓ Selected</span>}</div><TemplatePreview variant={template.id} /><p className="text-[12px] leading-[1.45] text-[#515967] min-h-[38px] mt-[10px] mb-[9px]">{template.description}</p><span className={`block text-center rounded-[4px] text-[12px] font-semibold py-[7px] ${isSelected ? 'bg-[#5146e5] text-white' : 'bg-[#edf2ff] text-[#26344a]'}`}>{isSelected ? '◉  Active Template' : template.button}</span></button> })}
      </div>
      <div className="bg-[#f1f5ff] border-t border-[#e4eafa] px-9 py-3 flex items-center justify-between max-[760px]:px-5 max-[760px]:gap-3 max-[430px]:flex-col max-[430px]:items-stretch"><span className="text-[12px] text-[#657084] flex items-center"><span className="text-brand text-[17px] mr-2">◉</span>All templates are 100% ATS-friendly &amp; PDF export ready.</span><div className="flex gap-2 ml-auto"><button onClick={onClose} className="bg-white border border-[#e1e6f0] text-[#374256] rounded-[4px] px-5 py-[7px] text-[12px] font-semibold">Cancel</button><button onClick={onApply} className="bg-black text-white rounded-[4px] px-5 py-[7px] text-[12px] font-semibold">Confirm &amp; Apply&nbsp; →</button></div></div>
    </div>
  </div>
}

function ResumeSection({ number, title, children }) {
  return (
    <section className="mb-5">
      <h3 className="m-0 mb-[10px] text-[#2732d5] font-mono font-bold text-[9px] tracking-[0.08em]">
        <span className="font-normal">{number} /</span> {title}
      </h3>
      {children}
    </section>
  )
}

function TemplateSelector() {
  const [profile, setProfile] = useState(initialProfile)
  const [activeTab, setActiveTab] = useState('Info')
  const [zoom, setZoom] = useState(100)
  const [isSaved, setIsSaved] = useState(true)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState('modern')

  const tabs = ['Info', 'Summary', 'Exp (2)', 'Edu (1)', 'Skills (6)', 'More']

  const updateProfile = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }))
    setIsSaved(false)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-ink text-[12px] tracking-[0.01em]">
      {/* Top bar */}
      <header className="h-[52px] bg-white border-b border-[#edf0f5] flex items-center px-5 gap-4">
        <div className="font-bold text-[15px] tracking-[-0.04em] whitespace-nowrap">CVForge <span className="inline-block w-1 h-1 rounded-full bg-brand align-top ml-[3px] mt-[2px]" /></div>
        <div className="h-[18px] w-px bg-[#d8dfeb]" />
        <nav className="flex items-center gap-[19px] text-[11px] max-[760px]:hidden" aria-label="Primary navigation">
          <a className="font-bold text-ink relative" href="#builder">Builder<span className="absolute -bottom-[18px] left-0 w-full h-[2px] bg-brand" /></a>
          <a className="text-[#394255] no-underline" href="#templates">Templates</a>
          <a className="text-[#394255] no-underline hidden lg:inline" href="#examples">Examples</a>
          <a className="text-[#394255] no-underline hidden lg:inline" href="#guide">Editorial Guide</a>
        </nav>
        <div className="ml-auto flex items-center gap-[18px] whitespace-nowrap">
          <button className={`text-[11px] flex items-center px-[9px] py-[6px] rounded-[4px] ${isSaved ? 'bg-[#f0f4ff] text-[#485575]' : 'bg-[#fff4e7] text-[#b76a18]'}`} onClick={() => setIsSaved(true)}>
            <Icon className="font-sans text-[12px]">✓</Icon>{isSaved ? 'Saved' : 'Unsaved'}
          </button>
          <button onClick={() => setIsTemplateModalOpen(true)} className="text-[11px] flex items-center hidden xl:flex"><Icon className="text-ink font-sans">◈</Icon>Template</button>
          <button className="text-[11px] flex items-center hidden xl:flex"><Icon className="text-ink font-sans">▣</Icon>Preview</button>
          <button className="bg-[#090b0f] text-white text-[11px] px-[13px] py-2 rounded-[4px] flex items-center shadow-[0_2px_4px_#0002] max-[760px]:px-2 max-[760px]:text-[0px]"><Icon className="text-white font-sans max-[760px]:text-[13px] max-[760px]:!mr-0">⇩</Icon>Download PDF</button>
          <button className="text-white text-[11px] font-bold w-[26px] h-[26px] rounded-full bg-[#080a0e]" aria-label="Account">A</button>
        </div>
      </header>

      {/* Workspace title bar */}
      <div className="h-[29px] bg-white border-b border-[#edf0f5] grid grid-cols-[445px_1fr] lg:grid-cols-[445px_1fr] items-center px-5 font-mono text-[10px] max-[1050px]:grid-cols-[390px_1fr] max-[760px]:block max-[760px]:h-auto max-[760px]:py-[7px] max-[760px]:px-3">
        <div className="text-brand font-medium">DOCUMENT MASTER <span className="text-[#8a93a2] mx-[5px]">•</span> <small className="text-[#3c465d] text-[10px]">v2.4 Draft</small></div>
        <div className="text-[#111a2c] flex gap-[14px] max-[760px]:hidden"><span>☷</span><span>▦</span></div>
        <div className="text-[#1a2235] font-medium max-[760px]:mt-[5px] max-[430px]:text-[8px]">Elena_Rostova_Staff_Product_Designer_2025.pdf <span className="bg-[#e7eaff] text-[#433ad8] rounded-[10px] px-[7px] py-[3px] ml-[9px]">Single Page Fit</span> <b className="text-[#4238df] ml-[10px] text-[12px]">●</b> Live Synchronized</div>
      </div>

      {/* Sub navigation */}
      <div className="h-[47px] bg-white border-b border-[#e2e8f2] flex items-center px-5 gap-[5px] overflow-x-auto">
        {tabs.map((tab, index) => (
          <button className={`px-[9px] py-[7px] rounded-[5px] text-[11px] flex items-center whitespace-nowrap ${activeTab === tab ? 'bg-[#eff2ff] text-[#2524d2] font-semibold' : 'text-[#606b81]'}`} onClick={() => setActiveTab(tab)} key={tab}>
            <Icon className={activeTab === tab ? 'text-[#2d2de7]' : 'text-[#6b7488]'}>{tabIcons[index]}</Icon>{tab}
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="grid grid-cols-[445px_1fr] min-h-[calc(100vh-156px)] max-[1050px]:grid-cols-[390px_1fr] max-[760px]:block" id="builder">
        {/* Editor panel */}
        <aside className="bg-[#f8fafc] p-[19px] pb-[22px] border-r border-[#e0e7f2] overflow-hidden max-[1050px]:p-[14px] max-[760px]:border-r-0">
          {/* Personal Info */}
          <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
            <CardHeading icon="♙" title="Personal Information" />
            <div className="grid grid-cols-2 gap-3 gap-x-[10px] max-[430px]:grid-cols-1">
              <label className="text-[#66728a] font-mono text-[9px]">Full Name<input value={profile.name} onChange={(e) => updateProfile('name', e.target.value)} className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0] focus:ring-2 focus:ring-[#3335ff1c]" /></label>
              <label className="text-[#66728a] font-mono text-[9px]">Headline<input value={profile.headline} onChange={(e) => updateProfile('headline', e.target.value)} className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0] focus:ring-2 focus:ring-[#3335ff1c]" /></label>
              <label className="text-[#66728a] font-mono text-[9px]">Email<input value={profile.email} onChange={(e) => updateProfile('email', e.target.value)} className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0] focus:ring-2 focus:ring-[#3335ff1c]" /></label>
              <label className="text-[#66728a] font-mono text-[9px]">Location<input value={profile.location} onChange={(e) => updateProfile('location', e.target.value)} className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0] focus:ring-2 focus:ring-[#3335ff1c]" /></label>
            </div>
          </section>

          {/* Summary */}
          <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
            <CardHeading icon="≡" title="Executive Summary" />
            <textarea value={profile.summary} onChange={(e) => updateProfile('summary', e.target.value)} className="block w-full border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] h-[84px] leading-[1.45] resize-y focus:border-[#7578f0] focus:ring-2 focus:ring-[#3335ff1c]" />
          </section>

          {/* Experience */}
          <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
            <div className="flex items-center justify-between">
              <CardHeading icon="▣" title="Work Experience" count="2" />
              <button className="text-brand font-mono text-[9px]">+ Record</button>
            </div>
            {experiences.slice(0, 2).map((experience) => <ExperienceEditor experience={experience} key={experience.title} />)}
            <button className="mt-[10px] w-full bg-white rounded-[4px] py-[7px] text-[11px] text-[#131c32] border border-[#dfe6f4]">⊕ &nbsp;Add Position</button>
          </section>

          {/* Skills */}
          <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
            <CardHeading icon="⌘" title="Skills & Technologies" count="6" />
            <div className="flex gap-[5px] flex-wrap">
              {skills.map((skill) => (
                <span className="inline-flex items-center bg-white border border-[#dfe4ef] pl-2 pr-[6px] py-[5px] rounded-[3px] text-[10px]" key={skill}>{skill}<button className="pl-[6px] text-[#a2aabc] text-[12px]" aria-label={`Remove ${skill}`}>×</button></span>
              ))}
            </div>
            <button className="mt-[10px] text-brand px-[9px] py-[5px] text-[11px] bg-white rounded-[4px] border border-[#dfe4ef]">＋ Add Skill</button>
          </section>
          <button className="w-full bg-panel text-[#1d2943] rounded-[7px] py-[11px] text-[11px] shadow-[inset_0_0_0_1px_#e6eaff]">⊞ &nbsp;Add Section (Projects, Education, Patents)</button>
        </aside>

        {/* Preview panel */}
        <section className="bg-[#f1f5ff] relative px-10 pt-5 pb-[76px] overflow-hidden flex justify-center items-start max-[1050px]:px-5 max-[760px]:min-h-[860px] max-[760px]:px-[10px] max-[760px]:pb-[74px] max-[430px]:min-h-[700px]">
          <div className="absolute inset-0 opacity-35 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#b8c4dd 0.7px, transparent 0.7px)', backgroundSize: '17px 17px' }} />
          <article className="w-[530px] min-h-[750px] bg-white mt-0 p-12 pb-[35px] shadow-[0_15px_30px_#2d416e20] relative z-1 text-[#152035] transition-transform duration-200 max-[760px]:origin-top-center max-[760px]:scale-72 max-[760px]:mb-[-205px] max-[430px]:scale-57 max-[430px]:mb-[-320px]" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
            {/* Header */}
            <div className="flex justify-between border-b-2 border-ink pb-2 mb-[25px] gap-[15px]">
              <div>
                <h1 className="font-sans font-bold text-[29px] leading-none tracking-[-0.065em] m-0 mb-[5px]">{profile.name}</h1>
                <h2 className="text-[13px] leading-none font-medium m-0">{profile.headline}</h2>
              </div>
              <div className="font-mono text-[8px] leading-[1.7] text-right text-[#39465d] pt-[2px] whitespace-nowrap">
                San Francisco, California<br />
                {profile.email}<br />
                <a className="text-[#2738d9] no-underline" href="mailto:elena.rostova@forge.design">portfolio.elena.rostova.io</a>
              </div>
            </div>
            <ResumeSection number="01" title="PROFILE"><p className="text-[9px] leading-[1.55] m-0 text-justify">{profile.summary}</p></ResumeSection>
            <ResumeSection number="02" title="EXPERIENCE">
              {experiences.map((experience) => (
                <div className="mb-[13px]" key={experience.title}>
                  <div className="text-[10px] leading-[1.2] mb-[5px]">
                    <strong className="text-[12px]">{experience.title}</strong> · {experience.company}
                    <small className="float-right font-mono text-[8px] text-[#526079]">{experience.dates}</small>
                  </div>
                  <ul className="pl-3 m-0 list-disc marker:text-[#2b2de5]">
                    {experience.bullets.map((bullet) => <li className="pl-[2px] mb-[4px] text-[8.5px] leading-[1.35]" key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
              ))}
            </ResumeSection>
            <div className="grid grid-cols-2 gap-[25px] mt-4">
              <ResumeSection number="03" title="EDUCATION">
                <strong className="block text-[10px] mb-[3px]">B.S. in Symbolic Systems</strong>
                <span className="block font-mono text-[8px] text-[#526079] mb-[7px]">Stanford University · 2012 — 2016</span>
                <p className="text-[8px] leading-[1.5] m-0">Focus in Human-Computer Interaction &amp; Cognitive Computation. Graduated with Honors.</p>
              </ResumeSection>
              <ResumeSection number="04" title="CORE COMPETENCIES">
                <div className="flex flex-wrap gap-[4px]">
                  {skills.slice(0, 5).map((skill) => <span className="bg-[#f0f3f9] font-mono text-[7px] px-[5px] py-1 text-[#4c5870]" key={skill}>{skill}</span>)}
                </div>
              </ResumeSection>
            </div>
            <div className="absolute bottom-[34px] left-12 right-12 flex justify-between font-mono text-[7px] text-[#5d6678] border-t border-[#e1e4ea] pt-2">
              <span>CVForge Precision Engine • Output Profile ISO 216 (A4)</span>
              <span>Page&nbsp; 01 of 01</span>
            </div>
          </article>

          {/* Preview controls */}
          <div className="absolute bottom-[19px] z-2 bg-white shadow-[0_5px_19px_#29375d22] rounded-lg px-[10px] py-[7px] flex items-center gap-2 font-mono text-[10px]">
            <button className="px-[7px] py-[5px] hover:text-brand" onClick={() => setZoom(Math.max(70, zoom - 10))}>−</button>
            <span>{zoom}%</span>
            <button className="px-[7px] py-[5px] hover:text-brand" onClick={() => setZoom(Math.min(120, zoom + 10))}>+</button>
            <i className="h-[19px] w-px bg-[#e2e6ee]" />
            <button className="px-[7px] py-[5px] hover:text-brand">⌗ Fit</button>
            <i className="h-[19px] w-px bg-[#e2e6ee]" />
            <button onClick={() => setIsTemplateModalOpen(true)} className="text-[#3d43da] bg-[#f0f2ff] rounded-md text-left leading-[1.2] px-[7px] py-[5px]">▣ &nbsp; Editorial<br />Modern</button>
            <i className="h-[19px] w-px bg-[#e2e6ee]" />
            <button className="px-[7px] py-[5px] hover:text-brand">▦</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="h-[40px] bg-white flex justify-between items-center px-5 text-[#677289] font-mono text-[9px] border-t border-[#e6ebf2] max-[760px]:h-auto max-[760px]:py-3 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-2">
        <span>CVForge © 2025. Editorial Precision CV Engine. &nbsp;•&nbsp; Accounts &amp; Local Storage</span>
        <span>Privacy Manifesto &nbsp;&nbsp; Shortcuts ⌘K &nbsp;&nbsp; Plaintext / JSON Export</span>
      </footer>
      {isTemplateModalOpen && <TemplateModal selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} onClose={() => setIsTemplateModalOpen(false)} onApply={() => setIsTemplateModalOpen(false)} />}
    </div>
  )
}

export default TemplateSelctor
