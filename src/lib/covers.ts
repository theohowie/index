/**
 * 项目封面：纯 Canvas 生成，方形画布，居中构图，
 * 这样无论被裁成横幅（跑马灯）还是竖图（项目卡）都不会丢主体。
 */

export type ProjectKey = 'heracles' | 'zoosy' | 'bridge' | 'linkstudy'

type Series = {
  key: ProjectKey
  title: string
  meta: string
  grounds: [string, string, string]
}

const SERIES: Series[] = [
  {
    key: 'heracles',
    title: 'Heracles',
    meta: 'Android Agent',
    grounds: ['#1b2a24', '#33453a', '#ded2b8'],
  },
  {
    key: 'zoosy',
    title: 'Zoosy',
    meta: 'Flutter Journal',
    grounds: ['#2e2439', '#4b3a58', '#d3c6de'],
  },
  {
    key: 'bridge',
    title: 'Bridge',
    meta: 'Remote Desktop',
    grounds: ['#12294a', '#26456f', '#c2d2e4'],
  },
  {
    key: 'linkstudy',
    title: 'LinkStudy',
    meta: 'Timetable',
    grounds: ['#4b1f19', '#7c3223', '#e2c3a5'],
  },
]

const SIZE = 1000
const SERIF = '"Instrument Serif", "Songti SC", Georgia, serif'
const SANS = '"Inter Variable", "Inter", system-ui, sans-serif'

function toRgb(hex: string) {
  const v = hex.replace('#', '')
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ] as const
}

function rgba(hex: string, a: number) {
  const [r, g, b] = toRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

function luminance(hex: string) {
  const [r, g, b] = toRgb(hex)
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

function tracked(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  gap: number,
) {
  const chars = [...text]
  const widths = chars.map((c) => ctx.measureText(c).width)
  const total = widths.reduce((s, w) => s + w, 0) + gap * (chars.length - 1)
  let cx = x - total / 2
  chars.forEach((c, i) => {
    ctx.fillText(c, cx, y)
    cx += widths[i] + gap
  })
}

function fit(ctx: CanvasRenderingContext2D, text: string, max: number, start: number) {
  let size = start
  ctx.font = `400 ${size}px ${SERIF}`
  while (ctx.measureText(text).width > max && size > 40) {
    size -= 4
    ctx.font = `400 ${size}px ${SERIF}`
  }
  return size
}

function draw(project: ProjectKey, variant: number): string {
  const series = SERIES.find((s) => s.key === project) ?? SERIES[0]
  const ground = series.grounds[variant % 3]
  const dark = luminance(ground) < 0.55
  const ink = dark ? '#f5f0e6' : '#171513'
  const accent = dark ? series.grounds[2] : series.grounds[0]

  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  ctx.fillStyle = ground
  ctx.fillRect(0, 0, SIZE, SIZE)

  const cx = SIZE / 2
  const cy = SIZE / 2

  ctx.strokeStyle = rgba(ink, 0.2)
  ctx.lineWidth = 2
  ctx.strokeRect(64, 64, SIZE - 128, SIZE - 128)

  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

  const layout = variant % 3

  if (layout === 0) {
    ctx.font = `600 26px ${SANS}`
    ctx.fillStyle = rgba(ink, 0.66)
    tracked(ctx, series.meta.toUpperCase(), cx, cy - 150, 6)

    const size = fit(ctx, series.title, SIZE - 260, 168)
    ctx.fillStyle = ink
    ctx.fillText(series.title, cx, cy + size * 0.28)

    ctx.strokeStyle = rgba(accent, 0.9)
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(cx - 56, cy + 110)
    ctx.lineTo(cx + 56, cy + 110)
    ctx.stroke()
  } else if (layout === 1) {
    ctx.fillStyle = rgba(accent, 0.34)
    ctx.font = `400 620px ${SERIF}`
    ctx.fillText(series.title[0], cx, cy + 210)

    ctx.fillStyle = ink
    const size = fit(ctx, series.title, SIZE - 300, 132)
    ctx.fillText(series.title, cx, cy + size * 0.2)

    ctx.font = `600 22px ${SANS}`
    ctx.fillStyle = rgba(ink, 0.6)
    tracked(ctx, series.meta.toUpperCase(), cx, cy + 74, 5)
  } else {
    ctx.fillStyle = accent
    ctx.beginPath()
    ctx.arc(cx, cy, 300, 0, Math.PI * 2)
    ctx.fill()

    const onAccent = luminance(accent) > 0.6 ? '#171513' : '#f5f0e6'
    ctx.fillStyle = onAccent
    const size = fit(ctx, series.title, 460, 128)
    ctx.fillText(series.title, cx, cy + size * 0.22)

    ctx.font = `600 20px ${SANS}`
    ctx.fillStyle = onAccent
    ctx.globalAlpha = 0.78
    tracked(ctx, series.meta.toUpperCase(), cx, cy + 82, 5)
    ctx.globalAlpha = 1
  }

  return canvas.toDataURL('image/webp', 0.9)
}

const cache = new Map<string, string>()

export function coverArt(project: ProjectKey, variant = 0) {
  const key = `${project}-${variant % 3}`
  const hit = cache.get(key)
  if (hit) return hit
  const url = draw(project, variant)
  cache.set(key, url)
  return url
}

/** 预生成一遍，避免滚动时才现画 */
export async function warmCovers() {
  if (!('fonts' in document)) return
  try {
    await document.fonts.load('400 120px "Instrument Serif"')
    await document.fonts.load('600 26px "Inter Variable"')
  } catch {
    /* 用回退字体也能画 */
  }
  SERIES.forEach((series) => {
    for (let v = 0; v < 3; v += 1) coverArt(series.key, v)
  })
}

export const projectSeries = SERIES
