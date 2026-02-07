<template>
    <view class="gift">
        <image class="gift-bg" src="https://jms.85gui7.com/kahe-202510/product/product-bg.png" />
        <scroll-view class="gift-scroll" @scrolltolower="scrollToLower">
            <view class="gift-scroll-content">
                <view class="gift-scroll-content-top">
                    <image class="gift-scroll-content-top-icon" src="https://jms.85gui7.com/kahe-202510/discount/item.png" />
                    <image class="gift-scroll-content-top-title" src="https://jms.85gui7.com/kahe-202510/discount/title.png" />
                </view>
                <view class="gift-scroll-content-list">
                    <view class="gift-scroll-content-list-item" v-for="(item, index) in list" :key="'i'+index" :id="'id'+index">
                        <view class="gift-scroll-content-list-item-top">
                            <image class="gift-scroll-content-list-item-top-logo" :src="item.logo" />
                            <view class="gift-scroll-content-list-item-top-info">
                                <view class="gift-scroll-content-list-item-top-title theme-font">{{item.name}}</view>
                                <view v-if="lastDay(item.expireTime) > 0" class="gift-scroll-content-list-item-top-subTitle">礼包待领天数：{{lastDay(item.expireTime)}}</view>
                            </view>

                        </view>
                        <view class="gift-scroll-content-list-item-bottom">
                            <view class="gift-scroll-content-list-item-bottom-item" v-for="(zItem, zIndex) in item.rewards" :key="index + ':' + zIndex" :id="index + ':' + zIndex">
                                <image class="gift-scroll-content-list-item-bottom-item-img" src="https://jms.85gui7.com/kahe-202510/discount/item2.png" />
                                <view class="gift-scroll-content-list-item-bottom-item-info">
                                    <view class="gift-scroll-content-list-item-bottom-item-info-title">购买必得</view>
                                    <view class="gift-scroll-content-list-item-bottom-item-info-subTitle">{{zItem.num}}{{zItem.name}}</view>
                                </view>
                            </view>
                            <view class="gift-scroll-content-list-item-bottom-item" v-for="(zItem, zIndex) in item.rewardsDay" :key="index + ':' + zIndex" :id="index + ':' + zIndex">
                                <image class="gift-scroll-content-list-item-bottom-item-img"  src="https://jms.85gui7.com/kahe-202510/discount/item1.png" />
                                <view class="gift-scroll-content-list-item-bottom-item-info">
                                    <view class="gift-scroll-content-list-item-bottom-item-info-title">每日登录</view>
                                    <view class="gift-scroll-content-list-item-bottom-item-info-subTitle">{{zItem.num}}{{zItem.name}}</view>
                                </view>
                            </view>
                        </view>
                        <view class="gift-scroll-content-list-item-btn">
                            <CustomBtn :title="needPayAgain(item) ? '续 费' : '购 买' " @tap.stop="didClickItem(item)" />
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>

    </view>
</template>

<script lang="ts" setup>
import CustomBtn from './components/button/index.vue'
import { useDiscount } from './index'

const { list, scrollToLower, didClickItem, needPayAgain, lastDay } = useDiscount()

</script>

<style lang="scss" scoped>
.gift{
    position: relative;
    width: 100%;
    height: 100vh;
    &-bg{
        width: 100%;
        height: 100%;
    }
    &-scroll{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        &-content{
            position: relative;
            width: 100%;
            height: 100%;
            &-top{
                position: relative;
                width: 100%;
                height: 337rpx;
                &-icon{
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 409rpx;
                    height: 322rpx;
                }
                &-title{
                    position: absolute;
                    top: 80rpx;
                    left: 64rpx;
                    width: 295rpx;
                    height: 150rpx;
                }
            }

            &-list{
                width: 100%;
                display: flex;

                box-sizing: border-box;
                flex-direction: column;
                &-item{
                    position: relative;
                    padding: 0 20rpx;
                    margin: 0 20rpx 20rpx 20rpx;
                    display: flex;
                    box-sizing: border-box;
                    flex-direction: column;
                    background: #FFFFFF;
                    box-shadow: 0rpx 2rpx 2rpx 0rpx #7198DF;
                    border-radius: 30rpx;
                    &-btn{
                        position: absolute;
                        top: 30rpx;
                        right: 24rpx;
                    }
                    &-top{
                        padding: 30rpx 0 16rpx 0;
                        display: flex;
                        flex-direction: row;
                        border-bottom: 1px solid #BFBFBF;
                        &-logo{
                            width:96rpx;
                            height: 96rpx;
                        }
                        &-info{
                            display: flex;
                            flex-direction: column;
                            margin-left: 24rpx;
                        }
                        &-title{

                            font-weight: 400;
                            font-size: 34rpx;
                            color: #000000;
                        }
                        &-subTitle{
                            margin-top: 16rpx;
                            font-weight: normal;
                            font-size: 28rpx;
                            color: #6E6E6E;
                        }
                    }
                    &-bottom{
                        padding: 30rpx 0;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-evenly;
                        &-item{
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            &-img{
                                width: 60rpx;
                                height: 60rpx;
                            }
                            &-info{
                                margin-left: 16rpx;
                                display: flex;
                                flex-direction: column;
                                &-title{
                                    font-weight: normal;
                                    font-size: 24rpx;
                                    color: #000000;
                                }
                                &-subTitle{
                                    font-weight: normal;
                                    font-size: 18rpx;
                                    color: #6E6E6E;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
