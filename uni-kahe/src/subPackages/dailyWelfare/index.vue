<template>
    <view class="daily relative w-full h-screen">
        <image class="daily-bg w-full h-full" src="/static/kahe-202510/home-upgrade/daily-bg.png" />
        <view class="daily-content absolute left-0 top-0 w-full h-full flex flex-col">
            <view class="daily-content-top relative w-full h-480">
                <image
                    class="daily-content-top-img absolute left-120 top-60 w-589 h-263"
                    src="/static/kahe-202510/home-upgrade/top.png"
                />
            </view>
            <!--            <tab v-model:is-all="isAll" @did-update-tab="tabDidChange" />-->
            <scroll-view
                class="daily-content-list relative w-full box-border pt-30 px-0 pb-[env(safe-area-inset-bottom)]"
                style="height: calc(100% - 480rpx - 60rpx)"
                :enable-flex="true"
                :scroll-y="true"
                scroll-with-animation
                @scrolltolower="handleScrollToLower"
            >
                <view class="daily-content-list-grid box-border w-full px-30 grid gap-10" style="grid-template-columns: repeat(auto-fill, minmax(calc((100% - 10px - 60rpx) / 2), 1fr))">
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

<style lang="scss" scoped></style>
