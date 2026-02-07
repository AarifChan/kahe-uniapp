<template>
    <view class="customSelector">
        <image class="customSelector-bg" src="https://jms.85gui7.com/kahe-202510/pet/btn-bg.png" />
        <text class="customSelector-title theme-font" @tap.stop="dropDown=!dropDown">{{currentTitle}}</text>
        <!--        <view class="customSelector-sort" @tap.stop="sorted=!sorted">-->
        <!--            <image class="customSelector-sort-up" :src="sorted ? 'https://jms.85gui7.com/kahe-202510/pet/up-active.png': 'https://jms.85gui7.com/kahe-202510/pet/up.png' "  />-->
        <!--            <image class="customSelector-sort-down" :src="sorted ? 'https://jms.85gui7.com/kahe-202510/pet/down.png': 'https://jms.85gui7.com/kahe-202510/pet/down-active.png' "  />-->
        <!--        </view>-->
        <view class="customSelector-dropdown" v-if="dropDown">
            <view v-for="option in options" :key="option.value" class="customSelector-dropdown-item theme-font" @click="clickOption(option)">
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
.customSelector{
    position: relative;
    width: 142rpx;
    height: 60rpx;
    &-bg{
        width: 100%;
        height: 100%;
    }
    &-title{
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        line-height: 60rpx;
        font-weight: 400;
        font-size: 32rpx;
        color: #FFFFFF;
        text-align: center;
    }
    &-sort{
        position: absolute;
        top: 15rpx;
        right: 24rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-up{
            width: 23rpx;
            height: 13rpx;
        }
        &-down{
            margin-top: 4rpx;
            width: 23rpx;
            height: 13rpx;
        }
    }
    &-dropdown{
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #3A3A3A;
        box-shadow: 2rpx 3rpx 3rpx 0rpx #448483, 0rpx -1rpx 1rpx 0rpx rgba(0,0,0,0.45), 0rpx 1rpx 1rpx 0rpx rgba(179,197,219,0.45);
        border-radius: 10rpx;
        text-align: center;
        font-weight: 400;
        font-size: 24rpx;
        color: white;
        z-index: 1000;
        overflow: hidden;
        &-item{
            padding: 5px 4px;
            cursor: pointer;
            border-bottom: 1px solid  #202020;
            box-shadow: 0rpx 1rpx 0rpx 0rpx rgba(255,255,255,0.14);
        }
        &-item:last-child{
            border-bottom: none;
            box-shadow: none;
        }
        &-item:hover{
            background-color: #f0f0f0;
            color:  #3A3A3A;
        }
    }
}
</style>
