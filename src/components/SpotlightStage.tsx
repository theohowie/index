import { useEffect, useRef } from 'react'
import Device from './Device'
import './SpotlightStage.css'

type SpotlightStageProps = {
  baseSrc: string
  revealSrc: string
  alt: string
}

/**
 * 聚光揭示：同一台机器放两张界面，光标处用软圆遮罩露出第二张。
 * 两张图的版位完全一致，所以移动时只是「屏幕内容」在变。
 */
export default function SpotlightStage({ baseSrc, revealSrc, alt }: SpotlightStageProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const layer = revealRef.current
    if (!host || !layer) return

    const rect = () => host.getBoundingClientRect()
    let initial = rect()
    const target = {
      x: initial.left + initial.width / 2,
      y: initial.top + initial.height * 0.46,
    }
    const smooth = { ...target }

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
    }

    window.addEventListener('pointermove', onMove, { passive: true })

    let frame = 0
    const loop = () => {
      smooth.x += (target.x - smooth.x) * 0.1
      smooth.y += (target.y - smooth.y) * 0.1
      const box = rect()
      layer.style.setProperty('--mx', `${smooth.x - box.left}px`)
      layer.style.setProperty('--my', `${smooth.y - box.top}px`)
      frame = requestAnimationFrame(loop)
    }
    loop()

    const onResize = () => {
      initial = rect()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="spot-stage" ref={hostRef} aria-hidden="true">
      <div className="spot-layer spot-base">
        <Device src={baseSrc} alt={alt} width="clamp(196px, 21vw, 298px)" tilt={0} interactive={false} priority />
      </div>
      <div className="spot-layer spot-reveal" ref={revealRef}>
        <Device src={revealSrc} alt={alt} width="clamp(196px, 21vw, 298px)" tilt={0} interactive={false} priority />
      </div>
    </div>
  )
}
