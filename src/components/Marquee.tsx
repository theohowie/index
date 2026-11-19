import { useEffect, useRef } from 'react'
import './Marquee.css'

type Tile = { src: string; alt: string }

/** 两排作品缩略图，随页面滚动一个向左一个向右。 */
export default function Marquee({ tiles }: { tiles: Tile[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const rowARef = useRef<HTMLDivElement>(null)
  const rowBRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const rowA = rowARef.current
    const rowB = rowBRef.current
    if (!section || !rowA || !rowB) return

    let frame = 0
    let queued = false

    const paint = () => {
      queued = false
      const top = section.getBoundingClientRect().top + window.scrollY
      const offset = (window.scrollY - top + window.innerHeight) * 0.3
      rowA.style.transform = `translate3d(${offset - 200}px, 0, 0)`
      rowB.style.transform = `translate3d(${-(offset - 200)}px, 0, 0)`
    }

    const onScroll = () => {
      if (queued) return
      queued = true
      frame = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [tiles])

  const half = Math.ceil(tiles.length / 2)
  const rowA = [...tiles.slice(0, half), ...tiles.slice(0, half), ...tiles.slice(0, half)]
  const rowB = [...tiles.slice(half), ...tiles.slice(half), ...tiles.slice(half)]

  return (
    <section className="marquee" ref={sectionRef} aria-label="作品预览">
      <div className="marquee-row" ref={rowARef}>
        {rowA.map((tile, i) => (
          <img key={`a-${i}`} src={tile.src} alt={tile.alt} loading="lazy" />
        ))}
      </div>
      <div className="marquee-row" ref={rowBRef}>
        {rowB.map((tile, i) => (
          <img key={`b-${i}`} src={tile.src} alt={tile.alt} loading="lazy" />
        ))}
      </div>
    </section>
  )
}
