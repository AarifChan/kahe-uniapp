import { defineConfig } from "unocss";
import presetWeapp from "unocss-preset-weapp";
import { transformerClass } from "unocss-preset-weapp/transformer";
import { resolve } from "path";

// uni-app rpx 转换函数
function rpx(value: number) {
  return `${value}rpx`;
}

export default defineConfig({
  // 将含 []、() 等字符的原子类转为小程序合法类名，避免 app.wxss 出现转义反斜杠（WXSS 解析报错）
  transformers: [transformerClass()],

  presets: [
    // 小程序 WXSS 不支持 Uno 默认的转义类选择器（含 \\），需配合下方 transformerClass
    presetWeapp({
      preflight: false,
      platform: "uniapp",
      whRpx: true,
    }),
  ],

  // 自定义规则 - 处理 rpx 单位
  rules: [
    // 宽度 - w-750 -> width: 750rpx
    [/^w-(\d+)$/, ([_, num]) => ({ width: rpx(Number(num)) })],
    [/^w-\[(\d+)rpx\]$/, ([_, num]) => ({ width: rpx(Number(num)) })],

    // 高度 - h-100 -> height: 100rpx
    [/^h-(\d+)$/, ([_, num]) => ({ height: rpx(Number(num)) })],
    [/^h-\[(\d+)rpx\]$/, ([_, num]) => ({ height: rpx(Number(num)) })],

    // 内边距 - p-4 -> padding: 4rpx
    [/^p-(\d+)$/, ([_, num]) => ({ padding: rpx(Number(num)) })],
    [
      /^px-(\d+)$/,
      ([_, num]) => ({
        "padding-left": rpx(Number(num)),
        "padding-right": rpx(Number(num)),
      }),
    ],
    [
      /^py-(\d+)$/,
      ([_, num]) => ({
        "padding-top": rpx(Number(num)),
        "padding-bottom": rpx(Number(num)),
      }),
    ],
    [/^pt-(\d+)$/, ([_, num]) => ({ "padding-top": rpx(Number(num)) })],
    [/^pb-(\d+)$/, ([_, num]) => ({ "padding-bottom": rpx(Number(num)) })],
    [/^pl-(\d+)$/, ([_, num]) => ({ "padding-left": rpx(Number(num)) })],
    [/^pr-(\d+)$/, ([_, num]) => ({ "padding-right": rpx(Number(num)) })],

    // 外边距 - m-4 -> margin: 4rpx
    [/^m-(\d+)$/, ([_, num]) => ({ margin: rpx(Number(num)) })],
    [
      /^mx-(\d+)$/,
      ([_, num]) => ({
        "margin-left": rpx(Number(num)),
        "margin-right": rpx(Number(num)),
      }),
    ],
    [
      /^my-(\d+)$/,
      ([_, num]) => ({
        "margin-top": rpx(Number(num)),
        "margin-bottom": rpx(Number(num)),
      }),
    ],
    [/^mt-(\d+)$/, ([_, num]) => ({ "margin-top": rpx(Number(num)) })],
    [/^mb-(\d+)$/, ([_, num]) => ({ "margin-bottom": rpx(Number(num)) })],
    [/^ml-(\d+)$/, ([_, num]) => ({ "margin-left": rpx(Number(num)) })],
    [/^mr-(\d+)$/, ([_, num]) => ({ "margin-right": rpx(Number(num)) })],

    // 圆角 - rounded-4 -> border-radius: 4rpx
    [/^rounded-(\d+)$/, ([_, num]) => ({ "border-radius": rpx(Number(num)) })],
    [/^rounded-full$/, () => ({ "border-radius": "50%" })],
    // 方向性圆角
    [
      /^rounded-t-(\d+)$/,
      ([_, num]) => ({
        "border-top-left-radius": rpx(Number(num)),
        "border-top-right-radius": rpx(Number(num)),
      }),
    ],
    [
      /^rounded-b-(\d+)$/,
      ([_, num]) => ({
        "border-bottom-left-radius": rpx(Number(num)),
        "border-bottom-right-radius": rpx(Number(num)),
      }),
    ],
    [
      /^rounded-l-(\d+)$/,
      ([_, num]) => ({
        "border-top-left-radius": rpx(Number(num)),
        "border-bottom-left-radius": rpx(Number(num)),
      }),
    ],
    [
      /^rounded-r-(\d+)$/,
      ([_, num]) => ({
        "border-top-right-radius": rpx(Number(num)),
        "border-bottom-right-radius": rpx(Number(num)),
      }),
    ],
    [
      /^rounded-tl-(\d+)$/,
      ([_, num]) => ({ "border-top-left-radius": rpx(Number(num)) }),
    ],
    [
      /^rounded-tr-(\d+)$/,
      ([_, num]) => ({ "border-top-right-radius": rpx(Number(num)) }),
    ],
    // 字体大小 - text-14 -> font-size: 14rpx
    [/^text-(\d+)$/, ([_, num]) => ({ "font-size": rpx(Number(num)) })],

    // 行高 - leading-20 -> line-height: 20rpx
    [/^leading-(\d+)$/, ([_, num]) => ({ "line-height": rpx(Number(num)) })],

    // gap
    [/^gap-(\d+)$/, ([_, num]) => ({ gap: rpx(Number(num)) })],
    [/^gap-x-(\d+)$/, ([_, num]) => ({ "column-gap": rpx(Number(num)) })],
    [/^gap-y-(\d+)$/, ([_, num]) => ({ "row-gap": rpx(Number(num)) })],

    // 定位 - top/right/bottom/left
    [/^top-(\d+)$/, ([_, num]) => ({ top: rpx(Number(num)) })],
    [/^right-(\d+)$/, ([_, num]) => ({ right: rpx(Number(num)) })],
    [/^bottom-(\d+)$/, ([_, num]) => ({ bottom: rpx(Number(num)) })],
    [/^left-(\d+)$/, ([_, num]) => ({ left: rpx(Number(num)) })],

    // 负定位
    [/^-top-(\d+)$/, ([_, num]) => ({ top: `-${rpx(Number(num))}` })],
    [/^-right-(\d+)$/, ([_, num]) => ({ right: `-${rpx(Number(num))}` })],
    [/^-bottom-(\d+)$/, ([_, num]) => ({ bottom: `-${rpx(Number(num))}` })],
    [/^-left-(\d+)$/, ([_, num]) => ({ left: `-${rpx(Number(num))}` })],

    // min/max width
    [/^min-w-(\d+)$/, ([_, num]) => ({ "min-width": rpx(Number(num)) })],
    ["min-w-0", { "min-width": "0px" }],
    ["max-w-full", { "max-width": "100%" }],
    ["max-w-none", { "max-width": "none" }],

    // font-weight
    [/^font-(\d+)$/, ([_, num]) => ({ "font-weight": Number(num) })],
    ["font-light", { "font-weight": 300 }],
    ["font-normal", { "font-weight": 400 }],
    ["font-medium", { "font-weight": 500 }],
    ["font-semibold", { "font-weight": 600 }],
    ["font-bold", { "font-weight": 700 }],

    // 负 margin
    [/^-ml-(\d+)$/, ([_, num]) => ({ "margin-left": `-${rpx(Number(num))}` })],
    [/^-mt-(\d+)$/, ([_, num]) => ({ "margin-top": `-${rpx(Number(num))}` })],

    // z-index
    [/^z-(\d+)$/, ([_, num]) => ({ "z-index": Number(num) })],

    // flex 布局
    ["flex-wrap", { "flex-wrap": "wrap" }],
    ["flex-nowrap", { "flex-wrap": "nowrap" }],
    ["flex-1", { flex: "1 1 0%" }],
    ["flex-auto", { flex: "1 1 auto" }],
    ["flex-none", { flex: "none" }],
    [
      /^flex-(row|col|column)$/,
      ([_, dir]) => ({ "flex-direction": dir === "col" ? "column" : dir }),
    ],

    // grid 布局
    [
      /^grid-cols-(\d+)$/,
      ([_, num]) => ({
        "grid-template-columns": `repeat(${num}, minmax(0, 1fr))`,
      }),
    ],
    [/^col-span-(\d+)$/, ([_, num]) => ({ "grid-column": `span ${num} / span ${num}` })],
    [
      /^row-span-(\d+)$/,
      ([_, num]) => ({ "grid-row": `span ${num} / span ${num}` }),
    ],

    // 透明度
    [/^opacity-(\d+)$/, ([_, num]) => ({ opacity: Number(num) / 100 })],

    // 边框宽度
    [
      /^border-(\d+)$/,
      ([_, num]) => ({
        "border-width": rpx(Number(num)),
        "border-style": "solid",
      }),
    ],
    [
      /^border-(\d+)rpx$/,
      ([_, num]) => ({
        "border-width": rpx(Number(num)),
        "border-style": "solid",
      }),
    ],

    // 边框颜色 - 使用主题色
    [
      /^border-(\w+)$/,
      ([_, color], { theme }) => {
        const themeColors = theme?.colors || {};
        if (themeColors[color]) {
          return { "border-color": themeColors[color] };
        }
      },
    ],
    // 边框颜色 - 任意值
    [/^border-\[([^\]]+)\]$/, ([_, value]) => ({ "border-color": value })],

    // 单边边框
    [
      /^border-t-(\d+)$/,
      ([_, num]) => ({
        "border-top-width": rpx(Number(num)),
        "border-top-style": "solid",
      }),
    ],
    [
      /^border-b-(\d+)$/,
      ([_, num]) => ({
        "border-bottom-width": rpx(Number(num)),
        "border-bottom-style": "solid",
      }),
    ],
    [
      /^border-l-(\d+)$/,
      ([_, num]) => ({
        "border-left-width": rpx(Number(num)),
        "border-left-style": "solid",
      }),
    ],
    [
      /^border-r-(\d+)$/,
      ([_, num]) => ({
        "border-right-width": rpx(Number(num)),
        "border-right-style": "solid",
      }),
    ],
    [
      /^text-stroke-(\d+)$/,
      ([_, num]) => ({
        "-webkit-text-stroke-width": `${num}px`,
        "text-stroke-width": `${num}px`,
      }),
    ],
    [
      /^text-stroke-\[([^\]]+)\]$/,
      ([_, color]) => ({
        "-webkit-text-stroke-color": color,
        "text-stroke-color": color,
      }),
    ],
    // text-shadow 形式描边：text-stroke-2-[#151714]
    [
      /^text-stroke-(\d+)-\[([^\]]+)\]$/,
      ([_, width, color]) => {
        const w = `${width}rpx`;
        return {
          "text-shadow": `-${w} -${w} 0 ${color}, ${w} -${w} 0 ${color}, -${w} ${w} 0 ${color}, ${w} ${w} 0 ${color}`,
        };
      },
    ],

    // ========== text-shadow 文字描边 ==========
    // 描边宽度: text-outline-2, text-outline-3
    [
      /^text-outline-(\d+)$/,
      ([_, width]) => {
        const w = Number(width);
        const c = "var(--outline-color, #ff4444)";
        return {
          "--outline-width": `${w}rpx`,
          "text-shadow": `${
            [
              `-${w}rpx -${w}rpx 0 ${c}`,
              `${w}rpx -${w}rpx 0 ${c}`,
              `-${w}rpx ${w}rpx 0 ${c}`,
              `${w}rpx ${w}rpx 0 ${c}`,
              `0 -${w}rpx 0 ${c}`,
              `0 ${w}rpx 0 ${c}`,
              `-${w}rpx 0 0 ${c}`,
              `${w}rpx 0 0 ${c}`,
            ].join(", ")
          }`,
        };
      },
    ],
    // 描边颜色: text-outline-red, text-outline-[#ff4444]
    [
      /^text-outline-([a-zA-Z]+|\[#[0-9a-fA-F]{3,8}\])$/,
      ([_, color]) => {
        const colorMap: Record<string, string> = {
          red: "#ff4444",
          orange: "#ff8800",
          yellow: "#ffcc00",
          green: "#44cc44",
          blue: "#4488ff",
          purple: "#aa44ff",
          pink: "#ff66aa",
          black: "#000000",
          white: "#ffffff",
          primary: "#0F2268",
        };
        // [#ff4444] 格式
        if (color.startsWith("[") && color.endsWith("]")) {
          return { "--outline-color": color.slice(1, -1) };
        }
        // 预设颜色
        if (colorMap[color]) {
          return { "--outline-color": colorMap[color] };
        }
      },
    ],

    // 宽高比
    [/^aspect-ratio-\[(\d+)\/(\d+)\]$/, ([_, w, h]) => ({ "aspect-ratio": `${w}/${h}` })],

    // 盒模型
    ["box-border", { "box-sizing": "border-box" }],

    // 文本换行
    ["whitespace-nowrap", { "white-space": "nowrap" }],

    // 阴影
    [/^shadow-\[(.+)\]$/, ([_, value]) => ({ "box-shadow": value.replace(/_/g, " ") })],

    // 百分比定位
    ["left-1/2", { left: "50%" }],

    // px 单位边框宽度
    [
      /^border-(\d+)px$/,
      ([_, num]) => ({
        "border-width": `${num}px`,
        "border-style": "solid",
      }),
    ],

    // 项目字体工具类
    ["theme-font", { "font-family": "YouSheBiaoTiHei" }],
    ["price-font", { "font-family": "AccidentalPresidency" }],
    ["other-font", { "font-family": "ZiHunYuWanTi" }],

    // 行内块
    ["inline-block", { display: "inline-block" }],

    // 字体
    ["font-mono", { "font-family": "monospace" }],

    // border-none
    ["border-none", { "border-width": "0" }],

    // whitespace-pre-wrap
    ["whitespace-pre-wrap", { "white-space": "pre-wrap" }],

    // object-fit
    [/^object-(cover|contain|fill|none|scale-down)$/, ([_, value]) => ({ "object-fit": value })],

    // transition
    ["transition", { transition: "all 0.3s ease" }],
    [/^transition-(\d+)$/, ([_, num]) => ({ transition: `all ${num}ms ease` })],

    // word-break
    [/^word-break-(normal|break-all|keep-all)$/, ([_, value]) => ({ "word-break": value })],

    // cursor
    [/^cursor-(pointer|not-allowed|default)$/, ([_, value]) => ({ cursor: value })],

    // inset
    ["inset-0", { top: "0", right: "0", bottom: "0", left: "0" }],
    [/^inset-(\d+)$/, ([_, num]) => ({ top: rpx(Number(num)), right: rpx(Number(num)), bottom: rpx(Number(num)), left: rpx(Number(num)) })],

    // min/max height
    [/^min-h-(\d+)$/, ([_, num]) => ({ "min-height": rpx(Number(num)) })],
    [/^max-h-(\d+)$/, ([_, num]) => ({ "max-height": rpx(Number(num)) })],
    ["max-h-full", { "max-height": "100%" }],
    ["max-h-none", { "max-height": "none" }],
    ["max-h-screen", { "max-height": "100vh" }],

    // max width
    [/^max-w-(\d+)$/, ([_, num]) => ({ "max-width": rpx(Number(num)) })],

    // 百分比宽度
    ["w-1/2", { width: "50%" }],
    ["w-1/3", { width: "33.333333%" }],
    ["w-2/3", { width: "66.666667%" }],
    ["w-1/4", { width: "25%" }],
    ["w-3/4", { width: "75%" }],
    ["w-1/5", { width: "20%" }],
    ["w-2/5", { width: "40%" }],
    ["w-3/5", { width: "60%" }],
    ["w-4/5", { width: "80%" }],

    // 百分比高度
    ["h-1/2", { height: "50%" }],
    ["h-1/3", { height: "33.333333%" }],
    ["h-2/3", { height: "66.666667%" }],
    ["h-1/4", { height: "25%" }],
    ["h-3/4", { height: "75%" }],

    // 百分比定位
    ["top-1/2", { top: "50%" }],
    ["right-1/2", { right: "50%" }],
    ["bottom-1/2", { bottom: "50%" }],
    ["left-1/2", { left: "50%" }],

    // translate 由 preset-weapp 内置规则生成（依赖 --un-* 变量，默认值见 App.vue 全局样式）

    // text-shadow 任意值
    [/^text-shadow-\[(.+)\]$/, ([_, value]) => ({ "text-shadow": value.replace(/_/g, " ") })],

    // 背景渐变
    [/^bg-gradient-\[(.+)\]$/, ([_, value]) => ({ background: value.replace(/_/g, " ") })],

    // 任意背景图片
    [/^bg-\[(url\([^\]]+\))\]$/, ([_, value]) => ({ "background-image": value })],
  ],

  // 快捷方式 - 组合常用类名
  shortcuts: [
    {
    // 布局
    "flex-center": "flex items-center justify-center",
    "flex-col-center": "flex flex-col items-center justify-center",
    "flex-between": "flex items-center justify-between",
    "flex-around": "flex items-center justify-around",

    // 常用组件样式
    "btn-primary": "flex-center h-88 rounded-44 bg-primary text-white",
    card: "p-24 rounded-16 bg-white",

    // 卡片描边：四边不等宽 + 圆角（上4 右7 下8 左5）
    "sticker-border":
      "border-t-4 border-r-7 border-b-8 border-l-5 border-[#151714] rounded-24",

    // 文字省略
    "text-ellipsis": "overflow-hidden text-ellipsis whitespace-nowrap",
    "text-ellipsis-2": "overflow-hidden text-ellipsis line-clamp-2",

    // 安全区适配
    "safe-bottom": "pb-[env(safe-area-inset-bottom)]",
    "safe-top": "pt-[env(safe-area-inset-top)]",

    // ========== 文字描边（text-shadow 形式） ==========
    // 基础描边：白字红边（最常用）
    "text-outline": "text-white text-outline-2 text-outline-red",
    "text-outline-sm": "text-white text-outline-1 text-outline-red",
    "text-outline-md": "text-white text-outline-2 text-outline-red",
    "text-outline-lg": "text-white text-outline-3 text-outline-red",
    "text-outline-xl": "text-white text-outline-4 text-outline-red",

    // 游戏风格文字
    "game-text": "text-white text-outline-2 text-outline-red font-bold",
    "game-text-sm": "text-white text-outline-1 text-outline-red font-bold",
    "game-text-lg": "text-white text-outline-3 text-outline-red font-bold",
    },

    // 动态卡片描边：sticker-<上>-<右>-<下>-<左>-<圆角>（单位均为 rpx，描边色固定 #151714）
    // 示例：sticker-4-7-8-5-24 → 上4 右7 下8 左5，圆角24rpx
    [
      /^sticker-(\d+)-(\d+)-(\d+)-(\d+)-(\d+)$/,
      ([, t, r, b, l, rd]) =>
        `border-t-${t} border-r-${r} border-b-${b} border-l-${l} border-[#151714] rounded-${rd}`,
    ],
  ],

  // 主题配置 - 与项目设计系统对齐
  theme: {
    colors: {
      // 主色调
      primary: "#0F2268",
      "primary-light": "#1a3a8a",

      // 背景色
      "main-bg": "#FDEFCC",
      "second-bg": "#FDEFCC",
      "page-bg": "#f5f5f5",

      // 文字色
      "text-primary": "#333333",
      "text-secondary": "#666666",
      "text-tertiary": "#999999",

      // 边框色
      border: "#e5e5e5",

      // 功能色
      success: "#52c41a",
      warning: "#faad14",
      error: "#f5222d",
    },
    fontFamily: {
      theme: "YouSheBiaoTiHei",
      price: "AccidentalPresidency",
      other: "ZiHunYuWanTi",
    },
  },

  // 排除与 TuNiao UI 冲突的类名
  blocklist: [
    // TuNiao UI 组件类名前缀
    /^tn-/,
  ],

  // 安全列表 - 确保这些类始终生成
  safelist: [],

  // 详细日志（开发时启用）
  details: false,
});
