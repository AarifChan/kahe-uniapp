<template>
    <div class="home-bulletin">
        <image src="https://jms.85gui7.com/kahe-202510/ka-he/home/bulletin.png" class="img" />
        <div class="bulletin-content">
           <TnNoticeBar :data="noticeData" :auto-play="true" :loop="true"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import TnNoticeBar from '@tuniao/tnui-vue3-uniapp/components/notice-bar/src/notice-bar.vue'
const noticeData = [
  '任何脱离平台的场外玩法均存在极高的风险性，场外玩法造成的一切纠纷与平台无关。',
  '如遇商品运损或产品质量问题，请提供开箱视频联系在线客服处理',
  '非预售产品将按照发货先后顺序3~7个工作日内安排发货,如遇节假日会延缓1~7天发货。',
]
</script>

<style lang="scss" scoped>
.home-bulletin {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    background: #fff;
    height: 40rpx;
    overflow: hidden;
    margin-bottom: 12rpx;
    
    .img {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 115rpx;
        height: 40rpx;
        object-fit: cover;
        z-index: 3;
    }

    .bulletin-content {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        position: relative;
    }

    .scroll-wrapper {
        display: inline-flex;
        white-space: nowrap;
        transition: transform 0.05s linear;
    }

    .scroll-item {
        display: inline-block;
        padding-right: 124rpx;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        font-size: 26rpx;
        color: #000000;
        line-height: 37rpx;
    }
}
</style>
