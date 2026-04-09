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
