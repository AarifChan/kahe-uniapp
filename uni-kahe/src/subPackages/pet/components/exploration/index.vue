<template>
    <view class="explore">
        <view class="explore-top" @tap.stop="emits('didClickAction',1)">
            <image class="explore-top-bg" :src="item !== null ? 'https://jms.85gui7.com/kahe-202510/pet/explore-bg2.png' : 'https://jms.85gui7.com/kahe-202510/pet/explore-bg1.png'" />
            <image class="explore-top-content" :src="item?.icon" />
        </view>
        <view class="explore-bottom" v-if="item!==null">
            <text class="explore-bottom-time">{{item?.name}}正在探险</text>
            <text class="explore-bottom-time">{{dispatchTimeTitle}}</text>
            <image class="explore-bottom-cancel" src="https://jms.85gui7.com/kahe-202510/pet/explore-btn2.png" @tap.stop="emits('didClickAction',2)" />
        </view>
        <view class="explore-bottom" v-else>
            <text class="explore-time">请选择需要派遣的宠物</text>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { onUnmounted, PropType, ref, watch } from 'vue'
import { PetModel } from '@/composables/pet/model'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)
const props = defineProps({
    item: {
        default: null,
        type: Object as PropType<PetModel | null>
    }
})

const emits = defineEmits(['didClickAction'])

const dispatchTimeTitle = ref('')

const timer = ref<undefined | number>(null)

watch(() => props.item, (value) => {
    console.log('dispatchTimeTitle:', value)
    if (!value || !value.dispatchTime) {
        return
    }
    const dispatchTime = value.dispatchTime
    startCountTime(dispatchTime)
})

onUnmounted(() => {
    clearInterval(timer.value)
})
const startCountTime = (endTime: string) => {
    timer.value = setInterval(() => {
        handleTimer(endTime)
    }, 1000)
    handleTimer(endTime)
}

const handleTimer = (endTime: string) => {
    const duration = dayjs.duration(dayjs(endTime).valueOf() - dayjs().valueOf())
    const h = duration.hours()
    const m = duration.minutes()
    const s = duration.seconds()

    if (s < 0 || m < 0 || h < 0) {
        dispatchTimeTitle.value = '探险结束'
        return
    } else {
        dispatchTimeTitle.value = `${h}小时${m}分钟${s}秒后回归`
    }

    if (s + m + s === 0) {
        clearInterval(timer.value)
    }
}

</script>

<style lang="scss" scoped>
.explore{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-top{
        position: relative;
        width: 328rpx;
        height: 328rpx;
        &-bg{
            width: 100%;
            height: 100%;
        }
        &-content{
            position: absolute;
            top: 16rpx;
            left: 16rpx;
            width: calc(100% - 16rpx);
            height: calc(100% - 32rpx);
        }
    }
    &-bottom{
        margin-top: 15rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &-time{
            font-weight: 400;
            font-size: 32rpx;
            color: #000000;
            line-height: 39rpx;
        }
        &-cancel{
            margin-bottom: 16rpx;
            width: 328rpx;
            height: 78rpx;
        }
    }
}
</style>
