# Portfolio Design Notes

## 目标

用最少的结构说明三件事：我是谁、做过什么、在哪里查看。
截图是主角，界面只负责把它托起来。

## 设计原则

- 内容先于装饰，不使用营销标语。
- 真实截图承担说明，减少辅助文案。
- 一块暖白底（`#f5f4f1`）+ 墨黑字 + 发丝分隔线，只有热点轻微上浮。
- 单个强调色 `--accent` 只用于焦点环，不做装饰性大面积上色。
- 支持键盘焦点、减少动态效果、单列移动端。

## 组件

源码在 `src/components/`，均为原生 React + CSS，不依赖 UI 库。

### `Device` — 手机展示组件

所有界面截图都应该放进它。工作室打光感的立体机身：金属渐变边框、侧键、
屏幕柔光、地面投影，指针在附近移动时有轻微视差。

```tsx
<Device
  src={assetUrl('images/heracles-hero.webp')}  // 截图
  alt="Heracles 任务计划面板"                    // 无障碍描述
  width="clamp(206px, 62vw, 268px)"             // 数字（px）或任意 CSS 长度
  tilt={-7}                                     // 静态 Y 轴旋转角度
  priority                                       // 首屏用，跳过懒加载
/>
```

内部所有尺寸都由 `--device-w` 推导（圆角、边框、侧键、投影），
所以改一个宽度，整台机器按比例缩放，不会出现错位。

截图建议：**整屏、无状态栏、竖屏**。当前素材是 560×1216（比例 0.46）。

### `CustomCursor` — 环形光标

鼠标位置一个圆环 + 一个实心点。悬停可交互元素时圆环放大、圆点退让；
带 `data-cursor-label="文字"` 的元素会把圆环撑成药丸并显示该文字。

- 触屏设备、`prefers-reduced-motion: reduce` 下自动不挂载，原生光标照常。
- 挂在 `App.tsx` 顶层，全局生效。
- 非原生控件想被识别，加 `data-cursor-target`。

### `HoverPreview` — 悬停浮层

悬停某一行时，一张卡片跟着指针走，用于「二次开发」列表。

```tsx
<HoverPreview preview={<div className="preview-card">…</div>}>
  <div className="row">…</div>
</HoverPreview>
```

### `Reveal` — 入场动画

`IntersectionObserver` 触发一次，延迟可用 `delay` 控制。

## 怎么加新截图

1. 把图放进 `public/images/`，命名 `项目-用途.webp`。
2. 在 `src/data.ts` 的 `heraclesScreens` 里追加一条
   `{ src, alt, label }`：第一条是主图，后两条排在两侧。
3. 其它项目还没有截图，先用 `<EmptyDevice mark="首字母" />` 占位，
   有图之后换成 `<Device src=… alt=… />`，版式不用动。

## 关于 React Bits Pro

`components.json` 已按官方文档配好 `@reactbits-starter` / `@reactbits-pro`
两个注册表，授权码读 `.env.local` 里的 `REACTBITS_LICENSE_KEY`。

但本机的 `pro.reactbits.dev` 走代理连不上，`npx shadcn@latest add` 拉不到
文件，所以 `Device` 和 `CustomCursor` 是按官方文档描述的行为手写的等价实现
（原生 CSS，没有 Tailwind，也不依赖 shadcn 体系）。等你本地能连上注册表时，
可以按官方命令装上原版，再逐个替换 `src/components/` 下的同名组件。

## 技术

- React + TypeScript + Vite
- 本地字体与图片资源
- GitHub Pages + GitHub Actions
- 语义化标题、键盘焦点、减少动态效果支持
