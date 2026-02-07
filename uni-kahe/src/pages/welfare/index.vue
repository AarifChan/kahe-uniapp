<template>
  <NavBar :opacity="1" position="sticky" :top-safe="false" title="福利" />
  <view class="welfare">
    <image
      class="welfare-bg"
      src="https://jms.85gui7.com/kahe-202510/ka-he/welfare/welfare-bg.png"
    />
    <view class="welfare-content">
      <view class="welfare-content-top" />
      <view class="welfare-content-padding">
        <view
          class="welfare-content-padding-item"
          v-for="(item, index) in itemList"
          :key="'card' + index"
          @tap.stop="clickItem(item)"
        >
          <image
            class="welfare-content-padding-item-img"
            src="https://jms.85gui7.com/kahe-202510/ka-he/welfare/card-bg.png"
          />
          <view class="welfare-content-padding-item-content">
            <view
              class="welfare-content-padding-item-content-title other-font"
              >{{ item.title }}</view
            >
            <image
              class="welfare-content-padding-item-content-icon"
              :src="item.image"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
  <TabBar />
</template>

<script lang="ts" setup>
import { eventBus } from "@/utils/event";
import { ref } from "vue";
import { AppModule } from "@/store/modules/app";
import { ShowToast } from "@/utils";
import NavBar from "@/components/navBar/index.vue";
import TabBar from "@/components/tabBar/index.vue";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
enum WelfareItemType {
  vip = 0,
  activity = 1,
  integral = 2,
  redBag = 3,
  chest = 4,
  discount = 5,
  rank = 6,
  collect = 7,
  dailyCoupon = 8,
  invite = 9,
}
export interface WelfareItem {
  itemType: WelfareItemType;
  image: string;
}
const clickItem = (item: WelfareItem) => {
  switch (item.itemType) {
    case WelfareItemType.vip:
      uni.navigateTo({
        url: "/subPackages/mine/vip/index",
      });
      break;
    case WelfareItemType.activity:
      uni.navigateTo({
        url: "/subPackages/activity/index",
      });
      break;
    case WelfareItemType.integral:
      uni.navigateTo({
        url: "/subPackages/infinite/index",
      });
      break;
    case WelfareItemType.invite:
      uni.navigateTo({
        url: "/subPackages/mine/invite/index",
      });
      break;
    case WelfareItemType.collect:
      uni.navigateTo({
        url: "/subPackages/collect/index",
      });
      break;
    case WelfareItemType.dailyCoupon:
      uni.navigateTo({
        url: "/subPackages/dailyWelfare/index",
      });
      break;
    case WelfareItemType.redBag:
      uni.navigateTo({
        url: "/subPackages/gift/index",
      });
      break;
    case WelfareItemType.chest:
      uni.navigateBack();
      setTimeout(() => {
        AppModule.changeBoxTabIndex(3);
        AppModule.changeCurrentTabIndex(3);
      });

      break;
    case WelfareItemType.rank:
      uni.navigateTo({
        url: "/subPackages/mine/rank/index",
      });
      break;
    case WelfareItemType.discount:
      ShowToast("正在准备中，尽请期待");
      return;
      uni.navigateTo({
        url: "/subPackages/discount/index",
      });
      break;
    default:
      break;
  }
};

const itemList = ref([
  {
    image: "https://jms.85gui7.com/kahe-202510/ka-he/welfare/item1.png",
    itemType: WelfareItemType.integral,
    title: "积分专区",
  },
  {
    image: "https://jms.85gui7.com/kahe-202510/ka-he/welfare/item2.png",
    itemType: WelfareItemType.vip,
    title: "会员权益",
  },
  // {
  //   image: "https://jms.85gui7.com/kahe-202510/ka-he/welfare/item3.png",
  //   itemType: WelfareItemType.invite,
  //   title: "联盟收益",
  // },
  {
    image: "https://jms.85gui7.com/kahe-202510/ka-he/welfare/item4.png",
    itemType: WelfareItemType.redBag,
    title: "特惠礼包",
  },
  {
    image: "https://jms.85gui7.com/kahe-202510/ka-he/welfare/item5.png",
    itemType: WelfareItemType.activity,
    title: "福利抽选",
  },
  {
    image: "https://jms.85gui7.com/kahe-202510/ka-he/welfare/item6.png",
    itemType: WelfareItemType.dailyCoupon,
    title: "每日放券",
  },
  {
    image: "https://jms.85gui7.com/kahe-202510/ka-he/welfare/item7.png",
    itemType: WelfareItemType.collect,
    title: "集赏行动",
  },
  {
    image: "https://jms.85gui7.com/kahe-202510/ka-he/welfare/item8.png",
    itemType: WelfareItemType.rank,
    title: "排名奖励",
  },
]);
onShareAppMessage(() => {
  return {
    title: `${
      UserModule.userInfo?.nickname ?? ""
    }邀请你来卡核抽取各种稀有卡牌！`,
    imageUrl: "https://jms.85gui7.com/kahe-202510/common/share.jpg",
    path: "/pages/welcome/index",
  };
});
onShareTimeline(() => {
  return {
    title: `${
      UserModule.userInfo?.nickname ?? ""
    }邀请你来卡核抽取各种稀有卡牌！`,
    imageUrl: "https://jms.85gui7.com/kahe-202510/common/share.jpg",
    path: "/pages/welcome/index",
  };
});
</script>

<style lang="scss" scoped>
.welfare {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: $main-bg;
  overflow: hidden;
  &-bg {
    position: relative;
    width: 750rpx;
    height: 1433rpx;
  }
  &-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    &-top {
      width: 100%;
      height: 463rpx;
    }
    &-padding {
      box-sizing: border-box;
      width: 100%;
      padding: 0 30rpx;
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc((100% - 32rpx) / 2), 1fr)
      ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
      grid-gap: 32rpx; // 这是网格间的间隙，根据需要调整
      &-item {
        position: relative;
        width: 100%;
        aspect-ratio: 339 / 116;
        &-img {
          width: 100%;
          height: 100%;
        }
        &-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          &-title {
            position: absolute;
            top: 24rpx;
            left: 50rpx;
            font-weight: 400;
            font-size: 39rpx;
            color: #a26e4e;
            @include text-stroke-color(#ffffff);
            margin-bottom: 8rpx;
          }
          &-icon {
            position: absolute;
            right: 0;
            top: 0;
            width: 120rpx;
            height: 120rpx;
          }
        }
      }
    }
  }
}
</style>
