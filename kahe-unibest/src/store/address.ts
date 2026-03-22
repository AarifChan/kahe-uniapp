import type { AddressModel, UICityItemModel } from '@/model/'
import type { PageParams } from '@/model/base'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  addressDetailRequest,
  queryAddressListRequest,
  queryCityListRequest,
  updateAddressRequest,
} from '@/api/'
import { ShowToast } from '@/utils/Toast'

export const useAddressStore = defineStore('address', () => {
  const addressList = ref<AddressModel[]>([])
  const currentAddress = ref<AddressModel>({} as AddressModel)
  const cityList = ref<UICityItemModel[]>([])

  const changeCurrentAddress = (item: AddressModel) => {
    currentAddress.value = item
  }

  const getAddressList = async () => {
    const params: PageParams = { page: 1, limit: 10 }
    const resp = await queryAddressListRequest(params)
    if (resp.code === 200) {
      for (const item of resp.data as AddressModel[]) {
        if ((item as any).isDefault)
          changeCurrentAddress(item)
      }
      addressList.value = resp.data as AddressModel[]
    }
  }

  const addAddress = async (params: AddressModel): Promise<boolean> => {
    const res = await updateAddressRequest(params)
    if (res.code === 200) {
      await getAddressList()
      await ShowToast('添加成功', 2000)
      return true
    }
    await ShowToast(res.msg, 2000)
    return false
  }

  const getAddressDetail = async (id: string): Promise<AddressModel> => {
    const resp = await addressDetailRequest(id)
    return resp.code === 200 ? resp.data as AddressModel : {} as AddressModel
  }

  const fetchCityList = async () => {
    const resp = await queryCityListRequest()
    if (resp.code === 200) {
      const list: UICityItemModel[] = []
      for (const item of resp.data as any[]) {
        const tmp: UICityItemModel[] = []
        for (const item1 of item.c) {
          const tmp2: UICityItemModel[] = []
          for (const item2 of item1.c) {
            tmp2.push({ text: item2.n, value: item2.v })
          }
          tmp.push({ text: item1.n, value: item1.v, children: tmp2 })
        }
        list.push({ text: item.n, value: item.v, children: tmp })
      }
      cityList.value = list
    }
  }

  return {
    addressList,
    currentAddress,
    cityList,
    changeCurrentAddress,
    getAddressList,
    addAddress,
    getAddressDetail,
    fetchCityList,
  }
})
