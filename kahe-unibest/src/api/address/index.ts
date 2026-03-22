import type { AddressModel, NetworkProvinceModel } from '@/model/address'
import type { PageParams } from '@/model/base'
import { get, post } from '@/utils/request'

/* 设置默认地址 */
export async function setDefaultAddressRequest(id: string) {
  return await post('address/default/set', {
    id,
  })
}

/* 删除地址 */
export async function deleteAddressRequest(id: string) {
  return await post('address/del', {
    id,
  })
}

/* 添加或修改地址 */
export async function updateAddressRequest(params: AddressModel) {
  return await post('address/edit', params)
}

/* 地址详情 */
export async function addressDetailRequest(id: string) {
  return await get<AddressModel>(`address/detail/${id}`, undefined)
}

/* 查询地址列表 */
export async function queryAddressListRequest(params: PageParams) {
  return await get<AddressModel[]>('address/list', params)
}

/* 获取城市列表 */
export async function queryCityListRequest() {
  return await get<NetworkProvinceModel[]>('city_list', undefined)
}
