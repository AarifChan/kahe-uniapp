<template>
  <view class="favorite relative w-full h-screen"
    :style="{ background: 'linear-gradient(180deg, #f7daa1, #fff3dc)' }"
  >
    <tab
      v-model:current="current"
      :list="tabList"
      :search="true"
      @did-click="handleClick"
    />

    <scroll-view
      class="favorite-content relative w-full px-32 box-border"
      :scroll-y="true"
      @scrolltolower="handleScrollToLower"
      :style="{ height: 'calc(100vh - 100rpx)' }"
    >
      <view class="favorite-content-list relative w-full flex flex-col gap-32">
        <view
          class="favorite-content-list-item relative p-32 box-border rounded-20 flex flex-row items-center"
          :style="{ background: '#fffbef', boxShadow: '0rpx 3rpx 7rpx 0rpx rgba(217, 190, 134, 0.5)' }"
          v-for="(item, index) in dataList"
          :key="'index' + index"
          @tap.stop="handleClickItem(item)"
        >
          <image class="favorite-content-list-item-logo w-190 h-190 rounded-14" :src="item.logo" />
          <view class="favorite-content-list-item-info ml-19 flex flex-col">
            <view class="favorite-content-list-item-info-title theme-font font-400 text-40 text-black">{{
              item.title
            }}</view>
            <view class="favorite-content-list-item-info-subTitle theme-font font-400 text-30 text-black"
              >编号{{ item.boxSeqNo }}</view
            >
            <view class="favorite-content-list-item-info-price price-font font-400 text-50 text-black leading-26">{{
              item.price
            }}</view>
          </view>
          <view
            class="favorite-content-list-item-btn theme-font absolute right-32 bottom-32 w-146 h-56 rounded-8 text-center leading-56 font-400 text-30"
            :style="{ background: '#53d6ac', boxShadow: '0rpx 4rpx 0rpx 0rpx #43a17f', color: 'whitesmoke' }"
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
</style>
