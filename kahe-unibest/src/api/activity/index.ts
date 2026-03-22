import { get, post } from "@/utils/request";

import type { ActivityDto, RankUser } from "@/model/activity";

interface RankListRequestParams {
  actid: number;
  limit?: number;
  max?: number;
  page?: number;
}

/* 获取活动主页信息 */
export const getRankIndexData = async () => {
  return await get<{ list: ActivityDto[] }>("activity/active", {});
};

/* 获取用户列表 */
export const getRankUserListData = async (params: RankListRequestParams) => {
  return await get<{
    user: RankUser;
    list: { content: RankUser[]; totalElements: number };
  }>("activity/active/list", params);
};

/* 获取历史活动信息 */
export const getHistoryListData = async () => {
  return get("activity/active/pre", {});
};
