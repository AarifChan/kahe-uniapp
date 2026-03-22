<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    @close="emits('update:show', false)"
  >
    <view class="common">
      <image
        src="https://jms.85gui7.com/kahe-202510/ka-he/common/common-title.png"
        class="common-commonBg"
      />
      <view class="common-content">
        <view class="common-content-top">
          <view class="common-content-top-title theme-font text-stroke-main">{{
            title}}</view>
        </view>
        <scroll-view
          class="common-content-text"
          :scroll-y="true"
          :enable-flex="true"
          scroll-with-animation
        >
          <rich-text :nodes="content"></rich-text>
        </scroll-view>
        <view
          class="common-content-bottom"
          @tap.stop="emits('update:show', false)"
        >
          <custom-button title="确定" />
        </view>
      </view>
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import CustomButton from "@/components/custom/button/index.vue";
import { ref, watch } from "vue";

const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  title: {
    default: "",
    type: String,
  },
  content: {
    default: "",
    type: String,
  },
});

const vShow = ref(props.show);

watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);

const emits = defineEmits(["update:show"]);
</script>

<style lang="scss" scoped>
.common {
  position: relative;
  background-color: transparent;
  width: 626rpx;
  height: 756rpx;
  z-index: 9999;
  &-commonBg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // background-color: white;
    border-radius: 10rpx;
    overflow: hidden;
    &-top {
      width: 100%;
      // background: linear-gradient(-90deg, #f4feff, #9bc6fa);
      height: 73rpx;
      &-title {
        font-size: 40rpx;
        line-height: 73rpx;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
      }
    }

    &-text {
      padding: 8px 50rpx;
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: calc(100% - 200rpx);
      color: #000000;
      font-size: 13px;
      line-height: 25px;
    }
    &-bottom {
      position: absolute;
      bottom: 48rpx;
      left: 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
