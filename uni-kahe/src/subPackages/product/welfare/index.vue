<template>
    <view class="welfare">
        <view class="welfare-header">
            <view class="welfare-header-title theme-font text-stroke-main">福利大派送进行中</view>
            <view class="welfare-header-right">
                <image
                    class="welfare-header-right-img"
                    src="https://jms.85gui7.com/kahe-202510/images/welfare-topBg.png"
                />
                <view class="welfare-header-right-text theme-font">免费抽选</view>
            </view>
            <view class="welfare-header-item">
                <view
                    class="welfare-header-item-goods"
                    @tap.stop="tapWelfareAction(item)"
                    v-for="(item, index) in welfareList"
                    :key="index"
                >
                    <image
                        class="welfare-header-item-goods-bg"
                        src="https://jms.85gui7.com/kahe-202510/images/welfare-goodsTopBg.png"
                        mode="widthFix"
                    />
                    <image
                        class="welfare-header-item-goods-img"
                        :src="item.image"
                        mode="widthFix"
                    />
                    <view class="welfare-header-item-goods-content">
                        <view class="welfare-header-item-goods-content-title text-flow-ellipsis-single">{{
                            item.title
                        }}</view>
                        <view class="welfare-header-item-goods-content-time text-flow-ellipsis-single">
                            <Countdown :end-time="item.endTime" />
                        </view>
                    </view>
                </view>
                <empty style="margin-top: 40rpx" :show="welfareList.length===0" />
            </view>
        </view>
        <scroll-view class="welfare-center" :scroll-y="true"  @scrolltolower="handleScrollToLower">
            <view class="welfare-center-title theme-font">已送出抽选</view>
            <view class="welfare-center-item">
                <view
                    class="welfare-center-item-list"
                    v-for="(item, index) in smokeList"
                    :key="index"
                    @tap.stop="tapWelfareAction(item)"
                >
                    <image
                        class="welfare-center-item-list-bg"
                        src="https://jms.85gui7.com/kahe-202510/images/welfare-listBg.png"
                    />
                    <image
                        :src="item.image"
                        class="welfare-center-item-list-img"
                        mode="widthFix"
                    />
                    <view class="welfare-center-item-list-text theme-font text-flow-ellipsis-single">{{
                        item.title
                    }}</view>
                </view>
                <empty :show="smokeList.length===0" />
            </view>
        </scroll-view>
    </view>
</template>
<script setup lang="ts">
import { useWelfare } from '@/composables/welfare'
import { onMounted } from 'vue'
import Countdown from '@/components/countdown/index.vue'
import Empty from '@/components/empty/index.vue'

const { getWelfareList, welfareList, smokeList, tapWelfareAction, handleScrollToLower } =
    useWelfare()

onMounted(() => {
    getWelfareList()
})
</script>
<style lang="scss" scoped>
.welfare {
    width: 100%;
    height: calc(100vh);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #bcd9ff;
    &-header {
        margin-top: 32rpx;
        position: relative;
        width: 688rpx;
        height: 362rpx;
        background-color: #ffffff;
        opacity: 0.97;
        border-radius: 20rpx;
        &-title {
            position: absolute;
            left: 38rpx;
            top: -26rpx;
            font-weight: 400;
            font-size: 40rpx;
            color: #ffffff;
        }
        &-right {
            position: absolute;
            width: 141rpx;
            height: 39rpx;
            line-height: 39rpx;
            text-align: center;
            top: 0;
            right: 0;
            &-img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            &-text {
                transform: translateX(12rpx);
                position: relative;
                font-weight: 400;
                font-size: 24rpx;
                color: #000000;
            }
        }
        &-item {
            width: calc(100% - 60rpx);
            padding: 0 30rpx;
            height: 362rpx;
            position: relative;
            display: flex;
            overflow-x: auto;
            &-goods {
                flex-shrink: 0;
                margin-top: 60rpx;
                position: relative;
                width: 203rpx;
                height: 272rpx;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                margin-right: 30rpx;
                &-bg {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                }
                &-img {
                    margin-top: 15rpx;
                    position: relative;
                    width: 177rpx;
                    height: calc(177rpx / 320 * 400);
                    border-radius: 10rpx;
                }
                &-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    margin-bottom: 20rpx;

                &-title {
                    text-align: center;
                    width: 150rpx;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 32rpx;
                    font-size: 20rpx;
                    color: #000000;
                    z-index: 1;
                }
                &-time {
                    position: absolute;
                    bottom: 4rpx;
                    text-align: center;
                    width: 180rpx;
                    font-size: 18rpx;
                    color: #8d8d8d;
                    left: 50%;
                    transform: translateX(-50%);
                }
                }

            }
            &-goods:nth-last-child(1) {
                margin-right: 0;
            }
        }
    }
    &-center {
        margin-top: 30rpx;
        width: 688rpx;
        height: calc(100% - 424rpx - env(safe-area-inset-bottom));
        background: #ffffff;
        border-radius: 20rpx;
        opacity: 0.97;
        overflow-y: auto;
        &-title {
            margin-top: 26rpx;
            margin-left: 44rpx;
            position: relative;
            font-weight: 400;
            font-size: 34rpx;
            color: #010101;
        }
        &-item {
            margin-top: 32rpx;
            width: 100%;
            padding: 0 40rpx;
            display: grid;
            grid-template-columns: repeat(
                auto-fill,
                minmax(40%, 1fr)
            ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
            grid-gap: 16rpx;
            box-sizing: border-box;
            &-list {
                position: relative;
                width: 293rpx;
                height: 280rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 40rpx;
                &-bg {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    left: 0;
                    top: 0;
                    z-index: 0;
                }
                &-img {
                    position: absolute;
                    width: 177rpx;
                    height: calc(177rpx / 320 * 400);
                    border-radius: 10rpx;
                    object-fit: cover;
                    z-index: 1;
                }
                &-text {
                    position: absolute;
                    font-size: 20rpx;
                    color: #000000;
                    left: 12rpx;
                    bottom: 5rpx;
                    z-index: 1;
                }
            }
        }
    }
}
</style>
