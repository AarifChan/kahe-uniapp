import type { ListObject, PageParams } from '@/model/base'
import type { OrderInfo } from '@/model/order'
import type { BillModel, BillParams, CouponModel, CouponRequestParams, LoginMobileRequest, LoginRequestParams, LoginResponse, LoginSmsRequest, RechargeModel, User, UserInfo, VipIndexModel, VipItemModel, VipsLevelModel, WithdrawParams } from '@/model/user'
import { get, post } from '@/utils/request'

/* 用户登录 */
export async function loginRequest(params: LoginRequestParams) {
  return await post<LoginResponse, LoginRequestParams>('wxapp/auth', params)
}

export async function loginByWxApp(params: LoginRequestParams) {
  return await post<LoginResponse, LoginRequestParams>('loginByWxApp', params)
}

/* 退出登录 */
export async function logoutRequest() {
  return await post('auth/logout')
}

export async function getUnreadNum() {
  return await get<{ data: number, totla: number }>('kefu/getUnreadNum')
}

/* 手机号登陆 */
export async function loginByMobile(params: LoginMobileRequest) {
  return await post<LoginResponse, LoginMobileRequest>('loginByMobile', params)
}

/* 获取验证码 */
export async function getSmsCodeRequest(params: LoginSmsRequest) {
  return await post('register/verify', params)
}

/* 重置密码 */
export async function resetPassword(params: any) {
  return await post('user/setPwd', params)
}

/* 密码登陆 */
export async function loginByPassword(params: any) {
  return await post('login', params)
}

/* 微信授权登录 */
export async function wechatAuthLoginRequest(params: any) {
  return await post('loginByWxApp', params)
}

export async function bindWechatRequest(params: any) {
  return await post('user/bindWxApp', params)
}

/* 注册用户 */
export async function registerByPhone(params: any) {
  return await post('register', params)
}

/* 绑定手机号 */
export async function bindMobile(params: any) {
  return await post('user/bindMobile', params)
}

/* 注销用户 */
export async function writeOffRequest() {
  return await post('user/writeOff', {})
}

/* 获取用户信息 */
export async function userInfoRequest() {
  return await get<UserInfo>('user/info')
}

/* 更新用户信息 */
export async function updateUserInfoRequest(data: any) {
  return await post('user/edit', data)
}

/** 用户简介 */
export async function getUserBrief(uid: string) {
  return await get<User>('user/brief', {
    uid,
  })
}

/* 等级列表 */
export async function vipLevelListRequest(params: PageParams) {
  return await get<ListObject<VipsLevelModel>>('user/vip/list', params)
}

/* VIP主页数据 */
export async function vipIndexRequest() {
  return await get<VipIndexModel>('user/vip')
}

/* 领取vip奖励 */
export async function receiveVipRequest() {
  return await post<VipItemModel[]>('user/vip/receive')
}

/* 优惠券 */
export async function getCouponListRequest(params: CouponRequestParams) {
  return await get<ListObject<CouponModel>>('user/coupon', params)
}

/**
 * 获取充值方案
 */
export async function getRechargePlanRequest() {
  return await get<RechargeModel[]>('recharge/index', {})
}

/* 创建充值计划 */
export async function createRechargePlanRequest(rechargeId: number) {
  return await post<OrderInfo>('recharge/create', {
    rechargeId,
  })
}

/* 完成充值 */
export async function completeRechargeRequest(orderId: string) {
  return await post('recharge/complete', {
    orderId,
  })
}

/* 用户提现 */
export async function withdrawMoneyRequest(params: WithdrawParams) {
  return await post<string>('user/extract', params)
}

/* 查询用户账单 */
export async function getUserBillRequest(params: BillParams) {
  return await get<ListObject<BillModel>>('user/bill/list', params)
}
