<template>
    <view class="category-detail container relative w-full h-screen">
        <image class="category-detail-bg absolute w-full h-full left-0 top-0" src="/static/kahe-202510/images/mall-bg.png" />
        <tab @did-change="sortDidChange" />
        <scroll-view
            class="category-detail-content relative w-full"
            :scroll-y="true"
            :enable-flex="true"
            @scrolltolower="scrollToLower"
            style="height: calc(100vh - env(safe-area-inset-bottom) - 100rpx);"
        >
            <view
                class="category-detail-content-padding w-full grid"
                style="padding: 0 30rpx; grid-template-columns: repeat(auto-fill, minmax(40%, 1fr)); gap: 10px; margin-top: 8px;"
            >
                <view
                    class="category-detail-content-padding-item inline-block"
                    v-for="(item, index) in mallList"
                    :key="index"
                    @tap.stop="mallListAction(item)"
                >
                    <goods :item="item" />
                </view>
                <empty :show="mallList.length===0" />
            </view>
        </scroll-view>
        <Exchange
            v-model:show="mallShow"
            :goods="payItem"
            @did-tap-smash="didPurchaseMallItem"
        />
    </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getPageOptions } from '@/utils/tools'
import type { UIProductCategoryModel } from '@/model'
import Tab from '@/pages/mall/components/tab/index.vue'
import Goods from '@/components/goods/index.vue'
import Exchange from '@/components/modal/exchange/index.vue'
import Empty from '@/components/empty/index.vue'
import { useMall } from '@/composables/mall'

const {
    mallShow,
    payItem,
    mallList,
    listParams,
    getMallList,
    handleMallScrollToLower,
    mallListAction,
    didPurchaseMallItem
} = useMall()

const model = ref({
    id: 0,
    image: '',
    name: ''
} as UIProductCategoryModel)

const sortDidChange = (val: { sort: number; sType: string }) => {
    listParams.value.sort = val.sort
    listParams.value.stype = val.sType
    getMallList()
}

const scrollToLower = () => {
    handleMallScrollToLower()
}

onMounted(() => {
    const op = getPageOptions()
    if (op.model) {
        model.value = JSON.parse(op.model)
        listParams.value.cid = model.value.id
        uni.setNavigationBarTitle({
            title: model.value.name
        })
        getMallList()
    }
})
</script>

<style lang="scss" scoped>
</style>
