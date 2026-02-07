import type { ListObject, PageParams } from '@/model'
import { get } from '@/utils/request'
import { OrderDetailInfo, ProductOrderModel } from './model'

export const getPayedBlindBoxOrder = (params: PageParams) => {
  return get<ListObject<ProductOrderModel>>('blindbox/order/payed', params)
}

export const orderDetailRequest = (orderId: string) => {
  return get<OrderDetailInfo>('pay/detail', {
    orderId
  })
}
