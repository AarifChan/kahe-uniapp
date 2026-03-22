import type { PageParams } from "@/model/base";

export interface MallBriefModel {
  gid: number;
  id: number;
}

export interface MallGoodsItemModel {
  createTime: string;
  id: number;
  image: string;
  level: number;
  name: string;
  price: number;
  saleTime: string;
  updateTime: string;
}

export interface MallIndexBanner {
  createTime: string;
  id: number;
  pic: string;
  sort: number;
  status: number;
  title: string;
  updateTime: string;
  url: string;
}

export interface MallIndexCategory {
  createTime: string;
  icon: string;
  id: number;
  name: string;
  sort: number;
  status: number;
  updateTime: string;
}

export interface MallIndexModel {
  category: MallIndexCategory[];
}

export interface MallIndexListItemModel {
  cid: number;
  createTime: string;
  gid: number;
  goods: MallGoodsItemModel;
  id: number;
  mainTag: string;
  price: number;
  sales: number;
  sort: number;
  status: number;
  subTag: string;
  total: number;
  updateTime: string;
}

export interface MallQueryParams extends PageParams {
  cid?: number;
  sort: number; // 0: 默认 1: 新品 2：价格
  stype?: string;
}
export interface MallGoodsModel {
  buyUid: [number];
  goods: MallGoodsItemModel[];
  createTime: string;
  id: number;
  price: number;
  status: number;
  title: string;
  uid: number;
  updateTime: string;
  userGoods: MallBriefModel[];
}
