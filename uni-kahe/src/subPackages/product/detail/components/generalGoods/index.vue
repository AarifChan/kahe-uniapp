<template>
  <view class="goodsBox">
    <view class="goodsBox-top">
      <view class="goodsBox-top-image">
        <image
          class="goodsBox-top-image-img"
          :src="item.image"
          mode="heightFix"
        />
      </view>

      <view v-if="!item.isHide && !isInfinite" class="goodsBox-top-numBg">
        <image
          class="goodsBox-top-numBg-bg"
          src="https://jms.85gui7.com/kahe-202510/ka-he/common/num_bg.png"
        />
        <text class="goodsBox-top-numBg-num" v-if="item.isSky">{{
          item.num
        }}</text>
        <text class="goodsBox-top-numBg-num" v-else-if="item.isStrand"
          >串{{ item.total }}</text
        >
        <text class="goodsBox-top-numBg-num" v-else
          >{{ item.last }}/{{ item.total }}</text
        >
      </view>
      <view class="goodsBox-top-quality">{{
        getTitleByQuality(item.quality)
      }}</view>
      <view class="goodsBox-top-empty" v-if="item.isSellOut">
        <image
          style="width: 132rpx; height: 113rpx"
          src="https://jms.85gui7.com/kahe-202510/product/sell-out.png"
        />
      </view>
      <image
        v-if="!item.isHide"
        class="goodsBox-top-level"
        mode="widthFix"
        :src="getLevelImageByLevel(item.level)"
      />
      <image
        v-if="item.isDemon"
        class="goodsBox-top-king"
        src="https://jms.85gui7.com/kahe-202510/common/king.png"
      />
    </view>
    <view class="goodsBox-info">
      <view
        class="goodsBox-info-title text-flow-ellipsis-single"
        :style="{ color: showPrice ? '#000000' : '#ffffff' }"
        >{{ item.title }}</view
      >
      <view v-if="showPrice">
        <view class="goodsBox-info-subTitle" v-if="!item.isHide"
          >参考价: {{ goodsPrice }}</view
        >
        <view class="goodsBox-info-prob" v-if="item.isSky"
          >{{ item.prob }}~{{ item.weight }}抽完赠送</view
        >
        <view class="goodsBox-info-prob" v-else-if="item.isSpec">只赠不售</view>
        <view class="goodsBox-info-prob" v-else> 获得概率{{ item.prob }}%</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { UIProductBoxModel } from "@/model";
import type { PropType } from "vue";
import { useEnum } from "@/composables/enum";
import { getTitleByQuality } from "@/utils/index";
const { getLevelImageByLevel } = useEnum();

defineProps({
  goodsPrice: {
    default: 0,
    type: Number,
  },
  showPrice: {
    default: true,
    type: Boolean,
  },
  item: {
    default: {} as UIProductBoxModel,
    type: Object as PropType<UIProductBoxModel>,
  },
  info: {
    default: true,
    type: Boolean,
  },
  level: {
    default: true,
    type: Boolean,
  },
  nums: {
    default: true,
    type: Boolean,
  },
  isInfinite: {
    default: false,
    type: Boolean,
  },
  isSelect: {
    default: false,
    type: Boolean,
  },
});
</script>

<style lang="scss" scoped>
.goodsBox {
  display: inline-block;
  position: relative;

  &-top {
    position: relative;
    width: 200rpx;
    height: 200rpx;
    background: rgba(253, 239, 204, 0.72);
    border-radius: 10rpx;
    border: 5rpx solid #fcd570;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 10rpx;
      border: 4rpx solid #e2af2f;
      pointer-events: none; // 确保伪元素不阻挡鼠标事件
    }
    &-bg {
      left: 0;
      top: 0;
      position: absolute;
      width: 100%;
      height: 100%;
    }

    &-quality {
      position: absolute;
      left: 8rpx;
      bottom: 4px;
      padding: 4rpx 8rpx;
      color: #222;
      font-size: 20rpx;
      background: #f6ac41;
      border-radius: 4rpx;
    }

    &-empty {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.73);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    &-image {
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 12rpx;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      &-img {
        width: calc(100% - 24rpx);
        height: calc(100% - 24rpx);
      }
    }

    &-level {
      position: absolute;
      left: -24rpx;
      top: -24rpx;
      width: 100rpx;
      height: 80rpx;
      z-index: 10;
    }
    &-king {
      position: absolute;
      top: -36rpx;
      right: -16rpx;
      width: 107rpx;
      height: 72rpx;
      z-index: 10;
    }
    &-numBg {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 87rpx;
      height: 54rpx;
      z-index: 10;
      &-bg {
        width: 100%;
        height: 100%;
      }
      &-num {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 87rpx;
        line-height: 54rpx;
        text-align: center;
        font-size: 18rpx;
        color: #000000;
      }
    }
  }

  &-info {
    margin-top: 8rpx;
    display: flex;
    flex-direction: column;
    &-title {
      width: 200rpx;
      color: #000000;
      font-size: 10px;
    }
    &-subTitle {
      color: #909090;
      font-size: 9px;
    }
    &-prob {
      color: #55d8b0;
      font-size: 9px;
    }
  }
}
</style>
