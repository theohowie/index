import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import './App.css'
import CustomCursor from './components/CustomCursor'
import Marquee from './components/Marquee'
import ProjectStack, { type ProjectCard } from './components/ProjectStack'
import HeroBackdrop from './components/HeroBackdrop'
import UserCursor from './components/UserCursor'
import { heraclesScreens } from './data'
import { coverArt, warmCovers } from './lib/covers'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

function GitHubMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2.18c-3.23.7-3.91-1.37-3.91-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.39.96.1-.75.41-1.26.74-1.55-2.58-.29-5.3-1.29-5.3-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.04 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.57.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.4-2.73 5.39-5.32 5.67.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  )
}

const capabilities = [
  {
    num: '01',
    name: 'Agent 设计',
    desc: '把一句需求拆成可执行的任务：工具编排、上下文与状态管理、失败重试，直到任务真的跑完。',
  },
  {
    num: '02',
    name: '移动端',
    desc: 'Flutter 与 Android 原生，从交互稿到上架。习惯在真机上把每个动效跑一遍再交付。',
  },
  {
    num: '03',
    name: 'Web 前端',
    desc: 'React、TypeScript、Vite。偏好先把手感做对，再补结构，而不是反过来。',
  },
  {
    num: '04',
    name: '后端与模型',
    desc: 'FastAPI 与 LLM API 接入：流式输出、结构化调用、成本与延迟之间的权衡。',
  },
  {
    num: '05',
    name: '二次开发',
    desc: '在别人的开源项目上做中文化、功能改造和长期维护，知道怎么读陌生的代码。',
  },
]

const heroLinks = [
  { label: 'Heracles', href: '#work' },
  { label: 'Zoosy', href: '#work' },
  { label: 'Bridge', href: '#work' },
  { label: 'LinkStudy', href: '#work' },
  { label: '能力', href: '#capability' },
  { label: '关于', href: '#about' },
  { label: 'GitHub', href: 'https://github.com/theohowie' },
]

const projectMeta: Omit<ProjectCard, 'images'>[] = [
  {
    key: 'heracles',
    num: '01',
    cat: '原创 · Android',
    name: 'Heracles',
    desc: 'Android 上的 AI 编程 Agent。在手机工作区读代码、改文件、运行命令，把一次完整的开发任务放进兜里跑完。',
    href: 'https://github.com/theohowie/Heracles',
  },
  {
    key: 'zoosy',
    num: '02',
    cat: '原创 · Flutter',
    name: 'Zoosy',
    desc: '思考记录应用。语音速记、AI 摘要与本地数据管理，重点是「想到什么立刻记下来」这件事不能有摩擦。',
    href: 'https://github.com/theohowie/zoosy-update',
  },
  {
    key: 'bridge',
    num: '03',
    cat: '二次开发 · Windows',
    name: 'Bridge',
    desc: 'Windows 远程控制客户端。基于 Sudo 完成中文化与功能改造，提示、配置和快捷键全部重做了一遍。',
    href: 'https://github.com/theohowie/bridge',
  },
  {
    key: 'linkstudy',
    num: '04',
    cat: '二次开发 · Android',
    name: 'LinkStudy',
    desc: '课表与日程管理应用。基于 Sked 持续重构，把国内高校的周次、调课与节假日规则补齐。',
    href: 'https://github.com/theohowie/LinkStudy',
  },
]

function App() {
  const [ready, setReady] = useState(false)
  const [stuck, setStuck] = useState(false)
  const barRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.documentElement.dataset.ready = 'true'
    let alive = true
    warmCovers().then(() => {
      if (alive) setReady(true)
    })
    const onScroll = () => {
      const bar = barRef.current
      if (bar) setStuck(bar.getBoundingClientRect().top <= 0.5)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      alive = false
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const [hero, second, third] = heraclesScreens

  const tiles = ready
    ? [
        { src: coverArt('heracles', 0), alt: 'Heracles 封面' },
        { src: coverArt('zoosy', 1), alt: 'Zoosy 封面' },
        { src: coverArt('bridge', 2), alt: 'Bridge 封面' },
        { src: coverArt('linkstudy', 0), alt: 'LinkStudy 封面' },
        { src: coverArt('zoosy', 2), alt: 'Zoosy 封面' },
        { src: coverArt('heracles', 1), alt: 'Heracles 封面' },
        { src: coverArt('bridge', 0), alt: 'Bridge 封面' },
        { src: coverArt('linkstudy', 2), alt: 'LinkStudy 封面' },
        { src: coverArt('heracles', 2), alt: 'Heracles 封面' },
        { src: coverArt('zoosy', 0), alt: 'Zoosy 封面' },
        { src: coverArt('linkstudy', 1), alt: 'LinkStudy 封面' },
        { src: coverArt('bridge', 1), alt: 'Bridge 封面' },
      ]
    : []

  const projects: ProjectCard[] = ready
    ? projectMeta.map((meta) => ({
        ...meta,
        images:
          meta.key === 'heracles' && hero && second && third
            ? [assetUrl(hero.src), assetUrl(second.src), assetUrl(third.src)]
            : [coverArt(meta.key, 0), coverArt(meta.key, 1), coverArt(meta.key, 2)],
      }))
    : []

  return (
    <>
      <CustomCursor />
      <a className="skip" href="#work">
        跳到作品
      </a>

      <header className="nav">
        <a className="brand" href="#top" aria-label="回到顶部">
          何文韬
        </a>

        <a
          className="nav-cta liquid-glass"
          href="https://github.com/theohowie"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubMark />
          <span>GitHub</span>
        </a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />

          <HeroBackdrop
            baseSrc={assetUrl('images/hero-base.webp')}
            revealSrc={assetUrl('images/hero-reveal.webp')}
          />

          <div className="hero-type">
            <UserCursor label="何文韬" className="hero-name">
              <h1 className="wordmark" id="hero-title">
                He Wentao
              </h1>
            </UserCursor>
            <p className="wordmark-sub">TheoHowie</p>
          </div>

          <p className="hero-hint">
            <span className="hint-dot" aria-hidden="true" />
            移动光标，看另一面
          </p>
        </section>

        <nav className="link-bar" data-stuck={stuck ? 'true' : undefined} ref={barRef}>
          <ul>
            {heroLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.href.startsWith('#')
                    ? {}
                    : { target: '_blank', rel: 'noreferrer' })}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {ready ? <Marquee tiles={tiles} /> : <div className="marquee-placeholder" />}

        <section className="about" id="about" aria-labelledby="about-title">
          <span className="eyebrow">01 — 关于</span>
          <h2 className="display" id="about-title">
            关于
          </h2>
          <p className="about-text">
            我负责需求、架构与技术选型，用 AI 编程工具完成实现，再通过真实使用和问题复现推进迭代。
            项目覆盖 Agent、Flutter、React、FastAPI 与 LLM API。
          </p>
          <a className="cta" href="https://github.com/theohowie" target="_blank" rel="noreferrer">
            github.com/theohowie
            <ArrowUpRight size={14} strokeWidth={1.8} />
          </a>
        </section>

        <section className="services" id="capability" aria-labelledby="capability-title">
          <div className="services-inner">
            <span className="eyebrow eyebrow--dark">02 — 能力</span>
            <h2 className="display display--dark" id="capability-title">
              能力
            </h2>
            <ul className="service-list">
              {capabilities.map((item) => (
                <li key={item.num}>
                  <span className="service-num">{item.num}</span>
                  <div className="service-body">
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="stack-wrap" id="work">
          <div className="stack-head">
            <span className="eyebrow">03 — 作品</span>
            <h2 className="display">作品</h2>
          </div>
          {ready ? <ProjectStack projects={projects} /> : null}
          <div className="stack-tail">
            <p>还有更多在 GitHub 上。</p>
            <a className="cta" href="https://github.com/theohowie" target="_blank" rel="noreferrer">
              全部仓库
              <ArrowUpRight size={14} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </main>

      <footer className="footer">
        <span>© 2026 何文韬 · TheoHowie</span>
        <a href="#top">回到顶部</a>
      </footer>
    </>
  )
}

export default App
