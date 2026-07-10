<template>
    <view class="people relative mt-40 w-688 h-217 bg-white rounded-20 opacity-97">
        <view class="people-title theme-font absolute left-32 top-10 text-30 font-normal text-black z-1">当期<text>{{ value }}</text><text style="color: #ff2a2a">{{ total}}</text>人</view>
        <view class="people-line absolute left-32 top-35 w-178 h-10 bg-[#5ea2fd] z-0"></view>
        <scroll-view :enable-flex="true" :scroll-x="true" class="people-user relative flex w-full h-full whitespace-nowrap"
            style="padding: 68rpx 20rpx 0 20rpx;"
        >
            <view
                class="people-user-item relative inline-block mr-16"
                v-for="(item, index) in list"
                :key="index"
            >
                <image class="people-user-item-img w-93 h-93 rounded-full" :src="item.user.avatar" />
                <view class="people-user-item-num absolute top-0 -right-4 w-28 h-28 rounded-14 text-white text-20 text-center bg-[#61A4FD]"
                    style="line-height: 28rpx;"
                >{{item.num}}</view>
                <view
                    class="people-user-item-title text-ellipsis w-93 text-center text-18 font-normal text-black"
                >{{ item.user.nickname }}</view>
            </view>
        </scroll-view>
    </view>
</template>
<script setup lang="ts">
import { PropType, ref } from 'vue'
import type { UIWelfareUserList } from '@/model'

defineProps({
    value: {
        type: String,
        default: '参与'
    },
    list: {
        type: Array as PropType<UIWelfareUserList[]>,
        default: () => []
    },
    total: {
        type: Number,
        default: 0
    }
})
</script>
<style lang="scss" scoped>
</style>
