<template>
    <view class="relative w-142 h-60">
        <image class="w-full h-full" src="/static/kahe-202510/pet/btn-bg.png" />
        <text class="absolute left-0 top-0 w-full leading-60 font-normal text-32 text-[#FFFFFF] text-center theme-font" @tap.stop="dropDown=!dropDown">{{currentTitle}}</text>
        <!--        <view class="customSelector-sort" @tap.stop="sorted=!sorted">-->
        <!--            <image class="customSelector-sort-up" :src="sorted ? '/static/kahe-202510/pet/up-active.png': '/static/kahe-202510/pet/up.png' "  />-->
        <!--            <image class="customSelector-sort-down" :src="sorted ? '/static/kahe-202510/pet/down.png': '/static/kahe-202510/pet/down-active.png' "  />-->
        <!--        </view>-->
        <view class="absolute top-full left-0 w-full bg-[#3A3A3A] rounded-10 text-center font-normal text-24 text-white z-1000 overflow-hidden shadow-[2rpx_3rpx_3rpx_0rpx_#448483,0rpx_-1rpx_1rpx_0rpx_rgba(0,0,0,0.45),0rpx_1rpx_1rpx_0rpx_rgba(179,197,219,0.45)]"
               v-if="dropDown">
            <view v-for="(option, idx) in options" :key="option.value"
                  class="py-[5px] px-[4px] cursor-pointer hover:bg-[#f0f0f0] hover:text-[#3A3A3A] theme-font"
                  :style="idx === options.length - 1 ? {} : { borderBottom: '1px solid #202020', boxShadow: '0rpx 1rpx 0rpx 0rpx rgba(255,255,255,0.14)' }"
                  @click="clickOption(option)">
                <text>{{ option.label }}</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue'

interface OptionsModel{
    value: number|null
    label: string
}
const emits = defineEmits(['didChange'])
const props = defineProps({
    options: {
        default: [
            {
                label: '所 有', value: null
            },
            {
                label: '幼 年', value: 1
            },
            {
                label: '成 年', value: 2
            },
            {
                label: '进 化', value: 3
            },
            {
                label: '超进化', value: 4
            }
        ] as OptionsModel[],
        type: Array as PropType<OptionsModel[]>
    }
})
const currentVal = ref<null|number>(null)
const currentTitle = computed(() => {
    if (props.options.length === 0) {
        return '所 有'
    }
    return props.options.filter(n => n.value === currentVal.value)[0]?.label ?? '所 有'
})
const clickOption = (op: OptionsModel) => {
    currentVal.value = op.value
    dropDown.value = false
    emits('didChange', {
        level: op.value
    })
}

const dropDown = ref(false)
const sorted = ref(false)
</script>

<style lang="scss" scoped>
</style>
