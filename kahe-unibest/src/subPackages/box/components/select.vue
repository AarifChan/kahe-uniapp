<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="boxSelect">
      <image class="boxSelect-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/common/select-bg.png" />
      <view class="boxSelect-wrapper">
        <view class="boxSelect-wrapper-content">
          <view class="boxSelect-wrapper-content-title other-font"
            >输入数量</view
          >
          <view class="boxSelect-wrapper-content-center">
            <view class="boxSelect-wrapper-content-center-input">
              <tn-input
                v-model="input"
                type="digit"
                clearable
                :maxlength="11"
                :placeholder="'最大' + item.num"
                :border="false"
                height="80"
                label-class="boxSelect-wrapper-content-center-input"
              />
            </view>
            <text class="boxSelect-wrapper-content-center-title other-font"
              >个</text
            >
          </view>
          <view class="boxSelect-wrapper-content-bottom">
            <view
              class="btnCancel other-font"
              @tap.stop="emits('update:show', false)"
            >
              取消
            </view>
            <view class="btnConfirm other-font" @tap.stop="didTapConfirm">
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
  item: {
    default: {} as UserGoodsModel,
    type: Object as PropType<UserGoodsModel>,
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

const emits = defineEmits(["update:show", "update:item"]);

const onChange = (e: { detail: string }) => {
  input.value = Number(e.detail) ?? 0;
};

const didTapConfirm = () => {
  const num = Number(input.value) ?? 0;
  if (num > props.item.num) {
    ShowToast("数量输入有误");
    return;
  }
  const item = props.item;
  item.selectNum = Number(input.value);
  emits("update:item", item);
  emits("update:show", false);
};
watch(
  () => props.item.num,
  () => {
    input.value = props.item.num;
  }
);

watch(
  () => props.show,
  (val) => {
    if (val === false) {
      input.value = props.item.num;
    }
  }
);
</script>

<style lang="scss" scoped>
.boxSelect {
  position: relative;
  overflow: hidden;
  width: 680rpx;
  height: 388rpx;
  &-bg {
    width: 100%;
    height: 100%;
  }
  &-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    &-content {
      position: relative;
      display: flex;
      flex-direction: column;
      &-title {
        margin: 69rpx 0 0;
        width: 100%;
        text-align: center;
        font-weight: 400;
        font-size: 32rpx;
        color: #ffffff;
        line-height: 36rpx;
        @include text-stroke(3rpx, #9e6c2c);
      }
      &-center {
        margin-top: 42rpx;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &-input {
          width: 408rpx;
          height: 56rpx;
          background: #e3dfd6;
          border: 1px solid #9e6450;
          border-radius: 4rpx;
          display: flex;
          flex-direction: row;
          align-items: center;

          --cell-background-color: transparent;
          --field-input-text-color: #9e6450;
          &-title {
            font-size: 36rpx;
            font-weight: 400;
            color: #9e6450;
          }
        }
        &-title {
          margin-left: 16rpx;
          font-size: 48rpx;
          font-weight: 400;
          color: #9e6450;
        }
      }

      &-bottom {
        margin-top: 48rpx;
        padding: 0 80rpx;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
.btnCancel {
  width: 217rpx;
  height: 65rpx;
  background: #6be6aa;
  box-shadow:
    3rpx 3rpx 0rpx 0rpx #a9ffd6,
    -2rpx -4rpx 0rpx 0rpx #5dd098;
  border-radius: 33rpx;
  border: 3rpx solid #2c9e67;
  text-align: center;
  line-height: 65rpx;
  font-weight: 400;
  font-size: 32rpx;
  color: #ffffff;
  @include text-stroke-color(#2c9e67);
}
.btnConfirm {
  width: 217rpx;
  height: 65rpx;
  background: #ffdd80;
  box-shadow:
    3rpx 3rpx 0rpx 0rpx #fffea9,
    -2rpx -4rpx 0rpx 0rpx #d0a95d;
  border-radius: 33rpx;
  border: 3rpx solid #9e6c2c;
  text-align: center;
  line-height: 65rpx;
  font-weight: 400;
  font-size: 32rpx;
  color: #ffffff;
  @include text-stroke-color(#9e6c2c);
}
</style>
