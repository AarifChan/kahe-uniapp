<template>
    <view class="password">
        <image class="password-bg" src="https://jms.85gui7.com/kahe-202510/images/mine-bg.png"  />
        <view class="password-content">
            <view class="password-content-form">
                <TnForm ref="formRef" :model="formData" :rules="formRules">
                    <TnFormItem label="" prop="phone">
                        <view class="password-content-form-item">
                            <TnInput
                                v-model="formData.phone"
                                type="number"
                                :disabled="isPhoneReadonly"
                                :maxlength="11"
                                placeholder="请输入手机号"
                                :border="false"
                                height="80"
                            />
                        </view>
                    </TnFormItem>
                    <TnFormItem label="" prop="code">
                        <view class="password-content-form-item">
                            <TnInput
                                v-model="formData.code"
                                type="text"
                                clearable
                                :maxlength="6"
                                placeholder="请输入验证码"
                                :border="false"
                                height="80"
                            >
                                <template #suffix>
                                    <view class="password-content-form-item-btn" @tap.stop="getSmsCodeAction" v-if="maxTime===0">获取验证码</view>
                                    <TnCountDown
                                        v-else
                                        :time="120"
                                        separator-mode="cn"
                                        text-color="#B6B6B6"
                                        :show-hour="false"
                                    >
                                    </tncountdown>
                                </template>
                            </TnInput>
                        </view>
                    </TnFormItem>
                    <TnFormItem label="" prop="password">
                        <view class="password-content-form-item">
                            <TnInput
                                v-model="formData.password"
                                clearable
                                :type="selected ? 'text' : 'password' "
                                placeholder="请输入新密码"
                                :border="false"
                                height="80"
                            />
                        </view>
                    </TnFormItem>
                    <TnFormItem label="" prop="again">
                        <view class="password-content-form-item">
                            <TnInput
                                v-model="formData.again"
                                clearable
                                :type="selected ? 'text' : 'password' "
                                placeholder="请再次输入新密码"
                                :border="false"
                                height="80"
                            />
                        </view>
                    </TnFormItem>
                </TnForm>

            </view>

            <view class="password-content-login" @tap.stop="handleConfirm">
                <image class="password-content-login-img" src="https://jms.85gui7.com/kahe-202510/login/login-btn-bg.png" />
                <text class="password-content-login-text theme-font">确定修改</text>
            </view>
        </view>
    </view>
</template>
<script setup lang="ts">

import TnFormItem from '@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnForm from '@tuniao/tnui-vue3-uniapp/components/form/src/form.vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'
import { computed, onMounted, ref, watch } from 'vue'
import type { FormRules, TnFormInstance } from '@tuniao/tnui-vue3-uniapp'
import { getSmsCodeRequest, resetPassword } from '@/api'
import { ShowToast } from '@/utils'
import { UserModule } from '@/store/modules/user'
import { onLoad } from '@dcloudio/uni-app'

const formRef = ref<TnFormInstance>()
const selected = ref(false)
const fromLogin = ref(false)

onLoad((options: any) => {
    fromLogin.value = options?.from === 'login'
})

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入新密码'))
    } else {
        if (formData.value.password !== '') {
            formRef.value?.validateField('again')
        }
        callback()
    }
}
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入新密码'))
    } else if (value !== formData.value.password) {
        callback(new Error('两次输入密码不一致!'))
    } else {
        callback()
    }
}
// 规则
const formRules = computed(() => {
    return {
        phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 4, max: 6, message: '请输入正确的验证码', trigger: 'blur' }
        ],
        password: [
            {
                required: true, message: '请输入密码', trigger: 'blur'
            },
            {
                min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'
            },
            {
                validator: validatePass, trigger: 'blur'
            }
        ],
        again: [
            {
                required: true, message: '请确认密码', trigger: 'blur'
            },
            {
                min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'
            },
            {
                validator: validatePass2, trigger: 'blur', required: true
            }
        ]

    }as FormRules
})

const isPhoneReadonly = computed(() => {
    // 从登录页进入时允许输入手机号；否则（设置页）默认不允许改手机号
    return !fromLogin.value
})

const formData = ref({
    phone: UserModule.userInfo.phone,
    password: '',
    again: '',
    code: ''
})
watch(() => UserModule.userInfo, value => {
    formData.value.phone = value.phone
})
onMounted(
    () => {
        UserModule.getUserInfo()
    })
const maxTime = ref(0)

const getSmsCodeAction = async () => {
    const phone = formData.value.phone
    if (phone) {
        const resp = await getSmsCodeRequest({
            phone,
            type: 'reset_pwd'
        })
        if (resp.code === 200) {
            maxTime.value = 120
            setTimeout(() => {
                maxTime.value = 0
            }, 60 * 2 * 1000)
        } else {
            ShowToast(resp.msg ?? '服务器异常')
        }
    } else {
        ShowToast('请填写正确的手机号')
    }
}

const handleConfirm = () => {
    formRef.value?.validate(async (valid) => {
        if (valid) {
            console.log('validate:', formData.value)
            const params = {
                captcha: formData.value.code,
                password: formData.value.password,
                phone: formData.value.phone
            }
            const { msg, code, data } = await resetPassword(params)
            if (code === 200) {
                await ShowToast('修改成功')
                setTimeout(() => {
                    uni.redirectTo({
                        url: '/pages/login/index'
                    })
                }, 1000)
            } else {
                ShowToast(msg)
            }
        }
    })
}

</script>

<style scoped lang="scss">
.password{
    position: relative;
    width: 100%;

    &-bg{
        width: 100%;
        height: 100vh;
    }
    &-content{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        &-form {
            width: 100%;
            padding: 30px;

            &-forget {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
                height: 13px;
                &-title {
                    font-size: 13px;
                    font-weight: 400;
                    color: #b6b6b6;
                    width: 52px;
                    height: 13px;
                    margin-right: 5px;
                }
            }
            &-item {
                width: 100%;
                background: #e7e7e7;
                border-radius: 4rpx;
                &-input {
                    margin-left: 15px;
                    line-height: 34px;
                    height: 34px;
                    font-size: 26rpx
                }
                &-img {
                    width: 20px;
                    height: 12px;
                    margin-right: 10px;
                }
                &-btn {
                    text-align: right;
                    width: 80px;
                    font-size: 13px;
                    font-weight: 400;
                    color: #3a3939;
                }
            }

            &-wechat {
                position: absolute;
                bottom: 200rpx;
                left: 0;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                width: 100%;
                &-btn {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    width: 240rpx;
                    height: 66rpx;
                    border-radius: 2px;
                    &-img {
                        width: 50rpx;
                        height: 50rpx;
                    }
                    &-title {
                        margin-left: 4px;
                        height: 20px;
                        font-size: 17px;
                        font-weight: 400;
                        color: #000000;
                        line-height: 20px;
                        //line-height: 34px;
                    }
                }
            }

            &-proto {
                margin-top: 24rpx;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                &-select {
                    position: relative;
                    width: 30rpx;
                    height: 30rpx;

                    &-img {
                        position: absolute;
                        right: 0;
                        top: 2rpx;
                        width: 100%;
                        height: 100%;
                    }

                    &-bg {
                        width: 100%;
                        height: 100%;
                    }
                }
                &-title {
                    margin-left: 8rpx;
                    font-size: 22rpx;
                    font-weight: 400;
                    color: #3a3939;
                }
                &-subtitle {
                    font-size: 22rpx;
                    font-weight: 400;
                    color: #5285ff;
                }
            }
            &-login {
                position: relative;
                margin-top: 24rpx;
                display: flex;
                justify-content: center;
                align-content: center;
                &-bg {
                    width: 100%;
                    height: 68rpx;
                }
                &-title {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    line-height: 72rpx;
                    text-align: center;
                    font-size: 50rpx;
                    font-weight: 400;
                    color: #ffffff;
                    text-shadow: 2rpx -2rpx 4rpx #8d2bb5, -2rpx 2rpx 4rpx #2e20e6;
                }
            }
        }

        &-login{
            margin-top: 9rpx;
            position: relative;
            width: 634rpx;
            height: 70rpx;
            &-img{
                width: 100%;
                height: 100%;
            }
            &-text{
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                position: absolute;
                line-height: 70rpx;
                text-align: center;
                font-weight: 400;
                font-size: 40rpx;
                color: #FFFFFF;
                text-shadow: -1px -1px 0 #2356A9, 1px -1px 0 #2356A9, -1px 1px 0 #2356A9, 1px 1px 0 #2356A9;
            }
        }
    }
}
</style>
