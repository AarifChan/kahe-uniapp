<template>
  <view class="detail">
    <view style="padding-bottom: 30rpx">
      <view class="detail-top">
        <image
          class="detail-top-img"
          :src="welfareDetails.logo"
          mode="widthFix"
        />
        <view class="detail-top-time" v-if="timeOut">
          <Countdown :end-time="timeOut" />
        </view>
      </view>
      <view class="detail-center">
        <view class="detail-center-title theme-font text-flow-ellipsis-single">
          {{ welfareDetails.title }}
        </view>
        <view class="detail-center-price"> ￥0 </view>
      </view>
      <merchant :merchant="welfareDetails.merchant" />
      <view class="detail-rule">
        <Title value="活动规则" />
        <view class="detail-rule-context">
          <view class="detail-rule-context-title"></view>
          <view class="detail-rule-context-title">
            1、本活动为福利活动，本平台所有用户均可参与。
          </view>
          <view class="detail-rule-context-title">
            2、对于宣传本活动者，平台将给予奖励，详情可咨询客服。
          </view>
          <view class="detail-rule-context-title">
            3、邀请好友越多，则中奖概率越高，上限5个抽奖码。
          </view>
          <view class="detail-rule-context-title">
            4、获奖者必须在开奖前加入了本平台用户交流群方，否则视为放弃奖品。
          </view>
          <view class="detail-rule-context-title">
            5、每个用户单次活动仅限参与1次。
          </view>
          <view class="detail-rule-context-title">
            6、开奖结果会倒计时结束后，公示在此活动下方，敬请留意。
          </view>
          <view class="detail-rule-context-title">
            7、禁止使用任何助力科技参与活动，一经发现永久取消活动资格。
          </view>
          <view class="detail-rule-context-title">
            8、本活动最终解释权归本平台所有，感谢支持！
          </view>
        </view>
      </view>
      <view class="detail-goods">
        <Title value="活动奖励" />
        <view class="detail-goods-item">
          <Item
            v-for="(item, index) in welfareDetailsGoods"
            :key="index"
            :item="item"
            @tap.stop="handleClickItem(item)"
          />
        </view>
      </view>
      <People :list="userList" :total="total" />
      <Rewards
        value="中奖"
        :list="rewardList"
        :detail="welfareDetails"
        :time="timeFinish"
      />
      <view class="detail-recom">
        <Title value="热门推荐" />
        <view style="padding-top: 16rpx" class="detail-recom-goods">
          <Goods :list="machineList" @tap-card-list-item="tapCardListItem" />
        </view>
      </view>
      <view class="detail-bottom">
        <image
          class="detail-bottom-bg"
          src="https://jms.85gui7.com/kahe-202510/ka-he/welfare/bottom-bg.png"
        />
        <view class="detail-bottom-content">
          <view class="detail-bottom-left">
            <view class="detail-bottom-left-box" @tap.stop="clickActivity">
              <image
                src="https://jms.85gui7.com/kahe-202510/ka-he/welfare/bottom-item1.png"
                class="detail-bottom-left-box-img"
              />
              <view class="detail-bottom-left-box-text"> 活动 </view>
            </view>
            <view class="detail-bottom-left-box" @tap.stop="clickRewardCode">
              <image
                src="https://jms.85gui7.com/kahe-202510/ka-he/welfare/bottom-item2.png"
                class="detail-bottom-left-box-img2"
              />
              <view class="detail-bottom-left-box-text"> 抽奖码 </view>
            </view>
          </view>
          <button
            v-if="userDetail.status === 1"
            open-type="share"
            class="detail-bottom-right"
          >
            <image
              class="detail-bottom-right-img"
              src="https://jms.85gui7.com/kahe-202510/ka-he/common/btn-big-bg.png"
            />
            <view class="detail-bottom-right-title theme-font text-stroke-main">
              更多抽奖码
            </view>
          </button>
          <view v-else class="detail-bottom-right" @tap.stop="tapPrizeAction">
            <image
              class="detail-bottom-right-img"
              src="https://jms.85gui7.com/kahe-202510/ka-he/common/common-btn-bg.png"
            />
            <view class="detail-bottom-right-title theme-font text-stroke-main">
              参与抽奖
            </view>
          </view>
        </view>
      </view>
    </view>
    <detail-modal v-model:show="detailShow" :item="currentBox" />
    <!--        <login v-model:show="loginShow" @did-tap-login="handleLogin" />-->
    <input-modal
      v-model:show="inputModal"
      @did-tap-confirm="tapPasswordPriceAction"
    />
  </view>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import Title from "./components/title.vue";
import Item from "./components/item.vue";
import People from "./components/people.vue";
import Goods from "@/pages/machine/components/goods.vue";
import Countdown from "@/components/countdown/index.vue";
import InputModal from "./components/modal/index.vue";
import DetailModal from "@/components/modal/detail/index.vue";
import Rewards from "./components/rewards.vue";
import { getPageOptions } from "@/utils/tools";
import { useWelfare } from "@/composables/welfare";
import { useGoods } from "@/composables/goods";
import { onShareAppMessage, onShareTimeline, onShow } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
import type { UserGoodsModel } from "@/model";
import type { WareDetailGoods } from "@/model/welfare";

import Merchant from "./components/merchant.vue";

import { eventBus } from "@/utils/event";
const { getMachineList, machineList, tapCardListItem } = useGoods();
const {
  total,
  timeFinish,
  userDetail,
  timeOut,
  rewardList,
  userList,
  aid,
  inputModal,
  handleHelpWare,
  getWelfareDetailList,
  welfareDetails,
  welfareDetailsGoods,
  tapPrizeAction,
  getWelfareUserList,
  getWelfareReward,
  tapPasswordPriceAction,
} = useWelfare();
const currentBox = ref({} as UserGoodsModel);

const detailShow = ref(false);

const handleClickItem = (item: WareDetailGoods) => {
  currentBox.value = {
    goods: item.goodsDto,
  };
  detailShow.value = true;
};

onMounted(async () => {
  await loadData();
});
eventBus.on("didLogin", (_) => {
  loadData();
});

const loadData = async () => {
  const ops = getPageOptions();
  const aId = ops.aid as number;
  const obj = ops.obj as number;
  aid.value = aId;
  await Promise.all([
    getWelfareDetailList(),
    getWelfareUserList(),
    getMachineList(),
    getWelfareReward(aId),
  ]);
  if (obj) {
    /// 好友分享助力
    await handleHelpWare(obj, aId);
  }
};
onShow(() => {
  UserModule.getUserInfo();
});

eventBus.on("didLogin", async (_: any) => {
  await loadData();
});
const clickActivity = () => {
  const routes = getCurrentPages();
  if (routes.length > 1) {
    uni.navigateBack();
  } else {
    uni.reLaunch({
      url: "/subPackages/activity/index",
    });
  }
};
const clickRewardCode = () => {
  uni.navigateTo({
    url: `/subPackages/product/reward-code/index?aid=${aid.value}`,
  });
};
onShareAppMessage(() => {
  return {
    title: `${UserModule.userInfo.nickname}邀请您来助力免费得奖品！`,
    imageUrl: welfareDetails.value.logo,
    path: `/subPackages/product/welfare-detail/index?aid=${aid.value}&obj=${UserModule.userInfo.uid}`,
  };
});
onShareTimeline(() => {
  return {
    title: `${UserModule.userInfo.nickname}邀请您来助力免费得奖品！`,
    imageUrl: welfareDetails.value.logo,
    path: `/subPackages/product/welfare-detail/index?aid=${aid.value}&obj=${UserModule.userInfo.uid}`,
  };
});
</script>
<style lang="scss" scoped>
.detail {
  width: 100%;
  box-sizing: border-box;
  height: calc(100vh - env(safe-area-inset-bottom) - 64rpx);
  background-color: $main-bg;
  padding: 32rpx;
  overflow-y: auto;
  &-top {
    //margin-top: 32rpx;
    position: relative;
    width: 688rpx;
    height: 688rpx;
    background: #fffbef;
    box-shadow: 4rpx 4rpx 5rpx 0rpx rgba(0, 0, 0, 0.13);
    border-radius: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-img {
      position: absolute;
      width: 621rpx;
      height: 621rpx;
      border-radius: 20rpx;
    }
    &-time {
      position: absolute;
      z-index: 1;
      border-radius: 25rpx;
      width: 225rpx;
      height: 50rpx;
      background: linear-gradient(180deg, #d8e9fd, #81b2f0);
      border: 4rpx solid #81b2f0;
      bottom: 62rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20rpx;
      color: #000000;
    }
  }
  &-center {
    margin-top: 24rpx;
    width: 688rpx;
    height: 119rpx;
    background: #ffffff;
    border-radius: 20rpx;
    opacity: 0.97;
    &-title {
      margin-left: 34rpx;
      padding-top: 18rpx;
      font-size: 34rpx;
      color: #00008b;
    }
    &-price {
      margin-left: 34rpx;
      font-size: 28rpx;
      color: #ff2a2a;
    }
  }
  &-rule {
    position: relative;
    margin-top: 32rpx;
    box-sizing: border-box;
    width: 100%;
    background: #ffffff;
    border-radius: 20rpx;
    opacity: 0.97;
    display: flex;
    flex-direction: column;
    padding: 16rpx;
    &-context {
      margin-top: 40rpx;
      width: 100%;
      box-sizing: border-box;
      background: #ffffff;
      padding: 16rpx;
      border-radius: 20rpx;
      border: 2rpx solid #d9d9d9;
      display: flex;
      flex-direction: column;

      &-title {
        margin-bottom: 8rpx;
        font-weight: normal;
        font-size: 24rpx;
        color: #000000;
        line-height: 30rpx;
      }
    }
  }
  &-goods {
    margin-top: 32rpx;
    position: relative;
    padding: 16rpx 0;
    width: 100%;
    background: #ffffff;
    border-radius: 20rpx;
    opacity: 0.97;
    overflow-y: auto;
    &-item {
      margin-top: 80rpx;
      width: 100%;
      padding: 0 30rpx 20rpx 30rpx;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        calc((100% - 18rpx) / 2)
      ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
      grid-gap: 18rpx;
    }
  }
  &-recom {
    margin-top: 30rpx;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 16rpx 0;
    height: auto;
    border-radius: 20rpx;
    opacity: 0.97;
    &-goods {
      height: auto;
      width: 100%;
      box-sizing: border-box;
    }
  }
  &-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    height: 164rpx;

    &-bg {
      width: 750rpx;
      height: 164rpx;
    }
    &-content {
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 32rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30rpx;
      box-sizing: border-box;
    }
    &-left {
      display: flex;
      width: 200rpx;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      margin-right: 20rpx;
      &-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        margin-right: 20rpx;
        &-img {
          width: 43rpx;
          height: 40rpx;
        }
        &-img2 {
          width: 55rpx;
          height: 32rpx;
        }
        &-text {
          font-size: 20rpx;
          color: #000000;
        }
      }
    }

    &-right {
      position: relative;
      width: 181rpx;
      height: 76rpx;
      display: flex;
      margin: 0;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      &-img {
        width: 100%;
        height: 100%;
      }
      &-title {
        position: absolute;
        left: 0;
        top: 8rpx;
        font-size: 24rpx;
        color: #ffffff;
        text-align: center;
        width: 100%;
      }
    }
    &-right::after {
      margin: 0;
      padding: 0;
      background-color: transparent;
    }
  }
}
</style>
