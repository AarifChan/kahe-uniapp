import vuePlugin from "eslint-plugin-vue";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import js from "@eslint/js"; // ESLint 推荐规则
import tsParser from "@typescript-eslint/parser"; // TypeScript 解析器
import tsPlugin from "@typescript-eslint/eslint-plugin"; // TypeScript 插件
import vueParser from "vue-eslint-parser";

export default [
  // ESLint 推荐规则
  js.configs.recommended,

  // Vue 推荐规则
  ...vuePlugin.configs["flat/recommended"],

  // Prettier 推荐规则
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "warn", // Prettier 格式化警告
    },
  },

  // TypeScript 配置
  {
    files: ["**/*.ts", "**/*.tsx"], // 匹配 TypeScript 文件
    languageOptions: {
      parser: tsParser, // 使用 TypeScript 解析器
      parserOptions: {
        ecmaVersion: 2020, // 支持 ES2020
        sourceType: "module", // 使用 ES 模块
        project: "./tsconfig.json", // 指定 tsconfig.json 路径
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin, // 启用 TypeScript 插件
    },
    rules: {
      // TypeScript 自定义规则
      "@typescript-eslint/no-unused-vars": "warn", // 未使用的变量警告
      "@typescript-eslint/no-explicit-any": "off", // 允许使用 any
    },
  },

  // JavaScript 和 Vue 配置
  {
    files: ["**/*.js", "**/*.vue", "**/*.jsx"], // 匹配 JavaScript 和 Vue 文件
    ignores: ["node_modules/*", "dist/*"], // 忽略的文件或目录
    languageOptions: {
      parser: vueParser, // 使用 vue-eslint-parser 解析 .vue 文件
      parserOptions: {
        parser: tsParser, // .vue 文件中的 <script> 用 ts 解析
        ecmaVersion: 2020,
        sourceType: "module",
        extraFileExtensions: [".vue"],
        project: "./tsconfig.json",
      },
      globals: {
        // 全局变量
        uni: "readonly", // Uniapp 全局变量
        wx: "readonly", // 微信小程序全局变量
        getApp: "readonly", // 小程序全局方法
        browser: true, // 浏览器环境
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {
      // Vue 相关自定义规则
      "vue/multi-word-component-names": "off", // 关闭多词组件名校验
      "no-undef": ["error", { "typeof": true, "vars": true }], // 保持no-undef开启
      "no-console": "off", // 允许使用console
    },
  },
];
