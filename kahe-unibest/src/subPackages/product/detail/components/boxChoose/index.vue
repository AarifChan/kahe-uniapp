<template>
    <view class="boxChoose">
        <image class="boxChoose-bg" src="https://jms.85gui7.com/kahe/product/choose-title-bg.png" />
        <text class="boxChoose-title theme-font">本福袋已开启排队机制 </text>
        <text class="boxChoose-tips theme-font">1发包邮，本福袋有保护机制!抽到皮卡皮卡卡牌默认不 发货需要的到付发平卡邮费
            自理!本福袋为玩家福袋有任何问题请联系转发福袋的玩家与福袋商家无关! </text>
        <scroll-view
            class="boxChoose-content"
            :scroll-y="true"
            :enable-flex="true"
            @scroll="scroll"
        >
            <view class="boxChoose-content-list">
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
.boxChoose{
    position: relative;
    margin-top: -12rpx;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-bg{

        width: 292rpx;
        height: 33rpx;
    }
    &-title{
        position: absolute;
        width: 200rpx;
        top: 2rpx;
        left: calc( (100% - 200rpx) / 2);
        text-align: center;
        color: white;
        font-size: 20rpx;
        font-weight: 400;
    }
    &-tips{
        padding: 14rpx 38rpx;
        width: calc(100% - 76rpx);
        font-size: 20rpx;
        font-weight: 400;
        color: #FFFFFF;
    }
    &-content{
        position: relative;
        padding: 6rpx 20rpx;
        width: calc(100% - 40rpx);
        height: calc(100vh - 588rpx - env(safe-area-inset-bottom));
        &-list{
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 20rpx;
            width: calc(100% - 40rpx);
            background: #1F1F1F;
            border-radius: 10rpx;
        }
    }

}
</style>
