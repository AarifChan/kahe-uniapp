export interface OrderWechatPayParams {
  appid: string;
  noncestr: string;
  package: string;
  partnerid: string;
  prepayid: string;
  sign: string;
  timestamp: string;
  url: string;
  orderString?: string;
}

export interface OrderWechatMpPayParams {
  timeStamp: string;
  package: string;
  paySign: string;
  appId: string;
  signType: string;
  nonceStr: string;
  orderString?: string;
  url: string;
}

export interface OrderInfo {
  channel: string;
  couponId: number;
  couponPrice: number;
  createTime: string;
  deliverStatus: number;
  deliverTime: string;
  extra: string;
  id: number;
  mark: string;
  orderId: string;
  param: string;
  payInfo: string;
  payOrderId: string;
  payPrice: string;
  payStatus: number;
  payTime: string;
  payType: string;
  payed: string;
  refundAmount: number;
  refundReason: string;
  refundStatus: number;
  refundTime: string;
  totalPrice: number;
  uid: number;
  updateTime: string;
  usedCoin: number;
  usedMoney: number;
}

export interface OrderSubmitParams {
  from: string;
  orderId: string;
  payType: string;
  aliReturnUrl?: string;
}

export interface OrderSubmitResponse {
  orderId: string;
  method: string;
  jsConfig: OrderWechatPayParams | OrderWechatMpPayParams;
}
