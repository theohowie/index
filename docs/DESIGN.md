# Portfolio Design Notes

## 目标

黑底、超大衬线名字、一台从页面底部升起的手机。
光标扫过手机时，屏幕从「虚焦的另一张」变成清晰的真实界面——这是整页唯一的交互噱头。

## 三个参考各取了什么

| 来源 | 取的部分 |
|---|---|
| Measured | 首屏单屏结构：黑底 + 巨大 `Instrument Serif` 字标 + 玻璃拟态胶囊导航 |
| Lithos | 光标聚光揭示：两层同版位的图，软圆遮罩露出第二张 |
| Jack | 整页骨架：跑马灯 → 关于 → 能力列表 → 项目卡堆叠 |

## 结构

```
nav      固定：白块 logo + THEOHOWIE / 胶囊导航 / 绿点 CTA（滚动后加毛玻璃底）
hero     100svh：网格底 + 暖光 + 字标 + 手机（聚光揭示）
marquee  两排封面随滚动反向位移
about    大衬线「关于」+ 段落
services 白底圆角：能力 01–05
stack    深色圆角压在白底上：4 张项目卡 sticky 堆叠
```

## 视觉系统

- 背景 `#000`，面板 `#0c0c0c`，白字，唯一的彩色是导航上的绿点 `#4ade80`。
- 字体只有两个：`Instrument Serif`（字标、区块标题、序号）+ `Inter`（正文、导航、标签）。
  中文走衬线的 Songti / Noto Serif 回退。
- 圆角语言：导航胶囊 999px、卡片 48px、白底区块上圆角 56px。

## 关键实现

- **聚光揭示**（`SpotlightStage`）：两层 `.spot-layer` 装同一个 `Device`，底图虚焦 + 压暗，
  上层用 `radial-gradient(circle 260px at var(--mx) var(--my), ...)` 做 mask。
  指针位置用 lerp 0.1 平滑，每帧写 CSS 变量。触屏没有光标，直接给清晰版。
- **项目封面**（`lib/covers.ts`）：Canvas 现画，方形画布居中构图，4 个色系 × 3 种版式，
  裁成横幅（跑马灯）或竖条（卡片）都不丢主体。没有图片资源依赖。
- **堆叠卡**（`ProjectStack`）：`position: sticky` + 下一张压上来时 `scale` 到 0.91，
  用 rAF 节流的滚动监听算 `cover` 进度。
- **跑马灯**（`Marquee`）：滚动位移 `(scrollY - sectionTop + innerHeight) * 0.3`，两排反向。

## 内容怎么维护

| 想改 | 改哪里 |
|---|---|
| 项目名 / 简介 / 链接 | `src/App.tsx` 的 `projectMeta` |
| 能力 5 条 | `src/App.tsx` 的 `capabilities` |
| 项目卡里的图 | `projectMeta` 的 `images`，Heracles 用真实截图，其余用 `coverArt()` 生成 |
| 封面配色 / 版式 | `src/lib/covers.ts` 的 `SERIES` |
| 首屏两张图 | `SpotlightStage` 的 `baseSrc` / `revealSrc` |

## 关于 React Bits Pro

`components.json` 里配了 `@reactbits-starter` / `@reactbits-pro` 注册表与
`REACTBITS_LICENSE_KEY`。但本机连不上 `pro.reactbits.dev`，所以
`Device` / `CustomCursor` / `UserCursor` 是按官方文档行为手写的等价实现（原生 CSS）。

## 技术

- React + TypeScript + Vite，无 three.js、无 Tailwind、无动画库
- 字体自托管（@fontsource），零外部 CDN
- 构建产物 243KB JS / 21KB CSS
