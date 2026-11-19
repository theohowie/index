import { useEffect, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import './App.css'
import { navItems, researchProjects } from './data'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

function GitHubIcon({ size = 16 }: { size?: number }) {
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
    <a className={`link-out ${className}`} href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
    </a>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  )
}

function App() {
  useEffect(() => {
    document.documentElement.dataset.ready = 'true'
  }, [])

  return (
    <>
      <a className="skip" href="#main">跳到主要内容</a>

      <header className="header">
        <a className="name" href="#top">何文韬</a>
        <nav aria-label="主导航">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>
        <a className="icon-link" href="https://github.com/theohowie" aria-label="GitHub">
          <GitHubIcon />
        </a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">何文韬</h1>
            <p>独立开发者。做 Agent、移动应用与 AI 产品。</p>
            <LinkOut href="https://github.com/theohowie">GitHub</LinkOut>
          </div>
          <div className="hero-media">
            <img
              src={assetUrl('images/heracles-hero.webp')}
              alt="Heracles Android 应用界面"
              width="560"
              height="1216"
              loading="eager"
              decoding="async"
            />
          </div>
        </section>

        <Section id="work" title="作品">
          <article className="feature">
            <div className="feature-copy">
              <h3>Heracles</h3>
              <p>Android 上的 AI 编程 Agent。在手机工作区读代码、改文件、运行命令。</p>
              <div className="feature-links">
                <LinkOut href="https://theohowie.github.io/Heracles/">产品页</LinkOut>
                <LinkOut href="https://github.com/theohowie/Heracles">源码</LinkOut>
              </div>
            </div>
            <div className="feature-media">
              <img
                src={assetUrl('images/heracles-chat.webp')}
                alt="Heracles 对话与工具调用界面"
                width="560"
                height="1216"
                loading="eager"
                decoding="async"
              />
            </div>
          </article>

          <div className="grid">
            <article className="card">
              <div className="card-body">
                <h3>Zoosy</h3>
                <p>Flutter 思考记录应用。支持语音速记、AI 摘要与本地数据管理。</p>
                <LinkOut href="https://github.com/theohowie/zoosy-update">源码</LinkOut>
              </div>
            </article>

            <article className="card">
              <div className="card-body">
                <h3>张弓言语</h3>
                <p>中文言语理解 Skill。整理张弓十二箭的解题流程。</p>
                <LinkOut href="https://github.com/theohowie/zhang-gong-verbal-skill">源码</LinkOut>
              </div>
            </article>
          </div>
        </Section>

        <Section id="rebuilt" title="二次开发">
          <ul className="rows">
            <li>
              <div>
                <h3>Bridge</h3>
                <p>Windows 远程控制客户端。基于 Sudo 完成中文化与功能改造。</p>
              </div>
              <div className="row-links">
                <LinkOut href="https://github.com/theohowie/bridge">仓库</LinkOut>
                <LinkOut className="quiet" href="https://github.com/loueylahwel/sudo">Sudo</LinkOut>
              </div>
            </li>
            <li>
              <div>
                <h3>LinkStudy</h3>
                <p>课表与日程管理应用。基于 Sked 持续重构。</p>
              </div>
              <div className="row-links">
                <LinkOut href="https://github.com/theohowie/LinkStudy">仓库</LinkOut>
                <LinkOut className="quiet" href="https://github.com/Mashiro0619/Sked">Sked</LinkOut>
              </div>
            </li>
          </ul>
        </Section>

        <Section id="research" title="研究">
          <ul className="research">
            {researchProjects.map((project) => (
              <li key={project.name}>
                <a href={project.href} target="_blank" rel="noreferrer">
                  <span>{project.name}</span>
                  <span className="research-focus">{project.focus}</span>
                  <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="about" title="关于">
          <div className="about">
            <p>
              我负责需求、架构与技术选型，用 AI 编程工具完成实现，再通过真实使用和问题复现推进迭代。
              项目覆盖 Agent、Flutter、React、FastAPI 与 LLM API。
            </p>
            <LinkOut href="https://github.com/theohowie">github.com/theohowie</LinkOut>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <span>© 2026 何文韬</span>
        <a href="#top">回到顶部</a>
      </footer>
    </>
  )
}

export default App
