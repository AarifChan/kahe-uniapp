/* 异步获取 */
export async function GetStorage(key: string) {
  return new Promise((resolve, reject) => {
    uni.getStorage({
      key,
      success(res) {
        resolve(res)
      },
      fail() {
        reject()
      },
    })
  })
}

/* 同步获取 */
export function GetStorageSync(key: string) {
  try {
    const value = uni.getStorageSync(key)
    if (value) {
      return value
    }
  }
  catch (e) {
    console.error(e)
  }
}

/* 异步设置 */
export function SetStorage(key: string, data: any, _ = false): void {
  uni.setStorage({
    key,
    data,
    success() {},
    fail() {},
  })
}

/* 同步设置 */
export function SetStorageSync(key: string, data: any, _ = false): void {
  try {
    uni.setStorageSync(key, data)
  }
  catch (e) {
    console.error(e)
  }
}

/* 异步清除指定key */
export function RemoveStorage(key: string, _ = false): void {
  uni.removeStorage({
    key,
    success() {},
    fail(e) {
      console.error(e)
    },
  })
}

/* 同步清除指定key */
export function RemoveStorageSync(key: string, _ = false): void {
  try {
    uni.removeStorageSync(key)
  }
  catch (e) {
    console.error(e)
  }
}

/* 异步清除所有缓存 */
export function ClearStorage(_ = false): void {
  uni.clearStorage()
}

/* 同步清除所有缓存 */
export function ClearStorageSync(_ = false): void {
  try {
    uni.clearStorageSync()
  }
  catch (e) {
    console.error(e)
  }
}
