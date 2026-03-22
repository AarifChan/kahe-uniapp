import type { IUserInfoRes } from '@/api/types/login'
import {
  completeRechargeRequest,
  createRechargePlanRequest,
  getCouponListRequest,
  getRechargePlanRequest,
  loginRequest,
  logoutRequest,
  orderCancelRequest,
  orderSubmitRequest,
  receiveVipRequest,
  userInfoRequest,
  vipLevelListRequest,
} from '@/api/'
import { useTokenStore } from './token'
import type {
  CouponRequestParams,
  FavoriteModel,
  OrderSubmitParams,
  OrderWechatMpPayParams,
  OrderWechatPayParams,
  RechargeModel,
  UICouponModel,
  UIDayVIPItem,
  UserInfo,
  VipsLevelModel,
} from '@/model/'
import type { PageParams } from '@/model/base'
import { ShowToast } from '@/utils/Toast'
import { currentEnv } from '@/utils'
import { formatPrice } from '@/utils/tools/util'
import { parseTime } from '@/utils/tools'
import { eventBus } from '@/utils/event'
import { pollPaymentStatus } from '@/utils/pay'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 初始化状态
const userInfoState: IUserInfoRes = {
  userId: -1,
  username: '',
  nickname: '',
  avatar: '/static/images/default-avatar.png',
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserInfo>({} as UserInfo)
    const loginStatus = ref(false)
    const vipDayList = ref<UIDayVIPItem[]>([])
    const couponList = ref<UICouponModel[]>([])
    const favoriteList = ref<FavoriteModel[]>([])
    const rechargeList = ref<RechargeModel[]>([])
    const vipLevelsModel = ref<VipsLevelModel[]>([])
    const receivedVipShow = ref(false)

    const isLogin = computed(() => loginStatus.value)

    const setUserInfo = (val: IUserInfoRes) => {
      if (!val.avatar) {
        val.avatar = userInfoState.avatar
      }
      userInfo.value = val as unknown as UserInfo
    }

    const setUserAvatar = (avatar: string) => {
      ;(userInfo.value as any).avatar = avatar
    }

    const clearUserInfo = () => {
      userInfo.value = {} as UserInfo
      loginStatus.value = false
      uni.removeStorageSync('user')
    }

    const fetchUserInfo = async () => {
      try {
        const resp = await userInfoRequest()
        if (resp?.code === 200) {
          userInfo.value = resp.data
          loginStatus.value = true
          await getFavorite()
          if ((resp.data as any).receivedVip !== 1) {
            await getVipReceived()
          }
        }
        else {
          loginStatus.value = false
        }
        return resp?.data
      }
      catch (e) {
        console.log('fetchUserInfo err:', e)
      }
    }

    const preLogin = async () => {
      const { useTokenStore } = await import('./token')
      const tokenStore = useTokenStore()
      if (tokenStore.hasLogin) {
        await fetchUserInfo()
        return
      }
      // #ifdef MP-WEIXIN
      uni.login({
        provider: 'weixin',
        success: async (result) => {
          const logRes = await loginRequest({
            code: result.code,
            plat: import.meta.env.VITE_APP_PLATFORM || 'wx_ma_2',
          } as any)
          if (logRes.code === 200) {
            tokenStore.setTokenInfo({ token: logRes.data.token, expiresIn: 86400 * 30 } as any)
            const resp = await userInfoRequest()
            if (resp.code === 200 && (resp.data as any).phone && (resp.data as any).phone !== '') {
              userInfo.value = resp.data
              loginStatus.value = true
              eventBus.emit('didLogin', true)
              await getFavorite()
            }
            else {
              loginStatus.value = false
              eventBus.emit('needLogin', true)
            }
          }
          else {
            loginStatus.value = false
            eventBus.emit('needLogin', true)
          }
        },
        fail: () => {
          loginStatus.value = false
          eventBus.emit('needLogin', true)
        },
      })
      // #endif
    }

    const checkLogin = () => {
      if (loginStatus.value) return true
      uni.navigateTo({ url: '/pages/login/index' })
      return false
    }

    const getVipReceived = async () => {
      const vipRes = await receiveVipRequest()
      if (vipRes.code === 200) {
        const list: UIDayVIPItem[] = []
        for (const item of vipRes.data) {
          const type = item.id === 3 ? 1 : item.id > 10000 ? 2 : 3
          let image = ''
          if (item.id === 1) image = 'https://jms.85gui7.com/kahe-202510/images/vip-item1.png'
          else if (item.id >= 1000 && item.id < 10000) image = 'https://jms.85gui7.com/swcw/common/coupon.jpg'
          else if (item.id === 2) image = 'https://jms.85gui7.com/kahe-202510/images/vip-item3.png'
          else if (item.id === 6) image = 'https://jms.85gui7.com/swcw/common/integral.jpg'
          else if (item.id >= 10000) image = (item as any).logo
          list.push({ type, name: item.name, num: item.num, id: item.id, image })
        }
        vipDayList.value = list
        receivedVipShow.value = true
      }
    }

    const getFavorite = async () => {
      const data = uni.getStorageSync('favorite')
      if (data) {
        const items = JSON.parse(data)
        if (items && items.length > 0) favoriteList.value = items
      }
    }

    const addFavorite = (item: FavoriteModel) => {
      const index = favoriteList.value.findIndex(n => n.id === item.id)
      if (index !== -1) {
        favoriteList.value.splice(index, 1)
        ShowToast('移除收藏')
      }
      else {
        favoriteList.value.unshift(item)
        ShowToast('收藏成功')
      }
      uni.setStorageSync('favorite', JSON.stringify(favoriteList.value))
    }

    const getVipLevelList = async (params: PageParams = { page: 1, limit: 1000 }) => {
      const resp = await vipLevelListRequest(params)
      if (resp.code === 200) {
        vipLevelsModel.value = (resp.data as any).content
        return (resp.data as any).totalElements
      }
      return 0
    }

    const getCouponList = async (params: CouponRequestParams) => {
      const resp = await getCouponListRequest(params)
      if (resp.code === 200) {
        const list: UICouponModel[] = params.page === 1 ? [] : couponList.value
        for (const item of (resp.data as any).content) {
          const startTime = parseTime(item.createTime, '{y}.{m}.{d}') ?? ''
          list.push({
            title: item.title,
            id: item.id,
            type: item.type,
            useMinPrice: formatPrice(item.useMinPrice),
            price: formatPrice(item.couponPrice),
            time: startTime + '-' + item.endTime,
            status: item.status,
          })
        }
        couponList.value = list
        return Math.ceil((resp.data as any).totalElements / params.limit)
      }
      return 0
    }

    const getRechargeList = async () => {
      const resp = await getRechargePlanRequest()
      rechargeList.value = resp.code === 200 ? resp.data : []
    }

    const handleWxPay = async (orderId: string, pid = 0): Promise<string | null> => {
      const appStore = (await import('./app')).useAppStore()
      return new Promise(async (resolve) => {
        let payType = ''
        // #ifdef MP-WEIXIN
        payType = import.meta.env.VITE_APP_PLATFORM || 'wx_ma_2'
        // #endif

        // #ifdef H5
        payType = appStore.payType === 1 ? 'wx_h5' : 'ali_h5'
        if (currentEnv() === 'h5-weixin' || currentEnv() === 'mp-weixin') {
          resolve('请在别的浏览器尝试')
          return
        }
        // #endif

        // #ifdef APP
        payType = appStore.payType === 1 ? 'wx_app' : 'ali_app'
        // #endif

        const params = { from: 'routine', orderId, payType } as OrderSubmitParams
        if (payType === 'ali_h5') {
          let aliReturnUrl = window.location.href
          if (pid) aliReturnUrl += '&pid=' + pid
          params.aliReturnUrl = aliReturnUrl + `&orderId=${orderId}`
        }

        const orderResp = await orderSubmitRequest(params)
        if (orderResp.code !== 200) {
          await orderCancelRequest(orderId)
          resolve(orderResp.msg + 'error~')
          ShowToast(orderResp.msg)
          return
        }

        if (payType === 'ali_app') {
          const orderString = (orderResp.data as any).jsConfig?.orderString ?? ''
          uni.requestPayment({
            provider: 'alipay',
            orderInfo: orderString,
            success: async () => { ShowToast('支付成功'); resolve(null) },
            fail: async (err: any) => { await orderCancelRequest(orderId); resolve('取消支付' + JSON.stringify(err)) },
          })
        }
        else if (payType === 'ali_h5') {
          const url = (orderResp.data as any).jsConfig.url
          if (url) { window.location.href = url }
          else { resolve('支付出错，请联系客服') }
        }
        else if (payType === 'wx_app') {
          const payParams = (orderResp.data as any).jsConfig as OrderWechatPayParams
          const orderInfo = {
            appid: payParams.appid,
            partnerid: payParams.partnerid,
            prepayid: payParams.prepayid,
            package: payParams.package,
            noncestr: payParams.noncestr,
            timestamp: payParams.timestamp,
            sign: payParams.sign,
          }
          uni.requestPayment({
            provider: 'wxpay',
            orderInfo: JSON.stringify(orderInfo),
            success: async () => {
              ShowToast('支付成功')
              pollPaymentStatus(orderId, 5000, 10)
                .then(res => resolve(res === 'success' ? null : '订单查询失败'))
                .catch(() => resolve('订单查询失败'))
            },
            fail: async () => { await orderCancelRequest(orderId); resolve('取消支付') },
          })
        }
        else {
          // wx_ma or wx_h5
          const payParams = (orderResp.data as any).jsConfig as OrderWechatMpPayParams
          uni.requestPayment({
            provider: 'wxpay',
            nonceStr: payParams.nonceStr,
            package: payParams.package,
            paySign: payParams.paySign,
            signType: payParams.signType,
            timeStamp: payParams.timeStamp,
            orderInfo: orderId,
            success: async () => {
              pollPaymentStatus(orderId, 5000, 10)
                .then(res => resolve(res === 'success' ? null : '订单查询失败'))
                .catch(() => resolve('订单查询失败'))
            },
            fail: async () => { await orderCancelRequest(orderId); resolve('取消支付') },
          })
        }
      })
    }

    const rechargePlanAction = async (rechargeId: number): Promise<string | null> => {
      const resp = await createRechargePlanRequest(rechargeId)
      if (resp.code === 200) {
        const orderId = (resp.data as any).orderId
        const wxRes = await handleWxPay(orderId)
        if (wxRes) return wxRes
        const completeResp = await completeRechargeRequest(orderId)
        if (completeResp.code === 200) {
          await fetchUserInfo()
          return null
        }
        return completeResp.msg
      }
      return resp.msg
    }

    return {
      userInfo,
      loginStatus,
      isLogin,
      vipDayList,
      couponList,
      favoriteList,
      rechargeList,
      vipLevelsModel,
      receivedVipShow,
      setUserInfo,
      setUserAvatar,
      clearUserInfo,
      fetchUserInfo,
      preLogin,
      checkLogin,
      getVipReceived,
      getFavorite,
      addFavorite,
      getVipLevelList,
      getCouponList,
      getRechargeList,
      handleWxPay,
      rechargePlanAction,
    }
  },
  { persist: true },
)
