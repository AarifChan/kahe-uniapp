<template>
    <view class="groupBuyReward">
        <image class="groupBuyReward-bg" src="https://jms.85gui7.com/kahe-202510/groupBuy/reward-bg.png" />
        <view class="groupBuyReward-content" v-if="!opened">
            <view class="groupBuyReward-content-open">
                <view class="groupBuyReward-content-center-title" />
                <image class="groupBuyReward-content-center-card" :style="{transform: 'scale(1.4)'}" src="https://jms.85gui7.com/kahe-202510/groupBuy/open-reward.png"  />
            </view>
        </view>
        <view class="groupBuyReward-content" v-else>
            <image class="groupBuyReward-content-bottom" src="https://jms.85gui7.com/kahe-202510/groupBuy/reward-item.png" />
            <view class="groupBuyReward-content-center">
                <z-swiper v-model="cardList">
                    <z-swiper-item
                        :custom-style="slideCustomStyle"
                        v-for="(item, index) in cardList"
                        :key="'ccc'+index"
                    >
                        <view class="groupBuyReward-content-center-title">#{{item.sid}}-{{item.name}} {{item.sname}} {{getNormalLevelNameByLevel(item.level)}}</view>
                        <image class="groupBuyReward-content-center-card" src="https://jms.85gui7.com/kahe-202510/groupBuy/reward-card1.png" />
                    </z-swiper-item>
                </z-swiper>
            </view>

            <view class="groupBuyReward-content-tips">卡密以原版信息为准，中文翻译及图片【仅供参考】</view>
            <view v-if="all" class="groupBuyReward-content-button" style="justify-content: center">
                <style2-btn title="全部开启" />
            </view>
            <view v-else class="groupBuyReward-content-button">
                <view style="display: flex;flex-direction: row">
                    <style1-btn title="再来一份" @tap.stop="emits('didClickAgain')" />
                    <style1-btn title="订单详情" @tap.stop="emits('didClickDetail')" />
                </view>
                <!--                <style3-btn title="转赠卡密" />-->
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import style1Btn from '../buttonStyle1/index.vue'
import style2Btn from '../buttonStyle2/index.vue'
import { onMounted, PropType, ref, watch } from 'vue'
import { GroupBuyCard } from '@/model'
import { useEnum } from '@/composables/enum'
const { getNormalLevelNameByLevel } = useEnum()
const slideCustomStyle = ref({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
})
const props = defineProps({
    show: {
        default: false,
        type: Boolean
    },
    all: {
        default: false,
        type: Boolean
    },
    list: {
        default: () => [],
        type: Array as PropType<Array<GroupBuyCard>>
    }
})

watch(() => props.list, (val) => {
    cardList.value = val
})
onMounted(() => {
    cardList.value = props.list
    setTimeout(() => {
        opened.value = true
    }, 1300)
})
const opened = ref(false)
const cardList = ref<GroupBuyCard[]>(props.list)

const emits = defineEmits(['didClickDetail', 'didClickAgain'])

</script>

<style lang="scss" scoped>
.groupBuyReward{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: #2F3B78;
    &-bg{
        width: 100%;
        aspect-ratio: 750 / 1344;
    }
    &-content{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &-card{
            position: absolute;
            left: calc( (100% - 378rpx) / 2);
            bottom: calc(env(safe-area-inset-bottom) + 478rpx);

        }
        &-open{
            position: absolute;
            left: 0;
            top: 242rpx;
            width: 100%;
            height: 600rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        &-center{
            position: absolute;
            left: 0;
            top: 242rpx;
            width: 100%;
            height: 600rpx;
            &-title{
                width: 100%;
                text-align: center;
                font-weight: 400;
                font-size: 28rpx;
                color: #FFFFFF;
            }
            &-card{
                margin-top: 42rpx;
                width: 378rpx;
                height: 560rpx;
            }
        }
        &-bottom{
            position: absolute;
            left: 0;
            bottom: calc(env(safe-area-inset-bottom) + 255rpx);
            width: 750rpx;
            aspect-ratio: 813 / 481;
        }
        &-tips{
            position: absolute;
            left: 0;
            width: 100%;
            bottom: calc(env(safe-area-inset-bottom) + 245rpx);
            font-weight: 400;
            font-size: 20rpx;
            color: #98B8FF;
            text-decoration-line: underline;
            text-align: center;
        }
        &-button{
            position: absolute;
            left: 0;
            width: 100%;
            padding: 0 32rpx;
            box-sizing: border-box;
            bottom: calc(env(safe-area-inset-bottom) + 100rpx);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }
}
</style>
