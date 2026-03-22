<template>
    <view class="category-detail container">
        <image class="category-detail-bg" src="https://jms.85gui7.com/kahe-202510/images/mall-bg.png" />
        <!--        <text class="category-detail-title theme-font">{{ model.name ?? '' }}</text>-->
        <!--        <view class="custom-h-padding">-->

        <!--        </view>-->
        <tab @did-change="sortDidChange" />
        <scroll-view
            class="category-detail-content"
            :scroll-y="true"
            :enable-flex="true"
            @scrolltolower="scrollToLower"
        >
            <view
                class="category-detail-content-padding"
                style="margin-top: 8px"
            >
                <view
                    class="category-detail-content-padding-item"
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
.category-detail {
    position: relative;
    width: 100%;
    height: 100vh;
    &-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
    &-content {
        position: relative;
        width: 100%;
        height: calc(100vh - env(safe-area-inset-bottom) - 100rpx);
        &-padding {
            width: calc(100% - 60rpx);
            padding: 0 30rpx;
            display: grid;
            grid-template-columns: repeat(
                auto-fill,
                minmax(40%, 1fr)
            ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
            grid-gap: 10px; // 这是网格间的间隙，根据需要调整

            &-item {
                display: inline-block;
            }
        }
    }
}
</style>
