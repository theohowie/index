export const navItems = [
  { label: '作品', href: '#work' },
  { label: '二次开发', href: '#rebuilt' },
  { label: '关于', href: '#about' },
]

export type Screen = {
  src: string
  alt: string
  label: string
}

/**
 * Heracles 的界面截图。
 * 以后要换图 / 加图，只改这个数组即可：Device 组件按顺序自动排布，
 * 第一张是主图，后面的作为两侧的辅助图。
 */
export const heraclesScreens: Screen[] = [
  { src: 'images/heracles-hero.webp', alt: 'Heracles 任务计划面板', label: '任务计划' },
  { src: 'images/heracles-chat.webp', alt: 'Heracles 长文回答与代码改动统计', label: '长文回答' },
  { src: 'images/heracles-tool.webp', alt: 'Heracles 多轮任务与工具调用', label: '多轮任务' },
]

export type RebuiltProject = {
  name: string
  desc: string
  meta: string
  links: { label: string; href: string; quiet?: boolean }[]
}

export const rebuiltProjects: RebuiltProject[] = [
  {
    name: 'Bridge',
    desc: 'Windows 远程控制客户端。基于 Sudo 完成中文化与功能改造。',
    meta: 'Windows · 中文化 · 功能改造',
    links: [
      { label: '仓库', href: 'https://github.com/theohowie/bridge' },
      { label: 'Sudo', href: 'https://github.com/loueylahwel/sudo', quiet: true },
    ],
  },
  {
    name: 'LinkStudy',
    desc: '课表与日程管理应用。基于 Sked 持续重构。',
    meta: 'Android · 课表 · 日程',
    links: [
      { label: '仓库', href: 'https://github.com/theohowie/LinkStudy' },
      { label: 'Sked', href: 'https://github.com/Mashiro0619/Sked', quiet: true },
    ],
  },
]
