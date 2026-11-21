import ContactForm from './ContactForm'
import './Contact.css'

function Contact() {
  return (
    // id="contact" is the target for every "Let's talk" button and the nav's Contact link
    <section id="contact" className="contact">
      <h2 className="contact__title">
        Have a project in mind?
        <br />
        <span className="contact__muted">Let's talk.</span>
      </h2>

      {/* The form replaced the old "Get in touch" email button. mailto: links only work
          for visitors with an email app set up; a form works for everyone.
          The email address is still offered inside the form as a fallback. */}
      <ContactForm />
    </section>
  )
}

export default Contact
