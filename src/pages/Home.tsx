import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/assetUrl';
const Sculpture = lazy(() => import('../components/Sculpture'));

export default function Home() {
  return <main className="studio-home" id="main-content">
    <section className="hero studio-container" aria-labelledby="hero-title">
      <div className="hero-kicker"><span className="status-dot" /> A little strategy. A lot of curiosity.<span className="hero-edition">PORTFOLIO / 2026</span></div>
      <div className="hero-composition">
        <div className="hero-copy"><p className="eyebrow">ROYS A KAREEM — DESIGNER & DEVELOPER</p><h1 id="hero-title">Thoughtfully<br />designed.<br /><em>Playfully</em> built<span className="orange-period">.</span></h1><p className="hero-description">I turn complex problems into intuitive digital experiences. From the first “what if” to the last line of code.</p><a className="pill-button" href="#explore">Explore my work <span aria-hidden="true">↗</span></a></div>
        <div className="hero-art"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><span className="art-coordinate">FIG. 01 — IDEAS IN MOTION</span><span className="art-note">A meeting of<br /><em>logic & imagination.</em></span><span className="art-cross" aria-hidden="true">+</span></div>
      </div>
      <div className="hero-baseline"><p>15+ years of connecting<br /><strong>people, pixels & possibilities.</strong></p><span className="hero-baseline-center">UX DESIGN · FRONTEND DEVELOPMENT · CREATIVE CODE</span><a href="#explore" className="scroll-link">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
      <Suspense fallback={null}><Sculpture /></Suspense>
    </section>
    <div className="discipline-strip" aria-label="Design disciplines"><span>Human-centered thinking</span><i>✳</i><span>Digital craftsmanship</span><i>✳</i><span>Creative exploration</span><i>✳</i><span>Built with intention</span><i>✳</i></div>
    <section id="explore" className="explore-section studio-container">
      <div className="section-heading"><div><p className="eyebrow">01 / THE PRACTICE</p><h2>Different mediums.<br /><em>Same curiosity.</em></h2></div><p>Good design makes things feel simple.<br />Great craft makes them feel alive.<br />Here’s where the two meet.</p></div>
      <div className="practice-grid">
        <Link to="/case-studies" className="practice-card case-card"><div className="practice-visual case-visual"><span className="visual-label">THE THINKING BEHIND THE INTERFACE</span><div className="abstract-interface"><div className="interface-sidebar"><b>✳</b><i /><i /><i /></div><div className="interface-body"><span>Make complexity feel simple.</span><div className="interface-chart">{[35,65,48,85,63,100,80].map((height,i) => <i key={i} style={{height: `${height}%`}} />)}</div><div className="interface-lines"><i /><i /></div></div><span className="interface-cursor">↖ <b>Clarity, by design</b></span></div><span className="visual-bottom">RESEARCH → INSIGHT → IMPACT</span></div><div className="practice-caption"><div><span className="eyebrow">STRATEGY & EXPERIENCE</span><h3>Behind the decisions</h3><p>Case studies on making complex products work for people.</p></div><span className="round-arrow" aria-hidden="true">↗</span></div></Link>
        <Link to="/works" className="practice-card craft-card"><div className="practice-visual craft-visual"><span className="visual-label">A PLAYGROUND FOR IDEAS</span><div className="craft-flower" aria-hidden="true">{Array.from({length:12},(_,i) => <i key={i} style={{transform: `rotate(${i*30}deg)`}} />)}<b /></div><span className="craft-code">&lt;create&gt;<br />&nbsp; something unexpected.<br />&lt;/create&gt;</span><span className="visual-bottom">EXPERIMENT → MAKE → REPEAT</span></div><div className="practice-caption"><div><span className="eyebrow">CRAFT & CODE</span><h3>Beyond the expected</h3><p>Applications, creative coding, and digital paintings.</p></div><span className="round-arrow" aria-hidden="true">↗</span></div></Link>
      </div>
    </section>
    <section className="about-section studio-container"><div className="about-image"><img src={assetUrl('/img/design-meets-code.webp')} alt="Abstract orange ribbon, wireframe grid, and olive sphere on paper" loading="lazy" /><span>WHERE IDEAS TAKE SHAPE ↗</span></div><div className="about-copy"><p className="eyebrow">02 / A LITTLE ABOUT ME</p><h2>A designer’s eye.<br />A developer’s mind.<br /><em>An explorer’s heart.</em></h2><p>I’m Roys, a product designer and frontend developer with 15+ years of experience bridging design and engineering. I build thoughtful interfaces, scalable design systems, and experiences that make everyday work a little easier.</p><p>Outside the brief, you’ll find me exploring generative art, digital painting, and the possibilities of creative code.</p><Link to="/resume" className="text-link">The journey, tools & milestones <span>↗</span></Link></div></section>
    <section className="notes-section studio-container"><p className="eyebrow">03 / NOTES FROM THE DESK</p><Link to="/blog"><h2>Learning out loud<span>↗</span></h2><p>Design perspectives, development guides, and useful little cheatsheets.</p></Link></section>
  </main>;
}
