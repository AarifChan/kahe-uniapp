<template>
    <view
        class="goods relative w-full h-255 mx-auto flex items-center mb-28"
        v-for="(item, index) in list"
        :key="index"
        @tap.stop="emits('tapCardListItem', item)"
    >
        <image class="goods-bg w-full h-full absolute left-0 top-0 z-0" src="/static/kahe-202510/images/machine-goods-bg.png" />
        <view class="goods-left relative ml-20" style="width: 173rpx; height: calc(173rpx / 300 * 420);">
            <image class="goods-left-img absolute left-0 top-0 w-full h-full object-cover" :src="item.logo"></image>
        </view>
        <view class="goods-right absolute bottom-28 right-10 w-470">
            <view class="goods-right-num absolute top-70 -right-8 w-143 h-30 text-center text-white text-16 flex items-center rounded-6"
                style="line-height: 30rpx;"
            >
                <image
                    src="/static/kahe-202510/images/huo.png"
                    class="goods-right-num-img w-22 h-26"
                />
                <view class="goods-right-num-text text-21 font-normal text-[#4c4c4c]">10w+</view>
            </view>
            <view class="goods-right-title theme-font text-30 text-black">{{ item.title }}</view>
            <view class="goods-right-price relative mt-20 text-28 text-black" style="color: #ff2a2a">￥{{ item.price }}</view>
            <view class="goods-right-bottom mt-20 flex">
                <scroll-view
                    :scroll-x="true"
                    :enable-flex="true"
                    scroll-with-animation
                    class="goods-right-bottom-scroll whitespace-nowrap"
                    style="width: calc(100% - 35rpx);"
                >
                    <view
                        class="goods-right-bottom-scroll-item inline-block relative mr-18"
                        style="width: 46rpx; height: calc(46rpx / 300 * 420);"
                        v-for="(goods, index) in item.goods"
                        :key="index"
                    >
                        <image
                            class="goods-right-bottom-scroll-item-img absolute left-0 top-0 w-full h-full"
                            :src="goods.image"
                        />
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>
<script setup lang="ts">

defineProps({
    list: {
        type: Array as any,
        default: () => []
    }
})
const emits = defineEmits(['tapCardListItem'])
</script>
<style lang="scss" scoped>
</style>
