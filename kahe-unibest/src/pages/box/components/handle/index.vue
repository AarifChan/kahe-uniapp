<template>
  <view class="box-handle">
    <image class="box-handle-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/common/box-bg.png" />
    <view class="box-handle-content">
      <view class="box-handle-content-all" @tap.stop="emits('didTapItem', 0)">
        <view class="box-handle-content-all-select">
          <view
            v-if="isSelectAll"
            class="box-handle-content-all-select-value"
          />
        </view>
        <view class="box-handle-content-all-title">全选</view>
      </view>
      <view
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 16px;
        "
      >
        <!--        <custom-button title="退货" @tap.stop="emits('didTapItem', 1)" />-->
        <custom-button title="提货" @tap.stop="emits('didTapItem', 2)" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import CustomButton from "../button/index.vue";
import SelectItem from "../select/index.vue";
// didTapItem 0: 全选，1：外仓发货 2：发货
defineProps({
  isSelectAll: {
    default: false,
    type: Boolean,
  },
});
const emits = defineEmits(["didTapItem"]);
</script>

<style lang="scss" scoped>
.box-handle {
  position: fixed;
  bottom: calc(132rpx + env(safe-area-inset-bottom));
  left: 0;
  width: 750rpx;
  display: flex;
  flex-direction: column;
  gap: 0;

  &-bg {
    width: 750rpx;
    height: 164rpx;
  }

  &-content {
    position: absolute;
    left: 0;
    bottom: calc(32rpx);
    width: 100%;
    padding: 0 32rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &-all {
      display: flex;
      flex-direction: column;
      align-items: center;

      &-select {
        width: 34rpx;
        height: 32rpx;
        border: 2px solid #511818;
        border-radius: 50%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &-value {
          width: 22rpx;
          height: 22rpx;
          background: #612821;
          border-radius: 50%;
        }
      }

      &-title {
        font-weight: normal;
        font-size: 20rpx;
        color: #54310f;
      }
    }
  }

  &-select {
    margin-right: 16rpx;
    position: relative;
    width: 40rpx;
    height: 40rpx;

    &-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  &-item {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;

    &-bg {
      width: 207rpx;
      height: 86rpx;
    }

    &-content {
      position: absolute;
      width: calc(100% - 80rpx);
      height: 100%;
      @include flex-xy-center(row);
      justify-content: space-between;

      &-ship {
        width: 77rpx;
        height: 45rpx;
      }

      &-select {
        width: 47rpx;
        height: 46rpx;
      }

      &-smash {
        width: 53rpx;
        height: 54rpx;
      }

      &-title {
        width: 88rpx;
        line-height: 38rpx;
        font-size: 44rpx;
        font-weight: 400;
        color: #000000;
      }
    }
  }
}
</style>
