export * from "./tabBar/index";

/**
 * 审核版本开关：构建/启动时设置环境变量 VITE_APP_AUDIT=true 生效。
 * 审核版本会隐藏首页活动入口、部分 tab、我的页面的增值功能等。
 */
export const isAuditVersion = import.meta.env.VITE_APP_AUDIT === "true";

export const RequestConfig = {
  baseUrl: import.meta.env.VITE_APP_BASEURL,
  header: "",
  loading: "",
  dataType: "",
  version: "1.0.1",
  desc: "修复已知问题，优化用户体验",
  appid: "wx10b94d42fb96356a",
};
