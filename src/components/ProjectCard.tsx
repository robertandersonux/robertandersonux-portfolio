import type { Project } from '../data/projects'
import './ProjectCard.css'

// Props are the inputs a component receives, like arguments to a function.
// This card gets one project plus its position in the list (used for "01", "02"…).
type ProjectCardProps = {
  project: Project
  index: number
}

// Links that leave this page (other websites, and PDFs like the case study) open in a
// new tab so the portfolio stays open behind them. Links within the page start with "#".
const isExternal = (href: string) => !href.startsWith('#')

// Returns the new-tab attributes for external links, and nothing for internal ones.
// (rel="noopener noreferrer" stops the new page from controlling this tab.)
const newTab = (href: string) =>
  isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}

// Screen-reader-only warning that a link opens a new tab (same idea as LinkItem)
function NewTabHint({ href }: { href: string }) {
  if (!isExternal(href)) return null
  return <span className="visually-hidden"> (opens in a new tab)</span>
}

function ProjectCard({ project, index }: ProjectCardProps) {
  // padStart(2, '0') turns 1 into "01" and leaves 10 as "10".
  const number = String(index + 1).padStart(2, '0')

  // Add the "--contain" modifier class only for projects that ask for it
  const imageClass =
    project.imageFit === 'contain'
      ? 'project-card__image project-card__image--contain'
      : 'project-card__image'

  return (
    // id lets links like "#summarist" (from the hero carousel) scroll straight to this card
    <article id={project.id} className="project-card">
      <div className="project-card__text">
        <p className="project-card__label">
          {number} — {project.category}
        </p>
        <h3 className="project-card__title">{project.title}</h3>

        {/* "&&" renders the list only when the project has tags */}
        {project.tags && (
          <ul className="project-card__tags">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        <p className="project-card__description">{project.description}</p>

        <div className="project-card__links">
          {/* {...newTab(...)} "spreads" the returned object onto the <a> as attributes */}
          <a href={project.href} className="project-card__link" {...newTab(project.href)}>
            {project.linkLabel} <span aria-hidden="true">→</span>
            <NewTabHint href={project.href} />
          </a>

          {/* Only shown for projects that have a second link (GitHub, prototype…) */}
          {project.secondaryLink && (
            <a
              href={project.secondaryLink.href}
              className="project-card__secondary"
              {...newTab(project.secondaryLink.href)}
            >
              {project.secondaryLink.label}
              <NewTabHint href={project.secondaryLink.href} />
            </a>
          )}
        </div>
      </div>

      {/* style={{ ... }} sets inline CSS from data. The outer braces mean "JavaScript here",
          the inner ones are the style object. If imageBackground is missing, no background is set. */}
      <div className={imageClass} style={{ background: project.imageBackground }}>
        {/* loading="lazy" waits to download the image until it is close to the screen */}
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
      </div>
    </article>
  )
}

export default ProjectCard
