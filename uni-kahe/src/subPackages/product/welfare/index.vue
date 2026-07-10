<template>
    <view class="welfare w-full flex flex-col items-center bg-[#bcd9ff]" style="height: 100vh;">
        <view class="welfare-header relative mt-32 w-688 h-362 bg-white rounded-20 opacity-97">
            <view class="welfare-header-title theme-font absolute left-38 -top-26 text-40 font-normal text-white">福利大派送进行中</view>
            <view class="welfare-header-right absolute top-0 right-0 w-141 h-39 text-center" style="line-height: 39rpx;">
                <image
                    class="welfare-header-right-img absolute left-0 top-0 w-full h-full"
                    src="/static/kahe-202510/images/welfare-topBg.png"
                />
                <view class="welfare-header-right-text theme-font relative text-24 font-normal text-black" style="transform: translateX(12rpx);">免费抽选</view>
            </view>
            <view class="welfare-header-item relative h-362 flex overflow-x-auto" style="width: calc(100% - 60rpx); padding: 0 30rpx;"
            >
                <view
                    class="welfare-header-item-goods flex-shrink-0 mt-60 relative w-203 h-272 flex flex-col items-center justify-between"
                    @tap.stop="tapWelfareAction(item)"
                    v-for="(item, index) in welfareList"
                    :key="index"
                    :class="{ 'mr-30': index !== welfareList.length - 1 }"
                >
                    <image
                        class="welfare-header-item-goods-bg absolute w-full h-full z-0"
                        src="/static/kahe-202510/images/welfare-goodsTopBg.png"
                        mode="widthFix"
                    />
                    <image
                        class="welfare-header-item-goods-img relative mt-15 w-177 rounded-10"
                        :src="item.image"
                        mode="widthFix"
                        style="height: calc(177rpx / 320 * 400);"
                    />
                    <view class="welfare-header-item-goods-content relative mb-20 flex flex-col items-center justify-center"
                    >
                        <view class="welfare-header-item-goods-content-title theme-font absolute bottom-32 w-150 text-center text-20 text-black z-1"
                            style="left: 50%; transform: translateX(-50%);"
                        >{{
                            item.title
                        }}</view>
                        <view class="welfare-header-item-goods-content-time text-ellipsis absolute bottom-4 w-180 text-center text-18 text-[#8d8d8d]"
                            style="left: 50%; transform: translateX(-50%);"
                        >
                            <Countdown :end-time="item.endTime" />
                        </view>
                    </view>
                </view>
                <empty style="margin-top: 40rpx" :show="welfareList.length===0" />
            </view>
        </view>
        <scroll-view class="welfare-center mt-30 w-688 bg-white rounded-20 opacity-97 overflow-y-auto" :scroll-y="true"  @scrolltolower="handleScrollToLower"
            style="height: calc(100% - 424rpx - env(safe-area-inset-bottom));"
        >
            <view class="welfare-center-title theme-font relative mt-26 ml-44 text-34 font-normal text-[#010101]">已送出抽选</view>
            <view class="welfare-center-item mt-32 w-full grid" style="padding: 0 40rpx; grid-template-columns: repeat(auto-fill, minmax(40%, 1fr)); gap: 16rpx;"
            >
                <view
                    class="welfare-center-item-list relative w-293 h-280 flex justify-center items-center mb-40"
                    v-for="(item, index) in smokeList"
                    :key="index"
                    @tap.stop="tapWelfareAction(item)"
                >
                    <image
                        class="welfare-center-item-list-bg absolute w-full h-full object-cover left-0 top-0 z-0"
                        src="/static/kahe-202510/images/welfare-listBg.png"
                    />
                    <image
                        :src="item.image"
                        class="welfare-center-item-list-img absolute w-177 rounded-10 object-cover z-1"
                        mode="widthFix"
                        style="height: calc(177rpx / 320 * 400);"
                    />
                    <view class="welfare-center-item-list-text theme-font text-ellipsis absolute left-12 bottom-5 text-20 text-black z-1">{{
                        item.title
                    }}</view>
                </view>
                <empty :show="smokeList.length===0" />
            </view>
        </scroll-view>
    </view>
</template>
<script setup lang="ts">
import { useWelfare } from '@/composables/welfare'
import { onMounted } from 'vue'
import Countdown from '@/components/countdown/index.vue'
import Empty from '@/components/empty/index.vue'

const { getWelfareList, welfareList, smokeList, tapWelfareAction, handleScrollToLower } =
    useWelfare()

onMounted(() => {
    getWelfareList()
})
</script>
<style lang="scss" scoped>
</style>
