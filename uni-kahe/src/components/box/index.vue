<template>
    <view class="relative w-full flex flex-col">
        <view class="relative w-full aspect-ratio-[14/20]">
            <image
                src="/static/jos/common/demon-king.png"
                class="absolute -right-20 top-6 w-66 h-62 z-2"
                v-if="item.isLucky"
            />
            <view class="relative w-full aspect-ratio-[14/20]">
                <image
                    v-if="item.level === 118"
                    class="absolute -left-48 -top-66 h-200 rounded-12 w-[calc(100%+96rpx)]"
                    src="/static/cyd/lottery/card-lottery1.png"
                    mode="widthFix"
                />
                <image
                    class="absolute left-0 top-0 w-full aspect-ratio-[14/20] rounded-12 z-0"
                    src="/static/jos/common/hide-show.png"
                    v-if="item.isHide"
                />
                <image
                    class="absolute left-0 top-0 w-full aspect-ratio-[14/20] rounded-12 z-0"
                    :src="item.image"
                />
                <image
                    class="absolute left-0 top-0 w-full aspect-ratio-[14/20] z-1"
                    :src="item.levelBg"
                    v-if="!info"
                />
                <image
                    v-if="!isCard"
                    class="absolute -left-1/5 bottom-0 w-3/5 z-2"
                    :src="getLevelImageByLevel(item.level)"
                    mode="widthFix"
                />
                <image
                    v-if="item.hasRedBag"
                    class="absolute -top-16 -right-20 w-73 h-49 z-10"
                    src="/static/kahe-202510/redEnvelope/reward.png"
                />
                <text class="absolute right-0 -top-19.5 w-39 h-39 rounded-full text-center text-24 leading-39 text-[#255eb3] z-3 bg-gradient-[linear-gradient(180deg,#fcd6ff,#c1e1ff)]" v-if="nums"
                    >x{{ item.total }}</text
                >
                <text class="absolute right-0 bottom-0 w-90 text-center text-20 text-white z-3" v-if="info"
                    >{{ item.last }}/{{ item.total }}</text
                >
                <image
                    v-if="item.isDemon"
                    class="absolute -top-36 -right-16 w-107 h-72"
                    src="/static/kahe-202510/common/king.png"
                />
            </view>
        </view>
        <view class="mt-8 flex flex-col" v-if="info">
            <view class="w-full text-26 text-[#c3dbff] text-flow-ellipsis-single">{{
                item.title
            }}</view>
            <view class="text-26 text-[#c3dbff]"
                >水晶: <text style="color: red">{{ item.price }}</text></view
            >
        </view>
        <view class="mt-8 flex flex-col" v-else>
            <view class="w-full text-26 text-[#c3dbff] text-flow-ellipsis-single">{{
                item.title
            }}</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { UIProductBoxModel } from '@/model'
import type { PropType } from 'vue'
import { formatCardLevel, levelColor } from '@/utils/tools/image'
import { useEnum } from '@/composables/enum'
const { getLevelImageByLevel } = useEnum()
defineProps({
    item: {
        default: {
        } as UIProductBoxModel,
        type: Object as PropType<UIProductBoxModel>
    },
    info: {
        default: true,
        type: Boolean
    },
    level: {
        default: true,
        type: Boolean
    },
    nums: {
        default: true,
        type: Boolean
    },
    isCard: {
        default: false,
        type: Boolean
    }
})
</script>

<style lang="scss" scoped></style>
