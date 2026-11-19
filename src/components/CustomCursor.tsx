import { useEffect, useRef } from 'react'
import './CustomCursor.css'

/**
 * Custom Cursor — ring + dot that morphs around hovered items.
 *
 * Behaviour follows the React Bits "Custom Cursor" contract:
 * - the dot tracks the pointer almost 1:1, the ring lags behind with easing
 * - hovering an interactive element grows the ring and shrinks the dot
 * - `data-cursor-label="..."` morphs the ring into a pill that shows the text
 * - pressing the pointer scales everything down
 * - never mounts on touch devices or when the user prefers reduced motion
 *
 * Mark anything hoverable with `data-cursor-target` when it is not a native
 * control, and add `data-cursor-label="..."` to morph the ring into a pill.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLSpanElement>(null)
  const ringRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    const root = document.documentElement
    if (!dot || !ring || !label) return

    root.classList.add('has-custom-cursor')

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let dotX = pointerX
    let dotY = pointerY
    let ringX = pointerX
    let ringY = pointerY
    let frame = 0
    let announced = false

    const render = () => {
      dotX += (pointerX - dotX) * 0.34
      dotY += (pointerY - dotY) * 0.34
      ringX += (pointerX - ringX) * 0.15
      ringY += (pointerY - ringY) * 0.15

      dot.style.transform = `translate3d(${dotX.toFixed(2)}px, ${dotY.toFixed(2)}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`

      frame = window.requestAnimationFrame(render)
    }

    const reveal = () => {
      if (announced) return
      announced = true
      root.dataset.cursorVisible = 'true'
    }

    const hoverable = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null
      return target.closest<HTMLElement>(
        '[data-cursor-target], a, button, summary, [role="button"], input, textarea, select',
      )
    }

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      reveal()

      const el = hoverable(event.target)
      if (!el) {
        if (root.dataset.cursor !== 'default') {
          root.dataset.cursor = 'default'
          label.textContent = ''
        }
        return
      }

      const text = el.dataset.cursorLabel
      if (text) {
        if (label.textContent !== text) label.textContent = text
        root.dataset.cursor = 'label'
      } else {
        if (label.textContent) label.textContent = ''
        root.dataset.cursor = 'link'
      }
    }

    const onDown = () => {
      root.dataset.cursorPress = 'true'
    }
    const onUp = () => {
      delete root.dataset.cursorPress
    }
    const onLeave = () => {
      announced = false
      delete root.dataset.cursorVisible
    }
    const onEnter = () => reveal()

    render()

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      root.classList.remove('has-custom-cursor')
      delete root.dataset.cursor
      delete root.dataset.cursorVisible
      delete root.dataset.cursorPress
    }
  }, [])

  return (
    <div className="cursor-layer" aria-hidden="true">
      <span className="cursor-ring" ref={ringRef}>
        <span className="cursor-label" ref={labelRef} />
      </span>
      <span className="cursor-dot" ref={dotRef} />
    </div>
  )
}
