export type ResearchProject = {
  name: string
  focus: string
  detail: string
  href: string
  index: string
}

export const researchProjects: ResearchProject[] = [
  {
    name: 'dart_agent_core',
    focus: 'Agent framework',
    detail: 'Dart · tool use · delegation · evals',
    href: 'https://github.com/theohowie/dart_agent_core',
    index: '01',
  },
  {
    name: 'JobHuntBot',
    focus: 'Agent workflow',
    detail: '文件驱动 · 进度看板 · 求职流程',
    href: 'https://github.com/theohowie/JobHuntBot',
    index: '02',
  },
  {
    name: 'grok-build',
    focus: 'Coding agent',
    detail: 'TUI · 全屏交互 · 可扩展工具链',
    href: 'https://github.com/theohowie/grok-build',
    index: '03',
  },
  {
    name: 'DeepSeek-Reasonix',
    focus: 'Terminal agent',
    detail: 'DeepSeek-native · prefix cache',
    href: 'https://github.com/theohowie/DeepSeek-Reasonix',
    index: '04',
  },
  {
    name: 'magic-resume',
    focus: 'AI web product',
    detail: '在线编辑 · AI 简历 · 产品体验',
    href: 'https://github.com/theohowie/magic-resume',
    index: '05',
  },
  {
    name: 'Infinite-Canvas',
    focus: 'AI canvas',
    detail: 'ComfyUI · 多模型 API · 图像工作流',
    href: 'https://github.com/theohowie/Infinite-Canvas',
    index: '06',
  },
  {
    name: 'sudo',
    focus: 'Remote control',
    detail: 'Windows ↔ Android · 本地优先',
    href: 'https://github.com/theohowie/sudo',
    index: '07',
  },
  {
    name: 'deepseek-harness',
    focus: 'Agent harness',
    detail: '模型实验 · 工具编排 · 技术追踪',
    href: 'https://github.com/theohowie/deepseek-harness',
    index: '08',
  },
]

export const focusAreas = [
  'Agent Runtime',
  'Tool Calling',
  'Context Engineering',
  'Flutter / Android',
  'React / FastAPI',
  'LLM Integration',
]

export const navItems = [
  { label: '作品', href: '#work' },
  { label: '二次开发', href: '#rebuilt' },
  { label: '研究库', href: '#research' },
  { label: '方法', href: '#method' },
]
