<template>
    <view class="bottom-bg">
        <view class="bottom-bg-context">

            <view class="bottom-bg-context-placeholder"></view>
        </view>
    </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .bottom-bg {
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    &-context {
      position: relative;
      width: 100%;
      &-bg {
        position: relative;
        width: 100%;
      }
      &-placeholder {
        margin-top: -10px;
        background-color: #FFFFFF;
        width: 100%;
        height: calc(env(safe-area-inset-bottom) + 10px);
      }
    }
  }
</style>
