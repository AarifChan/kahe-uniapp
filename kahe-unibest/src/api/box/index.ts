import { get, post } from "@/utils/request";
import type { BoxPageParams, ListObject, PageParams } from "@/model/base";
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
} from "@/model/box";
import type { OpenChestParams } from "@/model";

// 用户宝箱
export const userGoodsChestBox = async (params: PageParams) => {
  return await get<ListObject<UserChestModel>>("user/chest", params);
};
// 打开宝箱
export const userOpenGoodsChestBoxRequest = async (params: OpenChestParams) => {
  return await post<UserChestOpenModel>("user/chest/open", params);
};
/* 获取我的箱子 */
export const userGoodsBoxRequest = async (params: BoxPageParams) => {
  return await get<ListObject<UserBoxModel>>("user/goods/box", params);
};

/* 获取我的物品 */
export const userGoodsListRequest = async (params: UserGoodsQueryParams) => {
  return await get<ListObject<UserGoodsModel>>("user/goods", {
    ...params,
    merchant: 1,
  });
};

/* 物品上锁 */
export const userGoodsLockRequest = async (params: number[]) => {
  return await post("user/goods/lock", params, {
    urlAppend: false,
  });
};

/* 物品粉碎 */
export const userGoodsDeleteRequest = async (params: any) => {
  return await post("user/goods/recovery", params, {
    urlAppend: false,
  });
};

/* 物品解锁 */
export const userGoodsUnlockRequest = async (params: number[]) => {
  return await post("user/goods/unlock", params, {
    urlAppend: false,
  });
};

export const userGoodsDeliverSubmitRequest = async (
  params: UserDeliverSubmitParams
) => {
  return await post<UserDeliverSubmitResponse>(
    "user/goods/deliver/submit",
    params,
    {
      urlAppend: false,
    }
  );
};

/* 物品发货 */
export const userGoodsDeliverRequest = async (params: UserDeliverParams) => {
  return await post("user/goods/deliver", params);
};

/* 用户已粉碎列表 */
export const userGoodsRecycleListRequest = async (params: PageParams) => {
  return await get<ListObject<UserGoodsRecoveryModel>>(
    "user/goods/recovery",
    params
  );
};

/* 物理已发货列表 */
export const userGoodsDeliverListRequest = async (params: PageParams) => {
  return await get<ListObject<UserGoodsDeliverModel>>(
    "user/goods/deliver",
    params
  );
};

/* 物品回收确认 */
export const userGoodsRecycleConfirmRequest = async (
  params: BoxGoodsSubmitParams
) => {
  return await post<BoxGoodsSubmitResponse>(
    "user/goods/recovery/submit",
    params,
    {
      urlAppend: false,
    }
  );
};

/* 物品统计信息 */
export const userGoodsBoxStatusRequest = async (
  params: GoodsBoxStatsParams
) => {
  return await post<UserStatsGoodsModel[]>("user/goods/box/stat", params, {
    urlAppend: false,
  });
};
