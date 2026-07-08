<template>
  <view class="homeTab">
    <scroll-view
      class="homeTab-list"
      :enable-flex="true"
      :scroll-x="true"
      scroll-with-animation
    >
      <view class="homeTab-content">
        <view
          class="homeTab-list-item"
          v-for="(item, index) in list"
          :key="index"
          @tap.stop="clickItem(index)"
        >
          <view class="homeTab-list-item">
            <image
              v-if="current === index"
              src="/static/kaju/common/select-tab.png"
              class="tab-indicator"
            />
            <text class="tab-text alibaba-font">{{ item.title }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface ItemType {
  title: string;
  value: number;
}

defineProps({
  current: {
    default: 0,
    type: Number,
  },
  list: {
    default: [] as ItemType[],
    type: Array as PropType<ItemType[]>,
  },
  search: {
    default: false,
    type: Boolean,
  },
});
const emits = defineEmits(["update:current", "didClick"]);

const clickItem = (index: number) => {
  emits("update:current", index);
  emits("didClick", index);
};
</script>

<style lang="scss" scoped>
.homeTab {
  position: relative;

  &-content {
    display: flex;
    flex-direction: row;
    width: 100%;
    white-space: nowrap;
    padding: 32rpx 16rpx 16rpx;
  }

  &-list {
    position: relative;
    width: 100%;
    white-space: nowrap;

    &-item {
      display: inline-block;
      position: relative;
      margin-right: 0rpx;
      width: 140rpx;
      height: 52rpx;

      .tab-text {
        position: absolute;
        left: 0;
        top: 0;
        font-weight: normal;
        font-size: 24rpx;
        color: #ffffff;
        line-height: 52rpx;
        width: 140rpx;
        height: 52rpx;

        @include text-stroke(2rpx, #151714);
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .tab-indicator {
        position: absolute;
        left: 0;
        top: 0;
        //margin-top: 4rpx;
        width: 140rpx;
        height: 52rpx;
      }
    }
  }
}
</style>
