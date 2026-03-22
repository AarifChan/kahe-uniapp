import { OrderInfo, ProductGoodsModel, UIMerchant } from '@/model'

export interface ProductOrderModel {
  cateId: number
  id: number
  lastSeqNo: number
  logo: string
  pid: number
  mainTag: number
  price: number
  productNum: number
  sort: number
  subTag: number
  type: number
  switchTime: string
  title: string
  labels: number[]
  merchant: UIMerchant
  merchantId: string
  goods?: ProductGoodsModel[]
  orderId: string
  num: number
  ticket: number
  coin: number
  uid: number
}

export interface OrderDetailInfo {
  blindboxOrder: ProductOrderModel
  order: OrderInfo
}
