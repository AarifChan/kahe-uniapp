<template>
  <view class="coupon relative w-full h-screen bg-main-bg">
    <image class="coupon-bg w-full h-full" src="/static/kahe-202510/common/common-bg.png" /> <!-- 缺失图片: common-bg.png -->
    <view class="coupon-content absolute left-0 top-0 w-full h-full flex flex-col">
      <view class="coupon-content-tab relative px-32 py-16 box-border flex flex-row items-center justify-between w-full">
        <view
          v-for="(item, index) in tabList"
          :key="index"
          class="coupon-content-tab-item relative w-182 h-70"
          :style="{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }"
          @tap.stop="tabDidChange(index)"
        >
          <image
            v-if="current === index"
            class="coupon-content-tab-item-bg w-full h-full"
            src="/static/kahe-202510/coupon/tab1.png"
          />
          <view
            class="coupon-content-tab-item-title absolute left-0 top-0 w-full leading-70 text-36 text-[#c4aa73] font-400 text-center theme-font"
            :style="{ color: current === index ? '#fff' : '#c4aa73' }"
            >{{ item }}</view
          >
        </view>
      </view>
      <scroll-view
        class="coupon-content-content relative w-full"
        :enable-flex="true"
        :scroll-y="true"
        scroll-with-animation
        @scrolltolower="scrollToLower"
        :style="{ height: 'calc(100vh - 60px - env(safe-area-inset-bottom))' }"
      >
        <view class="coupon-content-content-list w-full box-border" style="padding: 0 15px">
          <item
            v-for="(item, index) in dataList"
            :id="'coupon-content-list-box:id' + index"
            :key="'coupon-list-box:key' + index"
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
  import { UserModule } from '@/store/modules/user'
  import { ref, computed, onMounted } from 'vue'
  import { AppModule } from '@/store/modules/app'
  import { eventBus } from '@/utils/event'
  import Item from './components/item.vue'
  import Empty from '@/components/empty/index.vue'
  import { getPageOptions } from '@/utils/tools'
  import { c } from 'vite/dist/node/types.d-aGj9QkWt'

  const pageParams = ref({
    page: 1,
    limit: 10,
    total: 1
  })

  const tabList = ref(['可使用', '已使用', '已失效'])

  const dataList = computed((): UICouponModel[] => UserModule.couponList)

  const loadData = async () => {
    pageParams.value.total = await UserModule.getCouponList({
      page: pageParams.value.page,
      limit: pageParams.value.limit,
      status: current.value
    })
  }

  const needSelect = ref(false)

  const tabDidChange = (index: number) => {
    current.value = index
    loadData()
  }

  const useAction = (item: UICouponModel) => {
    if (item.status === 0) {
      if (needSelect.value) {
        eventBus.emit('didSelectCoupon', item)
        uni.navigateBack()
        return
      }
      uni.navigateBack()
      AppModule.changeCurrentTabIndex(0)
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

  const scrollToLower = () => {
    if (pageParams.value.page < pageParams.value.total) {
      pageParams.value.page++
      loadData()
    }
  }
</script>

<style lang="scss" scoped>
</style>
