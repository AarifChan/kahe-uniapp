<template>
  <view class="relative w-full flex justify-between items-center">
    <view class="flex flex-row items-center">
      <text class="text-22 font-normal text-[#888888]">{{ title }}</text>
      <text
        class="text-22 font-normal text-[#a27e0b]"
        @tap.stop="emits('didTapProtocol')"
        >{{ subTitle }}</text
      >
    </view>

    <image
      class="w-35 h-30"
      :src="
        checked
          ? '/static/kahe/common/checked.png'
          : '/static/kahe/common/unchecked.png'
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

<style lang="scss" scoped></style>
