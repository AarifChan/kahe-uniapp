<template>
  <view
    class="infinite w-full flex flex-col pb-20 box-border"
    :style="{ height: 'calc(100vh - env(safe-area-inset-bottom))' }"
  >
    <view class="infinite-top relative w-750 h-474">
      <image
        src="/static/kahe-202510/ka-he/product/infinite-top-bg.png"
        class="infinite-top-img absolute left-0 top-0 w-full h-full"
      />
      <view
        class="infinite-top-btn absolute right-4 top-18 flex flex-row items-center"
      >
        <view
          class="infinite-top-btn-item theme-font text-24 text-center py-4 px-6 rounded-8 mr-13 bg-[#7fff85] border-2 border-[#29984b] text-[#237927]"
          @tap.stop="tapShowModel(0)"
          >发货须知</view
        >
        <view
          class="infinite-top-btn-item theme-font text-24 text-center py-4 px-6 rounded-8 mr-13 bg-[#fffa70] border-2 border-[#785e30] text-[#85733a]"
          @tap.stop="tapShowModel(1)"
          >购买说明</view
        >
        <view
          class="infinite-top-btn-item theme-font text-24 text-center py-4 px-6 rounded-8 mr-13 bg-[#7cd2f0] border-2 border-[#785e30] text-[#237927]"
          @tap.stop="tapShowModel(2)"
          >品相定义</view
        >
      </view>
      <!--      <view-->
      <!--        class="infinite-top-paymodel1 theme-font"-->
      <!--        @tap.stop="emits('tapShowModel', 0)"-->
      <!--        >发货须知</view-->
      <!--      >-->
      <!--      <view-->
      <!--        class="infinite-top-paymodel theme-font"-->
      <!--        @tap.stop="emits('tapShowModel', 1)"-->
      <!--        >购买说明</view-->
      <!--      >-->
      <image
        class="absolute left-0 top-0 w-115 h-63"
        src="/static/kaju/common/logo.png"
      />
    </view>
    <view
      class="infinite-top-swiper absolute left-80 top-78 flex flex-row items-center"
      :style="{ width: 'calc(100% - 160rpx)', height: '220rpx' }"
    >
      <z-swiper v-model="bannerList" :options="options">
        <z-swiper-item
          :custom-style="slideCustomStyle"
          v-for="(item, index) in bannerList"
          :key="index"
        >
          <view
            class="imageBox relative w-151"
            :style="{ height: 'calc(151rpx / 300 * 420)' }"
          >
            <image
              src="/static/kahe-202510/product/card-bg.png"
              class="imageBg absolute w-full h-full left-0 top-0 z-1"
            />
            <image
              class="image absolute left-0 top-0 h-full w-full z-2"
              :src="item"
              mode="aspectFill"
            />
          </view>
        </z-swiper-item>
      </z-swiper>
    </view>
    <King v-if="product.isKindMode" :product="product" />
    <view
      class="infinite-center relative -mt-124 w-full flex flex-row items-center justify-center mb-10"
      v-else
    >
      <view class="boxItem relative w-540 h-92 flex items-center">
        <image
          src="/static/kahe-202510/ka-he/product/kings-bg.png"
          class="border-bg absolute inset-0 w-full h-full"
        />
        <view
          class="infinite-center-right relative w-93 h-66"
          :style="{ transform: 'translate(-50rpx)' }"
          @tap.stop="openChestModal(1)"
        >
          <image
            class="infinite-center-right-img w-full h-full"
            src="/static/kahe-202510/ka-he/product/chest.png"
          />
          <view
            class="infinite-center-right-title theme-font absolute left-1/2 w-100 -bottom-26 text-center text-26 font-normal text-white"
            :style="{
              transform: 'translateX(-50%)',
              textShadow:
                '-1px -1px 0 #87320c, 1px -1px 0 #87320c, -1px 1px 0 #87320c, 1px 1px 0 #87320c',
            }"
            >查看宝箱</view
          >
        </view>
        <view
          class="infinite-center-left relative z-1 flex flex-col items-center"
          :style="{ transform: 'translateX(-30rpx)' }"
        >
          <view class="infinite-center-left-title text-18 text-black"
            >再抽{{ product.another }}发必出{{ product.nextLevel }}以上<text
              class="infinite-center-left-title-tips text-18 text-black"
              >(若提前出了则幸运值重置)</text
            ></view
          >
          <view
            class="infinite-center-left-progressBg relative mt-15 w-459 h-22 bg-[rgba(0,0,0,0.4)] rounded-10"
          >
            <view
              class="infinite-center-left-progressBg-progress absolute h-full max-w-full left-0 top-0 bg-[#FF9A63] rounded-10"
              :style="luckProgress"
            ></view>
          </view>
        </view>
      </view>
    </view>
    <view
      class="infinite-tips relative pl-45 pb-24 box-border flex flex-row items-center"
      v-if="product?.attachList?.length > 0"
      @tap.stop="openChestModal(0)"
    >
      <image
        class="infinite-tips-bg w-698 h-45"
        src="/static/kahe-202510/ka-he/product/decorate.png"
      />
      <view
        class="infinite-tips-title theme-font absolute top-0 leading-45 left-92 text-24 font-normal text-white"
        :style="{
          textShadow:
            '-1px -1px 0 #87320c, 1px -1px 0 #87320c, -1px 1px 0 #87320c, 1px 1px 0 #87320c',
        }"
        >隐藏掉落</view
      >
      <view
        class="infinite-tips-tips absolute top-0 left-208 leading-45 text-18 font-normal text-[#87320c]"
        >每次购买均有独立概率触发掉落，存在一次多得的情况</view
      >
    </view>
    <InGroup @tap.stop="emits('didClickRemark')" :content="product.remark" />
    <CommonTab
      v-model:current-index="currentIndex"
      @scroll-to-lower="scrollToLower"
      @did-click-button=""
      :product="product"
      @tabDidChange="tabDidChange"
      @didClickButton="handleClickAction"
      class="infinite-common flex-1"
    >
      <template #goods>
        <in-goods
          :product="product"
          v-for="(item, index) in levelGroupList"
          :key="index"
          :item="item"
          @click-detail="clickItem"
        />
      </template>
      <template #record>
        <view>
          <all-tab
            v-if="currentIndex === 1"
            :sort-list="sortList"
            @sort-tab-action="sortTabAction"
          />
          <record
            :record-list="recordList"
            :types="true"
            :is-infinite="true"
            :border-heigth="201"
            :border-width="701"
          />
        </view>
      </template>
    </CommonTab>
    <cards
      :cards-array="cardsArray"
      :is-infinite="true"
      :queue-lock-time="product.queueLockTime"
      @did-tap-choose="didClickPurchase"
    />
  </view>
  <chest-modal
    v-model:show="chestModalShow"
    :type="chestModalType"
    :price="product.price"
    :goods-list="chestList"
    :product="product"
  />
</template>
<script setup lang="ts">
import Cards from "./bottomCards/index.vue";
import InGoods from "./infiniteGoods/index.vue";
import { ref, watch } from "vue";
import CommonTab from "./CommonTab/index.vue";
import AllTab from "./all/index.vue";
import type { PropType } from "vue";
import {
  ProductDetailButtonType,
  UIProductBoxModel,
  UIProductDetailLevelGroup,
  UIProductDetailLevelList,
  UIProductDetailModel,
  UIProductPriceCard,
  UIProductRecordModel,
} from "@/model";
import Record from "@/subPackages/product/card/components/record.vue";
import InGroup from "./InGroup/index.vue";
import King from "./king/index.vue";
import { useMerchant } from "@/pages/merchant/index";
const { didClickMerchant } = useMerchant();
import ChestModal from "../components/chestModal/index.vue";

const chestModalShow = ref(false);
const chestModalType = ref(1);
const chestList = ref([] as UIProductBoxModel[]);
const props = defineProps({
  product: {
    default: {} as UIProductDetailModel,
    type: Object as PropType<UIProductDetailModel>,
  },
  goodsList: {
    default: () => [],
    type: Array as PropType<UIProductBoxModel[]>,
  },
  cardsArray: {
    default: () => [],
    type: Array as PropType<UIProductPriceCard[]>,
  },
  levelGroupList: {
    default: () => [] as UIProductDetailLevelGroup[],
    type: Array as PropType<UIProductDetailLevelGroup[]>,
  },
  recordList: {
    type: Array as () => UIProductRecordModel[],
    default: () => [],
  },
  levelList: {
    default: [] as UIProductDetailLevelList[],
    type: Array as PropType<UIProductDetailLevelList[]>,
  },
  sortList: {
    default: () => [],
    type: Array,
  },
  luckProgress: {
    default: "",
    type: String,
  },
});
const tapShowModel = (index: number) => {
  emits("tapShowModel", index);
};

const bannerList = ref([] as any);
const openChestModal = (type: number) => {
  chestModalType.value = type;
  if (type === 1) {
    chestList.value = props.product?.luckyList;
  } else {
    chestList.value = props.product?.attachList;
  }
  chestModalShow.value = true;
};
watch(
  () => props.goodsList,
  (_) => {
    bannerList.value = props.goodsList
      .filter((n) => n.level >= 116)
      .map((n) => n.image);
  }
);

const options = ref({
  effect: "coverflow",
  loop: true,
  slidesPerView: 3,
  loopedSlides: 5,
  autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 60,
    modifier: 5,
    slideShadows: true,
  },
});
const slideCustomStyle = ref({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const currentIndex = ref(0);

const emits = defineEmits([
  "tabDidChange",
  "didClickPurchase",
  "scrollToLower",
  "sortTabAction",
  "clickItem",
  "tapShowModel",
  "didClickButton",
  "didClickRemark",
]);
const clickItem = (item: any) => {
  emits("clickItem", item);
};
const sortTabAction = (i: any) => {
  emits("sortTabAction", i);
};
const tabDidChange = (index: number) => {
  emits("tabDidChange", index);
};
const didClickPurchase = (num: number) => {
  emits("didClickPurchase", {
    num,
  });
};
const handleClickAction = (action: number) => {
  switch (action) {
    case 0:
      emits("didClickButton", ProductDetailButtonType.Save);
      break;
    case 1:
      emits("didClickButton", ProductDetailButtonType.Favorite);
      break;
    case 2:
      emits("didClickButton", ProductDetailButtonType.Reload);
      break;
  }
};
const scrollToLower = () => {
  if (currentIndex.value === 0) {
    return;
  }
  emits("scrollToLower");
};
</script>
<style lang="scss" scoped></style>
