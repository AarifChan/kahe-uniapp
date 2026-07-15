import { get } from "@/utils/request";
import type { AppConfigModel } from "@/model";

/* 获取应用配置 */
export const getAppConfigRequest = async () => {
  return await get<AppConfigModel>("app/config", {});
};
