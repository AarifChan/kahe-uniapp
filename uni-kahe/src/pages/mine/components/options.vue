<script setup lang="ts">
import { ref } from "vue";
import { showInGroupImage } from "@/utils/tools";
import { AppModule } from "@/store/modules/app";

const emits = defineEmits(["didTapAction", "didTapContact"]);
enum ItemType {
  inGroup,
  contact,
  protocol,
  complaint,
  coupon,
  address,
  invite,
  favorite,
  rank,
  under18,
  setting,
  store,
  giftPack,
  income,
  chest,
  rollIn,
}
interface ItemModel {
  icon: string;
  title: string;
  type: ItemType;
}
const itemList = ref([
  {
    icon: "https://jms.85gui7.com/kahe-202510/mine/service1.png",
    title: "用户协议",
    type: ItemType.protocol,
  },

  {
    icon: "https://jms.85gui7.com/kahe-202510/mine/service2.png",
    title: "投诉渠道",
    type: ItemType.contact,
  },
  // {
  //   icon: "https://jms.85gui7.com/kahe-202510/ka-he/mine/item1.png",
  //   title: "福利群",
  //   type: ItemType.inGroup,
  // },
  {
    icon: "https://jms.85gui7.com/kahe-202510/mine/service3.png",
    title: "地址管理",
    type: ItemType.address,
  },
  {
    icon: "https://jms.85gui7.com/kahe-202510/mine/service4.png",
    title: "特惠礼包",
    type: ItemType.giftPack,
  },

  {
    icon: "https://jms.85gui7.com/kahe-202510/mine/service5.png",
    title: "排行奖励",
    type: ItemType.rank,
  },

  // {
  //   icon: "https://jms.85gui7.com/kahe-202510/mine/service6.png",
  //   title: "联盟收益",
  //   type: ItemType.income,
  // },
  {
    icon: "https://jms.85gui7.com/kahe-202510/mine/service7.png",
    // title: "商城",
    // type: ItemType.store,
    title: "未成年投诉",
    type: ItemType.under18,
  },

  {
    icon: "https://jms.85gui7.com/kahe-202510/mine/service8.png",
    title: "宝箱",
    type: ItemType.chest,
  },
  {
    icon: "https://jms.85gui7.com/kahe-202510/mine/service9.png",
    title: "入驻了解",
    type: ItemType.rollIn,
  },
]);

const handleClick = (item: ItemModel) => {
  console.log("handleClick:", item);
  switch (item.type) {
    case ItemType.inGroup:
      showInGroupImage();
      break;
    case ItemType.address:
      uni.navigateTo({
        url: "/subPackages/mine/address/index",
      });
      break;
    case ItemType.rollIn:
      uni.previewImage({
        current:
          "https://jms.85gui7.com/kahe-202510/ka-he/home/13395850645540676.png",
        urls: [
          "https://jms.85gui7.com/kahe-202510/ka-he/home/13395850645540676.png",
        ],
      });
      break;
    case ItemType.coupon:
      uni.navigateTo({
        url: "/subPackages/mine/coupon/index",
      });
      break;
    case ItemType.protocol:
      // showModalType(1);
      emits("didTapAction", 1);
      break;
    case ItemType.rank:
      uni.navigateTo({
        url: "/subPackages/mine/rank/index",
      });
      break;
    case ItemType.favorite:
      uni.navigateTo({
        url: "/subPackages/mine/favorite/index",
      });
      break;
    case ItemType.invite:
      uni.navigateTo({
        url: "/subPackages/mine/invite/index",
      });
      break;
    case ItemType.under18:
      emits("didTapAction", 7);
      break;
    case ItemType.giftPack:
      console.log("特惠礼包");
      uni.navigateTo({
        url: "/subPackages/gift/index",
      });
      break;
    case ItemType.income:
      console.log("联盟收益");
      uni.navigateTo({
        url: "/subPackages/mine/invite/index",
      });
      // uni.previewImage({
      //     current: "https://jms.85gui7.com/kahe-202510/ka-he/home/13395850645540676.png",
      //     urls: ["https://jms.85gui7.com/kahe-202510/ka-he/home/13395850645540676.png"],
      // });
      break;
    case ItemType.store:
      uni.navigateTo({
        url: "/subPackages/mall/index",
      });
      break;
    case ItemType.contact:
      emits("didTapContact");
      break;
    case ItemType.chest:
      uni.navigateTo({ url: "/subPackages/box/box/index?tab=3" });
    default:
      break;
  }
};
</script>

<template>
  <view class="optionList">
    <view class="optionList-top">
      <image
        class="optionList-top-bg"
        src="https://jms.85gui7.com/kahe-202510/ka-he/mine/flowerBg.png"
      />
      <text class="optionList-top-title other-font">更多服务</text>
    </view>
    <view class="grid-container">
      <view
        class="grid-item"
        v-for="(item, index) in itemList"
        :key="index"
        :id="item.title"
        @click="handleClick(item)"
      >
        <!--        <button-->
        <!--          class="optionList-item"-->
        <!--          openType="contact"-->
        <!--          v-if="item.type === ItemType.contact"-->
        <!--        >-->
        <!--          <image class="optionList-item-icon" :src="item.icon" />-->
        <!--          <text class="optionList-item-title">{{ item.title }}</text>-->
        <!--        </button>-->
        <view class="optionList-item">
          <image class="optionList-item-icon" :src="item.icon" />
          <text class="optionList-item-title">{{ item.title }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.optionList {
  margin: 0 32rpx;
  box-sizing: border-box;
  border-radius: 30rpx;
  background-color: white;
  position: relative;

  &-top {
    position: absolute;
    left: -30rpx;
    top: -20rpx;
    width: 316rpx;
    height: 73rpx;

    &-bg {
      width: 100%;
      height: 100%;
    }

    &-title {
      position: absolute;
      left: 40%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-weight: 400;
      font-size: 30rpx;
      color: #fbffaf;
      //font-family: zihunyuwanti;
      @include text-stroke(3rpx, #ff7b57);
      //text-stroke: 3rpx #ff7b57;
      //-webkit-text-stroke: 3rpx #ff7b57;
      //-webkit-background-clip: text;
      //-webkit-text-fill-color: transparent;
    }
  }

  &-item {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: 0;
    line-height: 26rpx;

    &-icon {
      width: 60rpx;
      height: 60rpx;
    }

    &-title {
      margin-top: 8rpx;
      font-size: 26rpx;
      font-weight: 400;
      color: #000000;
    }
  }

  &-item::after {
    border-radius: 0;
    border: none;
    padding: 0;
    margin: 0;
    background-color: transparent;
  }
}

.grid-container {
  padding-top: 40rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0;
  border: 2px solid #cda374;
  border-radius: 30rpx;

  .grid-item {
    padding: 16px 0;
  }
}
</style>
