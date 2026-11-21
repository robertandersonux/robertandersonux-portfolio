import { socialLinks } from '../data/socialLinks'
import LinkItem from './LinkItem'
import logo from '../assets/RAUXFaviconLogo-no-tagline.png'
import './Footer.css'

// The shared social links, plus one link that only the footer needs.
// "...socialLinks" (the spread operator) copies every item from that array into this new one.
const footerLinks = [...socialLinks, { label: 'Contact', href: '#contact' }]

function Footer() {
  // Worked out when the page loads, so the year never goes out of date
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <a href="#top" className="footer__brand">
        <img src={logo} alt="Robert Anderson UX, back to top" className="footer__logo" />
      </a>

      {/* <nav> tells screen readers this is a group of navigation links.
          The aria-label tells it apart from the main nav at the top. */}
      <nav aria-label="Footer">
        <ul className="footer__links">
          {footerLinks.map((link) => (
            <li key={link.label}>
              <LinkItem link={link} />
            </li>
          ))}
        </ul>
      </nav>

      {/* &copy; is the HTML code for the © symbol */}
      <p className="footer__copyright">&copy; {year} Robert Anderson UX</p>
    </footer>
  )
}

export default Footer
