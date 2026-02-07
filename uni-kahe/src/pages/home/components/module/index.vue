<template>
  <!-- <view class="newItem"> -->
  <!-- <view class="newItem-row1">
      <image class="newItem-item1" src="https://jms.85gui7.com/kahe-202510/ka-he/home/goods1.png" @tap.stop="handleItem(HomeItemType.activity)" />
      <image class="newItem-item2" src="https://jms.85gui7.com/kahe-202510/ka-he/home/goods2.png" @tap.stop="handleItem(HomeItemType.xingyao)" />
    </view> -->
  <view class="newItem-row2">
    <view
      class="goods"
      v-for="(item, index) in goodsList"
      :key="index"
      @tap.stop="handleItem(item.type)"
    >
      <view v-if="item.tag" class="goods-tag">
        <image class="icon" :src="item.tag" />
        <text class="contetx">{{ item.context }}</text>
      </view>
      <image class="img" :src="item.src" />
      <text
        class="goods-texts theme-font"
        :style="item.tag ? 'margin-top: 8rpx;' : 'margin-top: 45rpx;'"
        >{{ item.text }}</text
      >
    </view>
  </view>
  <in-group-modal v-model:show="showModal" @show-image="showInGroupImage" />
  <!-- </view> -->
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
// ✅ 把所有按钮配置放在数组中
const goodsList = ref([
  {
    src: "https://jms.85gui7.com/kahe-202510/ka-he/home/g1.png",
    type: HomeItemType.activity,
    tag: "https://jms.85gui7.com/kahe-202510/ka-he/home/m3.png",
    text: "抽选",
    context: "海量福利",
  },
  {
    src: "https://jms.85gui7.com/kahe-202510/ka-he/home/g2.png",
    type: HomeItemType.xingyao,
    text: "欧皇",
  },
  {
    src: "https://jms.85gui7.com/kahe-202510/ka-he/home/g3.png",
    type: HomeItemType.integral,
    tag: "https://jms.85gui7.com/kahe-202510/ka-he/home/m2.png",
    text: "宝藏岛",
    context: "免费夺宝",
  },
  {
    src: "https://jms.85gui7.com/kahe-202510/ka-he/home/g4.png",
    type: HomeItemType.dailyWelfare,
    text: "领券",
  },
  {
    src: "https://jms.85gui7.com/kahe-202510/ka-he/home/g5.png",
    type: HomeItemType.collect,
    tag: "https://jms.85gui7.com/kahe-202510/ka-he/home/m1.png",
    text: "集赏",
    context: "以物换物",
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
        current: "https://jms.85gui7.com/kahe-202510/ka-he/home/13395850645540676.pn",
        urls: ["https://jms.85gui7.com/kahe-202510/ka-he/home/13395850645540676.png"],
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
  margin-top: 10rpx;
  padding: 0 18rpx;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  // height: 192rpx;
  display: grid;
  gap: 20rpx;
  grid-template-columns: repeat(5, 1fr);

  .goods {
    position: relative;
    width: 100%;
    height: 130rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    &-texts {
      margin-top: 8rpx;
      position: relative;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 36rpx !important;
      color: #000000;
      line-height: 58rpx;
      z-index: 1;
    }

    &-tag {
      position: relative;
      width: 87rpx;
      height: 40rpx;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(40rpx, -15rpx);

      .icon {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .contetx {
        position: absolute;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 20rpx;
        color: #000000;
        line-height: 24rpx;
        margin-bottom: 6rpx;
      }
    }

    text {
      position: relative;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 20rpx;
      color: #000000;
      line-height: 24rpx;
    }
  }
}

// .newItem {
//     position: relative;
//     //  width: 100%;
//     // margin-top: -30rpx;

//     &-row1 {
//         width: 100%;
//         position: relative;
//         height: 204rpx;
//     }

//     &-item1 {
//         position: absolute;
//         left: 16rpx;
//         top: 0;
//         width: 378rpx;
//         height: 204rpx;
//     }

//     &-item2 {
//         position: absolute;
//         right: 16rpx;
//         top: 0;
//         width: 318rpx;
//         height: 203rpx;
//     }

//     &-item3 {
//         position: absolute;
//         left: 16rpx;
//         bottom: 0;
//         width: 218rpx;
//         height: 182rpx;
//     }

//     &-item4 {
//         position: absolute;
//         left: 244rpx;
//         bottom: 0;
//         width: 238rpx;
//         height: 192rpx;
//     }

//     &-item5 {
//         position: absolute;
//         right: 16rpx;
//         bottom: 0;
//         width: 242rpx;
//         height: 189rpx;
//     }
</style>
