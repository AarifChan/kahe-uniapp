import { get, post } from "@/utils/request";
import { ListObject, type ProductGoodsDTOModel } from "@/model";

export interface ChallengeGoodsItem {
  goodsDto: ProductGoodsDTOModel;
  id: number;
  num: number;
  prob: number;
}
export interface ChallengeBox {
  cateId: number;
  id: number;
  isRecommend: number;
  logo: string;
  mainTag: number;
  subTag: number;
  merchant: object;
  gate: number;
  trap: number;
  merchantId: number;
  name: string;
  payType: number;
  price: number;
  rewards: ChallengeGoodsItem[];
}

export interface ChallengeOrderGate {
  createTime: string;
  gate: number;
  trap: number;
  goods: ChallengeGoodsItem;
  id: number;
  /**
   * 地图状态数组，下标为关卡索引(0开始)
   * 值：1=奖励，-1=陷阱，0=未打开
   */
  map: number[];
  orderId: string;
  sales: number;
  status: number;
  uid: number;
}
export interface ChallengeDetail {
  box: ChallengeBox;
  current: ChallengeOrderGate;
}

export interface LogListObject {
  avatar: string;
  createTime: string;
  gate: number;
  goods: ChallengeGoodsItem;
  id: number;
  nick: string;
  sales: number;
  status: number;
  title: string;
  uid: number;
  vip: number;
}

export interface ChallengeSubmit {
  channel: string;
  couponId: number;
  couponPrice: string;
  detail: any;
  orderId: string;
  param: string;
  payPrice: string;
  totalPrice: string;
  usedCoin: string;
  usedIntegral: string;
  usedMoney: string;
}

export const getList = (params: any) => {
  return get<ListObject<ChallengeBox>>("level/box", params);
};

export const getDetail = (id: number) => {
  return get<ChallengeDetail>("level/detail", { id });
};

export const getLog = (params: any) => {
  return get<ListObject<LogListObject>>("level/log", params);
};

export const submitChallenge = (id: number) => {
  return post<ChallengeSubmit>("level/submit", { id });
};

export const signChallenge = (data: any) => {
  return post<ChallengeOrderGate>("level/sign", data);
};

export const playChallenge = (params: any) => {
  return post<ChallengeOrderGate>("level/play", params);
};

export const settleChallenge = (id: number) => {
  return post("level/settle", { id });
};
