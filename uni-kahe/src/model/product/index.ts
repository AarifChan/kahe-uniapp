import type { PageParams } from "@/model/base";
import type { User } from "@/model/user";
import type { UIMerchant } from "@/model";
import { UserModel } from "@/api";

export enum ProductDetailButtonType {
  Reload = "Reload",
  Introduction = "Introduction",
  ChangeBox = "ChangeBox",
  HowToPlay = "HowToPlay",
  Favorite = "Favorite",
  Save = "Save",
}

export interface ProductGoodsDTOModel {
  createTime: string;
  id: number;
  image: string;
  level: number;
  name: string;
  price: number;
  salePrice: number; // 出售价格
  saleTime: string;
  updateTime: string;
  type: number; // 物品类型 0: 普通 1: 仅发货
  prob?: number;
  goodDesc: string;
}
export interface ProductIndexModelCfg {
  client_audit_version: string; // 客户端审核版本

  enable_recovery_goods: string; // 是否开启回收道具
}
export interface ProductBoxModel {
  cateId: number;
  id: number;
  lastSeqNo: number;
  logo: string;
  pid: number;
  mainTag: number;
  price: number;
  productNum: number;
  sort: number;
  remark?: string;
  subTag: number;
  title: string;
  labels: number[];
  merchant: UIMerchant;
  merchantId: string;
  goods?: ProductGoodsDTOModel[];
}
export interface ProductDetailParams {
  pid?: number;
  boxid?: number;
}

export interface ProductSwapBoxParams extends PageParams {
  level?: number; // 分类id
  boxid: number; // 箱子id
  sflag: number; // 排序标识(1: 余量 2: 编号)
  sort: string;
  max?: number; // 最大编号
  min?: number; // 最小编号
}

export interface ProductRecordParams extends PageParams {
  pid: number;
  level?: number;
}

export interface ProductSpecRecordParams extends PageParams {
  pid: number;
  level?: string;
}

export interface ProductPurchaseSubmitParams {
  couponId?: number;
  id: number;
  num: number;
  selNum?: number[];
}

// 打开宝箱
export interface OpenChestParams {
  id: number;
  num: number;
}
export interface ProductPurchaseSubmitResponse {
  couponPrice: string;
  orderId: string;
  param: string;
  payPrice: string;
  totalPrice: string;
  usedCoin: string;
  usedMoney: string;
  usedIntegral: string;
  num: number;
}

export interface ProductQueryParams extends PageParams {
  cid: number;
  sort: number;
  stype: string;
}
export interface SearchGoodsQueryParams extends PageParams {
  cid: number;
  sort: number;
  stype: string;
  key: string;
}

export interface ProductRecommendModel {
  box: ProductBoxModel;
  boxId: number;
  createTime: string;
  id: number;
  pic: string;
  sort: number;
  status: number;
  title: string;
  updateTime: string;
}

export interface ProductBannerModel {
  createTime: string;
  id: number;
  pic: string;
  sort: number;
  status: number;
  title: string;
  updateTime: string;
  url: string;
}

export interface ProductBarrageModel {
  avatar: string;
  context: string;
  createTime: string;
  id: number;
  nickname: string;
  source: string;
  sourceEx: string;
  uid: number;
  updateTime: string;
}

export interface ProductCombinationList {
  discount: number;
  interval: number;
  people: number;
  total: number;
  selected: boolean;
}
export interface ProductDemonKingModel {
  amount: number;
  gid: number[];
  time: number;
  user?: User;
}

export interface ProductGoodsExtraModel {
  isLucky: boolean;
  isStrand: boolean;
  is_attach: boolean;
  selectNum: number;
}
export interface ProductOrderModel {
  attachGoods: [];
  chest: [];
  coin: number;
  goods: ProductGoodsModel;
  num: number;
  orderId: string;
  pid: number;
  price: number;
  createTime: string;
  redbag: OpenRedBagModel;
  status: number;
  ticket: number;
  uid: number;
  user: UserModel;
}

export interface ProductRecordModel {
  avatar: string;
  boxId: number;
  createTime: string;
  goodsId: number;
  goodsLevel: number;
  goodsName: string;
  goodsImage: string;
  id: number;
  isFree: number;
  nickname: string;
  productId: number;
  uid: number;
  updateTime: string;
  sales: number;
  vip: number;
  type: number; // 1 特殊 0：正常
  extra: ProductGoodsExtraModel;
}

export interface ProductGoodsModel {
  goodsDto: ProductGoodsDTOModel;
  id: number;
  isFree?: number;
  total: number;
  level: number;
  num: number;
  ugid: number;
  quality: number;
  uid: number;
  prob: number;
  weight: number;
  extra: ProductGoodsExtraModel;
}

export interface BarrageParams {
  productId: string;
  goodsId: number;
  goodsLevel: number;
  goodsImage: string;
  goodsName: string;
  boxId: number;
}
export interface ChestModel {
  createTime: string;
  goods: ProductGoodsModel;
  id: number;
  logo: string;
  title: string;
  updateTime: string;
  extra: ProductGoodsExtraModel;
  uid: number;
}

export interface ProductOpenChestModel {
  chestDto: ChestModel;
  extra: any;
  id: number;
  uid: number;
}

export interface FavoriteModel {
  id: number;
  name: string;
  image: string;
  price: number;
  time: number;
  index: number;
}
export interface UIProductGoods {
  title: string;
  image: string;
  price: number;
  levelImage: string;
  last: number;
  total: number;
  prob: string;
  isSpec: boolean;
  isStrand?: boolean;
  id?: number;
  isOpen?: boolean;
  isSellOut?: boolean;
  isDemon?: boolean;
  isHide?: boolean;
  desc?: string;
}

export interface combinationParams extends PageParams {
  pid?: number;
  status: number;
  total?: string | number;
  uid?: number;
}
export interface CombinationUser {
  avatar: string;
  nickname: string;
  num: number;
  uid: number;
  orderId: string;
}

export interface combinationModel {
  createTime: string;
  discount: number;
  expireTime: string;
  id: number;
  payNum: number;
  people: number;
  pid: number;
  status: number;
  total: number;
  uid: number;
  updateTime: string;
  userNum: number;
  users: CombinationUser;
}

export interface UIPayCombinationModel {
  checked: boolean;
  usedIntegral: string;
  orderId: string;
  image: string;
  title: string;
  totalPrice: string;
  usedMoney: string;
  usedCoin: string;
  discount: number;
  total: number;
  num: number;
  price: string;
  couponId: number;
}

export interface UIPayParamsModel {
  discount: number;
  total: number;
  interval: number;
  people: number;
}

export interface UIPayCombinationParams {
  couponId: number;
  num: number;
  pinkId: number;
  productId: number;
  realNum: number;
  combination: UIPayParamsModel;
}

export interface ProductModel {
  demonKingDto?: ProductDemonKingModel;
  boxId: number;
  /// 选号模式
  selectNum: number;
  boxSeqNo: number;
  createTime: string;
  remark?: string;
  dayLimit: number;
  freeNum: number;
  freeTotal: number;
  goods: ProductGoodsModel[];
  attachGoods: ProductGoodsModel[]; // 隐藏赏
  destinedConfig: ProductGoodsModel[];
  id: number;
  lockTime: string;
  lockType: number;
  lockUid: number;
  num: number;
  onceTimes: number[];
  price: number;
  sales: number;
  specGoods: ProductGoodsModel[];
  strandGoods: ProductGoodsModel[]; // 串串赏
  total: number;
  totalLimit: number;
  preid: number; // 前一个产品
  nextid: number; // 后一个产品
  bagBoxTime: number;
  queueLockTime: number;
  type: number; // 类型 0: 普通 1: 无限
  luckyLevel: number; // 幸运最低等级
  luckyVal: number; // 幸运值
  luckyMax: number; // 幸运值最大值
  payType: number;
  isCombination: number; // 是否开启拼团
  combination: ProductCombinationList[];
  winNum: number[];
  settleTime: string;
  settleStatus: number;
}

export interface OpenRedBagModel {
  amount: number;
  amountNew: number;
  gid: number;
  id: number;
  num: number;
}
export interface ProductOpenModel {
  coin: number;
  goods: ProductGoodsModel[];
  attachGoods: ProductGoodsModel[];
  chest: ProductOpenChestModel[];
  num: number;
  orderId: string;
  pid: number;
  price: number;
  status: number;
  ticket: number;
  uid: number;
  redbag: OpenRedBagModel[];
}
export interface ProductIndexModel {
  box: ProductBoxModel[];
  recom: ProductRecommendModel[];
  barrage: ProductBarrageModel[];
  banner: ProductBannerModel[];
  cfg: ProductIndexModelCfg;
}
export interface ProductDetailModel {
  box: ProductBoxModel;
  product: ProductModel;
}
