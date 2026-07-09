<template>
    <view>
        <search @did-tap-search="didClickSearch" />
        <tab
            v-model:current="current"
            :list="goodsTabList"
            :search="true"
            @did-click="didClickTab"
        />
        <view class="mx-30" style="width: calc(100% - 60rpx); display: grid; grid-template-columns: repeat(auto-fill, minmax(40%, 1fr)); gap: 10px;">
            <view
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

<style lang="scss" scoped></style>
