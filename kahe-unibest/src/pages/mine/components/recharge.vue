<template>
  <tn-popup v-model="vShow" open-direction="bottom" bg-color="#DFEFFF" @close="emits('update:show', false)">
    <view class="recharge">
      <view class="recharge-top">
        <image class="recharge-top-bg" src="https://jms.85gui7.com/kahe-202510/images/recharge-title.png" />
        <view class="recharge-top-title theme-font">
          充值余额
        </view>
        <image class="recharge-top-close" src="https://jms.85gui7.com/kahe-202510/images/recharge-close.png" @tap.stop="emits('update:show', false)" />
      </view>
      <view class="recharge-content">
        <view class="recharge-content-option">
          <view class="recharge-content-option-content">
            <text class="recharge-content-option-content-title">选择充值金额</text>
            <scroll-view
              class="recharge-content-option-content-list"
              :enable-flex="true"
              :scroll-y="true"
              scroll-with-animation
            >
              <view class="recharge-content-option-content-list-content">
                <view
                  v-for="(item, index) in list"
                  :key="index"
                  :class="index === current ? 'recharge-content-option-content-list-itemSelect' : 'recharge-content-option-content-list-item'"
                  @tap.stop="didClickItem(index)"
                >
                  ¥{{ item.price }}
                </view>
              </view>
            </scroll-view>
            <view class="recharge-content-option-content-bottom">
              <custom-button title="确定充值" @tap.stop="didClickRecharge" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { RechargeModel } from '@/model'
import { ref, watch } from 'vue'
import CustomButton from '@/components/custom/button/index.vue'

import { useUserStore } from '@/store/user'
import { hideLoading, showLoading, ShowToast } from '@/utils'

const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  list: {
    default: () => [],
    type: Array as PropType<RechargeModel[]>,
  },
})

const emits = defineEmits(['update:show'])

const userStore = useUserStore()

const vShow = ref(false)

watch(() => props.show, (value) => {
  vShow.value = value
})

const current = ref(0)

async function didClickItem(index: number) {
  current.value = index
}
async function didClickRecharge() {
  if (props.list.length > 0 && current.value < props.list.length) {
    const item = props.list[current.value]
    showLoading('正在充值')
    const msg = await userStore.rechargePlanAction(item.id)
    hideLoading()
    if (msg) {
      await ShowToast(msg, 1500)
    }
    else {
      await ShowToast('充值成功', 1500)
      emits('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.recharge {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background: #dfeeff;
  border-radius: 16rpx 16rpx 0 0;
  z-index: 999;
  &-top {
    position: relative;
    width: 750rpx;
    height: 75rpx;
    &-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &-title {
      position: absolute;
      left: 0;
      top: 12rpx;
      width: 750rpx;
      height: 75rpx;
      font-weight: 400;
      font-size: 46rpx;
      color: #ffffff;
      @include text-stroke-color(#3861e5);

      text-align: center;
    }
    &-close {
      position: absolute;
      right: 20rpx;
      top: 20rpx;
      width: 60rpx;
      height: 32rpx;
    }
  }

  &-content {
    width: 100%;
    height: 530rpx;
    display: flex;
    background: #dfeeff;
    flex-direction: column;
    align-items: center;
    &-title {
      position: relative;
      margin-top: 16rpx;
      width: 100%;
      text-align: center;
      font-size: 48rpx;
      font-weight: 400;
      color: #1a385b;
    }
    &-option {
      margin: 40rpx;
      width: 100%;
      box-sizing: border-box;
      position: relative;
      &-bg {
        width: 100%;
      }
      &-content {
        position: absolute;
        left: 0;
        top: 0;
        padding: 28rpx;
        width: 100%;
        box-sizing: border-box;
        height: calc(100% - 56rpx);
        display: flex;
        flex-direction: column;
        &-title {
          position: relative;
          font-weight: normal;
          font-size: 26rpx;
          color: #000000;
        }
        &-list {
          margin-top: 8rpx;
          position: relative;
          width: 100%;

          box-sizing: border-box;
          height: 200rpx;

          &-content {
            display: grid;
            grid-template-columns: repeat(
              auto-fill,
              minmax(calc((100% - 24px) / 3), 1fr)
            ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
            grid-gap: 12px; // 这是网格间的间隙，根据需要调整
          }

          &-item {
            position: relative;
            width: calc(100% - 4rpx);
            height: 50rpx;
            background: rgba(0, 0, 0, 0);
            border-radius: 4rpx;
            border: 2rpx solid #3690ff;
            font-weight: 400;
            font-size: 30rpx;
            color: #3690ff;
            text-align: center;
            line-height: 50rpx;
          }
          &-itemSelect {
            display: inline-block;
            position: relative;
            width: 100%;
            height: 50rpx;
            border-radius: 4rpx;
            font-weight: 400;
            font-size: 30rpx;
            color: #000000;
            background: #76b3ff;
            text-align: center;
            line-height: 50rpx;
          }
        }
        &-bottom {
          margin-top: 12rpx;
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  &-close {
    position: absolute;
    right: 24rpx;
    top: 24rpx;
  }
}
</style>
