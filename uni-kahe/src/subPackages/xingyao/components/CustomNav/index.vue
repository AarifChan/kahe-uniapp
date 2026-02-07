<template>
  <view class="nav">
    <!--    <Lamp-->
    <!--      ref="lampRef"-->
    <!--      backGround="rgba(128, 128, 128, 0.6)"-->
    <!--      :border="0"-->
    <!--      :list="lampList"-->
    <!--      @tapLampAction="tapLampAction"-->
    <!--    />-->
    <view class="nav-box">
      <image src="https://jms.85gui7.com/kahe-202510/shine/nav.png" mode="scaleToFill" class="bg" />

      <!-- 这里是动态图片 -->
      <!--      <image src="https://jms.85gui7.com/kahe-202510/shine/title.png" mode="scaleToFill" class="goods" />-->
      <image
        mode="aspectFit"
        class="goods"
        :src="info?.prizePool[0].goodsDto.image"
      />
      <view class="contont">
        <view class="contont-triangle"></view>
        <view class="contont-triangle1"></view>
        <text class="contont-text">{{ info?.prizePool[0].goodsDto.name }}</text>
      </view>
      <view class="texts"> 本期赠品 </view>
      <view class="top">
        <image src="https://jms.85gui7.com/kahe-202510/shine/top.png" mode="scaleToFill" class="top-bg" />
        <text>第{{ info?.id ?? 0 }}期</text>
      </view>
    </view>
    <view class="nav-right">
      <view
        class="item"
        v-for="item in itemList"
        :key="item.key"
        :id="item.key"
        @tap.stop="tapNav(item)"
      >
        <image :src="item.icon" mode="scaleToFill" class="item-icon" />
        <view class="text">{{ item.text }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Lamp from "@/components/lamp/index.vue";
import { ShingingInfo } from "../../api/index";
import { PropType } from "vue";

const emit = defineEmits<{
  (e: "tapNav", item: any): void;
}>();
const props = defineProps({
  info: {
    default: {},
    type: Object as PropType<ShingingInfo>,
  },
  backGround: {
    type: String,
    default: "",
  },
  border: {
    type: Number,
    default: 4,
  },
  list: {
    type: Array,
    default: () => [],
  },
});
import { onMounted, Prop, ref, watch } from "vue";

const itemList = ref([
  { icon: "https://jms.85gui7.com/kahe-202510/shine/icon1.png", text: "规则", key: 1 },
  { icon: "https://jms.85gui7.com/kahe-202510/shine/icon2.png", text: "往期", key: 2 },
]);
const lampRef = ref();
const lampList = ref([
  {
    avatar: "https://jms.85gui7.com/kahe-202510/shine/item.png",
    userName: "啊权",
    content: "hhhhhhhhhhh",
  },
  {
    avatar: "https://jms.85gui7.com/kahe-202510/shine/item.png",
    userName: "啊权",
    content: "hhhhhhhhhhh",
  },
  {
    avatar: "https://jms.85gui7.com/kahe-202510/shine/item.png",
    userName: "啊权",
    content: "hhhhhhhhhhh",
  },
  {
    avatar: "https://jms.85gui7.com/kahe-202510/shine/item.png",
    userName: "啊权",
    content: "hhhhhhhhhhh",
  },
]);
const tapLampAction = (item: any) => {
  console.log("tapLampAction===>", item);
};
const tapNav = (item: string) => {
  emit("tapNav", item);
};
onMounted(() => {
  lampRef.value?.play(lampList.value, 3);
});
</script>

<style lang="scss" scoped>
.nav {
  position: relative;
  margin-top: 60rpx;
  width: 100%;
  height: 475rpx;
  display: flex;
  justify-content: center;

  &-box {
    position: relative;
    width: 468rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .bg {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .goods {
      margin: 46rpx 0 34rpx 0;
      width: 282rpx;
      height: 282rpx;
    }

    .contont {
      position: relative;
      width: 313rpx;
      height: 46rpx;
      background: #62e2fc;
      display: flex;
      justify-content: center;
      align-items: center;

      &-triangle {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-top: 20rpx solid transparent;
        border-right: 20rpx solid #fff;
        border-bottom: 0;
        border-left: 0;
      }

      &-triangle1 {
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        border-bottom: 20rpx solid transparent;
        border-left: 20rpx solid #fff;
        border-top: 0;
        border-right: 0;
      }

      &-text {
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 30rpx;
        color: #ffffff;
        line-height: 48rpx;
      }
    }

    .texts {
      position: absolute;
      bottom: 4rpx;
      left: 50%;
      transform: translateX(-50%);
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 26rpx;
      color: #ffffff;
      @include text-stroke-color(#000000);
    }

    .top {
      position: absolute;
      top: -66rpx;
      left: -92rpx;
      width: 201rpx;
      height: 80rpx;

      &-bg {
        position: relative;
        width: 100%;
        height: 100%;
      }

      text {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 22rpx;
        color: #ffffff;
      }
    }
  }

  &-right {
    position: absolute;
    right: 18rpx;
    top: 100rpx;
    z-index: 3;

    .item {
      position: relative;
      width: 82rpx;
      height: 94rpx;
      background-image: url("https://jms.85gui7.com/kahe-202510/shine/btn.png");
      background-size: 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 25rpx;

      &-icon {
        width: 41rpx;
        height: 46rpx;
      }

      .text {
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: -12rpx;
        left: 50%;
        transform: translateX(-50%);
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 26rpx;
        color: #fff;
        @include text-stroke-color(#000000);
      }
    }
  }
}
</style>
