<template>
    <view class="code">
        <view class="code-tab">
            <view class="code-tab-tabList" v-for="(item,index) in tabList" :key="index" @tap.stop="tabActive(item.value)"
                  :class="current===item.value?'active':''"
            >
                {{ item.title }}
            </view>
        </view>
        <scroll-view class="code-list" :scroll-y="true" :enable-flex="true">
            <view class="code-list-item" v-for="(item,index) in codeList" :key="index">
                <view class="code-list-item-left">
                    <view class="code-list-item-left-code">{{ calculateMD5(item.id, 10)  }}</view>
                    <view class="code-list-item-left-time">{{item.time}}初始获得</view>
                    <view class="code-list-item-left-title">福利抽选</view>
                    <view class="code-list-item-left-context">
                        <text class="code-list-item-left-context-text">第一期</text>
                    </view>
                </view>
                <view class="code-list-item-right">
                    <text class="code-list-item-right-title theme-font">{{ item.status === 2 ? '已开奖':'等待开奖' }}</text>
                </view>
            </view>
            <empty :show="codeList.length===0" />
        </scroll-view>
    </view>
</template>
<script lang="ts" setup>
import { useWelfare } from '@/composables/welfare'
import { UserModule } from '@/store/modules/user'
import { calculateMD5, getPageOptions } from '@/utils/tools'
import Empty from '@/components/empty/index.vue'

import { type Ref, ref, onMounted, computed } from 'vue'
const { getWelfareUserLog, aid, codeList } = useWelfare()
const userInfo = computed(() => UserModule.userInfo)

const tabList: Ref<{
    title: string;
    value: number;
}[]> = ref([{
    title: '抽奖码', value: 0
}, {
    title: '已中奖', value: 2
}])
const current = ref(0)
const tabActive = async(value:number) => {
    current.value = value
    await getWelfareUserLog(aid.value, value, '', userInfo.value.uid)
}

onMounted(async() => {
    const ops = getPageOptions()
    const aId = ops.aid
    aid.value = aId
    await getWelfareUserLog(aId, 0, '', userInfo.value.uid)
    UserModule.getUserInfo()
})

</script>
<style lang="scss" scoped>
.code {
    width:100%;
    height:calc(100vh);
    background: #f3f6fe;

    &-tab {
        width:100%;
        display:flex;
        justify-content:space-between;
        &-tabList {
            position: relative;
            margin-top: 43rpx;
            text-align: center;
            width:50%;
            font-size: 28rpx;
            color: #7D7D7D;
            &.active {
                font-size: 30rpx;
                color: #000000;
            }
            &.active::after {
                position: absolute;
                bottom: -4rpx;
                left: 50%;
                transform: translateX(-50%);
                content: '';
                width: 104rpx;
                height: 2rpx;
                background: #000000;
            }
        }
    }
    &-list {
        margin-top: 30rpx;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: calc(100% - 80rpx  - env(safe-area-inset-bottom));
        &-item {
        margin-top: 10rpx;
        flex-shrink: 0;
        margin-bottom: 20rpx;
        width: 693rpx;
        height: 168rpx;
        background: #F3F6FE;
        box-shadow: 0rpx 0rpx 8rpx 0rpx #B7B7B7;
        border-radius: 4rpx;
        display: flex;
        align-items: center;
        padding: 0 40rpx 0 20rpx;
        box-sizing: border-box;
        &-left {
            position: relative;
            flex: 1;
            &-code {
                font-size: 30rpx;
                color: #000000;
                transform: translateY(-20rpx);
            }
            &-time {
                font-size: 24rpx;
                color: #7A7A7A;
            }
            &-title {
                margin-top: 10rpx;
                font-size: 26rpx;
                color: #2E2E2E;
                &-text {
                    width: 87rpx;
                    height: 31rpx;
                    background: #444444;
                    border-radius: 16rpx;
                    color: #fff;
                    text-align: center;
                    line-height: 31rpx;
                }
            }
            &-context {
                position: absolute;
                left: 114rpx;
                bottom: -2rpx;
                width: 87rpx;
                height: 31rpx;
                background: #444444;
                border-radius: 16rpx;
                text-align: center;
                line-height: 23rpx;
                &-text {
                    font-size: 20rpx;
                    color: #fff
                }
            }
        }
        &-right {
            &-title {
                font-size: 40rpx;
                color: #000000;
            }
        }
    }
    }

}
</style>
