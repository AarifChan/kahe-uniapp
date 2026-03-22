<template>
  <scroll-view class="page" :scroll-y="true">
    <view class="title">【卡品纠纷参考】</view>
    <view class="row">
      ① 因商品存在版本、品牌商、工艺不同，标准判定会存在轻微差异；
    </view>
    <view class="row"> ② 交易纠纷以客服介入后的咨询结果为参考答复 </view>
    <view class="row">③ 购买方录制商品开箱视频，以作为交易纠纷时凭证。 </view>
    <view class="title">一.流通品相</view>
    <view
      >出厂所致:出厂切割导致的轻微毛边，出厂印刷的墨点或印刷线；卡牌正常受潮不明显的轻微弯曲，卡背轻微污渍且污渍面积小于背面面积的1/2，流通过程中出现的轻微痕迹，或背后可有轻微白点白边白角，轻微的脱色，划痕等暗伤不超过两处等不影响正面观赏和整体卡面的轻微不明显的点。</view
    >
    <image class="img" src="https://jms.85gui7.com/kahe-202510/common/mpg1.png" mode="widthFix" />
    <view class="title">二.瑕疵品相</view>
    <view
      >肉眼易见三处或以上的白角、白边、正反面划痕、翘边翘角，非自然受潮变形(包括折痕)，明显的白角、白边、正反面划痕、翘边翘角、凹凸坑、压痕、较为明显的脱色，或者卡背污渍面积大于背面面积的1/2都视为瑕疵品相。如果覆盖区域较大且有多处相同瑕疵，则按损伤品相，瑕疵品相卡片整体无折损，适宜摆本。</view
    >
    <image class="img" src="https://jms.85gui7.com/kahe-202510/common/mpg2.png" mode="widthFix" />
    <view class="title">三.损伤品相</view>
    <view
      >大面积白边、白点、多处或深刻划痕、折痕、大而明显或不规则性影响卡面的痕迹，严重的角损、卡面被裁切、液体浸湿过痕迹、污渍或墨水、贯穿卡面的伤害，人为的修复痕迹，严重的碎裂、撕裂、修剪(卡片上的切割痕迹)、食物和饮料或其他痕迹。</view
    >
    <image class="img" src="https://jms.85gui7.com/kahe-202510/common/mpg3.png" mode="widthFix" />
    <view class="title">四.评级卡 （流通品相）</view>
    <view
      >评级卡默认为流通品相，可能存在卡壳带有轻微气泡、卡壳上有轻微划痕，轻微可擦拭污渍；评级机构装裱商品后，非人为二次导致的卡壳内含有灰尘、碎屑或者颗粒物，均属正常情况；
    </view>
    <image class="img" src="https://jms.85gui7.com/kahe-202510/common/mpg4.png" mode="widthFix" />
  </scroll-view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.page {
  padding: 32rpx;
  background: $main-bg;
  width: 100%;
  height: 100vh;
}
.title {
  margin-top: 16rpx;
}
.img {
  width: 100%;
}
</style>
