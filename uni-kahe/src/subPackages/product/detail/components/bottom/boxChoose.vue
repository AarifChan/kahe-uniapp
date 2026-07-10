<template>
    <view class="boxChooseBottom relative flex flex-col">
        <image class="boxChooseBottom-bg w-750 h-146" src="/static/kahe/product/normal-bottom-bg1.png" />
        <view class="boxChooseBottom-other w-full bg-[#393939]" :style="{ height: 'env(safe-area-inset-bottom)' }" />
        <view class="boxChooseBottom-info absolute left-0 top-0 w-full h-146 flex flex-row items-center justify-between">
            <text class="boxChooseBottom-info-title ml-28 text-28 font-normal text-[#FFFFFF]">请选择福袋</text>
            <view class="boxChooseBottom-info-right relative mr-52 w-300 h-80">
                <image class="boxChooseBottom-info-right-bg w-full h-full" src="/static/kahe/product/chase-btn.png" />
                <text class="boxChooseBottom-info-right-title theme-font absolute left-0 top-0 w-full h-full text-center leading-70 text-40 font-normal text-[#FFFFFF]"
                    :style="{ WebkitTextStroke: '1.5px #000000' }"
                >立即购买</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
</style>
