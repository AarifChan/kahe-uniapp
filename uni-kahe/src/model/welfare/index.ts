import type { MerchantModel, ProductGoodsDTOModel } from "@/model";
export interface WelfareUserGoodsModel {
  id: number;
  num: number;
  uid: number;
}
export interface WelfareHelpParams {
  aid: number;
  obj: number;
}
export interface WelfareUser {
  uid: number;
  username: string;
  nickname: string;
  avatar: string;
  phone?: null;
  vip: number;
}
export interface WelfareUserCode {
  [uid: number]: number;
}
export interface WelfareUserModel {
  actid: number;
  code: number;
  createTime: string;
  goods: WelfareUserGoodsModel[];
  id: number;
  status: number;
  uid: number;
  updateTime: string;
}
export interface WelfareUserListParams {
  page: number;
  aid: number;
  limit: number;
  type: number;
}
export interface WareDetailGoods {
  goodsDto: ProductGoodsDTOModel;
  id: number;
  num: number;
}
export interface WelfareDetailInfo {
  endTime: string;
  goods: WareDetailGoods[];
  icon: string;
  id: number;
  logo: string;
  minScore: number;
  merchant?: MerchantModel;
  startTime: string;
  status: number; /// 状态: 0: 未开启 1: 未结算 2: 已结算
  title: string;
  mode: number; // 0 流水 1 密码
}
export interface WelfareDetailResponse {
  info: WelfareDetailInfo;
  user: WelfareUserModel;
}

export interface WelfareDetList {
  code: string;
  content: string;
  createTime: string;
  endTime: string | number;
  goods: WareDetailGoods[];
  icon: string;
  id: number;
  logo: string;
  minScore: number;
  startTime: string;
  status: number;
  title: string;
  updateTime: string;
}

export interface WelfareContent {
  content: WelfareDetList[];
  totalElements: number;
}
export interface WelfareDet {
  list: WelfareContent;
  list2: WelfareContent;
}

export interface WelfareListItem {
  endTime: string;
  goods: WareDetailGoods[];
  icon: string;
  id: number;
  logo: string;
  merchant: MerchantModel;
  merchantId: number;
  minScore: number;
  mode: number;
  startTime: string;
  status: number;
  title: string;
}
