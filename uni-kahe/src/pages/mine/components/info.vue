<template>
    <view class="userInfo">
        <view style="margin-left: 16px; margin-bottom: 16px">
            <decorate-avatar :avatar="userInfo.avatar" :level="userInfo.vip" @tap.stop="emits('didClickAvatar')" />
        </view>

        <view class="userInfo-center">
            <view class="common-row" @tap.stop="handleLogin">
                <view class="userNickName SimHei-font">{{
                    UserModule.loginStatus ? (userInfo.nickname ?? "用户昵称") : "去登陆"
                    }}</view>
                <view class="userId">ID:{{ userInfo.uid ?? "000000" }}</view>
            </view>

            <view class="common-row" style="margin-top: 32rpx">
                <image v-if="userInfo.uid" class="userVip" :src="`https://jms.85gui7.com/kahe-202510/ka-he/vip/${userInfo.vip}.png`" />
                <view class="common-col" style="margin-top: 16rpx">
                    <view class="vipUp">成长值:{{ userInfo.expDay }}</view>
                    <view class="progressBarBg">
                        <view class="progressBarBg-value" :style="progressStyle" />
                    </view>
                </view>
            </view>
        </view>

        <image class="userEdit" src="https://jms.85gui7.com/kahe-202510/ka-he/mine/edit.png" @tap.stop="emits('didClickEdit')" />
        <view class="vipNav" @tap.stop="emits('didClickVip')">
            <!-- <image class="vipNav-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/mine/vip-bg.png" /> -->
            <view class="vipNav-title theme-font">权益中心</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import DecorateAvatar from "@/components/custom/DecorateAvatar/index.vue";
import type { PropType } from "vue";
import { ref, computed } from "vue";
import { UserModule } from "@/store/modules/user";

interface UserInfo {
    avatar: string;
    nickname: string;
    vip: number;
    uid: number;
    expDay: number;
    exp: number;
}
const props = defineProps({
    userInfo: {
        default: {} as UserInfo,
        type: Object as PropType<UserInfo>,
    },
    showVip: {
        default: true,
        type: Boolean,
    },
});
const currentLevelExp = ref(
    computed(() => {
        let levelExp = 0;
        for (const item of UserModule.vipLevelsModel) {
            if (item.id === props.userInfo.vip + 1) {
                levelExp = item.exp = item.exp ?? 0;
            }
        }
        return levelExp;
    })
);

const handleLogin = () => {
    if (UserModule.loginStatus) {
        return;
    }
    UserModule.logout();
};

const needExp = ref(
    computed(() => {
        const userExp = props.userInfo.exp;
        let levelExp = 0;
        for (const item of UserModule.vipLevelsModel) {
            if (item.id === props.userInfo.vip) {
                levelExp = item.exp = item.exp ?? 0;
            }
        }
        if (levelExp) {
            return userExp - levelExp > 0 ? userExp - levelExp : 0;
        } else {
            return 0;
        }
    })
);
const lastLevelExp = computed(() => {
    let levelExp = 0;
    for (const item of UserModule.vipLevelsModel) {
        if (item.id === props.userInfo.vip) {
            levelExp = item.exp = item.exp ?? 0;
        }
    }
    return levelExp;
});
const progress = ref(
    computed(() => {
        if (currentLevelExp.value > 0) {
            return Math.floor(
                (needExp.value / (currentLevelExp.value - lastLevelExp.value)) * 100
            );
        } else {
            return 100;
        }
    })
);
const progressStyle = ref(
    computed(
        () =>
            // `clip-path: polygon(0 0, ${progress.value}% 0, ${progress.value}% 100%, 0% 100%);`
            `width:${progress.value}%`
    )
);
const emits = defineEmits(["didClickEdit", "didClickAvatar", "didClickVip"]);
</script>

<style lang="scss" scoped>
.userInfo {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    &-center {
        margin-left: 16rpx;
        display: flex;
        flex-direction: column;
    }

    &-left {
        display: flex;
        flex-direction: row;
        align-items: center;

        &-avatar {
            position: relative;
            width: 86rpx;
            height: 86rpx;
            border-radius: 50%;
            overflow: hidden;

            &-img {
                position: relative;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &-info {
            position: relative;
            margin-top: 60rpx;
            margin-left: 26rpx;

            &-title {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 40rpx;

                &-img {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                &-text {
                    position: relative;
                    color: #000000;
                    font-size: 30rpx;
                    margin-left: 20rpx;
                }

                // &-vip {
                //     margin-left: 8px;
                //     display: flex;
                //     flex-direction: row;
                //     align-items: baseline;

                //     &-img {
                //         width: 38rpx;
                //         height: 27rpx;
                //     }

                //     &-level {
                //         width: 24rpx;
                //         height: 20rpx;
                //         font-size: 30rpx;
                //         font-weight: 400;
                //         color: #6d9dff;
                //     }
                // }
            }
        }
    }

    &-editbg {
        position: absolute;
        right: 30rpx;
        top: 38rpx;
        width: 50rpx;
        height: 50rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        &-edit {
            width: 100%;
            height: 100%;
        }
    }

    &-content {
        position: relative;
        width: 100%;
        padding: 0 60rpx;
        box-sizing: border-box;

        &-top {
            margin-top: 20rpx;
            display: flex;
            align-items: center;
            transform: translateY(15rpx);

            &-level {
                font-weight: normal;
                font-size: 36rpx;
                color: #000000;
            }
        }

        &-center {
            display: flex;
            align-items: center;
            justify-content: space-between;

            &-rights {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 125rpx;
                height: 50rpx;
                background-image: url("https://jms.85gui7.com/kahe-202510/images/rights.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                font-family: Adobe Heiti Std;
                font-weight: normal;
                font-size: 20rpx;
                color: #000000;
            }
        }

        &-text {
            font-family: Adobe Heiti Std;
            font-size: 18rpx;
            color: #60abff;
        }
    }
}

.userNickName {
    margin-left: 18rpx;
    font-weight: 500;
    font-size: 40rpx;
    color: #000000;
}

.userAvatar {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    border: 8rpx solid white;
}

.userVip {
    width: 86rpx;
    height: 91rpx;
}

.vipUp {
    font-size: 20rpx;
    color: #010101;
}

.progressBarBg {
    margin-top: 10rpx;
    position: relative;
    width: 260rpx;
    height: 12rpx;
    background-color: #cfc3ac;
    border-radius: 6rpx;
    overflow: hidden;

    &-value {
        position: absolute;
        left: 0;
        top: 0;
        max-width: 100%;
        height: 100%;
        background-color: #ff673e;
    }
}

.userId {
    margin-top: 8px;
    margin-left: 64rpx;
    text-align: center;
    color: white;
    padding: 0 8rpx;
    height: 26rpx;
    border-radius: 13rpx;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    align-items: center;
    background: #D87155;
    font-size: 22rpx;
}

.userEdit {
    position: absolute;
    top: 16rpx;
    right: 32rpx;
    width: 56rpx;
    height: 56rpx;
}

.vipNav {
    position: absolute;
    bottom: 16rpx;
    right: 32rpx;
    width: 174rpx;
    height: 40rpx;
    width: 98rpx;
    height: 34rpx;
    background: linear-gradient(0deg, #FFEEC5);
    box-shadow: 0rpx 2rpx 0rpx 0rpx #774718;
    border-radius: 17rpx;
    border: 2px solid #CDA374;
    display: flex;
    justify-content: center;
    align-items: center;

    &-bg {
        width: 100%;
        height: 100%;
    }

    &-title {
        color: #000000;
        font-weight: 400;
        font-size: 18rpx;
    }
}
</style>
