import { get, post } from "@/utils/request";
import { ListObject, type ProductGoodsDTOModel } from "@/model";

export interface ChallengeBox {
  cateId: number;
  id: number;
  isRecommend: number;
  logo: string;
  mainTag: number;
  subTag: number;
  merchant: object;
  merchantId: number;
  name: string;
  payType: number;
  price: number;
  rewards: [{}];
}
export interface ChallengeGoodsItem {
  goodsDto: ProductGoodsDTOModel;
  id: number;
  num: number;
  prob: number;
}
export const getList = (params: any) => {
  return get<ListObject<ChallengeGoodsItem>>("level/box", params);
};
