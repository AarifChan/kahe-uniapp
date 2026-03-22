<template>
    <view class="login-item">
        <image class="login-item-bg" src="https://jms.85gui7.com/kahe/login/item-bg.png" />
        <view class="login-item-content">
            <view class="login-item-content-left">
                <text class="login-item-content-left-title theme-font">{{item.title}}</text>
                <text class="login-item-content-left-subTitle theme-font">{{item.subTitle}}</text>
            </view>
            <view class="login-item-content-icon">
                <image class="login-item-content-icon-img" :src="item.icon" />
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'

export interface LoginItemType{
    title: string
    subTitle: string
    width: string
    height: string
    icon: string

}

defineProps({
    item: {
        default: {
        } as LoginItemType,
        type: Object as PropType<LoginItemType>
    }
})

</script>

<style lang="scss" scoped>
.login-item{
    position: relative;
    width: 477rpx;
    height: 134rpx;
    margin-bottom: 8px;
    &-bg{
        width: 100%;
        height: 100%;
    }
    &-content{
        position: absolute;
        left: 40rpx;
        top: 0;
        width: calc(100% - 80rpx);
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        &-left{
            display: flex;
            flex-direction: column;
            &-title{
                font-size: 40rpx;
                color: white;
                font-weight: 400;
            }
            &-subTitle{
                font-size: 30rpx;
                font-weight: 400;
                color: #BCD2FF;
            }
        }
        &-icon{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 100rpx;
            height: 100rpx;
            &-img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
