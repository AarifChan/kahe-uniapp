import { get, post } from '@/utils/request'
import type { ListObject, PageParams, VipItemModel } from '@/model'

export interface GiftRewardModel{
    id: number
    logo: string
    name: string
    num: number
}

export interface GiftListModel{
    days: number
    expireTime: string
    id: number
    logo: string
    name: string
    nowTime: string
    price: number
    receiveNum: number
    receiveTime: string
    sort: number
    vip: number
    rewards: GiftRewardModel[]
    rewardsDay: GiftRewardModel[]
}

export interface GiftPurchaseResponse{
    channel: string
    couponId: number
    couponPrice: number
    createTime: string
    deliverParam: string
    deliverStatus: number
    deliverTime: string
    extra: string
    id: number
    integral: boolean
    mark: string
    orderId: string
    param: string
    payInfo: string
    payOrderId: string
    payPrice: number
    payStatus: number
    payTime: string
    payType: string
    payed: boolean
    refundAmount: number
    refundReason: string
    refundStatus: number
    refundTime: string
    totalPrice: number
    uid: number
    updateTime: string
    usedCoin: number
    usedIntegral: number
    usedMoney: number
}

/* 获取礼包列表信息 */
export const getDiscountList = async (params: PageParams) => {
    return await get<ListObject<GiftListModel>>('gift/list', params)
}

/**
 * 购买礼包
 * @param id
 */
export const purchaseDiscountItem = async (id: number) => {
    return await post<GiftPurchaseResponse>('gift/purchase', {
        id
    })
}

/* 领取vip奖励 */
export const receiveGiftRequest = async () => {
    return await post<VipItemModel[]>('gift/receive')
}
