<template>
  <tn-popup
    v-model="vShow" :overlay-opacity="0.88" open-direction="center" bg-color="transparent"
    :overlay-closeable="false" @close="emits('update:show', false)"
  >
    <view class="chestModal">
      <!-- <image class="chestModal-bg" src="https://jms.85gui7.com/kahe-202510/infinite-mode/bg.png" /> -->

      <view class="chestModal-content">
        <view class="chestModal-content-title theme-font">
          <text class="context">
            {{
              getContent().title
            }}
          </text>
        </view>
        <view class="chestModal-content-tips">
          <view v-if="type === 1" class="chestModal-content-tips-content">
            该赏池再抽{{ product.another }}发必出{{
              product.nextLevel
            }}以上，若提前出则重置。
          </view>
          <view v-else class="chestModal-content-tips-content">
            每次购买都会按照概率触发掉落
          </view>
        </view>
        <view class="chestModal-content-titles theme-font">
          {{
            getContent().tips1
          }}
        </view>
        <view class="chestModal-content-subTitle">
          {{
            getContent().tips2
          }}
        </view>
        <scroll-view :scroll-y="true" scroll-with-animation class="chestModal-content-goods">
          <view class="chestModal-content-goods-list">
            <goods-item
              v-for="(item, index) in goodsList" :key="index"
              class="chestModal-content-goods-list-item" :show-price="type !== 1" :item="item" :is-infinite="true"
              :goods-price="price"
            />
          </view>
        </scroll-view>
      </view>
      <image
        class="chestModal-close" src="https://jms.85gui7.com/kahe-202510/infinite-mode/close.png"
        @tap.stop="emits('update:show', false)"
      />
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { UIProductBoxModel, UIProductDetailModel } from '@/model'
import { ref, watch } from 'vue'
import GoodsItem from '../generalGoods/index.vue'

const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  product: {
    default: {} as UIProductDetailModel,
    type: Object as PropType<UIProductDetailModel>,
  },
  type: {
    default: 1,
    type: Number,
  },
  price: {
    default: 0,
    type: Number,
  },
  goodsList: {
    default: () => [],
    type: Array as PropType<UIProductBoxModel[]>,
  },
})
const emits = defineEmits(['update:show'])

const vShow = ref(false)

function getContent() {
  if (props.type === 1) {
    return {
      title: '保底模式',
      tips1: '宝箱内含赏品',
      tips2: '开启宝箱100%必中其一',
    }
  }
  else {
    return {
      title: '隐藏掉落',
      tips1: '隐藏奖励内含赏品',
      tips2: '每次购买会按照以下概率触发掉落',
    }
  }
}

watch(
  () => props.show,
  (value) => {
    vShow.value = value
  },
)
</script>

<style lang="scss" scoped>
.chestModal {
  position: relative;
  // background-color: transparent;
  width: 688rpx;
  height: 1051rpx;
  background: #f6f7e5;

  &-bg {
    width: 100%;
    height: 100%;
  }

  &-close {
    position: absolute;
    top: 15rpx;
    right: 16rpx;
    width: 40rpx;
    height: 40rpx;
  }

  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-title {
      padding: 20rpx 0;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: center;
      background: #cc8156;

      .context {
        font-weight: 400;
        font-size: 40rpx;
        color: #fff4da;
      }
    }

    &-titles {
      font-weight: 400;
      font-size: 50rpx;
      color: #cc8156;
    }

    &-tips {
      position: relative;
      width: 655rpx;
      height: 120rpx;
      box-sizing: border-box;
      background: #eadeb8;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 30rpx 0 60rpx 0;

      &-content {
        font-weight: normal;
        font-size: 26rpx;
        color: #7c4e33;
      }
    }

    &-subTitle {
      font-weight: normal;
      font-size: 26rpx;
      color: #cc8156;
    }

    &-goods {
      position: relative;
      margin-top: 20rpx;
      width: 659rpx;
      // height: 639rpx;
      flex: 1;
      background: #eadeb8;
      border-radius: 20rpx;
      margin-bottom: 20rpx;

      &-list {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding: 20rpx 30rpx 20rpx 20rpx;
        display: grid;
        grid-template-columns: repeat(
          auto-fill,
          minmax(calc((100% - 60rpx) / 3), 1fr)
        ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
        grid-gap: 30rpx; // 这是网格间的间隙，根据需要调整

        &-item {
          display: inline-block;
          width: 100%;
        }
      }
    }
  }
}
</style>
