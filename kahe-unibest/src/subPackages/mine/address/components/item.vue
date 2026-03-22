<template>
  <TnFormItem
    class="addressInput"
    label-position="left"
    label-width="140"
    :label="title"
    :value="value"
    placeholder-style="placeholderStyle"
    :placeholder="placeholder"
    :border="false"
  >
    <view class="addressInput-item">
      <TnInput
        v-if="type === 'input'"
        v-model="inputValue"
        :placeholder="placeholder"
        :border="false"
      />
      <view v-else-if="type === 'switch'" class="addressInput-item-switch">
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
.addressInput {
  position: relative;
  width: 100%;
  padding: 12rpx 24rpx;
  border-radius: 4rpx;
  margin-bottom: 18rpx;

  &-item {
    position: relative;
    width: 100%;
    height: 70rpx;
    display: flex;
    flex-direction: row;
    align-items: center;

    &-switch {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
.placeholderStyle {
  font-weight: 400;
  font-size: 30rpx;
  color: #888888;
}
</style>
