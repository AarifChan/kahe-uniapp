<script setup lang="ts">
import { ref } from "vue";
import { showInGroupImage } from "@/utils/tools";
import { AppModule } from "@/store/modules/app";
import { isAuditVersion } from "@/config";

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
const fullItemList: ItemModel[] = [
  {
    icon: "/static/kaju/mine/option1.png",
    title: "用户协议",
    type: ItemType.protocol,
  },

  {
    icon: "/static/kaju/mine/option2.png",
    title: "投诉渠道",
    type: ItemType.contact,
  },
  {
    icon: "/static/kaju/mine/option3.png",
    title: "地址管理",
    type: ItemType.address,
  },
  {
    icon: "/static/kaju/mine/option4.png",
    title: "特惠礼包",
    type: ItemType.giftPack,
  },

  {
    icon: "/static/kaju/mine/option5.png",
    title: "排行奖励",
    type: ItemType.rank,
  },

  {
    icon: "/static/kaju/mine/option6.png",
    title: "未成年投诉",
    type: ItemType.under18,
  },

  {
    icon: "/static/kaju/mine/option7.png",
    title: "宝箱",
    type: ItemType.chest,
  },
  {
    icon: "/static/kaju/mine/option8.png",
    title: "入驻了解",
    type: ItemType.rollIn,
  },
];

// 审核版本隐藏的服务项：特惠礼包、排行奖励、宝箱、入驻了解
const auditHiddenTypes = [
  ItemType.giftPack,
  ItemType.rank,
  ItemType.chest,
  ItemType.rollIn,
];
const itemList = ref(
  isAuditVersion
    ? fullItemList.filter((item) => !auditHiddenTypes.includes(item.type))
    : fullItemList
);

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
      uni.navigateTo({
        url: "/subPackages/enroll/index",
      });
      break;
    case ItemType.coupon:
      uni.navigateTo({
        url: "/subPackages/mine/coupon/index",
      });
      break;
    case ItemType.protocol:
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
  }
};
</script>

<template>
  <view class="relative flex flex-row items-center justify-center">
    <image class="w-704 h-578" src="/static/kaju/mine/more-service.png" />
    <view
      class="absolute leading-0 w-full top-40 px-54 pt-40 grid grid-cols-3 gap-0"
    >
      <view
        class="py-28 text-center"
        v-for="(item, index) in itemList"
        :key="index"
        :id="item.title"
        @click="handleClick(item)"
      >
        <view
          class="flex flex-col items-center justify-center bg-transparent leading-26"
        >
          <image class="w-60 h-62" :src="item.icon" />
          <text class="mt-4 text-24 text-black">{{ item.title }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
