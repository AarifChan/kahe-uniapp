import type { CouponModel, ListObject, PageParams } from '@/model'
import { get, post } from '@/utils/request'

export interface CouponParams extends PageParams {
  merchantId?: string | null
}

/* 优惠券 */
export async function getCouponListRequest(params: CouponParams) {
  return await get<ListObject<CouponModel>>('coupon/list', params)
}

export async function receiveCouponRequest(params: any) {
  return await post('coupon/receive', params)
}
