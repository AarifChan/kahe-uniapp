import { get, post } from "@/utils/request";
import { ListObject } from "@/model";

export interface ShingingInfo {
  createTime: string;
  dailyLimit: number;
  id: number;
  minScore: number;
  num: number;
  openThreshold: number;
  prizePool: PrizePool[];
  todayReceived: number;
  total: number;
  usedNum: number;
}
export interface GoodsDto {
  id: number;
  image: string;
  level: number;
  name: string;
  price: number;
  quality: number;
  salePrice: number;
}

export interface PrizeUser {
  avatar: string;
  nickname: string;
  phone: string;
  uid: number;
  username: string;
  vip: number;
}
export interface PrizePool {
  goodsDto: GoodsDto;
  id: number;
  num: number;
  users?: PrizeUser[];
}
export interface ShingingHomePage {
  info: ShingingInfo;
}

export interface ShingingLog {
  aid: number;
  createTime: string;
  goodsDto: {
    cid: number;
    cname: string;
    createTime: string;
    eggId: number;
    goodDesc: string;
    id: number;
    image: string;
    level: number;
    merchantId: number;
    name: string;
    price: number;
    quality: number;
    salePrice: number;
    saleTime: string;
    status: number;
    type: number;
    updateTime: string;
  };
  id: number;
  prizeId: number;
  status: number;
  useTime: string;
  useUid: number;
  user: {
    avatar: string;
    nickname: string;
    phone: string;
    uid: number;
    username: string;
    vip: number;
  };
}

export const getPageInfo = async () => {
  return await get<ShingingHomePage>("activity/shinging");
};

export const getLog = async (params: any) => {
  return await get<ListObject<ShingingLog>>("activity/shinging/log", params);
};

export const getHistory = async (params: any) => {
  return await get<ListObject<ShingingInfo>>(
    "activity/shinging/history",
    params
  );
};

export const signIn = async (data: any) => {
  return await post("activity/shinging/sign", data);
};

export const receive = async (data: any) => {
  return await post("activity/shinging/receive", data, { urlAppend: false });
};
