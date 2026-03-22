<template>
  <view class="barrageIndex">
    <view
      class="barrage anmt"
      v-for="(item, index) in list"
      :key="index"
      @tap.stop="emits('tapLampAction', item)"
    >
      <view class="right">
        <img class="avatar" :src="item.avatar" alt="" />
        <view
          v-if="item.userName.length > 0"
          class="userName text-flow-ellipsis-single"
          >{{ item.userName }}</view
        >
        <view class="info text-flow-ellipsis-single">{{ item.content }}</view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import type { UIBarrageModel } from "@/model";
import type { PropType } from "vue";
const emits = defineEmits(["tapLampAction"]);
defineProps({
  list: {
    type: Array as PropType<UIBarrageModel[]>,
    default: () => [],
  },
});
</script>
<style lang="scss" scoped>
.barrageIndex {
  position: absolute;
  bottom: -10rpx;
  left: 50%;
  width: 230rpx;
  height: 42rpx;
  transform: translateX(-50%);
  .barrage {
    position: relative;
    width: 230rpx;
    height: 42rpx;
    display: flex;
    align-items: center;
    border: 2rpx solid #bdde67;
    background-color: #cff7ba;
    border-radius: 12rpx;
    margin-bottom: 10rpx;
    .right {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      .avatar {
        width: 38rpx;
        height: 38rpx;
        object-fit: cover;
        border-radius: 50%;
        box-sizing: border-box;
        margin-left: 5rpx;
      }
      .userName {
        margin-left: 10rpx;
        width: 60rpx;
        font-size: 18rpx;
        color: #87b66e;
      }
      .info {
        flex: 1;
        font-size: 18rpx;
        color: #87b66e;
      }
    }
  }
  .anmt {
    animation: move 20s linear infinite;
  }
  @keyframes move {
    0% {
      transform: translateY(0rpx);
    }
    100% {
      transform: translateY(-820rpx * 2);
    }
  }
}
</style>
