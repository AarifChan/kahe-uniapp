<template>
  <view class="goodsContent">
    <view class="goodsContent-list">
      <view class="goodsContent-list-goods">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="goodsContent-list-goods-info"
          @tap.stop="emits('selectItem', item)"
        >
          <view class="goodsContent-list-goods-info-top">
            <image
              class="goodsContent-list-goods-info-top-img"
              :src="item.logo"
              :lazy-load="true"
            >
            </image>
          </view>
          <view class="goodsContent-list-goods-info-content">
            <text
              class="goodsContent-list-goods-info-content-title text-flow-ellipsis-single"
            >
              {{ item.title }}
            </text>
            <view class="goodsContent-list-goods-info-content-row">
              <image class="goodsContent-list-goods-info-content-row-img" />
              <text
                class="goodsContent-list-goods-info-content-row-title"
              ></text>
            </view>
            <view class="goodsContent-list-goods-info-content-row">
              <text class="goodsContent-list-goods-info-content-row-title"
                >数量:{{ item.num }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import type { UIChestModel } from "@/model";
import type { PropType } from "vue";
const emits = defineEmits(["selectItem"]);
defineProps({
    list: {
        type: Array as PropType<UIChestModel[]>,
        default: () => [],
    },
});
</script>

<style lang="scss" scoped>
.goodsContent {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 20rpx 30rpx 0 30rpx;
  &-list {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    &-goods {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      height: 320rpx;
      &-info {
        position: relative;
        margin: 0 22rpx 18rpx 0;
        box-sizing: border-box;
        width: 215rpx;
        height: 100%;
        &-top {
          position: relative;
          width: 100%;
          padding-top: 100%;
          &-goodsImage {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }
          &-goodsBg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
          &-img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
          }

          &-select {
            position: absolute;
            right: 18rpx;
            top: 18rpx;
            width: 33rpx;
            height: 33rpx;
            &-img {
              position: absolute;
              right: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }
            &-bg {
              width: 100%;
              height: 100%;
            }
          }
          &-level {
            position: absolute;
            right: -8px;
            bottom: 8rpx;
            width: 100rpx;
            height: 50rpx;
          }
        }
        &-content {
          width: calc(100% - 16rpx);
          position: relative;
          left: 9rpx;
          bottom: 0;
          display: flex;
          flex-direction: column;
          &-title {
            margin-top: 8rpx;
            position: relative;
            width: 160rpx;
            font-size: 20rpx;
            font-weight: 400;
            color: #2356a9;
            line-height: 32rpx;
          }
          &-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            &-img {
              width: 19px;
              height: 11.5px;
              margin-right: 4rpx;
            }
            &-title {
              font-size: 20rpx;
              font-weight: normal;
              color: #2356a9;
            }
            &-active {
              font-size: 20rpx;
              font-weight: 500;
              color: gray;
            }
          }
        }
      }
      &-info:nth-child(3n) {
        margin-right: 0 !important;
      }
    }
  }
}
</style>
