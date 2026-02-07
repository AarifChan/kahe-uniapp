<template>
  <view class="invite">
    <image class="invite-bg" src="https://jms.85gui7.com/kahe-202510/invite/invite-bg.png" />
    <view class="invite-content">
      <view class="invite-content-share">
        <image
          class="invite-content-share-bg"
          src="https://jms.85gui7.com/kahe-202510/invite/invite-tag.png"
        />
        <button openType="share" class="invite-content-share-btn theme-font">
          点击邀请盟友
        </button>
      </view>
      <view class="invite-content-info">
        <image
          class="invite-content-info-bg"
          src="https://jms.85gui7.com/kahe-202510/invite/invite-1-bg.png"
        />
        <image
          class="invite-content-info-item"
          src="https://jms.85gui7.com/kahe-202510/invite/invite-item1.png"
        />
        <view class="invite-content-info-title theme-font">我的盟主</view>
        <view class="invite-content-info-subTitle"
          >和盟主一起畅玩，不再孤单！</view
        >
        <view class="invite-content-info-agent">
          <view class="invite-content-info-agent-info">
            <view class="invite-content-info-agent-info-avatar">
              <image
                class="invite-content-info-agent-info-avatar-bg"
                src="https://jms.85gui7.com/kahe-202510/invite/invite-avatar-bg.png"
              />
              <image
                class="invite-content-info-agent-info-avatar-decorate"
                :src="agentInfo?.agent?.user.avatar"
              />
            </view>
            <view class="invite-content-info-agent-info-nick">{{
              agentInfo?.agent?.user?.nickname ?? "待绑定"
            }}</view>
          </view>
          <view class="invite-content-info-agent-record">
            <view class="invite-content-info-agent-record-item">
              <image
                class="invite-content-info-agent-record-item-row1"
                src="https://jms.85gui7.com/kahe-202510/invite/invite-row1.png"
              />
              <view class="invite-content-info-agent-record-item-title"
                >累计奖励</view
              >
              <view
                class="invite-content-info-agent-record-item-value theme-font"
                >{{ agentInfo?.agent?.getCoin }}</view
              >
            </view>
            <view class="invite-content-info-agent-record-item">
              <image
                class="invite-content-info-agent-record-item-row2"
                src="https://jms.85gui7.com/kahe-202510/invite/invite-row2.png"
              />
              <view class="invite-content-info-agent-record-item-title"
                >累计人数</view
              >
              <view
                class="invite-content-info-agent-record-item-value theme-font"
                >{{ agentInfo?.agent?.userNum }}</view
              >
            </view>
          </view>
        </view>
        <view class="invite-content-info-invite">
          <view class="invite-content-info-invite-input">
            <input
              class="invite-content-info-invite-input-item"
              :inputBorder="false"
              v-model="agentUid"
              placeholder="填写盟主ID"
              :placeholderStyle="placeholderStyle"
            />
          </view>
          <view
            class="invite-content-info-invite-btn"
            @tap.stop="getBindAgentInfo"
          >
            <image
              class="invite-content-info-invite-btn-bg"
              src="https://jms.85gui7.com/kahe-202510/invite/invite-tag.png"
            />
            <view class="invite-content-info-invite-btn-text theme-font"
              >确认邀请</view
            >
          </view>
        </view>
      </view>
      <view class="invite-content-info">
        <image
          class="invite-content-info-bg"
          src="https://jms.85gui7.com/kahe-202510/invite/invite-1-bg.png"
        />
        <image
          class="invite-content-info-item"
          src="https://jms.85gui7.com/kahe-202510/invite/invite-item2.png"
        />
        <view class="invite-content-info-title theme-font">我的联盟</view>
        <view class="invite-content-info-subTitle"
          >优质盟友越多，奖励越多!</view
        >
        <view class="invite-content-info-content">
          <view class="invite-content-info-content-info">
            <view class="invite-content-info-content-info-avatar">
              <image
                class="invite-content-info-content-info-avatar-bg"
                src="https://jms.85gui7.com/kahe-202510/invite/invite-avatar-bg.png"
              />
              <image
                class="invite-content-info-content-info-avatar-decorate"
                :src="agentInfo?.user?.user.avatar"
              />
            </view>
            <view class="invite-content-info-content-info-nick">{{
              agentInfo?.user?.user.nickname
            }}</view>
          </view>
          <view class="invite-content-info-content-record">
            <view class="invite-content-info-content-record-item">
              <image
                class="invite-content-info-content-record-item-row1"
                src="https://jms.85gui7.com/kahe-202510/invite/invite-row1.png"
              />

              <view class="invite-content-info-content-record-item-title"
                >今日奖励</view
              >
              <view
                class="invite-content-info-content-record-item-value theme-font"
                >{{
                  agentInfo?.user?.getCoinDay + agentInfo?.user?.putCoinUserDay
                }}</view
              >
            </view>
            <view class="invite-content-info-content-record-item">
              <image
                class="invite-content-info-content-record-item-row2"
                src="https://jms.85gui7.com/kahe-202510/invite/invite-row2.png"
              />

              <view class="invite-content-info-content-record-item-title"
                >累积奖励</view
              >
              <view
                class="invite-content-info-content-record-item-value theme-font"
                >{{
                  agentInfo?.user?.getCoin + agentInfo?.user?.putCoinUser
                }}</view
              >
            </view>
            <view class="invite-content-info-content-record-item">
              <image
                class="invite-content-info-content-record-item-row3"
                src="https://jms.85gui7.com/kahe-202510/invite/invite-row3.png"
              />
              <view class="invite-content-info-content-record-item-title"
                >盟友人数</view
              >
              <view
                class="invite-content-info-content-record-item-value theme-font"
                >{{ agentInfo?.user?.userNum }}</view
              >
            </view>
          </view>
        </view>
      </view>
      <view class="invite-content-list">
        <image
          class="invite-content-list-bg"
          src="https://jms.85gui7.com/kahe-202510/invite/invite-2-bg.png"
        />
        <view class="invite-content-list-title theme-font">联盟成员</view>
        <scroll-view
          class="invite-content-list-content"
          :scroll-y="true"
          :enable-flex="true"
        >
          <view class="invite-content-list-content-items">
            <view
              class="invite-content-list-content-items-item"
              v-for="(item, index) in agentInfo?.list?.content"
              :key="'invite-content-list-content-items-item' + index"
            >
              <image
                class="invite-content-list-content-items-item-avatar"
                :src="item.user.avatar"
              />
              <view class="invite-content-list-content-items-item-nick">{{
                item.user.nickname
              }}</view>
              <view class="invite-content-list-content-items-item-mark"
                >累计为您提供{{ item.putCoin }}点券</view
              >
            </view>
          </view>
        </scroll-view>
        <pager class="invite-content-list-page" />
      </view>
      <view class="invite-content-rule price-font">
        <view class="invite-content-rule-title">规则说明</view>
        <view class="invite-content-rule-subTitle">【邀请方法】</view>
        <view class="invite-content-rule-row">
          <view class="invite-content-rule-row-text"
            >【1】盟主分享本页面给好友即可邀请对方加入联盟。</view
          >
        </view>
        <view class="invite-content-rule-row">
          <view class="invite-content-rule-row-text"
            >【2】在本页输入盟主ID也可加入加盟。</view
          >
        </view>
        <view class="invite-content-rule-subTitle">【奖励分成】</view>
        <view class="invite-content-rule-row">
          <view class="invite-content-rule-row-text"
            >【1】盟友每一笔消费都会额外奖励</view
          >
          <view class="invite-content-rule-row-value"
            >{{ Number(agentInfo?.cfg?.agent_user_rate) * 100 }}%</view
          >
          <view class="invite-content-rule-row-text">的点券给自己</view>
          <view class="invite-content-rule-row-text">同时额外奖励盟主</view>
          <view class="invite-content-rule-row-value"
            >{{ Number(agentInfo?.cfg?.agent_agent_rate * 100) }}%</view
          >
          <view class="invite-content-rule-row-text">的点券。</view>
        </view>
        <view class="invite-content-rule-row">
          <view class="invite-content-rule-row-text"
            >【2】每天24点统一发放奖励；盟友不设上限。</view
          >
        </view>
        <view class="invite-content-rule-row">
          <view class="invite-content-rule-row-text"
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
    imageUrl: "https://jms.85gui7.com/kahe-202510/resources/share-img.jpg",
    path: `/subPackages/mine/invite/index?agent=${userId}`,
  };
});
onShareTimeline(() => {
  const userId = agentInfo.value?.user?.user.username;
  return {
    title: "和我成为盟友，一起瓜分收益！",
    imageUrl: "https://jms.85gui7.com/kahe-202510/resources/share-img.jpg",
    path: `/subPackages/mine/invite/index?agent=${userId}`,
  };
});
</script>

<style lang="scss" scoped>
.invite {
  position: relative;
  width: 100%;
  &-bg {
    width: 750rpx;
    height: 2665rpx;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    &-share {
      position: relative;
      margin-top: 424rpx;
      margin-left: 152rpx;
      margin-bottom: 200rpx;
      width: 242rpx;
      height: 89rpx;

      &-bg {
        width: 100%;
        height: 100%;
      }
      &-btn {
        position: absolute;
        left: 0;
        top: 12rpx;
        background-color: transparent;
        text-align: center;
        width: 100%;
        font-weight: 400;
        font-size: 30rpx;
        color: #fefffd;
        text-shadow: 1rpx 3rpx 0 #30b7c7;
      }
      &-btn::after {
        background-color: transparent;
        border: none;
      }
    }

    &-info {
      position: relative;
      margin-left: 12rpx;

      width: 727rpx;
      height: 393rpx;
      &-bg {
        width: 100%;
        height: 100%;
      }
      &-item {
        position: absolute;
        top: 30rpx;
        left: 44rpx;
        width: 58rpx;
        height: 58rpx;
      }
      &-title {
        position: absolute;
        top: 34rpx;
        left: 128rpx;
        font-weight: 400;
        font-size: 36rpx;
        color: #ffffff;
      }
      &-subTitle {
        position: absolute;
        top: 56rpx;
        left: 348rpx;
        font-weight: normal;
        font-size: 24rpx;
        color: #fefffd;
      }

      &-content {
        position: absolute;
        top: 120rpx;
        left: 56rpx;
        width: calc(100% - 112rpx);
        height: 220rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        &-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 200rpx;

          &-avatar {
            position: relative;
            width: 151rpx;
            height: 115rpx;
            &-bg {
              width: 100%;
              height: 100%;
            }
            &-decorate {
              position: absolute;
              left: 32rpx;
              top: 10rpx;
              width: 92rpx;
              height: 92rpx;
              border-radius: 46rpx;
            }
          }
          &-nick {
            font-weight: normal;
            font-size: 20rpx;
            color: #ffffff;
          }
        }

        &-record {
          display: flex;
          flex-direction: column;
          &-item {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: baseline;

            &-row1 {
              width: 437rpx;
              height: 75rpx;
            }
            &-row2 {
              width: 415rpx;
              height: 69rpx;
            }
            &-row3 {
              width: 437rpx;
              height: 74rpx;
            }
            &-title {
              position: absolute;
              top: 24rpx;
              left: 62rpx;
              font-weight: normal;
              font-size: 24rpx;
              color: #000000;
            }
            &-value {
              position: absolute;
              top: 12rpx;
              left: 168rpx;
              font-weight: normal;
              font-size: 40rpx;
              color: #000000;
            }
          }
        }
      }

      &-agent {
        position: absolute;
        top: 102rpx;
        left: 56rpx;
        width: calc(100% - 112rpx);

        display: flex;
        flex-direction: row;
        align-items: center;
        &-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 200rpx;

          &-avatar {
            position: relative;
            width: 151rpx;
            height: 115rpx;
            &-bg {
              width: 100%;
              height: 100%;
            }
            &-decorate {
              position: absolute;
              left: 32rpx;
              top: 10rpx;
              width: 92rpx;
              height: 92rpx;
              border-radius: 46rpx;
            }
          }
          &-nick {
            font-weight: normal;
            font-size: 20rpx;
            color: #ffffff;
          }
        }
        &-record {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          &-item {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: baseline;

            &-row1 {
              width: 437rpx;
              height: 75rpx;
            }
            &-row2 {
              width: 415rpx;
              height: 69rpx;
            }
            &-row3 {
              width: 437rpx;
              height: 74rpx;
            }
            &-title {
              position: absolute;
              top: 24rpx;
              left: 62rpx;
              font-weight: normal;
              font-size: 24rpx;
              color: #000000;
            }
            &-value {
              position: absolute;
              top: 12rpx;
              left: 168rpx;
              font-weight: normal;
              font-size: 40rpx;
              color: #000000;
            }
          }
        }
      }

      &-invite {
        position: absolute;
        left: 56rpx;
        bottom: 48rpx;
        width: calc(100% - 112rpx);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        &-input {
          margin-top: 8rpx;
          width: 313rpx;
          height: 80rpx;
          background: #ffffff;
          box-shadow: 1rpx 4rpx 0 0 #7342a4;
          border-radius: 40rpx;
          padding: 0 24rpx;
          &-item {
            height: 100%;
            width: 100%;
          }
        }
        &-btn {
          position: relative;
          width: 242rpx;
          height: 89rpx;
          &-bg {
            width: 100%;
            height: 100%;
          }
          &-text {
            position: absolute;
            left: 0;
            top: 32rpx;
            text-align: center;
            width: 100%;
            font-weight: 400;
            font-size: 30rpx;
            color: #fefffd;
            text-shadow: 1rpx 3rpx 0 #30b7c7;
          }
        }
      }
    }

    &-list {
      margin-top: 24rpx;
      margin-left: 12rpx;
      position: relative;
      width: 727rpx;
      height: 547rpx;
      &-bg {
        width: 100%;
        height: 100%;
      }
      &-title {
        position: absolute;
        top: 20rpx;
        left: 0;
        width: 100%;
        text-align: center;
        font-weight: 400;
        font-size: 46rpx;
        color: #ffffff;
      }
      &-content {
        position: absolute;
        top: 104rpx;
        left: 0;
        width: 100%;
        height: 360rpx;
        &-items {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;

          &-item {
            position: relative;
            width: 100%;
            color: #ffffff;
            height: 52px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            &-avatar {
              width: 80rpx;
              height: 80rpx;
              border-radius: 40rpx;
            }
            &-nick {
              margin-left: 16rpx;
              font-size: 13px;
              font-weight: 400;
            }
            &-mark {
              margin-left: 16rpx;
              font-size: 13px;
              font-weight: 400;
            }
          }
        }
      }

      &-page {
        position: absolute;
        left: 0;
        bottom: 32rpx;
        width: 100%;
      }
    }

    &-rule {
      margin-top: 180rpx;
      margin-left: 60rpx;
      width: calc(100% - 120rpx);
      display: flex;
      flex-direction: column;
      color: white;
      &-title {
        font-size: 40rpx;
        width: 100%;
        text-align: center;
      }
      &-subTitle {
        font-size: 30rpx;
        text-align: left;
      }
      &-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        text-align: left;
        flex-wrap: wrap;
        line-height: 40rpx;
        &-text {
          font-size: 25rpx;
          line-height: 40rpx;
        }
        &-value {
          font-size: 25rpx;
          color: #00f0ff;
        }
      }
    }
  }
}
</style>
