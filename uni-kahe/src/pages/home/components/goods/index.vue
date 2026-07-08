<template>
  <view class="homeGoods">
    <!--    <image-->
    <!--      class="homeGoods-bg"-->
    <!--      mode="widthFix"-->
    <!--      src="/static/kaju/common/good-bg.png"-->
    <!--    />-->
    <!--        <view class="homeGoods-empty" v-if="item.isSellout">-->
    <!--            <image-->
    <!--                style="width:137rpx;height: 63rpx"-->
    <!--                src="/static/jos/1214/sell-out.png"-->
    <!--            />-->
    <!--        </view>-->

    <view class="homeGoods-cover">
      <image
        class="homeGoods-cover-bg"
        mode="widthFix"
        src="/static/kaju/common/good-bg.png"
      />
      <view class="homeGoods-cover-top">
        <image
          class="homeGoods-cover-top-img"
          :src="item.image"
          mode="heightFix"
        />
      </view>

      <view class="homeGoods-cover-pattern">
        <image
          v-for="(label, index) in item.labels"
          :key="'labels:' + index"
          :src="formatLabelImage(label)"
          class="homeGoods-cover-pattern-img"
        />
      </view>
    </view>
    <view class="homeGoods-info">
      <view class="homeGoods-info-bottom">
        <view class="homeGoods-info-bottom-title text-flow-ellipsis-single">{{
          item.name
        }}</view>
        <view class="homeGoods-info-bottom-row1">
          <view class="homeGoods-info-bottom-row1-price">
            <text class="homeGoods-info-bottom-row1-price-title price-font"
              >{{ isFromMall ? "" : "" }}{{ item.price
              }}{{ isFromMall ? "/点券" : "" }}</text
            >
          </view>
          <view class="homeGoods-info-merchant" v-if="!hideMerchant">
            <image
              class="homeGoods-info-merchant-logo"
              :src="item.merchant?.icon"
            />
            <view
              class="homeGoods-info-merchant-name text-flow-ellipsis-single"
              >{{ item.merchant?.name }}</view
            >
          </view>
        </view>
      </view>
    </view>
    <view class="homeGoods-tags" v-if="showTag" />
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { UIMallListItemModel, UIProductModel } from "@/model";
defineProps({
  item: {
    default: {} as UIProductModel,
    type: Object as PropType<UIProductModel>,
  },
  showTag: {
    default: true,
    type: Boolean,
  },
  isFromMall: {
    default: false,
    type: Boolean,
  },
  hideMerchant: {
    default: false,
    type: Boolean,
  },
});

const formatLabelImage = (index: number) => {
  return "/static/kahe-202510/ka-he/tag/tag" + index + ".png";
};

const formatLabelName = (index: number) => {
  switch (index) {
    case 1:
      return "满开";
    case 2:
      return "隐藏";
    case 3:
      return "宝箱";
    case 4:
      return "魔王";
    case 5:
      return "排队";
    case 6:
      return "联盟";
  }
};
</script>

<style lang="scss" scoped>
.homeGoods {
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 20rpx;
  display: flex;
  flex-direction: column;
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

  &-tags {
    position: absolute;
    left: 12rpx;
    top: 0;
    width: 84rpx;
    height: 30rpx;
    background: #8bb7ff;
    border-radius: 0rpx 0rpx 8rpx 8rpx;
    opacity: 0.8;
  }

  &-cover {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;

    &-bg {
      width: 100%;
      height: 100%;
      aspect-ratio: 1 / 1;
    }

    &-top {
      position: absolute;
      left: 4rpx;
      top: 4rpx;
      width: calc(100% - 8rpx);
      height: calc(100% - 8rpx);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      &-img {
        height: 100%;
      }
    }

    &-pattern {
      position: absolute;
      right: 8rpx;
      top: 8rpx;
      z-index: 2;
      display: flex;
      //   flex-direction: column;
      align-items: center;

      &-img {
        margin-right: 8rpx;
        width: 65rpx;
        height: 34rpx;
        border-radius: 4rpx;
      }
    }
  }

  &-info {
    margin-top: 8rpx;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-bottom {
      width: 100%;
      &-title {
        font-weight: 400;
        font-size: 24rpx;
        color: #000000;
        line-height: 30rpx;
      }

      &-row1 {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        &-price {
          position: relative;

          &-title {
            line-height: 42rpx;
            color: #fe452c;
            font-size: 24rpx;
          }
        }

        &-title {
          color: #000000;
          font-size: 40rpx;
        }
      }
    }

    &-merchant {
      display: flex;
      flex-direction: row;
      align-items: center;

      &-name {
        max-width: 120rpx;
        margin-left: 5rpx;
        font-weight: normal;
        font-size: 18rpx;
        color: #000000;
      }

      &-logo {
        width: 36rpx;
        height: 36rpx;
        border-radius: 50%;
      }
    }
  }
}
</style>
