<template>
  <view class="home-bulletin relative flex items-center w-709 h-60 mx-auto bg-white"
  >
    <image
      src="/static/kaju/common/notice-bg.png"
      class="img w-709 h-60"
      mode="aspectFit"
    />
    <view
      class="bulletin-content absolute left-120 top-0 bottom-0 z-1 flex items-center w-[calc(100%-200rpx)] overflow-hidden"
    >
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

<style lang="scss" scoped></style>
