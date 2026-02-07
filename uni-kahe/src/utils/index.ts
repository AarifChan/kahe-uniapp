export * from "./Toast";

export const getLastPage = () => {
  const routes = getCurrentPages();
  return routes[routes.length - 1] as any;
};

export function currentEnv(): string {
  // #ifdef MP-WEIXIN
  return "mp-weixin";
  // #endif
  if (typeof window === "undefined" || !window.navigator) {
    return "unknown"; // Return a fallback for non-browser environments
  }

  const ua = window.navigator.userAgent.toLowerCase();
  const isWeChat = ua.includes("micromessenger");
  const isMiniProgram = ua.includes("miniprogram");
  const isAlipay = ua.includes("alipay");

  if (isWeChat && isMiniProgram) return "mp-weixin";
  if (isWeChat) return "h5-weixin";
  if (isAlipay && isMiniProgram) return "mp-alipay";
  if (isAlipay) return "h5-alipay";

  return "pc";
}
export const getTitleByQuality = (val: number) => {
  switch (val) {
    case 1:
      return "损伤品相";
    case 2:
      return "瑕疵品相";
    case 3:
      return "全新未拆";
    case 4:
      return "已拆盒";
    default:
      return "流通品相";
  }
};
