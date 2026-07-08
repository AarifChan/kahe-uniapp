<template>
  <view class="home-bulletin">
    <image
      src="/static/kaju/common/notice-bg.png"
      class="img"
      mode="aspectFit"
    />
    <view class="bulletin-content">
      <TnNoticeBar
        :data="noticeData"
        :auto-play="true"
        :loop="true"
        text-color="#000000"
        bg-color="transparent"
        font-size="26"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import TnNoticeBar from "@tuniao/tnui-vue3-uniapp/components/notice-bar/src/notice-bar.vue";
const noticeData = [
  "任何脱离平台的场外玩法均存在极高的风险性，场外玩法造成的一切纠纷与平台无关。",
  "如遇商品运损或产品质量问题，请提供开箱视频联系在线客服处理",
  "非预售产品将按照发货先后顺序3~7个工作日内安排发货,如遇节假日会延缓1~7天发货。",
];
</script>

<style lang="scss" scoped>
.home-bulletin {
  position: relative;
  display: flex;
  align-items: center;
  width: 709rpx;
  height: 60rpx;
  margin: 0 auto;
  background: #fff;

  .img {
    width: 709rpx;
    height: 60rpx;
  }

  /* Position text to the right of the "公告" label on the left side of the banner. */
  .bulletin-content {
    position: absolute;
    left: 120rpx;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    width: calc(100% - 200rpx);
    overflow: hidden;
  }
}
</style>
