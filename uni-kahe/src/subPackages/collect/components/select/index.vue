<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="boxSelect relative overflow-hidden w-680 h-388">
      <image class="boxSelect-bg w-full h-full" src="/static/kahe-202510/ka-he/common/select-bg.png" />
      <view class="boxSelect-wrapper absolute left-0 top-0 w-full h-full">
        <view class="boxSelect-wrapper-content relative flex flex-col">
          <view
            class="boxSelect-wrapper-content-title mt-69 mx-0 mb-0 w-full text-center font-normal text-32 text-white leading-36 text-shadow-[-3rpx_-3rpx_0_#9e6c2c,3rpx_-3rpx_0_#9e6c2c,-3rpx_3rpx_0_#9e6c2c,3rpx_3rpx_0_#9e6c2c] other-font"
            >输入数量</view
          >
          <view class="boxSelect-wrapper-content-center mt-42 w-full flex flex-row items-center justify-center">
            <view
              class="boxSelect-wrapper-content-center-input w-408 h-56 bg-[#e3dfd6] border-1 border-[#9e6450] rounded-4 flex flex-row items-center"
              :style="{
                '--cell-background-color': 'transparent',
                '--field-input-text-color': '#9e6450',
              }"
            >
              <tn-input
                v-model="input"
                type="digit"
                clearable
                :maxlength="11"
                :placeholder="'最大' + max"
                :border="false"
                height="80"
                label-class="boxSelect-wrapper-content-center-input w-408 h-56 bg-[#e3dfd6] border-1 border-[#9e6450] rounded-4 flex flex-row items-center"
              />
            </view>
            <text class="boxSelect-wrapper-content-center-title ml-16 font-normal text-48 text-[#9e6450] other-font"
              >个</text
            >
          </view>
          <view class="boxSelect-wrapper-content-bottom mt-48 px-80 box-border w-full flex flex-row items-center justify-between">
            <view
              class="btnCancel w-217 h-65 bg-[#6be6aa] shadow-[3rpx_3rpx_0rpx_0rpx_#a9ffd6,-2rpx_-4rpx_0rpx_0rpx_#5dd098] rounded-33 border-3 border-[#2c9e67] text-center leading-65 font-normal text-32 text-white text-shadow-[-1px_-1px_0_#2c9e67,1px_-1px_0_#2c9e67,-1px_1px_0_#2c9e67,1px_1px_0_#2c9e67] other-font"
              @tap.stop="emits('update:show', false)"
            >
              取消
            </view>
            <view
              class="btnConfirm w-217 h-65 bg-[#ffdd80] shadow-[3rpx_3rpx_0rpx_0rpx_#fffea9,-2rpx_-4rpx_0rpx_0rpx_#d0a95d] rounded-33 border-3 border-[#9e6c2c] text-center leading-65 font-normal text-32 text-white text-shadow-[-1px_-1px_0_#9e6c2c,1px_-1px_0_#9e6c2c,-1px_1px_0_#9e6c2c,1px_1px_0_#9e6c2c] other-font"
              @tap.stop="didTapConfirm"
            >
              确定
            </view>
          </view>
        </view>
      </view>
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import type { UserGoodsModel } from "@/model";
import type { PropType } from "vue";
import { ref, watch } from "vue";
import { ShowToast } from "@/utils";
import TnInput from "@tuniao/tnui-vue3-uniapp/components/input/src/input.vue";

const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  num: {
    default: 0,
    type: Number,
  },
  max: {
    default: 1,
    type: Number,
  },
});

const vShow = ref(false);

watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);

const input = ref(0);

const emits = defineEmits(["update:show", "update:num", "didTapConfirm"]);

const didTapConfirm = () => {
  const num = Number(input.value) ?? 0;
  if (num > props.num) {
    ShowToast("数量输入有误");
    return;
  }
  emits("update:num", num);

  emits("update:show", false);
  emits("didTapConfirm", num);
};

watch(
  () => props.show,
  (val) => {
    input.value = props.num;
  }
);
</script>

<style lang="scss" scoped>
</style>
