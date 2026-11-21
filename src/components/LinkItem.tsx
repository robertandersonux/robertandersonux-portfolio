import type { SocialLink } from '../data/socialLinks'

/*
  One link from a SocialLink object. The Hero and the Footer both use this, so the
  "open in a new tab" logic is written once instead of copied into each component.
*/
function LinkItem({ link }: { link: SocialLink }) {
  // Links that stay on this page (like "#contact") are plain links
  if (!link.opensInNewTab) {
    return <a href={link.href}>{link.label}</a>
  }

  return (
    // target="_blank" opens a new tab.
    // rel="noopener noreferrer" is a security habit: it stops the new page from
    // getting any control over this tab through JavaScript.
    <a href={link.href} target="_blank" rel="noopener noreferrer">
      {link.label}
      {/* Sighted visitors can't tell a link will open a new tab, and screen reader
          users can't either. This text is read aloud but hidden on screen
          (see .visually-hidden in index.css). */}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  )
}

export default LinkItem
