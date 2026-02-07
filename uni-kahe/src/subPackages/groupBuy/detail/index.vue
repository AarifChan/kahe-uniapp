<template>
  <view class="groupBuyDetail">
    <scroll-view class="groupBuyDetail-content" scroll-y>
      <view class="groupBuyDetail-content-icon">
        <swiper
          class="groupBuyDetail-content-icon-swiper"
          circular
          :indicator-dots="true"
          :autoplay="true"
          indicator-active-color="#FF593D"
        >
          <swiper-item
            v-for="(item, index) in detailBanner"
            :key="index"
            class="groupBuyDetail-content-icon-swiper-item"
          >
            <image
              class="groupBuyDetail-content-icon-swiper-item-img"
              :src="item"
            />
          </swiper-item>
        </swiper>
      </view>
      <TopCard :detail="groupBuyDetail" />
      <Remark :detail="groupBuyDetail" @did-click="showModal" />
      <!--      <view class="groupBuyDetail-content-base">-->
      <!--        <image-->
      <!--          class="groupBuyDetail-content-base-img"-->
      <!--          src="https://jms.85gui7.com/kahe-202510/groupBuy/card1.png"-->
      <!--        />-->
      <!--        <view class="groupBuyDetail-content-base-line1">-->
      <!--          <view class="groupBuyDetail-content-base-line1-title">{{-->
      <!--            groupBuyDetail.title-->
      <!--          }}</view>-->
      <!--          &lt;!&ndash;                    <image class="groupBuyDetail-content-base-line1-icon" src="https://jms.85gui7.com/kahe-202510/groupBuy/arrow.png" />&ndash;&gt;-->
      <!--        </view>-->
      <!--        <view class="groupBuyDetail-content-base-time">-->
      <!--          <view class="groupBuyDetail-content-base-time-title">{{-->
      <!--            isOver ? "已经结束" : "距结束还剩"-->
      <!--          }}</view>-->
      <!--          <view v-if="!isOver" class="groupBuyDetail-content-base-time-title">{{-->
      <!--            remainingTime-->
      <!--          }}</view>-->
      <!--        </view>-->
      <!--        <view class="groupBuyDetail-content-base-other">-->
      <!--          <view class="groupBuyDetail-content-base-other-row1">-->
      <!--            <view-->
      <!--              style="display: flex; flex-direction: row; align-items: baseline"-->
      <!--            >-->
      <!--              <view class="groupBuyDetail-content-base-other-row1-price"-->
      <!--                >¥</view-->
      <!--              >-->
      <!--              <view class="groupBuyDetail-content-base-other-row1-title">{{-->
      <!--                groupBuyDetail.price-->
      <!--              }}</view>-->
      <!--            </view>-->

      <!--            <view class="groupBuyDetail-content-base-other-row1-subTitle"-->
      <!--              >编号：{{ groupBuyDetail.sid }}</view-->
      <!--            >-->
      <!--          </view>-->
      <!--          <view-->
      <!--            class="groupBuyDetail-content-base-other-progress"-->
      <!--            style="margin-top: 5rpx"-->
      <!--          >-->
      <!--            <view-->
      <!--              v-if="groupBuyDetail.total > 0"-->
      <!--              class="groupBuyDetail-content-base-other-progress-value"-->
      <!--              :style="{-->
      <!--                width: `${((groupBuyDetail.total - groupBuyDetail.sales) / groupBuyDetail.total) * 100.0}%`,-->
      <!--              }"-->
      <!--            ></view>-->
      <!--          </view>-->
      <!--          <view class="groupBuyDetail-content-base-other-row1">-->
      <!--            <view class="groupBuyDetail-content-base-other-row1-subTitle"-->
      <!--              >开售 {{ groupBuyDetail.openTime }}</view-->
      <!--            >-->
      <!--            <view class="groupBuyDetail-content-base-other-row1-subTitle"-->
      <!--              >余{{ groupBuyDetail.total - groupBuyDetail.sales }}/共{{-->
      <!--                groupBuyDetail.total-->
      <!--              }}</view-->
      <!--            >-->
      <!--          </view>-->
      <!--          <view class="groupBuyDetail-content-base-other-row2">-->
      <!--            <view-->
      <!--              v-for="(item, index) in groupBuyDetail.prices"-->
      <!--              :key="'price' + index"-->
      <!--              class="groupBuyDetail-content-base-other-row2-price"-->
      <!--              >单笔满{{ item.num }}份｜{{ item.price }}/份</view-->
      <!--            >-->
      <!--          </view>-->
      <!--        </view>-->
      <!--      </view>-->
      <!--      <view class="groupBuyDetail-content-group">-->
      <!--        <view class="groupBuyDetail-content-group-card1">-->
      <!--          <view class="groupBuyDetail-content-group-card1-top">-->
      <!--            <image-->
      <!--              class="groupBuyDetail-content-group-card1-top-left"-->
      <!--              src="https://jms.85gui7.com/kahe-202510/groupBuy/item3.png"-->
      <!--            />-->
      <!--            <view-->
      <!--              class="groupBuyDetail-content-group-card1-top-right SimHei-font"-->
      <!--            >-->
      <!--              {{ groupBuyDetail.title }} 卡密一张-->
      <!--            </view>-->
      <!--          </view>-->
      <!--          <view-->
      <!--            class="groupBuyDetail-content-group-card1-bottom"-->
      <!--            @tap.stop="showModal"-->
      <!--          >-->
      <!--            <view-->
      <!--              class="groupBuyDetail-content-group-card1-bottom-left text-flow-ellipsis-single"-->
      <!--              >{{ stripHTMLTags(groupBuyDetail.remark) }}</view-->
      <!--            >-->
      <!--            <image-->
      <!--              class="groupBuyDetail-content-group-card1-bottom-right"-->
      <!--              src="https://jms.85gui7.com/kahe-202510/groupBuy/arrow-1.png"-->
      <!--            />-->
      <!--          </view>-->
      <!--        </view>-->
      <view class="groupBuyDetail-content-group-card2">
        <view class="groupBuyDetail-content-group-card2-top">
          <image
            class="groupBuyDetail-content-group-card2-top-img"
            src="https://jms.85gui7.com/kahe-202510/groupBuy/kami-title.png"
          />
        </view>

        <view
          v-if="recordList.length > 0"
          class="groupBuyDetail-content-group-card2-content"
        >
          <view
            v-for="(item, index) in recordList"
            :key="'record' + index"
            class="groupBuyDetail-content-group-card2-content-item"
          >
            <view class="groupBuyDetail-content-group-card2-content-item-left">
              <image
                class="groupBuyDetail-content-group-card2-content-item-left-avatar"
                :src="item.user.avatar"
              />
              <view
                class="groupBuyDetail-content-group-card2-content-item-left-info"
              >
                <view
                  class="groupBuyDetail-content-group-card2-content-item-left-info-nickName text-flow-ellipsis-single"
                  >{{ item.user.nickname }}</view
                >
                <view
                  class="groupBuyDetail-content-group-card2-content-item-left-info-title"
                  >{{ getFormatTime(item.createTime) }}</view
                >
              </view>
            </view>
            <view class="groupBuyDetail-content-group-card2-content-item-num"
              >X{{ item.num }}</view
            >
          </view>
        </view>
        <view v-else class="groupBuyDetail-content-group-card2-empty"
          >暂无记录</view
        >
      </view>
      <merchant :merchant="groupBuyDetail.merchant" />
      <!--            </view>-->
      <!--            <view class="groupBuyDetail-content-intro">-->
      <!--                <view class="groupBuyDetail-content-intro-title theme-font">商品介绍</view>-->
      <!--                <view class="groupBuyDetail-content-intro-detail">{{groupBuyDetail.remark}}</view>-->
      <!--            </view>-->
    </scroll-view>
    <view class="groupBuyDetail-bottom">
      <image
        class="groupBuyDetail-bottom-bg"
        src="https://jms.85gui7.com/kahe-202510/groupBuy/group-bottom-bg.png"
      />
      <view class="groupBuyDetail-bottom-line">
        <view class="groupBuyDetail-bottom-line-left">
          <view
            class="groupBuyDetail-bottom-line-left-item"
            @tap.stop="navToListPage(groupBuyDetail.sid)"
          >
            <image
              class="groupBuyDetail-bottom-line-left-item-icon"
              src="https://jms.85gui7.com/kahe-202510/groupBuy/kami-item1.png"
            />
            <view class="groupBuyDetail-bottom-line-left-item-title"
              >卡密列表</view
            >
          </view>
          <view
            class="groupBuyDetail-bottom-line-left-item"
            @tap.stop="navToMinePage(groupBuyDetail.id)"
          >
            <image
              class="groupBuyDetail-bottom-line-left-item-icon"
              src="https://jms.85gui7.com/kahe-202510/groupBuy/kami-item2.png"
            />
            <view class="groupBuyDetail-bottom-line-left-item-title"
              >我的卡密</view
            >
          </view>
          <view
            class="groupBuyDetail-bottom-line-left-item"
            @tap.stop="showInGroupImage"
          >
            <view class="groupBuyDetail-bottom-line-left-item-tips"
              >开播通知</view
            >
            <image
              class="groupBuyDetail-bottom-line-left-item-icon"
              src="https://jms.85gui7.com/kahe-202510/groupBuy/kami-item3.png"
            />
            <view class="groupBuyDetail-bottom-line-left-item-title"
              >加入群聊</view
            >
          </view>
        </view>
        <view
          class="groupBuyDetail-bottom-line-right"
          @tap.stop="didClickBottom"
        >
          <view class="groupBuyDetail-bottom-line-right-title STHupo-font">{{
            isOver ? "查看详情" : "报名参加"
          }}</view>
        </view>
      </view>
    </view>
    <common-modal
      v-model:show="modalShow"
      :title="modalTitle"
      :content="modalContent"
    />
    <!--    <login v-model:show="loginShow" @did-tap-login="handleLogin" />-->
  </view>
</template>

<script lang="ts" setup>
import { useGroupBuy } from "@/subPackages/groupBuy";
import { ref, computed, onMounted } from "vue";
import { getFormatTime, getPageOptions } from "@/utils/tools";

import CommonModal from "@/components/modal/index.vue";
import { useModal } from "@/composables/modal";
// import Login from "@/components/login/index.vue";
import TopCard from "../components/topInfo/index.vue";
import Remark from "../components/remark/index.vue";
import Merchant from "../components/merchant/index.vue";
import { useLogin } from "@/composables/login";
import { eventBus } from "@/utils/event";
import { onShareAppMessage, onShareTimeline, onShow } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
import { useTimeCount } from "@/composables/countTime";
const { startTimeRemain, remainingTime, isTimeout } = useTimeCount();
const { modalShow, modalTitle, modalContent } = useModal();

const {
  detailBanner,
  recordList,
  groupBuyDetail,
  getGroupBuyDetail,
  getGroupBuyDetailRecord,
  navToListPage,
  navToMinePage,
  navToSubmitPage,
  stripHTMLTags,
  showInGroupImage,
} = useGroupBuy();

const valueId = ref<number>(0);
const { loginShow, handleLogin } = useLogin();
// onShow(() => {
//   loadData();
// });

eventBus.on("groupBuyUpdate", () => {
  loadData();
});

eventBus.on("didLogin", (_) => {
  loadData();
});

onMounted(() => {
  loadData();
});

const isOver = computed(() => {
  const num = groupBuyDetail.value.total - groupBuyDetail.value.sales;
  return num === 0 || isTimeout.value;
});

const didClickBottom = () => {
  const pid = valueId.value;
  if (isOver.value) {
    uni.navigateTo({
      url: `/subPackages/groupBuy/result/index?id=${pid}`,
    });
    return;
  }
  navToSubmitPage(valueId.value);
};

const loadData = async () => {
  const id = getPageOptions().id;
  // console.log('groupBuyId:', id)
  if (id) {
    valueId.value = Number(id);
    await getGroupBuyDetail(valueId.value);
    await getGroupBuyDetailRecord(valueId.value);
    startTimeRemain(groupBuyDetail.value.openTime);
  }
};

const showModal = () => {
  modalTitle.value = "活动说明";
  modalContent.value = groupBuyDetail.value.remark;
  modalShow.value = true;
};
onShareAppMessage(() => {
  const userId = UserModule.userInfo.uid;
  return {
    title: groupBuyDetail.value.title,
    imageUrl: groupBuyDetail.value?.logo,
    path: `/subPackages/groupBuy/detail/index?id=${groupBuyDetail.value?.id}&uid=${userId}`,
  };
});
onShareTimeline(() => {
  const userId = UserModule.userInfo.uid;
  return {
    title: groupBuyDetail.value.title,
    imageUrl: groupBuyDetail.value?.logo,
    path: `/subPackages/groupBuy/detail/index?id=${groupBuyDetail.value?.id}&uid=${userId}`,
  };
});
</script>

<style lang="scss" scoped>
.groupBuyDetail {
  position: relative;
  background-color: #000000;
  width: 100%;
  height: 100vh;
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100% - 144rpx - env(safe-area-inset-bottom));
    padding-bottom: 32rpx;
    &-icon {
      width: 100%;
      aspect-ratio: 1;
      &-swiper {
        position: relative;
        width: 100%;
        height: 100%;
        &-item {
          width: 100%;
          height: 100%;
          &-img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    &-base {
      position: relative;
      margin-top: 16rpx;
      width: 100%;
      aspect-ratio: 751 / 372;
      &-img {
        width: 100%;
        height: 100%;
      }
      &-line1 {
        position: absolute;
        top: 32rpx;
        left: 32rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        &-title {
          font-weight: normal;
          font-size: 40rpx;
          color: #000000;
        }
        &-icon {
          margin-left: 18rpx;
          width: 12rpx;
          height: 23rpx;
        }
      }

      &-time {
        position: absolute;
        top: 16rpx;
        right: 0;
        width: 280rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &-title {
          font-weight: normal;
          font-size: 20rpx;
          color: #000000;
        }
      }
      &-other {
        position: absolute;
        top: 120rpx;
        left: 0;
        width: 100%;
        padding: 16rpx;
        &-row1 {
          padding: 0 16px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          &-title {
            font-weight: normal;
            font-size: 30rpx;
            color: #000000;
          }
          &-price {
            font-weight: normal;
            font-size: 20rpx;
            color: #000000;
          }
          &-subTitle {
            font-weight: normal;
            font-size: 20rpx;
            color: #000000;
          }
        }
        &-row2 {
          margin-top: 20rpx;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          &-price {
            margin-right: 12rpx;
            padding: 6rpx 12rpx;
            font-weight: normal;
            font-size: 20rpx;
            color: #7cf7ff;
            background: #0095ff;
            border-radius: 4rpx;
          }
        }
        &-progress {
          margin: 8rpx 0;
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 14rpx;
          background: #e0e0e0;
          border-radius: 6rpx;
          overflow: hidden;
          &-value {
            height: 100%;
            background: #51b3f9;
          }
        }
      }
    }

    &-group {
      margin-top: -58rpx;
      padding: 0 12rpx;
      width: 100%;
      box-sizing: border-box;
      &-card1 {
        width: 100%;
        background: #daebff;
        border-radius: 20rpx;
        border: 3rpx solid #0067b1;
        &-top {
          padding: 32rpx 32rpx 12rpx;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          &-left {
            width: 51rpx;
            height: 37rpx;
          }
          &-right {
            width: 569rpx;
            font-weight: 400;
            font-size: 30rpx;
            color: #60bafa;
            line-height: 30rpx;
          }
        }
        &-bottom {
          margin: 16rpx;
          padding: 28rpx 38rpx;
          border-top: 1px solid #7ab1e0;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          &-left {
            width: 400rpx;
            font-weight: 400;
            font-size: 30rpx;
            color: #5699d2;
            line-height: 30rpx;
          }
          &-right {
            width: 15rpx;
            height: 28rpx;
          }
        }
      }
      &-card2 {
        position: relative;
        //margin-top: 35rpx;
        margin: 0 auto 35rpx;
        width: 730rpx;
        border-radius: 20rpx;
        border: 2rpx solid #5e432b;
        background: #212121;

        &-top {
          padding: 24rpx 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          &-img {
            width: 330rpx;
            height: 40rpx;
          }
        }

        &-empty {
          position: relative;
          padding: 70rpx 40rpx 36rpx;
          line-height: 50rpx;
          text-align: center;
          font-weight: 400;
          font-size: 30rpx;
          color: #ffffff;
        }
        &-content {
          position: relative;
          width: 100%;
          padding: 16rpx 32rpx 24rpx;
          display: grid;
          box-sizing: border-box;

          grid-template-columns: repeat(
            auto-fill,
            minmax(calc((100% - 16px) / 2), 1fr)
          ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
          grid-gap: 16px; // 这是网格间的间隙，根据需要调整
          &-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0 16rpx;
            justify-content: space-between;
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 16rpx;
            &-left {
              display: flex;
              flex-direction: row;
              align-items: center;
              &-avatar {
                width: 68rpx;
                height: 68rpx;
                border-radius: 34rpx;
              }
              &-info {
                margin-left: 20rpx;
                display: flex;
                flex-direction: column;
                &-nickName {
                  width: 100rpx;
                  font-weight: 400;
                  font-size: 24rpx;
                  color: #ffffff;
                  line-height: 30rpx;
                }
                &-title {
                  font-weight: 400;
                  font-size: 18rpx;
                  color: #ffffff;
                  line-height: 20rpx;
                }
              }
            }
            &-num {
              font-weight: 400;
              font-size: 28rpx;
              color: #fcd09d;
              line-height: 30rpx;
            }
          }
        }
      }
    }
    &-intro {
      padding: 36px;
      width: 100%;
      box-sizing: border-box;
      &-title {
        font-weight: 400;
        font-size: 36rpx;
        color: #00056e;
        line-height: 30rpx;
      }
      &-detail {
        margin-top: 24rpx;
        font-size: 26rpx;
        color: #00056e;
        line-height: 30rpx;
      }
    }
  }

  &-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 750rpx;
    height: calc(144rpx + env(safe-area-inset-bottom));
    background-color: #000000;
    box-sizing: border-box;
    &-bg {
      width: 750rpx;
      height: 144rpx;
    }
    &-line {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 16rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      &-left {
        display: flex;
        flex-direction: row;
        &-item {
          position: relative;
          margin-right: 26rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          &-tips {
            position: absolute;
            top: -50rpx;
            left: -20rpx;
            width: 132rpx;
            height: 49rpx;
            background-image: url("https://jms.85gui7.com/kahe-202510/groupBuy/bunddle.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            text-align: center;
            font-size: 24rpx;
            padding-top: 4rpx;
            color: #794627;
          }
          &-icon {
            width: 42rpx;
            height: 42rpx;
          }
          &-title {
            margin-top: 4rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #ffffff;
            line-height: 36rpx;
          }
        }
      }
      &-right {
        position: relative;
        border-radius: 10px;
        width: 207rpx;
        height: 90rpx;
        background: linear-gradient(90deg, #ffd3a2 0%, #fdf2d8 100%);
        &-img {
          width: 207rpx;
          height: 90rpx;
        }
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
