<template>
  <view class="merchantInfoGoods">
    <view class="merchantInfoGoods-empty" v-if="item.productNum === 0">
      <image
        style="width: 137rpx; height: 63rpx"
        src="https://jms.85gui7.com/jos/1214/sell-out.png"
      />
    </view>
    <view class="merchantInfoGoods-cover">
      <image
        class="merchantInfoGoods-cover-img"
        :src="item.image"
        mode="heightFix"
      />
      <view class="merchantInfoGoods-cover-pattern">
        <image
          v-for="(label, index) in item.labels"
          :key="'labels:' + index"
          :src="formatLabelImage(label)"
          class="merchantInfoGoods-cover-pattern-img"
        />
      </view>
    </view>
    <view class="merchantInfoGoods-info">
      <view class="merchantInfoGoods-info-content">
        <view class="merchantInfoGoods-info-content-bottom">
          <view
            class="merchantInfoGoods-info-content-bottom-title text-flow-ellipsis-multiple"
            >{{ item.name }}</view
          >
          <view class="merchantInfoGoods-info-content-bottom-row1">
            <text
              class="merchantInfoGoods-info-content-bottom-row1-title price-font"
              >{{ isFromMall ? "" : "" }}{{ item.price
              }}{{ isFromMall ? "点券" : "" }}</text
            >
          </view>
        </view>
      </view>
    </view>
    <image
      class="merchantInfoGoods-tags"
      v-if="showTag"
      :src="item.mainTagImage"
    />
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { UIMallListItemModel, UIProductModel } from "@/model";
defineProps({
  item: {
    default: {} as UIProductModel | UIMallListItemModel,
    type: Object as PropType<UIProductModel | UIMallListItemModel>,
  },
  showTag: {
    default: true,
    type: Boolean,
  },
  isFromMall: {
    default: false,
    type: Boolean,
  },
});

const formatLabelImage = (index: number) => {
  return "https://jms.85gui7.com/kahe-202510/tags/mode" + index + ".png";
};
</script>

<style lang="scss" scoped>
.merchantInfoGoods {
  width: 100%;
  //height: 452rpx;
  position: relative;
  overflow: hidden;
  margin-bottom: 20rpx;
  background-color: white;
  border-radius: 30rpx;
  box-shadow: 0rpx 2rpx 7rpx 0rpx rgba(12, 19, 52, 0.6);
  &-empty {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 3;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  &-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  &-tags {
    position: absolute;
    left: -4rpx;
    top: -2rpx;
    width: 180rpx;
    height: 54rpx;
  }

  &-cover {
    padding: 12rpx 12rpx 0 12rpx;
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    height: fit-content;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &-img {
      //width: 100%;
      height: 100%;
      border-radius: 16rpx;
    }
    &-pattern {
      position: absolute;
      left: 10rpx;
      bottom: 12rpx;
      z-index: 2;
      display: flex;
      flex-direction: column;

      &-img {
        margin-top: 8rpx;
        width: 149rpx;
        height: 49rpx;
      }
    }
  }
  &-info {
    &-content {
      position: relative;
      width: 100%;
      height: 100%;
      &-bottom {
        padding: 0 12rpx;
        width: calc(100% - 24rpx);
        &-title {
          margin-top: 10rpx;
          margin-left: 10rpx;
          font-weight: 400;
          font-size: 24rpx;
          color: #000000;
          line-height: 30rpx;
          height: 60rpx;
          margin-bottom: 0;
        }
        &-row1 {
          padding: 0 10rpx;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          transform: translateY(-16rpx);
          &-title {
            color: #000000;
            font-size: 40rpx;
          }
        }
      }
    }
  }
}
</style>
