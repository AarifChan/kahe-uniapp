import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  // 动态导入 ESM 模块
  const UnoCSS = (await import("unocss/vite")).default;

  return {
    plugins: [
      // UnoCSS 必须在 uni 插件之前
      UnoCSS(),
      uni(),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    build: {
      // 禁止内联大于 4KB 的资源（小程序不建议内联）
      assetsInlineLimit: 4096,
      // 启用源码压缩
      minify: "terser",
      terserOptions: {
        compress: {
          // 删除 console.* 和 debugger（生产环境）
          drop_console: process.env.NODE_ENV === "production",
          drop_debugger: process.env.NODE_ENV === "production",
        },
      },
      // 代码分割配置
      rollupOptions: {
        output: {
          // 控制 chunk 文件命名，便于缓存
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];
            if (/\.(png|jpe?g|gif|svg|webp)$/i.test(assetInfo.name)) {
              return "static/images/[name]-[hash][extname]";
            }
            if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
              return "static/fonts/[name]-[hash][extname]";
            }
            return "static/[ext]/[name]-[hash][extname]";
          },
        },
      },
    },
    server: {
      hmr: {
        overlay: true,
      },
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
  };
});
