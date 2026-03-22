import { ref, watch } from 'vue'

import { useAppStore } from '@/store/app'

import { useUserStore } from '@/store/user'
import { ShowToast } from '@/utils'
import { eventBus } from '@/utils/event'

export function useLogin() {
  const userStore = useUserStore()
  const appStore = useAppStore()
  const loginShow = ref(false)
  const showVip = ref(false)
  const infoShow = ref(false)
  const handleLogin = async (params: any) => {
    // #ifdef MP-WEIXIN
    const resp = await userStore.handlePhoneLogin(params)

    if (resp) {
      await ShowToast(`${resp}`, 2000)
      loginShow.value = false
      setTimeout(() => {
        loginShow.value = true
      }, 300)
    }
    else {
      await ShowToast('登陆成功', 2000)
      loginShow.value = false
      eventBus.emit('didLogin', true)
    }
    setTimeout(() => {
      loginShow.value = false
    }, 1000)
    // #endif

    // #ifndef MP-WEIXIN
    uni.navigateTo({
      url: '/pages/login/index',
    })
    loginShow.value = false
    // #endif
  }

  eventBus.on('needLogin', async (_: any) => {
    console.log('needLogin->:', userStore.loginStatus)

    if (!userStore.loginStatus && !loginShow.value) {
      loginShow.value = true
    }
  })

  watch(
    () => userStore.receivedVipShow,
    (value) => {
      showVip.value = value
    },
  )

  watch(
    () => appStore.userModalShow,
    (val) => {
      if (val) {
        infoShow.value = true
      }
    },
  )

  watch(
    () => userStore.loginStatus,
    (val) => {
      if (val) {
        // loginShow.value = false
        if (
          !userStore.userInfo.nickname
          || userStore.userInfo.nickname === '微信用户'
          || !userStore.userInfo.avatar
        ) {
          infoShow.value = true
        }
      }
    },
  )
  /* 登录弹窗的时候重新获取code */
  watch(
    () => loginShow.value,
    (value) => {
      console.log('loginShow:', value)
      if (value) {
        userStore.getCode()
      }
    },
  )
  return {
    loginShow,
    handleLogin,
    showVip,
    infoShow,
  }
}
