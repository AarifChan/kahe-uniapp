import { get, post } from "@/utils/request";
import type { ListObject, PageParams } from "@/model/base";
import type {
  MallGoodsModel,
  MallIndexListItemModel,
  MallIndexModel,
  MallQueryParams,
} from "@/model/mall";

export const queryMallProductRequest = (params: PageParams) => {
  return get<ListObject<MallGoodsModel>>("market/product", params);
};

export const mallIndexRequest = () => {
  return get<MallIndexModel>("store/index", undefined);
};

export const mallIndexGoodsList = (params: MallQueryParams) => {
  return get<ListObject<MallIndexListItemModel>>("store/product", params);
};

export const mallPurchaseRequest = (pid: number) => {
  return post<MallIndexListItemModel>("store/purchase", {
    pid,
  });
};
