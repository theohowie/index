import { useEffect, useRef, type ReactNode } from 'react'
import './UserCursor.css'

type UserCursorProps = {
  /** 名牌上的文字。 */
  label: string
  children: ReactNode
  className?: string
}

/**
 * User Cursor — 带名牌的光标，像协作工具里另一个人的鼠标。
 *
 * 悬停 children 时出现：箭头跟手，名牌用一点点延迟追上，
 * 同时把全站的环形光标暂时收起来，避免两个光标打架。
 * 触屏与 reduced-motion 下不挂载，原生光标照常。
 */
export default function UserCursor({ label, children, className = '' }: UserCursorProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const layer = layerRef.current
    if (!wrap || !layer) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let frame = 0
    let running = false
    let active = false

    const paint = () => {
      currentX += (targetX - currentX) * 0.2
      currentY += (targetY - currentY) * 0.2
      layer.style.transform =
        `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`

      const settled =
        Math.abs(targetX - currentX) < 0.3 && Math.abs(targetY - currentY) < 0.3
      if (settled && !active) {
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

    const onEnter = (event: PointerEvent) => {
      active = true
      targetX = event.clientX
      targetY = event.clientY
      currentX = event.clientX
      currentY = event.clientY
      layer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      wrap.dataset.active = 'true'
      root.dataset.cursorSuppressed = 'true'
      start()
    }

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      if (active) start()
    }

    const onLeave = () => {
      active = false
      delete wrap.dataset.active
      delete root.dataset.cursorSuppressed
      start()
    }

    wrap.addEventListener('pointerenter', onEnter)
    wrap.addEventListener('pointermove', onMove, { passive: true })
    wrap.addEventListener('pointerleave', onLeave)

    return () => {
      window.cancelAnimationFrame(frame)
      wrap.removeEventListener('pointerenter', onEnter)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      delete wrap.dataset.active
      delete root.dataset.cursorSuppressed
    }
  }, [])

  return (
    <div className={`user-cursor ${className}`.trim()} ref={wrapRef}>
      {children}
      <div className="user-cursor-layer" ref={layerRef} aria-hidden="true">
        <svg className="user-cursor-arrow" viewBox="0 0 24 24" width="24" height="24">
          <path
            d="M4.4 2.4c0-.7.8-1.1 1.3-.6l13 8.4c.6.4.3 1.3-.4 1.4l-5.6.7-2.4 5.2c-.3.6-1.2.6-1.4-.1L4.4 2.4Z"
            fill="currentColor"
            stroke="#fff"
            strokeWidth="1.1"
            paintOrder="stroke"
            strokeLinejoin="round"
          />
        </svg>
        <span className="user-cursor-tag">{label}</span>
      </div>
    </div>
  )
}
