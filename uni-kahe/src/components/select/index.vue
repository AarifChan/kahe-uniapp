<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="boxSelect relative w-716 h-386">
      <image class="boxSelect-img w-full h-full absolute left-0 top-0" src="/static/kahe-202510/images/selectBg.png" />
      <view class="boxSelect-wrapper absolute left-0 top-0 w-full h-full">
        <view class="boxSelect-wrapper-content relative flex flex-col">
          <text class="mt-14 ml-30 text-26 font-normal text-white">{{ title }}</text>
          <view class="mt-96 w-full flex flex-row items-center justify-center">
            <view class="boxSelect-wrapper-content-center-input w-538 h-56 bg-white border-2px border-[#96c5fe] rounded-4 flex flex-row items-center" style="--cell-background-color: transparent; --field-input-text-color: #96c5fe">
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
            <text class="ml-16 text-48 font-normal text-[#96c5fe] theme-font"
              >个</text
            >
          </view>
          <view class="p-50 w-[calc(100%-100rpx)] flex flex-row items-center justify-between">
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

<style lang="scss" scoped></style>
