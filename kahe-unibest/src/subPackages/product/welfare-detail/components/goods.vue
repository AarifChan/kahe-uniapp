<template>
    <view
        class="goods"
        v-for="(item, index) in list"
        :key="index"
        @tap.stop="emits('tapCardListItem', item)"
    >
        <image class="goods-bg" src="https://jms.85gui7.com/kahe-202510/images/machine-goods-bg.png" />
        <view class="goods-left">
            <image class="goods-left-img" :src="item.logo"></image>
        </view>
        <view class="goods-right">
            <view class="goods-right-num">
                <image
                    src="https://jms.85gui7.com/kahe-202510/images/huo.png"
                    class="goods-right-num-img"
                ></image>
                <view class="goods-right-num-text">10w+</view>
            </view>
            <view class="goods-right-title theme-font">{{ item.title }}</view>
            <view class="goods-right-price" style="color: #ff2a2a">￥{{ item.price }}</view>
            <view class="goods-right-bottom">
                <scroll-view
                    :scroll-x="true"
                    :enable-flex="true"
                    scroll-with-animation
                    class="goods-right-bottom-scroll"
                >
                    <view
                        class="goods-right-bottom-scroll-item"
                        v-for="(goods, index) in item.goods"
                        :key="index"
                    >
                        <image
                            class="goods-right-bottom-scroll-item-img"
                            :src="goods.image"
                        />
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>
<script setup lang="ts">

defineProps({
    list: {
        type: Array as any,
        default: () => []
    }
})
const emits = defineEmits(['tapCardListItem'])
</script>
<style lang="scss" scoped>
.goods {
    position: relative;
    width:100%;
    height: 255rpx;
    margin: 0 auto;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 28rpx;
    &-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
    }
    &-left {
        position: relative;
        width: 173rpx;
        height: calc(173rpx / 300 * 420);
        margin-left: 20rpx;
        &-img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &-right {
        position: absolute;
        right: 10rpx;
        bottom: 28rpx;
        width: 470rpx;
        &-num {
            position: absolute;
            right: -8rpx;
            top: 70rpx;
            text-align: center;
            width: 143rpx;
            line-height: 30rpx;
            height: 30rpx;
            border-radius: 6rpx;
            font-size: 16rpx;
            color: #ffffff;
            display: flex;
            align-items: center;
            &-img {
                width: 22rpx;
                height: 26rpx;
            }
            &-text {
                font-weight: 400;
                font-size: 21rpx;
                color: #4c4c4c;
            }
        }
        &-title {
            position: relative;
            font-size: 30rpx;
            color: #000000;
        }
        &-price {
            margin-top: 20rpx;
            position: relative;
            font-size: 28rpx;
            color: #000000;
        }
        &-text {
            position: relative;
            font-size: 20rpx;
            color: #505050;
            margin-bottom: 5rpx;
        }
        &-bottom {
            margin-top: 20rpx;
            display: flex;
            &-scroll {
                white-space: nowrap;
                width: calc(100% - 35rpx);
                &-item {
                    display: inline-block;
                    position: relative;
                    width: 46rpx;
                    height: calc(46rpx / 300 * 420);
                    margin-right: 18rpx;
                    &-img {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
}
</style>
