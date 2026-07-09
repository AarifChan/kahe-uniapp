<template>
    <view class="absolute top-120 left-0 w-full h-1/2 z-1 pointer-events-none" v-if="list && list.length">
        <view
            v-for="(item, index) in list"
            :key="index"
            class="ma1 absolute top-61 left-0 w-464 h-56 flex items-center rounded-40 pointer-events-all"
            :class="item.action ? 'animate-move1' : ''"
            :style="{
                animationDuration: animationTime + 's',
                background: backGround,
                border: border + 'rpx solid #D09D15',
                top: item.top || '61rpx',
                transform: 'translateX(170%)'
            }"
            @tap.stop="emits('tapLampAction', item)"
        >
            <view class="flex items-center w-full h-full">
                <img class="w-50 h-50 object-cover rounded-full box-border ml-5" :src="item.avatar" alt="" />
                <view class="ml-10 w-60 text-24 text-black text-flow-ellipsis-single">{{
                    item.userName
                }}</view>
                <view class="flex-1 px-0 py-0 text-flow-ellipsis-multiple text-12 text-black leading-13 break-words">{{ item.content }}</view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
const emits = defineEmits(["tapLampAction"]);
defineProps({
    backGround: {
        type: String,
        default: "",
    },
    border: {
        type: Number,
        default: 4,
    },
    list: {
        type: Array,
        default: () => [],
    },
});

const play = (list, num) => {
    if (list.length) {
        actionMa(list, num);
    }
};
let timer = null;
const animationTime = 8;
const topList = ["30rpx", "135rpx", "240rpx", "340rpx"];
const actionMa = (list, num) => {
    let second = 5;
    let actionMa1Index = 0;
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        const index = actionMa1Index % list.length;
        if (!list[index].action) {
            list[index].action = true;
            list[index].top = topList[actionMa1Index % num];
            setTimeout(
                () => {
                    list[index].action = false;
                },
                animationTime * 1000 - 100
            );
            setTimeout(
                () => {
                    actionMa1Index++;
                    if (actionMa1Index === num * list.length) {
                        actionMa1Index = 0;
                    }
                },
                (second * 1000) / num
            );
        }
    }, 1000);
};
defineExpose({
    play,
});
onUnmounted(() => {
    clearInterval(timer);
});
</script>

<style lang="scss" scoped></style>
