import { useEffect, useRef, type CSSProperties } from 'react'
import './Device.css'

type DeviceProps = {
  /** Screenshot or any image placed inside the screen. */
  src: string
  alt: string
  /** Frame width: a number (px) or any CSS length, e.g. `clamp(200px, 62vw, 268px)`. */
  width?: number | string
  /** Static rotation on the Y axis, in degrees. */
  tilt?: number
  /** Pointer parallax. Disabled automatically on touch / reduced motion. */
  interactive?: boolean
  /** Skip lazy loading for the hero shot. */
  priority?: boolean
  className?: string
}

/**
 * Device — a studio-lit 3D phone mockup that frames any image.
 *
 * Every screenshot on the site lives inside this component, so swapping a
 * screenshot never touches layout: pass a new `src` and the frame adapts.
 */
export default function Device({
  src,
  alt,
  width = 260,
  tilt = 0,
  interactive = true,
  priority = false,
  className = '',
}: DeviceProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const floatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const float = floatRef.current
    if (!stage || !float || !interactive) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let frame = 0
    let running = false

    const paint = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08

      float.style.transform =
        `rotateX(${(-currentY * 7).toFixed(2)}deg) rotateY(${(tilt + currentX * 9).toFixed(2)}deg)`
      float.style.setProperty('--gx', `${(50 + currentX * 26).toFixed(1)}%`)
      float.style.setProperty('--gy', `${(38 + currentY * 22).toFixed(1)}%`)

      const settled =
        Math.abs(targetX - currentX) < 0.0015 && Math.abs(targetY - currentY) < 0.0015
      if (settled) {
        running = false
        return
      }
      frame = window.requestAnimationFrame(paint)
    }

    const start = () => {
      if (running) return
      running = true
      frame = window.requestAnimationFrame(paint)
    }

    const onEnter = () => {
      stage.dataset.lift = 'true'
      start()
    }

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect()
      targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1
      targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1
      start()
    }

    const onLeave = () => {
      delete stage.dataset.lift
      targetX = 0
      targetY = 0
      start()
    }

    stage.addEventListener('pointerenter', onEnter)
    stage.addEventListener('pointermove', onMove, { passive: true })
    stage.addEventListener('pointerleave', onLeave)

    return () => {
      window.cancelAnimationFrame(frame)
      stage.removeEventListener('pointerenter', onEnter)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
      float.style.removeProperty('transform')
      float.style.removeProperty('--gx')
      float.style.removeProperty('--gy')
      delete stage.dataset.lift
    }
  }, [interactive, tilt])

  return (
    <figure
      className={`device ${className}`.trim()}
      style={
        {
          '--device-w': typeof width === 'number' ? `${width}px` : width,
          '--device-tilt': `${tilt}deg`,
        } as CSSProperties
      }
    >
      <div className="device-stage" ref={stageRef}>
        <div className="device-shadow" aria-hidden="true" />
        <div className="device-float" ref={floatRef}>
          <div className="device-frame">
            <div className="device-screen">
              <img
                src={src}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            </div>
            <span className="device-glare" aria-hidden="true" />
            <span className="device-edge" aria-hidden="true" />
          </div>
          <span className="device-key device-key--power" aria-hidden="true" />
          <span className="device-key device-key--vol-up" aria-hidden="true" />
          <span className="device-key device-key--vol-down" aria-hidden="true" />
        </div>
      </div>
    </figure>
  )
}
