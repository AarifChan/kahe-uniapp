<template>
    <view class="tall w-full px-10 box-border">
        <view class="inGroup relative h-43 flex flex-row items-center justify-between">
            <image src="/static/kahe-202510/ka-he/product/gogao.png" class="inGroup-bg absolute inset-0 w-full h-full" />
            <view class="inGroup-left text-ellipsis relative text-14 font-normal text-[#763A1C] pl-60" :style="{ fontFamily: 'SimHei' }">{{
                stripHTMLTags(content)
                }}</view>
            <!-- <view class="inGroup-right theme-font">赏品说明</view> -->
        </view>
    </view>

</template>
<script setup lang="ts">
const stripHTMLTags = (html: string) => {
    return html?.replace(/<[^>]*>/g, "") ?? "";
};
defineProps({
    content: {
        default: "",
        type: String,
    },
});
</script>
<style scoped lang="scss">
</style>
