<template>
  <view class="favoriteTab">
    <view class="favoriteTab-list">
      <view
        class="favoriteTab-list-item"
        v-for="(item, index) in list"
        :key="index"
        @tap.stop="clickItem(index)"
      >
        <view class="favoriteTab-list-item-content">
          <!-- <view
            class="favoriteTab-list-item-content-select theme-font"
          /> -->
          <image
            src="https://jms.85gui7.com/kahe-202510/ka-he/home/round.png"
            class="img"
            v-if="current === index"
          />
          <text
            class="favoriteTab-list-item-content-title theme-font"
            :class="
              current === index
                ? 'favoriteTab-list-item-content-title-select'
                : ''
            "
            >{{ item.title }}</text
          >
        </view>
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
.favoriteTab {
  position: relative;
  padding: 32rpx;
  &-list {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    &-item {
      position: relative;

      height: 50rpx;
      margin-right: 43rpx;
      &-content {
        position: relative;
        width: 100%;
        .img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 60rpx;
          height: 60rpx;
          object-fit: cover;
        }
        &-title {
          line-height: 50rpx;
          height: 100%;
          font-weight: normal;
          font-size: 30rpx;
          text-align: center;
          color: #8a8a8a;
          &-select {
            font-size: 30rpx;
            font-weight: 400;
            font-size: 30rpx;
            color: #fd9d08;
            // text-stroke: 2rpx #000000;
            // -webkit-text-stroke: 2rpx #000000;
            @include text-stroke(2rpx, #000000);
          }
        }
        // &-select {
        //   position: absolute;
        //   left: calc((100% - 62rpx) / 2);
        //   bottom: 0;
        //   width: 62rpx;
        //   height: 9rpx;
        //   background: #ffb735;
        //   border-radius: 5rpx;
        // }
      }
    }
  }
}
</style>
