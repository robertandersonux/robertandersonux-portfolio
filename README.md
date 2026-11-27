# Robert Anderson UX Portfolio

My portfolio as a UX designer and front-end developer. I design in Figma and build it myself in React and TypeScript, so this site is both the showcase and an example of the work.

## Features

- Project cards with screenshots, live-site links and code links
- A project carousel that slows down when you hover over it
- About section, résumé download and a Habit Stacking case study PDF
- Contact form handled by Netlify Forms, with a hidden spam trap
- Respects the reduced-motion setting for visitors who turn off animations

## Built with

React · TypeScript · Vite · Netlify

## Getting started

Requires Node 20.19 or newer (run `node -v` to check).

    git clone https://github.com/robertandersonux/robertandersonux-portfolio.git
    cd robertandersonux-portfolio
    npm install
    npm run dev

Then open http://localhost:5173 (or the port shown in your terminal).

The contact form only sends messages on the deployed Netlify site, not on your local copy.

## Editing projects

All project copy lives in `src/data/projects.ts`, separate from the components that display it. Add or change a project there; no JSX needed.
