<template>
    <view class="boxItem mr-22 flex flex-col items-center">
        <image class="boxItem-img w-61 h-61" src="/static/kahe/product/box-selected.png" v-if="selected" />
        <image class="boxItem-img w-61 h-61" src="/static/kahe/product/box-normal.png" v-else />
        <text class="boxItem-title mt-20 w-26 h-16 bg-[#262626] opacity-60 rounded-2 text-12 leading-16 text-center font-normal text-[#FFFFFF]">{{index}}</text>
    </view>
</template>

<script lang="ts" setup>

defineProps({
    selected: {
        default: false,
        type: Boolean
    },
    index: {
        default: 0,
        type: Number
    }
})

const emits = defineEmits(['update:selected'])

</script>

<style lang="scss" scoped>
</style>
