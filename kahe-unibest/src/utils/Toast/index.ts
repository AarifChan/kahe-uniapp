type Icon = 'none' | 'success' | 'loading' | 'error'

type Position = 'center' | 'top' | 'bottom'

export function ShowToast(title: string, duration = 1500, icon: Icon = 'none', position: Position = 'center') {
  return new Promise((resolve, reject) => {
    uni.showToast({
      title,
      duration,
      icon,
      position,
      success: resolve,
      fail: reject,
    })
  })
}

export function ShowModal(title: string, content: string) {
  uni
    .showModal({
      title,
      content,
    })
    .then(() => {
      console.log('showModal')
    })
}

export function HideToast() {
  uni.hideToast()
}

export function showLoading(tips = '加载中...') {
  uni.showLoading({
    title: tips,
    mask: true,
  })
  // uni.showNavigationBarLoading()
  // return () => {
  //     uni.hideLoading()
  //     // uni.hideNavigationBarLoading()
  //     return null
  // }
}

export function hideLoading() {
  uni.hideLoading()
}
