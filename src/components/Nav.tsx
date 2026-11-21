// White-text version, made for dark backgrounds like this nav.
// (The "-for-light-bg" version has dark text, for light backgrounds.)
import logo from '../assets/RobertAndersonUXLogo-no-tagline.png'
import './Nav.css'

// Keeping the links in an array means adding a page later is a one-line change.
// The hrefs are "#id" anchors that jump to the section with that id on this page.
const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      {/* The alt text is what screen readers announce for this link,
          so it should say what the logo says */}
      <a href="#top" className="nav__brand">
        <img src={logo} alt="Robert Anderson UX" className="nav__logo" />
      </a>

      <ul className="nav__links">
        {links.map((link) => (
          // React needs a unique "key" on each item in a list so it can track them between renders.
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      {/* Same classes as the Hero's button, so the two always match */}
      <a href="#contact" className="button button--orange">
        Let's talk <span aria-hidden="true">→</span>
      </a>
    </nav>
  )
}

export default Nav
