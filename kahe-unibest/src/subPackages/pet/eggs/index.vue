<template>
    <view class="eggs">
        <image class="eggs-bg" src="https://jms.85gui7.com/kahe-202510/pet/pet-bg.png" />
        <view class="eggs-top">
            <top :handle="false" :eggs="currentEgg !== null" @did-click-egg="handleClickEgg" />
        </view>
        <view class="eggs-bottom">
            <scroll-view class="eggs-bottom-scroll" :scroll-x="false" :scroll-y="true" :enable-flex="true"
                         scroll-with-animation
                         @tap.stop="currentEgg=null"
            >
                <view class="eggs-bottom-scroll-content">
                    <egg v-for="(item, index) in mineEggsList" :key="'egg'+index" :item="item" :selected="currentEgg?.id === item.id"
                         @tap.stop="currentEgg=item"
                    />
                </view>
            </scroll-view>
        </view>
        <result v-model:show="resultModal" :item="resultPet" />
    </view>
</template>

<script lang="ts" setup>
import Top from '@/pages/pet/components/top/index.vue'
import { usePet } from '@/composables/pet'
import { onMounted } from 'vue'
import Egg from '../components/egg/index.vue'
import Result from '../components/result/index.vue'

const { mineEggsList, getMineEggsList, currentEgg, handleClickEgg, resultModal, resultPet } = usePet()
onMounted(() => {
    getMineEggsList()
})
</script>

<style lang="scss" scoped>
.eggs{
    position: relative;
    width: 100%;
    height: 100vh;

    &-bg{
        width: 100%;
        height: 100%;
    }
    &-top{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }
    &-bottom{
        position: absolute;
        left: 0;
        top: 600rpx;
        width: 100%;
        height: calc(100vh - 600rpx -  env(safe-area-inset-bottom) );
        display: flex;
        flex-direction: column;
        &-scroll{
            position: relative;
            width: 100%;
            height: calc(100% - 100rpx);
            &-content{
                position: relative;
                padding: 8px 16px;
                width: calc(100% - 32px);
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(calc( (100% - 30px) / 4), 1fr)); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
                grid-gap: 10px; // 这是网格间的间隙，根据需要调整
            }
        }
    }
}
</style>
