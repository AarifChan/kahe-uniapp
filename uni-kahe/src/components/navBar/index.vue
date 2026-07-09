<template>
  <view
    class="fixed left-0 top-0 w-full flex flex-col z-99"
    :style="{
      height: `${totalNavHeight}PX`,
      opacity: opacity,
      position: `${position}`,
      paddingTop: `${statusBarHeight}PX`,
      backgroundColor: `rgba(255, 248, 233, ${opacity})`,
    }"
  >
    <view
      class="relative w-full flex flex-row items-center justify-center"
      :style="{ lineHeight: `${navBarHeight}PX` }"
    >
      <view class="text-30 text-black">{{ title }}</view>
    </view>
  </view>
  <view
    v-if="topSafe"
    :style="{ height: `${statusBarHeight}px`, width: `100%` }"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { AppModule } from "@/store/modules/app";

defineProps({
  topSafe: {
    default: false,
    type: Boolean,
  },
  title: {
    default: "",
    type: String,
  },
  custom: {
    default: false,
    type: Boolean,
  },
  opacity: {
    default: 0,
    type: Number,
  },
  position: {
    default: "fixed",
    type: String,
  },
});
const totalNavHeight = computed(() => {
  return AppModule.statusBarHeight + AppModule.navBarHeight;
});
const statusBarHeight = computed(() => {
  return AppModule.statusBarHeight;
});
const navBarHeight = computed(() => {
  return AppModule.navBarHeight;
});
</script>

<style lang="scss" scoped></style>
