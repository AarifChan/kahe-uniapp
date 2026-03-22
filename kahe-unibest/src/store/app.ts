import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const currentTabIndex = ref(0)
  const scrollToBottom = ref(false)
  const productTabIndex = ref(0)
  const boxTabIndex = ref(0)
  const loginModalStatus = ref(false)
  const userModalShow = ref(false)
  const statusBarHeight = ref(44)
  const navBarHeight = ref(44)
  const payType = ref<number>(Number(uni.getStorageSync('payType') || 0))
  const featureSmashRefundEnabled = ref<boolean>(
    uni.getStorageSync('featureSmashRefundEnabled') ?? true,
  )

  const getSystemInfo = () => {
    // #ifdef MP-WEIXIN
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    const systemInfo = uni.getSystemInfoSync()
    const statusBar = systemInfo.statusBarHeight ?? 44
    const navH = (menuButtonInfo.top - statusBar) * 2 + menuButtonInfo.height
    statusBarHeight.value = statusBar
    navBarHeight.value = navH
    // #endif
  }

  const showLoginModal = () => { loginModalStatus.value = true }
  const closeLoginModal = () => { loginModalStatus.value = false }
  const showUserModal = () => {
    userModalShow.value = false
    setTimeout(() => { userModalShow.value = true }, 100)
  }
  const setPayType = (type: number) => {
    payType.value = type
    uni.setStorageSync('payType', type)
  }
  const changeCurrentTabIndex = (index: number) => { currentTabIndex.value = index }
  const changeProductTabIndex = (index: number) => { productTabIndex.value = index }
  const changeBoxTabIndex = (index: number) => { boxTabIndex.value = index }
  const setFeatureSmashRefundEnabled = (enabled: boolean) => {
    featureSmashRefundEnabled.value = enabled
    uni.setStorageSync('featureSmashRefundEnabled', enabled)
  }

  return {
    currentTabIndex,
    scrollToBottom,
    productTabIndex,
    boxTabIndex,
    loginModalStatus,
    userModalShow,
    statusBarHeight,
    navBarHeight,
    payType,
    featureSmashRefundEnabled,
    getSystemInfo,
    showLoginModal,
    closeLoginModal,
    showUserModal,
    setPayType,
    changeCurrentTabIndex,
    changeProductTabIndex,
    changeBoxTabIndex,
    setFeatureSmashRefundEnabled,
  }
}, { persist: true })
