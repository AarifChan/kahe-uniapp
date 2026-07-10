<template>
  <TnFormItem
    class="addressInput relative w-full py-12 px-24 rounded-4 mb-18"
    label-position="left"
    label-width="140"
    :label="title"
    :value="value"
    :placeholder-style="placeholderStyle"
    :placeholder="placeholder"
    :border="false"
  >
    <view class="addressInput-item relative w-full h-70 flex flex-row items-center">
      <TnInput
        v-if="type === 'input'"
        v-model="inputValue"
        :placeholder="placeholder"
        :border="false"
      />
      <view v-else-if="type === 'switch'" class="addressInput-item-switch w-full flex flex-row items-center justify-end">
        <TnSwitch
          active-color="#95C3F7"
          inactive-color="#C0C0C0"
          v-model="inputValue"
        />
      </view>

      <slot name="default" />
    </view>
  </TnFormItem>
</template>

<script lang="ts" setup>
import TnInput from "@tuniao/tnui-vue3-uniapp/components/input/src/input.vue";
import TnSwitch from "@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue";

import TnFormItem from "@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue";
import { ref, watch } from "vue";
const props = defineProps({
  title: {
    default: "",
    type: String,
  },
  value: {
    default: "",
    type: [String, Number],
  },
  placeholder: {
    default: "",
    type: String,
  },
  type: {
    default: "input",
    type: String,
  },
});

const inputValue = ref(props.value);

const emits = defineEmits(["update:value", "didClickSelect", "fetchWxAddress"]);

const placeholderStyle = "font-weight:400;font-size:30rpx;color:#888888;";

watch(
  () => inputValue.value,
  (value) => {
    emits("update:value", value);
  }
);

watch(
  () => props.value,
  (value) => {
    inputValue.value = value;
  }
);

const onChange = (e: { detail: boolean | string }) => {
  emits("update:value", e.detail);
};
</script>

<style lang="scss" scoped>
</style>
