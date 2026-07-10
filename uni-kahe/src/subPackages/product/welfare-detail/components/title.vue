<template>
    <view class="title theme-font absolute left-32 top-10 text-30 font-normal text-black z-1">{{ value }}</view>
    <view class="line absolute left-32 top-35 w-110 h-10 bg-[#5ea2fd] z-0"></view>
</template>
<script setup lang="ts">
defineProps({
    value: {
        type: String,
        default: "",
    },
});
</script>
<style lang="scss" scoped>
</style>
