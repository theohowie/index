import { useEffect, useRef, type ReactNode } from 'react'
import './HoverPreview.css'

type HoverPreviewProps = {
  /** Card rendered next to the pointer while the trigger is hovered. */
  preview: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Hover Preview — a floating card that trails the pointer over a trigger.
 *
 * Only active on fine pointers; on touch devices the children render untouched.
 */
export default function HoverPreview({ preview, children, className = '' }: HoverPreviewProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const card = cardRef.current
    if (!wrap || !card) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const offset = 26
    let pointerX = 0
    let pointerY = 0
    let cardX = 0
    let cardY = 0
    let frame = 0
    let running = false
    let visible = false

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max)

    const paint = () => {
      cardX += (pointerX - cardX) * 0.16
      cardY += (pointerY - cardY) * 0.16

      const rect = card.getBoundingClientRect()
      const width = rect.width || 240
      const height = rect.height || 140

      const x = clamp(cardX + offset, 12, window.innerWidth - width - 12)
      const y = clamp(cardY - height * 0.5, 12, window.innerHeight - height - 12)

      card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`

      if (!visible && Math.abs(pointerX - cardX) < 0.6 && Math.abs(pointerY - cardY) < 0.6) {
        running = false
        return
      }
      frame = window.requestAnimationFrame(paint)
    }

    const onEnter = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      cardX = pointerX
      cardY = pointerY
      visible = true
      wrap.dataset.preview = 'true'
      if (!running) {
        running = true
        frame = window.requestAnimationFrame(paint)
      }
    }

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (visible && !running) {
        running = true
        frame = window.requestAnimationFrame(paint)
      }
    }

    const onLeave = () => {
      visible = false
      delete wrap.dataset.preview
    }

    wrap.addEventListener('pointerenter', onEnter)
    wrap.addEventListener('pointermove', onMove, { passive: true })
    wrap.addEventListener('pointerleave', onLeave)

    return () => {
      window.cancelAnimationFrame(frame)
      wrap.removeEventListener('pointerenter', onEnter)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      delete wrap.dataset.preview
    }
  }, [])

  return (
    <div className={`hover-preview ${className}`.trim()} ref={wrapRef}>
      {children}
      <div className="hover-preview-card" ref={cardRef} aria-hidden="true">
        {preview}
      </div>
    </div>
  )
}
