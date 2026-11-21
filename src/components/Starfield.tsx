import { useEffect, useRef } from 'react'
import './Starfield.css'

/*
  Starfield: a glowing blue background with twinkling stars.

  It draws on a <canvas>, an HTML element you paint on with JavaScript,
  pixel by pixel. Canvas suits this because we redraw about 160 stars
  60 times a second. That many separate HTML elements would be slow.
*/

// Each star is stored as numbers between 0 and 1 (a fraction of the canvas size),
// so the stars spread out correctly whatever the screen size.
type Star = {
  x: number      // 0 = left edge, 1 = right edge
  y: number      // 0 = top, 1 = bottom
  radius: number // size in pixels
  phase: number  // where it starts in its twinkle cycle, so they don't all blink together
  speed: number  // how fast it twinkles and drifts
}

const STAR_COUNT = 160

function createStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random(),
    y: Math.random(),
    radius: Math.random() * 1.2 + 0.2,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 1.5 + 0.5,
  }))
}

// The soft glows behind the stars. Each one slowly wanders around a home position.
// color is "R,G,B" so we can fade it out using rgba() below.
//
// Design decision: the main electric blue glow sits LOW (y: 0.65), behind the buttons
// and carousel, not behind the heading. "Robert." is also electric blue, and a
// same-color glow directly behind it washed it out. Keeping the heading on darker
// space protects its contrast without breaking the color system.
const GLOWS = [
  { x: 0.5, y: 0.65, size: 0.42, color: '82,113,255', opacity: 0.38 },  // electric blue (#5271ff), the main glow
  { x: 0.72, y: 0.5, size: 0.3, color: '127,151,255', opacity: 0.2 },   // light blue (#7f97ff)
  { x: 0.28, y: 0.55, size: 0.28, color: '40,70,220', opacity: 0.18 },  // a deeper blue for depth
]

function Starfield() {
  // useRef gives us a handle on the real <canvas> element once React has put it on the page.
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // useEffect runs code AFTER the component appears on the page.
  // The empty [] at the end means "run once, when it first appears".
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d') // ctx ("context") is the object we draw with
    if (!canvas || !ctx) return

    const stars = createStars()

    // If the visitor's OS is set to "reduce motion", draw a still frame instead.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const draw = (seconds: number) => {
      // Keep the canvas sharp on high-resolution (retina) screens:
      // devicePixelRatio is 2 on most phones and Macs, so we draw at double size.
      const dpr = window.devicePixelRatio || 1
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr)
        canvas.height = Math.round(height * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0) // scale up so we can keep thinking in normal CSS pixels
      ctx.clearRect(0, 0, width, height)

      // "lighter" adds overlapping colors together, so glows blend like real light.
      ctx.globalCompositeOperation = 'lighter'

      GLOWS.forEach((glow, i) => {
        // Math.sin swings smoothly between -1 and 1 over time,
        // so each glow drifts back and forth around its home position.
        const cx = (glow.x + 0.1 * Math.sin(seconds * 0.2 + i * 2)) * width
        const cy = (glow.y + 0.07 * Math.cos(seconds * 0.15 + i)) * height
        const r = glow.size * Math.max(width, 600)

        // A radial gradient fades from the color in the middle to transparent at the edge.
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        gradient.addColorStop(0, `rgba(${glow.color},${glow.opacity})`)
        gradient.addColorStop(1, `rgba(${glow.color},0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      })

      for (const star of stars) {
        // Twinkle: brightness swings between 0.25 and 0.8
        const alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(seconds * star.speed + star.phase))

        // Drift: stars creep slowly upward. "% 1" wraps a star that goes off
        // the top back to the bottom (the extra "+ 1) % 1" handles negative numbers).
        const y = (((star.y - seconds * 0.004 * star.speed) % 1) + 1) % 1

        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.beginPath()
        ctx.arc(star.x * width, y * height, star.radius, 0, Math.PI * 2) // a full circle
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over' // back to normal drawing
    }

    // requestAnimationFrame asks the browser to call our function right before
    // the next screen repaint (about 60 times a second), passing the current time.
    let frameId = 0
    const loop = (now: number) => {
      draw(reduceMotion ? 0 : now / 1000)
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)

    // The function returned from useEffect is the "cleanup". React runs it when the
    // component is removed, so the animation doesn't keep running in the background.
    return () => cancelAnimationFrame(frameId)
  }, [])

  // aria-hidden: it's decoration, so screen readers should skip it.
  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}

export default Starfield
