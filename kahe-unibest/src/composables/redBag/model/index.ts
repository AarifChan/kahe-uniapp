import type { ProductGoodsDTOModel, User } from "@/model";

export interface RedBagModel {
  amount: number;
  amountNew: number;
  createTime: string;
  expiretime: string;
  id: number;
  num: number;
  source: string;
  sourceEx: string;
  status: number;
  title: string;
  total: number;
  totalNew: number;
  totalNum: number;
  uid: number;
  updateTime?: string;
  users: User[];
}

export interface RedBagUserModel extends User {
  amount: number;
  amountNew: number;
  comment: string;
  createTime: string;
  id: number;
  rbid: number;
  rbuid: number;
  uid: number;
  updateTime?: string;
}
export interface RedBagDetailModel {
  goodsDto: ProductGoodsDTOModel;
  log: RedBagUserModel[];
  redbag: RedBagModel;
  user: User[];
}

export interface RedBagListItem {
  amount: number;
  amountNew: number;
  createTime: string;
  expiretime: string;
  goodsDto: ProductGoodsDTOModel;
  id: number;
  num: number;
  source: string;
  sourceEx: string;
  status: number;
  title: string;
  total: number;
  totalNew: number;
  totalNum: number;
  uid: number;
  updateTime?: string;
}
