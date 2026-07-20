<template>
  <NavBar :opacity="1" position="sticky" :top-safe="false" title="福利" />
  <view class="relative w-full h-screen bg-main-bg overflow-hidden">
    <image
      class="relative w-750 h-1433"
      src="/static/kahe-202510/ka-he/welfare/welfare-bg.png"
    />
    <view class="absolute top-0 left-0 w-full flex flex-col">
      <view class="w-full h-463" />
      <view
        class="box-border w-full px-30"
        style="
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(calc((100% - 32rpx) / 2), 1fr)
          );
          grid-gap: 32rpx;
        "
      >
        <view
          class="relative w-full aspect-ratio-[339/116]"
          v-for="(item, index) in itemList"
          :key="'card' + index"
          @tap.stop="clickItem(item)"
        >
          <image
            class="w-full h-full"
            src="/static/kahe-202510/ka-he/welfare/card-bg.png"
          />
          <view class="absolute left-0 top-0 w-full h-full">
            <view
              class="absolute top-24 left-50 font-normal text-39 text-[#a26e4e] mb-8 other-font"
              style="
                text-shadow:
                  0 0 2rpx #ffffff,
                  0 0 2rpx #ffffff,
                  0 0 2rpx #ffffff,
                  0 0 2rpx #ffffff;
              "
              >{{ item.title }}</view
            >
            <image
              class="absolute right-0 top-0 w-120 h-120"
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
    image: "/static/kahe-202510/ka-he/welfare/item1.png",
    itemType: WelfareItemType.integral,
    title: "积分专区",
  },
  {
    image: "/static/kahe-202510/ka-he/welfare/item2.png",
    itemType: WelfareItemType.vip,
    title: "会员权益",
  },
  // {
  //   image: "/static/kahe-202510/ka-he/welfare/item3.png",
  //   itemType: WelfareItemType.invite,
  //   title: "联盟收益",
  // },
  {
    image: "/static/kahe-202510/ka-he/welfare/item4.png",
    itemType: WelfareItemType.redBag,
    title: "特惠礼包",
  },
  {
    image: "/static/kahe-202510/ka-he/welfare/item5.png",
    itemType: WelfareItemType.activity,
    title: "福利抽选",
  },
  {
    image: "/static/kahe-202510/ka-he/welfare/item6.png",
    itemType: WelfareItemType.dailyCoupon,
    title: "每日放券",
  },
  {
    image: "/static/kahe-202510/ka-he/welfare/item7.png",
    itemType: WelfareItemType.collect,
    title: "集赏行动",
  },
  {
    image: "/static/kahe-202510/ka-he/welfare/item8.png",
    itemType: WelfareItemType.rank,
    title: "排名奖励",
  },
]);
onShareAppMessage(() => {
  return {
    title: `${UserModule.userInfo?.nickname ?? ""}邀请你来抽取各种稀有卡牌！`,
    imageUrl: "https://cdn.kjkapai.com/tycw-mp/kaju/share.png",
    path: "/pages/welcome/index",
  };
});
onShareTimeline(() => {
  return {
    title: `${UserModule.userInfo?.nickname ?? ""}邀请你来抽取各种稀有卡牌！`,
    imageUrl: "https://cdn.kjkapai.com/tycw-mp/kaju/share.png",
    path: "/pages/welcome/index",
  };
});
</script>

<style lang="scss" scoped></style>
