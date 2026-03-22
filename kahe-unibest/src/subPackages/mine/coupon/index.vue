<template>
  <view class="coupon">
    <image class="coupon-bg" src="https://jms.85gui7.com/kahe-202510/common/common-bg.png" />
    <view class="coupon-content">
      <view class="coupon-content-tab">
        <view
          v-for="(item, index) in tabList"
          :key="index"
          class="coupon-content-tab-item"
          @tap.stop="tabDidChange(index)"
        >
          <image
            v-if="current === index"
            class="coupon-content-tab-item-bg"
            src="https://jms.85gui7.com/kahe-202510/coupon/tab1.png"
          />
          <view
            class="coupon-content-tab-item-title theme-font"
            :style="{ color: current === index ? '#fff' : '#c4aa73' }"
          >
            {{ item }}
          </view>
        </view>
      </view>
      <scroll-view
        class="coupon-content-content"
        :enable-flex="true"
        :scroll-y="true"
        scroll-with-animation
        @scrolltolower="scrollToLower"
      >
        <view class="coupon-content-content-list">
          <item
            v-for="(item, index) in dataList"
            :id="`coupon-content-list-box:id${index}`"
            :key="`coupon-list-box:key${index}`"
            :item="item"
            @tap.stop="useAction(item)"
          />
        </view>
        <empty :show="dataList.length === 0" />
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { UICouponModel } from '@/model'
import { computed, onMounted, ref } from 'vue'
import Empty from '@/components/empty/index.vue'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import { eventBus } from '@/utils/event'
import { getPageOptions } from '@/utils/tools'
import Item from './components/item.vue'

const userStore = useUserStore()
const appStore = useAppStore()

const pageParams = ref({
  page: 1,
  limit: 10,
  total: 1,
})

const tabList = ref(['可使用', '已使用', '已失效'])

const dataList = computed((): UICouponModel[] => userStore.couponList)

async function loadData() {
  pageParams.value.total = await userStore.getCouponList({
    page: pageParams.value.page,
    limit: pageParams.value.limit,
    status: current.value,
  })
}

const needSelect = ref(false)

function tabDidChange(index: number) {
  current.value = index
  loadData()
}

function useAction(item: UICouponModel) {
  if (item.status === 0) {
    if (needSelect.value) {
      eventBus.emit('didSelectCoupon', item)
      uni.navigateBack()
      return
    }
    uni.navigateBack()
    appStore.changeCurrentTabIndex(0)
  }
}

onMounted(() => {
  const op = getPageOptions()
  const selected = op.needSelect
  if (selected) {
    needSelect.value = selected
  }
  loadData()
})

const current = ref(0)

function scrollToLower() {
  if (pageParams.value.page < pageParams.value.total) {
    pageParams.value.page++
    loadData()
  }
}
</script>

<style lang="scss">
  .coupon {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: $main-bg;
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
    &-tab {
      position: relative;
      padding: 16rpx 32rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      &-item {
        position: relative;
        width: 182rpx;
        height: 70rpx;
        background-color: rgba($color: #ffffff, $alpha: 0.6);
        &-bg {
          width: 100%;
          height: 100%;
        }

        &-title {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          line-height: 70rpx;
          font-size: 36rpx;
          color: #c4aa73;
          font-weight: 400;
          text-align: center;
        }
      }
    }
    &-content {
      position: relative;
      width: 100%;
      height: calc(100vh - 60px - env(safe-area-inset-bottom));

      &-list {
        padding: 0 15px;
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
