<template>
  <view class="invite relative w-full">
    <image class="invite-bg w-750 h-2665" src="/static/kahe-202510/invite/invite-bg.png" />
    <view class="invite-content absolute left-0 top-0 w-full h-full flex flex-col justify-start">
      <view class="invite-content-share relative mt-424 ml-152 mb-200 w-242 h-89">
        <image
          class="invite-content-share-bg w-full h-full"
          src="/static/kahe-202510/invite/invite-tag.png"
        />
        <button openType="share" plain class="invite-content-share-btn theme-font absolute left-0 top-12 text-center w-full font-400 text-30 text-[#fefffd] border-none bg-transparent p-0 m-0"
          :style="{ textShadow: '1rpx 3rpx 0 #30b7c7' }"
        >
          点击邀请盟友
        </button>
      </view>
      <view class="invite-content-info relative ml-12 w-727 h-393">
        <image
          class="invite-content-info-bg w-full h-full"
          src="/static/kahe-202510/invite/invite-1-bg.png"
        />
        <image
          class="invite-content-info-item absolute top-30 left-44 w-58 h-58"
          src="/static/kahe-202510/invite/invite-item1.png"
        />
        <view class="invite-content-info-title theme-font absolute top-34 left-128 font-400 text-36 text-white">我的盟主</view>
        <view class="invite-content-info-subTitle absolute top-56 left-348 font-normal text-24 text-[#fefffd]"
          >和盟主一起畅玩，不再孤单！</view
        >
        <view class="invite-content-info-content absolute top-120 left-56 h-220 flex flex-row items-center justify-start"
          :style="{ width: 'calc(100% - 112rpx)' }"
        >
          <view class="invite-content-info-content-info flex flex-col justify-center items-center w-200">
            <view class="invite-content-info-content-info-avatar relative w-151 h-115">
              <image
                class="invite-content-info-content-info-avatar-bg w-full h-full"
                src="/static/kahe-202510/invite/invite-avatar-bg.png"
              />
              <image
                class="invite-content-info-content-info-avatar-decorate absolute left-32 top-10 w-92 h-92 rounded-46"
                :src="agentInfo?.agent?.user.avatar"
              />
            </view>
            <view class="invite-content-info-content-info-nick font-normal text-20 text-white">{{
              agentInfo?.agent?.user?.nickname ?? "待绑定"
            }}</view>
          </view>
          <view class="invite-content-info-content-record flex flex-col">
            <view class="invite-content-info-content-record-item relative flex flex-row items-baseline">
              <image
                class="invite-content-info-content-record-item-row1 w-437 h-75"
                src="/static/kahe-202510/invite/invite-row1.png"
              />
              <view class="invite-content-info-content-record-item-title absolute top-24 left-62 font-normal text-24 text-black"
                >累计奖励</view
              >
              <view
                class="invite-content-info-content-record-item-value theme-font absolute top-12 left-168 font-normal text-40 text-black"
                >{{ agentInfo?.agent?.getCoin }}</view
              >
            </view>
            <view class="invite-content-info-content-record-item relative flex flex-row items-baseline">
              <image
                class="invite-content-info-content-record-item-row2 w-415 h-69"
                src="/static/kahe-202510/invite/invite-row2.png"
              />
              <view class="invite-content-info-content-record-item-title absolute top-24 left-62 font-normal text-24 text-black"
                >累计人数</view
              >
              <view
                class="invite-content-info-content-record-item-value theme-font absolute top-12 left-168 font-normal text-40 text-black"
                >{{ agentInfo?.agent?.userNum }}</view
              >
            </view>
          </view>
        </view>
        <view class="invite-content-info-invite absolute left-56 bottom-48 flex flex-row justify-between items-center"
          :style="{ width: 'calc(100% - 112rpx)' }"
        >
          <view class="invite-content-info-invite-input mt-8 w-313 h-80 rounded-40 px-24 box-border"
            :style="{ background: '#ffffff', boxShadow: '1rpx 4rpx 0 0 #7342A4' }"
          >
            <input
              class="invite-content-info-invite-input-item h-full w-full"
              :inputBorder="false"
              v-model="agentUid"
              placeholder="填写盟主ID"
              :placeholderStyle="placeholderStyle"
            />
          </view>
          <view
            class="invite-content-info-invite-btn relative w-242 h-89"
            @tap.stop="getBindAgentInfo"
          >
            <image
              class="invite-content-info-invite-btn-bg w-full h-full"
              src="/static/kahe-202510/invite/invite-tag.png"
            />
            <view class="invite-content-info-invite-btn-text theme-font absolute left-0 top-32 text-center w-full font-400 text-30 text-[#fefffd]"
              :style="{ textShadow: '1rpx 3rpx 0 #30b7c7' }"
              >确认邀请</view
            >
          </view>
        </view>
      </view>
      <view class="invite-content-info relative ml-12 w-727 h-393">
        <image
          class="invite-content-info-bg w-full h-full"
          src="/static/kahe-202510/invite/invite-1-bg.png"
        />
        <image
          class="invite-content-info-item absolute top-30 left-44 w-58 h-58"
          src="/static/kahe-202510/invite/invite-item2.png"
        />
        <view class="invite-content-info-title theme-font absolute top-34 left-128 font-400 text-36 text-white">我的联盟</view>
        <view class="invite-content-info-subTitle absolute top-56 left-348 font-normal text-24 text-[#fefffd]"
          >优质盟友越多，奖励越多!</view
        >
        <view class="invite-content-info-agent absolute top-102 left-56 flex flex-row items-center"
          :style="{ width: 'calc(100% - 112rpx)' }"
        >
          <view class="invite-content-info-agent-info flex flex-col justify-center items-center w-200">
            <view class="invite-content-info-agent-info-avatar relative w-151 h-115">
              <image
                class="invite-content-info-agent-info-avatar-bg w-full h-full"
                src="/static/kahe-202510/invite/invite-avatar-bg.png"
              />
              <image
                class="invite-content-info-agent-info-avatar-decorate absolute left-32 top-10 w-92 h-92 rounded-46"
                :src="agentInfo?.user?.user.avatar"
              />
            </view>
            <view class="invite-content-info-agent-info-nick font-normal text-20 text-white">{{
              agentInfo?.user?.user.nickname
            }}</view>
          </view>
          <view class="invite-content-info-agent-record flex flex-col justify-start">
            <view class="invite-content-info-agent-record-item relative flex flex-row items-baseline">
              <image
                class="invite-content-info-agent-record-item-row1 w-437 h-75"
                src="/static/kahe-202510/invite/invite-row1.png"
              />

              <view class="invite-content-info-agent-record-item-title absolute top-24 left-62 font-normal text-24 text-black"
                >今日奖励</view
              >
              <view
                class="invite-content-info-agent-record-item-value theme-font absolute top-12 left-168 font-normal text-40 text-black"
                >{{
                  agentInfo?.user?.getCoinDay + agentInfo?.user?.putCoinUserDay
                }}</view
              >
            </view>
            <view class="invite-content-info-agent-record-item relative flex flex-row items-baseline">
              <image
                class="invite-content-info-agent-record-item-row2 w-415 h-69"
                src="/static/kahe-202510/invite/invite-row2.png"
              />

              <view class="invite-content-info-agent-record-item-title absolute top-24 left-62 font-normal text-24 text-black"
                >累积奖励</view
              >
              <view
                class="invite-content-info-agent-record-item-value theme-font absolute top-12 left-168 font-normal text-40 text-black"
                >{{
                  agentInfo?.user?.getCoin + agentInfo?.user?.putCoinUser
                }}</view
              >
            </view>
            <view class="invite-content-info-agent-record-item relative flex flex-row items-baseline">
              <image
                class="invite-content-info-agent-record-item-row3 w-437 h-74"
                src="/static/kahe-202510/invite/invite-row3.png"
              />
              <view class="invite-content-info-agent-record-item-title absolute top-24 left-62 font-normal text-24 text-black"
                >盟友人数</view
              >
              <view
                class="invite-content-info-agent-record-item-value theme-font absolute top-12 left-168 font-normal text-40 text-black"
                >{{ agentInfo?.user?.userNum }}</view
              >
            </view>
          </view>
        </view>
      </view>
      <view class="invite-content-list mt-24 ml-12 relative w-727 h-547">
        <image
          class="invite-content-list-bg w-full h-full"
          src="/static/kahe-202510/invite/invite-2-bg.png"
        />
        <view class="invite-content-list-title theme-font absolute top-20 left-0 w-full text-center font-400 text-46 text-white">联盟成员</view>
        <scroll-view
          class="invite-content-list-content absolute top-104 left-0 w-full h-360"
          :scroll-y="true"
          :enable-flex="true"
        >
          <view class="invite-content-list-content-items relative flex flex-col w-full">
            <view
              class="invite-content-list-content-items-item relative w-full text-white flex flex-row items-center justify-center"
              :style="{ height: '52px' }"
              v-for="(item, index) in agentInfo?.list?.content"
              :key="'invite-content-list-content-items-item' + index"
            >
              <image
                class="invite-content-list-content-items-item-avatar w-80 h-80 rounded-40"
                :src="item.user.avatar"
              />
              <view class="invite-content-list-content-items-item-nick ml-16 font-400" :style="{ fontSize: '13px' }">{{
                item.user.nickname
              }}</view>
              <view class="invite-content-list-content-items-item-mark ml-16 font-400" :style="{ fontSize: '13px' }"
                >累计为您提供{{ item.putCoin }}点券</view
              >
            </view>
          </view>
        </scroll-view>
        <pager class="invite-content-list-page absolute left-0 bottom-32 w-full" />
      </view>
      <view class="invite-content-rule price-font mt-180 ml-60 flex flex-col text-white"
        :style="{ width: 'calc(100% - 120rpx)' }"
      >
        <view class="invite-content-rule-title text-40 w-full text-center">规则说明</view>
        <view class="invite-content-rule-subTitle text-30 text-left">【邀请方法】</view>
        <view class="invite-content-rule-row w-full flex flex-row justify-start items-start text-left flex-wrap leading-40">
          <view class="invite-content-rule-row-text text-25 leading-40"
            >【1】盟主分享本页面给好友即可邀请对方加入联盟。</view
          >
        </view>
        <view class="invite-content-rule-row w-full flex flex-row justify-start items-start text-left flex-wrap leading-40">
          <view class="invite-content-rule-row-text text-25 leading-40"
            >【2】在本页输入盟主ID也可加入加盟。</view
          >
        </view>
        <view class="invite-content-rule-subTitle text-30 text-left">【奖励分成】</view>
        <view class="invite-content-rule-row w-full flex flex-row justify-start items-start text-left flex-wrap leading-40">
          <view class="invite-content-rule-row-text text-25 leading-40"
            >【1】盟友每一笔消费都会额外奖励</view
          >
          <view class="invite-content-rule-row-value text-25 text-[#00f0ff]">{{ Number(agentInfo?.cfg?.agent_user_rate) * 100 }}%</view>
          <view class="invite-content-rule-row-text text-25 leading-40">的点券给自己</view>
          <view class="invite-content-rule-row-text text-25 leading-40">同时额外奖励盟主</view>
          <view class="invite-content-rule-row-value text-25 text-[#00f0ff]">{{ Number(agentInfo?.cfg?.agent_agent_rate * 100) }}%</view>
          <view class="invite-content-rule-row-text text-25 leading-40">的点券。</view>
        </view>
        <view class="invite-content-rule-row w-full flex flex-row justify-start items-start text-left flex-wrap leading-40">
          <view class="invite-content-rule-row-text text-25 leading-40"
            >【2】每天24点统一发放奖励；盟友不设上限。</view
          >
        </view>
        <view class="invite-content-rule-row w-full flex flex-row justify-start items-start text-left flex-wrap leading-40">
          <view class="invite-content-rule-row-text text-25 leading-40"
            >【3】目前仅统计封面标识有“联盟奖励”的箱子。</view
          >
        </view>
      </view>
    </view>
    <invite-bind
      v-model:show="bindModalShow"
      :nickname="bindAgentInfo.nickname"
      @didTapConfirm="didTapConfirm"
    />

    <!--        <login v-model:show="loginShow" @did-tap-login="handleLogin" />-->
  </view>
</template>

<script lang="ts" setup>
// import Login from '@/components/login/index.vue'
import { useLogin } from "@/composables/login";

import InviteBind from "./components/bind/index.vue";
import Pager from "./components/page/index.vue";
import { useInvite } from "./invite";
import { onShareTimeline, onShareAppMessage } from "@dcloudio/uni-app";
import { eventBus } from "@/utils/event";
const { loginShow, handleLogin } = useLogin();

const {
  agentInfo,
  agentUid,
  placeholderStyle,
  bindModalShow,
  bindAgentInfo,
  didTapConfirm,
  getBindAgentInfo,
} = useInvite();

onShareAppMessage(() => {
  const userId = agentInfo.value?.user?.user.username;
  return {
    title: "和我成为盟友，一起瓜分收益！",
    imageUrl: "/static/kahe-202510/resources/share-img.jpg",
    path: `/subPackages/mine/invite/index?agent=${userId}`,
  };
});
onShareTimeline(() => {
  const userId = agentInfo.value?.user?.user.username;
  return {
    title: "和我成为盟友，一起瓜分收益！",
    imageUrl: "/static/kahe-202510/resources/share-img.jpg",
    path: `/subPackages/mine/invite/index?agent=${userId}`,
  };
});
</script>

<style lang="scss" scoped>
.invite-content-share-btn::after {
  background-color: transparent;
  border: none;
}
</style>
