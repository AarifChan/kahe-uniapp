<template>
  <view>
    <view class="merchantBox" @tap.stop="handleExpand">
      <view class="merchantBox-left">
        <image class="merchantBox-left-avatar" :src="item.icon" />
        <view class="merchantBox-left-info">
          <view class="merchantBox-left-info-name">{{ item.name }}</view>
          <view
            class="merchantBox-left-info-bar"
            :style="{ backgroundColor: getTagBgColor(item.tag) }"
          >
            <image
              class="merchantBox-left-info-bar-tag"
              :src="getTagIcon(item.tag)"
            />
            <text class="merchantBox-left-info-bar-title">{{
              getLevelName(item.tag)
            }}</text>
          </view>
        </view>
      </view>
      <image
        class="merchantBox-arrow"
        :style="{ transform: isExpand ? 'rotate(180deg)' : 'rotate(0)' }"
        src="https://jms.85gui7.com/kahe-202510/ka-he/common/down-arrow.png"
      />
    </view>
    <view v-if="isExpand">
      <goods-row
        v-for="(box, index) in item.box"
        :item="box"
        :key="'index' + index"
        :id="'m' + box.boxId"
        @did-tap-detail="emits('didClickBoxItem', box)"
        @did-tap-select="emits('didSelectBox', box)"
      />
      <empty :show="item.box?.length === 0" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { MerchantBoxModel } from "@/model";

import GoodsRow from "../box/index.vue";
import Empty from "@/components/empty/index.vue";

import {
  getLevelName,
  getTagBgColor,
  getTagIcon,
} from "@/pages/merchant/index";

defineProps({
  item: {
    default: {} as MerchantBoxModel,
    type: Object as PropType<MerchantBoxModel>,
  },
  isExpand: {
    default: false,
    type: Boolean,
  },
});

const emits = defineEmits([
  "didClickBoxItem",
  "didSelectBox",
  "didExpandMerchant",
]);

// const {
//     boxList,
//     clickBoxItem,
//     didSelectBox,
//     loadMerchantBoxList
// } = useBox()

const handleExpand = () => {
  emits("didExpandMerchant");
  // isExpand.value = !isExpand.value
  // if (isExpand.value) {
  //     // loadMerchantBoxList(props.item.id)
  //
  // } else {
  //     boxList.value = []
  // }
};
</script>

<style lang="scss" scoped>
.merchantBox {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 4rpx;
  border: 5rpx solid #d3c5a2;
  padding: 18rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12rpx;
  &-arrow {
    width: 43rpx;
    height: 20rpx;
    display: inline-block;
    transition: transform 0.5s;
  }
  &-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    &-avatar {
      width: 56rpx;
      height: 56rpx;
      border-radius: 50%;
    }
    &-info {
      margin-left: 19rpx;
      display: flex;
      flex-direction: column;
      &-name {
        font-weight: normal;
        font-size: 26rpx;
        color: #000000;
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
}
</style>
