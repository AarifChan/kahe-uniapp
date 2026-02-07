import type { MerchantModel, ProductGoodsDTOModel } from "@/model";

export interface UIBannerModel {
  title: string;
  image: string;
  id: number;
  state: number;
  content: string;
}

export interface UIRecommendModel {
  image: string;
  tagPath?: string;
  title: string;
  price: number;
  productNum: number;
  lastSeqNo: number;
  id: number;
}
export interface UIMerchant {
  cate: string;
  icon: string;
  id: number;
  name: string;
  tag: number;
}

export interface UIProductModel {
  name: string;
  image: string;
  merchant?: UIMerchant;
  mainTagImage: string;
  subTagImage: string;
  price: string;
  id: number;
  cateId: number;
  productNum?: number;
  isSellout: boolean;
  lastSeqNo?: number;
  labels: number[];
}

export interface UIBarrageModel {
  avatar: string;
  userName: string;
  content: string;
  isRare?: boolean;
  goodsImage: string;
  productId: string;
  levelPath: string;
}

export interface UIMallCategoryModel {
  name: string;
  image: string;
  id: number;
}

export interface UIMallListItemModel {
  name: string;
  image: string;
  price: number;
  id: number;
  showPrice: string;
  mainTagImage: string;
  labels?: number[];
  productNum?: number;
  lastSeqNo?: number;
}

export interface UIProductLevelItem {
  name: string;
  image: string;
}

export interface UIProductDetailLevelList {
  levelImgPath: string;
  level: number; // 等级
  name: string;
  levelName: string;
  image: string;
  price: string;
  prob: string; // 概率
  list: UIProductLevelItem[];
}

export interface UIProductDetailLevelGroupItem {
  salePrice: string;
  goodDesc: string;
  title: string;
  image: string;
  name: string;
  prob: string;
  levelName: string;
  price: string;
  isDemon?: boolean;
}

export interface UIProductDetailLevelGroup {
  levelName: string;
  level: number;
  prob: string;
  items: UIProductDetailLevelGroupItem[];
}

export interface UIProductPriceCard {
  price: string;
  num: number;
  last: number;
  formatNum: string;
}

export interface UIProductBoxModel {
  salePrice?: number;
  title: string;
  image: string;
  price: number;
  level: number;
  levelImage: string;
  levelBg?: string;
  last: number;
  num?: number;
  total: number;
  prob: string;
  weight?: number;
  quality?: number;
  isSpec: boolean;
  isStrand?: boolean;
  id: number;
  isOpen?: boolean;
  isSellOut?: boolean;
  isSky?: boolean;
  isDemon?: boolean;
  isHide?: boolean;
  hasRedBag?: boolean;
  desc?: string;
  goodDesc?: string;
  isLucky?: boolean;
  isBao?: boolean;
}
export interface UIProductBoxDetailModel {
  title: string;
  image: string;
  price: number;
  level: number;
  levelImage: string;
  last: number;
  total: number;
  prob: string;
  isSpec: boolean;
  isStrand?: boolean | undefined;
  id: number;
  isOpen?: boolean | undefined;
  isSellOut?: boolean | undefined;
  isDemon?: boolean | undefined;
  isHide?: boolean | undefined;
  desc?: string | undefined;
}
export interface UIProductOpenBoxModel {
  levelBg?: string;
  name: string;
  image: string;
  level: number;
  isLucky: boolean;
  levelImage: string;
  num: number;
  id: number;
  uGIds: number[];
  uGId?: number;
  isHide: boolean;
  price?: string;
  isBao?: boolean;
  hasRedBag?: boolean;
}
export interface UIUserRewards {
  avatar: string;
  nickname: string;
  uid: string;
  username: string;
  vip: number;
}
export interface UIProductRecordModel {
  user?: UIUserRewards;
  id: number;
  nickName: string; // 用户昵称
  title: string; // 箱子名称
  goodsImage: string;
  avatar: string; // 用户头像
  level: number; // 等级
  levelImage: string;
  isFree: boolean;
  time: string;
  isLucky: boolean;
  vip: number;
  sales: number;
  isHide: boolean;
  isSpec: boolean;
  num?: number;
}

export interface UIProductBoxRangeType {
  title: string;
  page: number;
}

export interface UIProductSwapLevelItem {
  title: string;
  num: number;
  total: number;
}

export interface UICouponModel {
  id: number;
  price: string;
  title: string;
  time: string;
  type: number;
  useMinPrice: string;
  status: number; // 状态(0 未使用 1 已使用 2 已过期)
}
export interface UIProductPayModel {
  fromMall: boolean;
  image: string;
  title: string;
  price: string;
  totalPrice: string;
  payPrice: string;
  usedMoney?: string; // 余额
  usedPrice: number;
  usedIntegral?: string; // 海皇积分
  usedCoin?: string; // 海皇币
  num: number;
  id: string | number;
  coupon?: UICouponModel;
}

export interface UITabItemType {
  title: string;
  value: number;
}

export interface UIProductCategoryModel {
  id: number;
  image: string;
  name: string;
}

export interface UIMineBoxModel {
  boxId: number;
  logo: string;
  num: number;
  title: string;
  gainTime: string;
  selected: boolean;
}

export interface ChestGoodsModel {
  id: number;
  level: number;
  num: number;
  weight: number;
  image: string;
  title: string;
}
export interface UIMineChestModel {
  boxId: number;
  cid: number;
  logo: string;
  num: number;
  title: string;
  gainTime: string;
  status: number;
  selectNum?: number;
  // chest: ChestDotoModel
  goods: ChestGoodsModel[];
}
export interface UIOpenListModel {
  name?: string;
  image: string;
  level?: number;
  isLucky?: boolean;
  levelImage: string;
  num: number;
  id?: number;
  price?: number;
  uGIds?: number[];
  uGId?: number;
  isHide?: boolean;
  levelBg?: string;
  hasRedBag?: boolean;
}
export interface UIMineProductBoxModel {
  name: string;
  image: string;
  level: number;
  levelImage: string;
  gainTime: string;
  num: number;
  id: number;
  price: number;
  selected: boolean;
}

export interface UIMineSmashProductModel {
  name: string;
  id: number;
  level: number;
  gid: number;
  boxId: number;
  num: number;
}

export interface UIMineBoxPageModel {
  current: number;
  total: number;
}

export interface UIHandleItemModel {
  name: string;
  value: number;
  icon: string;
}

export interface UIMineBoxRecordModel {
  orderId: string;
  totalPrice?: number;
  deliverySn?: string;
  deliveryId?: string;
  recordType: number; // 1:已发货记录 2:已粉碎
  list: UIMineProductBoxModel[];
}

export interface UIShipmentAddressModel {
  id?: number;
  name: string;
  phone: string;
  detail: string;
  price: number;
  orderId?: string;
}

export interface UISegmentItem {
  title: string;
  value: number;
}

export interface UIGoodsFilterItem {
  value: number;
  name: string;
}

export interface UIDayVIPItem {
  image: string;
  name: string;
  type: number;
  num: number;
  id: number;
}

export interface UIGoodsFilterType {
  sort: UIGoodsFilterItem;
  level: UIGoodsFilterItem;
}

export interface UIDemonKing {
  exist: boolean;
  avatar?: string;
  nickname?: string;
  time: string;
  coin: string;
  gid: number[];
  goods: UIProductBoxModel | null;
}
export interface UIAttachList {
  id: number;
  title: string;
  price: 0;
  prob: string;
  level: number;
  levelImage: string;
  image: string;
  last: number;
  total: number;
  isSpec: boolean;
  isSellOut: boolean;
  isHide: boolean;
}
export interface UIPayGoods {
  image: string;
  price: number;
  title: string;
}
export interface UIDrawList {
  image: string;
  title: string;
  levelImage: number;
  num?: number;
}
export interface UItabList {
  name: string;
  value: number;
}
export interface UIcomuserList {
  avatar: string;
  nickname: string;
  num: number;
  uid: number;
  orderId: string;
}
export interface UIPiecingList {
  uid: number;
  discount: number;
  time: number;
  id: number;
  payNum: number;
  people: number;
  pid: number;
  status: number;
  total: number;
  userNum: number;
  users: UIcomuserList[];
}

export interface UIcombinationList {
  discount: number;
  interval: number;
  people: number;
  total: number;
  selected: boolean;
}
export interface UIuseRewords {
  name: string;
  sales: number;
  uid: number;
}

export interface UIProductDetailModel {
  isCombination: number; // 是否开启拼团
  id: number;
  boxId: number;
  title: string;
  num: number;
  total: number;
  image: string;
  pid: number;
  current: number; // 当前箱数
  lastSeq: number; // 总箱数
  sales: number; // 当前楼层
  preId: number;
  nextId: number;
  price: number;
  isFavorite: boolean;
  merchant?: UIMerchant;
  bagBoxTime: number;
  remark?: string;
  queueLockTime: number;
  type: number; // 类型 NORMAL(0, "普通盲盒"),INFINITE(1, "无限盲盒"),WELFARE(2, "福袋"),DUELD(3, "对决"),BLESSING(4, "满开福袋");
  isKindMode: boolean;
  nextLevel: string; // 下一等级
  nextLevelValue: number;
  another: number; // 下一等级所需的数量
  levelList: UIProductDetailLevelList[];
  attachList: UIProductBoxModel[];
  luckyList: UIProductBoxModel[];
  luckProgress: number;
  luckyVal: number;
  demonKing: UIDemonKing;
  isDemon: boolean;
  luckyMax: number;
  catId?: number;
  winNum: number[];
  settleStatus: number;
  settleTime: string;
}
export interface UIProductSwapItemModel {
  id: number;
  num: number;
  total: number;
  boxSeqNo: number;
  isCurrent: boolean;
  list: UIProductSwapLevelItem[];
}
export interface UIProductSwapModel {
  boxRange: UIProductBoxRangeType[];
  boxList: UIProductSwapItemModel[];
}
export interface UIWelfareList {
  id: number;
  title: string;
  image: string;
  endTime?: string | number;
  startTime?: string;
  status?: number;
  merchant?: MerchantModel;
  goods: UIWelareGoodsItem[];
}
type CodeType = {
  [key: number]: number;
};
export interface welfareDetailUserGoods {
  id: number;
  num: number;
  uid: number;
}
export interface UIwelfareDetailUser {
  actid: number;
  code: CodeType;
  createTime: string;
  goods: welfareDetailUserGoods[];
  id: number;
  status: number;
  uid: number;
  updateTime: string;
}
export interface UIwelfareDetailListGoodsDto {
  image: string;
  level: string;
  name: string;
  price: number;
  salePrice: number;
  type: number;
}
export interface UIwelfareDetailList {
  id: number;
  num: number;
  image: string;
  level: string;
  name: string;
  price: number;
  salePrice: number;
  type: number;
}
export interface UIWelfareDetailListGoods {
  id: number;
  num: number;
  goodsDto: UIwelfareDetailListGoodsDto;
}
export interface UIWelfareUserlogDto {
  code: number;
  createTime: string;
  goods: [{ cid: number }, { id: number }, { num: number }];
  id: number;
  status: number;
}
export interface UIWelfareUserlog {
  id: number;
  status: number;
  welfareDto: UIWelfareUserlogDto;
  time: string;
}
export interface UIWelfareUserDots {
  avatar: string;
  nickname: string;
  phone?: string | number; // 可选属性，如果存在则为string类型
  uid: number;
  username: string;
  vip: number;
}
export interface UIWelfareUserGoodsDot {
  image: string;
  name: string;
  createTime: string;
}
export interface UIWelfareUserList {
  goods: UIWelfareDetailListGoods[];
  time: number;
  num: number;
  code: number;
  user: UIWelfareUserDots;
}

export interface UIWelareGoodsItem {
  goodsDto: ProductGoodsDTOModel;
  id: number;
  num: number;
}
export interface UIWelareRewardListItem {
  actid: number;
  code: number[];
  goods: UIWelareGoodsItem[];
  uid: number;
  user: UIWelfareUserDots;
}

export interface UIIconItem {
  value: number;
  text: string;
  image: string;
}
