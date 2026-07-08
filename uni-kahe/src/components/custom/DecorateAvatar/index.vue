<template>
  <view
    class="avatar"
    :style="scale ? `transform: scale(${scale});margin-left: 10rpx;` : ''"
  >
    <image class="avatar-bg" src="/static/kaju/mine/avatar-bg.png" />
    <image class="avatar-img" :src="avatar" />
    <!--        <image-->
    <!--            v-if="levelImage !== ''"-->
    <!--            class="avatar-decorate"-->
    <!--            :src="levelImage"-->
    <!--        />-->
  </view>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  avatar: {
    default: "",
    type: String,
  },
  level: {
    default: 0,
    type: Number,
  },
  scale: {
    type: Number,
    default: 1,
  },
});

const levelImage = computed(() => {
  const level = props.level;

  if (!level) {
    return "";
  }
  return `/static/kahe-202510/vip/${level}.png`;
});
</script>

<style lang="scss">
.avatar {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 154rpx;
  height: 157rpx;
  //border-radius: 50%;
  //transform: translate(0, 0);
  &-bg {
    width: 100%;
    height: 100%;
  }
  &-decorate {
    position: absolute;
    left: -44rpx;
    top: -38rpx;
    width: 220rpx;
    height: 220rpx;
  }
  &-title {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 14rpx;
    text-align: center;
    font-weight: 600;
    font-size: 26rpx;
    color: #6d9dff;
  }

  &-img {
    position: absolute;
    left: 18rpx;
    top: 16rpx;

    width: 120rpx;
    height: 120rpx;
    border-radius: 60rpx;
  }
}
</style>
