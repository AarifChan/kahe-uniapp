<template>
  <view class="machineTab">
    <view class="machineTab-list">
      <view
        class="machineTab-list-item"
        v-for="(item, index) in list"
        :key="index"
        @tap.stop="clickItem(index)"
      >
        <image class="machineTab-list-item-img" :src="item.icon" />
        <view class="machineTab-list-item-title text-flow-ellipsis-single">{{
          item.title
        }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface ItemType {
  title: string;
  value: number;
  icon: string;
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
.machineTab {
  position: relative;
  margin: 0 32rpx;

  &-list {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    //gap: 28rpx;
    &-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &-img {
        width: 93rpx;
        height: 93rpx;
      }
      &-title {
        width: 93rpx;
        text-align: center;
        margin-top: 12rpx;
        font-size: 20rpx;
        color: #763a1c;
      }
    }
  }
}
</style>
