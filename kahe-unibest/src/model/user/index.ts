import type { PageParams } from "@/model/base";
import { MerchantModel } from "@/model";

export interface LoginRequestParams {
  code: string;
  encryptedData?: string;
  iv?: string;
  phoneEncryptedData?: string;
  phoneIv?: string;
  plat: string;
}

export interface LoginResponse {
  token: string;
}

export interface LoginMobileRequest {
  phone: string;
  password: string;
  type: number;
}

export interface LoginSmsRequest {
  phone: string;
  type: string;
}

export interface User {
  uid: number;
  username: string;
  nickname: string;
  avatar: string;
}

export interface UserInfo {
  account: string;
  addIp: string;
  avatar: string;
  birthday: number;
  coin: number;
  lastIp: string;
  mark: string;
  money: number;
  nickname: string;
  phone: string;
  realName: string;
  status: boolean;
  ticket: number;
  integral: number; // 积分
  uid: number;
  userType: string;
  username: string;
  vip: number;
  exp: number; // 经验
  expDay: number; // 今日经验
  receivedVip: number; // vip经验(今日)
  attorney: number; // 委托券
  couponNum: number; // 优惠券
}
export interface VipItemModel {
  id: number;
  logo: string;
  name: string;
  num: number;
}

export interface VipsLevelModel {
  createTime: string;
  exp: number;
  id: number;
  level: number;
  rewards: VipItemModel[];
  rewardsDay: VipItemModel[];
  updateTime: string;
}

export interface VipUserModel {
  exp: number;
  expDay: number;
  receivedVip: number;
  uid: number;
  vip: number;
}

export interface VipExpModel {
  createTime: string;
  exp: number;
  id: number;
  rewards: [];
  rewardsDay: [];
  updateTime: number;
}
export interface VipIndexModel {
  nextVip: VipExpModel;
  user: VipUserModel;
}
export interface CouponRequestParams extends PageParams {
  status: number; // 0 未使用 1 已使用 2 已过期
}

export interface CouponModel {
  cid: number;
  cates: string[];
  couponPrice: number;
  couponTime: number;
  createTime: string;
  endTime: string;
  id: number;
  source: string;
  status: number;
  title: string;
  type: number; // 类型(1 盲盒)
  useMinPrice: number;
  usedTime: string;
  merchant: MerchantModel;
  merchantId: number;
  products: string[];
  receiveScore: number;
  receiveStatus: number;
  receiveValue: number;
}

export interface RechargeModel {
  id: number;
  money: number;
  price: number;
  sort: number;
  status: number;
}

export interface WithdrawParams {
  account: string;
  name: string;
  price: number;
  type: string;
}

export interface BillParams extends PageParams {
  category: string; // money: 余额, coin: 海皇币, ticket: 海皇票, integral: 海皇积分
  pm: number; // 0: 支出 1：获得
  type?: string; // recharge: 充值
}

export interface BillModel {
  balance: number;
  category: string;
  createTime: string;
  id: number;
  linkId: string;
  mark: string;
  number: number;
  pm: number;
  title: string;
  type: string;
  uid: number;
  updateTime: string;
}
