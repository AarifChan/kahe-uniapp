<template>
    <tn-popup v-model="vShow" open-direction="center" bg-color="transparent" @close="emits('update:show', false)">
        <view class="shipment">
            <view class="shipment-content">
                <view class="shipment-content-top">
                    <view class="shipment-content-top-title theme-font text-stroke-main">发货确认</view>
                    <view class="shipment-content-top-closeBg">
                        <image class="shipment-content-top-closeBg-close" @tap.stop="emits('update:show', false)" src="https://jms.85gui7.com/kahe/common/close-white.png" />
                    </view>
                </view>
                <view class="shipment-content-info" v-if="address?.price ?? false">
                    <text class="shipment-content-info-title">需支付</text>
                    <text class="shipment-content-info-value">¥{{address.price}}</text>
                    <text class="shipment-content-info-title">邮费</text>
                </view>
                <view class="shipment-content-center">
                    <scroll-view class="shipment-content-center-scroll" :scroll-x="true" :enable-flex="true" scroll-with-animation>
                        <view class="shipment-content-center-scroll-content">
                            <view class="shipment-content-center-scroll-content-item" v-for="(item, index) in list" :key="index">
                                <view class="shipment-content-center-scroll-content-item-goods">

                                    <image :src="item.image" class="shipment-content-center-scroll-content-item-goods-img" />
                                    <view class="shipment-content-center-scroll-content-item-goods-levelBg">
                                        <image
                                            mode="heightFix"
                                            class="shipment-content-center-scroll-content-item-goods-levelBg-level"
                                            :src="item.levelImage"
                                        />
                                    </view>
                                    <text class="shipment-content-center-scroll-content-item-goods-num">x{{ item.num }}</text>
                                </view>
                                <text class="shipment-content-center-scroll-content-item-title text-flow-ellipsis-single">{{ item.name??'' }}</text>
                            </view>
                        </view>

                        <view class="shipment-content-center-scroll-num">
                            <image class="shipment-content-center-scroll-num-bg" src="https://jms.85gui7.com/kahe-202510/images/num-bg.png" />
                            <text class="shipment-content-center-scroll-num-title theme-font">共{{ total }}件</text>
                        </view>
                    </scroll-view>
                </view>

                <view class="shipment-content-option" @tap.stop="emits('didTapAddress')">
                    <pay-option title="收货信息" color="black" />
                </view>

                <view class="shipment-content-address">
                    <text class="shipment-content-address-title">收货人：{{address?.realName ?? ""}}</text>
                    <text class="shipment-content-address-title">联系电话：{{address?.phone ?? ""}}</text>
                    <text class="shipment-content-address-title">收货地址：{{address?.detail ?? ""}}</text>
                </view>

                <agreement v-model:checked="agree" @did-tap-protocol="emits('didTapProtocol')" />

                <view class="shipment-content-bottom" @tap.stop="didTapConfirm">
                    <custom-button title="确定" />
                </view>
            </view>
        </view>
    </tn-popup>
</template>

<script lang="ts" setup>
import CustomButton from '@/components/custom/button/index.vue'
import Agreement from '@/components/agreement/index.vue'
import PayOption from '@/components/modal/pay/components/option.vue'
import type { SubmitGoodsModel, AddressModel } from '@/model'
import { type PropType, computed, ref, watch } from 'vue'
import { ShowToast } from '@/utils'
const props = defineProps({
    show: {
        default: false,
        type: Boolean
    },
    list: {
        default: [] as SubmitGoodsModel[],
        type: Array as PropType<SubmitGoodsModel[]>
    },
    address: Object as PropType<AddressModel>
})
const vShow = ref(false)
watch(() => props.show, value => {
    vShow.value = value
})
const total = computed(() => {
    let total = 0
    props.list.forEach((item) => {
        total += item.num
    })
    return total
})

const didTapConfirm = () => {
    if (!agree.value) {
        ShowToast('请阅读并允许协议')
        return
    }
    emits('didClickConfirm')
}

const agree = ref(false)
const totalPrice = computed(() => {
    let price = 0
    props.list.forEach((item) => {
        price += item.price * item.num
    })
    return price
})
const emits = defineEmits(['update:show', 'didTapProtocol', 'didTapAddress', 'didClickConfirm'])
</script>

<style lang="scss" scoped>
.shipment {
    position: relative;
    background-color: transparent;
    width: 626rpx;
    height: 761rpx;
    &-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #F3F6FE;
        border-radius: 10rpx;
        overflow: hidden;
        &-top {
            position: relative;
            width: 100%;
            background: linear-gradient(-90deg, #C8E0FC, #88BDFF);
            height: 73rpx;
            &-title {
                font-size: 40rpx;
                line-height: 73rpx;
                font-weight: 400;
                color: #FFFFFF;
                margin-left: 34rpx;
            }
            &-closeBg {
                position: absolute;
                right: 35rpx;
                top: -8rpx;
                width: 108rpx;
                height: 56rpx;
                background-color: #FF7878;
                border-radius: 10rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #BC4646;
                &-close{
                width: 38rpx;
                height: 39rpx;
            }
            }

        }

        &-info{
            display: flex;
            flex-direction: row;
            margin-top: 16rpx;
            margin-left: 38rpx;
            &-title{
                font-size: 26rpx;
                font-weight: 400;
                color: #000000;
            }
            &-value{
                font-size: 26rpx;
                font-weight: 400;
                color: #4B71FF;
            }
        }
        &-center{
            margin-top: 12rpx;
            padding: 0 28rpx;
            box-sizing: border-box;
            width: 100%;
            height: 239rpx;

            &-scroll{
                position: relative;
                width: 100%;
                height: 100%;
                background: #FFFFFF;
                box-shadow: 0rpx 0rpx 6rpx 0rpx #D4DEE9;
                border-radius: 4rpx;

                display: flex;
                flex-direction: row;
                &-content{
                    padding: 40rpx 20rpx 0 20rpx;
                    white-space: nowrap;
                    display: flex;
                    flex-direction: row;

                    &-item {
                        position: relative;
                        display: inline-block;
                        flex-direction: column;
                        margin-right: 24rpx;
                        width: 152rpx;
                        overflow: hidden;
                        &-goods {
                            position: relative;
                            width: 152rpx;
                            height: 152rpx;

                            &-img {
                                border-radius: 2rpx;
                                width: calc(100% - 4rpx);
                                height:calc(100% - 4rpx);
                                border: 2rpx solid #3B7CFF;
                                position: absolute;
                                left: 0;
                                top: 0;
                            }
                            &-levelBg {
                                position: absolute;
                                // @include flex-xy-center(row);
                                left: -15rpx;
                                bottom: -2rpx;
                                width: 70rpx;
                                height: 35rpx;
                                background: #95C3F7;
                                border-radius: 0rpx 8rpx 0rpx 8rpx;
                                &-level {
                                    transform: translateX(20rpx);
                                height: 100%;
                            }
                            }

                            &-num {
                                position: absolute;
                                right: 15rpx;
                                bottom: 5rpx;
                                z-index: 2;
                                font-size: 24rpx;
                                font-weight: normal;
                                color: #000000;
                            }
                        }
                        &-title {
                            position: relative;;
                            width: 80rpx;
                            height: 21rpx;
                            text-align: left;
                            font-size: 20rpx;
                            font-weight: 400;
                            color: #1a385b;
                        }
                    }
                }

                &-num {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 141rpx;
                    height: 40rpx;
                    &-bg{
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                    }

                    &-title{
                        position: absolute;
                        right: 20rpx;
                        top: 0;
                        line-height: 40rpx;
                        font-size: 24rpx;
                        font-weight: 400;
                        color: #000000;
                        text-align: right;
                    }
                }
            }

        }

        &-option{
            padding: 20rpx 32rpx;
            box-sizing: border-box;
            width: 100%;

        }
        &-address{
            padding: 0 40rpx;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            flex-direction: column;
            &-title{
                margin-bottom: 24rpx;
                width: 620rpx;
                height: 26rpx;
                font-size: 24rpx;
                font-weight: 400;
                color: #000000;
            }
        }

        &-bottom {
            position: absolute;
            bottom: 22rpx;
            left: 0;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>
