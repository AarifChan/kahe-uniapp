<template>
    <view class="collect-tab">
        <view class="collect-tab-content">
            <view
                v-for="(item, index) in levelList"
                :key="'key'+index"
                class="collect-tab-content-item"
                :class="current === index ? 'active-tab' : ''"
                @tap.stop="handleClickItem(index)"
            >
                {{item.title}}
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const emits = defineEmits(['didChange'])
const current = ref(0)
const levelList = ref([{
    title: '全部', value: null
},
{
    title: 'SAR', value: 118
},
{
    title: 'UR', value: 117
},
{
    title: 'SSR', value: 116
},
{
    title: 'SR', value: 115
},
{
    title: 'R', value: 114
}
])
const handleClickItem = (index: number) => {
    current.value = index
    emits('didChange', levelList.value[index])
}

</script>

<style lang="scss" scoped>
.collect-tab{
    position: relative;
    width: 100%;
    padding: 16rpx 32rpx;
    box-sizing: border-box;
    &-content{
        width: 100%;
        height: 48rpx;
        background: rgba($color: #203694, $alpha: 0.3);
        border-radius: 24rpx;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        &-item{
            text-align: center;
            line-height: 48rpx;
            width: 100%;
            border-radius: 24rpx;
            height: 100%;
            font-weight: 400;
            font-size: 30rpx;
            color: #8DBFD8;
        }
    }

}
.active-tab{
    background: linear-gradient(90deg, #17FAFF, rgba(183,251,255,0.74));
    color: #245070;
}
</style>
