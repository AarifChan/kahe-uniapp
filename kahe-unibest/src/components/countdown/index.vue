<template>
    <view class="time">
        <text style="white-space: nowrap;">{{ remainingTime }}</text>
    </view>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const props = defineProps({
    endTime: {
        type: Number || String,
        default: 0 || ''
    }
})

let interval: any
const remainingTime:any = ref()
const updateRemainingTim = () => {
    const now: any = new Date()
    const timeDifference = Number(props.endTime) - now
    if (timeDifference <= 0) {
        clearInterval(interval)
        remainingTime.value = '已结束'
    } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        )
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
        remainingTime.value = `${days}天${
            hours < 10 ? '0' + hours : hours
        }小时${minutes < 10 ? '0' + minutes : minutes}分钟${
            seconds < 10 ? '0' + seconds : seconds
        }秒`
    }
}

onMounted(() => {
    updateRemainingTim()
    interval = setInterval(updateRemainingTim, 1000)
})
onUnmounted(() => {
    clearInterval(interval)
})
</script>
<style lang="scss" scoped>

</style>
