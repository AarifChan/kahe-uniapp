<template>
    <view class="pager">
        <image class="pager-side" src="https://jms.85gui7.com/kahe-202510/invite/invite-page-left.png" />
        <view class="pager-list">
            <view class="pager-list-item">
                <image class="pager-list-item-bg" src="https://jms.85gui7.com/kahe-202510/invite/invite-page-current.png" />
                <view class="pager-list-item-text">1</view>
            </view>
        </view>
        <image class="pager-side" src="https://jms.85gui7.com/kahe-202510/invite/invite-page-right.png" />
    </view>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

.pager{
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 60rpx;
    &-side{
        width: 46rpx;
        height: 46rpx;
    }

    &-list{
        display: flex;
        flex-direction: row;
        padding: 0 16rpx;
        &-item{
            position: relative;
            width: 46rpx;
            height: 46rpx;
            margin-right: 16rpx;
            &-bg{
                width: 100%;
                height: 100%;
            }
            &-text{
                position: absolute;
                left: 0;
                top:0;
                width: 100%;
                line-height: 46rpx;
                font-weight: normal;
                font-size: 34rpx;
                text-align: center;
                color: #FFFFFF;
            }
        }
        &-item:last-child{
            margin-right: 0;
        }
    }
}
</style>
