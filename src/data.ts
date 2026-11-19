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
