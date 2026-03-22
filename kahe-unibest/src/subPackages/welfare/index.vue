<template>
  <view class="welfare">
    <image class="welfare-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/welfare/bg.png" />
    <view class="welfare-content">
      <image class="welfare-content-top" src="https://jms.85gui7.com/kahe-202510/welfare/top-bg.png" />
      <view class="welfare-content-padding">
        <image
          v-for="(item, index) in itemList"
          :key="`card${index}`"
          class="welfare-content-padding-item"
          :src="`https://jms.85gui7.com/kahe-202510/welfare/card${index + 1}.png`"
          @tap.stop="clickItem(item)"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAppStore } from '@/store/app'
import { ShowToast } from '@/utils'

import { eventBus } from '@/utils/event'

const appStore = useAppStore()
enum WelfareItemType {
  vip = 0,
  activity = 1,
  integral = 2,
  redBag = 3,
  chest = 4,
  discount = 5,
}
export interface WelfareItem {
  itemType: WelfareItemType
  image: string
}
function clickItem(item: WelfareItem) {
  switch (item.itemType) {
    case WelfareItemType.vip:
      uni.navigateTo({
        url: '/subPackages/mine/vip/index',
      })
      break
    case WelfareItemType.activity:
      uni.navigateTo({
        url: '/subPackages/product/welfare/index',
      })
      break
    case WelfareItemType.integral:
      uni.navigateBack()
      eventBus.emit('reloadProductTab', 4)
      break
    case WelfareItemType.redBag:
      uni.navigateBack()
      setTimeout(() => {
        appStore.changeBoxTabIndex(4)
        appStore.changeCurrentTabIndex(3)
      }, 200)

      break
    case WelfareItemType.chest:
      uni.navigateBack()
      setTimeout(() => {
        appStore.changeBoxTabIndex(3)
        appStore.changeCurrentTabIndex(3)
      })

      break
    case WelfareItemType.discount:
      ShowToast('正在准备中，尽请期待')
      return
      uni.navigateTo({
        url: '/subPackages/discount/index',
      })
      break
    default:
      break
  }
}

const itemList = ref([
  {
    image: 'https://jms.85gui7.com/kahe-202510/welfare/card1.png',
    itemType: WelfareItemType.vip,
  },
  {
    image: 'https://jms.85gui7.com/kahe-202510/welfare/card2.png',
    itemType: WelfareItemType.activity,
  },
  {
    image: 'https://jms.85gui7.com/kahe-202510/welfare/card3.png',
    itemType: WelfareItemType.integral,
  },
  {
    image: 'https://jms.85gui7.com/kahe-202510/welfare/card4.png',
    itemType: WelfareItemType.redBag,
  },
  {
    image: 'https://jms.85gui7.com/kahe-202510/welfare/card5.png',
    itemType: WelfareItemType.chest,
  },
  {
    image: 'https://jms.85gui7.com/kahe-202510/welfare/card6.png',
    itemType: WelfareItemType.discount,
  },
])
</script>

<style lang="scss" scoped>
.welfare {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &-bg {
    position: relative;
    width: 100%;
    height: 100vh;
  }
  &-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    &-top {
      width: 100%;
      height: 463rpx;
    }
    &-padding {
      box-sizing: border-box;
      width: 100%;
      padding: 0 30rpx;
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc((100% - 32rpx) / 2), 1fr)
      ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
      grid-gap: 32rpx; // 这是网格间的间隙，根据需要调整
      &-item {
        width: 100%;
        aspect-ratio: 338 / 181;
      }
    }
  }
}
</style>
