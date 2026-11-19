import { useEffect, useState, type ReactNode } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Blocks,
  Braces,
  Check,
  Code2,
  Layers3,
  Monitor,
  MoveRight,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Workflow,
} from 'lucide-react'
import './App.css'
import { focusAreas, navItems, researchProjects } from './data'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

type SafeImageProps = {
  src: string
  alt: string
  className?: string
  eager?: boolean
  fallback?: ReactNode
}

function SafeImage({ src, alt, className = '', eager = false, fallback = 'PREVIEW' }: SafeImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`safe-fallback ${className}`} role="img" aria-label={alt}>
        <span>{fallback}</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}


function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2.18c-3.23.7-3.91-1.37-3.91-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.39.96.1-.75.41-1.26.74-1.55-2.58-.29-5.3-1.29-5.3-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.04 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.57.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.4-2.73 5.39-5.32 5.67.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  )
}

function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
    </a>
  )
}

function SectionHeader({
  index,
  eyebrow,
  title,
  copy,
}: {
  index: string
  eyebrow: string
  title: ReactNode
  copy: string
}) {
  return (
    <header className="section-header" data-reveal>
      <div className="section-index">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <div className="section-heading-copy">
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
    </header>
  )
}

function App() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.setAttribute('data-visible', 'true'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark">TH</span>
          <span className="brand-type">
            THEOHOWIE
            <small>PRODUCT SYSTEMS</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="主导航">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <ExternalLink className="nav-github" href="https://github.com/theohowie">
          <GitHubIcon size={16} />
          GitHub
        </ExternalLink>
      </header>

      <main id="main">
        <section className="hero section-frame" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              INDEPENDENT BUILDER / 2027
            </div>

            <h1 id="hero-title">
              把 AI 从对话框，
              <span>带进真实产品。</span>
            </h1>

            <p className="hero-intro">
              我是何文韬，独立开发者。做 Agent、移动应用与 AI 工作流，把模糊想法拆成
              可运行、可验证、能持续迭代的产品。
            </p>

            <div className="hero-actions">
              <a className="button button--primary" href="#work">
                浏览作品
                <ArrowDown size={17} aria-hidden="true" />
              </a>
              <ExternalLink className="button button--ghost" href="https://github.com/theohowie">
                查看 GitHub
              </ExternalLink>
            </div>

            <dl className="hero-stats" aria-label="项目概览">
              <div>
                <dt>03</dt>
                <dd>原创产品</dd>
              </div>
              <div>
                <dt>02</dt>
                <dd>二次开发</dd>
              </div>
              <div>
                <dt>08</dt>
                <dd>技术研究</dd>
              </div>
            </dl>
          </div>

          <div className="hero-visual" aria-label="Heracles 产品执行轨迹示意">
            <div className="orbit orbit--one" aria-hidden="true" />
            <div className="orbit orbit--two" aria-hidden="true" />
            <div className="system-panel">
              <div className="panel-bar">
                <span className="panel-status">
                  <span className="status-dot" />
                  LIVE BUILD
                </span>
                <span>TRACE / 026</span>
                <span>ANDROID</span>
              </div>

              <div className="panel-body">
                <div className="hero-device-wrap">
                  <div className="device-halo" aria-hidden="true" />
                  <div className="phone phone--hero">
                    <span className="phone-island" aria-hidden="true" />
                    <SafeImage
                      src={assetUrl('images/heracles-hero.webp')}
                      alt="Heracles Android 应用真机界面"
                      className="phone-screen"
                      eager
                      fallback="HERACLES"
                    />
                  </div>
                  <span className="device-chip device-chip--top">ON DEVICE</span>
                  <span className="device-chip device-chip--bottom">BYOK</span>
                </div>

                <ol className="trace-list">
                  <li>
                    <span>01</span>
                    <div>
                      <strong>意图</strong>
                      <small>Requirement</small>
                    </div>
                    <Check size={15} aria-hidden="true" />
                  </li>
                  <li>
                    <span>02</span>
                    <div>
                      <strong>工具</strong>
                      <small>Tool calling</small>
                    </div>
                    <Terminal size={15} aria-hidden="true" />
                  </li>
                  <li>
                    <span>03</span>
                    <div>
                      <strong>审批</strong>
                      <small>Guardrails</small>
                    </div>
                    <ShieldCheck size={15} aria-hidden="true" />
                  </li>
                  <li>
                    <span>04</span>
                    <div>
                      <strong>交付</strong>
                      <small>Iteration</small>
                    </div>
                    <MoveRight size={15} aria-hidden="true" />
                  </li>
                </ol>
              </div>

              <div className="panel-foot">
                <span>HERACLES / MOBILE CODING AGENT</span>
                <span className="panel-signal">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="stack-strip" aria-label="主要技术方向">
          <div className="stack-track">
            <div className="stack-group">
              {focusAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
            <div className="stack-group" aria-hidden="true">
              {focusAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </div>
        </div>

        <section className="work section-frame" id="work" aria-labelledby="work-title">
          <SectionHeader
            index="01"
            eyebrow="ORIGINAL PRODUCTS"
            title={<>不是 Demo 收藏夹，<br />是产品档案。</>}
            copy="从 Agent Runtime 到移动端体验，关注真实工作流、可验证结果和持续迭代，而不是只停留在概念稿。"
          />

          <article className="feature-card" data-reveal>
            <div className="feature-copy">
              <div className="card-meta">
                <span className="badge badge--orange">FLAGSHIP</span>
                <span>AI AGENT / ANDROID</span>
              </div>

              <div className="feature-title-row">
                <div className="project-mark project-mark--heracles">
                  <span>H</span>
                </div>
                <div>
                  <p className="project-eyebrow">MOBILE CODING AGENT</p>
                  <h3 id="work-title">Heracles</h3>
                </div>
              </div>

              <p className="feature-lede">
                一台手机里的开发智能体。把需求转化成读文件、改代码、跑命令、审批与回读的完整执行链，
                让 AI 从回答者变成能走进工作区的执行者。
              </p>

              <ul className="feature-points">
                <li>
                  <span>RUN</span>
                  <p>任务计划、工具调用、多轮会话与上下文管理</p>
                </li>
                <li>
                  <span>SAFE</span>
                  <p>审批、预算、取消与可回滚的受控执行面</p>
                </li>
                <li>
                  <span>SHIP</span>
                  <p>Android 真机工作区、沙箱与 BYOK 多协议模型接入</p>
                </li>
              </ul>

              <div className="tag-row" aria-label="Heracles 技术栈">
                <span>Dart</span>
                <span>Kotlin</span>
                <span>Android</span>
                <span>Agent Loop</span>
                <span>GPL-3.0</span>
              </div>

              <div className="project-links">
                <ExternalLink className="text-link text-link--strong" href="https://theohowie.github.io/Heracles/">
                  产品页
                </ExternalLink>
                <ExternalLink className="text-link" href="https://github.com/theohowie/Heracles">
                  源码
                </ExternalLink>
              </div>
            </div>

            <div className="feature-stage">
              <span className="stage-label">LIVE PRODUCT SURFACE</span>
              <div className="device-scene" aria-hidden="true">
                <div className="phone phone--back">
                  <SafeImage
                    src={assetUrl('images/heracles-tool.webp')}
                    alt=""
                    className="phone-screen"
                    fallback="TOOL"
                  />
                </div>
                <div className="phone phone--front">
                  <span className="phone-island" />
                  <SafeImage
                    src={assetUrl('images/heracles-chat.webp')}
                    alt="Heracles 对话与工具调用界面"
                    className="phone-screen"
                    fallback="CHAT"
                  />
                </div>
                <div className="floating-note floating-note--a">
                  <span>TOOL CALL</span>
                  <strong>26 / 33 tools</strong>
                </div>
                <div className="floating-note floating-note--b">
                  <Check size={16} />
                  <span>Execution verified</span>
                </div>
              </div>
            </div>
          </article>

          <div className="work-grid">
            <article className="work-card work-card--zoosy" data-reveal>
              <div className="card-topline">
                <span>02 / MOBILE PRODUCT</span>
                <span className="badge badge--green">ORIGINAL</span>
              </div>

              <div className="zoosy-visual" aria-label="Zoosy 产品结构示意">
                <div className="zoosy-orbit" aria-hidden="true" />
                <div className="zoosy-card">
                  <div className="zoosy-head">
                    <span>THU / 21</span>
                    <span>●</span>
                  </div>
                  <p>今天在想什么？</p>
                  <div className="zoosy-lines">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="zoosy-tags">
                    <span># 产品</span>
                    <span># AI</span>
                  </div>
                </div>
                <div className="zoosy-floating">
                  <Sparkles size={16} />
                  <span>AI SUMMARY</span>
                </div>
                <span className="zoosy-word" aria-hidden="true">Z</span>
              </div>

              <div className="work-card-copy">
                <div className="project-title-line">
                  <h3>Zoosy</h3>
                  <span>主动思考记录</span>
                </div>
                <p>
                  为记录与反思设计的 Flutter 应用，把语音速记、AI 摘要、周历、标签检索和本地数据管理串成闭环。
                </p>
                <div className="tag-row">
                  <span>Flutter</span>
                  <span>Dart</span>
                  <span>MMKV</span>
                  <span>LLM API</span>
                </div>
                <ExternalLink className="text-link" href="https://github.com/theohowie/zoosy-update">
                  查看仓库
                </ExternalLink>
              </div>
            </article>

            <article className="work-card work-card--verbal" data-reveal>
              <div className="card-topline">
                <span>03 / KNOWLEDGE SYSTEM</span>
                <span className="badge badge--light">ORIGINAL</span>
              </div>

              <div className="verbal-visual">
                <span className="verbal-bg-word" aria-hidden="true">言</span>
                <div className="verbal-step">
                  <span>01</span>
                  <strong>题干</strong>
                  <small>识别命题边界</small>
                </div>
                <div className="verbal-step">
                  <span>02</span>
                  <strong>结构</strong>
                  <small>拆解逻辑关系</small>
                </div>
                <div className="verbal-step">
                  <span>03</span>
                  <strong>语义</strong>
                  <small>验证答案一致性</small>
                </div>
              </div>

              <div className="work-card-copy">
                <div className="project-title-line">
                  <h3>张弓言语 Skill</h3>
                  <span>结构化推理</span>
                </div>
                <p>
                  把张弓十二箭方法整理成可复用的言语理解流程，覆盖逻辑填空、并列结构、转折结构和语义验证。
                </p>
                <div className="tag-row tag-row--dark">
                  <span>Knowledge</span>
                  <span>Prompt Design</span>
                  <span>Codex Skill</span>
                </div>
                <ExternalLink className="text-link text-link--light" href="https://github.com/theohowie/zhang-gong-verbal-skill">
                  查看仓库
                </ExternalLink>
              </div>
            </article>
          </div>
        </section>

        <section className="rebuilt section-frame" id="rebuilt" aria-labelledby="rebuilt-title">
          <SectionHeader
            index="02"
            eyebrow="REBUILT WITH RESPECT"
            title={<>二次开发，<br />也把来源写清楚。</>}
            copy="基于成熟项目验证产品判断和工程改造能力。保留原项目协议与作者信息，不把上游成果包装成从零原创。"
          />

          <div className="rebuilt-grid">
            <article className="rebuild-card bridge-card" data-reveal>
              <div className="card-topline">
                <span>BASED ON SUDO / MIT</span>
                <span className="badge badge--orange">REBUILT</span>
              </div>

              <div className="bridge-visual" aria-label="Bridge Android 与 Windows 局域网连接示意">
                <div className="bridge-device bridge-device--phone">
                  <Smartphone size={28} />
                  <span>ANDROID</span>
                </div>
                <div className="bridge-link">
                  <span />
                  <strong>LOCAL / 8080</strong>
                  <span />
                </div>
                <div className="bridge-device bridge-device--pc">
                  <Monitor size={28} />
                  <span>WINDOWS</span>
                </div>
              </div>

              <div className="rebuild-copy">
                <p className="project-eyebrow">REMOTE CONTROL / CHINESE UI</p>
                <h3 id="rebuilt-title">Bridge</h3>
                <p>
                  在 Sudo 基础上完成中文化、浅色主题与手机截屏等改动，保留本地优先、无需账号的 Windows 远程控制体验。
                </p>
                <ul className="compact-list">
                  <li>完整中文界面与品牌重塑</li>
                  <li>新增截屏、分享与「问 AI」流程</li>
                  <li>修复 Android 16 与构建环境兼容问题</li>
                </ul>
                <div className="upstream-row">
                  <ExternalLink className="text-link text-link--light" href="https://github.com/theohowie/bridge">
                    查看二开仓库
                  </ExternalLink>
                  <ExternalLink className="text-link text-link--muted" href="https://github.com/loueylahwel/sudo">
                    上游 Sudo
                  </ExternalLink>
                </div>
              </div>
            </article>

            <article className="rebuild-card linkstudy-card" data-reveal>
              <div className="card-topline">
                <span>BASED ON SKED / AGPL-3.0</span>
                <span className="badge badge--ink">REBUILT</span>
              </div>

              <div className="linkstudy-visual" aria-label="LinkStudy 课表界面示意">
                <div className="week-head">
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                </div>
                <div className="week-grid">
                  <i className="class-block class-block--a"><span>高等数学</span><small>08:00</small></i>
                  <i className="class-block class-block--b"><span>数据结构</span><small>10:00</small></i>
                  <i className="class-block class-block--c"><span>计算机网络</span><small>14:00</small></i>
                  <i className="class-block class-block--d"><span>项目实践</span><small>16:00</small></i>
                </div>
                <div className="linkstudy-note">
                  <Braces size={17} />
                  <span>OpenAI-compatible timetable parser</span>
                </div>
              </div>

              <div className="rebuild-copy">
                <p className="project-eyebrow">SCHEDULE / FLUTTER</p>
                <h3>LinkStudy</h3>
                <p>
                  基于 Sked 持续重构课表与日程工具，覆盖课程管理、通用日程、导入导出、备份恢复与 AI 课表解析。
                </p>
                <ul className="compact-list">
                  <li>多课表、周次、节次与日程视图</li>
                  <li>JSON / ICS / 完整备份导入导出</li>
                  <li>兼容 OpenAI 接口的课表文本解析</li>
                </ul>
                <div className="upstream-row">
                  <ExternalLink className="text-link text-link--strong" href="https://github.com/theohowie/LinkStudy">
                    查看二开仓库
                  </ExternalLink>
                  <ExternalLink className="text-link text-link--muted" href="https://github.com/Mashiro0619/Sked">
                    上游 Sked
                  </ExternalLink>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="research" id="research" aria-labelledby="research-title">
          <div className="research-inner section-frame">
            <SectionHeader
              index="03"
              eyebrow="RESEARCH LIBRARY"
              title={<>Fork 不是作品，<br />是研究样本。</>}
              copy="追踪 Agent、开发工具与 AI 产品的最新实现，拆解架构和交互，再把能验证的部分带回自己的项目。"
            />

            <div className="research-table" data-reveal>
              <div className="research-head" aria-hidden="true">
                <span>INDEX</span>
                <span>PROJECT</span>
                <span>FOCUS</span>
                <span>DETAIL</span>
                <span />
              </div>

              {researchProjects.map((project) => (
                <a
                  className="research-row"
                  href={project.href}
                  key={project.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="research-index">{project.index}</span>
                  <strong>{project.name}</strong>
                  <span className="research-focus">{project.focus}</span>
                  <span className="research-detail">{project.detail}</span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="research-footnote" data-reveal>
              <Blocks size={18} aria-hidden="true" />
              <p>Fork 项目只作为技术研究记录展示；原创与二次开发的归属在对应章节明确标注。</p>
            </div>
          </div>
        </section>

        <section className="method section-frame" id="method" aria-labelledby="method-title">
          <SectionHeader
            index="04"
            eyebrow="WORKING METHOD"
            title={<>先定义什么值得做，<br />再把它做出来。</>}
            copy="比起堆砌技术名词，更关注产品边界、技术取舍和最终是否真的可用。"
          />

          <div className="method-grid">
            <div className="method-statement" data-reveal>
              <p>
                我的开发方式更接近<wbr />产品工程师：<wbr />提出需求、确定架构、
                <wbr />选择技术栈，<wbr />用 AI 编程工具加速实现，<wbr />再通过真实使用、
                <wbr />问题复现与验收<wbr />推动迭代。
              </p>
              <blockquote>
                <Sparkles size={20} aria-hidden="true" />
                <span>不把 AI 当自动完成按钮。它加速实现，产品判断仍由我负责。</span>
              </blockquote>
            </div>

            <div className="process-list" data-reveal>
              <div className="process-item">
                <span>01</span>
                <Code2 size={22} aria-hidden="true" />
                <div>
                  <h3>FRAME</h3>
                  <p>拆清场景、用户和功能边界，先决定什么不做。</p>
                </div>
              </div>
              <div className="process-item">
                <span>02</span>
                <Layers3 size={22} aria-hidden="true" />
                <div>
                  <h3>BUILD</h3>
                  <p>选择技术路线，借助 AI 快速构建能运行的版本。</p>
                </div>
              </div>
              <div className="process-item">
                <span>03</span>
                <Workflow size={22} aria-hidden="true" />
                <div>
                  <h3>VERIFY</h3>
                  <p>复现问题、验证修复、调整方案，直到交付可用。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="skill-band" data-reveal>
            <div>
              <span className="eyebrow">TOOLKIT / CURRENT</span>
              <p>从产品结构到端侧实现，保持完整链路可理解。</p>
            </div>
            <div className="skill-tags">
              <span>Agent</span>
              <span>LLM API</span>
              <span>Kotlin</span>
              <span>Flutter</span>
              <span>React</span>
              <span>FastAPI</span>
              <span>SQLite</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top section-frame">
          <span className="eyebrow">NEXT / BUILD</span>
          <h2>
            把下一个想法，<br />
            <span className="footer-title-tail">做成真正能用的东西。</span>
          </h2>
          <ExternalLink className="footer-link" href="https://github.com/theohowie">
            <GitHubIcon size={20} />
            github.com/theohowie
          </ExternalLink>
        </div>

        <div className="footer-bottom section-frame">
          <div className="brand brand--footer">
            <span className="brand-mark">TH</span>
            <span className="brand-type">
              THEOHOWIE
              <small>PRODUCT SYSTEMS</small>
            </span>
          </div>
          <p>何文韬 · Independent Developer · 2026</p>
          <a href="#top" className="back-top">
            回到顶部
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App

