<template>
    <tn-popup v-model="vShow" open-direction="center" bg-color="transparent" @close="emits('update:show', false)">

        <view class="bind">
            <view class="bind-info">
                <image class="bind-info-bg" src="https://jms.85gui7.com/kahe-202510/invite/invite-1-bg.png" />
                <image class="bind-info-item" src="https://jms.85gui7.com/kahe-202510/invite/invite-item1.png" />
                <view class="bind-info-title theme-font">我的盟主</view>
                <view class="bind-info-subTitle">和盟主一起畅玩，不再孤单！</view>
                <view class="bind-info-content theme-font">
                    <view class="bind-info-content-title">是否确定成为{{ nickname }}的盟友，一起共享收益？ 确定后，{{ nickname }}将成为您的盟主</view>
                    <view class="bind-info-content-bottom">
                        <view class="bind-info-content-bottom-btn" @tap.stop="emits('didTapConfirm')">
                            <image class="bind-info-content-bottom-btn-bg"  src="https://jms.85gui7.com/kahe-202510/invite/invite-tag.png"  />
                            <view class="bind-info-content-bottom-btn-text theme-font">确 认</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </tn-popup>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
    show: Boolean,
    nickname: {
        default: '',
        type: String
    }
})
const vShow = ref(props.show)
watch(() => props.show, value => {
    vShow.value = value
})
const emits = defineEmits(['update:show', 'didTapConfirm'])
</script>
<style lang="scss" scoped>
.bind {
    position: relative;
    &-info{
        position: relative;
        margin-left: 12rpx;
        width: 727rpx;
        height: 393rpx;
        &-bg{
            width: 100%;
            height: 100%;
            background-color: transparent;
        }
        &-item{
            position: absolute;
            top: 30rpx;
            left: 44rpx;
            width: 58rpx;
            height: 58rpx;
        }
        &-title{
            position: absolute;
            top: 34rpx;
            left: 128rpx;
            font-weight: 400;
            font-size: 36rpx;
            color: #FFFFFF;
        }
        &-subTitle{
            position: absolute;
            top: 56rpx;
            left: 348rpx;
            font-weight: normal;
            font-size: 24rpx;
            color: #FEFFFD;
        }

        &-invite{
            position: absolute;
            left: 56rpx;
            bottom: 60rpx;
            width: calc(100% - 112rpx);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            &-input{
                margin-top: 8rpx;
                width: 313rpx;
                height: 80rpx;
                background: #FFFFFF;
                box-shadow: 1rpx 4rpx 0 0 #7342A4;
                border-radius: 40rpx;
                padding: 0 24rpx;
                &-item{
                    height: 100%;
                    width: 100%;
                }
            }
            &-btn{

                position: relative;
                width: 242rpx;
                height: 89rpx;
                &-bg{
                    width: 100%;
                    height: 100%;
                }
                &-text{
                    position: absolute;
                    left: 0;
                    top: 32rpx;
                    text-align: center;
                    width: 100%;
                    font-weight: 400;
                    font-size: 30rpx;
                    color: #FEFFFD;
                    text-shadow: 1rpx 3rpx 0 #30B7C7;
                }
            }
        }

        &-content{
            position: absolute;
            left: 48rpx;
            top: 152rpx;
            width: calc(100% - 96rpx);

            display: flex;
            flex-direction: column;
            align-items: center;
            &-title{
                width: 450rpx;
                font-size: 32rpx;
                text-align: center;
                color: white;
            }

            &-bottom{
                margin-top: 24rpx;
                display: flex;
                flex-direction: row;
                align-items: center;
                &-btn{

                    position: relative;
                    width: 242rpx;
                    height: 89rpx;
                    &-bg{
                        width: 100%;
                        height: 100%;
                    }
                    &-text{
                        position: absolute;
                        left: 0;
                        top: 32rpx;
                        text-align: center;
                        width: 100%;
                        font-weight: 400;
                        font-size: 30rpx;
                        color: #FEFFFD;
                        text-shadow: 1rpx 3rpx 0 #30B7C7;
                    }
                }
            }
        }

    }
}
.bind::after{
    background: none;

}
</style>
