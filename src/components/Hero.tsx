import Starfield from './Starfield'
import Carousel from './Carousel'
import { socialLinks } from '../data/socialLinks'
import LinkItem from './LinkItem'
import './Hero.css'

function Hero() {
  return (
    // id="top" is the target for the nav brand link (href="#top")
    <header id="top" className="hero">
      {/* Layer 1: the animated background, sitting behind everything */}
      <Starfield />

      {/* Layer 2: the text and buttons, on top of the background */}
      <div className="hero__content">
        <h1 className="hero__title">
          Hey
          <br />
          I'm <span className="hero__accent">Robert.</span>
        </h1>

        <p className="hero__subtitle">UX Designer &amp; <span className="nowrap">Front-End</span> Developer</p>

        <div className="hero__actions">
          <a href="#projects" className="button button--white">
            View projects
          </a>
          <a href="#contact" className="button button--orange">
            Let's talk <span aria-hidden="true">→</span>
          </a>
        </div>

        <ul className="hero__social">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <LinkItem link={link} />
            </li>
          ))}
        </ul>
      </div>

      {/* Layer 3: the moving project tiles */}
      <Carousel />
    </header>
  )
}

export default Hero
