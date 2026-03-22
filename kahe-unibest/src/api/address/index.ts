import { get, post } from "@/utils/request";
import type { AddressModel, NetworkProvinceModel } from "@/model/address";
import type { PageParams } from "@/model/base";

/* 设置默认地址 */
export const setDefaultAddressRequest = async (id: string) => {
  return await post("address/default/set", {
    id,
  });
};

/* 删除地址 */
export const deleteAddressRequest = async (id: string) => {
  return await post("address/del", {
    id,
  });
};

/* 添加或修改地址 */
export const updateAddressRequest = async (params: AddressModel) => {
  return await post("address/edit", params);
};

/* 地址详情 */
export const addressDetailRequest = async (id: string) => {
  return await get<AddressModel>(`address/detail/${id}`, undefined);
};

/* 查询地址列表 */
export const queryAddressListRequest = async (params: PageParams) => {
  return await get<AddressModel[]>("address/list", params);
};

/* 获取城市列表 */
export const queryCityListRequest = async () => {
  return await get<NetworkProvinceModel[]>("city_list", undefined);
};
