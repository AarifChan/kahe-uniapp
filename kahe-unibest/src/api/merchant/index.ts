import { get } from "@/utils/request";
import type {
  ListObject,
  MerchantParams,
  MerchantInfoModel,
  PageParams,
  MerchantBoxModel,
} from "@/model";

export const getMerchantListRequest = async (params: MerchantParams) => {
  return await get<ListObject<MerchantInfoModel>>("merchant/list", params);
};

export const getMerchantInfoRequest = async (id: number) => {
  return await get<MerchantInfoModel>("merchant/info", {
    id,
  });
};

export const getUserMerchantRequest = async (params: PageParams) => {
  return await get<ListObject<MerchantBoxModel>>("user/goods/merchant", params);
};
