<template>
    <view class="relative w-full h-600 mb-16">
        <image class="w-full h-600" src="/static/kahe-202510/pet/pet-top.png" />
        <view class="absolute right-16 top-16 flex flex-col items-center" v-if="handle">
            <icon-button v-for="(item, index) in itemList" :icon="'/static/kahe-202510/pet/item'+(index+1)+'.png'" :title="item.title" :key="'iconBtn'+index"
                         @tap.stop="emits('didClickItem', index)"
            />
        </view>
        <view class="absolute top-112 left-0 w-full flex flex-col items-center justify-center" v-if="eggs" @tap.stop="emits('didClickEgg')">
            <text class="font-normal text-32 text-[#F9FCFF] text-center theme-font text-stroke">点击敲碎蛋壳，孵化宠物</text>
            <image class="mt-[16px] w-216 h-347 z-1" src="/static/kahe-202510/pet/eggs.png" />
            <image class="ml-7 relative -mt-52 w-230 h-54" src="/static/kahe-202510/pet/shadow.png" />
        </view>
    </view>
</template>

<script lang="ts" setup>
import IconButton from '../iconButton/index.vue'
import { ref } from 'vue'
defineProps({
    handle: {
        default: true,
        type: Boolean
    },
    eggs: {
        default: false,
        type: Boolean
    }
})
const itemList = ref([
    {
        title: '图鉴'
    },
    {
        title: '探险'
    },
    {
        title: '孵化'
    },
    // {
    //     title: '喂养'
    // },
    {
        title: '融合'
    }
])
const emits = defineEmits(['didClickItem', 'didClickEgg'])
</script>

<style lang="scss" scoped>
</style>
