import { get, post } from "@/utils/request";
import { PageParams, ListObject } from "@/model";
import { CouponModel } from "@/model";

export interface CouponParams extends PageParams {
  merchantId?: string | null;
}

/* 优惠券 */
export const getCouponListRequest = async (params: CouponParams) => {
  return await get<ListObject<CouponModel>>("coupon/list", params);
};

export const receiveCouponRequest = async (params: any) => {
  return await post("coupon/receive", params);
};
