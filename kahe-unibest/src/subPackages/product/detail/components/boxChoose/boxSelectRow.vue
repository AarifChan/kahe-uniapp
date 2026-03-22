<template>
    <view class="boxSelectRow">
        <image class="boxSelectRow-bg" mode="widthFix" src="https://jms.85gui7.com/kahe/product/box-select-row-bg.png" />
        <view class="boxSelectRow-content">
            <box-item
                v-for="(item,zIndex) in  boxList"
                :index=" index * 8 + zIndex + 1 "
                :selected="checkIsSelected(index * 8 + zIndex + 1)"
                :key="zIndex"
                @tap.stop="didSelectNum(index * 8 + zIndex + 1)"
            />
        </view>
    </view>
</template>

<script lang="ts" setup>

import BoxItem from './boxItem.vue'
import { ref } from 'vue'

const boxList = ref([{
}, {
}, {
}, {
}, {
}, {
}, {
}, {
}])

const props = defineProps({
    index: {
        default: 0,
        type: Number
    },
    items: {
        default: [],
        type: Array<number>
    },
    select: {
        default: [],
        type: Array<number>
    }
})
const selectNum = ref([] as number[])
const didSelectNum = (index: number) => {
    const tIndex = selectNum.value.findIndex(n => n === index)
    if (tIndex === -1) {
        selectNum.value.push(index)
    } else {
        selectNum.value = selectNum.value.filter(n => n !== index)
    }
}

const checkIsSelected = (index: number) => {
    return selectNum.value.findIndex(n => n === index) !== -1
}

</script>

<style lang="scss" scoped>
.boxSelectRow{
    position: relative;
    width: 100%;
    margin-bottom: 20rpx;
    &-bg{
        width: 100%;
    }
    &-content{
        position: absolute;
        left: 0;
        top: 0;
        padding: 16rpx 21rpx;
        width: calc(100% - 42rpx);
        height: calc(100% - 42rpx);
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
}
</style>
