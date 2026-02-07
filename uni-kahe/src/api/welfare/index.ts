import { get, post } from "@/utils/request";
import {
  WelfareDetailResponse,
  WelfareDet,
  WelfareHelpParams,
  WelfareUserListParams,
  WelfareListItem,
} from "@/model/welfare";
import type { ListObject, PageParams, UIWelareRewardListItem } from "@/model";

// 主页
export const getWelfareIndex = async (params: any) => {
  return await get<WelfareDet>("activity/welfare", params);
};
export const getWelfareListRequest = async (params: any) => {
  return await get<ListObject<WelfareListItem>>(
    "activity/welfare/list",
    params
  );
};

// 详情
export const getWelfareDetail = async (aid: number) => {
  return await get<WelfareDetailResponse>("activity/welfare/detail", {
    aid,
  });
};
// 参与抽奖
export const postWelfarePrize = async (params: any) => {
  return await post("activity/welfare/sign", params);
};
// 助力
export const getWelfareHelp = async (params: WelfareHelpParams) => {
  return await post("activity/welfare/help", params);
};
// 用户列表
export const getWelfareUser = async (params: WelfareUserListParams) => {
  return await get<ListObject<UIWelareRewardListItem>>(
    "activity/welfare/users",
    params
  );
};
export const getWelfareUserlog = async (params: any) => {
  return await get("activity/welfare/log", params);
};
