import type {
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
} from '@/model'
import { get, post } from '@/utils/request'

/* 主页数据 */
export function homeBlindBoxDataRequest() {
  return get<ProductIndexModel>('blindbox/index')
}

// 0: 普通盲盒 1: 无限盲盒, 默认：0
export function getBarrageListRequest(type: number) {
  return get<ProductBarrageModel[]>('blindbox/barrage', {
    type,
  })
}

export function queryProductBoxRequest(params: ProductQueryParams) {
  return get<ListObject<ProductBoxModel>>('blindbox/box', params)
}

export function productDetailRequest(params: ProductDetailParams) {
  return get<ProductDetailModel>('blindbox/detail', params)
}

export function productRecordRequest(params: ProductRecordParams | ProductSpecRecordParams) {
  return get<ListObject<ProductRecordModel>>('blindbox/goods', params)
}

export function productOrderRequest(params: ProductRecordParams) {
  return get<ListObject<ProductOrderModel>>('blindbox/order', params)
}

export function productSwapBoxRequest(params: ProductSwapBoxParams) {
  return get<ListObject<ProductModel>>('blindbox/product', params)
}

/* 开箱提交 */
export function productPurchaseSubmitRequest(params: ProductPurchaseSubmitParams) {
  return post<ProductPurchaseSubmitResponse>('blindbox/submit', params, {
    urlAppend: false,
  })
}

/* 开箱购买 */
export function productPurchaseRequest(orderId: string) {
  return post<ProductOpenModel>('blindbox/purchase', {
    orderId,
  })
}

/* 开箱发货 */
export function productDeliverRequest(orderId: string) {
  return post<ProductOpenModel>('blindbox/deliver', {
    orderId,
  })
}
