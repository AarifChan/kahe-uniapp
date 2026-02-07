<template>
    <view class="introduceCard">
        <view class="introduceCard-info">
            <image
                class="introduceCard-info-bg"
                src="https://jms.85gui7.com/kahe-202510/pet/info-bg.png"
            />
            <text class="introduceCard-info-title theme-font text-stroke">{{ item.skill }}</text>
            <text class="introduceCard-info-sub">{{ item.mark }}</text>
        </view>
        <view class="introduceCard-pet">
            <pet-card  :item="item" />
        </view>
    </view>
</template>

<script lang="ts" setup>
import PetCard from '@/pages/pet/components/pet/index.vue'
import { PetModel } from '@/composables/pet/model'
import { type PropType } from 'vue'

defineProps({
    item: {
        default: {
        } as PetModel,
        type: Object as PropType<PetModel>
    }
})

</script>

<style lang="scss" scoped>
.introduceCard{
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    height: 176rpx;
    margin-bottom: 30rpx;
    &-pet{
        position: absolute;
        top: 0;
        left: 0;
        width: 152rpx;
        height: 176rpx;

    }
    &-info{
        margin-top: 20rpx;
        position: relative;
        margin-left: -40rpx;
        width: 588rpx;
        height: 148rpx;
        &-bg {
            width: 100%;
            height: 100%;
        }
        &-title {
            position: absolute;
            left: 66rpx;
            top: -24rpx;
            font-size: 32rpx;
            font-weight: 400;
            color: #ffffff;
        }
        &-sub {
            position: absolute;
            left: 60rpx;
            top: 50rpx;
            width: calc(100% - 100rpx);
            font-size: 24rpx;
            font-weight: 400;
            color: #000000;
            line-height: 33rpx;
        }
    }

}
</style>
