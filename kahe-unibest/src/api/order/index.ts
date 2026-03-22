import type {
  OrderInfo,
  OrderSubmitParams,
  OrderSubmitResponse,
} from '@/model/order'
import { get, post } from '@/utils/request'

/* 确认订单 */
export function orderSubmitRequest(params: OrderSubmitParams) {
  return post<OrderSubmitResponse>('pay/submit', params)
}

/* 支付订单 */
export function orderInfoRequest(orderId: string) {
  return get<OrderInfo>('pay/info', {
    orderId,
  })
}

/* 取消订单 */
export function orderCancelRequest(orderId: string | number) {
  return post('pay/cancel', {
    orderId,
  })
}

export function orderTestPayRequest(orderId: string) {
  return get('pay/pay', {
    orderId,
    secret: 'xlGqRYCG1kynBE1Py6vdTUxZjCZJUsVD',
  })
}
