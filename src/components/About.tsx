// Lucide icons are React components: <Rocket /> draws an SVG rocket.
// SVGs stay sharp at any size and take their color from CSS (via currentColor).
import { PenTool, CodeXml, Rocket, type LucideIcon } from 'lucide-react'
import './About.css'

// The three stages of how I work. Design → Build → Ship is the "no handoff"
// story in visual form: one person, start to finish.
type ToolGroup = {
  title: string
  icon: LucideIcon // the type for "any Lucide icon component"
  items: string[]
}

const toolGroups: ToolGroup[] = [
  {
    title: 'Design',
    icon: PenTool,
    items: ['Figma', 'Figma Make', 'User research', 'Prototyping', 'Accessibility (WCAG)'],
  },
  {
    title: 'Build',
    icon: CodeXml,
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Ship',
    icon: Rocket,
    items: ['Git & GitHub', 'Vercel', 'Netlify', 'Capacitor'],
  },
]

function About() {
  return (
    // id="about" is the target for the nav's About link
    <section id="about" className="about">
      <div className="about__intro">
        {/* Same eyebrow + heading pattern as the Projects section, for consistency.
            The heading is the title, not "About Me": a recruiter skimming should
            see what I do, and the eyebrow already says which section this is. */}
        <p className="about__eyebrow">About me</p>
        <h2 className="about__title">
          UX Designer &amp; <span className="about__accent">Front-End Developer</span>
        </h2>

        <p className="about__text">
          I work at the intersection of design and development, combining user-centered thinking
          with hands-on technical skills to create intuitive, functional digital experiences.
        </p>
        <p className="about__text">
          With a foundation in UX design and experience building applications using React and
          TypeScript, I approach every project from both perspectives. From research and
          prototyping to responsive front-end development, I turn ideas into thoughtful, engaging
          products through design and code.
        </p>
      </div>

      <div className="about__tools">
        <h3 className="about__subtitle">
          From concept to <span className="about__accent">code.</span>
        </h3>
        <p className="about__subtext">
          The tools and disciplines I use to design, build, and deliver digital experiences.
        </p>

        <ul className="about__cards">
          {toolGroups.map((group) => {
            // A component has to be stored under a capitalized name before JSX can use it:
            // <group.icon /> would work too, but <Icon /> reads more clearly.
            const Icon = group.icon
            return (
              <li key={group.title} className="about__card">
                {/* aria-hidden: the title next to it already says what the icon means */}
                <Icon className="about__icon" size={28} strokeWidth={1.75} aria-hidden="true" />
                <h4 className="about__card-title">{group.title}</h4>
                <ul className="about__list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default About
