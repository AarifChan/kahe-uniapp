import type { OpenChestParams } from '@/model'
import type { BoxPageParams, ListObject, PageParams } from '@/model/base'
import type {
  BoxGoodsSubmitParams,
  BoxGoodsSubmitResponse,
  GoodsBoxStatsParams,
  UserBoxModel,
  UserChestModel,
  UserChestOpenModel,
  UserDeliverParams,
  UserDeliverSubmitParams,
  UserDeliverSubmitResponse,
  UserGoodsDeliverModel,
  UserGoodsModel,
  UserGoodsQueryParams,
  UserGoodsRecoveryModel,
  UserStatsGoodsModel,
} from '@/model/box'
import { get, post } from '@/utils/request'

// 用户宝箱
export async function userGoodsChestBox(params: PageParams) {
  return await get<ListObject<UserChestModel>>('user/chest', params)
}
// 打开宝箱
export async function userOpenGoodsChestBoxRequest(params: OpenChestParams) {
  return await post<UserChestOpenModel>('user/chest/open', params)
}
/* 获取我的箱子 */
export async function userGoodsBoxRequest(params: BoxPageParams) {
  return await get<ListObject<UserBoxModel>>('user/goods/box', params)
}

/* 获取我的物品 */
export async function userGoodsListRequest(params: UserGoodsQueryParams) {
  return await get<ListObject<UserGoodsModel>>('user/goods', {
    ...params,
    merchant: 1,
  })
}

/* 物品上锁 */
export async function userGoodsLockRequest(params: number[]) {
  return await post('user/goods/lock', params, {
    urlAppend: false,
  })
}

/* 物品粉碎 */
export async function userGoodsDeleteRequest(params: any) {
  return await post('user/goods/recovery', params, {
    urlAppend: false,
  })
}

/* 物品解锁 */
export async function userGoodsUnlockRequest(params: number[]) {
  return await post('user/goods/unlock', params, {
    urlAppend: false,
  })
}

export async function userGoodsDeliverSubmitRequest(params: UserDeliverSubmitParams) {
  return await post<UserDeliverSubmitResponse>(
    'user/goods/deliver/submit',
    params,
    {
      urlAppend: false,
    },
  )
}

/* 物品发货 */
export async function userGoodsDeliverRequest(params: UserDeliverParams) {
  return await post('user/goods/deliver', params)
}

/* 用户已粉碎列表 */
export async function userGoodsRecycleListRequest(params: PageParams) {
  return await get<ListObject<UserGoodsRecoveryModel>>(
    'user/goods/recovery',
    params,
  )
}

/* 物理已发货列表 */
export async function userGoodsDeliverListRequest(params: PageParams) {
  return await get<ListObject<UserGoodsDeliverModel>>(
    'user/goods/deliver',
    params,
  )
}

/* 物品回收确认 */
export async function userGoodsRecycleConfirmRequest(params: BoxGoodsSubmitParams) {
  return await post<BoxGoodsSubmitResponse>(
    'user/goods/recovery/submit',
    params,
    {
      urlAppend: false,
    },
  )
}

/* 物品统计信息 */
export async function userGoodsBoxStatusRequest(params: GoodsBoxStatsParams) {
  return await post<UserStatsGoodsModel[]>('user/goods/box/stat', params, {
    urlAppend: false,
  })
}
