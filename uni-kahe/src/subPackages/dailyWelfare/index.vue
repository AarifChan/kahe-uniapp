<template>
    <view class="daily">
        <image class="daily-bg" src="https://jms.85gui7.com/kahe-202510/home-upgrade/daily-bg.png" />
        <view class="daily-content">
            <view class="daily-content-top">
                <image
                    class="daily-content-top-img"
                    src="https://jms.85gui7.com/kahe-202510/home-upgrade/top.png"
                />
            </view>
            <!--            <tab v-model:is-all="isAll" @did-update-tab="tabDidChange" />-->
            <scroll-view
                class="daily-content-list"
                :enable-flex="true"
                :scroll-y="true"
                scroll-with-animation
                @scrolltolower="handleScrollToLower"
            >
                <view class="daily-content-list-grid">
                    <item
                        v-for="(item, index) in dataList"
                        :key="index"
                        :item="item"
                        :id="'id' + index"
                        @did-click-item="handleClickItem(item)"
                    />
                </view>
            </scroll-view>
        </view>
        <modal v-model:show="modalShow" @did-click-use="handleClickUse" />
    </view>
</template>

<script lang="ts" setup>
import Item from './components/item/index.vue'
import Modal from './components/modal/index.vue'
import Tab from './components/tab/index.vue'

import { onMounted, watch } from 'vue'
import { getPageOptions } from '@/utils/tools'

import { useDailyCoupon } from './index'

const {
    modalShow,
    isAll,
    merchantId,
    getData,
    tabDidChange,
    handleClickItem,
    dataList,
    handleScrollToLower
} = useDailyCoupon()
const handleClickUse = () => {
    uni.navigateBack()
}
watch(
    () => isAll,
    value => {
        console.log('isAll:', value)
    }
)

onMounted(() => {
    const ops = getPageOptions()
    if (Number(ops.merchantId) > 0) {
        isAll.value = false
    }
    console.log('merchantId:', ops.merchantId)
    merchantId.value = ops.merchantId
    getData()
})
</script>

<style lang="scss" scoped>
.daily {
    position: relative;
    width: 100%;
    height: 100vh;
    &-bg {
        width: 100%;
        height: 100%;
    }
    &-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        &-top {
            position: relative;
            width: 100%;
            height: 480rpx;
            &-img {
                position: absolute;
                left: 120rpx;
                top: 60rpx;
                width: 589rpx;
                height: 263rpx;
            }
        }

        &-list {
            position: relative;
            width: 100%;
            padding: 30rpx 0 env(safe-area-inset-bottom);
            height: calc(100% - 480rpx - 60rpx);
            box-sizing: border-box;
            &-grid {
                box-sizing: border-box;
                width: 100%;
                padding: 0 30rpx;
                display: grid;
                grid-template-columns: repeat(
                    auto-fill,
                    minmax(calc((100% - 10px - 60rpx) / 2), 1fr)
                ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
                grid-gap: 10px; // 这是网格间的间隙，根据需要调整
            }
        }
    }
}
</style>
