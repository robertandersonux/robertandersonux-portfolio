import { useState, type FormEvent } from 'react'
import './ContactForm.css'

const EMAIL = 'robert@robertandersonux.com'

// The form is always in exactly one of these states. Listing them as a type means
// TypeScript catches typos like setStatus('sucess').
type Status = 'idle' | 'sending' | 'success' | 'error'

function ContactForm() {
  // useState stores a value that, when changed, re-renders the component.
  // Here it decides what to show: the form, a "Sending…" button, a thank-you, or an error.
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Normally submitting a form reloads the page. preventDefault stops that,
    // so we can send the data in the background and stay on the page.
    event.preventDefault()
    setStatus('sending')

    // FormData collects every field in the form by its "name" attribute.
    const form = event.currentTarget
    const formData = new FormData(form)

    // Netlify expects the data in the same format a plain HTML form sends
    // ("name=Robert&email=..."). URLSearchParams builds exactly that.
    const body = new URLSearchParams()
    formData.forEach((value, key) => body.append(key, String(value)))

    try {
      // Netlify watches for form posts to the site and saves them as submissions.
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) throw new Error(`Status ${response.status}`)

      form.reset() // clear the fields
      setStatus('success')
    } catch {
      // Network failure or Netlify rejected it. Keep what they typed so nothing is lost.
      setStatus('error')
    }
  }

  // After a successful send, swap the form for a thank-you message.
  if (status === 'success') {
    return (
      // role="status" makes screen readers announce this message when it appears
      <p className="contact-form__message" role="status">
        Thanks! I'll get back to you as soon as possible, typically within 1–2 business days.
      </p>
    )
  }

  return (
    <form name="contact" className="contact-form" onSubmit={handleSubmit}>
      {/* Tells Netlify which form this is. Must match the hidden form in index.html. */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Spam trap ("honeypot"): hidden from people, but spam bots fill in every field.
          If this field has a value, Netlify quietly discards the submission. */}
      <p className="visually-hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {/* htmlFor connects each label to its input (by id), so clicking the label focuses
          the field and screen readers read the label when the field is focused.
          autoComplete lets browsers offer to fill in the visitor's name and email. */}
      <div className="contact-form__field">
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" type="text" name="name" autoComplete="name" required />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">Email</label>
        {/* type="email" makes the browser check it looks like an email and shows the
            @ key on phone keyboards */}
        <input id="contact-email" type="email" name="email" autoComplete="email" required />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows={5} required />
      </div>

      <button
        type="submit"
        className="button button--orange contact-form__submit"
        disabled={status === 'sending'} // stops double-sending while the first send is in progress
      >
        {status === 'sending' ? 'Sending…' : 'Send it my way'} <span aria-hidden="true">→</span>
      </button>

      {status === 'error' && (
        // role="alert" makes screen readers announce the error right away
        <p className="contact-form__error" role="alert">
          Something went wrong and your message didn't send. Please try again, or email me
          directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      )}

      <p className="contact-form__note">
        I'll get back to you as soon as possible, typically within 1–2 business days. Prefer email? <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </form>
  )
}

export default ContactForm
