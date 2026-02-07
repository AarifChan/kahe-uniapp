<template>
  <tn-popup
    v-model="vShow"
    :overlay-opacity="0.88"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="reward">
      <view class="reward-top">
        <image
          class="reward-top-img"
          src="https://jms.85gui7.com/kahe-202510/reward/reward-title.png"
        />
      </view>
      <view class="reward-content">
        <image
          class="reward-content-bg"
          src="https://jms.85gui7.com/kahe-202510/reward/reward-bg.png"
        />
        <text class="reward-content-title"
          >恭喜您,获得以下物品,可在赏袋查看。</text
        >
        <scroll-view
          :enable-flex="true"
          :scroll-y="true"
          scroll-with-animation
          class="reward-content-list"
        >
          <view
            class="reward-content-list-single"
            v-if="goodsList.length === 1"
          >
            <view
              class="reward-content-list-single-item"
              v-for="(item, index) in goodsList"
              :key="'goodsList' + index"
            >
              <goods-box
                :item="item"
                :info="false"
                :is-card="isCard"
                :level="true"
                :nums="nums"
              />
            </view>
          </view>
          <view
            class="reward-content-list-two"
            v-else-if="goodsList.length === 2"
          >
            <view
              class="reward-content-list-two-item"
              v-for="(item, index) in goodsList"
              :key="'goodsList' + index"
            >
              <goods-box
                :item="item"
                :info="false"
                :is-card="isCard"
                :level="true"
                :nums="nums"
              />
            </view>
          </view>
          <view
            class="reward-content-list-three"
            v-else-if="goodsList.length === 3"
          >
            <view class="reward-content-list-three-row1">
              <view class="reward-content-list-three-row1-item">
                <goods-box
                  :item="goodsList[0]"
                  :info="false"
                  :is-card="isCard"
                  :level="true"
                  :nums="nums"
                />
              </view>
            </view>
            <view class="reward-content-list-three-row2">
              <view class="reward-content-list-three-row2-item">
                <goods-box
                  :item="goodsList[1]"
                  :info="false"
                  :is-card="isCard"
                  :level="true"
                  :nums="nums"
                />
              </view>
              <view class="reward-content-list-three-row2-item">
                <goods-box
                  :item="goodsList[2]"
                  :info="false"
                  :is-card="isCard"
                  :level="true"
                  :nums="nums"
                />
              </view>
            </view>
          </view>
          <view class="reward-content-list-content" v-else>
            <view
              class="reward-content-list-content-item"
              v-for="(item, index) in goodsList"
              :key="'goodsList' + index"
            >
              <goods-box
                :item="item"
                :info="false"
                :is-card="isCard"
                :level="true"
                :nums="nums"
              />
            </view>
          </view>
        </scroll-view>
        <image
          class="reward-content-integral"
          src="https://jms.85gui7.com/kahe-202510/ka-he/product/show-integral.png"
        />
        <view class="reward-content-bottom">
          <view
            class="reward-content-bottom-item"
            @tap.stop="emits('update:show', false)"
          >
            <image
              class="reward-content-bottom-item-img"
              src="https://jms.85gui7.com/kahe-202510/images/reward-btn1.png"
            />
            <text
              class="reward-content-bottom-item-title text-stroke-main theme-font"
              >继续开赏</text
            >
          </view>
          <view
            v-if="featureSmashRefundEnabled"
            class="reward-content-bottom-item"
            @tap.stop="emits('didClickSmash')"
          >
            <image
              class="reward-content-bottom-item-img"
              src="https://jms.85gui7.com/kahe-202510/images/reward-btn2.png"
            />
            <text
              class="reward-content-bottom-item-title text-stroke-main theme-font"
              >一键退货</text
            >
          </view>
        </view>
        <view
          class="reward-content-redBag"
          @tap.stop="emits('didClickRedBag')"
          v-if="hasRedBag"
        >
          <image
            class="reward-content-redBag-bg"
            src="https://jms.85gui7.com/kahe-202510/redEnvelope/btn-style3.png"
          />
          <text class="reward-content-redBag-title theme-font text-stroke"
            >去发红包</text
          >
        </view>
      </view>
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import GoodsBox from "@/components/box/index.vue";
import { AppModule } from "@/store/modules/app";
import type {
  UIProductOpenBoxModel,
  UIProductBoxModel,
  UIOpenListModel,
} from "@/model";

const props = defineProps({
  show: {
    default: true,
    type: Boolean,
  },
  rewardList: {
    type: Array as () => UIProductOpenBoxModel[] | UIOpenListModel[],
    default: [] as UIProductOpenBoxModel[],
  },
  ticket: {
    type: Number,
  },
  types: {
    default: true,
    type: Boolean,
  },
  nums: {
    default: true,
    type: Boolean,
  },
  isCard: {
    default: false,
    type: Boolean,
  },
  hasRedBag: {
    default: false,
    type: Boolean,
  },
});

const vShow = ref(false);
watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);

const goodsList = computed((): UIProductBoxModel[] => {
  return props.rewardList.map((item) => {
    return {
      title: item.name,
      image: item.image,
      levelImage: item.levelImage,
      levelBg: item.levelBg,
      level: item.level,
      total: item.num,
      last: item.num,
      price: item.price,
      hasRedBag: item.hasRedBag ?? false,
      isLucky: item.isLucky,
      isHide: item.isHide,
    } as any;
  });
});

const featureSmashRefundEnabled = computed(() => {
  return AppModule.featureSmashRefundEnabled;
});

const emits = defineEmits([
  "update:show",
  "didClickSmash",
  "didClickRedBag",
  "didClickContinue",
]);
</script>

<style lang="scss" scoped>
.reward {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 732rpx;
  &-top {
    position: relative;
    width: 612rpx;
    height: 194rpx;
    &-img {
      width: 100%;
      height: 100%;
    }
    &-gif {
      position: absolute;
      height: 183rpx;
      top: 40rpx;
      left: calc((570rpx - 183rpx) / 2);
      width: 183rpx;
    }
    &-title {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      line-height: 84rpx;
      text-align: center;
      font-size: 84rpx;
      font-weight: 400;
      color: #ffffff;
    }
  }
  &-content {
    margin-top: -92rpx;
    position: relative;
    width: 732rpx;
    align-items: center;
    display: flex;
    flex-direction: column;
    &-bg {
      width: 732rpx;
      height: 792rpx;
    }
    &-title {
      position: absolute;
      top: 60rpx;
      left: 0;
      width: 100%;
      font-size: 24rpx;
      font-weight: 400;
      color: white;
      text-align: center;
    }
    &-list {
      position: absolute;
      left: 0;
      top: 120rpx;
      width: 100%;
      padding: 0 50rpx;
      height: 600rpx;
      &-content {
        padding: 24rpx 24rpx 0 24rpx;
        margin-top: 24rpx;
        display: grid;
        grid-template-columns: repeat(
          auto-fill,
          minmax(calc((100% - 80rpx) / 3), 1fr)
        ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
        grid-gap: 40rpx; // 这是网格间的间隙，根据需要调整
        box-sizing: border-box;
        overflow: auto;
        &-item {
          display: inline-block;
          width: 100%;
        }
      }

      &-single {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        &-item {
          display: inline-block;
          width: 45%;
        }
      }
      &-two {
        width: 100%;
        height: 100%;
        padding: 0 30rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        &-item {
          display: inline-block;
          width: calc((100% - 80rpx) / 2);
        }
      }
      &-three {
        width: 100%;
        display: flex;
        flex-direction: column;
        &-row1 {
          margin-top: 24rpx;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          &-item {
            width: 25%;
          }
        }
        &-row2 {
          margin-top: 24rpx;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          &-item {
            width: 45%;
            padding: 0 60rpx;
          }
        }
      }
    }

    &-redBag {
      position: relative;
      width: 276rpx;
      height: 71rpx;
      &-bg {
        width: 276rpx;
        height: 71rpx;
      }
      &-title {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 71rpx;
        line-height: 71rpx;
        text-align: center;
        font-weight: 400;
        font-size: 30rpx;
        color: #ffffff;
        @include text-stroke-color(#a94f23);
      }
    }

    &-integral {
      margin: 32rpx auto;
      width: 608rpx;
      height: 73rpx;
    }

    &-bottom {
      width: calc(100% - 120rpx);
      height: 100rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      &-item {
        position: relative;
        &-img {
          width: 270rpx;
          height: 68rpx;
        }
        &-title {
          position: absolute;
          left: 0;
          width: 100%;
          top: 15rpx;
          text-align: center;
          font-size: 32rpx;
          font-weight: 400;
          color: #ffffff;
          //-webkit-text-stroke: 2rpx #000000;
          //text-stroke: 2rpx #000000;
        }
      }
    }
  }
}
</style>
