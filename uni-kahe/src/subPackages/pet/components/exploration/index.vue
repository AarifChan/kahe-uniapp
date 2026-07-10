<template>
    <view class="explore relative w-full h-full flex flex-col items-center justify-center">
        <view class="explore-top relative w-328 h-328" @tap.stop="emits('didClickAction',1)">
            <image class="explore-top-bg w-full h-full" :src="item !== null ? '/static/kahe-202510/pet/explore-bg2.png' : '/static/kahe-202510/pet/explore-bg1.png'" />
            <image class="explore-top-content absolute top-16 left-16" style="width: calc(100% - 16rpx); height: calc(100% - 32rpx);" :src="item?.icon" />
        </view>
        <view class="explore-bottom mt-15 flex flex-col items-center justify-center" v-if="item!==null">
            <text class="explore-bottom-time text-32 font-normal text-black leading-39">{{item?.name}}正在探险</text>
            <text class="explore-bottom-time text-32 font-normal text-black leading-39">{{dispatchTimeTitle}}</text>
            <image class="explore-bottom-cancel mb-16 w-328 h-78" src="/static/kahe-202510/pet/explore-btn2.png" @tap.stop="emits('didClickAction',2)" />
        </view>
        <view class="explore-bottom mt-15 flex flex-col items-center justify-center" v-else>
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
</style>
