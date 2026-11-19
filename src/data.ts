export type ResearchProject = {
  name: string
  focus: string
  href: string
}

export const researchProjects: ResearchProject[] = [
  { name: 'dart_agent_core', focus: 'Agent Framework', href: 'https://github.com/theohowie/dart_agent_core' },
  { name: 'JobHuntBot', focus: 'Agent Workflow', href: 'https://github.com/theohowie/JobHuntBot' },
  { name: 'grok-build', focus: 'Coding Agent', href: 'https://github.com/theohowie/grok-build' },
  { name: 'DeepSeek-Reasonix', focus: 'Terminal Agent', href: 'https://github.com/theohowie/DeepSeek-Reasonix' },
  { name: 'magic-resume', focus: 'AI Web Product', href: 'https://github.com/theohowie/magic-resume' },
  { name: 'Infinite-Canvas', focus: 'AI Canvas', href: 'https://github.com/theohowie/Infinite-Canvas' },
  { name: 'sudo', focus: 'Remote Control', href: 'https://github.com/theohowie/sudo' },
  { name: 'deepseek-harness', focus: 'Agent Harness', href: 'https://github.com/theohowie/deepseek-harness' },
]

export const navItems = [
  { label: '作品', href: '#work' },
  { label: '二次开发', href: '#rebuilt' },
  { label: '研究', href: '#research' },
  { label: '关于', href: '#about' },
]
