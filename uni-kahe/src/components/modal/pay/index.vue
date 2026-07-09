<template>
  <tn-popup
    v-model="vShow"
    open-direction="bottom"
    bg-color="#fafafa"
    @close="emits('update:show', false)"
  >
    <view
      class="relative w-full flex flex-col rounded-t-20 box-border"
      :style="{
        height: `calc(990rpx + env(safe-area-inset-bottom))`,
        paddingBottom: `calc(env(safe-area-inset-bottom) + 18rpx)`,
        background: '#fafafa',
      }"
    >
      <view class="relative h-72 w-full flex flex-row items-center justify-center bg-white">
        <image
          class="absolute left-28 top-17 w-20 h-32"
          src="/static/kahe-202510/ka-he/common/right-arrow.png"
          @tap.stop="emits('update:show', false)"
        />
        <view class="font-normal text-28 text-black">确认购买</view>
      </view>
      <scroll-view
        class="relative w-full flex flex-col p-16 box-border"
        :scroll-y="true"
        :enable-flex="true"
        scroll-with-animation
        :style="{ height: `calc(990rpx - 80rpx - ${payTypeHeight}rpx)` }"
      >
        <view class="p-26 w-full box-border bg-white rounded-20">
          <!-- 第一行：接入的 purchaseGoodsItem -->
          <view
            class="flex flex-row items-center pb-26 border-b-1 border-[#e8e8e8]"
            v-if="goods.purchaseGoodsItem"
          >
            <image
              class="w-115 h-115 bg-white shadow-[0_0_5rpx_0_#d4dee9] rounded-4"
              :src="goods.purchaseGoodsItem.image"
            />
            <view class="ml-42 flex flex-col flex-1 justify-between h-115">
              <text class="text-28 font-normal text-black leading-40">{{
                goods.purchaseGoodsItem.name
              }}</text>
              <view class="flex flex-row items-center">
                <text class="theme-font" style="font-size: 28rpx; color: #000"
                  >单价¥{{ goods.purchaseGoodsItem.salePrice }}</text
                >
                <text
                  style="
                    font-size: 24rpx;
                    color: #999;
                    text-decoration: line-through;
                    margin-left: 8rpx;
                  "
                  >{{ goods.purchaseGoodsPrice }}</text
                >
              </view>
            </view>
            <view class="ml-42 flex flex-col items-end justify-between h-115">
              <view class="inline-flex flex-row items-center py-4 px-12 border-1 border-[#247fbc] rounded-8 text-20 text-[#247fbc] mb-8">
                <image
                  class="w-24 h-24 mr-6"
                  src="/static/kahe-202510/jikaquan/safe.png"
                  mode="aspectFit"
                />
                <text>产品由商家寄售</text>
              </view>
              <text class="text-24 text-black">数量×1</text>
            </view>
          </view>
          <!-- 赠送抽赏次数标签 -->
          <view class="py-12 px-0" v-if="goods.purchaseGoodsItem">
            <text class="text-24 text-black font-normal">赠送抽赏次数</text>
          </view>
          <!-- 第二行：原来的盲盒信息 -->
          <view
            class="flex flex-row items-center pb-26 border-b-1 border-[#e8e8e8]"
            :style="
              goods.purchaseGoodsItem
                ? 'border-top: 1rpx solid #e8e8e8; padding-top: 20rpx;'
                : ''
            "
          >
            <image class="w-115 h-115 bg-white shadow-[0_0_5rpx_0_#d4dee9] rounded-4" :src="goods.image" />
            <view class="ml-42 flex flex-col flex-1 justify-between h-115">
              <text class="text-28 font-normal text-black leading-40">{{
                goods.title
              }}</text>
            </view>
            <view class="ml-42 flex flex-col items-end justify-between h-115">
              <text class="text-24 text-black"
                >次数×{{ goods.num }}</text
              >
            </view>
          </view>
          <view class="relative w-full pt-26 flex flex-col">
            <view class="relative w-full flex flex-row items-center justify-between mb-18">
              <view class="font-normal text-24 text-[#888888]">优惠券</view>
              <view
                class="font-normal text-24 text-[#888888]"
                @tap.stop="emits('didTapCoupon')"
              >
                <view class="font-normal text-24 text-[#888888]">{{
                  goods.coupon
                    ? goods.coupon.title
                    : hasValidCoupon
                      ? "请选择优惠券"
                      : "暂无可用优惠券"
                }}</view>
              </view>
            </view>
            <view class="relative w-full flex flex-row items-center justify-between mb-18">
              <view class="font-normal text-24 text-[#888888]">无门槛抵扣券</view>
              <view class="font-normal text-24 text-[#888888]"
                >{{ userInfo.money }}(抵扣{{ goods.usedMoney }})</view
              >
            </view>
            <!--            <view class="pay-scroll-info-bottom-row">-->
            <!--              <view class="pay-scroll-info-bottom-row-title">绑定点券</view>-->
            <!--              <view class="pay-scroll-info-bottom-row-value"-->
            <!--                >{{ userInfo.coin }}(抵扣{{ goods.usedCoin }})</view\-->
            <!--              >-->
            <!--            </view>-->
            <view class="relative w-full flex flex-row items-center justify-between mb-18">
              <view class="font-normal text-24 text-[#888888]">积分</view>
              <view class="font-normal text-24 text-[#888888]"
                >{{ userInfo.integral }}(抵扣{{ goods.usedIntegral }})</view
              >
            </view>
            <view class="relative w-full flex flex-row items-center justify-between mb-18">
              <view class="font-normal text-24 text-[#888888]">共计</view>
              <view
                class="font-normal text-24 text-[#888888]"
                style="color: #ff0000"
                >{{ goods.usedPrice }}</view
              >
            </view>
          </view>
        </view>
        <view class="mt-26 p-26 w-full box-border bg-white rounded-20 flex flex-row">
          <view class="font-normal text-22 text-[#888888] w-120">购买后存至</view>
          <view class="ml-12 flex flex-col gap-x-22" style="width: calc(100% - 120rpx)">
            <view class="flex flex-row items-center">
              <image
                :src="merchant?.icon"
                style="width: 32rpx; height: 32rpx; border-radius: 50%"
              />
              <view class="font-normal text-22 text-black">{{ merchant?.name }}寄存柜</view>
            </view>

            <view class="flex flex-row items-center" style="margin-top: 16rpx">
              <view class="flex flex-row items-center" style="margin-right: 8rpx">
                <view class="font-normal text-22 text-black">极速发货 </view>
                <image
                  class="w-18 h-18"
                  src="/static/kahe-202510/ka-he/common/ok.png"
                />
              </view>
              <view class="flex flex-row items-center" style="margin-right: 8rpx">
                <view class="font-normal text-22 text-black">品质保证 </view>
                <image
                  class="w-18 h-18"
                  src="/static/kahe-202510/ka-he/common/ok.png"
                />
              </view>
              <view class="flex flex-row items-center">
                <view class="font-normal text-22 text-black">售后无忧 </view>
                <image
                  class="w-18 h-18"
                  src="/static/kahe-202510/ka-he/common/ok.png"
                />
              </view>
            </view>
          </view>
        </view>
        <view class="mt-26 p-26 w-full box-border bg-white rounded-20 flex flex-row">
          <view
            style="
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
            "
          >
            <agreement
              v-if="showSkip"
              v-model:checked="isSkip"
              title="跳过翻牌"
              sub-title=""
            />
          </view>
        </view>
        <view class="mt-26 p-26 w-full box-border bg-white rounded-20 flex flex-row">
          <view class="font-normal text-22 text-[#888888] w-120">购买需知</view>
          <view class="ml-12 flex flex-col gap-x-22" style="width: calc(100% - 120rpx)">
            <view class="font-normal text-22 text-[#888888]">我已知悉未成年人禁止购买 </view>
            <view
              class="font-normal text-22 text-[#888888] mt-8 px-4 py-8 rounded-10 mb-32"
              style="background: #f6f6f6"
              >严禁未满8周岁未成年人购买，8周岁及以上未成年人的一
              切消费行为必须由监护人同意并在其陪同下进行。
            </view>
            <view class="font-normal text-22 text-[#888888]">
              我已知悉该商品不适用"七天无理由退换货"
            </view>
            <view
              class="font-normal text-22 text-[#888888] mt-8 px-4 py-8 rounded-10 mb-32"
              style="background: #f6f6f6"
              >
              抽卡机、一番赏、盲盒类商品会在付款后完成结果获取，
              不适用于7天无理由退货。若存在质量问题或错发、漏发
              等售后问题，可联系客服提供商品开箱视频进行售后处理。
            </view>
            <view class="font-normal text-22 text-[#888888]"> 我已知悉该商品发货规则及自动收货规则</view>

            <view
              class="font-normal text-22 text-[#888888] mt-8 px-4 py-8 rounded-10 mb-32"
              style="background: #f6f6f6"
              >
              所有商品均需自行申请发货，您可在“寄存柜-待处理”查
              看并申请发货，发货邮费为12元，仅支持发货到中国大陆
              区域(港、澳、台、及海外地区暂不支持)。</view
            >
            <view class="font-normal text-22 text-[#888888]"> 我已知悉该商品概率详情</view>

            <view
              class="font-normal text-22 text-[#888888] mt-8 px-4 py-8 rounded-10 mb-32"
              style="background: #f6f6f6"
              >
              抽卡机、一番赏、盲盒类商品抽取存在概率性，付款请谨
              慎查看各系列商品的获取概率不同。</view
            >
          </view>
        </view>
      </scroll-view>

      <!-- 支付方式选择 -->

      <view
        class="fixed bottom-0 left-0 w-full bg-white flex flex-col px-32 box-border"
        style="padding-bottom: env(safe-area-inset-bottom)"
      >
        <view class="py-16 px-32 w-full box-border">
          <agreement
            v-model:checked="agree"
            @did-tap-protocol="didTapProtocol"
          />
        </view>

        <view class="w-full bg-white py-20 px-32 box-border border-t-1 border-[#f0f0f0]" v-if="showPayType">
          <view class="text-26 text-[#333] font-medium mb-16">选择支付方式</view>
          <view class="flex flex-col">
            <!-- #ifdef APP-PLUS || H5 -->
            <!-- 微信支付 -->
            <view
              class="flex flex-row items-center justify-between py-16 px-0"
              :class="{ active: payType === 1 }"
              @tap.stop="selectPayType(1)"
            >
              <view class="flex flex-row items-center">
                <view
                  class="w-56 h-56 rounded-12 flex-center mr-20 overflow-hidden"
                  style="background-color: #09bb07"
                >
                  <image
                    class="w-40 h-40"
                    src="/static/kahe-202510/wechat-pay.svg"
                    mode="aspectFit"
                  />
                </view>
                <view class="flex flex-col">
                  <view class="text-28 text-[#333] font-medium" style="line-height: 1.4">微信支付</view>
                  <view class="text-22 text-[#999] mt-4">{{
                    isApp ? "微信APP支付" : "微信H5支付"
                  }}</view>
                </view>
              </view>
              <view class="w-36 h-36 rounded-full border-2 border-[#efd56f] flex-center">
                <view class="w-20 h-20 rounded-full" style="background-color: #efd56f" v-if="payType === 1"></view>
                <view class="w-36 h-36 rounded-full border-2 border-[#ddd]" v-else></view>
              </view>
            </view>

            <!-- 支付宝支付 -->
            <view
              class="flex flex-row items-center justify-between py-16 px-0"
              :class="{ active: payType === 0 }"
              @tap.stop="selectPayType(0)"
            >
              <view class="flex flex-row items-center">
                <view
                  class="w-56 h-56 rounded-12 flex-center mr-20 overflow-hidden"
                  style="background-color: #1677ff"
                >
                  <image
                    class="w-40 h-40"
                    src="/static/kahe-202510/alipay.svg"
                    mode="aspectFit"
                  />
                </view>
                <view class="flex flex-col">
                  <view class="text-28 text-[#333] font-medium" style="line-height: 1.4">支付宝支付</view>
                  <view class="text-22 text-[#999] mt-4">{{
                    isApp ? "支付宝APP支付" : "支付宝H5支付"
                  }}</view>
                </view>
              </view>
              <view class="w-36 h-36 rounded-full border-2 border-[#efd56f] flex-center">
                <view class="w-20 h-20 rounded-full" style="background-color: #efd56f" v-if="payType === 0"></view>
                <view class="w-36 h-36 rounded-full border-2 border-[#ddd]" v-else></view>
              </view>
            </view>
            <!-- #endif -->
          </view>
        </view>
        <div class="flex flex-row items-center justify-between px-32 w-full box-border">
          <view class="flex flex-col">
            <view class="text-30 text-[#ff0000] leading-26">¥{{ goods.payPrice }}</view>
            <view class="mt-28 text-30 text-black leading-26">订单合计</view>
          </view>
          <view
            class="relative w-336 h-60 rounded-30 flex flex-row items-center justify-center"
            style="background-color: #efd56f"
            @tap.stop="didTapConfirm"
          >
            <view class="text-center leading-61 text-24 text-[#5b1409]">立即付款</view>
            <view class="text-14 text-[#888888] leading-26"
              >已抵扣{{ goods.usedPrice }}</view
            >
          </view>
        </div>
      </view>
      <!--      <view>-->
      <!--        <view class="settle-top">-->
      <!--          <view class="settle-top-info">-->
      <!--            <text class="settle-top-info-subTitle"-->
      <!--              >购买明信片附赠礼品 未成年禁止下单</text\-->
      <!--            >-->
      <!--          </view>-->
      <!--        </view>-->
      <!--        <view class="settle-options">-->
      <!--          <settle-option-->
      <!--            title="优惠券"-->
      <!--            :value="-->
      <!--              goods.coupon-->
      <!--                ? goods.coupon.title-->
      <!--                : hasValidCoupon-->
      <!--                  ? '请选择优惠券'-->
      <!--                  : '暂无可用优惠券'-->
      <!--            "-->
      <!--            @tap.stop="emits('didTapCoupon')"-->
      <!--            color="black"-->
      <!--          />-->
      <!--        </view>-->
      <!--      </view>-->
      <!--      <view-->
      <!--        style="-->
      <!--          height: 120px;-->
      <!--          display: flex;-->
      <!--          flex-direction: column;-->
      <!--          justify-content: space-between;-->
      <!--        "-->
      <!--      >-->
      <!--        <agreement v-model:checked="agree" @did-tap-protocol="didTapProtocol" />-->
      <!--        <agreement-->
      <!--          v-if="showSkip"-->
      <!--          v-model:checked="isSkip"-->
      <!--          title="跳过翻牌"-->
      <!--          sub-title=""-->
      <!--        />-->
      <!--        <view-->
      <!--          class="settle-userMoney"-->
      <!--          style="margin: 0 auto; font-size: 20rpx; color: #000"-->
      <!--          >当前拥有<text style="color: #4b71ff">{{ userInfo.integral }}</text\-->
      <!--          >积分，<text style="color: #4b71ff">{{ userInfo.money }}</text\-->
      <!--          >点券，<text style="color: #4b71ff">{{ userInfo.coin }}</text\-->
      <!--          >绑定点券</view\-->
      <!--        >-->

      <!--        <settle-button-->
      <!--          :price="goods.payPrice"-->
      <!--          :discount-price="goods.usedPrice"-->
      <!--          @tap.stop="didTapConfirm"-->
      <!--        />-->
      <!--      </view>-->
    </view>
  </tn-popup>
  <common-modal
    v-model:show="modalShow"
    :title="modalTitle"
    :content="modalContent"
  />
</template>

<script lang="ts" setup>
import PayOption from "./components/option.vue";
import Agreement from "@/components/agreement/index.vue";
import PayButton from "./components/button.vue";
import { UIMerchant, UIProductPayModel } from "@/model";
import CommonModal from "@/components/modal/index.vue";
import { type PropType, ref, watch, computed, onMounted } from "vue";
import { useModal } from "@/composables/modal";
import { useCoupon } from "@/composables/coupon";
import { UserModule } from "@/store/modules/user";
import { ShowToast } from "@/utils";
import { AppModule } from "@/store/modules/app";
const { modalShow, modalTitle, modalContent, showModalType } = useModal();
const { getCoupon, hasValidCoupon } = useCoupon();
const userInfo = computed(() => UserModule.userInfo);
const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  goods: {
    default: {} as UIProductPayModel,
    type: Object as PropType<UIProductPayModel>,
  },
  isMall: {
    default: false,
    type: Boolean,
  },
  showSkip: {
    default: false,
    type: Boolean,
  },
  skipChecked: {
    default: false,
    type: Boolean,
  },
  merchant: {
    default: {} as UIMerchant,
    type: Object as PropType<UIMerchant>,
  },
});

const agree = ref(false);
const payType = ref(0); // 默认支付宝
const showPayType = ref(false); // 是否显示支付方式选择（App/H5 显示）
const payTypeHeight = ref(0); // 支付方式区域高度

// 判断当前运行环境
const isApp = ref(false);
const checkEnv = () => {
  // #ifdef APP-PLUS
  isApp.value = true;
  showPayType.value = true;
  payTypeHeight.value = 324;
  // #endif
  // #ifdef H5
  isApp.value = false;
  showPayType.value = true;
  payTypeHeight.value = 324;
  // #endif
  // #ifndef APP-PLUS || H5
  isApp.value = false;
  showPayType.value = false;
  payTypeHeight.value = 0;
  // #endif
};

const isSkip = ref(props.skipChecked);
const vShow = ref(false);
watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);
watch(
  () => isSkip.value,
  (value) => {
    emits("update:skipChecked", value);
  }
);

const selectPayType = (type: number) => {
  payType.value = type;
  AppModule.setPayType(type);
};

const didTapConfirm = () => {
  if (!agree.value) {
    ShowToast("请阅读并允许协议");
    return;
  }
  // 非 App 环境只传商品ID，App 环境额外传支付方式
  if (isApp.value) {
    emits("didTapPay", props.goods.id);
  } else {
    emits("didTapPay", props.goods.id);
  }
};

const didTapClose = () => {
  emits("update:show", false);
};
const didTapProtocol = () => {
  modalShow.value = true;
  showModalType(1);
};
const emits = defineEmits([
  "update:show",
  "didTapCoupon",
  "didTapPay",
  "update:skipChecked",
  "didTapPayWithType",
]);
watch(
  () => props.show,
  async (v) => {
    if (v) {
      await getCoupon();
      await UserModule.getUserInfo();
    }
  }
);

onMounted(() => {
  checkEnv();
});
</script>

<style lang="scss" scoped>
</style>
