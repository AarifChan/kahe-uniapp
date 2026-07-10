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
      class="relative w-full flex flex-row items-center justify-start"
      :style="{ lineHeight: `${navBarHeight}PX` }"
    >
      <image class="ml-59 w-115 h-63" src="/static/kaju/common/logo.png" />
      <view
        class="flex flex-row items-center w-345 h-58 bg-white rounded-29 border-2px border-[#ffe4d0] ml-28 pl-20 box-border"
      >
        <image
          class="w-28 h-28 flex-shrink-0"
          src="/static/kaju/common/search.png"
        />
        <input
          class="flex-1 h-full ml-10 text-26 text-[#333]"
          type="text"
          placeholder="搜索"
        />
      </view>
    </view>
  </view>
  <view
    v-if="topSafe"
    :style="{ height: `${statusBarHeight}px`, width: `100%` }"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
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
const emit = defineEmits<{
  (e: "search", value: string): void;
}>();

const searchText = ref("");
const totalNavHeight = computed(() => {
  return AppModule.statusBarHeight + AppModule.navBarHeight;
});
const statusBarHeight = computed(() => {
  return AppModule.statusBarHeight;
});
const navBarHeight = computed(() => {
  return AppModule.navBarHeight;
});

const onSearchConfirm = (e: any) => {
  searchText.value = e.detail.value;
  emit("search", e.detail.value);
};
</script>

<style lang="scss" scoped></style>
