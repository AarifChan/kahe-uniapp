<template>
  <scroll-view class="relative w-full h-screen" :scroll-y="true">
    <image class="w-full h-full" src="/static/kahe-202510/common/bg.png"></image>
    <view class="absolute left-0 top-0 w-full h-full flex flex-col">
      <view class="relative w-full h-328">
        <image
          class="absolute bottom-0 right-30 w-409 h-322"
          src="/static/kahe-202510/discount/discount-logo.png"
        />
        <image
          class="absolute top-82 left-68 w-295 h-150"
          src="/static/kahe-202510/discount/discount-title.png"
        />
      </view>
      <view class="relative px-18 box-border w-full">
        <Card />
      </view>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import Card from "./components/card/index.vue";
</script>

<style lang="scss" scoped></style>
