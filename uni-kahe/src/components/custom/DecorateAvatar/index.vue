<template>
  <view
    class="relative flex flex-row items-center justify-center w-154 h-157"
    :style="scale ? `transform: scale(${scale});margin-left: 10rpx;` : ''"
  >
    <image class="w-full h-full" src="/static/kaju/mine/avatar-bg.png" />
    <image
      class="absolute left-18 top-16 w-120 h-120 rounded-full"
      :src="avatar"
    />
  </view>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  avatar: {
    default: "",
    type: String,
  },
  level: {
    default: 0,
    type: Number,
  },
  scale: {
    type: Number,
    default: 1,
  },
});

const levelImage = computed(() => {
  const level = props.level;

  if (!level) {
    return "";
  }
  return `/static/kahe-202510/vip/${level}.png`;
});
</script>

<style lang="scss" scoped></style>
