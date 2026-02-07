import { get, post } from "@/utils/request";
import { ListObject, PageParams } from "@/model";

export interface FavoriteParams extends PageParams {
  subType?: number;
  type: number;
}

export interface FavoriteItemModel {
  createTime: string;
  detail: string;
  id: number;
  productId: number;
  subType: number;
  type: number;
}
export interface FavoriteModel {
  merchantId: number;
  productId: number;
  boxId: number;
  title: string;
  logo: string;
  price: number;
  boxSeqNo: number;
}

export const addFavoriteRequest = async (params: {
  productId: number;
  type: number;
}) => {
  return await post("user/product/favorite/add", params);
};

export const cancelFavoriteRequest = async (params: {
  productId: number;
  type: number;
}) => {
  return await post("user/product/favorite/cancel", params);
};

export const checkIsFavoriteRequest = async (params: {
  productId: number;
  type: number;
}) => {
  return await post<boolean>("user/product/favorite/isFavorite", params);
};

export const getFavoriteRequest = async (params: FavoriteParams) => {
  return await get<ListObject<FavoriteItemModel>>(
    "user/product/favorite/list",
    params
  );
};
