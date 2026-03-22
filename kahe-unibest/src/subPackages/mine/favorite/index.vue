<template>
  <view class="favorite">
    <tab
      v-model:current="current"
      :list="tabList"
      :search="true"
      @did-click="handleClick"
    />

    <scroll-view
      class="favorite-content"
      :scroll-y="true"
      @scrolltolower="handleScrollToLower"
    >
      <view class="favorite-content-list">
        <view
          class="favorite-content-list-item"
          v-for="(item, index) in dataList"
          :key="'index' + index"
          @tap.stop="handleClickItem(item)"
        >
          <image class="favorite-content-list-item-logo" :src="item.logo" />
          <view class="favorite-content-list-item-info">
            <view class="favorite-content-list-item-info-title theme-font">{{
              item.title
            }}</view>
            <view class="favorite-content-list-item-info-subTitle theme-font"
              >编号{{ item.boxSeqNo }}</view
            >
            <view class="favorite-content-list-item-info-price price-font">{{
              item.price
            }}</view>
          </view>
          <view
            class="favorite-content-list-item-btn theme-font"
            @tap.stop="handleRemove(item.productId)"
            >移出收藏</view
          >
        </view>
      </view>
      <empty :show="dataList.length === 0" />
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import Tab from "./components/tab/index.vue";
import Empty from "@/components/empty/index.vue";
import { onMounted } from "vue";
import { useFavorite } from "@/composables/favorite";
const {
  getFavoriteList,
  cancelFavorite,
  handleScrollToLower,
  handleClickItem,
  dataList,
  current,
  tabList,
} = useFavorite();

onMounted(() => {
  getFavoriteList();
});

const handleRemove = async (pId: number) => {
  console.log("remove:", pId);
  await cancelFavorite(pId);
};

const handleClick = () => {
  getFavoriteList();
};
</script>

<style lang="scss" scoped>
.favorite {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #f7daa1, #fff3dc);
  &-content {
    position: relative;
    width: 100%;
    height: calc(100vh - 100rpx);
    padding: 0 32rpx;
    box-sizing: border-box;
    &-list {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 32rpx;
      &-item {
        position: relative;
        padding: 32rpx;
        box-sizing: border-box;
        background: #fffbef;
        box-shadow: 0rpx 3rpx 7rpx 0rpx rgba(217, 190, 134, 0.5);
        border-radius: 20rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        &-logo {
          width: 190rpx;
          height: 190rpx;
          border-radius: 14rpx;
        }
        &-info {
          margin-left: 19rpx;
          display: flex;
          flex-direction: column;
          &-title {
            font-weight: 400;
            font-size: 40rpx;
            color: #000000;
          }
          &-subTitle {
            margin-top: 20rpx;
            font-weight: 400;
            font-size: 30rpx;
            color: #000000;
          }
          &-price {
            margin-top: 42rpx;
            font-weight: 400;
            font-size: 50rpx;
            color: #000000;
            line-height: 26rpx;
          }
        }
        &-btn {
          position: absolute;
          right: 32rpx;
          bottom: 32rpx;
          width: 146rpx;
          height: 56rpx;
          background: #53d6ac;
          box-shadow: 0rpx 4rpx 0rpx 0rpx #43a17f;
          border-radius: 8rpx;
          text-align: center;
          line-height: 56rpx;
          color: whitesmoke;
          font-weight: 400;
          font-size: 30rpx;
        }
      }
    }
  }
}
</style>
