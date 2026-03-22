import type { ListObject, PageParams } from '@/model'
import { get, post } from '@/utils/request'

export interface FavoriteParams extends PageParams {
  subType?: number
  type: number
}

export interface FavoriteItemModel {
  createTime: string
  detail: string
  id: number
  productId: number
  subType: number
  type: number
}
export interface FavoriteModel {
  merchantId: number
  productId: number
  boxId: number
  title: string
  logo: string
  price: number
  boxSeqNo: number
}

export async function addFavoriteRequest(params: {
  productId: number
  type: number
}) {
  return await post('user/product/favorite/add', params)
}

export async function cancelFavoriteRequest(params: {
  productId: number
  type: number
}) {
  return await post('user/product/favorite/cancel', params)
}

export async function checkIsFavoriteRequest(params: {
  productId: number
  type: number
}) {
  return await post<boolean>('user/product/favorite/isFavorite', params)
}

export async function getFavoriteRequest(params: FavoriteParams) {
  return await get<ListObject<FavoriteItemModel>>(
    'user/product/favorite/list',
    params,
  )
}
