<template>
  <view class="collectRecord">
    <image class="collectRecord-bg" src="https://jms.85gui7.com/kahe-202510/collect/c-bg.png" />
    <view class="collectRecord-content">
      <view class="collectRecord-content-tab">
        <view class="collectRecord-content-tab-item" @tap.stop="didClickTab(0)">
          <image
            v-if="current === 0"
            class="collectRecord-content-tab-item-bg"
            src="https://jms.85gui7.com/kahe-202510/collect/btn3.png"
          />
          <view
            class="collectRecord-content-tab-item-title theme-font"
            :style="{ color: current === 0 ? '#693301' : '#60B1EC' }"
            >我参与的</view
          >
        </view>
        <view class="collectRecord-content-tab-item" @tap.stop="didClickTab(1)">
          <image
            v-if="current === 1"
            class="collectRecord-content-tab-item-bg"
            src="https://jms.85gui7.com/kahe-202510/collect/btn3.png"
          />
          <view
            class="collectRecord-content-tab-item-title theme-font"
            :style="{ color: current === 1 ? '#693301' : '#60B1EC' }"
            >好友帮我</view
          >
        </view>
      </view>
      <scroll-view
        class="collectRecord-content-list"
        scroll-y
        @scrolltolower="handleScrollToLower"
      >
        <view
          v-for="(item, index) in dataList"
          :key="'collectRecord' + index"
          class="collectRecord-content-list-item"
        >
          <image
            class="collectRecord-content-list-item-bg"
            src="https://jms.85gui7.com/kahe-202510/collect/item-bg.png"
          />
          <view class="collectRecord-content-list-item-content">
            <view class="collectRecord-content-list-item-content-top">
              <view class="collectRecord-content-list-item-content-top-left">
                <image
                  class="collectRecord-content-list-item-content-top-left-avatar"
                  :src="current === 0 ? item.user?.avatar : item.helper?.avatar"
                />
                <view
                  class="collectRecord-content-list-item-content-top-left-info"
                >
                  <view
                    class="collectRecord-content-list-item-content-top-left-info-title"
                    >{{
                      current === 0
                        ? item.user?.nickname
                        : item.helper?.nickname
                    }}</view
                  >
                  <view
                    class="collectRecord-content-list-item-content-top-left-info-title"
                    >ID:{{
                      current === 0 ? item.user?.uid : item.helper?.uid
                    }}</view
                  >
                </view>
              </view>
              <view class="collectRecord-content-list-item-content-top-right">{{
                item.createTime
              }}</view>
            </view>
            <view class="collectRecord-content-list-item-content-line" />
            <view class="collectRecord-content-list-item-content-bottom">
              <view class="collectRecord-content-list-item-content-bottom-left">
                <image
                  class="collectRecord-content-list-item-content-bottom-left-logo"
                  :src="item.logo"
                  mode="heightFix"
                />
                <view
                  class="collectRecord-content-list-item-content-bottom-left-title text-flow-ellipsis-single"
                  >{{ item.name }}</view
                >
              </view>
              <view
                style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  gap: 24rpx;
                "
              >
                <view
                  class="collectRecord-content-list-item-content-bottom-right"
                  >+{{ item.amount }}助力值</view
                >
                <view
                  class="collectRecord-content-list-item-content-bottom-thank"
                  v-if="current === 1"
                  @tap.stop="handleThank(item)"
                >
                  <image
                    class="collectRecord-content-list-item-content-bottom-thank-bg"
                    :src="
                      item.isThanked
                        ? 'https://jms.85gui7.com/kahe-202510/collect/btn5.png'
                        : 'https://jms.85gui7.com/kahe-202510/collect/btn4.png'
                    "
                  />
                  <view
                    class="collectRecord-content-list-item-content-bottom-thank-title theme-font"
                    >感谢</view
                  >
                </view>
              </view>
            </view>
          </view>
          <image
            class="collectRecord-content-list-item-decorate"
            :src="
              current === 0
                ? 'https://jms.85gui7.com/kahe-202510/collect/label1.png'
                : 'https://jms.85gui7.com/kahe-202510/collect/label2.png'
            "
          />
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  CollectOrderItem,
  getCollectOrderRequest,
  handleCollectThankRequest,
} from "@/api/collect";
import { ShowToast } from "@/utils";

const params = ref({
  page: 1,
  limit: 10,
  type: 0,
});
const current = ref(0);

const total = ref(0);
const dataList = ref<CollectOrderItem[]>([]);
const didClickTab = (index: number) => {
  current.value = index;
  params.value.page = 1;
  dataList.value = [];
  params.value.type = index;
  getCollectOrderList();
};

onMounted(() => {
  getCollectOrderList();
});

const handleThank = async (item: CollectOrderItem) => {
  if (item.isThanked) {
    return;
  }
  const resp = await handleCollectThankRequest(item.id);
  if (resp.code === 200) {
    item.isThanked = true;
  }
};
const getCollectOrderList = async () => {
  const resp = await getCollectOrderRequest(params.value);
  if (resp.code === 200) {
    const list =
      params.value.page === 1 ? new Array<CollectOrderItem>() : dataList.value;
    resp.data.content.forEach((item) => {
      list.push(item);
    });
    dataList.value = list;
    total.value = resp.data.totalElements;
  } else {
    ShowToast(resp.msg);
  }
};
const handleScrollToLower = () => {
  if (total.value > params.value.page * params.value.limit) {
    params.value.page++;
    getCollectOrderList();
  }
};
</script>

<style lang="scss" scoped>
.collectRecord {
  position: relative;
  width: 100%;
  height: 100vh;
  &-bg {
    width: 100%;
    height: 100%;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 32rpx;
    box-sizing: border-box;
    height: calc(100% - 64rpx - env(safe-area-inset-bottom));

    &-tab {
      width: 100%;
      height: 60rpx;
      background: #3274a4;
      border-radius: 10rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      &-item {
        position: relative;
        width: 100%;
        height: 100%;
        &-bg {
          width: 100%;
          height: 100%;
        }
        &-title {
          position: absolute;
          left: 0;
          top: 0;
          line-height: 60rpx;
          width: 100%;
          text-align: center;
          font-weight: 400;
          font-size: 30rpx;
        }
      }
    }

    &-list {
      margin-top: 32rpx;
      position: relative;
      width: 100%;
      height: calc(100% - 64rpx - 60rpx);
      display: flex;
      flex-direction: column;

      &-item {
        position: relative;
        width: 100%;
        aspect-ratio: 698 / 242;
        border-radius: 10rpx;
        margin-bottom: 24rpx;

        &-bg {
          width: 100%;
          height: 100%;
        }
        &-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 9rpx;
          box-sizing: border-box;
          &-top {
            padding: 0 24rpx;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 124rpx;
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
              &-info {
                margin-left: 12rpx;
                display: flex;
                flex-direction: column;
                &-title {
                  margin: 5rpx 0;
                  font-weight: 400;
                  font-size: 24rpx;
                  color: #000000;
                }
              }
            }
            &-right {
              font-weight: 400;
              font-size: 24rpx;
              color: #616161;
            }
          }
          &-line {
            width: 674rpx;
            height: 2rpx;
            background: linear-gradient(-90deg, #86b8ef, #abd3ff);
          }
          &-bottom {
            padding: 0 24rpx;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 124rpx;
            justify-content: space-between;
            &-left {
              display: flex;
              flex-direction: row;
              align-items: center;
              &-logo {
                width: 80rpx;
                height: 80rpx;
              }
              &-title {
                margin-left: 16rpx;
                font-weight: 400;
                font-size: 24rpx;
                color: #000000;
                width: 200rpx;
              }
            }
            &-right {
              font-weight: 400;
              font-size: 24rpx;
              color: #000000;
            }
            &-thank {
              position: relative;
              width: 111rpx;
              height: 41rpx;
              &-bg {
                width: 100%;
                height: 100%;
              }
              &-title {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                z-index: 2;
                text-align: center;
                line-height: 41rpx;
                font-weight: 400;
                font-size: 24rpx;
                color: #ffffff;
              }
            }
          }
        }
        &-decorate {
          position: absolute;
          right: 0;
          top: 0;
          width: 85rpx;
          height: 52rpx;
        }
      }
    }
  }
}
</style>
