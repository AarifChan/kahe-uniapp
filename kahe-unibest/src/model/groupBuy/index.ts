import type { PageParams, User } from "@/model";
import { MerchantModel } from "@/model";

export interface GroupBuyParams extends PageParams {
  hot: number;
  key?: string;
  sort?: string | null;
  sflag?: number | null;
  merchant?: number;
}

export interface GroupBuyRecordParams extends PageParams {
  pid: number;
}

export interface GroupBuyCardParams extends PageParams {
  sid: number;
}

export interface GroupBuyMineCardParams extends PageParams {
  level?: number | null;
  pid: number;
  status?: number | null;
  uid?: number | null;
  keyword?: string | null;
}
export interface GroupBuyRecord {
  createTime: string;
  id: number;
  num: number;
  uid: number;
  user: User;
}
export interface GroupBuyCard {
  id: number;
  level: number;
  name: string;
  number: number;
  sid: number;
  sname: string;
}
export interface GroupBuyLog {
  cid: number;
  id: number;
  image: string;
  level: number;
  name: string;
  number: number;
  status: number;
  uid: number;
  updateTime: string;
  user: { avatar: string; nickname: string; uid: number };
}

export interface GroupBuyItem {
  hot: number;
  id: number;
  liveAddress: string;
  logo: string;
  num: number;
  openTime: string;
  payTime: number;
  price: number;
  title: string;
  total: number;
  updateTime: string;
  merchant?: MerchantModel;
}

export interface GroupBuyDetail {
  createTime: string;
  dayLimit: number;
  hot: number;
  banner: string;
  liveAddress: string;
  logo: string;
  id: number;
  sid: number;
  onceTimes: number[];
  openTime: string;
  payType: number;
  price: number;
  qrCode: string;
  prices: { num: number; price: number }[];
  remark: string;
  sales: number;
  title: string;
  total: number;
  totalLimit: number;
  updateTime: string;
}

export interface GroupBuySubmitRes {
  channel: string;
  couponId: number;
  couponPrice: number;
  detail: string;
  orderId: string;
  param: string;
  payPrice: number;
  totalPrice: number;
  usedCoin: number;
  usedIntegral: number;
  usedMoney: number;
}

export interface GroupBuyPurchaseModel {
  cardList: GroupBuyCard[];

  createTime: string;

  id: number;

  num: number;

  orderId: string;

  pid: number;

  price: number;

  status: number;

  uid: number;

  updateTime: string;
}
