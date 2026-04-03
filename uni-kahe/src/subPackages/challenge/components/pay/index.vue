<template>
  <tn-popup
    v-model="vShow"
    open-direction="bottom"
    bg-color="#fafafa"
    @close="emits('update:show', false)"
  >
    <view
      class="relative w-full flex flex-col bg-#fafafa rounded-t-20rpx box-border"
      :style="{
        height: `calc(990rpx + ${safeAreaBottom}px)`,
        paddingBottom: `calc(${safeAreaBottom}px + 18rpx)`,
      }"
    >
      <!-- Header -->
      <view
        class="relative h-72rpx w-full flex flex-row items-center justify-center bg-white"
      >
        <image
          class="absolute left-28rpx top-17rpx w-20rpx h-32rpx"
          src="https://jms.85gui7.com/kahe-202510/ka-he/common/right-arrow.png"
          @tap.stop="emits('update:show', false)"
        />
        <view class="font-400 text-28rpx text-black">确认购买</view>
      </view>

      <!-- Scroll Content -->
      <scroll-view
        class="relative w-full box-border px-16rpx flex flex-col"
        :scroll-y="true"
        :enable-flex="true"
        scroll-with-animation
        :style="{ height: `calc(990rpx - 80rpx - ${payTypeHeight}rpx)` }"
      >
        <!-- Product Info -->
        <view class="p-26rpx w-full box-border bg-white rounded-20rpx mt-16rpx">
          <view
            class="flex flex-row items-center pb-26rpx border-b-1rpx border-#e8e8e8"
          >
            <image
              class="w-115rpx h-115rpx bg-white shadow-sm rounded-4rpx"
              :src="goods.image"
            />
            <view class="ml-42rpx flex flex-col">
              <text class="text-32rpx font-400 text-black">{{
                goods.title
              }}</text>
              <text
                class="text-32rpx font-400 text-black theme-font"
                v-if="!goods.isIntegral"
                >¥{{ goods.totalPrice }}</text
              >
              <text class="text-32rpx font-400 text-black theme-font" v-else
                >{{ goods.totalPrice }}积分</text
              >
            </view>
          </view>
          <view class="relative w-full pt-26rpx flex flex-col">
            <view
              class="relative w-full flex flex-row items-center justify-between mb-18rpx"
            >
              <view class="font-400 text-24rpx text-#888">优惠券</view>
              <view @tap.stop="emits('didTapCoupon')">
                <view class="font-400 text-24rpx text-#888">{{
                  goods.coupon
                    ? goods.coupon.title
                    : hasValidCoupon
                      ? "请选择优惠券"
                      : "暂无可用优惠券"
                }}</view>
              </view>
            </view>
            <view
              class="relative w-full flex flex-row items-center justify-between mb-18rpx"
            >
              <view class="font-400 text-24rpx text-#888">点券</view>
              <view class="font-400 text-24rpx text-#888"
                >{{ userInfo.money }}(抵扣{{ goods.usedMoney }})</view
              >
            </view>
            <view
              class="relative w-full flex flex-row items-center justify-between mb-18rpx"
            >
              <view class="font-400 text-24rpx text-#888">绑定点券</view>
              <view class="font-400 text-24rpx text-#888"
                >{{ userInfo.coin }}(抵扣{{ goods.usedCoin }})</view
              >
            </view>
            <view
              class="relative w-full flex flex-row items-center justify-between mb-18rpx"
            >
              <view class="font-400 text-24rpx text-#888">积分</view>
              <view class="font-400 text-24rpx text-#888"
                >{{ userInfo.integral }}(抵扣{{ goods.usedIntegral }})</view
              >
            </view>
            <view
              class="relative w-full flex flex-row items-center justify-between"
            >
              <view class="font-400 text-24rpx text-#888">共计</view>
              <view class="font-400 text-24rpx text-red">{{
                goods.usedPrice
              }}</view>
            </view>
          </view>
        </view>

        <!-- Save Location -->
        <view
          class="mt-26rpx p-26rpx w-full box-border bg-white rounded-20rpx flex flex-row"
        >
          <view class="font-400 text-22rpx text-#888 w-120rpx">购买后存至</view>
          <view class="w-[calc(100%-120rpx)] ml-12rpx flex flex-col gap-22rpx">
            <view class="flex flex-row items-center">
              <image
                :src="merchant?.icon"
                class="w-32rpx h-32rpx rounded-full"
              />
              <view class="font-400 text-22rpx text-black ml-8rpx"
                >{{ merchant?.name }}寄存柜</view
              >
            </view>

            <view class="flex flex-row items-center mt-16rpx">
              <view class="flex flex-row items-center mr-8rpx">
                <view class="font-400 text-22rpx text-black">极速发货 </view>
                <image
                  class="w-18rpx h-18rpx ml-4rpx"
                  src="https://jms.85gui7.com/kahe-202510/ka-he/common/ok.png"
                />
              </view>
              <view class="flex flex-row items-center mr-8rpx">
                <view class="font-400 text-22rpx text-black">品质保证 </view>
                <image
                  class="w-18rpx h-18rpx ml-4rpx"
                  src="https://jms.85gui7.com/kahe-202510/ka-he/common/ok.png"
                />
              </view>
              <view class="flex flex-row items-center">
                <view class="font-400 text-22rpx text-black">售后无忧 </view>
                <image
                  class="w-18rpx h-18rpx ml-4rpx"
                  src="https://jms.85gui7.com/kahe-202510/ka-he/common/ok.png"
                />
              </view>
            </view>
          </view>
        </view>

        <!-- Skip Option -->
        <!--        <view-->
        <!--          class="mt-26rpx p-26rpx w-full box-border bg-white rounded-20rpx flex flex-row"-->
        <!--          v-if="showSkip"-->
        <!--        >-->
        <!--          <view class="w-full flex flex-row items-center justify-center">-->
        <!--            <agreement v-model:checked="isSkip" title="跳过翻牌" sub-title="" />-->
        <!--          </view>-->
        <!--        </view>-->

        <!-- Purchase Notice -->
        <view
          class="mt-26rpx p-26rpx w-full box-border bg-white rounded-20rpx flex flex-row"
        >
          <view class="font-400 text-22rpx text-#888 w-120rpx">购买需知</view>
          <view class="w-[calc(100%-120rpx)] ml-12rpx flex flex-col gap-22rpx">
            <view class="font-400 text-22rpx text-#888"
              >我已知悉未成年人禁止购买
            </view>
            <view
              class="font-400 text-22rpx text-#888 mt-8rpx p-8rpx px-4rpx bg-#f6f6f6 rounded-10rpx mb-32rpx"
              >严禁未满8周岁未成年人购买，8周岁及以上未成年人的一
              切消费行为必须由监护人同意并在其陪同下进行。
            </view>
            <view class="font-400 text-22rpx text-#888">
              我已知悉该商品不适用"七天无理由退换货"
            </view>
            <view
              class="font-400 text-22rpx text-#888 mt-8rpx p-8rpx px-4rpx bg-#f6f6f6 rounded-10rpx mb-32rpx"
            >
              抽卡机、一番赏、盲盒类商品会在付款后完成结果获取，
              不适用于7天无理由退货。若存在质量问题或错发、漏发
              等售后问题，可联系客服提供商品开箱视频进行售后处理。
            </view>
            <view class="font-400 text-22rpx text-#888">
              我已知悉该商品发货规则及自动收货规则</view
            >
            <view
              class="font-400 text-22rpx text-#888 mt-8rpx p-8rpx px-4rpx bg-#f6f6f6 rounded-10rpx mb-32rpx"
            >
              所有商品均需自行申请发货，您可在"寄存柜-待处理"查
              看并申请发货，发货邮费为12元，仅支持发货到中国大陆
              区域(港、澳、台、及海外地区暂不支持)。</view
            >
            <view class="font-400 text-22rpx text-#888">
              我已知悉该商品概率详情</view
            >
            <view
              class="font-400 text-22rpx text-#888 mt-8rpx p-8rpx px-4rpx bg-#f6f6f6 rounded-10rpx mb-32rpx"
            >
              抽卡机、一番赏、盲盒类商品抽取存在概率性，付款请谨
              慎查看各系列商品的获取概率不同。</view
            >
          </view>
        </view>
      </scroll-view>

      <!-- Bottom Section -->
      <view
        class="fixed bottom-0 left-0 w-full bg-white flex flex-col px-32rpx box-border"
        :style="{ paddingBottom: `${safeAreaBottom}px` }"
      >
        <view class="py-16rpx w-full box-border">
          <agreement
            v-model:checked="agree"
            @did-tap-protocol="didTapProtocol"
          />
        </view>

        <!-- Payment Type Selection -->
        <view
          class="w-full bg-white py-20rpx px-32rpx box-border border-t-1rpx border-#f0f0f0"
          v-if="showPayType"
        >
          <view class="text-26rpx text-#333 font-500 mb-16rpx"
            >选择支付方式</view
          >
          <view class="flex flex-col">
            <!-- #ifdef APP-PLUS || H5 -->
            <!-- WeChat Pay -->
            <view
              class="flex flex-row items-center justify-between py-16rpx"
              :class="{ active: payType === 1 }"
              @tap.stop="selectPayType(1)"
            >
              <view class="flex flex-row items-center">
                <view
                  class="w-56rpx h-56rpx rounded-12rpx flex items-center justify-center mr-20rpx overflow-hidden bg-#09bb07"
                >
                  <image
                    class="w-40rpx h-40rpx"
                    src="https://jms.85gui7.com/kahe-202510/wechat-pay.svg"
                    mode="aspectFit"
                  />
                </view>
                <view class="flex flex-col">
                  <view
                    class="text-28rpx text-#333 font-500 leading-1.4"
                    :class="payType === 1 ? 'text-#333' : ''"
                    >微信支付</view
                  >
                  <view class="text-22rpx text-#999 mt-4rpx">{{
                    isApp ? "微信APP支付" : "微信H5支付"
                  }}</view>
                </view>
              </view>
              <view>
                <view
                  v-if="payType === 1"
                  class="w-36rpx h-36rpx rounded-full border-2rpx border-#efd56f flex items-center justify-center"
                >
                  <view class="w-20rpx h-20rpx rounded-full bg-#efd56f"></view>
                </view>
                <view
                  v-else
                  class="w-36rpx h-36rpx rounded-full border-2rpx border-#ddd"
                ></view>
              </view>
            </view>

            <!-- Alipay -->
            <view
              class="flex flex-row items-center justify-between py-16rpx"
              :class="{ active: payType === 0 }"
              @tap.stop="selectPayType(0)"
            >
              <view class="flex flex-row items-center">
                <view
                  class="w-56rpx h-56rpx rounded-12rpx flex items-center justify-center mr-20rpx overflow-hidden bg-#1677ff"
                >
                  <image
                    class="w-40rpx h-40rpx"
                    src="https://jms.85gui7.com/kahe-202510/alipay.svg"
                    mode="aspectFit"
                  />
                </view>
                <view class="flex flex-col">
                  <view
                    class="text-28rpx text-#333 font-500 leading-1.4"
                    :class="payType === 0 ? 'text-#333' : ''"
                    >支付宝支付</view
                  >
                  <view class="text-22rpx text-#999 mt-4rpx">{{
                    isApp ? "支付宝APP支付" : "支付宝H5支付"
                  }}</view>
                </view>
              </view>
              <view>
                <view
                  v-if="payType === 0"
                  class="w-36rpx h-36rpx rounded-full border-2rpx border-#efd56f flex items-center justify-center"
                >
                  <view class="w-20rpx h-20rpx rounded-full bg-#efd56f"></view>
                </view>
                <view
                  v-else
                  class="w-36rpx h-36rpx rounded-full border-2rpx border-#ddd"
                ></view>
              </view>
            </view>
            <!-- #endif -->
          </view>
        </view>

        <!-- Pay Button Area -->
        <view
          class="flex flex-row items-center justify-between py-0 px-32rpx w-full box-border"
        >
          <view class="flex flex-col">
            <view class="text-30rpx text-red leading-26rpx"
              >¥{{ goods.payPrice }}</view
            >
            <view class="text-30rpx text-black leading-26rpx mt-28rpx"
              >订单合计</view
            >
          </view>
          <view
            class="relative w-336rpx h-60rpx bg-#efd56f rounded-30rpx flex flex-row items-center justify-center"
            @tap.stop="didTapConfirm"
          >
            <view class="text-center leading-61rpx text-24rpx text-#5b1409"
              >立即付款</view
            >
            <view class="text-14rpx text-#888 leading-26rpx ml-8rpx"
              >已抵扣{{ goods.usedPrice }}</view
            >
          </view>
        </view>
      </view>
    </view>
  </tn-popup>
  <common-modal
    v-model:show="modalShow"
    :title="modalTitle"
    :content="modalContent"
  />
</template>

<script lang="ts" setup>
import Agreement from "@/components/agreement/index.vue";
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
const safeAreaBottom = ref(0);

const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  goods: {
    default: {} as UIProductPayModel,
    type: Object as PropType<UIProductPayModel>,
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
  safeAreaBottom.value = uni.getSystemInfoSync().safeAreaInsets?.bottom || 0;
  // #endif
  // #ifdef H5
  isApp.value = false;
  showPayType.value = true;
  payTypeHeight.value = 324;
  safeAreaBottom.value = 0;
  // #endif
  // #ifndef APP-PLUS || H5
  isApp.value = false;
  showPayType.value = false;
  payTypeHeight.value = 0;
  safeAreaBottom.value = uni.getSystemInfoSync().safeAreaInsets?.bottom || 0;
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
