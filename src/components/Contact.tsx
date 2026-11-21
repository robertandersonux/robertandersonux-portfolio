import './Contact.css'

// TODO: replace with the email address you want visitors to use.
// "mailto:" links open the visitor's email app with a new message to that address.
const EMAIL_LINK = 'mailto:robert@robertandersonux.com'

function Contact() {
  return (
    // id="contact" is the target for every "Let's talk" button and the nav's Contact link
    <section id="contact" className="contact">
      <h2 className="contact__title">
        Have a project in mind?
        <br />
        <span className="contact__muted">Let's talk.</span>
      </h2>

      {/* The page's final call to action, so it uses the primary (orange) button */}
      <a href={EMAIL_LINK} className="button button--orange contact__button">
        Get in touch <span aria-hidden="true">→</span>
      </a>
    </section>
  )
}

export default Contact
