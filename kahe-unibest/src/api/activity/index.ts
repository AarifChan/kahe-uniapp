import type { ActivityDto, RankUser } from '@/model/activity'

import { get } from '@/utils/request'

interface RankListRequestParams {
  actid: number
  limit?: number
  max?: number
  page?: number
}

/* 获取活动主页信息 */
export async function getRankIndexData() {
  return await get<{ list: ActivityDto[] }>('activity/active', {})
}

/* 获取用户列表 */
export async function getRankUserListData(params: RankListRequestParams) {
  return await get<{
    user: RankUser
    list: { content: RankUser[], totalElements: number }
  }>('activity/active/list', params)
}

/* 获取历史活动信息 */
export async function getHistoryListData() {
  return get('activity/active/pre', {})
}
