import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { type ProjectKey } from '../lib/covers'
import './ProjectStack.css'

export type ProjectCard = {
  key: ProjectKey
  num: string
  cat: string
  name: string
  desc: string
  href: string
  images: [string, string, string]
}

/**
 * 项目卡堆叠：每张卡 sticky 在顶部，下一张上来时前一张缩小压到后面。
 */
export default function ProjectStack({ projects }: { projects: ProjectCard[] }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const cards = [...section.querySelectorAll<HTMLElement>('.stack-card')]
    const total = cards.length
    if (!total) return

    let frame = 0
    let queued = false

    const paint = () => {
      queued = false
      const vh = window.innerHeight
      cards.forEach((card, i) => {
        if (i === total - 1) {
          card.style.transform = 'scale(1)'
          return
        }
        const next = cards[i + 1]
        const nextTop = next.getBoundingClientRect().top
        const cover = Math.min(Math.max((vh - nextTop) / vh, 0), 1)
        const target = 1 - (total - 1 - i) * 0.03 * cover
        card.style.transform = `scale(${target.toFixed(4)})`
      })
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
  }, [projects])

  return (
    <section className="stack" ref={sectionRef} id="work" aria-label="项目">
      {projects.map((project, i) => (
        <article
          className="stack-card"
          key={project.key}
          style={{ top: `calc(96px + ${i * 26}px)`, zIndex: i + 1 }}
        >
          <header className="card-head">
            <span className="card-num">{project.num}</span>
            <div className="card-title">
              <span className="card-cat">{project.cat}</span>
              <h3>{project.name}</h3>
            </div>
            <a className="card-link" href={project.href} target="_blank" rel="noreferrer">
              查看
              <ArrowUpRight size={14} strokeWidth={1.8} />
            </a>
          </header>

          <div className="card-body">
            <div className="card-body-text">
              <p>{project.desc}</p>
            </div>
            <div className="card-gallery">
              {project.images.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.name} 界面 ${index + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
