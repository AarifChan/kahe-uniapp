<template>
    <view class="home-buttons relative px-8 flex flex-row" style="width: calc(100% - 16rpx)">
        <view class="home-buttons-left w-265 h-222" @tap.stop="handleItem(HomeItemType.invite)">
            <image class="home-buttons-left-img w-full h-full" src="/static/kahe-202510/home/card1.png" /> <!-- 缺失图片: card1.png -->
        </view>
        <view class="home-buttons-center -ml-28 w-292 h-222" @tap.stop="handleItem(HomeItemType.mall)">
            <image class="home-buttons-left-img w-full h-full" src="/static/kahe-202510/home/card2.png" /> <!-- 缺失图片: card2.png -->
        </view>
        <view class="home-buttons-right -ml-28 w-258 h-222" @tap.stop="handleItem(HomeItemType.welfare)">
            <image class="home-buttons-right-img w-full h-full" src="/static/kahe-202510/home/card3.png" /> <!-- 缺失图片: card3.png -->
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

<style lang="scss" scoped></style>
