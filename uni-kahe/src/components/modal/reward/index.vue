<template>
  <tn-popup
    v-model="vShow"
    :overlay-opacity="0.88"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="relative flex flex-col items-center w-732">
      <view class="relative w-612 h-194">
        <image
          class="w-full h-full"
          src="/static/kahe-202510/reward/reward-title.png"
        />
      </view>
      <view class="-mt-92 relative w-732 items-center flex flex-col">
        <image
          class="w-732 h-792"
          src="/static/kahe-202510/reward/reward-bg.png"
        />
        <text class="absolute top-60 left-0 w-full text-24 font-normal text-white text-center"
          >恭喜您,获得以下物品,可在赏袋查看。</text
        >
        <scroll-view
          :enable-flex="true"
          :scroll-y="true"
          scroll-with-animation
          class="absolute left-0 top-120 w-full px-50 h-600"
        >
          <view
            class="w-full h-full flex flex-row items-center justify-center"
            v-if="goodsList.length === 1"
          >
            <view
              class="inline-block"
              style="width: 45%;"
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
            class="w-full h-full px-30 flex flex-row items-center justify-between"
            v-else-if="goodsList.length === 2"
          >
            <view
              class="inline-block"
              style="width: calc((100% - 80rpx) / 2);"
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
            class="w-full flex flex-col"
            v-else-if="goodsList.length === 3"
          >
            <view class="mt-24 w-full flex flex-row items-center justify-center">
              <view class="w-1/4">
                <goods-box
                  :item="goodsList[0]"
                  :info="false"
                  :is-card="isCard"
                  :level="true"
                  :nums="nums"
                />
              </view>
            </view>
            <view class="mt-24 w-full flex flex-row items-center justify-between">
              <view class="w-[45%] px-60">
                <goods-box
                  :item="goodsList[1]"
                  :info="false"
                  :is-card="isCard"
                  :level="true"
                  :nums="nums"
                />
              </view>
              <view class="w-[45%] px-60">
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
          <view class="p-24 pt-24 mt-24 gap-40 box-border overflow-auto" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(calc((100% - 80rpx) / 3), 1fr));" v-else>
            <view
              class="inline-block w-full"
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
          class="my-32 mx-auto w-608 h-73"
          src="/static/kahe-202510/ka-he/product/show-integral.png"
        />
        <view class="w-[calc(100%-120rpx)] h-100 flex flex-row items-center justify-between">
          <view
            class="relative"
            @tap.stop="emits('update:show', false)"
          >
            <image
              class="w-270 h-68"
              src="/static/kahe-202510/images/reward-btn1.png"
            />
            <text
              class="absolute left-0 w-full top-15 text-center text-32 font-normal text-white text-stroke-main theme-font"
              >再次购买</text
            >
          </view>
          <view
            class="relative"
            @tap.stop="navToCollectPage"
          >
            <image
              class="w-270 h-68"
              src="/static/kahe-202510/images/reward-btn2.png"
            />
            <text
              class="absolute left-0 w-full top-15 text-center text-32 font-normal text-white text-stroke-main theme-font"
              >换卡集市</text
            >
          </view>
        </view>
        <view
          class="relative w-276 h-71"
          @tap.stop="emits('didClickRedBag')"
          v-if="hasRedBag"
        >
          <image
            class="w-276 h-71"
            src="/static/kahe-202510/redEnvelope/btn-style3.png"
          />
          <text
            class="absolute left-0 top-0 w-full h-71 leading-71 text-center font-normal text-30 text-white theme-font text-stroke"
            style="-webkit-text-stroke-color: #a94f23; text-stroke-color: #a94f23;"
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
const navToCollectPage = () => {
  uni.navigateTo({
    url: "/subPackages/collect/index",
  });
};

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

<style lang="scss" scoped></style>
