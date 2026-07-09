<template>
    <view class="relative h-122 p-20 px-30" style="width: calc(100% - 30rpx);"
    >
        <scroll-view
            class="mt-8 flex whitespace-nowrap relative h-full"
            :enable-flex="true"
            :scroll-x="true"
            scroll-with-animation
        >
            <view
                class="relative flex flex-col items-center mr-32"
                v-for="(item, index) in mallCategory"
                :key="'id' + index"
                @tap.stop="handleClickCategory(item)"
            >
                <image class="w-92 h-92" :src="item.image" />
                <text class="text-22 font-normal text-black">{{ item.name }}</text>
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

<style lang="scss" scoped></style>
