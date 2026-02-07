import { get, post } from "@/utils/request";
import {
  ListObject,
  ProductBarrageModel,
  ProductBoxModel,
  ProductDetailModel,
  ProductDetailParams,
  ProductIndexModel,
  ProductModel,
  ProductOpenModel,
  ProductOrderModel,
  ProductPurchaseSubmitParams,
  ProductPurchaseSubmitResponse,
  ProductQueryParams,
  ProductRecordModel,
  ProductRecordParams,
  ProductSpecRecordParams,
  ProductSwapBoxParams,
} from "@/model";

/* 主页数据 */
export const homeBlindBoxDataRequest = () => {
  return get<ProductIndexModel>("blindbox/index");
};

// 0: 普通盲盒 1: 无限盲盒, 默认：0
export const getBarrageListRequest = (type: number) => {
  return get<ProductBarrageModel[]>("blindbox/barrage", {
    type,
  });
};

export const queryProductBoxRequest = (params: ProductQueryParams) => {
  return get<ListObject<ProductBoxModel>>("blindbox/box", params);
};

export const productDetailRequest = (params: ProductDetailParams) => {
  return get<ProductDetailModel>("blindbox/detail", params);
};

export const productRecordRequest = (
  params: ProductRecordParams | ProductSpecRecordParams
) => {
  return get<ListObject<ProductRecordModel>>("blindbox/goods", params);
};

export const productOrderRequest = (params: ProductRecordParams) => {
  return get<ListObject<ProductOrderModel>>("blindbox/order", params);
};

export const productSwapBoxRequest = (params: ProductSwapBoxParams) => {
  return get<ListObject<ProductModel>>("blindbox/product", params);
};

/* 开箱提交 */
export const productPurchaseSubmitRequest = (
  params: ProductPurchaseSubmitParams
) => {
  return post<ProductPurchaseSubmitResponse>("blindbox/submit", params, {
    urlAppend: false,
  });
};

/* 开箱购买 */
export const productPurchaseRequest = (orderId: string) => {
  return post<ProductOpenModel>("blindbox/purchase", {
    orderId,
  });
};

/* 开箱发货 */
export const productDeliverRequest = (orderId: string) => {
  return post<ProductOpenModel>("blindbox/deliver", {
    orderId,
  });
};
