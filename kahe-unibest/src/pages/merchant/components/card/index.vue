<template>
  <view class="merchant-card">
    <image class="merchant-card-bg" :src="getTagBg(item.tag)" />
    <view class="merchant-card-content">
      <view class="merchant-card-content-top">
        <view class="merchant-card-content-top-info">
          <image
            class="merchant-card-content-top-info-avatar"
            :src="item.icon"
          />
          <view class="merchant-card-content-top-info-title">
            <text
              class="merchant-card-content-top-info-title-name theme-font"
              >{{ item.name }}</text
            >
            <view
              class="merchant-card-content-top-info-title-bar"
              :style="{ backgroundColor: getTagBgColor(item.tag) }"
            >
              <image
                class="merchant-card-content-top-info-title-bar-tag"
                :src="getTagIcon(item.tag)"
              />
              <text class="merchant-card-content-top-info-title-bar-title">{{
                getLevelName(item.tag)
              }}</text>
            </view>
          </view>
        </view>
        <view
          class="merchant-card-content-top-btn"
          @tap.stop="emits('didClickInfo', item)"
        >
          <!--                    <image class="merchant-card-content-top-btn-bg" src="https://jms.85gui7.com/kahe-202510/merchant/btn.png" />-->
          <text class="merchant-card-content-top-btn-text theme-font"
            >进店看看</text
          >
        </view>
      </view>
      <scroll-view
        class="merchant-card-content-list"
        :scroll-x="true"
        :enable-flex="true"
      >
        <!--        <view class="merchant-card-content-list-coupon">-->
        <!--          <image-->
        <!--            class="merchant-card-content-list-coupon-img"-->
        <!--            src="https://jms.85gui7.com/kahe-202510/ka-he/merchant/coupon-bg.png"-->
        <!--          />-->
        <!--          <view class="merchant-card-content-list-coupon-content">-->
        <!--            <view class="merchant-card-content-list-coupon-content-title"-->
        <!--              >每日福利券</view-->
        <!--            >-->
        <!--            <view class="merchant-card-content-list-coupon-content-price">-->
        <!--              ¥<text style="font-size: 28px">7</text>-->
        <!--            </view>-->
        <!--            <view class="merchant-card-content-list-coupon-content-subTitle"-->
        <!--              >满8可用</view-->
        <!--            >-->
        <!--            <view class="merchant-card-content-list-coupon-content-btn">-->
        <!--              去领取</view-->
        <!--            >-->
        <!--          </view>-->
        <!--        </view>-->
        <view
          class="merchant-card-content-list-item"
          v-for="(box, index) in item.box"
          :key="'goods' + box.id"
          :id="'box:' + box.id"
        >
          <Goods :item="box" @tap.stop="emits('didClickItem', box)" />
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { type PropType } from "vue";
import Goods from "../goods/index.vue";
import type {
  UIMallListItemModel,
  UIProductModel,
  MerchantInfoModel,
} from "@/model";
import {
  getLevelName,
  getTagBg,
  getTagBgColor,
  getTagIcon,
} from "@/pages/merchant/index";
defineProps({
  item: {
    default: {} as MerchantInfoModel,
    type: Object as PropType<MerchantInfoModel>,
  },
  level: {
    type: Number,
    default: 1,
  },
  list: {
    default: {} as UIProductModel[] | UIMallListItemModel[],
    type: Object as PropType<UIProductModel[] | UIMallListItemModel[]>,
  },
});

const emits = defineEmits(["didClickItem", "didClickInfo"]);
</script>

<style lang="scss" scoped>
.merchant-card {
  position: relative;
  width: 718rpx;
  height: 330rpx;
  margin-bottom: 16rpx;
  &-bg {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &-top {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding: 18rpx 28rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      &-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        &-avatar {
          width: 72rpx;
          height: 72rpx;
          border-radius: 36rpx;
          border: 4rpx solid #97aae9;
        }
        &-title {
          margin-left: 24rpx;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          &-name {
            font-weight: 400;
            font-size: 36rpx;
            color: #5d1818;
          }
          &-bar {
            position: relative;
            margin-top: 8rpx;
            margin-left: 8rpx;
            width: 115rpx;
            height: 27rpx;
            background: #ff7276;
            border-radius: 14rpx;
            &-tag {
              position: absolute;
              left: -22rpx;
              top: calc((27rpx - 35rpx) / 2);
              width: 44rpx;
              height: 35rpx;
            }
            &-title {
              position: absolute;
              left: 26rpx;
              top: 0;
              font-weight: normal;
              font-size: 20rpx;
              color: #ffffff;
              line-height: 27rpx;
            }
          }
        }
      }
      &-btn {
        position: relative;
        //width: 169rpx;
        //height: 70rpx;
        width: 118rpx;
        height: 45rpx;
        background: #53d6ac;
        box-shadow: 0rpx 4rpx 0rpx 0rpx #43a17f;
        border-radius: 8rpx;
        &-bg {
          width: 100%;
          height: 100%;
        }
        &-text {
          position: absolute;
          left: 0;
          top: 0;
          line-height: 45rpx;
          text-align: center;
          width: 100%;
          font-weight: 400;
          font-size: 24rpx;
          color: #ffffff;
        }
      }
    }

    &-list {
      position: relative;
      box-sizing: border-box;
      height: 294rpx;
      padding: 0 20rpx 0 20rpx;
      display: flex;
      flex-direction: row;
      white-space: nowrap;

      &-coupon {
        display: inline-block;
        position: relative;
        //width: 132rpx;
        aspect-ratio: 132 / 204;
        height: 280rpx;
        margin-right: 16rpx;
        &-img {
          width: 100%;
          height: 100%;
        }
        &-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          &-title {
            margin-top: 32rpx;
            color: #916026;
            font-size: 18rpx;
            line-height: 36rpx;
          }
          &-price {
            margin-top: 10rpx;
            color: #916026;
            line-height: 36rpx;
          }

          &-subTitle {
            margin-top: 6rpx;
            font-size: 18rpx;
            color: #c29661;
            line-height: 36rpx;
          }
          &-btn {
            margin-top: 50rpx;
            width: 78rpx;
            height: 33rpx;
            background: #ffe475;
            font-size: 18rpx;
            border-radius: 4rpx;
            border: 1px solid #c29a43;
            text-align: center;
            line-height: 33rpx;
          }
        }
      }

      &-item {
        width: 153rpx;
        height: 203rpx;
        display: inline-block;
        position: relative;
        margin-left: 8rpx;
        margin-right: 16rpx;
        overflow: hidden;
      }
    }
  }
}
</style>
