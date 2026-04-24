import { assetUrl } from "../utils/assetUrl";

export default function Resume() {
  return (
    <main className="max-w-5xl w-full mx-auto px-6 py-16 pt-12">

      {/* ── Header ── */}
      <header className="mb-12 pb-10 border-b border-neutral-200">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900 mb-2">
              Roys A Kareem
            </h1>
            <p className="text-xl text-primary-600 font-medium mb-5">
              Product Designer · UX Designer · Frontend Developer
            </p>
            <div className="flex flex-wrap gap-4 text-neutral-500">
              <a href="tel:+919846666988" className="inline-flex items-center gap-1.5 hover:text-primary-600 transition-colors">
                <span className="material-symbols-rounded text-base!">phone</span>
                +91 98466 66988
              </a>
              <a href="mailto:roysak@gmail.com" className="inline-flex items-center gap-1.5 hover:text-primary-600 transition-colors">
                <span className="material-symbols-rounded text-base!">mail</span>
                roysak@gmail.com
              </a>
              <a href="https://in.linkedin.com/in/roysak" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary-600 transition-colors">
                <span className="material-symbols-rounded text-base!">open_in_new</span>
                linkedin.com/in/roysak
              </a>
            </div>
          </div>
          <div>
            <a href={assetUrl('/resumes/Roys_Resume.pdf')} download className="px-4 py-2 inline-flex items-center gap-2 rounded-full bg-primary-600  text-white hover:bg-primary-800 transition-colors">
              <span className="material-symbols-rounded text-base!">download</span>
              Download Resume
            </a>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* ── Left Column ── */}
        <aside className="lg:col-span-1 flex flex-col gap-16">

          {/* Summary */}
          <section>
            <h2 className="text-2xl font-semibold tracking-widest text-primary-600 uppercase mb-3">Summary</h2>
            <p className="text-neutral-600 leading-relaxed ">
              Product Designer with 15+ years of experience delivering scalable UX solutions and enterprise-grade frontend applications. Specialized in design systems, workflow automation platforms, and AI-assisted development. Proven ability to improve usability, accelerate development cycles, and bridge design with engineering using Angular, React, and modern AI tools.
            </p>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-semibold tracking-widest text-primary-600 uppercase mb-4">Skills</h2>
            <div className="flex flex-col gap-8">
              <div>
                <p className="font-semibold text-neutral-800 uppercase tracking-wide mb-2">UX Design</p>
                <div className="flex flex-wrap gap-x-4">
                  {["User Research", "Wireframing", "Prototyping", "Interaction Design", "Design Systems"].map(s => (
                    <span key={s} className="py-1 text-primary-700">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-neutral-800 uppercase tracking-wide mb-2">Frontend</p>
                <div className="flex flex-wrap gap-x-4">
                  {["HTML5", "CSS3", "SCSS", "TailwindCSS", "JavaScript", "TypeScript", "Angular", "React"].map(s => (
                    <span key={s} className="py-1 text-neutral-700">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-neutral-800 uppercase tracking-wide mb-2">Tools</p>
                <div className="flex flex-wrap gap-x-4">
                  {["Figma", "Adobe XD", "GitHub Copilot", "Claude", "Gemini", "AI-Assisted Dev"].map(s => (
                    <span key={s} className="py-1 text-neutral-700">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-neutral-800 uppercase tracking-wide mb-2">Accessibility</p>
                <div className="flex flex-wrap gap-x-4">
                  {["WCAG", "Responsive Design"].map(s => (
                    <span key={s} className="py-1 text-neutral-700">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="hidden lg:block">
            <h2 className="text-2xl font-semibold tracking-widest text-primary-600 uppercase mb-4">Certifications</h2>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Google UX Design", issuer: "Google", year: "2023" },
                { name: "Claude Code in Action", issuer: "Anthropic", year: "2026" },
                { name: "Enterprise Design Thinking Practitioner", issuer: "IBM", year: "2023" },
                { name: "Creative Coding", issuer: "Domestika", year: "2023" },
              ].map(cert => (
                <li key={cert.name} className="flex flex-col">
                  <span className="font-medium text-neutral-800">{cert.name}</span>
                  <span className="text-neutral-500">{cert.issuer} · {cert.year}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Education */}
          <section className="hidden lg:block">
            <h2 className="text-2xl font-semibold tracking-widest text-primary-600 uppercase mb-4">Education</h2>
            <div>
              <p className="font-medium text-neutral-800">Bachelor of Commerce (BCom)</p>
              <p className="text-neutral-500">MA College, Kothamangalam</p>
              <p className="text-neutral-400">2003 – 2005</p>
            </div>
          </section>
        </aside>

        {/* ── Right Column ── */}
        <div className="lg:col-span-2 flex flex-col gap-16">

          {/* Key Achievements */}
          <section className="bg-primary-50 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold tracking-widest text-primary-600 uppercase mb-4">Key Achievements</h2>
            <ul className="flex flex-col gap-3">
              {[
                "Reduced design-to-development cycle time by ~40% using AI-assisted workflows",
                "Built scalable design systems adopted across multiple enterprise applications",
                "Improved workflow efficiency and usability in automation platforms",
                "Delivered multiple enterprise UX solutions impacting large-scale users",
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 mt-1.5"></span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-2xl font-semibold tracking-widest text-primary-600 uppercase mb-6">Experience</h2>
            <div className="flex flex-col gap-8">

              {/* UST */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
                  <h3 className="text-xl  font-semibold text-neutral-900">UST</h3>
                  <span className="text-neutral-400 shrink-0">Dec 2016 – Present</span>
                </div>

                {/* SmartOps */}
                <div className="border-l-2 border-primary-200 pl-4 mb-12">
                  <p className="font-semibold text-primary-600 uppercase tracking-wide mb-0.5">SmartOps</p>
                  <p className="text-neutral-400 mb-1">Automation Workflow Builder · AI Marketplace · Dashboard Builder</p>
                  <p className="font-medium text-neutral-700 mb-2">Specialist I – UX Design <span className="font-normal text-neutral-400">· Sep 2021 – Present</span></p>
                  <ul className="flex flex-col gap-1.5">
                    {[
                      "Designed and developed workflow builder, AI marketplace, and dashboard systems",
                      "Improved UI consistency by ~40% through centralized design system",
                      "Accelerated prototyping using AI tools, reducing effort by ~30%",
                      "Built Theme Builder for PrimeNG using Angular, GitHub Copilot and VS Code",
                      "Collaborated with engineering teams for scalable frontend implementation",
                    ].map(b => (
                      <li key={b} className="flex items-start gap-2 text-neutral-600">
                        <span className="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-2"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Xtract Web */}
                <div className="border-l-2 border-neutral-200 pl-4 mb-12">
                  <p className="font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">Xtract Web</p>
                  <p className="font-medium text-neutral-700 mb-2">UI Designer / Developer <span className="font-normal text-neutral-400">· Sep 2020 – Aug 2021</span></p>
                  <ul className="flex flex-col gap-1.5">
                    {[
                      "Designed and developed enterprise web interfaces",
                      "Improved performance and usability of internal tools",
                      "Built responsive UI using HTML, SCSS, JavaScript, Blazor",
                    ].map(b => (
                      <li key={b} className="flex items-start gap-2 text-neutral-600">
                        <span className="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-2"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CrystalBall */}
                <div className="border-l-2 border-neutral-200 pl-4 mb-12">
                  <p className="font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">CrystalBall <span className="normal-case font-normal text-neutral-400">(Internal)</span></p>
                  <p className="font-medium text-neutral-700 mb-2">UI Designer / Developer <span className="font-normal text-neutral-400">· Apr 2020 – Aug 2020</span></p>
                  <ul className="flex flex-col gap-1.5">
                    {[
                      "Designed UI systems, mockups, and prototypes",
                      "Contributed to Angular-based frontend development",
                    ].map(b => (
                      <li key={b} className="flex items-start gap-2 text-neutral-600">
                        <span className="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-2"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ticket Booking */}
                <div className="border-l-2 border-neutral-200 pl-4 mb-8">
                  <p className="font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">Ticket Booking</p>
                  <p className="font-medium text-neutral-700 mb-2">UI Designer / Developer <span className="font-normal text-neutral-400">· Dec 2016 – Mar 2020</span></p>
                  <ul className="flex flex-col gap-1.5">
                    {[
                      "Started as UI Designer and transitioned to frontend developer",
                      "Improved accessibility (WCAG compliance)",
                      "Built Angular-based frontend features",
                    ].map(b => (
                      <li key={b} className="flex items-start gap-2 text-neutral-600">
                        <span className="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-2"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Vtrio */}
              <div className="pt-2 border-t border-neutral-100">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <h3 className="text-xl  font-semibold text-neutral-900">Vtrio Solutions Pvt Ltd</h3>
                  <span className="text-neutral-400 shrink-0">2005 – 2016</span>
                </div>
                <p className="font-medium text-neutral-700 mb-2">UI Designer / Developer</p>
                <ul className="flex flex-col gap-1.5">
                  {[
                    "Designed web and mobile interfaces",
                    "Developed UI themes and frontend components",
                    "Worked with WordPress, Magento, Shopify, PHP, jQuery",
                  ].map(b => (
                    <li key={b} className="flex items-start gap-2 text-neutral-600">
                      <span className="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-2"></span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="lg:hidden">
            <h2 className="text-2xl font-semibold tracking-widest text-primary-600 uppercase mb-4">Certifications</h2>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Google UX Design", issuer: "Google", year: "2023" },
                { name: "Claude Code in Action", issuer: "Anthropic", year: "2026" },
                { name: "Enterprise Design Thinking Practitioner", issuer: "IBM", year: "2023" },
                { name: "Creative Coding", issuer: "Domestika", year: "2023" },
              ].map(cert => (
                <li key={cert.name} className="flex flex-col">
                  <span className="font-medium text-neutral-800">{cert.name}</span>
                  <span className="text-neutral-500">{cert.issuer} · {cert.year}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Education */}
          <section className="lg:hidden">
            <h2 className="text-2xl font-semibold tracking-widest text-primary-600 uppercase mb-4">Education</h2>
            <div>
              <p className="font-medium text-neutral-800">Bachelor of Commerce (BCom)</p>
              <p className="text-neutral-500">MA College, Kothamangalam</p>
              <p className="text-neutral-400">2003 – 2005</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
