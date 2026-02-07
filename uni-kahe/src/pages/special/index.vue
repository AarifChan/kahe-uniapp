<template>
    <view class="special">
        <search @did-tap-search="didClickSearch" />
        <tab
            v-model:current="current"
            :list="goodsTabList"
            :search="true"
            @did-click="didClickTab"
        />
        <view class="special-padding">
            <view
                class="special-padding-item"
                v-for="(item, index) in goodsList"
                :key="index"
                @tap.stop="goodsTapClick(item)"
            >
                <goods :item="item" />
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import Search from '@/components/search/index.vue'
import { onMounted, ref } from 'vue'
import Tab from '@/pages/home/components/tab/index.vue'
import Goods from '@/components/goods/index.vue'
import { useGoods } from '@/composables/goods'

const {
    goodsList,
    goodsParams,
    getGoodsList,
    goodsTabList,
    handleScrollToLower,
    didClickTab,
    current,
    goodsTapClick,
    didClickSearch
} = useGoods()
onMounted(() => {
    getGoodsList(goodsTabList.value[current.value].value)
})
</script>

<style lang="scss" scoped>
.special {
    &-category {
        position: relative;
        padding: 20rpx 30rpx;
        width: calc(100% - 30rpx);
    }
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
        }
    }
}
</style>
