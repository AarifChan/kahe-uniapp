import type { ListObject, PageParams } from '@/model/base'
import type {
  MallGoodsModel,
  MallIndexListItemModel,
  MallIndexModel,
  MallQueryParams,
} from '@/model/mall'
import { get, post } from '@/utils/request'

export function queryMallProductRequest(params: PageParams) {
  return get<ListObject<MallGoodsModel>>('market/product', params)
}

export function mallIndexRequest() {
  return get<MallIndexModel>('store/index', undefined)
}

export function mallIndexGoodsList(params: MallQueryParams) {
  return get<ListObject<MallIndexListItemModel>>('store/product', params)
}

export function mallPurchaseRequest(pid: number) {
  return post<MallIndexListItemModel>('store/purchase', {
    pid,
  })
}
