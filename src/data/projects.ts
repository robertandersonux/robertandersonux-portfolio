// Project content lives here, separate from the components that display it.
// To change copy or add a project, edit this file. No JSX needed.

// Importing an image gives back its final URL. Vite also checks that the file
// exists, so a typo in a file name fails the build instead of showing a broken image.
import summarist from '../assets/summarist.png'
import anime from '../assets/anime.png'
import ultraverse from '../assets/ultraverse.png'
import habit from '../assets/Habit-Stacking-Logo-Design.png'
import skinstric from '../assets/skinstric.png' // screenshot of skinstric-rosy.vercel.app
import dailyBrief from '../assets/daily-brief.png' // screenshot of daily-brief-olive.vercel.app

// A TypeScript "type" describes the shape every project must have.
// The "?" marks a field as optional.
export type Project = {
  // Becomes the card's HTML id, so "#summarist" scrolls to the Summarist card.
  // Lowercase with dashes, no spaces.
  id: string
  title: string
  category: string
  description: string
  image: string
  imageAlt: string
  href: string // the main link: the live site (or case study)
  linkLabel: string
  // Optional quieter second link, e.g. the GitHub repo or a prototype
  secondaryLink?: { label: string; href: string }
  tags?: string[]
  // By default images fill their frame and get cropped ("cover").
  // "contain" shows the whole image instead, with imageBackground filling the empty space.
  // Useful for logos and square images.
  imageFit?: 'cover' | 'contain'
  imageBackground?: string
}

export const projects: Project[] = [
  {
    id: 'summarist',
    title: 'Summarist',
    category: 'Web app',
    description:
      'A book summary platform for busy people: gain more knowledge in less time, with summaries for those who barely have time to read.',
    image: summarist,
    imageAlt: 'Summarist home page',
    href: 'https://summarist-tau-one.vercel.app/',
    secondaryLink: { label: 'GitHub', href: 'https://github.com/robertandersonux/summarist' },
    linkLabel: 'View project',
  },
  {
    id: 'anime-search',
    title: 'Anime Search',
    category: 'Web app · OMDB API',
    description:
      'Search thousands of anime titles with ratings, plot summaries and a year filter, powered by OMDB.',
    image: anime,
    imageAlt: 'Anime Search results page',
    href: 'https://robertandersonux.github.io/anime-search-react/',
    secondaryLink: { label: 'GitHub', href: 'https://github.com/robertandersonux/anime-search-react' },
    linkLabel: 'View project',
  },
  {
    id: 'ultraverse',
    title: 'Ultraverse',
    category: 'NFT marketplace',
    description: 'A marketplace to create, sell and collect digital items.',
    image: ultraverse,
    imageAlt: 'Ultraverse marketplace home page',
    href: 'https://roberrt-internship.netlify.app/',
    secondaryLink: { label: 'GitHub', href: 'https://github.com/robertandersonux/roberrt-internship' },
    linkLabel: 'View project',
  },
  {
    id: 'skinstric',
    title: 'Skinstric AI',
    category: 'Internship project · Next.js',
    description:
      "A front-end build of Skinstric AI's skincare analysis experience, created through the Frontend Simplified internship. Built with Next.js (App Router), TypeScript and Tailwind CSS, and deployed on Vercel.",
    image: skinstric,
    imageAlt:
      "Skinstric AI landing page: the headline 'Sophisticated skincare' between 'Discover A.I.' and 'Take Test' buttons",
    href: 'https://skinstric-rosy.vercel.app/',
    linkLabel: 'View project',
    secondaryLink: { label: 'GitHub', href: 'https://github.com/robertandersonux/skinstric' },
  },
  {
    id: 'daily-brief',
    title: 'Daily Brief',
    category: 'Web & mobile app · React + Capacitor',
    description:
      'A daily intentions, check-in and reflection app built around clarity, intention and focus. Designed in Figma Make, then built in React with Capacitor so one codebase runs on the web, Android and iOS.',
    image: dailyBrief,
    imageAlt: "Daily Brief welcome screen: the app icon and name above a 'What should we call you?' name field",
    href: 'https://daily-brief-olive.vercel.app/',
    linkLabel: 'View project',
    secondaryLink: { label: 'GitHub', href: 'https://github.com/robertandersonux/daily-brief' },
  },
  {
    id: 'habit-stacking',
    title: 'Habit Stacking',
    category: 'UX case study',
    description:
      'A UX case study exploring how habit-stacking principles can be applied to a mobile app experience. I led the research, wireframing, and iterative design process to solve for user motivation and consistency, grounding the design in behavioral psychology rather than just aesthetics.',
    image: habit,
    imageAlt: 'Habit Stacking logo: a candle shaped like the letters H and S',
    imageFit: 'contain',
    imageBackground: '#fffcf4', // matches the logo's cream background
    // For now the case study is a PDF in /public. Later it becomes its own page on this site.
    href: '/habit-stacking-case-study.pdf',
    linkLabel: 'Read case study',
    secondaryLink: {
      label: 'View prototype',
      href: 'https://www.figma.com/make/xKV1dRxRbEqyvW3PDHMglJ/Habit-Stacking-App?p=f&fullscreen=1',
    },
    tags: ['Figma', 'UX Research', 'Wireframing'],
  },
]
