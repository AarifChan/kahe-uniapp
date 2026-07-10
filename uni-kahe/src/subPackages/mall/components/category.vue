<template>
    <view class="mallC relative h-162 py-20 px-30 box-border">
        <scroll-view
            class="mallC-category mt-8 relative h-full flex whitespace-nowrap"
            :enable-flex="true"
            :scroll-x="true"
            scroll-with-animation
        >
            <view
                class="mallC-category-item inline-block"
                v-for="(item, index) in mallCategory"
                :key="'id' + index"
                @tap.stop="handleClickCategory(item)"
            >
                <view class="mallC-category-item__item relative flex flex-col items-center mr-32">
                    <image class="mallC-category-item-icon w-92 h-92" :src="item.image" />
                    <text class="mallC-category-item-title text-22 font-normal text-black">{{ item.name }}</text>
                </view>

            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useMall } from '@/composables/mall'

const { mallCategory, getMallCategoryData, handleClickCategory } = useMall()

onMounted(async () => {
    await getMallCategoryData()
})
</script>

<style lang="scss" scoped>
</style>
