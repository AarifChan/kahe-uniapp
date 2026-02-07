<template>
  <view class="groupBuySubmit">
    <scroll-view class="groupBuySubmit-content" scroll-y>
      <!--            <view class="groupBuySubmit-content-address" @tap.stop="navToSelectAddress">-->
      <!--                <view class="groupBuySubmit-content-address-left">-->
      <!--                    <image class="groupBuySubmit-content-address-left-img" src="https://jms.85gui7.com/kahe-202510/groupBuy/address.png" />-->
      <!--                    <view>-->
      <!--                        <view class="groupBuySubmit-content-address-left-value">{{ selectAddress ? selectAddress.province + selectAddress.city + selectAddress.district + selectAddress.detail  : '请选择地址' }} </view>-->
      <!--                        <view class="groupBuySubmit-content-address-left-value">{{ selectAddress ? selectAddress.realName + '  ' + selectAddress.phone  : '' }} </view>-->
      <!--                    </view>-->

      <!--                </view>-->
      <!--                <image class="groupBuySubmit-content-address-right" src="https://jms.85gui7.com/kahe-202510/groupBuy/arrow-1.png" />-->
      <!--            </view>-->
      <view class="groupBuySubmit-content-group">
        <!--                <view class="groupBuySubmit-content-merchant">-->
        <!--                    <image class="groupBuySubmit-content-merchant-logo" />-->
        <!--                    <view class="groupBuySubmit-content-merchant-title">阿里嘎多卡社</view>-->
        <!--                </view>-->
        <view class="groupBuySubmit-content-info">
          <view class="groupBuySubmit-content-info-left">
            <image
              class="groupBuySubmit-content-info-left-logo"
              :src="groupBuyDetail.logo"
            />
            <view class="groupBuySubmit-content-info-left-subInfo">
              <view
                class="groupBuySubmit-content-info-left-subInfo-title"
                style="margin-top: 10px"
                >{{ groupBuyDetail.title }}</view
              >
              <view
                class="groupBuySubmit-content-info-left-subInfo-price"
                v-if="payPrice !== groupBuyDetail.price"
              >
                <view class="groupBuySubmit-content-info-left-subInfo-price-p1"
                  >¥{{ payPrice }}</view
                >
                <view
                  class="groupBuySubmit-content-info-left-subInfo-price-p2"
                  >{{ groupBuyDetail.price }}</view
                >
              </view>
              <view
                class="groupBuySubmit-content-info-left-subInfo-price"
                v-else
              >
                <view class="groupBuySubmit-content-info-left-subInfo-price-p1"
                  >¥{{ groupBuyDetail.price }}</view
                >
              </view>
              <view
                class="groupBuySubmit-content-info-left-subInfo-subTitle"
                style="margin-top: 15px"
                >库存:{{ groupBuyDetail.total - groupBuyDetail.sales }}</view
              >
              <view class="groupBuySubmit-content-info-left-subInfo-subTitle"
                >规格 | 1 张</view
              >
            </view>
          </view>
          <view class="groupBuySubmit-content-info-right">
            <view class="groupBuySubmit-content-info-right-num">数量×1</view>
            <image
              class="groupBuySubmit-content-info-right-arrow"
              src="https://jms.85gui7.com/kahe-202510/groupBuy/right-arrow.png"
            />
          </view>
        </view>
        <view class="groupBuySubmit-content-other">
          <view class="groupBuySubmit-content-other-title theme-font"
            >赠送卡密</view
          >
          <view class="groupBuySubmit-content-other-line" />
        </view>
        <view class="groupBuySubmit-content-detail"
          >{{ groupBuyDetail.title }} 卡密一张</view
        >
        <!--                <view class="groupBuySubmit-content-price">{{payPrice}}</view>-->
        <view class="groupBuySubmit-content-num">
          <view
            class="groupBuySubmit-content-num-item"
            @tap.stop="
              changeNum(true, groupBuyDetail.total - groupBuyDetail.sales)
            "
            >➖</view
          >
          <view class="groupBuySubmit-content-num-value">{{ selectNum }}</view>
          <view
            class="groupBuySubmit-content-num-item"
            @tap.stop="
              changeNum(false, groupBuyDetail.total - groupBuyDetail.sales)
            "
            >➕</view
          >
          <view class="groupBuySubmit-content-num-sock"
            >库存:{{ groupBuyDetail.total - groupBuyDetail.sales }}</view
          >
        </view>
        <view class="groupBuySubmit-content-title">优惠套餐</view>
        <view class="groupBuySubmit-content-list">
          <view
            class="groupBuySubmit-content-list-item"
            :class="
              item.num === selectNum ? 'groupBuySubmit-content-list-select' : ''
            "
            v-for="(item, index) in groupBuyDetail.prices"
            :key="'index' + index"
            @tap.stop="handleSelectNum(item)"
          >
            <view
              class="groupBuySubmit-content-list-item-num"
              :class="
                item.num === selectNum
                  ? 'groupBuySubmit-content-list-select-color'
                  : ''
              "
              >{{ item.num }}份</view
            >
            <view
              class="groupBuySubmit-content-list-item-price"
              :class="
                item.num === selectNum
                  ? 'groupBuySubmit-content-list-select-color'
                  : ''
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
      <!--                        <image class="groupBuySubmit-content-line-arrow" src="https://jms.85gui7.com/kahe-202510/groupBuy/arrow.png" />-->
      <!--                    </view>-->
      <!--                </view>-->
      <!--            </view>-->
    </scroll-view>
    <view class="groupBuySubmit-bottom">
      <view class="groupBuySubmit-bottom-tips">
        <view
          class="groupBuySubmit-bottom-tips-select"
          @tap.stop="checked = !checked"
        >
          <image
            class="groupBuySubmit-bottom-tips-select-bg"
            src="https://jms.85gui7.com/kahe-202510/groupBuy/select-normal.png"
          />
          <image
            v-if="checked"
            class="groupBuySubmit-bottom-tips-select-value"
            src="https://jms.85gui7.com/kahe-202510/groupBuy/select.png"
          />
        </view>
        <view class="groupBuySubmit-bottom-tips-content">
          <text class="groupBuySubmit-bottom-tips-content-value1"
            >我已阅读并同意</text
          >
          <!--                    <text class="groupBuySubmit-bottom-tips-content-value2" @tap.stop="clickRule">《活动规则》</text>-->
          <!--                    <text class="groupBuySubmit-bottom-tips-content-value1">、</text>-->
          <text
            class="groupBuySubmit-bottom-tips-content-value2"
            @tap.stop="clickRule"
            >《购买须知》</text
          >
          <text class="groupBuySubmit-bottom-tips-content-value1"
            >;您所购商品因其
            属性及价格的特殊性，同意购买商品后不支持7天无理由退款;我已知晓本产品checklist由商家自定义，并已查阅产品卡密列表
            的详细信息。</text
          >
        </view>
      </view>
      <view class="groupBuySubmit-bottom-line">
        <view class="groupBuySubmit-bottom-line-left">
          <view class="groupBuySubmit-bottom-line-left-row">
            <view class="groupBuySubmit-bottom-line-left-value1 SimHei-font"
              >共{{ selectNum }}份</view
            >
            <view class="groupBuySubmit-bottom-line-left-line" />
            <view class="groupBuySubmit-bottom-line-left-value1 SimHei-font"
              >优惠：{{ discountPrice }}</view
            >
          </view>

          <view class="groupBuySubmit-bottom-line-left-row">
            <view class="groupBuySubmit-bottom-line-left-value1">合计：</view>
            <view class="groupBuySubmit-bottom-line-left-value2"
              >¥{{ totalPrice }}</view
            >
          </view>
        </view>
        <view
          class="groupBuySubmit-bottom-line-right"
          @tap.stop="didTapSubmit(valueId)"
        >
          <image
            class="groupBuySubmit-bottom-line-right-img"
            src="https://jms.85gui7.com/kahe-202510/groupBuy/btn.png"
          />
          <view class="groupBuySubmit-bottom-line-right-title theme-font"
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

<style lang="scss" scoped>
.groupBuySubmit {
  position: relative;
  background-color: #000000;
  width: 100%;
  height: 100vh;

  &-bg {
    width: 100%;
    height: 100%;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100% - env(safe-area-inset-bottom) - 303rpx);
    &-address {
      margin: 15rpx 30rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 16px;
      box-sizing: border-box;
      width: calc(100% - 60rpx);
      border-bottom: 1px solid #ffffff;
      justify-content: space-between;
      &-left {
        margin-left: 4rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        &-img {
          width: 38rpx;
          height: 47rpx;
        }
        &-value {
          margin-left: 26rpx;
          width: 480rpx;
          font-weight: 400;
          font-size: 22rpx;
          color: #ffffff;
          line-height: 30rpx;
        }
      }
      &-right {
        width: 15rpx;
        height: 28rpx;
      }
    }
    &-group {
      margin: 30rpx 16rpx;
      width: calc(100% - 32rpx);
      box-sizing: border-box;
      border-radius: 20rpx;
      border: 2rpx solid #5e432b;
      background: #212121;
      padding: 16rpx 32rpx;
      display: flex;
      flex-direction: column;
    }
    &-merchant {
      display: flex;
      flex-direction: row;
      margin-left: 5rpx;
      align-items: center;
      &-logo {
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
        background-color: yellow;
      }
      &-title {
        margin-left: 15rpx;
        font-weight: 400;
        font-size: 22rpx;
        color: #081d62;
        line-height: 23rpx;
      }
    }
    &-info {
      margin-top: 12rpx;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      &-left {
        display: flex;
        flex-direction: row;
        &-logo {
          width: 180rpx;
          height: 180rpx;
          border-radius: 20rpx;
          border: 2rpx solid #ffb777;
          background: #d9d9d9;
        }
        &-subInfo {
          margin-left: 16rpx;
          display: flex;
          flex-direction: column;
          &-title {
            font-weight: 400;
            font-size: 20rpx;
            color: white;
            line-height: 36rpx;
          }
          &-subTitle {
            font-weight: 400;
            font-size: 18rpx;
            color: white;
            line-height: 36rpx;
          }
          &-price {
            display: flex;
            flex-direction: row;
            &-p1 {
              font-weight: 400;
              font-size: 32rpx;
              color: white;
              line-height: 36rpx;
            }
            &-p2 {
              margin-left: 8rpx;
              font-weight: 400;
              font-size: 32rpx;
              color: white;
              line-height: 36rpx;
              text-decoration-line: line-through;
            }
          }
        }
      }

      &-right {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;

        &-num {
          font-weight: 400;
          font-size: 18rpx;
          color: #ffffff;
          line-height: 36rpx;
          margin-bottom: 12rpx;
        }
        &-arrow {
          width: 14rpx;
          height: 25rpx;
        }
      }
    }

    &-other {
      margin-top: 18rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      &-title {
        font-weight: 400;
        font-size: 30rpx;
        color: #fcd09d;
        line-height: 36rpx;
      }
      &-line {
        width: calc(100% - 120rpx - 16rpx);
        height: 1rpx;
        margin: 0 8rpx;
        background: #fcd09d;
      }
    }

    &-detail {
      margin-top: 26rpx;
      font-weight: 400;
      font-size: 20rpx;
      color: white;
      line-height: 36rpx;
    }
    &-price {
      margin-top: 8rpx;
      font-weight: 400;
      font-size: 32rpx;
      color: #ff1621;
      line-height: 36rpx;
    }
    &-num {
      margin-top: 8rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      &-item {
        width: 38rpx;
        height: 38rpx;
        background: #fcd09d;
        border-radius: 4rpx;
        line-height: 38rpx;
        text-align: center;
        color: white;
      }
      &-value {
        margin: 0 8rpx;
        padding: 0 32rpx;
        height: 38rpx;
        line-height: 38rpx;
        text-align: center;
        font-weight: 400;
        font-size: 32rpx;
        color: #ffffff;
        background: #000000;
        border-radius: 4rpx;
      }
      &-sock {
        margin-left: 24rpx;
        font-weight: 400;
        font-size: 20rpx;
        color: white;
        line-height: 36rpx;
      }
    }
    &-title {
      margin-top: 38rpx;
      font-weight: 400;
      font-size: 26rpx;
      color: white;
      line-height: 36rpx;
    }
    &-list {
      margin-top: 28rpx;
      display: flex;
      flex-direction: row;
      &-item {
        margin-right: 26rpx;
        width: 140rpx;
        height: 73rpx;
        border-radius: 10rpx;
        background-image: url("https://jms.85gui7.com/kahe-202510/groupBuy/buy-item.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &-num {
          font-weight: 400;
          font-size: 24rpx;
          line-height: 36rpx;
          color: #794627;
        }
        &-price {
          font-weight: 400;
          font-size: 20rpx;
          color: #794627;
          line-height: 36rpx;
        }
      }
      &-select {
        border-radius: 10rpx;
        border: 2rpx solid #081d62;
        &-color {
          color: #081d62;
        }
      }
    }

    &-line {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      &-value {
        font-weight: 400;
        font-size: 24rpx;
        color: #081d62;
        line-height: 36rpx;
      }
      &-arrow {
        margin-left: 12rpx;
        width: 12rpx;
        height: 23rpx;
      }
    }
  }
  &-bottom {
    position: absolute;
    left: -4rpx;
    bottom: 0;
    width: calc(100% + 8rpx);
    padding: 16rpx 16rpx env(safe-area-inset-bottom);
    box-sizing: border-box;

    background-image: url("https://jms.85gui7.com/kahe-202510/groupBuy/pay-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &-tips {
      padding: 10rpx 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      &-select {
        margin-left: 12rpx;
        position: relative;
        width: 38rpx;
        height: 38rpx;
        &-bg {
          width: 100%;
          height: 100%;
        }
        &-value {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }

      &-content {
        width: calc(100% - 80rpx);
        &-value1 {
          font-weight: 400;
          font-size: 24rpx;
          color: #ffd3a2;
          line-height: 36rpx;
        }
        &-value2 {
          font-weight: 400;
          font-size: 24rpx;
          color: #ffd3a2;
          line-height: 36rpx;
        }
      }
    }
    &-line {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &-left {
        margin-left: 43rpx;
        display: flex;
        flex-direction: column;
        &-row {
          display: flex;
          flex-direction: row;
          padding: 12rpx 0;
        }
        &-line {
          margin: 0 16rpx;
          width: 1rpx;
          height: 31rpx;
          background: #ffd3a2;
        }
        &-value1 {
          font-weight: 400;
          font-size: 28rpx;
          color: #ffd3a2;
          line-height: 36rpx;
        }
        &-value2 {
          font-weight: 400;
          font-size: 36rpx;
          color: #ff1111;
          line-height: 36rpx;
        }
      }
      &-right {
        position: relative;
        width: 207rpx;
        height: 90rpx;
        border-radius: 10rpx;
        background: linear-gradient(90deg, #ffd3a2 0%, #fdf2d8 100%);

        &-title {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          line-height: 90rpx;
          font-weight: 400;
          font-size: 34rpx;
          color: #794627;
          text-align: center;
        }
      }
    }
  }
}
</style>
