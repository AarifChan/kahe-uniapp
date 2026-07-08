<template>
  <view class="newItem-row2">
    <scroll-view class="scroll" :scroll-x="true" :show-scrollbar="false">
      <view
        class="goods"
        v-for="(item, index) in goodsList"
        :key="index"
        @tap.stop="handleItem(item.type)"
      >
        <image class="img" :src="item.src" />
      </view>
    </scroll-view>
  </view>
  <in-group-modal v-model:show="showModal" @show-image="showInGroupImage" />
</template>

<script lang="ts" setup>
import { showInGroupImage } from "@/utils/tools";
import InGroupModal from "@/components/modal/inGroup/index.vue";
import { ref } from "vue";

enum HomeItemType {
  dailyWelfare = 0,
  welfare = 1,
  mall = 2,
  rank = 3,
  inGroup = 4,
  collect = 5,
  center = 6,
  activity = 7,
  invite = 8,
  integral = 9,
  xingyao = 10,
}

const showModal = ref(false);
const goodsList = ref([
  {
    src: "/static/kaju/home/item1.png",
    type: HomeItemType.activity,
  },
  {
    src: "/static/kaju/home/item2.png",
    type: HomeItemType.xingyao,
  },
  {
    src: "/static/kaju/home/item3.png",
    type: HomeItemType.integral,
  },
  {
    src: "/static/kaju/home/item4.png",
    type: HomeItemType.dailyWelfare,
  },
  {
    src: "/static/kaju/home/item5.png",
    type: HomeItemType.collect,
  },
]);
const handleItem = (index: HomeItemType) => {
  let url = "";
  switch (index) {
    case HomeItemType.dailyWelfare:
      url = "/subPackages/dailyWelfare/index";
      break;
    case HomeItemType.activity:
      url = "/subPackages/activity/index";
      break;
    case HomeItemType.center:
      uni.switchTab({
        url: "/pages/welfare/index",
      });
      return;
    case HomeItemType.xingyao:
      url = "/subPackages/xingyao/index";
      break;
    case HomeItemType.invite:
      uni.previewImage({
        current: "/static/kahe-202510/ka-he/home/13395850645540676.pn",
        urls: ["/static/kahe-202510/ka-he/home/13395850645540676.png"],
      });
      return;
    case HomeItemType.mall:
      url = "/subPackages/mall/index";
      break;
    case HomeItemType.rank:
      url = "/subPackages/infinite/index";
      break;
    case HomeItemType.collect:
      url = "/subPackages/collect/index";
      break;
    case HomeItemType.welfare:
      url = "/subPackages/welfare/index";
      break;
    case HomeItemType.inGroup:
      showModal.value = true;
      return;
    case HomeItemType.integral:
      url = "/subPackages/infinite/index";
      break;
    default:
      break;
  }
  uni.navigateTo({
    url: url,
  });
};
</script>

<style lang="scss" scoped>
.newItem-row2 {
  padding-left: 18rpx;
  box-sizing: border-box;
  width: 100%;

  .scroll {
    width: 100%;
    white-space: nowrap;
  }

  .goods {
    display: inline-block;
    position: relative;
    width: calc(166rpx * 1);
    height: calc(188rpx * 1);
    margin-right: 12rpx;

    .img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
