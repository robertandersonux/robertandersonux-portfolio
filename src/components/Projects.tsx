import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import './Projects.css'

function Projects() {
  return (
    // id="projects" is where the nav link and the "View projects" button jump to
    <section id="projects" className="projects">
      <div className="projects__header">
        <p className="projects__eyebrow">Selected work</p>
        <h2 className="projects__title">
          Here are some of my <span className="projects__accent">projects</span>
        </h2>
      </div>

      <div className="projects__list">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Projects
