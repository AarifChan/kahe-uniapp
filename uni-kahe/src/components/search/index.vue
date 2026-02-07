<template>
  <view class="search">
    <view class="search-content">
      <input
        v-model="search"
        :placeholder="placeholder"
        class="search-content-input"
        :trim="true"
        :clearable="true"
        :placeholderStyle="placeholderStyle"
      />
      <image
        v-if="black"
        @tap.stop="emits('didTapSearch', search)"
        class="search-content-iconNew"
        src="https://jms.85gui7.com/kahe-202510/ka-he/home/search-new.png"
      />
      <image
        v-else
        @tap.stop="emits('didTapSearch', search)"
        class="search-content-icon"
        src="https://jms.85gui7.com/kahe-202510/ka-he/common/search.png"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineProps({
  placeholder: {
    default: "输入关键字",
    type: String,
  },
  black: {
    default: false,
    type: Boolean,
  },
});
const search = ref("");
const placeholderStyle = "color: #A7A7A7; font-size: 14px;height:16px;";
const emits = defineEmits(["didTapSearch"]);
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 100%;
  &-content {
    position: relative;
    width: 100%;
    height: 67rpx;
    background: #ffffff;
    border-radius: 30rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 2px solid #000000;

    &-input {
      padding-left: 16rpx;
      font-size: 28rpx;
      color: #000000;
      width: calc(100% - 100rpx);
    }
    &-icon {
      width: 107rpx;
      height: 59rpx;
    }
    &-iconNew {
      width: 38rpx;
      height: 38rpx;
      margin-right: 16rpx;
    }
  }
}
</style>
