<template>
  <view class="groupBuySubmit relative bg-[#000000] w-full h-screen">
    <scroll-view
      class="groupBuySubmit-content absolute left-0 top-0 w-full"
      :style="{ height: 'calc(100% - env(safe-area-inset-bottom) - 303rpx)' }"
      scroll-y
    >
      <!--            <view class="groupBuySubmit-content-address" @tap.stop="navToSelectAddress">-->
      <!--                <view class="groupBuySubmit-content-address-left">-->
      <!--                    <image class="groupBuySubmit-content-address-left-img" src="/static/kahe-202510/groupBuy/address.png" />-->
      <!--                    <view>-->
      <!--                        <view class="groupBuySubmit-content-address-left-value">{{ selectAddress ? selectAddress.province + selectAddress.city + selectAddress.district + selectAddress.detail  : '请选择地址' }} </view>-->
      <!--                        <view class="groupBuySubmit-content-address-left-value">{{ selectAddress ? selectAddress.realName + '  ' + selectAddress.phone  : '' }} </view>-->
      <!--                    </view>-->

      <!--                </view>-->
      <!--                <image class="groupBuySubmit-content-address-right" src="/static/kahe-202510/groupBuy/arrow-1.png" />-->
      <!--            </view>-->
      <view
        class="groupBuySubmit-content-group mx-16 my-30 w-[calc(100%-32rpx)] box-border rounded-20 border-2 border-[#5e432b] bg-[#212121] py-16 px-32 flex flex-col"
      >
        <!--                <view class="groupBuySubmit-content-merchant">-->
        <!--                    <image class="groupBuySubmit-content-merchant-logo" />-->
        <!--                    <view class="groupBuySubmit-content-merchant-title">阿里嘎多卡社</view>-->
        <!--                </view>-->
        <view
          class="groupBuySubmit-content-info mt-12 w-full flex flex-row justify-between"
        >
          <view class="groupBuySubmit-content-info-left flex flex-row">
            <image
              class="groupBuySubmit-content-info-left-logo w-180 h-180 rounded-20 border-2 border-[#ffb777] bg-[#d9d9d9]"
              :src="groupBuyDetail.logo"
            />
            <view
              class="groupBuySubmit-content-info-left-subInfo ml-16 flex flex-col"
            >
              <view
                class="groupBuySubmit-content-info-left-subInfo-title font-normal text-20 text-white leading-36"
                style="margin-top: 10px"
                >{{ groupBuyDetail.title }}</view
              >
              <view
                class="groupBuySubmit-content-info-left-subInfo-price flex flex-row"
                v-if="payPrice !== groupBuyDetail.price"
              >
                <view
                  class="groupBuySubmit-content-info-left-subInfo-price-p1 font-normal text-32 text-white leading-36"
                  >¥{{ payPrice }}</view
                >
                <view
                  class="groupBuySubmit-content-info-left-subInfo-price-p2 ml-8 font-normal text-32 text-white leading-36 line-through"
                  >{{ groupBuyDetail.price }}</view
                >
              </view>
              <view
                class="groupBuySubmit-content-info-left-subInfo-price flex flex-row"
                v-else
              >
                <view
                  class="groupBuySubmit-content-info-left-subInfo-price-p1 font-normal text-32 text-white leading-36"
                  >¥{{ groupBuyDetail.price }}</view
                >
              </view>
              <view
                class="groupBuySubmit-content-info-left-subInfo-subTitle font-normal text-18 text-white leading-36"
                style="margin-top: 15px"
                >库存:{{ groupBuyDetail.total - groupBuyDetail.sales }}</view
              >
              <view
                class="groupBuySubmit-content-info-left-subInfo-subTitle font-normal text-18 text-white leading-36"
                >规格 | 1 张</view
              >
            </view>
          </view>
          <view
            class="groupBuySubmit-content-info-right flex flex-col justify-end items-end"
          >
            <view
              class="groupBuySubmit-content-info-right-num font-normal text-18 text-white leading-36 mb-12"
              >数量×1</view
            >
            <image
              class="groupBuySubmit-content-info-right-arrow w-14 h-25"
              src="/static/kahe-202510/groupBuy/right-arrow.png"
            />
          </view>
        </view>
        <view
          class="groupBuySubmit-content-other mt-18 flex flex-row items-center"
        >
          <view
            class="groupBuySubmit-content-other-title theme-font font-normal text-30 text-[#fcd09d] leading-36"
            >赠送卡密</view
          >
          <view
            class="groupBuySubmit-content-other-line w-[calc(100%-120rpx-16rpx)] h-1 mx-8 bg-[#fcd09d]"
          />
        </view>
        <view
          class="groupBuySubmit-content-detail mt-26 font-normal text-20 text-white leading-36"
          >{{ groupBuyDetail.title }} 卡密一张</view
        >
        <!--                <view class="groupBuySubmit-content-price">{{payPrice}}</view>-->
        <view
          class="groupBuySubmit-content-num mt-8 flex flex-row items-center"
        >
          <view
            class="groupBuySubmit-content-num-item w-38 h-38 bg-[#fcd09d] rounded-4 leading-38 text-center text-white"
            @tap.stop="
              changeNum(true, groupBuyDetail.total - groupBuyDetail.sales)
            "
            >➖</view
          >
          <view
            class="groupBuySubmit-content-num-value mx-8 px-32 h-38 leading-38 text-center font-normal text-32 text-white bg-[#000000] rounded-4"
            >{{ selectNum }}</view
          >
          <view
            class="groupBuySubmit-content-num-item w-38 h-38 bg-[#fcd09d] rounded-4 leading-38 text-center text-white"
            @tap.stop="
              changeNum(false, groupBuyDetail.total - groupBuyDetail.sales)
            "
            >➕</view
          >
          <view
            class="groupBuySubmit-content-num-sock ml-24 font-normal text-20 text-white leading-36"
            >库存:{{ groupBuyDetail.total - groupBuyDetail.sales }}</view
          >
        </view>
        <view
          class="groupBuySubmit-content-title mt-38 font-normal text-26 text-white leading-36"
          >优惠套餐</view
        >
        <view class="groupBuySubmit-content-list mt-28 flex flex-row">
          <view
            class="groupBuySubmit-content-list-item mr-26 w-140 h-73 rounded-10 bg-[url('/static/kahe-202510/groupBuy/buy-item.png')] bg-[length:100%_100%] bg-no-repeat flex flex-col items-center justify-center"
            :class="
              item.num === selectNum
                ? 'rounded-10 border-2 border-[#081d62]'
                : ''
            "
            v-for="(item, index) in groupBuyDetail.prices"
            :key="'index' + index"
            @tap.stop="handleSelectNum(item)"
          >
            <view
              class="groupBuySubmit-content-list-item-num font-normal text-24 leading-36 text-[#794627]"
              :class="
                item.num === selectNum ? 'text-[#081d62]' : ''
              "
              >{{ item.num }}份</view
            >
            <view
              class="groupBuySubmit-content-list-item-price font-normal text-20 text-[#794627] leading-36"
              :class="
                item.num === selectNum ? 'text-[#081d62]' : ''
              "
              >单价{{ item.price }}</view
            >
          </view>
        </view>
      </view>
      <!--            <view class="groupBuySubmit-content-group">-->
      <!--                <view class="groupBuySubmit-content-line">-->
      <!--                    <view class="groupBuySubmit-content-line-value">运费</view>-->
      <!--                    <view class="groupBuySubmit-content-line-value">拼团完成后支付(可累计)</view>-->
      <!--                </view>-->
      <!--                <view class="groupBuySubmit-content-line" style="margin-top: 12px">-->
      <!--                    <view class="groupBuySubmit-content-line-value">商家优惠券</view>-->
      <!--                    <view style="display: flex;flex-direction: row">-->
      <!--                        <view class="groupBuySubmit-content-line-value">暂无可用商家优惠券</view>-->
      <!--                        <image class="groupBuySubmit-content-line-arrow" src="/static/kahe-202510/groupBuy/arrow.png" />-->
      <!--                    </view>-->
      <!--                </view>-->
      <!--            </view>-->
    </scroll-view>
    <view
      class="groupBuySubmit-bottom absolute left-[-4rpx] bottom-0 w-[calc(100%+8rpx)] box-border bg-[url('/static/kahe-202510/groupBuy/pay-bg.png')] bg-[length:100%_100%] bg-no-repeat"
      :style="{ padding: '16rpx 16rpx env(safe-area-inset-bottom)' }"
    >
      <view
        class="groupBuySubmit-bottom-tips py-10 flex flex-row items-center justify-between"
      >
        <view
          class="groupBuySubmit-bottom-tips-select ml-12 relative w-38 h-38"
          @tap.stop="checked = !checked"
        >
          <image
            class="groupBuySubmit-bottom-tips-select-bg w-full h-full"
            src="/static/kahe-202510/groupBuy/select-normal.png"
          />
          <image
            v-if="checked"
            class="groupBuySubmit-bottom-tips-select-value absolute left-0 top-0 w-full h-full"
            src="/static/kahe-202510/groupBuy/select.png"
          />
        </view>
        <view class="groupBuySubmit-bottom-tips-content w-[calc(100%-80rpx)]">
          <text
            class="groupBuySubmit-bottom-tips-content-value1 font-normal text-24 text-[#ffd3a2] leading-36"
            >我已阅读并同意</text
          >
          <!--                    <text class="groupBuySubmit-bottom-tips-content-value2" @tap.stop="clickRule">《活动规则》</text>-->
          <!--                    <text class="groupBuySubmit-bottom-tips-content-value1">、</text>-->
          <text
            class="groupBuySubmit-bottom-tips-content-value2 font-normal text-24 text-[#ffd3a2] leading-36"
            @tap.stop="clickRule"
            >《购买须知》</text
          >
          <text
            class="groupBuySubmit-bottom-tips-content-value1 font-normal text-24 text-[#ffd3a2] leading-36"
            >;您所购商品因其
            属性及价格的特殊性，同意购买商品后不支持7天无理由退款;我已知晓本产品checklist由商家自定义，并已查阅产品卡密列表
            的详细信息。</text
          >
        </view>
      </view>
      <view
        class="groupBuySubmit-bottom-line flex flex-row justify-between items-center"
      >
        <view
          class="groupBuySubmit-bottom-line-left ml-43 flex flex-col"
        >
          <view
            class="groupBuySubmit-bottom-line-left-row flex flex-row py-12"
          >
            <view
              class="groupBuySubmit-bottom-line-left-value1 SimHei-font font-normal text-28 text-[#ffd3a2] leading-36"
              >共{{ selectNum }}份</view
            >
            <view
              class="groupBuySubmit-bottom-line-left-line mx-16 w-1 h-31 bg-[#ffd3a2]"
            />
            <view
              class="groupBuySubmit-bottom-line-left-value1 SimHei-font font-normal text-28 text-[#ffd3a2] leading-36"
              >优惠：{{ discountPrice }}</view
            >
          </view>

          <view
            class="groupBuySubmit-bottom-line-left-row flex flex-row py-12"
          >
            <view
              class="groupBuySubmit-bottom-line-left-value1 font-normal text-28 text-[#ffd3a2] leading-36"
              >合计：</view
            >
            <view
              class="groupBuySubmit-bottom-line-left-value2 font-normal text-36 text-[#ff1111] leading-36"
              >¥{{ totalPrice }}</view
            >
          </view>
        </view>
        <view
          class="groupBuySubmit-bottom-line-right relative w-207 h-90 rounded-10 bg-gradient-[linear-gradient(90deg,#ffd3a2_0%,#fdf2d8_100%)]"
          @tap.stop="didTapSubmit(valueId)"
        >
          <image
            class="groupBuySubmit-bottom-line-right-img"
            src="/static/kahe-202510/groupBuy/btn.png"
          />
          <view
            class="groupBuySubmit-bottom-line-right-title theme-font absolute left-0 top-0 w-full leading-90 font-normal text-34 text-[#794627] text-center"
            >提交订单</view
          >
        </view>
      </view>
    </view>
    <common-modal
      v-model:show="modalShow"
      :title="modalTitle"
      :content="modalContent"
    />
    <reward
      v-if="rewardShow"
      @did-click-again="handleClickAgain"
      :list="purchaseCardList"
      @did-click-detail="handleClickDetail"
    />
  </view>
</template>

<script lang="ts" setup>
import { useGroupBuySubmit } from "./index";
import Reward from "../components/reward/index.vue";
import { useGroupBuy } from "@/subPackages/groupBuy";
import { onMounted, ref } from "vue";
import { getPageOptions } from "@/utils/tools";
import CommonModal from "@/components/modal/index.vue";
import { useModal, ModalType } from "@/composables/modal";
const { modalShow, modalTitle, modalContent, showModalType } = useModal();
const { getGroupBuyDetail, groupBuyDetail, navToMinePage } = useGroupBuy();

const {
  discountPrice,
  originPrice,
  priceList,
  rewardShow,
  checked,
  selectNum,
  totalPrice,
  payPrice,
  changeNum,
  handleSelectNum,
  didTapSubmit,
  purchaseCardList,
} = useGroupBuySubmit();
const clickRule = () => {
  showModalType(ModalType.GroupBuyRule);
};
const valueId = ref<number>(0);
const handleClickAgain = () => {
  rewardShow.value = false;
  fetchPageData();
};
const handleClickDetail = () => {
  navToMinePage(valueId.value);
  fetchPageData();
};

onMounted(async () => {
  fetchPageData();
});

const fetchPageData = async () => {
  const id = getPageOptions().id;
  console.log("groupBuyId:", id);
  if (id) {
    valueId.value = id;
    await getGroupBuyDetail(id);
  }
  priceList.value = groupBuyDetail.value.prices;
  payPrice.value = originPrice.value = groupBuyDetail.value.price;
};
</script>

<style lang="scss" scoped></style>
