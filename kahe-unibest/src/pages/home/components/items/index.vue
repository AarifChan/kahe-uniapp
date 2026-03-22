<template>
    <view class="home-buttons">
        <view class="home-buttons-left" @tap.stop="handleItem(HomeItemType.invite)">
            <image class="home-buttons-left-img" src="https://jms.85gui7.com/kahe-202510/home/card1.png" />
        </view>
        <view class="home-buttons-center" @tap.stop="handleItem(HomeItemType.mall)">
            <image class="home-buttons-left-img" src="https://jms.85gui7.com/kahe-202510/home/card2.png" />
        </view>
        <view class="home-buttons-right" @tap.stop="handleItem(HomeItemType.welfare)">
            <image class="home-buttons-right-img" src="https://jms.85gui7.com/kahe-202510/home/card3.png" />
        </view>
    </view>
</template>

<script lang="ts" setup>

import { AppModule } from '@/store/modules/app'

enum HomeItemType {
     invite = 0,
     welfare = 1,
     mall = 2
}
const handleItem = (index: HomeItemType) => {
    let url = ''
    switch (index) {
    case HomeItemType.invite:
        url = '/subPackages/mine/invite/index'
        break
    case HomeItemType.welfare:
        url = '/subPackages/welfare/index'
        break
    case HomeItemType.mall:
        url = '/subPackages/mall/index'
        break
    default:
        break
    }
    uni.navigateTo({
        url: url
    })
}
</script>

<style lang="scss" scoped>
.home-buttons {
    position: relative;
    padding: 0 8rpx;
    display: flex;
    flex-direction: row;
    width: calc(100% - 16rpx);
    &-left{
        width: 265rpx;
        height: 222rpx;
        &-img{
            width: 100%;
            height: 100%;
        }
    }
    &-center{
        margin-left: -28rpx;
        width: 292rpx;
        height: 222rpx;
        &-img{
            width: 100%;
            height: 100%;
        }
    }
    &-right{
        margin-left: -28rpx;
        width: 258rpx;
        height: 222rpx;
        &-img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
