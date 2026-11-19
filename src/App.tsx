import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import './App.css'
import CustomCursor from './components/CustomCursor'
import Device from './components/Device'
import HoverPreview from './components/HoverPreview'
import Reveal from './components/Reveal'
import UserCursor from './components/UserCursor'
import { heraclesScreens, navItems, rebuiltProjects } from './data'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2.18c-3.23.7-3.91-1.37-3.91-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.39.96.1-.75.41-1.26.74-1.55-2.58-.29-5.3-1.29-5.3-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.04 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.57.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.4-2.73 5.39-5.32 5.67.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  )
}

function LinkOut({
  href,
  children,
  className = '',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      className={`link-out ${className}`.trim()}
      href={href}
      target="_blank"
      rel="noreferrer"
      data-cursor-label="打开"
    >
      {children}
      <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
    </a>
  )
}

function SectionHead({
  index,
  title,
  note,
  id,
}: {
  index: string
  title: string
  note?: string
  id: string
}) {
  return (
    <header className="section-head">
      <span className="section-index" aria-hidden="true">
        {index}
      </span>
      <h2 id={`${id}-title`}>{title}</h2>
      {note ? <span className="section-note">{note}</span> : null}
    </header>
  )
}

/** 还没截图的界面先占位，后面直接换成 <Device /> 即可。 */
function EmptyDevice({ mark, width = 168 }: { mark: string; width?: number }) {
  return (
    <div className="device-empty" style={{ '--device-w': `${width}px` } as CSSProperties}>
      <div className="device-empty-screen">
        <span className="device-empty-mark">{mark}</span>
      </div>
    </div>
  )
}

function App() {
  useEffect(() => {
    document.documentElement.dataset.ready = 'true'
  }, [])

  const [hero, ...rest] = heraclesScreens

  return (
    <>
      <CustomCursor />
      <a className="skip" href="#main">
        跳到主要内容
      </a>

      <header className="header">
        <a className="brand" href="#top" data-cursor-label="顶部">
          <span className="brand-mark">何</span>
          <span className="brand-name">何文韬</span>
        </a>
        <nav aria-label="主导航">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="header-icon"
          href="https://github.com/theohowie"
          aria-label="GitHub"
          target="_blank"
          rel="noreferrer"
          data-cursor-label="GitHub"
        >
          <GitHubIcon />
        </a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="badge">
              <span className="badge-dot" aria-hidden="true" />
              独立开发者 · 接受新项目
            </p>
            <UserCursor label="何文韬" className="hero-name">
              <h1 id="hero-title">He Wentao</h1>
              <p className="hero-alias">TheoHowie</p>
            </UserCursor>
            <p className="lede">
              做 Agent、移动应用与 AI 产品。从需求、架构到落地，一个人推进到底。
            </p>
            <div className="hero-actions">
              <LinkOut href="https://github.com/theohowie" className="button button--solid">
                GitHub
              </LinkOut>
              <a className="button button--ghost" href="#work" data-cursor-label="查看">
                看作品
              </a>
            </div>
            <dl className="hero-facts">
              <div>
                <dt>项目</dt>
                <dd>4 个</dd>
              </div>
              <div>
                <dt>方向</dt>
                <dd>Agent / 移动端</dd>
              </div>
              <div>
                <dt>技术</dt>
                <dd>React · Flutter · FastAPI</dd>
              </div>
            </dl>
          </div>

          <div className="hero-visual">
            <span className="hero-glow" aria-hidden="true" />
            {hero ? (
              <Device
                src={assetUrl(hero.src)}
                alt={hero.alt}
                width="clamp(206px, 62vw, 268px)"
                tilt={-7}
                priority
                className="hero-device"
              />
            ) : null}
            <p className="hero-caption">
              <span>Heracles</span>
              <span aria-hidden="true">/</span>
              <span>{hero?.label ?? 'Android'}</span>
            </p>
          </div>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <SectionHead id="work" index="01" title="作品" note="原创产品" />

          <Reveal>
            <article className="feature">
              <div className="feature-head">
                <div className="feature-title">
                  <h3>Heracles</h3>
                  <p>Android 上的 AI 编程 Agent。在手机工作区读代码、改文件、运行命令。</p>
                </div>
                <div className="feature-links">
                  <LinkOut href="https://theohowie.github.io/Heracles/">产品页</LinkOut>
                  <LinkOut href="https://github.com/theohowie/Heracles">源码</LinkOut>
                </div>
              </div>

              <div className="feature-stage">
                <span className="stage-glow" aria-hidden="true" />

                {hero ? (
                  <div className="stage-item stage-item--main">
                    <Device
                      src={assetUrl(hero.src)}
                      alt={hero.alt}
                      width="clamp(172px, 44vw, 272px)"
                      tilt={0}
                      priority
                    />
                    <span className="stage-label">{hero.label}</span>
                  </div>
                ) : null}

                {rest[0] ? (
                  <div className="stage-item stage-item--side stage-item--left">
                    <Device
                      src={assetUrl(rest[0].src)}
                      alt={rest[0].alt}
                      width="clamp(134px, 33vw, 200px)"
                      tilt={8}
                    />
                    <span className="stage-label">{rest[0].label}</span>
                  </div>
                ) : null}

                {rest[1] ? (
                  <div className="stage-item stage-item--side stage-item--right">
                    <Device
                      src={assetUrl(rest[1].src)}
                      alt={rest[1].alt}
                      width="clamp(134px, 33vw, 200px)"
                      tilt={-8}
                    />
                    <span className="stage-label">{rest[1].label}</span>
                  </div>
                ) : null}
              </div>
            </article>
          </Reveal>

          <Reveal delay={80}>
            <article className="panel">
              <div className="panel-copy">
                <h3>Zoosy</h3>
                <p>Flutter 思考记录应用。支持语音速记、AI 摘要与本地数据管理。</p>
                <LinkOut href="https://github.com/theohowie/zoosy-update">源码</LinkOut>
              </div>
              <div className="panel-visual">
                <span className="stage-glow stage-glow--panel" aria-hidden="true" />
                <EmptyDevice mark="Z" width={136} />
              </div>
            </article>
          </Reveal>
        </section>

        <section className="section" id="rebuilt" aria-labelledby="rebuilt-title">
          <SectionHead id="rebuilt" index="02" title="二次开发" note="基于开源项目改造" />

          <ul className="rows">
            {rebuiltProjects.map((project, index) => (
              <li key={project.name}>
                <HoverPreview
                  className="row-preview"
                  preview={
                    <div className="preview-card">
                      <div className="preview-art">
                        <span className="preview-mark">{project.name.slice(0, 1)}</span>
                      </div>
                      <div className="preview-meta">
                        <strong>{project.name}</strong>
                        <span>{project.meta}</span>
                      </div>
                    </div>
                  }
                >
                  <div className="row">
                    <span className="row-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="row-copy">
                      <h3>{project.name}</h3>
                      <p>{project.desc}</p>
                    </div>
                    <div className="row-links">
                      {project.links.map((link) => (
                        <LinkOut
                          key={link.href}
                          href={link.href}
                          className={link.quiet ? 'quiet' : ''}
                        >
                          {link.label}
                        </LinkOut>
                      ))}
                    </div>
                  </div>
                </HoverPreview>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="about" aria-labelledby="about-title">
          <SectionHead id="about" index="03" title="关于" />
          <Reveal>
            <div className="about">
              <p className="about-text">
                我负责需求、架构与技术选型，用 AI 编程工具完成实现，再通过真实使用和问题复现推进迭代。
                项目覆盖 Agent、Flutter、React、FastAPI 与 LLM API。
              </p>
              <div className="about-links">
                <LinkOut href="https://github.com/theohowie">github.com/theohowie</LinkOut>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 何文韬</span>
        <a href="#top" data-cursor-label="顶部">
          回到顶部
        </a>
      </footer>
    </>
  )
}

export default App
