<template>
    <view class="rights">
        <view
            class="rights-list"
            v-for="(item, index) in list"
            :key="index"
            @tap.stop="$emit('tapItem', item)"
        >
            <image
                class="rights-list-img"
                :src="item.image"
            />
            <image class="rights-list-texts" :src="item.text">{{
                item.text
            }}</image>
        </view>
    </view>
</template>
<script setup lang="ts">
import { type PropType } from 'vue'
import type{ UIIconItem } from '@/model'

defineProps({
    list: {
        type: Array as PropType<UIIconItem[]>,
        default: () => []
    }
})
</script>
<style lang="scss" scoped>
.rights {
    position: absolute;
    right: 12rpx;
    top: 0;
    &-list {
        position: relative;
        @include flex-xy-center(column);
        margin-bottom: 20rpx;
        &-img {
            width: 80rpx;
            height: 82rpx;
        }
        &-texts {
            margin-top: -2rpx;
            width: 53rpx;
            height: 26rpx;
        }
    }
}
</style>
