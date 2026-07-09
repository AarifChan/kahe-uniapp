<template>
    <tn-popup
        v-model="vShow"
        open-direction="center"
        bg-color="transparent"
        @close="emits('update:show', false)"
    >
        <view class="relative w-675 h-547 overflow-hidden">
            <image class="absolute left-0 top-0 w-full h-full" src="/static/kahe-202510/images/vip-bg.png" />
            <view class="absolute left-0 top-0 w-full h-full rounded-10 overflow-hidden">
                <view class="w-full h-73">
                    <text class="ml-36 text-26 font-normal text-black"
                        >尊贵的vip{{ vip }}，今日奖励给您奉上！</text
                    >
                </view>
                <scroll-view
                    class="relative whitespace-nowrap mt-[15px] h-248 ml-[15px] w-[calc(100%-30px)]"
                    :enable-flex="true"
                    :scroll-x="true"
                    scroll-with-animation
                >
                    <item
                        v-for="(item, index) in list"
                        :key="index"
                        :id="index"
                        :item="item"
                    />
                </scroll-view>
                <view class="absolute left-0 bottom-18 w-full flex flex-row items-center justify-center">
                    <custom-button
                        title="收下奖励"
                        :theme-font="true"
                        @tap.stop="emits('update:show', false)"
                    />
                </view>
            </view>
        </view>
    </tn-popup>
</template>

<script lang="ts" setup>
import Item from './components/item.vue'
import CustomButton from '@/components/custom/button/index.vue'
import type { UIDayVIPItem } from '@/model'
import { type PropType, watch, ref } from 'vue'

const props = defineProps({
    show: {
        default: false,
        type: Boolean
    },
    vip: {
        default: 0,
        type: Number
    },
    list: {
        default: [] as UIDayVIPItem[],
        type: Array as PropType<UIDayVIPItem[]>
    }
})
const vShow = ref(false)

watch(() => props.show, value => {
    vShow.value = value
})

const emits = defineEmits(['update:show'])
</script>

<style lang="scss" scoped></style>
