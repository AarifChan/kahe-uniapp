<template>
    <view class="lamp" v-if="list && list.length">
        <view v-for="(item, index) in list" :key="index" class="ma1" :class="item.action ? `anmt1 ${item.class}` : ''"
            :style="[
                'animation-duration:' + animationTime + 's',
                'background:' + backGround,
                'border:' + border + 'rpx solid #D09D15',
            ]" @tap.stop="emits('tapLampAction', item)">
            <view class="right">
                <img class="avatar" :src="item.avatar" alt="" />
                <view class="userName text-flow-ellipsis-single">{{
                    item.userName
                }}</view>
                <view class="info text-flow-ellipsis-single">{{ item.content }}</view>
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
const actionMa = (list, num) => {
    let second = 5;
    let actionMa1Index = 0;
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        const index = actionMa1Index % list.length;
        if (!list[index].action) {
            list[index].action = true;
            list[index].class = "action_" + ((actionMa1Index % num) + 1);
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

<style lang="scss" scoped>
.lamp {
    position: absolute;
    top: 120rpx;
    left: 0;
    width: 100%;
    height: 50%;
    z-index: 1;
    pointer-events: none;
}

.ma1 {
    position: absolute;
    top: 61rpx;
    left: 0;
    transform: translateX(170%);
    width: 464rpx;
    height: 56rpx;
    display: flex;
    align-items: center;
    background: linear-gradient(180deg, #FFCE49, #FDF4D8);
    border-radius: 40rpx;
    pointer-events: all;

    .right {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;

        .avatar {
            width: 50rpx;
            height: 50rpx;
            object-fit: cover;
            border-radius: 50%;
            box-sizing: border-box;
            margin-left: 5rpx;
        }

        .userName {
            margin-left: 10rpx;
            width: 60rpx;
            font-size: 24rpx;
            color: #000;
        }

        .info {
            flex: 1;
            padding: 0 20rpx;
            font-size: 12px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: #000;
            line-height: 13px;
            word-wrap: break-word;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            /* 这里是超出几行省略 */
        }
    }
}

.ma1 {
    &.action_1 {
        top: 30rpx;
    }

    &.action_2 {
        top: 135rpx;
    }

    &.action_3 {
        top: 240rpx;
    }

    &.action_4 {
        top: 340rpx;
    }
}

.anmt1 {
    animation: move1 linear;
    -webkit-animation: move1 linear;
}

@keyframes move1 {
    from {
        transform: translateX(170%);
    }

    to {
        transform: translateX(-170%);
    }
}

@-webkit-keyframes move1 {
    from {
        transform: translateX(170%);
    }

    to {
        transform: translateX(-170%);
    }
}
</style>
