import type {
  RedBagDetailModel,
  RedBagListItem,
} from '@/composables/redBag/model'
import type { ListObject, PageParams } from '@/model'
import { get, post } from '@/utils/request'

export async function getMineRedBagRequest(params: PageParams) {
  return await get<ListObject<RedBagListItem>>('activity/redbag/list', params)
}

export async function getRedBagDetailRequest(id: number) {
  return await get<RedBagDetailModel>('activity/redbag/detail', {
    id,
  })
}

export async function receiveRedBagRequest(params: any) {
  return await post('activity/redbag/receive', params)
}

export async function shareRedBagRequest(id: number) {
  return await post('activity/redbag/share', {
    id,
  })
}
