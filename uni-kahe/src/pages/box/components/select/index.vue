<template>
  <view class="custom-select">
    <view v-if="isSelect" class="custom-select-value" />
  </view>
</template>

<script lang="ts" setup>
defineProps({
  isSelect: {
    default: false,
    type: Boolean,
  },
  color: {
    default: "white",
    type: String,
  },
  size: {
    default: "58rpx",
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border: 2rpx solid #511818;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &-value {
    margin: auto;
    width: 22rpx;
    height: 22rpx;
    background: #612821;
    border-radius: 50%;
  }
}
</style>
