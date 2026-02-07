<template>
  <view class="groupBuyResult">
    <view class="groupBuyResult-content">
      <view class="groupBuyResult-content-top">
        <image
          class="groupBuyResult-content-top-live"
          src="https://jms.85gui7.com/kahe-202510/groupBuy/result-bg.png"
          @tap.stop="showLiveAddress"
        />
        <view class="groupBuyResult-content-top-tab">
          <view
            class="groupBuyResult-content-top-tab-item theme-font"
            :class="current === 1 ? 'active-tab' : ''"
            @tap.stop="didClickTab(1)"
            >其他卡片</view
          >
          <view
            class="groupBuyResult-content-top-tab-item theme-font"
            :class="current === 2 ? 'active-tab' : ''"
            @tap.stop="didClickTab(2)"
            >精美卡片</view
          >
        </view>
      </view>
      <scroll-view
        class="groupBuyResult-content-list"
        scroll-y
        @scrolltolower="handleScrollToLower"
      >
        <view
          class="groupBuyResult-content-list-item"
          v-for="(item, index) in mindCardList"
          :key="'recordList' + index"
        >
          <view class="groupBuyResult-content-list-item-left">
            <view class="groupBuyResult-content-list-item-left-top">
              <view class="groupBuyResult-content-list-item-left-top-left">
                <image
                  class="groupBuyResult-content-list-item-left-top-left-avatar"
                  :src="item.user.avatar"
                />
                <view
                  class="groupBuyResult-content-list-item-left-top-left-title"
                  >{{ item.user.nickname }}</view
                >
              </view>
              <view class="groupBuyResult-content-list-item-left-top-right">{{
                item.updateTime
              }}</view>
            </view>
            <view class="groupBuyResult-content-list-item-left-bottom">
              <view class="groupBuyResult-content-list-item-left-bottom-title"
                >#{{ item.number }} {{ item.name }}</view
              >
            </view>
          </view>
          <image
            class="groupBuyResult-content-list-item-right"
            :src="item.image"
            mode="heightFix"
          />
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getPageOptions } from "@/utils/tools";
import { useGroupBuy } from "@/subPackages/groupBuy";

const current = ref(1);

const {
  mindCardList,
  currentSid,
  getGroupBuyMineLog,
  logLevel,
  handleScrollToLower,
  queryParams,
  getGroupBuyDetail,
  groupBuyDetail,
} = useGroupBuy();

const didClickTab = (index: number) => {
  current.value = index;
  logLevel.value = index;
  queryParams.value.page = 1;
  getGroupBuyMineLog();
};
const showLiveAddress = () => {
  uni.previewImage({
    current: groupBuyDetail.value.liveAddress,
    urls: [groupBuyDetail.value.liveAddress],
  });
};

onMounted(() => {
  const id = getPageOptions().id;
  if (id) {
    currentSid.value = id;
    logLevel.value = current.value;
    getGroupBuyDetail(Number(id));
    getGroupBuyMineLog();
  }
});
</script>

<style lang="scss" scoped>
.groupBuyResult {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000000;

  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100vh - env(safe-area-inset-bottom) - 24rpx);
    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    &-top {
      position: relative;
      width: 100%;
      padding: 32rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      &-live {
        width: 100%;
        aspect-ratio: 708 / 84;
      }

      &-tab {
        margin: 30rpx 0 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        &-item {
          margin: 0 40rpx;
          font-weight: 400;
          font-size: 30rpx;
          color: #868686;
          width: 239rpx;
          height: 50rpx;
          line-height: 50rpx;
          text-align: center;
          border: 2rpx solid #868686;
          border-radius: 10rpx;
        }
      }
    }

    &-list {
      position: relative;
      width: 100%;
      height: calc(100vh - 204rpx - env(safe-area-inset-bottom));
      padding: 0 32rpx;
      box-sizing: border-box;
      &-item {
        padding: 18rpx;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background: #ffffff;
        border-radius: 10rpx;
        margin-bottom: 24rpx;

        &-left {
          display: flex;
          flex-direction: column;
          &-top {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            &-left {
              display: flex;
              flex-direction: row;
              align-items: center;

              &-avatar {
                width: 84rpx;
                height: 84rpx;
                border-radius: 42rpx;
              }
              &-title {
                margin-left: 12rpx;
                font-weight: 400;
                font-size: 24rpx;
                color: #616161;
              }
            }

            &-right {
              font-weight: 400;
              font-size: 24rpx;
              color: #616161;
            }
          }
          &-bottom {
            margin-top: 24rpx;
            &-title {
              font-weight: 400;
              font-size: 26rpx;
              color: #000000;
            }
          }
        }
        &-right {
          height: 132rpx;
          width: 132rpx;
        }
      }
    }
  }
}
.active-tab {
  color: #ffd3a2;
  background: linear-gradient(180deg, #764925, #764925);
  border: 2rpx solid #af7f55;
}
</style>
