// Social and resume links, written once and shared by every component that needs them
// (the Hero and the Footer). Change a URL here and it updates everywhere.

// The resume lives in /public. Files there are copied to the site exactly as they are,
// so "/RobertAndrewAnderson_Resume.pdf" is its real URL and the download keeps a clean name.
// Unlike an import, a typo here won't fail the build, so if you rename the file, update this too.
const resume = '/RobertAndrewAnderson_Resume.pdf'

export type SocialLink = {
  label: string
  href: string
  // true = open in a new tab, so the portfolio stays open behind it
  opensInNewTab?: boolean
}

// Instagram is deliberately left off until it has more UX/front-end content to show.
export const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/robert-andrew-anderson-52925261/',
    opensInNewTab: true,
  },
  { label: 'GitHub', href: 'https://github.com/robertandersonux', opensInNewTab: true },
  { label: 'Resume', href: resume, opensInNewTab: true },
]
