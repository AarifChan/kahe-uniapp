<template>
  <view class="submit px-34 relative w-full flex justify-between box-border items-center">
    <input
      v-model="textValue"
      placeholder="请输入券码参与活动"
      class="input-placeholder flex-1 h-63 bg-white rounded-6 mr-32"
      :style="{ border: '1px solid #000000' }"
    />
    <view class="submit-btn relative w-187 h-63 flex justify-center items-center" @tap.stop="tapSubmit">
      <image src="/static/kahe-202510/shine/yellow.png" mode="scaleToFill" class="btn_bg absolute inset-0 w-full h-full z-0" />
      <text class="relative theme-font text-36 font-normal text-black leading-48">提交</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { ShingingInfo } from "@/subPackages/xingyao/api";
defineProps({
  info: {
    default: {},
    type: Object as PropType<ShingingInfo>,
  },
});
const emit = defineEmits<{
  (e: "tapSubmit", value: string): void;
}>();
const textValue = ref("");
const tapSubmit = () => {
  emit("tapSubmit", textValue.value);
};
</script>

<style lang="scss" scoped>
</style>
