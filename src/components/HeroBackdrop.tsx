import { useEffect, useRef } from 'react'
import './HeroBackdrop.css'

type Props = {
  baseSrc: string
  revealSrc: string
}

/**
 * 首屏背景：一张铺满的底图 + 一层被光标软圆遮罩露出的第二张图。
 * 两张图同版位同尺寸，移动时光圈像一盏扫过去的灯。
 */
export default function HeroBackdrop({ baseSrc, revealSrc }: Props) {
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = revealRef.current
    if (!layer) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let targetX = window.innerWidth * 0.5
    let targetY = window.innerHeight * 0.42
    let x = targetX
    let y = targetY
    let frame = 0

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
    }

    const loop = () => {
      x += (targetX - x) * 0.1
      y += (targetY - y) * 0.1
      layer.style.setProperty('--mx', `${x.toFixed(1)}px`)
      layer.style.setProperty('--my', `${y.toFixed(1)}px`)
      frame = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    loop()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <>
      <div className="hero-bg" style={{ backgroundImage: `url(${baseSrc})` }} aria-hidden="true" />
      <div
        className="hero-reveal"
        ref={revealRef}
        style={{ backgroundImage: `url(${revealSrc})` }}
        aria-hidden="true"
      />
    </>
  )
}
