<template>
    <view class="boxSelectRow relative w-full mb-20">
        <image class="boxSelectRow-bg w-full" mode="widthFix" src="/static/kahe/product/box-select-row-bg.png" />
        <view class="boxSelectRow-content absolute left-0 top-0 py-16 px-21 flex flex-row justify-start"
            :style="{ width: 'calc(100% - 42rpx)', height: 'calc(100% - 42rpx)' }"
        >
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
</style>
