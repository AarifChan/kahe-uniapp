<template>
  <view class="boxItem">
    <view class="boxItem-top">
      <image
        class="boxItem-top-image"
        mode="heightFix"
        :src="item?.goods?.image"
        @tap.passive="emits('didTapDetail', item)"
      />
      <view class="boxItem-top-quality">{{
        getTitleByQuality(item.quality)
      }}</view>

      <!--            <view class="boxItem-top-levelBg">-->
      <!--                <image mode="heightFix"  class="boxItem-top-levelBg-level" :src="getLevelImage(item?.goods?.level ?? 0)" />-->
      <!--            </view>-->
    </view>
    <view class="boxItem-info">
      <text class="boxItem-info-title text-flow-ellipsis-single">{{
        item?.goods?.name
      }}</text>
      <view class="boxItem-info-ticket">
        <!--                <image class="boxItem-info-ticket-img" src="https://jms.85gui7.com/kahe/mine/icon2.png" />-->
        <text class="boxItem-info-ticket-title price-font">
          {{ item?.goods?.price ?? 0 }}</text
        >
      </view>
      <text class="boxItem-info-num">数量：{{ item?.num }}</text>
      <text v-if="item?.goods?.type === 1" class="boxItem-info-num"
        >仅限发货</text
      >
    </view>
    <view class="boxItem-lock" @tap.stop="emits('didTapLock', item)">
      <image
        class="boxItem-lock-img"
        :src="
          item.status === 0
            ? 'https://jms.85gui7.com/kahe/box/box-goods-unlock.png'
            : 'https://jms.85gui7.com/kahe/box/box-goods-lock.png'
        "
      />
    </view>
    <view class="boxItem-select" @tap.stop="emits('didTapSelect', item)">
      <select-item :is-select="item.selectNum > 0" size="36rpx" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { UserGoodsModel } from "@/model";
import type { PropType } from "vue";
import { useEnum } from "@/composables/enum";
import SelectItem from "@/subPackages/box/box/components/select/index.vue";
import { getTitleByQuality } from "@/utils";
const { getLevelImage } = useEnum();

defineProps({
  item: {
    default: {} as UserGoodsModel,
    type: Object as PropType<UserGoodsModel>,
  },
});

const emits = defineEmits(["didTapSelect", "didTapLock", "didTapDetail"]);
</script>

<style lang="scss" scoped>
.boxItem {
  position: relative;
  width: 100%;
  height: 324rpx;
  display: flex;
  flex-direction: column;
  margin-bottom: 10rpx;
  background: #ffffff;
  border-radius: 30rpx;
  border: 5rpx solid #d3c5a2;

  &-select {
    position: absolute;
    bottom: 16rpx;
    right: 16rpx;
  }
  &-lock {
    position: absolute;
    right: 24rpx;
    bottom: 48rpx;
    &-img {
      width: 20rpx;
      height: 30rpx;
    }
  }
  &-top {
    margin-top: 16rpx;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
    &-image {
      height: 192rpx;
    }
    &-decorate {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }

    &-levelBg {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0rpx;
      bottom: 8rpx;
      width: 90rpx;
      height: 40rpx;
      background: #95c3f7;
      border-radius: 0rpx 8rpx 0rpx 8rpx;
      &-level {
        height: 100%;
      }
    }
  }
  &-info {
    margin-top: 24rpx;
    margin-left: 24rpx;
    display: flex;
    flex-direction: column;
    &-title {
      font-size: 16rpx;
      font-weight: 400;
      color: #000000;
    }
    &-ticket {
      display: flex;
      flex-direction: row;
      align-items: center;
      &-title {
        font-size: 32rpx;
        font-weight: 400;
        color: #000000;
      }
      &-img {
        width: 27rpx;
        height: 28rpx;
      }
    }
    &-num {
      font-size: 16rpx;
      font-weight: 400;
      color: #000000;
    }
  }
}
</style>
