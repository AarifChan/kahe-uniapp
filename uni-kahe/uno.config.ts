import { defineConfig } from "unocss";
import { presetUno } from "@unocss/preset-uno";
import { resolve } from "path";

// uni-app rpx 转换函数
function rpx(value: number) {
  return `${value}rpx`;
}

export default defineConfig({
  presets: [
    presetUno({
      // 禁用 preflight，避免与 TuNiao UI 冲突
      preflight: false,
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

    // 负 margin
    [/^-ml-(\d+)$/, ([_, num]) => ({ "margin-left": `-${rpx(Number(num))}` })],
    [/^-mt-(\d+)$/, ([_, num]) => ({ "margin-top": `-${rpx(Number(num))}` })],

    // z-index
    [/^z-(\d+)$/, ([_, num]) => ({ "z-index": Number(num) })],

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
  ],

  // 快捷方式 - 组合常用类名
  shortcuts: {
    // 布局
    "flex-center": "flex items-center justify-center",
    "flex-col-center": "flex flex-col items-center justify-center",
    "flex-between": "flex items-center justify-between",
    "flex-around": "flex items-center justify-around",

    // 常用组件样式
    "btn-primary": "flex-center h-88 rounded-44 bg-primary text-white",
    card: "p-24 rounded-16 bg-white",

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
    // 项目已有工具类
    "theme-font",
    "price-font",
  ],

  // 安全列表 - 确保这些类始终生成
  safelist: [],

  // 详细日志（开发时启用）
  details: false,
});
