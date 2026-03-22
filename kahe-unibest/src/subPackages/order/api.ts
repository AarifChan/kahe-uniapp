import type { OrderDetailInfo, ProductOrderModel } from './model'
import type { ListObject, PageParams } from '@/model'
import { get } from '@/utils/request'

export function getPayedBlindBoxOrder(params: PageParams) {
  return get<ListObject<ProductOrderModel>>('blindbox/order/payed', params)
}

export function orderDetailRequest(orderId: string) {
  return get<OrderDetailInfo>('pay/detail', {
    orderId,
  })
}
