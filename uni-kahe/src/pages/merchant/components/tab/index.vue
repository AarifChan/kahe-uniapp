<template>
  <view class="merchant-tab">
    <view class="merchant-tab-list">
      <view
        class="merchant-tab-list-item"
        v-for="(item, index) in tabList"
        :key="index"
        @tap.stop="clickItem(index)"
      >
        <image
          class="merchant-tab-list-item-img"
          v-if="current === index"
          :src="item.selectIcon"
        />
        <image
          class="merchant-tab-list-item-img"
          v-else
          :src="item.normalIcon"
        />
        <view
          class="merchant-tab-list-item-title theme-font"
          :style="{ color: current === index ? '#000000' : '#6A656C' }"
          >{{ item.title }}</view
        >
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface ItemType {
  title: string;
  value: number;
}

const tabList = [
  {
    value: 1,
    title: "卡牌",
    normalIcon: "https://jms.85gui7.com/kahe-202510/ka-he/merchant/item1-normal.png",
    selectIcon: "https://jms.85gui7.com/kahe-202510/ka-he/merchant/item1-selected.png",
  },
  {
    value: 2,
    title: "潮玩",
    normalIcon: "https://jms.85gui7.com/kahe-202510/ka-he/merchant/item2-normal.png",
    selectIcon: "https://jms.85gui7.com/kahe-202510/ka-he/merchant/item2-selected.png",
  },
  {
    value: 3,
    title: "谷子",
    normalIcon: "https://jms.85gui7.com/kahe-202510/ka-he/merchant/item3-normal.png",
    selectIcon: "https://jms.85gui7.com/kahe-202510/ka-he/merchant/item3-selected.png",
  },
];

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
.merchant-tab {
  position: relative;
  margin: 0 32rpx;
  &-list {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 80rpx;
    &-item {
      position: relative;
      width: 138rpx;
      height: 119rpx;
      &-img {
        position: relative;
        width: 100%;
        height: 100%;
      }
      &-title {
        position: absolute;
        bottom: 12rpx;
        left: 0;
        width: 100%;
        font-size: 28rpx;
        color: #000000;
        text-align: center;
      }
    }
  }
}
</style>
