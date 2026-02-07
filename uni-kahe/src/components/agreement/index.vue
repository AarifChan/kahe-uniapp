<template>
  <view class="agreement">
    <view style="display: flex; flex-direction: row; align-items: center">
      <text class="agreement-title">{{ title }}</text>
      <text
        class="agreement-title agreement-subTitle"
        @tap.stop="emits('didTapProtocol')"
        >{{ subTitle }}</text
      >
    </view>

    <image
      class="agreement-img"
      :src="
        checked
          ? 'https://jms.85gui7.com/kahe/common/checked.png'
          : 'https://jms.85gui7.com/kahe/common/unchecked.png'
      "
      @tap.stop="emits('update:checked', !checked)"
    />
  </view>
</template>

<script lang="ts" setup>
defineProps({
  checked: {
    default: true,
    type: Boolean,
  },
  title: {
    default: "已阅读并同意",
    type: String,
  },
  subTitle: {
    default: "《用户使用协议》",
    type: String,
  },
});

const emits = defineEmits(["didTapProtocol", "update:checked"]);
</script>

<style lang="scss" scoped>
.agreement {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-img {
    width: 35rpx;
    height: 30rpx;
  }
  &-title {
    font-size: 22rpx;
    font-weight: 400;
    color: #888888;
  }
  &-subTitle {
    color: #a27e0b;
  }
}
</style>
