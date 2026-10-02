import { useState } from 'react'
import './App.css'

const github = 'https://github.com/RoniF24'
const email = 'ronifadlon1999@gmail.com'
const phoneDisplay = '058-796-1920'
const phoneInternational = '+972587961920'
const whatsappUrl = 'https://wa.me/972587961920'
// Paste a YouTube share or watch URL here to display the Robo-Rick video.
const roboRickVideoUrl = 'https://youtu.be/YCPdoorVm70'
// Add your exact LinkedIn profile URL here when available.
const linkedin = 'https://www.linkedin.com/in/roni-fadlon-b58662238/'
const cvUrl = `${import.meta.env.BASE_URL}Roni-Fadlon-CV.pdf`

const projects = [
  {
    number: '01', category: 'NLP · MACHINE LEARNING', title: 'SkillSight',
    description: 'Making implicit skills visible. An NLP system that identifies technical skills in free text and distinguishes explicit mentions from skills implied by context.',
    detail: 'I led the development from end to end: generating a controlled synthetic dataset, fine-tuning RoBERTa with One-Pass and Pairwise approaches, comparing them with a GPT-4o-mini zero-shot baseline, and analyzing prediction errors.',
    tags: ['Python', 'RoBERTa', 'GPT-4o-mini', 'NLP'],
    facts: [['3,500', 'synthetic examples'], ['136', 'technical skills'], ['73.7%', 'Typed F1@K']],
    note: 'Pairwise result on a 525-example synthetic test set. Generalization to real resumes has not been established.',
    team: 'Academic team: Roni Fadlon, Yonatan Elman, Michael Kovalchuk.',
    links: [['GitHub', 'https://github.com/RoniF24/SkillSight'], ['Trained model', 'https://huggingface.co/Roni1999/pairwise_seed42_epoch3']],
    accent: 'pink',
  },
  {
    number: '02', category: 'AI · INFORMATION RETRIEVAL', title: 'Multi-Source RAG',
    description: 'Helping people find relevant information in documents and receive answers grounded in retrieved sources. Developed in a joint academic project with HIT and the IDF Military Advocate General’s Corps.',
    detail: 'My work included Multi-Query Retrieval, evaluating hierarchical chunking strategies, improving the user interface, and building an automated evaluation framework for retrieval and answer quality.',
    tags: ['Python', 'Azure AI Search', 'Azure OpenAI', 'RAG'],
    facts: [['Retrieve', 'relevant context'], ['Ground', 'answers in sources'], ['Evaluate', 'retrieval & answers']],
    note: 'Only a high-level description is shared. Source code, documents, internal architecture, and demonstrations are not published.',
    team: 'Joint team project with Michael Kovalchuk and additional team members · February–September 2026.', links: [], accent: 'blue',
  },
  {
    number: '03', category: 'FULL-STACK · WEB DEVELOPMENT', title: 'BookConnect',
    description: 'A social platform for book lovers, bringing readers together through public and private groups, posts, comments, search, and real-time conversations.',
    detail: 'The application combines a Next.js and React interface with a Node.js and Express API and MongoDB storage. Features include JWT authentication, membership-based group access, image and video posts, Socket.io chat, and interactive statistics.',
    tags: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    facts: [['JWT', 'authentication'], ['Groups', 'public & private'], ['Live', 'private chat']],
    note: 'Academic project. The repository includes setup instructions; a hosted application demo is not currently linked.',
    team: 'Team: Roni Fadlon and Michael Kovalchuk.',
    links: [['GitHub', 'https://github.com/RoniF24/BookConnect']], accent: 'green',
  },
  {
    number: '04', category: 'ROBOTICS · COMPUTER VISION', title: 'Robo-Rick',
    description: 'An interactive XGO CM4 robot dog controlled by English voice commands and real-time hand gestures. A practical connection between perception, software, and physical movement.',
    detail: 'Vosk handles offline speech recognition. OpenCV and MediaPipe track hand landmarks, while gesture rules translate hand position into movement commands. The implementation includes mode switching, command stabilization, and stop intervals before direction changes.',
    tags: ['Python', 'Vosk', 'OpenCV', 'MediaPipe', 'XGO'],
    facts: [['Voice', 'offline recognition'], ['Vision', 'hand tracking'], ['Motion', 'robot control']],
    note: 'Requires compatible robot hardware, its SDK, a camera, microphone, and a local speech model. This is not a browser simulation.',
    team: '', links: [['GitHub', 'https://github.com/RoniF24/Robo-Rick']], accent: 'orange',
  },
]

const skills = [
  ['Languages', ['Python', 'JavaScript', 'Java', 'C', 'C++', 'C#', 'SQL']],
  ['Web & databases', ['React', 'Next.js', 'Node.js', 'Express', 'HTML', 'CSS', 'REST APIs', 'MongoDB']],
  ['AI & computer vision', ['NLP', 'RAG', 'Azure AI Search', 'Azure OpenAI', 'OpenCV', 'MediaPipe', 'Vosk']],
  ['Tools', ['Git', 'Docker', 'Azure']],
]

function ExternalLink({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span></a>
}


function ContactIcon({ type }) {
  const paths = {
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />,
    whatsapp: <><path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.1-4.8A8.5 8.5 0 1 1 20.5 11.5Z" /><path d="m8 7 2 3-1 1c1 2 2 3 4 4l1-1 3 2c-2 3-8-1-10-5-1-2-1-3 1-4Z" /></>,
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4" /></>,
    github: <><path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.3-1.7-1-2 3-.3 6-1.5 6-6 0-1.2-.4-2.2-1-3 .2-.8.2-2-.3-3 0 0-1.2-.4-3.7 1a13 13 0 0 0-8 0C4.5 3.6 3.3 4 3.3 4c-.5 1-.5 2.2-.3 3-.6.8-1 1.8-1 3 0 4.5 3 5.7 6 6-.7.3-1 1-1 2v4" /></>,
  }
  return <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}

function DownloadCV({ className }) {
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  async function download(event) {
    event.preventDefault()
    setBusy(true)
    setStatus('')
    try {
      const response = await fetch(cvUrl)
      if (!response.ok) throw new Error('Missing file')
      const data = await response.arrayBuffer()
      const signature = new TextDecoder().decode(data.slice(0, 5))
      if (signature !== '%PDF-') throw new Error('Not a PDF')
      const url = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.download = 'Roni-Fadlon-CV.pdf'
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 10000)
    } catch {
      setStatus('The CV is currently unavailable. Please contact me by email or WhatsApp.')
    } finally {
      setBusy(false)
    }
  }
  return <div className="cv-download"><a href={cvUrl} className={className} onClick={download} aria-busy={busy} download="Roni-Fadlon-CV.pdf">{busy ? 'Preparing PDF…' : 'Download CV · PDF'}</a>{status && <p className="download-status" role="status">{status}</p>}</div>
}

function ProjectVideo({ url }) {
  if (!url) return null
  let id = ''
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be') id = parsed.pathname.slice(1)
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(parsed.hostname)) id = parsed.searchParams.get('v') || parsed.pathname.split('/').pop()
  } catch { return null }
  if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return null
  return <div className="project-video"><iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title="Robo-Rick robot demonstration" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /><ExternalLink href={url} className="project-link">Watch on YouTube</ExternalLink></div>
}

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false)
  const detailId = `project-details-${project.number}`
  return (
    <article className={`project-card accent-${project.accent}`}>
      <div className="project-top"><span className="eyebrow">{project.category}</span><span className="project-number">{project.number}</span></div>
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="project-facts">{project.facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      <ul className="tags" aria-label="Project technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div className="project-actions">
        <button className="text-button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls={detailId}>{expanded ? 'Less detail' : 'Project details'}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
        {project.links.map(([label, href]) => <ExternalLink key={href} href={href} className="project-link">{label}</ExternalLink>)}
      </div>
      <div id={detailId} hidden={!expanded} className="project-detail"><p>{project.detail}</p>{project.title === 'Robo-Rick' && <ProjectVideo url={roboRickVideoUrl} />}<p className="project-note">{project.note}</p>{project.team && <p className="team">{project.team}</p>}</div>
    </article>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigation = [['About', '#about'], ['Projects', '#projects'], ['Skills', '#skills'], ['Experience', '#experience'], ['Contact', '#contact']]
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="Roni Fadlon home">RF<span>.</span></a>
        <button className="menu-button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close menu' : 'Menu'}</button>
        <nav id="main-navigation" className={menuOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
        <DownloadCV className="header-cv" />
      </header>
      <main id="main">
        <section id="home" className="hero section-wrap">
          <div className="hero-content"><p className="eyebrow">RONI FADLON · COMPUTER SCIENCE GRADUATE</p><h1>Software.<br />Intelligence.<br /><span>Human curiosity.</span></h1><p className="hero-title">AI & Software Developer</p><p className="hero-description">RAG Systems, Python & Full-Stack Development.<br />Building practical software — from language models to web applications and robotics.</p><div className="hero-actions"><a className="button primary" href="#projects">Explore my work</a><a className="button secondary" href="#contact">Get in touch</a></div><p className="hero-meta">B.Sc. in Computer Science · HIT <span>Open to junior developer opportunities</span></p></div>
          <aside className="hero-panel" aria-label="Areas of project experience"><div className="panel-heading"><span className="eyebrow">A LOOK INSIDE MY WORK</span><span className="panel-label">04 PROJECTS</span></div><a href="#projects" className="panel-row"><span className="panel-index">01</span><div><strong>Language & meaning</strong><p>Finding the skills between the words.</p></div><span className="panel-tag">NLP</span></a><a href="#projects" className="panel-row"><span className="panel-index">02</span><div><strong>Knowledge & context</strong><p>Connecting questions to their sources.</p></div><span className="panel-tag">RAG</span></a><a href="#projects" className="panel-row"><span className="panel-index">03</span><div><strong>People & platforms</strong><p>Bringing a reading community together.</p></div><span className="panel-tag">WEB</span></a><a href="#projects" className="panel-row"><span className="panel-index">04</span><div><strong>Perception & movement</strong><p>Turning voice and gestures into action.</p></div><span className="panel-tag">CV</span></a><div className="panel-footer">Python / JavaScript / React / Azure</div></aside>
        </section>
        <section id="about" className="about section-wrap"><div className="section-heading"><p className="eyebrow">01 / ABOUT</p><h2>Curious by nature.<br />A developer by choice.</h2></div><div className="about-text"><p>I'm a Computer Science graduate from HIT with hands-on project experience in Full-Stack development, NLP, RAG systems, and computer vision. I've built projects ranging from a social platform for book lovers to a system that identifies implicit skills in text and a robot controlled by voice and hand gestures.</p><p>I enjoy understanding how things work and turning complex problems into practical software. My background in teaching mathematics and developing a university-level course has shaped how I break down problems and explain ideas.</p><p>I'm looking for a Junior Software Developer role where I can contribute, learn from experienced developers, and keep growing.</p><div className="about-summary"><span><strong>89.58</strong>Final GPA</span><span><strong>HIT</strong>B.Sc. Computer Science</span><span><strong>Israel</strong>Or Yehuda</span></div></div></section>
        <section id="projects" className="projects section-wrap"><div className="section-heading heading-inline"><div><p className="eyebrow">02 / SELECTED WORK</p><h2>Different challenges.<br />One drive to build.</h2></div><p>Four projects spanning AI, web development, and robotics. Explore the ideas, technologies, and work behind them.</p></div><div className="projects-grid">{projects.map(project => <ProjectCard key={project.number} project={project} />)}</div></section>
        <section id="skills" className="skills section-wrap"><div className="section-heading"><p className="eyebrow">03 / TECHNICAL SKILLS</p><h2>My toolkit.</h2><p>Technologies I've worked with through my studies and projects.</p></div><div className="skills-grid">{skills.map(([title, items]) => <div className="skill-group" key={title}><h3>{title}</h3><ul className="tags">{items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></section>
        <section id="experience" className="experience section-wrap"><div className="section-heading"><p className="eyebrow">04 / EXPERIENCE & EDUCATION</p><h2>Learning.<br />Building. Teaching.</h2></div><div className="timeline"><article><p className="timeline-date">FEB – SEP 2026</p><h3>AI Software Developer · Joint RAG Project</h3><p className="timeline-org">HIT & IDF Military Advocate General’s Corps</p><p>Developed and improved document retrieval and source-grounded answers, with work on retrieval strategies, the user interface, and automated evaluation.</p></article><article><p className="timeline-date">NOV 2025 – SEP 2026</p><h3>Private Math Tutor</h3><p className="timeline-org">Learning Center</p><p>Delivered one-on-one and group instruction, with practice tailored to students' individual needs.</p></article><article><p className="timeline-date">AUG 2025 – APR 2026</p><h3>Course Developer & Instructor</h3><p className="timeline-org">CS24</p><p>Developed and taught a digital Calculus II course for Computer Science students.</p></article><article><p className="timeline-date">2024 – 2026</p><h3>B.Sc. in Computer Science</h3><p className="timeline-org">Holon Institute of Technology · HIT</p><p>Final GPA: 89.58 / 100.</p></article></div></section>
        <section id="contact" className="contact section-wrap">
          <div><p className="eyebrow">05 / CONTACT</p><h2>Let’s build<br /><span>something together.</span></h2><p>Open to junior software development opportunities,<br />interesting projects, and collaborations.</p></div>
          <div className="contact-links">
            <div className="contact-tiles">
              <a className="contact-tile" href={`tel:${phoneInternational}`}><ContactIcon type="phone" /><span>Call me</span><small>{phoneDisplay}</small></a>
              <ExternalLink className="contact-tile whatsapp" href={whatsappUrl}><ContactIcon type="whatsapp" /><span>WhatsApp</span><small>Send a message</small></ExternalLink>
              <a className="contact-tile" href={`mailto:${email}`}><ContactIcon type="email" /><span>Email</span><small>Let's talk</small></a>
              {linkedin && <ExternalLink className="contact-tile" href={linkedin}><ContactIcon type="linkedin" /><span>LinkedIn</span><small>My profile</small></ExternalLink>}
              <ExternalLink className="contact-tile" href={github}><ContactIcon type="github" /><span>GitHub</span><small>Explore my code</small></ExternalLink>
            </div>
            <DownloadCV className="cv-wide" />
            <a className="contact-email" href={`mailto:${email}`}>{email}</a>
          </div>
        </section>
      </main>
      <footer className="site-footer"><a href="#home" className="wordmark">RF<span>.</span></a><p>© {new Date().getFullYear()} Roni Fadlon</p><a href="#home">Back to top</a></footer>
    </>
  )
}
export default App
