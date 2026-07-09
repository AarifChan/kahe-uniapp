<template>
  <view class="relative w-full h-full overflow-hidden">
    <image class="relative w-full h-screen" src="/static/kahe-202510/ka-he/welfare/bg.png" />
    <view class="absolute top-0 left-0 w-full h-full flex flex-col">
      <image class="w-full h-463" src="/static/kahe-202510/welfare/top-bg.png" />
      <view class="box-border w-full px-30 grid gap-32" style="grid-template-columns: repeat(auto-fill, minmax(calc((100% - 32rpx) / 2), 1fr))">
        <image
          class="w-full aspect-ratio-[338/181]"
          v-for="(item, index) in itemList"
          :key="'card' + index"
          :src="'/static/kahe-202510/welfare/card' + (index + 1) + '.png'"
          @tap.stop="clickItem(item)"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { eventBus } from "@/utils/event";
import { ref } from "vue";
import { AppModule } from "@/store/modules/app";
import { ShowToast } from "@/utils";
enum WelfareItemType {
  vip = 0,
  activity = 1,
  integral = 2,
  redBag = 3,
  chest = 4,
  discount = 5,
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
        url: "/subPackages/product/welfare/index",
      });
      break;
    case WelfareItemType.integral:
      uni.navigateBack();
      eventBus.emit("reloadProductTab", 4);
      break;
    case WelfareItemType.redBag:
      uni.navigateBack();
      setTimeout(() => {
        AppModule.changeBoxTabIndex(4);
        AppModule.changeCurrentTabIndex(3);
      }, 200);

      break;
    case WelfareItemType.chest:
      uni.navigateBack();
      setTimeout(() => {
        AppModule.changeBoxTabIndex(3);
        AppModule.changeCurrentTabIndex(3);
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
    image: "/static/kahe-202510/welfare/card1.png",
    itemType: WelfareItemType.vip,
  },
  {
    image: "/static/kahe-202510/welfare/card2.png",
    itemType: WelfareItemType.activity,
  },
  {
    image: "/static/kahe-202510/welfare/card3.png",
    itemType: WelfareItemType.integral,
  },
  {
    image: "/static/kahe-202510/welfare/card4.png",
    itemType: WelfareItemType.redBag,
  },
  {
    image: "/static/kahe-202510/welfare/card5.png",
    itemType: WelfareItemType.chest,
  },
  {
    image: "/static/kahe-202510/welfare/card6.png",
    itemType: WelfareItemType.discount,
  },
]);
</script>

<style lang="scss" scoped></style>
