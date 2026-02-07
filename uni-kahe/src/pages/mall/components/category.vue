<template>
    <view class="mallC">
        <scroll-view
            class="mallC-category"
            :enable-flex="true"
            :scroll-x="true"
            scroll-with-animation
        >
            <view
                class="mallC-category-item"
                v-for="(item, index) in mallCategory"
                :key="'id' + index"
                @tap.stop="handleClickCategory(item)"
            >
                <image class="mallC-category-item-icon" :src="item.image" />
                <text class="mallC-category-item-title">{{ item.name }}</text>
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useMall } from '@/composables/mall'

const { mallCategory, getMallCategoryData, handleClickCategory } = useMall()

onMounted(async () => {
    await getMallCategoryData()
})
</script>

<style lang="scss" scoped>
.mallC {
    position: relative;
    height: 122rpx;
    padding: 20rpx 30rpx;
    width: calc(100% - 30rpx);
    &-category {
        margin-top: 8rpx;
        display: flex;
        white-space: nowrap;
        position: relative;
        height: 100%;
        &-item {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 32rpx;
            &-icon {
                width: 92rpx;
                height: 92rpx;
            }
            &-title {
                font-size: 22rpx;
                font-weight: 400;
                color: #000000;
            }
        }
    }
}
</style>
