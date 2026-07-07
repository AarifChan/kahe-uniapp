<template>
  <view
    class="customNav"
    :style="{
      height: `${totalNavHeight}PX`,
      opacity: opacity,
      position: `${position}`,
      paddingTop: `${statusBarHeight}PX`,
      backgroundColor: `rgba(255, 248, 233, ${opacity})`,
    }"
  >
    <view class="customNav-bar" :style="{ lineHeight: `${navBarHeight}PX` }">
      <image class="customNav-bar-logo" src="/static/kaju/common/logo.png" />
      <view class="customNav-bar-search">
        <image
          class="customNav-bar-search-icon"
          src="/static/kaju/common/search.png"
        />
        <input
          class="customNav-bar-search-input"
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

<style lang="scss" scoped>
.customNav {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 99;
  &-bar {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    &-title {
      font-size: 30rpx;
      color: #000000;
    }
    &-logo {
      margin-left: 59rpx;
      width: 115rpx;
      height: 63rpx;
    }
    &-search {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 345rpx;
      height: 58rpx;
      background: #ffffff;
      border-radius: 29rpx;
      border: 2px solid #ffe4d0;
      padding: 0 20rpx;
      box-sizing: border-box;
      &-icon {
        width: 28rpx;
        height: 28rpx;
        flex-shrink: 0;
      }
      &-input {
        flex: 1;
        height: 100%;
        margin-left: 10rpx;
        font-size: 26rpx;
        color: #333;
      }
    }
  }
}
</style>
