import type { ListObject, UIWelareRewardListItem } from '@/model'
import type {
  WelfareDet,
  WelfareDetailResponse,
  WelfareHelpParams,
  WelfareListItem,
  WelfareUserListParams,
} from '@/model/welfare'
import { get, post } from '@/utils/request'

// 主页
export async function getWelfareIndex(params: any) {
  return await get<WelfareDet>('activity/welfare', params)
}
export async function getWelfareListRequest(params: any) {
  return await get<ListObject<WelfareListItem>>(
    'activity/welfare/list',
    params,
  )
}

// 详情
export async function getWelfareDetail(aid: number) {
  return await get<WelfareDetailResponse>('activity/welfare/detail', {
    aid,
  })
}
// 参与抽奖
export async function postWelfarePrize(params: any) {
  return await post('activity/welfare/sign', params)
}
// 助力
export async function getWelfareHelp(params: WelfareHelpParams) {
  return await post('activity/welfare/help', params)
}
// 用户列表
export async function getWelfareUser(params: WelfareUserListParams) {
  return await get<ListObject<UIWelareRewardListItem>>(
    'activity/welfare/users',
    params,
  )
}
export async function getWelfareUserlog(params: any) {
  return await get('activity/welfare/log', params)
}
