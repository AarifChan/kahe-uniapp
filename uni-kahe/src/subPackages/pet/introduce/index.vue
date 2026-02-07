<template>
    <view class="petSkill">
        <image class="petSkill-bg" src="https://jms.85gui7.com/kahe-202510/pet/skill-bg.png" />
        <view class="petSkill-content">
            <view class="petSkill-content-top">
                <image class="petSkill-content-top-bg" src="https://jms.85gui7.com/kahe-202510/pet/intro-top.png" />
                <text class="petSkill-content-top-title theme-font">已收集</text>
                <text class="petSkill-content-top-subTitle">0/{{petList.length}}</text>
            </view>
            <scroll-view class="petSkill-content-list" :scroll-y="true" :scroll-x="false">
                <view class="petSkill-content-list-content">
                    <pet-intro-card v-for="(item, index) in petList" :key="'pet-intro-card'+index" :item="item" />

                </view>
            </scroll-view>
            <view class="petSkill-content-bottom" @tap.stop="handleClickBack">
                <image class="petSkill-content-bottom-bg" src="https://jms.85gui7.com/kahe-202510/pet/bottom-bg.png" />
                <view class="petSkill-content-bottom-btn">
                    <view class="petSkill-content-bottom-btn-info">
                        <image class="petSkill-content-bottom-btn-info-bg" src="https://jms.85gui7.com/kahe-202510/pet/bottom-btn-bg.png" />
                        <text class="petSkill-content-bottom-btn-info-title theme-font">返回宠物小屋</text>
                    </view>

                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>

import { computed, onMounted } from 'vue'
import PetModule from '@/store/modules/pet'
import PetIntroCard from '../components/introduceCard/index.vue'
const petList = computed(() => {
    return PetModule.petList
})

onMounted(() => {
    console.log('petList:', petList.value)
})

const handleClickBack = () => {
    uni.navigateBack()
}

</script>

<style lang="scss" scoped>
.petSkill{
    position: relative;
    width: 100%;
    height: 100vh;
    &-bg{
        width: 100%;
        height: 100%;
    }
    &-content{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        &-top{
            padding-top: 16px;
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            &-bg{
                width: 696rpx;
                height: 206rpx;
            }
            &-title{
                position: absolute;
                top: 60rpx;
                left: 82rpx;
                font-weight: 400;
                font-size: 48rpx;
                color: #000000;
            }
            &-subTitle{
                position: absolute;
                bottom: 50rpx;
                left: 82rpx;
                font-weight: 400;
                font-size: 40rpx;
                color: #000000;
            }
        }
        &-list{
            padding-top: 16px;
            position: relative;
            width: 100%;
            height: calc(100vh - 184rpx - 206rpx - 60rpx);
            display: flex;
            flex-direction: column;
            &-content{
                padding: 0 30rpx;
                width: calc(100% - 60rpx);
            }
        }
        &-bottom{
            position: relative;
            width: 100%;
            &-bg{
                width: 750rpx;
                height: 184rpx;
            }
            &-btn{
                position: absolute;
                top: 50rpx;
                left: 0;
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                &-info{
                    position: relative;
                    width: 634rpx;
                    height: 75rpx;
                    &-bg{
                        width: 100%;
                        height: 100%;
                    }
                    &-title{
                        position: absolute;
                        left: 0;
                        top: 8rpx;
                        width: 100%;
                        font-weight: 400;
                        font-size: 50rpx;
                        color: #000000;
                        text-align: center;
                    }
                }

            }
        }
    }
}
</style>
