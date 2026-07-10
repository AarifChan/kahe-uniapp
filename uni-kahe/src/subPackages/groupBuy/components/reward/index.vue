<template>
    <view class="groupBuyReward absolute left-0 top-0 w-full h-screen bg-[#2F3B78]">
        <image class="groupBuyReward-bg w-full aspect-ratio-[750/1344]" src="/static/kahe-202510/groupBuy/reward-bg.png" />
        <view class="groupBuyReward-content absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center" v-if="!opened">
            <view class="groupBuyReward-content-open absolute left-0 top-[242rpx] w-full h-[600rpx] flex flex-col items-center justify-center">
                <view class="groupBuyReward-content-center-title w-full text-center font-normal text-28 text-[#FFFFFF]" />
                <image class="groupBuyReward-content-center-card mt-[42rpx] w-[378rpx] h-[560rpx]" :style="{transform: 'scale(1.4)'}" src="/static/kahe-202510/groupBuy/open-reward.png"  />
            </view>
        </view>
        <view class="groupBuyReward-content absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center" v-else>
            <image class="groupBuyReward-content-bottom absolute left-0 w-[750rpx] aspect-ratio-[813/481]" :style="{ bottom: 'calc(env(safe-area-inset-bottom) + 255rpx)' }" src="/static/kahe-202510/groupBuy/reward-item.png" />
            <view class="groupBuyReward-content-center absolute left-0 top-[242rpx] w-full h-[600rpx]">
                <z-swiper v-model="cardList">
                    <z-swiper-item
                        :custom-style="slideCustomStyle"
                        v-for="(item, index) in cardList"
                        :key="'ccc'+index"
                    >
                        <view class="groupBuyReward-content-center-title w-full text-center font-normal text-28 text-[#FFFFFF]">#{{item.sid}}-{{item.name}} {{item.sname}} {{getNormalLevelNameByLevel(item.level)}}</view>
                        <image class="groupBuyReward-content-center-card mt-[42rpx] w-[378rpx] h-[560rpx]" src="/static/kahe-202510/groupBuy/reward-card1.png" />
                    </z-swiper-item>
                </z-swiper>
            </view>

            <view class="groupBuyReward-content-tips absolute left-0 w-full font-normal text-20 text-[#98B8FF] underline text-center" :style="{ bottom: 'calc(env(safe-area-inset-bottom) + 245rpx)' }">卡密以原版信息为准，中文翻译及图片【仅供参考】</view>
            <view v-if="all" class="groupBuyReward-content-button absolute left-0 w-full px-32 box-border flex flex-row items-center justify-center" :style="{ bottom: 'calc(env(safe-area-inset-bottom) + 100rpx)' }">
                <style2-btn title="全部开启" />
            </view>
            <view v-else class="groupBuyReward-content-button absolute left-0 w-full px-32 box-border flex flex-row items-center justify-between" :style="{ bottom: 'calc(env(safe-area-inset-bottom) + 100rpx)' }">
                <view class="flex flex-row">
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

<style lang="scss" scoped></style>
