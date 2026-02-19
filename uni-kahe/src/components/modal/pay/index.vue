<template>
  <tn-popup
    v-model="vShow"
    open-direction="bottom"
    bg-color="#fafafa"
    @close="emits('update:show', false)"
  >
    <view class="pay">
      <view class="pay-head">
        <image
          class="pay-head-arrow"
          src="https://jms.85gui7.com/kahe-202510/ka-he/common/right-arrow.png"
          @tap.stop="emits('update:show', false)"
        />
        <view class="pay-head-title">确认购买</view>
      </view>
      <scroll-view
        class="pay-scroll"
        :scroll-y="true"
        :enable-flex="true"
        scroll-with-animation
        :style="{ height: `calc(990rpx - 80rpx - ${payTypeHeight}rpx)` }"
      >
        <view class="pay-scroll-info">
          <view class="pay-scroll-info-top">
            <image class="pay-scroll-info-top-logo" :src="goods.image" />
            <view class="pay-scroll-info-top-right">
              <text class="pay-scroll-info-top-right-title">{{
                goods.title
              }}</text>
              <text class="pay-scroll-info-top-right-price theme-font"
                >¥{{ goods.totalPrice }}</text
              >
            </view>
          </view>
          <view class="pay-scroll-info-bottom">
            <view class="pay-scroll-info-bottom-row">
              <view class="pay-scroll-info-bottom-row-title">优惠券</view>
              <view
                class="pay-scroll-info-bottom-row-right"
                @tap.stop="emits('didTapCoupon')"
              >
                <view class="pay-scroll-info-bottom-row-value">{{
                  goods.coupon
                    ? goods.coupon.title
                    : hasValidCoupon
                      ? "请选择优惠券"
                      : "暂无可用优惠券"
                }}</view>
              </view>
            </view>
            <view class="pay-scroll-info-bottom-row">
              <view class="pay-scroll-info-bottom-row-title">点券</view>
              <view class="pay-scroll-info-bottom-row-value"
                >{{ userInfo.money }}(抵扣{{ goods.usedMoney }})</view
              >
            </view>
            <view class="pay-scroll-info-bottom-row">
              <view class="pay-scroll-info-bottom-row-title">绑定点券</view>
              <view class="pay-scroll-info-bottom-row-value"
                >{{ userInfo.coin }}(抵扣{{ goods.usedCoin }})</view
              >
            </view>
            <view class="pay-scroll-info-bottom-row">
              <view class="pay-scroll-info-bottom-row-title">积分</view>
              <view class="pay-scroll-info-bottom-row-value"
                >{{ userInfo.integral }}(抵扣{{ goods.usedIntegral }})</view
              >
            </view>
            <view class="pay-scroll-info-bottom-row">
              <view class="pay-scroll-info-bottom-row-title">共计</view>
              <view
                class="pay-scroll-info-bottom-row-value"
                style="color: #ff0000"
                >{{ goods.usedPrice }}</view
              >
            </view>
          </view>
        </view>
        <view class="pay-scroll-save">
          <view class="pay-scroll-save-title">购买后存至</view>
          <view class="pay-scroll-save-right">
            <view class="row">
              <image
                :src="merchant?.icon"
                style="width: 32rpx; height: 32rpx; border-radius: 50%"
              />
              <view class="black-text">{{ merchant?.name }}寄存柜</view>
            </view>

            <view class="row" style="margin-top: 16rpx">
              <view class="row" style="margin-right: 8rpx">
                <view class="black-text">极速发货 </view>
                <image class="ok-icon" src="https://jms.85gui7.com/kahe-202510/ka-he/common/ok.png" />
              </view>
              <view class="row" style="margin-right: 8rpx">
                <view class="black-text">品质保证 </view>
                <image class="ok-icon" src="https://jms.85gui7.com/kahe-202510/ka-he/common/ok.png" />
              </view>
              <view class="row">
                <view class="black-text">售后无忧 </view>
                <image class="ok-icon" src="https://jms.85gui7.com/kahe-202510/ka-he/common/ok.png" />
              </view>
            </view>
          </view>
        </view>
        <view class="pay-scroll-save">
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
        <view class="pay-scroll-save">
          <view class="pay-scroll-save-title">购买需知</view>
          <view class="pay-scroll-save-right">

            <view class="gray-text">我已知悉未成年人禁止购买 </view>
            <view class="gray-text group-text"
              >严禁未满8周岁未成年人购买，8周岁及以上未成年人的一
              切消费行为必须由监护人同意并在其陪同下进行。
            </view>
            <view class="gray-text">
              我已知悉该商品不适用"七天无理由退换货"
            </view>
            <view class="gray-text group-text">
              抽卡机、一番赏、盲盒类商品会在付款后完成结果获取，
              不适用于7天无理由退货。若存在质量问题或错发、漏发
              等售后问题，可联系客服提供商品开箱视频进行售后处理。
            </view>
            <view class="gray-text"> 我已知悉该商品发货规则及自动收货规则</view>
            <view class="gray-text group-text">
              所有商品均需自行申请发货，您可在“寄存柜-待处理”查
              看并申请发货，发货邮费为12元，仅支持发货到中国大陆
              区域(港、澳、台、及海外地区暂不支持)。</view
            >
            <view class="gray-text"> 我已知悉该商品概率详情</view>

            <view class="gray-text group-text">
              抽卡机、一番赏、盲盒类商品抽取存在概率性，付款请谨
              慎查看各系列商品的获取概率不同。</view
            >
          </view>
        </view>
      </scroll-view>

      <!-- 支付方式选择 -->


      <view class="pay-bottom">
        <view class="pay-bottom-check">
          <agreement
            v-model:checked="agree"
            @did-tap-protocol="didTapProtocol"
          />
        </view>

        <view class="pay-type" v-if="showPayType">
          <view class="pay-type-title">选择支付方式</view>
          <view class="pay-type-list">

            <!-- #ifdef APP -->
            <!-- 微信支付 -->
            <view
              class="pay-type-item"
              :class="{ active: payType === 1 }"
              @tap.stop="selectPayType(1)"
            >
              <view class="pay-type-item-left">
                <view class="pay-type-icon wechat-icon">
                  <image
                    class="pay-type-icon-img"
                    src="https://jms.85gui7.com/kahe-202510/wechat-pay.svg"
                    mode="aspectFit"
                  />
                </view>
                <view class="pay-type-info">
                  <view class="pay-type-name">微信支付</view>
                  <view class="pay-type-desc">微信APP支付</view>
                </view>
              </view>
              <view class="pay-type-check">
                <view class="pay-type-check-circle" v-if="payType === 1">
                  <view class="pay-type-check-dot"></view>
                </view>
                <view class="pay-type-check-empty" v-else></view>
              </view>
            </view>

            <!-- 支付宝支付 -->
            <view
              class="pay-type-item"
              :class="{ active: payType === 0 }"
              @tap.stop="selectPayType(0)"
            >
              <view class="pay-type-item-left">
                <view class="pay-type-icon alipay-icon">
                  <image
                    class="pay-type-icon-img"
                    src="https://jms.85gui7.com/kahe-202510/alipay.svg"
                    mode="aspectFit"
                  />
                </view>
                <view class="pay-type-info">
                  <view class="pay-type-name">支付宝支付</view>
                  <view class="pay-type-desc">支付宝APP支付</view>
                </view>
              </view>
              <view class="pay-type-check">
                <view class="pay-type-check-circle" v-if="payType === 0">
                  <view class="pay-type-check-dot"></view>
                </view>
                <view class="pay-type-check-empty" v-else></view>
              </view>
            </view>
            <!-- #endif -->
          </view>
        </view>
        <div class="pay-bottom-pay">
          <view class="pay-bottom-info">
            <view class="pay-bottom-info-price">¥{{ goods.payPrice }}</view>
            <view class="pay-bottom-info-title">订单合计</view>
          </view>
          <view class="pay-bottom-btn" @tap.stop="didTapConfirm">
            <view class="pay-bottom-btn-title">立即付款</view>
            <view class="pay-bottom-btn-subTitle"
            >已抵扣{{ goods.usedPrice }}</view
            >
          </view>
        </div>

      </view>
      <!--      <view>-->
      <!--        <view class="pay-top">-->
      <!--          <view class="pay-top-info">-->
      <!--            <text class="pay-top-info-subTitle"-->
      <!--              >购买明信片附赠礼品 未成年禁止下单</text-->
      <!--            >-->
      <!--          </view>-->
      <!--        </view>-->
      <!--        <view class="pay-options">-->
      <!--          <pay-option-->
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
      <!--          class="pay-userMoney"-->
      <!--          style="margin: 0 auto; font-size: 20rpx; color: #000"-->
      <!--          >当前拥有<text style="color: #4b71ff">{{ userInfo.integral }}</text-->
      <!--          >积分，<text style="color: #4b71ff">{{ userInfo.money }}</text-->
      <!--          >点券，<text style="color: #4b71ff">{{ userInfo.coin }}</text-->
      <!--          >绑定点券</view-->
      <!--        >-->

      <!--        <pay-button-->
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
const showPayType = ref(false); // 是否显示支付方式选择（只在 App 环境显示）
const payTypeHeight = ref(0); // 支付方式区域高度

// 判断是否为 App 环境
const isApp = ref(false);
const checkEnv = () => {
  // #ifdef APP
  isApp.value = true;
  showPayType.value = true;
  payTypeHeight.value = 324;
  // #endif
  // #ifndef APP
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
.pay {
  position: relative;
  width: 100%;
  height: calc(990rpx + env(safe-area-inset-bottom));
  padding: 0 0 calc(env(safe-area-inset-bottom) + 18rpx) 0;
  background: #fafafa;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 20rpx 20rpx 0 0;
  &-head {
    position: relative;
    height: 72rpx;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: white;
    &-title {
      font-weight: 400;
      font-size: 28rpx;
      color: #000000;
    }
    &-arrow {
      position: absolute;
      left: 28rpx;
      top: 17rpx;
      width: 20rpx;
      height: 32rpx;
    }
  }
  &-scroll {
    position: relative;
    width: 100%;
    height: calc(990rpx - 80rpx);
    box-sizing: border-box;
    padding: 16rpx;
    display: flex;
    flex-direction: column;
    &-info {
      padding: 26rpx;
      width: 100%;
      box-sizing: border-box;
      background: #ffffff;
      border-radius: 20rpx;

      &-top {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-bottom: 26rpx;
        border-bottom: 1rpx solid #e8e8e8;
        &-logo {
          width: 115rpx;
          height: 115rpx;
          background: #ffffff;
          box-shadow: 0rpx 0rpx 5rpx 0rpx #d4dee9;
          border-radius: 4rpx;
        }
        &-right {
          margin-left: 42rpx;
          display: flex;
          flex-direction: column;
          &-title {
            font-size: 32rpx;
            font-weight: 400;
            color: #000000;
          }
          &-price {
            font-size: 32rpx;
            font-weight: 400;
            color: #000000;
          }
        }
      }
      &-bottom {
        position: relative;
        width: 100%;
        padding-top: 26rpx;
        display: flex;
        flex-direction: column;
        &-row {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18rpx;
          &-title {
            font-weight: 400;
            font-size: 24rpx;
            color: #888888;
          }
          &-value {
            font-weight: 400;
            font-size: 24rpx;
            color: #888888;
          }
        }
      }
    }

    &-save {
      margin-top: 26rpx;
      padding: 26rpx;
      width: 100%;
      box-sizing: border-box;
      background: #ffffff;
      border-radius: 20rpx;
      display: flex;
      flex-direction: row;
      &-title {
        font-weight: 400;
        font-size: 22rpx;
        color: #888888;
        width: 120rpx;
      }
      &-right {
        width: calc(100% - 120rpx);
        margin-left: 12rpx;
        display: flex;
        flex-direction: column;
        column-gap: 22rpx;
      }
    }
  }

  &-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    &-img {
      width: 182rpx;
      height: 182rpx;
      box-shadow: 0rpx 0rpx 6rpx 0rpx #d4dee9;
      border-radius: 4rpx;
    }
    &-info {
      margin-left: 22rpx;
      position: relative;
      display: flex;
      flex-direction: column;
    }
  }

  &-options {
    padding: 46rpx 0;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}

.pay-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  //height: calc(141rpx);
  display: flex;
  padding: 0 32rpx env(safe-area-inset-bottom);
  box-sizing: border-box;
  flex-direction: column;
  &-check{
    padding: 16rpx 32rpx;
    width: 100%;
    box-sizing: border-box;
  }
  &-pay{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 32rpx;
    width: 100%;
    box-sizing: border-box;
  }
  &-info {
    display: flex;
    flex-direction: column;
    &-price {
      font-size: 30rpx;
      color: #ff0000;
      line-height: 26rpx;
    }
    &-title {
      margin-top: 28rpx;
      font-size: 30rpx;
      color: #000000;
      line-height: 26rpx;
    }
  }
  &-btn {
    position: relative;
    width: 336rpx;
    height: 60rpx;
    background-color: #efd56f;
    border-radius: 30rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &-img {
      width: 100%;
      height: 100%;
    }
    &-title {
      text-align: center;
      line-height: 61rpx;
      font-size: 24rpx;
      color: #5b1409;
    }
    &-subTitle {
      font-size: 14rpx;
      color: #888888;
      line-height: 26rpx;
    }
  }
}

.gray-text {
  font-weight: 400;
  font-size: 22rpx;
  color: #888888;
}
.black-text {
  font-weight: 400;
  font-size: 22rpx;
  color: #000000;
}
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.column {
  display: flex;
  flex-direction: column;
}
.ok-icon {
  width: 18rpx;
  height: 18rpx;
}
.group-text {
  margin-top: 8rpx;
  padding: 8rpx 4rpx;
  background: #f6f6f6;
  border-radius: 10rpx;
  margin-bottom: 32rpx;
}

/* 支付方式选择样式 */
.pay-type {

  width: 100%;
  background-color: #fff;
  padding: 20rpx 32rpx;
  box-sizing: border-box;
  border-top: 1rpx solid #f0f0f0;

  &-title {
    font-size: 26rpx;
    color: #333;
    font-weight: 500;
    margin-bottom: 16rpx;
  }

  &-list {
    display: flex;
    flex-direction: column;
  }

  &-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16rpx 0;

    &.active {
      .pay-type-name {
        color: #333;
      }
    }

    &-left {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  &-icon {
    width: 56rpx;
    height: 56rpx;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20rpx;
    overflow: hidden;

    &.balance-icon {
      background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
    }

    &.wechat-icon {
      background-color: #09bb07;
    }

    &.alipay-icon {
      background-color: #1677ff;
    }

    &-text {
      font-size: 24rpx;
      color: #fff;
      font-weight: bold;
    }

    &-img {
      width: 40rpx;
      height: 40rpx;
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
  }

  &-name {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
    line-height: 1.4;
  }

  &-desc {
    font-size: 22rpx;
    color: #999;
    margin-top: 4rpx;
  }

  &-check {
    &-circle {
      width: 36rpx;
      height: 36rpx;
      border-radius: 50%;
      border: 2rpx solid #efd56f;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-dot {
      width: 20rpx;
      height: 20rpx;
      border-radius: 50%;
      background-color: #efd56f;
    }

    &-empty {
      width: 36rpx;
      height: 36rpx;
      border-radius: 50%;
      border: 2rpx solid #ddd;
    }
  }
}
</style>
