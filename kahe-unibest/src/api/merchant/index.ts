import type {
  ListObject,
  MerchantBoxModel,
  MerchantInfoModel,
  MerchantParams,
  PageParams,
} from '@/model'
import { get } from '@/utils/request'

export async function getMerchantListRequest(params: MerchantParams) {
  return await get<ListObject<MerchantInfoModel>>('merchant/list', params)
}

export async function getMerchantInfoRequest(id: number) {
  return await get<MerchantInfoModel>('merchant/info', {
    id,
  })
}

export async function getUserMerchantRequest(params: PageParams) {
  return await get<ListObject<MerchantBoxModel>>('user/goods/merchant', params)
}
