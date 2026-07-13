<template>
  <view
    class="detail w-full bg-main-bg overflow-y-auto px-32 box-border"
    style="height: calc(100vh - env(safe-area-inset-bottom) - 64rpx)"
  >
    <view style="padding-bottom: 30rpx">
      <view
        class="detail-top relative w-688 h-688 bg-[#fffbef] rounded-20 flex flex-col items-center justify-center"
        style="box-shadow: 4rpx 4rpx 5rpx 0rpx rgba(0, 0, 0, 0.13)"
      >
        <image
          class="detail-top-img absolute w-621 h-621 rounded-20"
          :src="welfareDetails.logo"
          mode="widthFix"
        />
        <view
          class="detail-top-time absolute z-1 w-225 h-50 flex items-center justify-center text-20 text-black rounded-25"
          v-if="timeOut"
          style="
            bottom: 62rpx;
            background: linear-gradient(180deg, #d8e9fd, #81b2f0);
            border: 4rpx solid #81b2f0;
          "
        >
          <Countdown :end-time="timeOut" />
        </view>
      </view>
      <view
        class="detail-center mt-24 w-688 h-119 bg-white rounded-20 opacity-97"
      >
        <view
          class="detail-center-title theme-font text-ellipsis ml-34 pt-18 text-34 text-[#00008b]"
        >
          {{ welfareDetails.title }}
        </view>
        <view class="detail-center-price ml-34 text-28 text-[#ff2a2a]">
          ￥0
        </view>
      </view>
      <merchant :merchant="welfareDetails.merchant" />
      <view
        class="detail-rule relative mt-32 w-full bg-white rounded-20 opacity-97 flex flex-col"
        style="padding: 16rpx"
      >
        <Title value="活动规则" />
        <view
          class="detail-rule-context mt-40 w-full bg-white rounded-20 flex flex-col border-2 border-[#d9d9d9]"
          style="padding: 16rpx"
        >
          <view
            class="detail-rule-context-title mb-8 text-24 text-black font-normal"
            style="line-height: 30rpx"
          ></view>
          <view
            class="detail-rule-context-title mb-8 text-24 text-black font-normal"
            style="line-height: 30rpx"
          >
            1、本活动为福利活动，本平台所有用户均可参与。
          </view>
          <view
            class="detail-rule-context-title mb-8 text-24 text-black font-normal"
            style="line-height: 30rpx"
          >
            2、对于宣传本活动者，平台将给予奖励，详情可咨询客服。
          </view>
          <view
            class="detail-rule-context-title mb-8 text-24 text-black font-normal"
            style="line-height: 30rpx"
          >
            3、邀请好友越多，则中奖概率越高，上限5个抽奖码。
          </view>
          <view
            class="detail-rule-context-title mb-8 text-24 text-black font-normal"
            style="line-height: 30rpx"
          >
            4、获奖者必须在开奖前加入了本平台用户交流群方，否则视为放弃奖品。
          </view>
          <view
            class="detail-rule-context-title mb-8 text-24 text-black font-normal"
            style="line-height: 30rpx"
          >
            5、每个用户单次活动仅限参与1次。
          </view>
          <view
            class="detail-rule-context-title mb-8 text-24 text-black font-normal"
            style="line-height: 30rpx"
          >
            6、开奖结果会倒计时结束后，公示在此活动下方，敬请留意。
          </view>
          <view
            class="detail-rule-context-title mb-8 text-24 text-black font-normal"
            style="line-height: 30rpx"
          >
            7、禁止使用任何助力科技参与活动，一经发现永久取消活动资格。
          </view>
          <view
            class="detail-rule-context-title mb-8 text-24 text-black font-normal"
            style="line-height: 30rpx"
          >
            8、本活动最终解释权归本平台所有，感谢支持！
          </view>
        </view>
      </view>
      <view
        class="detail-goods relative mt-32 w-full bg-white rounded-20 opacity-97 overflow-y-auto"
        style="padding: 16rpx 0"
      >
        <Title value="活动奖励" />
        <view
          class="detail-goods-item mt-80 w-full grid"
          style="
            padding: 0 30rpx 20rpx 30rpx;
            grid-template-columns: repeat(auto-fill, calc((100% - 18rpx) / 2));
            gap: 18rpx;
          "
        >
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
      <view
        class="detail-recom relative mt-30 w-full h-auto rounded-20 opacity-97"
        style="padding: 16rpx 0"
      >
        <Title value="热门推荐" />
        <view
          class="detail-recom-goods h-auto w-full"
          style="padding-top: 16rpx"
        >
          <Goods :list="machineList" @tap-card-list-item="tapCardListItem" />
        </view>
      </view>
      <view class="detail-bottom fixed left-0 w-750 h-164" style="bottom: 0">
        <image
          class="detail-bottom-bg w-750 h-164"
          src="/static/kahe-202510/ka-he/welfare/bottom-bg.png"
        />
        <view
          class="detail-bottom-content absolute left-0 w-full flex justify-between items-center"
          style="bottom: 32rpx; padding: 0 30rpx"
        >
          <view
            class="detail-bottom-left flex flex-row items-center w-200"
            style="margin-right: 20rpx; justify-content: space-evenly"
          >
            <view
              class="detail-bottom-left-box flex flex-col items-center"
              style="margin-right: 20rpx; justify-content: space-evenly"
              @tap.stop="clickActivity"
            >
              <image
                src="/static/kahe-202510/ka-he/welfare/bottom-item1.png"
                class="detail-bottom-left-box-img w-43 h-40"
              />
              <view class="detail-bottom-left-box-text text-20 text-black">
                活动
              </view>
            </view>
            <view
              class="detail-bottom-left-box flex flex-col items-center"
              style="margin-right: 20rpx; justify-content: space-evenly"
              @tap.stop="clickRewardCode"
            >
              <image
                src="/static/kahe-202510/ka-he/welfare/bottom-item2.png"
                class="detail-bottom-left-box-img2 w-55 h-32"
              />
              <view class="detail-bottom-left-box-text text-20 text-black">
                抽奖码
              </view>
            </view>
          </view>
          <view class="detail-bottom-actions flex items-center gap-12">
            <!-- #ifdef MP-WEIXIN -->
            <button
              class="detail-bottom-share relative w-160 h-76 flex items-center justify-center plain border-none bg-transparent p-0 m-0"
              open-type="share"
              plain
              style="padding: 0; line-height: normal"
            >
              <image
                class="detail-bottom-share-img w-full h-full"
                src="/static/kahe-202510/ka-he/common/common-btn-bg.png"
              />
              <view
                class="detail-bottom-share-title theme-font absolute left-0 top-8 w-full text-center text-24 text-white"
                :style="{
                  textShadow:
                    '-1px -1px 0 #0F2268, 1px -1px 0 #0F2268, -1px 1px 0 #0F2268, 1px 1px 0 #0F2268',
                }"
              >
                分享
              </view>
            </button>
            <!-- #endif -->
            <!-- #ifndef MP-WEIXIN -->
            <view
              class="detail-bottom-share relative w-160 h-76 flex items-center justify-center"
              @tap.stop="handleClickShare"
            >
              <image
                class="detail-bottom-share-img w-full h-full"
                src="/static/kahe-202510/ka-he/common/common-btn-bg.png"
              />
              <view
                class="detail-bottom-share-title theme-font absolute left-0 top-8 w-full text-center text-24 text-white"
                :style="{
                  textShadow:
                    '-1px -1px 0 #0F2268, 1px -1px 0 #0F2268, -1px 1px 0 #0F2268, 1px 1px 0 #0F2268',
                }"
              >
                分享
              </view>
            </view>
            <!-- #endif -->
            <button
              v-if="userDetail.status === 1"
              open-type="share"
              class="detail-bottom-right relative w-181 h-76 flex items-center justify-center plain border-none bg-transparent p-0 m-0"
              plain
            >
              <image
                class="detail-bottom-right-img w-full h-full"
                src="/static/kahe-202510/ka-he/common/btn-big-bg.png"
              />
              <view
                class="detail-bottom-right-title theme-font absolute left-0 top-8 w-full text-center text-24 text-white"
                :style="{
                  textShadow:
                    '-1px -1px 0 #0F2268, 1px -1px 0 #0F2268, -1px 1px 0 #0F2268, 1px 1px 0 #0F2268',
                }"
              >
                更多抽奖码
              </view>
            </button>
            <view
              v-else
              class="detail-bottom-right relative w-181 h-76 flex items-center justify-center"
              @tap.stop="tapPrizeAction"
            >
              <image
                class="detail-bottom-right-img w-full h-full"
                src="/static/kahe-202510/ka-he/common/common-btn-bg.png"
              />
              <view
                class="detail-bottom-right-title theme-font absolute left-0 top-8 w-full text-center text-24 text-white"
                :style="{
                  textShadow:
                    '-1px -1px 0 #0F2268, 1px -1px 0 #0F2268, -1px 1px 0 #0F2268, 1px 1px 0 #0F2268',
                }"
              >
                参与抽奖
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <detail-modal v-model:show="detailShow" :item="currentBox" />
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
import { shareWeixinMiniProgramCard } from "@/composables/share";
import { ShowToast } from "@/utils";

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
const handleClickShare = () => {
  if (!aid.value) {
    ShowToast("活动信息异常，暂无法分享");
    return;
  }
  shareWeixinMiniProgramCard({
    title: `${UserModule.userInfo.nickname}邀请您来助力免费得奖品！`,
    imageUrl:
      welfareDetails.value.logo ||
      "https://cdn.richcw.cn/tycw-mp/kaju/share.png",
    path: `/subPackages/product/welfare-detail/index?aid=${aid.value}&obj=${UserModule.userInfo.uid}`,
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
button::after {
  border: none;
}
</style>
