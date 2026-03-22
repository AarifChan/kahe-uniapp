import { get, post } from "@/utils/request";
import {
  ListObject,
  GroupBuyParams,
  GroupBuyItem,
  GroupBuyDetail,
  GroupBuyRecordParams,
  GroupBuyCardParams,
  GroupBuyCard,
  GroupBuyMineCardParams,
  GroupBuyLog,
  GroupBuySubmitRes,
  GroupBuyRecord,
  GroupBuyPurchaseModel,
} from "@/model";

/**
 * 获取拼团列表
 * @param params
 */
export const getGroupBuyListRequest = (params: GroupBuyParams) => {
  return get<ListObject<GroupBuyItem>>(
    "secret/list",
    {
      merchant: 1,
      ...params,
    },
    {
      urlAppend: true,
    }
  );
};

/**
 * 获取卡密列表
 * @param params
 */
export const getGroupBuyCardListRequest = (params: GroupBuyCardParams) => {
  return get<ListObject<GroupBuyCard>>("secret/card/list", params);
};

/**
 * 获取卡密记录
 * @param params
 */
export const getMineGroupBuyCardListRequest = (
  params: GroupBuyMineCardParams
) => {
  return get<ListObject<GroupBuyLog>>("secret/log", params);
};

/**
 * 获取拼团详情
 * @param id
 */
export const getGroupBuyDetailRequest = (id: number) => {
  return get<GroupBuyDetail>(
    "secret/detail",
    {
      id,
    },
    {
      urlAppend: true,
    }
  );
};

/**
 * 获取拼团详情的购买记录
 * @param params
 */
export const getGroupBuyDetailRecordRequest = (
  params: GroupBuyRecordParams
) => {
  return get<ListObject<GroupBuyRecord>>("secret/order", params);
};

/**
 * 确认购买
 * @orderId 订单ID
 */
export const purchaseGroupBuyRequest = (orderId: string) => {
  return post<GroupBuyPurchaseModel>("secret/purchase", {
    orderId,
  });
};

export const submitGroupBuyRequest = (params: { id: number; num: number }) => {
  return post<GroupBuySubmitRes>("secret/submit", params);
};

/**
 * 拼团发货
 */
export const deliverGroupBuyDetailRecord = (orderId: string) => {
  return post<GroupBuyPurchaseModel>("secret/deliver", {
    orderId,
  });
};
