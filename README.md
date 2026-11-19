# theohowie.github.io

何文韬 / TheoHowie 的个人产品作品集。使用 React、TypeScript 与 Vite 构建，通过 GitHub Pages 发布到 `https://theohowie.github.io/index/`。

## 内容范围

- **原创产品**：Heracles、Zoosy、张弓言语 Skill
- **二次开发**：Bridge（基于 Sudo）、LinkStudy（基于 Sked）
- **研究记录**：Agent、开发工具与 AI 产品相关的 Fork 项目

站点明确区分原创、二次开发与技术研究，不使用 Fork 项目冒充原创成果。

## 本地开发

```bash
npm ci
npm run dev
```

## 质量检查

```bash
npm run lint
npm run build
```

## 目录

```text
src/
  App.tsx       页面结构与交互
  App.css       视觉系统与响应式布局
  data.ts       项目数据
  index.css     全局设计变量
public/
  favicon.svg
  og-card.png
.github/workflows/deploy.yml
```

## 部署

推送到 `main` 后，GitHub Actions 会构建 `dist/` 并通过 GitHub Pages 发布到 `https://theohowie.github.io/index/`。

## 图片与来源

Heracles 真机截图来自该项目的 GitHub Pages。其他视觉图形根据项目公开功能绘制，不使用伪造的产品截图。Bridge 与 LinkStudy 的上游项目和开源协议已在页面中标注。
