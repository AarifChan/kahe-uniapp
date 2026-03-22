import type { ProductGoodsDTOModel } from "@/model/product";
import type { PageParams } from "@/model/base";
import type { ChestGoodsModel } from "@/model/uiModel";

export interface ChestDotoModel {
  goods: ChestGoodsModel[];
  logo: string;
  title: string;
  id: number;
}
export interface UserGoodsModel {
  goodDesc?: string;
  title?: string;
  salePrice?: number;
  price?: number;
  image?: string;
  boxId: number;
  createTime: string;
  gid: number;
  goods: ProductGoodsDTOModel;
  id: number;
  num: number;
  status: number;
  uid: number;
  selected?: boolean;
  selectNum: number;
  merchantId: number;
}
// 宝箱
export interface UIChestModel {
  boxId: number;
  cid: number;
  logo: string;
  num: number;
  title: string;
  gainTime: string;
  status: number;
  goods: ChestGoodsModel[];
}
export interface UserChestModel {
  chest: ChestDotoModel;
  goods: ChestGoodsModel[];
  cid: number;
  id: number;
  num: number;
  status: number;
  createTime: string;
  updateTime: string;
  uid: number;
  total: number;
}

// cid: 1000002
// createTime: "2023-01-31 08:55:35"
// goods: [,…]
// 0: {id: 10119, name: "皇冠粉嫩熊", image: "https://jms.85gui7.com/upload/1601982963812139008.jpg", enum: 113,…}
// id: 351
// num: 2
// orderId: "1620224236779995136"
// pm: 1
// source: "chest_open"
// sourceEx: "[{"id":10119,"num":2,"uid":10237}]"
// uid: 10237
export interface UserChestOpenModel {
  cid: number;
  createTime: string;
  goods: ProductGoodsDTOModel[];
  id: number;
  num: number;
  orderId: number;
  pm: number;
  source: number;
  sourceEx: string;
  uid: number;
}

export interface UserChestOpenGoodsModel {
  id: number;
  num: number;
  uid: number;
}

// export interface ChestGoodsModel {
//     id: number
//     enum: number
//     num: number
//     weight: number
//     image: string
//     name: string
//     price: number
//     salePrice: number
//     saleTime: string
//     type: 0
// }
export interface UserBoxModel {
  cateId: number;
  id: number;
  logo: string;
  mainTag: number;
  num: number;
  price: number;
  sort: number;
  subTag: number;
  title: string;
  updateTime: string;
}

export interface UserGoodsQueryParams extends PageParams {
  box_id: number;
  status?: number; // 0: 未处理 1: 已回收 2: 已上架 3: 已发货 4: 已锁定
  sort?: string; // 排序类型(asc desc),默认desc
  sflag?: number; // 排序标识(1: 时间 2: 价格),默认1
  level: number | null; // 物品等级
}

export interface GoodsBrief {
  gid?: number;
  id?: number;
  num?: number;
  boxId?: number;
}

export interface GoodsRecoveryParams {
  briefs: GoodsBrief[];
  type: number; // 1: 箱子列表 2: 物品列表
}

export interface BoxGoodsSubmitParams {
  briefs: GoodsBrief[];
  type: number; // 1:箱子列表 2：物品列表
}

export interface UserGoodsDeliverModel {
  address: string;
  createTime: string;
  deliveryId: string;
  deliverySn: string;
  id: number;
  opId: string;
  opName: string;
  orderId: string;
  phone: string;
  realName: string;
  reason: string;
  status: number;
  uid: number;
  updateTime: string;
  goods: ProductGoodsDTOModel[];
  userGoods: GoodsBrief[];
}

export interface UserGoodsRecoveryModel {
  createTime: number;
  goods: ProductGoodsDTOModel[];
  id: number;
  money: number;
  orderId: string;
  uid: number;
  updateTime: string;
  userGoods: GoodsBrief[];
}

export interface UserDeliverParams {
  addressId: number;
  orderId: string;
}

export interface GoodsStateParams {
  levels: number[];
  status: number;
}

export interface GoodsBoxStatsParams {
  boxIds: number[];
  status: number;
}

export interface UserDeliverSubmitParams {
  addressId?: number;
  briefs: GoodsBrief[];
  type: number; // 1:箱子列表 2：物品列表
}

export interface UserDeliverSubmitResponse {
  couponPrice: number;
  orderId: string;
  param: string;
  payPrice: number;
  totalPrice: number;
  usedCoin: number;
  usedMoney: number;
  detail: string;
}

export interface BoxGoodsSubmitResponse {
  channel: string;
  couponId: string;
  couponPrice: string;
  detail: string;
  orderId: string;
  param: string;
  payPrice: string;
  totalPrice: string;
  usedCoin: string;
  usedIntegral: string;
  usedMoney: string;
}

export interface UserGoodsInfoModel {
  gid: number;
  ids: number[];
  image: string;
  level: number;
  name: string;
  price: number;
  saleTime: string;
  status: number;
  uid: number;
}

export interface UserStatsGoodsModel {
  boxId: number;
  createTime: string;
  gid: number;
  id: number;
  image: string;
  level: number;
  name: string;
  num: number;
  price: number;
  saleTime: string;
  status: string;
  uid: number;
  updateTime: string;
}

export interface SubmitGoodsModel {
  createTime: string;
  gid: number;
  id: number;
  image: string;
  level: number;
  name: string;
  num: number;
  price: number;
  saleTime: number;

  levelImage: string;
}
