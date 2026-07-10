<template>
    <view class="boxChoose relative -mt-12 w-full flex flex-col items-center">
        <image class="boxChoose-bg w-292 h-33" src="/static/kahe/product/choose-title-bg.png" />
        <text class="boxChoose-title theme-font absolute w-200 top-2 text-center text-20 font-normal text-white" :style="{ left: 'calc((100% - 200rpx) / 2)' }">本福袋已开启排队机制 </text>
        <text class="boxChoose-tips theme-font py-14 px-38 text-20 font-normal text-[#FFFFFF]" :style="{ width: 'calc(100% - 76rpx)' }"
        >1发包邮，本福袋有保护机制!抽到皮卡皮卡卡牌默认不 发货需要的到付发平卡邮费
            自理!本福袋为玩家福袋有任何问题请联系转发福袋的玩家与福袋商家无关! </text>
        <scroll-view
            class="boxChoose-content relative py-6 px-20"
            :scroll-y="true"
            :enable-flex="true"
            @scroll="scroll"
            :style="{ width: 'calc(100% - 40rpx)', height: 'calc(100vh - 588rpx - env(safe-area-inset-bottom))' }"
        >
            <view class="boxChoose-content-list relative flex flex-col py-20 px-20 bg-[#1F1F1F] rounded-10" :style="{ width: 'calc(100% - 40rpx)' }">
                <box-select-row v-for="(item, index) in boxSelectList" :index="index"  :key="index" />
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BoxSelectRow from './boxSelectRow.vue'

const boxSelectList = ref([{
},
{
}, {
}, {
}, {
}, {
}])

</script>

<style lang="scss" scoped>
</style>
