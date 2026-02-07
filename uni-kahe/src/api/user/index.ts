import { get, post } from "@/utils/request";
import {
  type CouponModel,
  type CouponRequestParams,
  type LoginRequestParams,
  type LoginResponse,
  type RechargeModel,
  type User,
  type UserInfo,
  type VipIndexModel,
  type VipItemModel,
  type VipsLevelModel,
  type WithdrawParams,
  type BillModel,
  type BillParams,
  type LoginMobileRequest,
  type LoginSmsRequest,
} from "@/model/user";
import { type ListObject, type PageParams } from "@/model/base";
import { type OrderInfo } from "@/model/order";

/* 用户登录 */
export const loginRequest = async (params: LoginRequestParams) => {
  return await post<LoginResponse, LoginRequestParams>("wxapp/auth", params);
};

export const loginByWxApp = async (params: LoginRequestParams) => {
  return await post<LoginResponse, LoginRequestParams>("loginByWxApp", params);
};

/* 退出登录 */
export const logoutRequest = async () => {
  return await post("auth/logout");
};

export const getUnreadNum = async () => {
  return await get<{ data: number; totla: number }>("kefu/getUnreadNum");
};

/* 手机号登陆 */
export const loginByMobile = async (params: LoginMobileRequest) => {
  return await post<LoginResponse, LoginMobileRequest>("loginByMobile", params);
};

/* 获取验证码 */
export const getSmsCodeRequest = async (params: LoginSmsRequest) => {
  return await post("register/verify", params);
};

/* 重置密码 */
export const resetPassword = async (params: any) => {
  return await post("user/setPwd", params);
};

/* 密码登陆 */
export const loginByPassword = async (params: any) => {
  return await post("login", params);
};

/* 微信授权登录 */
export const wechatAuthLoginRequest = async (params: any) => {
  return await post("loginByWxApp", params);
};

export const bindWechatRequest = async (params: any) => {
  return await post("user/bindWxApp", params);
};

/* 注册用户 */
export const registerByPhone = async (params: any) => {
  return await post("register", params);
};

/* 绑定手机号 */
export const bindMobile = async (params: any) => {
  return await post("user/bindMobile", params);
};

/* 注销用户 */
export const writeOffRequest = async () => {
  return await post("user/writeOff", {});
};

/* 获取用户信息 */
export const userInfoRequest = async () => {
  return await get<UserInfo>("user/info");
};

/* 更新用户信息 */
export const updateUserInfoRequest = async (data: any) => {
  return await post("user/edit", data);
};

/** 用户简介 */
export const getUserBrief = async (uid: string) => {
  return await get<User>("user/brief", {
    uid,
  });
};

/* 等级列表 */
export const vipLevelListRequest = async (params: PageParams) => {
  return await get<ListObject<VipsLevelModel>>("user/vip/list", params);
};

/* VIP主页数据 */
export const vipIndexRequest = async () => {
  return await get<VipIndexModel>("user/vip");
};

/* 领取vip奖励 */
export const receiveVipRequest = async () => {
  return await post<VipItemModel[]>("user/vip/receive");
};

/* 优惠券 */
export const getCouponListRequest = async (params: CouponRequestParams) => {
  return await get<ListObject<CouponModel>>("user/coupon", params);
};

/**
 * 获取充值方案
 */
export const getRechargePlanRequest = async () => {
  return await get<RechargeModel[]>("recharge/index", {});
};

/* 创建充值计划 */
export const createRechargePlanRequest = async (rechargeId: number) => {
  return await post<OrderInfo>("recharge/create", {
    rechargeId,
  });
};

/* 完成充值 */
export const completeRechargeRequest = async (orderId: string) => {
  return await post("recharge/complete", {
    orderId,
  });
};

/* 用户提现 */
export const withdrawMoneyRequest = async (params: WithdrawParams) => {
  return await post<string>("user/extract", params);
};

/* 查询用户账单 */
export const getUserBillRequest = async (params: BillParams) => {
  return await get<ListObject<BillModel>>("user/bill/list", params);
};
