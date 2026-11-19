# Portfolio Design Notes

## 定位

面向招聘方、合作者和开源访客的 AI 产品作品集。页面目标不是罗列仓库，而是证明三件事：

1. 能把想法拆成可运行的产品。
2. 理解 Agent、移动端与 AI 工作流的完整链路。
3. 对原创、二次开发和 Fork 研究保持清楚的归属边界。

## 视觉系统

- **Canvas** `#edf1f2`：浅灰蓝工程画布
- **Ink** `#081d24`：主文字与深色产品面板
- **Signal** `#ff5a2a`：行动与关键状态
- **Teal** `#0c7372`：产品辅助色
- **Green** `#b8e66b`：运行与验证状态
- **Blue** `#315efb`：焦点与系统信号

字体采用 Manrope Variable 作为英文显示字体，IBM Plex Mono 用于状态、索引和技术标签，中文使用系统中文字体，保持加载速度。

## 信息结构

1. Hero：定位与 Heracles 产品轨迹
2. Original Products：原创产品档案
3. Rebuilt with Respect：二次开发与上游归属
4. Research Library：Fork 技术研究
5. Working Method：产品判断、实现与验收流程
6. Footer：GitHub 与站点收束

## 交互与可访问性

- 首屏分阶段进入，正文使用 IntersectionObserver 渐进显现
- 所有动效支持 `prefers-reduced-motion`
- 键盘焦点使用高对比蓝色外框
- 移动端不依赖 hover 查看关键信息
- 项目外链统一使用新窗口与 `noreferrer`
