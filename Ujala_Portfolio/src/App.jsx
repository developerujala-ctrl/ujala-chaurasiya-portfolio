import React, { useEffect, useState } from "react";

const skills = [
  {
    icon: "⌘",
    title: "Programming",
    description: "Writing logical, practical solutions and learning by doing.",
    tags: ["Python", "JavaScript", "Problem Solving"],
  },
  {
    icon: "◈",
    title: "Web Development",
    description: "Building clean, responsive interfaces for the web.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    icon: "▦",
    title: "Data & Databases",
    description: "Exploring data, patterns and structured information.",
    tags: ["SQL", "Pandas", "NumPy", "Data Analysis"],
  },
  {
    icon: "✳",
    title: "Tools & Productivity",
    description: "Creating desktop interfaces and improving everyday workflow.",
    tags: ["Tkinter", "Typing", "Python Programming"],
  },
];

const projects = [
  {
    title: "School Attendance Management System",
    description:
      "A student-focused system concept for organizing attendance records and making daily tracking easier.",
    tags: ["Python", "Database", "Management"],
    status: "CASE STUDY · LEARNING PROJECT",
    visual: "attendance-visual",
    featured: true,
  },
  {
    title: "Real-World Problem Solving",
    description:
      "A collection of programs and practice solutions designed to strengthen logical thinking.",
    tags: ["Python", "Logic", "Algorithms"],
    status: "PRACTICE COLLECTION",
    visual: "problem-visual",
  },
  {
    title: "Library Management System",
    description:
      "A project concept to help organize book details, library records and borrowing workflows.",
    tags: ["Python", "SQL", "CRUD"],
    status: "LEARNING PROJECT",
    visual: "library-visual",
  },
];

const socialLinks = [
  {
    icon: "⌘",
    name: "GitHub",
    description: "Explore my code",
    href: "https://github.com/developerujala-ctrl",
  },
  {
    icon: "in",
    name: "LinkedIn",
    description: "Connect professionally",
    href: "https://www.linkedin.com/in/ujala-chaurasiya-592404440/",
  },
  {
    icon: "✉",
    name: "Email",
    description: "Send me a message",
    href: "mailto:developerujala@gmail.com",
  },
];

function readSavedTheme() {
  try {
    return window.localStorage.getItem("ujala-portfolio-theme") === "light";
  } catch (error) {
    console.warn("The saved theme preference could not be read.", error);
    return false;
  }
}

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="Ujala home">
      <span className="brand-mark">U</span>
      <span>
        ujala<span className="brand-dot">.</span>
      </span>
    </a>
  );
}

function Tags({ items }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function AttendanceVisual() {
  return (
    <div className="project-visual attendance-visual">
      <div className="visual-top">
        <span>PROJECT / 01</span>
        <span className="visual-dot" />
      </div>
      <div className="attendance-ui">
        <div className="mini-sidebar">
          <b>SA</b>
          <i />
          <i />
          <i />
        </div>
        <div className="mini-main">
          <div className="mini-title">Attendance overview</div>
          <div className="mini-stats">
            <span>
              <b>92%</b>
              <small>Present</small>
            </span>
            <span>
              <b>28</b>
              <small>Students</small>
            </span>
          </div>
          <div className="mini-bars">
            {[48, 75, 60, 90, 68, 100, 78].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectVisual({ project, index }) {
  if (project.featured) {
    return <AttendanceVisual />;
  }

  if (project.visual === "problem-visual") {
    return (
      <div className={`project-visual ${project.visual}`}>
        <div className="visual-top">
          <span>PROJECT / 0{index + 1}</span>
          <span>✳</span>
        </div>
        <div className="big-symbol">{"{ }"}</div>
        <div className="terminal-lines">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="visual-caption">THINK → SOLVE → IMPROVE</div>
      </div>
    );
  }

  return (
    <div className={`project-visual ${project.visual}`}>
      <div className="visual-top">
        <span>PROJECT / 0{index + 1}</span>
        <span>↗</span>
      </div>
      <div className="book-stack">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="library-label">LIBRARY / CATALOG</div>
      <div className="library-lines">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article
      className={`project-card${project.featured ? " project-feature" : ""} reveal${index ? ` delay-${index}` : ""}`}
    >
      <ProjectVisual project={project} index={index} />
      <div className="project-info">
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <span className="project-number">0{index + 1}</span>
        </div>
        <p>{project.description}</p>
        <Tags items={project.tags} />
        <span className="project-status">{project.status}</span>
      </div>
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(readSavedTheme);

  useEffect(() => {
    document.body.classList.toggle("light-theme", lightTheme);
    try {
      window.localStorage.setItem(
        "ujala-portfolio-theme",
        lightTheme ? "light" : "dark",
      );
    } catch (error) {
      console.warn("The theme preference could not be saved.", error);
    }
  }, [lightTheme]);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!("IntersectionObserver" in window) || reduceMotion) {
      revealItems.forEach((item) => item.classList.add("visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <header className="site-header">
        <nav className="nav container" aria-label="Main navigation">
          <Brand />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="navLinks"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <div
            className={`nav-links${menuOpen ? " open" : ""}`}
            id="navLinks"
          >
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#achievements" onClick={closeMenu}>Highlights</a>
            <a className="nav-contact" href="#contact" onClick={closeMenu}>
              Let&apos;s talk <span>↗</span>
            </a>
          </div>
          <button
            className="theme-toggle"
            type="button"
            aria-label={lightTheme ? "Switch to dark theme" : "Switch to light theme"}
            title={lightTheme ? "Switch to dark theme" : "Switch to light theme"}
            onClick={() => setLightTheme((theme) => !theme)}
          >
            {lightTheme ? "☾" : "☼"}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero section container" id="home">
          <div className="hero-copy">
            <div className="eyebrow reveal">
              <span className="status-dot" />
              B.TECH IT STUDENT · LUCKNOW, INDIA
            </div>
            <h1 className="reveal delay-1">
              Curious mind.
              <br />
              <span className="gradient-text">Creative coder.</span>
            </h1>
            <p className="hero-intro reveal delay-2">
              Hey, I&apos;m <strong>Ujala Chauraiya</strong> — an aspiring
              developer who enjoys turning ideas into useful, thoughtful
              digital experiences.
            </p>
            <div className="hero-actions reveal delay-3">
              <a className="button button-primary" href="#projects">
                Explore my work <span>↗</span>
              </a>
              <a className="button button-ghost" href="#contact">
                Get in touch <span>↓</span>
              </a>
            </div>
            <div className="hero-meta reveal delay-3">
              <span><i /> Open to learning &amp; collaboration</span>
              <span className="mono">26°50′N · LUCKNOW</span>
            </div>
          </div>
          <div
            className="hero-art reveal delay-2"
            aria-label="Decorative developer illustration"
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="float-chip chip-top">
              <span className="chip-icon">⌘</span> BUILD · LEARN · REPEAT
            </div>
            <div className="code-window">
              <div className="window-bar">
                <span />
                <span />
                <span />
                <b>ujala.py</b>
              </div>
              <div className="code-content">
                <p><span className="code-muted">01</span> <span className="code-purple">class</span> <span className="code-green">Developer</span>:</p>
                <p><span className="code-muted">02</span> &nbsp;&nbsp;name = <span className="code-yellow">&quot;Ujala&quot;</span></p>
                <p><span className="code-muted">03</span> &nbsp;&nbsp;focus = <span className="code-yellow">&quot;building&quot;</span></p>
                <p><span className="code-muted">04</span> &nbsp;&nbsp;skills = [</p>
                <p><span className="code-muted">05</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-yellow">&quot;Python&quot;</span>, <span className="code-yellow">&quot;Web&quot;</span>,</p>
                <p><span className="code-muted">06</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-yellow">&quot;Data&quot;</span></p>
                <p><span className="code-muted">07</span> &nbsp;&nbsp;]</p>
                <p><span className="code-muted">08</span> &nbsp;&nbsp;<span className="code-purple">def</span> <span className="code-blue">keep_growing</span>(self):</p>
                <p><span className="code-muted">09</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-purple">return</span> <span className="code-yellow">&quot;always&quot;</span><span className="cursor">▍</span></p>
              </div>
            </div>
            <div className="float-chip chip-bottom">
              <span className="sparkle">✳</span> Made with curiosity
            </div>
            <div className="hero-orb" />
          </div>
          <a className="scroll-cue" href="#about">
            <span />
            SCROLL TO EXPLORE
          </a>
        </section>

        <section className="section about-section" id="about">
          <div className="container section-grid">
            <div className="section-heading reveal">
              <p className="eyebrow">01 / A LITTLE ABOUT ME</p>
              <h2>
                Learning today.
                <br />
                <span className="muted-heading">Building for tomorrow.</span>
              </h2>
            </div>
            <div className="about-content reveal delay-1">
              <p className="lead">
                I&apos;m a second-year B.Tech student in Information Technology
                at <strong>Babu Sunder Singh Institute of Technology and Management, Lucknow.</strong>
              </p>
              <p>
                I love exploring how technology can solve everyday problems.
                From Python programs to web interfaces and data analysis,
                I&apos;m steadily building my skills one project at a time.
              </p>
              <div className="info-strip">
                <div>
                  <span className="info-label">CURRENTLY</span>
                  <strong>B.Tech · Information Technology</strong>
                </div>
                <div>
                  <span className="info-label">BASED IN</span>
                  <strong>Lucknow, Uttar Pradesh</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section container" id="skills">
          <div className="section-top reveal">
            <div>
              <p className="eyebrow">02 / MY TOOLKIT</p>
              <h2>Skills I&apos;m growing<span className="accent">.</span></h2>
            </div>
            <p className="section-note">
              A mix of programming, web development
              <br />
              and working with data.
            </p>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <article
                className={`skill-card reveal${index ? ` delay-${index}` : ""}`}
                key={skill.title}
              >
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <Tags items={skill.tags} />
              </article>
            ))}
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="container">
            <div className="section-top reveal">
              <div>
                <p className="eyebrow">03 / SELECTED WORK</p>
                <h2>Projects in progress<span className="accent">.</span></h2>
              </div>
              <p className="section-note">
                Small steps, real-world problems.
                <br />
                Each project is a chance to learn.
              </p>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <ProjectCard project={project} index={index} key={project.title} />
              ))}
            </div>
            <p className="project-footnote">
              Project descriptions are introductory summaries. Add repository
              links, screenshots and the exact technologies you used as each
              project is ready to showcase.
            </p>
          </div>
        </section>

        <section className="section container" id="achievements">
          <div className="section-grid achievements-grid">
            <div className="section-heading reveal">
              <p className="eyebrow">04 / MILESTONES</p>
              <h2>
                Showing up.
                <br />
                <span className="muted-heading">Taking part.</span>
              </h2>
            </div>
            <div className="achievement-card reveal delay-1">
              <div className="achievement-icon">✦</div>
              <div>
                <p className="eyebrow">HACKATHON EXPERIENCE</p>
                <h3>Smart India Hackathon (SIH)</h3>
                <p>
                  Participation in SIH — an opportunity to explore innovation,
                  teamwork and solution-oriented thinking.
                </p>
                <span className="achievement-tag">PARTICIPATION</span>
              </div>
              <span className="achievement-arrow">↗</span>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-wrap">
            <div className="contact-copy reveal">
              <p className="eyebrow">05 / YOUR TURN</p>
              <h2>
                Have an idea?
                <br />
                <span className="gradient-text">Let&apos;s connect.</span>
              </h2>
              <p>
                I&apos;m always happy to connect with fellow learners, explore
                opportunities and talk about technology.
              </p>
              <a className="email-link" href="mailto:developerujala@gmail.com">
                developerujala@gmail.com <span>↗</span>
              </a>
            </div>
            <div className="contact-panel reveal delay-1">
              <p className="panel-label">FIND ME AROUND THE WEB</p>
              {socialLinks.map((link) => (
                <a
                  className="social-link"
                  href={link.href}
                  key={link.name}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                >
                  <span className="social-icon">{link.icon}</span>
                  <span>
                    <b>{link.name}</b>
                    <small>{link.description}</small>
                  </span>
                  <span className="social-arrow">↗</span>
                </a>
              ))}
              <div className="availability">
                <span className="status-dot" /> Open to learning opportunities
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <Brand />
        <p>Designed &amp; built with curiosity by Ujala Chauraiya.</p>
        <a href="#home" className="back-top">BACK TO TOP ↑</a>
        <span className="footer-year">© {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}

export default App;
