import { ShowToast } from "@/utils";

export interface WeixinMiniProgramShareOptions {
  title: string;
  imageUrl: string;
  path: string;
}

const DEFAULT_MINI_PROGRAM_ID = "gh_4a7522ad6b7a";
const DEFAULT_WEB_URL = "https://app.91tcg.com";
const DEFAULT_SCENE: "WXSceneSession" | "WXSenceTimeline" = "WXSceneSession";
const DEFAULT_MINI_PROGRAM_TYPE: 0 | 1 | 2 = 0;

export function shareWeixinMiniProgramCard(options: WeixinMiniProgramShareOptions) {
  const { title, imageUrl, path } = options;

  if (!path) {
    ShowToast("分享路径为空，暂无法分享");
    return;
  }

  // #ifdef APP-PLUS
  try {
    const wxByAction = plus.runtime.isApplicationExist({
      pname: "com.tencent.mm",
      action: "weixin://",
    });
    const wxByPkg = plus.runtime.isApplicationExist({
      pname: "com.tencent.mm",
    });
    console.log("[Share][Weixin] install check:", {
      wxByAction,
      wxByPkg,
      path,
      miniProgramId: DEFAULT_MINI_PROGRAM_ID,
    });
  } catch (e) {
    console.log("[Share][Weixin] install check error:", e);
  }

  uni.share({
    provider: "weixin",
    type: 5,
    scene: DEFAULT_SCENE,
    title,
    imageUrl,
    miniProgram: {
      id: DEFAULT_MINI_PROGRAM_ID,
      path,
      type: DEFAULT_MINI_PROGRAM_TYPE,
      webUrl: DEFAULT_WEB_URL,
    },
    success: (ret) => {
      ShowToast("分享成功");
      console.log(JSON.stringify(ret));
    },
    fail: (err: any) => {
      console.error("分享失败:", err);
      const message = err?.message || err?.msg || "unknown";
      const code = err?.code ?? "";
      ShowToast(`分享失败(${code}): ${message}`);
    },
  });
  // #endif

  // #ifndef APP-PLUS
  ShowToast("请在APP内使用微信分享");
  // #endif
}
