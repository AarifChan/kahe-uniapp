import type { ListObject, PageParams } from '@/model'
import { get, post } from '@/utils/request'

export interface CollectParams extends PageParams {
  cate: number | null
}

export interface CollectDetailParams {
  obj: number | null
  pid: number
}

export interface CollectOrderParams extends PageParams {
  type: number
}

export interface CollectPurchaseParams {
  obj?: number | null
  pid: number
  num: number
  cate: number
  goods?: { boxId: number, gid: number, id: number, num: number }[] | null
}

export interface UserModel {
  avatar: string
  nickname: string
  phone: string
  uid: number
  username: string
  vip: number
}

export interface CollectListObject {
  cate: number

  createTime: string

  expireTime: string

  id: number

  logo: string

  name: string

  price: number

  sales: number

  sort: number

  status: number

  total: number

  isThanked: boolean

  updateTime: string
}

export interface CollectOrderItem {
  amount: number
  createTime: string
  helper: UserModel
  id: number
  logo: string
  name: string
  orderId: string
  pid: number
  isThanked: boolean
  user: UserModel
}

export interface CollectDetailObject {
  product: CollectListObject
  user: UserModel
}

export interface CollectPurchaseRes {
  amount: number
  createTime: string
  goods: string
  id: number
  logo: string
  name: string
  obj: number
  orderId: string
  pid: number
  uid: number
  updateTime: string
}

export function getCollectListRequest(params: CollectParams) {
  return get<ListObject<CollectListObject>>('collection/product', params, {
    urlAppend: true,
  })
}

export function getCollectDetailRequest(params: CollectDetailParams) {
  return get<CollectDetailObject>('collection/product/detail', params, {
    urlAppend: true,
  })
}

export function purchaseCollectProduct(params: CollectPurchaseParams) {
  return post<CollectPurchaseRes>('collection/product/purchase', params, {
    urlAppend: false,
  })
}

export function getCollectOrderRequest(params: CollectOrderParams) {
  return get<ListObject<CollectOrderItem>>('collection/order', params)
}

export function handleCollectThankRequest(id: number) {
  return post<boolean>('collection/order/thank', { id })
}
