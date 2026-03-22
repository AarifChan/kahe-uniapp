<template>
  <view class="submit">
    <input
      v-model="textValue"
      placeholder="请输入券码参与活动"
      class="input-placeholder"
    />
    <view class="submit-btn" @tap.stop="tapSubmit">
      <image src="https://jms.85gui7.com/kahe-202510/shine/yellow.png" mode="scaleToFill" class="btn_bg" />
      <text>提交</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { ShingingInfo } from "@/subPackages/xingyao/api";
defineProps({
  info: {
    default: {},
    type: Object as PropType<ShingingInfo>,
  },
});
const emit = defineEmits<{
  (e: "tapSubmit", value: string): void;
}>();
const textValue = ref("");
const tapSubmit = () => {
  emit("tapSubmit", textValue.value);
};
</script>

<style lang="scss" scoped>
.submit {
  padding: 0 34rpx;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  .input-placeholder {
    flex: 1;
    height: 63rpx;
    background: #ffffff;
    border-radius: 6rpx;
    border: 1px solid #000000;
    margin-right: 32rpx;
  }

  &-btn {
    position: relative;
    width: 187rpx;
    height: 63rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn_bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    text {
      position: relative;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 36rpx;
      color: #000000;
      line-height: 48rpx;
    }
  }
}
</style>
