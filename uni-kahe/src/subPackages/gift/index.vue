<template>
    <view class="gift relative w-full h-screen">
        <image class="gift-bg w-full h-full" src="/static/kahe-202510/product/product-bg.png" />
        <scroll-view class="gift-scroll absolute left-0 top-0 w-full h-full" @scrolltolower="scrollToLower">
            <view class="gift-scroll-content relative w-full h-full">
                <view class="gift-scroll-content-top relative w-full h-337">
                    <image class="gift-scroll-content-top-icon absolute bottom-0 right-0 w-409 h-322" src="/static/kahe-202510/discount/item.png" />
                    <image class="gift-scroll-content-top-title absolute top-80 left-64 w-295 h-150" src="/static/kahe-202510/discount/title.png" />
                </view>
                <view class="gift-scroll-content-list w-full flex flex-col box-border">
                    <view class="gift-scroll-content-list-item relative px-20 mx-20 mb-20 flex flex-col box-border bg-white shadow-[0rpx_2rpx_2rpx_0rpx_#7198DF] rounded-30" v-for="(item, index) in list" :key="'i'+index" :id="'id'+index">
                        <view class="gift-scroll-content-list-item-btn absolute top-30 right-24">
                            <CustomBtn :title="needPayAgain(item) ? '续 费' : '购 买' " @tap.stop="didClickItem(item)" />
                        </view>
                        <view class="gift-scroll-content-list-item-top py-30 pb-16 px-0 flex flex-row border-b border-[#BFBFBF]">
                            <image class="gift-scroll-content-list-item-top-logo w-96 h-96" :src="item.logo" />
                            <view class="gift-scroll-content-list-item-top-info flex flex-col ml-24">
                                <view class="gift-scroll-content-list-item-top-title theme-font font-normal text-34 text-black">{{item.name}}</view>
                                <view v-if="lastDay(item.expireTime) > 0" class="gift-scroll-content-list-item-top-subTitle mt-16 font-normal text-28 text-[#6E6E6E]">礼包待领天数：{{lastDay(item.expireTime)}}</view>
                            </view>

                        </view>
                        <view class="gift-scroll-content-list-item-bottom py-30 box-border flex flex-row justify-evenly">
                            <view class="gift-scroll-content-list-item-bottom-item flex flex-row items-center" v-for="(zItem, zIndex) in item.rewards" :key="index + ':' + zIndex" :id="index + ':' + zIndex">
                                <image class="gift-scroll-content-list-item-bottom-item-img w-60 h-60" src="/static/kahe-202510/discount/item2.png" />
                                <view class="gift-scroll-content-list-item-bottom-item-info flex flex-col ml-16">
                                    <view class="gift-scroll-content-list-item-bottom-item-info-title font-normal text-24 text-black">购买必得</view>
                                    <view class="gift-scroll-content-list-item-bottom-item-info-subTitle font-normal text-18 text-[#6E6E6E]">{{zItem.num}}{{zItem.name}}</view>
                                </view>
                            </view>
                            <view class="gift-scroll-content-list-item-bottom-item flex flex-row items-center" v-for="(zItem, zIndex) in item.rewardsDay" :key="index + ':' + zIndex" :id="index + ':' + zIndex">
                                <image class="gift-scroll-content-list-item-bottom-item-img w-60 h-60"  src="/static/kahe-202510/discount/item1.png" />
                                <view class="gift-scroll-content-list-item-bottom-item-info flex flex-col ml-16">
                                    <view class="gift-scroll-content-list-item-bottom-item-info-title font-normal text-24 text-black">每日登录</view>
                                    <view class="gift-scroll-content-list-item-bottom-item-info-subTitle font-normal text-18 text-[#6E6E6E]">{{zItem.num}}{{zItem.name}}</view>
                                </view>
                            </view>
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

<style lang="scss" scoped></style>
