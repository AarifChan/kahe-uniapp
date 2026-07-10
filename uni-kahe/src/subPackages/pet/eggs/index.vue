<template>
    <view class="eggs relative w-full h-screen">
        <image class="eggs-bg w-full h-full" src="/static/kahe-202510/pet/pet-bg.png" />
        <view class="eggs-top absolute left-0 top-0 w-full">
            <top :handle="false" :eggs="currentEgg !== null" @did-click-egg="handleClickEgg" />
        </view>
        <view class="eggs-bottom absolute left-0 top-600 w-full flex flex-col" style="height: calc(100vh - 600rpx -  env(safe-area-inset-bottom) );">
            <scroll-view class="eggs-bottom-scroll relative w-full" style="height: calc(100% - 100rpx);" :scroll-x="false" :scroll-y="true" :enable-flex="true"
                         scroll-with-animation
                         @tap.stop="currentEgg=null"
            >
                <view class="eggs-bottom-scroll-content relative" style="padding: 8px 16px; width: calc(100% - 32px); display: grid; grid-template-columns: repeat(auto-fill, minmax(calc( (100% - 30px) / 4), 1fr)); grid-gap: 10px;">
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
</style>
