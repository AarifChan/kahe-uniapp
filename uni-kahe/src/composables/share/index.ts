/* global plus, uni, console */
import { ShowToast } from "@/utils";

export interface WeixinMiniProgramShareOptions {
  title: string;
  imageUrl: string;
  path: string;
}

const DEFAULT_MINI_PROGRAM_ID = "gh_4a7522ad6b7a";
const DEFAULT_WEB_URL = "https://app.91tcg.com";
// Use a tiny fixed image as emergency thumbnail fallback for WeChat.
const DEFAULT_FALLBACK_IMAGE =
  "https://jms.85gui7.com/kahe-202510/jikaquan/jikaquan-share.jpg";
const DEFAULT_SCENE: "WXSceneSession" | "WXSceneTimeline" = "WXSceneSession";
const DEFAULT_MINI_PROGRAM_TYPE: 0 | 1 | 2 = 0;

export function shareWeixinMiniProgramCard(
  options: WeixinMiniProgramShareOptions
) {
  const { title, imageUrl, path } = options;

  if (!path) {
    ShowToast("分享路径为空，暂无法分享");
    return;
  }

  // #ifdef APP-PLUS
  let wxInstalled = false;
  try {
    const wxByAction = plus.runtime.isApplicationExist({
      pname: "com.tencent.mm",
      action: "weixin://",
    });
    const wxByPkg = plus.runtime.isApplicationExist({
      pname: "com.tencent.mm",
    });
    wxInstalled = !!(wxByAction || wxByPkg);
    console.log("[Share][Weixin] install check:", {
      wxByAction,
      wxByPkg,
      path,
      miniProgramId: DEFAULT_MINI_PROGRAM_ID,
    });
  } catch (e) {
    console.log("[Share][Weixin] install check error:", e);
  }

  if (!wxInstalled) {
    ShowToast("请先安装微信");
    return;
  }

  const doShare = (thumb: string, isRetry: boolean) => {
    uni.share({
      provider: "weixin",
      type: 5,
      scene: DEFAULT_SCENE,
      title,
      imageUrl: thumb,
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
        const code = err?.code ?? "";
        const message = err?.message || err?.msg || err?.errMsg || "unknown";
        const raw = (() => {
          try {
            return JSON.stringify(err);
          } catch {
            return String(err);
          }
        })();
        console.error("[Share][Weixin] 分享失败:", {
          code,
          message,
          raw,
          thumb,
          isRetry,
        });

        if (!isRetry && thumb !== DEFAULT_FALLBACK_IMAGE) {
          console.warn(
            "[Share][Weixin] 首次分享失败，使用 fallback 缩略图重试"
          );
          doShare(DEFAULT_FALLBACK_IMAGE, true);
          return;
        }

        ShowToast(`分享失败(${code}): ${message}`);
      },
    });
  };

  doShare(imageUrl || DEFAULT_FALLBACK_IMAGE, false);
  // #endif

  // #ifndef APP-PLUS
  console.log("[Share][Weixin] 非APP环境，请使用平台原生分享");
  // #endif
}
