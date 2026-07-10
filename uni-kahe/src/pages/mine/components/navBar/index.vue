<template>
  <view
    class="customNav w-full flex flex-col"
    :style="{
      height: `${totalNavHeight}PX`,
      opacity: opacity,

      paddingTop: `${statusBarHeight}PX`,
      backgroundColor: `rgba(255, 248, 233, ${opacity})`,
    }"
  >
    <view
      class="relative w-full flex flex-row items-center justify-start"
      :style="{ lineHeight: `${navBarHeight}PX` }"
    >
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
