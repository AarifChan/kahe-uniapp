<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="boxSelect">
      <image class="boxSelect-img" src="https://jms.85gui7.com/kahe-202510/images/selectBg.png" />
      <view class="boxSelect-wrapper">
        <view class="boxSelect-wrapper-content">
          <text class="boxSelect-wrapper-content-title">{{ title }}</text>
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
            <text class="boxSelect-wrapper-content-center-title theme-font"
              >个</text
            >
          </view>
          <view class="boxSelect-wrapper-content-bottom">
            <custom-button
              title="取消"
              @tap.stop="emits('update:show', false)"
            />
            <custom-button title="确定" @tap.stop="didTapConfirm" />
          </view>
        </view>
      </view>
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import CustomButton from "@/components/custom/button/index.vue";
import type { UIMineChestModel } from "@/model";
import { ShowToast } from "@/utils";
import type { PropType } from "vue";
import { ref, watch } from "vue";
import TnInput from "@tuniao/tnui-vue3-uniapp/components/input/src/input.vue";
const props = defineProps({
  title: {
    type: String,
    default: "选中该数量",
  },
  show: {
    default: false,
    type: Boolean,
  },
  item: {
    default: {} as UIMineChestModel,
    type: Object as PropType<UIMineChestModel>,
  },
  select: {
    type: Number,
    default: 0,
  },
  stype: {
    type: Number,
    default: 0,
  },
  tips: {
    type: String,
  },
});

const vShow = ref(false);

watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);

const input = ref(1);

const emits = defineEmits([
  "update:show",
  "update:item",
  "update:num",
  "didTapConfirm",
]);

const onChange = (e: { detail: string }) => {
  input.value = Number(e.detail) ?? 0;
};

const didTapConfirm = () => {
  const num = Number(input.value) ?? 0;
  if (num > props.item.num) {
    ShowToast("数量输入有误");
    return;
  }
  if (num === 0) {
    ShowToast("请选择");
    return;
  }
  const item = props.item;
  item.selectNum = Number(input.value);
  emits("update:item", item);
  emits("update:show", false);
  if (props.tips) {
    emits("didTapConfirm", item.selectNum);
  }
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
  width: 716rpx;
  height: 386rpx;
  position: relative;
  &-img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
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
        margin: 14rpx 0 0 30rpx;
        font-size: 26rpx;
        font-weight: 400;
        color: #ffffff;
      }
      &-center {
        margin-top: 96rpx;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &-input {
          width: 538rpx;
          height: 56rpx;
          background: #fff;
          border: 2px solid #96c5fe;
          border-radius: 4rpx;
          display: flex;
          flex-direction: row;
          align-items: center;
          --cell-background-color: transparent;
          --field-input-text-color: #96c5fe;
          &-title {
            font-size: 36rpx;
            font-weight: 400;
            color: #000;
          }
        }
        &-title {
          margin-left: 16rpx;
          font-size: 48rpx;
          font-weight: 400;
          color: #96c5fe;
        }
      }

      &-bottom {
        padding: 50rpx;
        width: calc(100% - 100rpx);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
