<template>
    <view class="collect-tab relative w-full py-16 px-32 box-border">
        <view class="collect-tab-content w-full h-48 bg-[rgba(32,54,148,0.3)] rounded-24 overflow-hidden flex flex-row justify-evenly">
            <view
                v-for="(item, index) in levelList"
                :key="'key'+index"
                class="collect-tab-content-item text-center leading-48 w-full rounded-24 h-full font-normal text-30 text-[#8DBFD8]"
                :class="current === index ? 'bg-gradient-[linear-gradient(90deg,#17FAFF,rgba(183,251,255,0.74))] text-[#245070]' : ''"
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
</style>
