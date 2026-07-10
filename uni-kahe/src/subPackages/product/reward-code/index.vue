<template>
    <view class="code w-full bg-[#f3f6fe]" style="height: 100vh;">
        <view class="code-tab w-full flex justify-between">
            <view class="code-tab-tabList relative mt-43 text-center w-1/2"
                v-for="(item,index) in tabList" :key="index"
                @tap.stop="tabActive(item.value)"
                :class="current===item.value?'text-30 text-black':'text-28 text-[#7D7D7D]'"
            >
                {{ item.title }}
                <view v-if="current===item.value" class="code-tab-tabList-line absolute -bottom-4 left-1/2 -translate-x-1/2 w-104 h-2 bg-black" />
            </view>
        </view>
        <scroll-view class="code-list relative mt-30 flex items-center flex-col w-full"
            :scroll-y="true"
            :enable-flex="true"
            style="height: calc(100% - 80rpx - env(safe-area-inset-bottom));"
        >
            <view class="code-list-item mt-10 flex-shrink-0 mb-20 w-693 h-168 bg-[#F3F6FE] rounded-4 box-border flex items-center"
                style="box-shadow: 0rpx 0rpx 8rpx 0rpx #B7B7B7; padding: 0 40rpx 0 20rpx;"
                v-for="(item,index) in codeList" :key="index"
            >
                <view class="code-list-item-left relative flex-1">
                    <view class="code-list-item-left-code text-30 text-black" style="transform: translateY(-20rpx);">{{ calculateMD5(item.id, 10)  }}</view>
                    <view class="code-list-item-left-time text-24 text-[#7A7A7A]">{{item.time}}初始获得</view>
                    <view class="code-list-item-left-title mt-10 text-26 text-[#2E2E2E]">福利抽选</view>
                    <view class="code-list-item-left-context absolute left-114 -bottom-2 w-87 h-31 bg-[#444444] rounded-16 text-center"
                        style="line-height: 23rpx;"
                    >
                        <text class="code-list-item-left-context-text text-20 text-white">第一期</text>
                    </view>
                </view>
                <view class="code-list-item-right">
                    <text class="code-list-item-right-title theme-font text-40 text-black">{{ item.status === 2 ? '已开奖':'等待开奖' }}</text>
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
</style>
