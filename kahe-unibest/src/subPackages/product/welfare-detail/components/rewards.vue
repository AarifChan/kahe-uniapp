<template>
    <view class="people">
        <view class="people-title theme-font">当期<text>{{ detail.status===2 ? value : '未开奖' }}</text><text style="color: #ff2a2a" v-if="detail.status===2">{{ list.length }}</text>{{detail.status===2 ? "人":""}}</view>
        <view class="people-line" />
        <scroll-view :enable-flex="true" :scroll-y="true" class="people-reward" v-if="detail.status===2">
            <view class="people-reward-goods" v-for="(item,index) in list" :key="index">
                <view class="people-reward-goods-top" style="margin-bottom: 10rpx;">
                    <view style="display: flex; align-items: center;">
                        <image :src="item.user?.avatar" style="width: 68rpx;height: 68rpx;border-radius: 50%;" />
                        <view class="people-reward-goods-top-nickName">{{ item.user?.nickname }}</view>
                    </view>
                    <!--                    <view class="people-reward-goods-top-time">{{item.time}}</view>-->
                </view>
                <view class="people-reward-goods-line"></view>
                <view class="people-reward-goods-bottom" v-for="(goods, zIndex) in item.goods" :key="index+'goods'+zIndex">
                    <image :src="goods.goodsDto?.image" style="width: 44rpx;height: 63rpx;" />
                    <view class="people-reward-goods-top-time">{{goods.goodsDto.name}}x{{goods.num}}</view>
                </view>
            </view>
        </scroll-view>
        <view class="people-time" v-else>{{ time }}后抽取<text style="color: #ff2a2a;">{{ total }}</text>人</view>
    </view>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { UIWelareRewardListItem } from '@/model'
import type { WelfareDetailInfo } from '@/model/welfare'

const props = defineProps({
    value: {
        type: String,
        default: '参与'
    },
    list: {
        type: Array as () => UIWelareRewardListItem[],
        default: [] as UIWelareRewardListItem[]
    },
    detail: {
        type: Object as () =>WelfareDetailInfo,
        default: {
        } as WelfareDetailInfo
    },
    time: {
        type: String,
        default: ''
    }
})
const total = computed(() => {
    let num = 0
    props.detail.goods?.forEach((item) => {
        num += item.num
    })
    return num
})
</script>
<style lang="scss" scoped>
.people {
    position: relative;
    margin-top: 40rpx;
    width: 688rpx;

    background: #ffffff;
    border-radius: 20rpx;
    opacity: 0.97;
    min-height: 150rpx;
    padding: 45rpx 28rpx 30rpx 28rpx;
        box-sizing: border-box;
        &-time {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            font-size: 28rpx;
            color: gray;
        }
    &-title {
        position: absolute;
        left: 32rpx;
        top: 10rpx;
        font-weight: 400;
        font-size: 30rpx;
        color: #000000;
        z-index: 1;
    }
    &-line {
        width: 178rpx;
        position: absolute;
        left: 32rpx;
        top: 35rpx;
        height: 10rpx;
        background-color: #5ea2fd;
        z-index: 0;
    }
    &-reward {
        //height: 100%;
        min-height: 298rpx;
        box-sizing: border-box;
        border-radius: 20rpx;
        display: flex;
        flex-direction: column;
        align-items: center;

        &-goods {
            margin-top: 20rpx;
            width: 100%;
            padding: 18rpx 30rpx;
            border-radius: 20rpx;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            border: 2rpx solid #BCD9FF;
            &-top,&-bottom {
                display: flex;
                align-items: center;
                justify-content: space-between;
                &-nickName {
                    font-size: 18rpx;
                    color: #000000;
                    margin-left: 17rpx;
                }
                &-time {
                    font-size: 18rpx;
                    color: #000000;
                }
            }
            &-line {
                width: 608rpx;
                height: 2rpx;
                background: #BCD9FF;
            }
            &-bottom {
                margin-top: 10rpx;
            }
        }
    }
    &-user {
        position: relative;
        display: flex;
        height: 100%;
        width: 100%;
        padding: 68rpx 20rpx 0 20rpx;
        box-sizing: border-box;
        white-space: nowrap;
        &-item {
            display: inline-block;
            margin-right: 16rpx;
            &-img {
                width: 93rpx;
                height: 93rpx;
                border-radius: 50%;
            }
            &-title {
                width: 93rpx;
                text-align: center;
                font-weight: normal;
                font-size: 18rpx;
                color: #000000;
            }
        }
    }
}
</style>
