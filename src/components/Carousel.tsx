import { useEffect, useRef } from 'react'
import { projects } from '../data/projects'
import './Carousel.css'

/*
  Carousel: project screenshots that glide sideways along a gentle arc,
  and slow almost to a stop while the mouse is over them.
*/

// Repeat the projects three times so the row is wider than the screen.
// A card that slides off the left edge loops round to the far right.
const cards = [...projects, ...projects, ...projects]

const PIXELS_PER_MS = 0.045 // normal speed: about 45px per second
const HOVER_SPEED = 0.15    // on hover, slow to 15% of normal speed

// Place every card for the current scroll distance.
function positionCards(track: HTMLDivElement, distance: number) {
  const items = track.children as HTMLCollectionOf<HTMLElement>
  if (items.length === 0) return

  const halfWidth = track.clientWidth / 2
  const spacing = items[0].offsetWidth * 1.08 // card width plus a small gap
  const loopLength = spacing * items.length   // total length of the row

  for (let i = 0; i < items.length; i++) {
    // Where this card sits, measured from the center of the screen (0 = dead center).
    // The "% loopLength" wraps it around when it falls off one end.
    const x = ((((i * spacing - distance) % loopLength) + loopLength) % loopLength) - loopLength / 2

    // k runs from about -1 (left edge) through 0 (center) to 1 (right edge)
    const k = x / halfWidth

    // k * k is 0 in the center and grows toward either side, so cards
    // dip lower the further out they are. That's what makes the arc.
    const y = k * k * 70 + 20
    const rotate = k * 14 // tilt outward: left cards lean left, right cards lean right

    items[i].style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`
    // Cards nearer the center sit on top of the ones beside them
    items[i].style.zIndex = String(100 - Math.round(Math.abs(k) * 50))
  }
}

function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  // The speed we're easing toward: 1 normally, HOVER_SPEED on hover.
  // It's a ref, not state, because changing state re-renders the component.
  // We only need the animation loop to read the new value.
  const targetSpeed = useRef(1)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let distance = 0 // how far the row has scrolled, in pixels
    let speed = 1    // current speed, which eases toward targetSpeed
    let lastTime = performance.now()
    let frameId = 0

    const loop = (now: number) => {
      // Time since the last frame. Capped at 50ms so the row doesn't jump
      // ahead after you switch back to this browser tab.
      const elapsed = Math.min(50, now - lastTime)
      lastTime = now

      // Easing: each frame, close 5% of the gap between current and target speed.
      // That's why it glides to a slow crawl on hover instead of stopping dead.
      speed += (targetSpeed.current - speed) * 0.05

      if (!reduceMotion) distance += elapsed * speed * PIXELS_PER_MS

      // We set styles on the elements directly instead of through React state.
      // Updating state 60 times a second would re-render the component every frame.
      positionCards(track, distance)
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    // aria-hidden + tabIndex={-1}: this is a decorative preview. The real,
    // accessible project links are in the Projects section, so screen readers and
    // keyboard users skip these 12 duplicate links.
    <div
      ref={trackRef}
      className="carousel"
      aria-hidden="true"
      onMouseEnter={() => (targetSpeed.current = HOVER_SPEED)}
      onMouseLeave={() => (targetSpeed.current = 1)}
    >
      {cards.map((project, i) => (
        // href="#habit-stacking" (for example) jumps to the card with id="habit-stacking"
        <a
          key={`${project.id}-${i}`}
          href={`#${project.id}`}
          className={
            project.imageFit === 'contain' ? 'carousel__card carousel__card--contain' : 'carousel__card'
          }
          style={{ background: project.imageBackground }}
          tabIndex={-1}
        >
          <img src={project.image} alt="" />
        </a>
      ))}
    </div>
  )
}

export default Carousel
