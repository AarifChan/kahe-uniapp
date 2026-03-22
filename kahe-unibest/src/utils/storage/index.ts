/*异步获取*/
export const GetStorage = async (key: string) => {
  return new Promise((resolve, reject) => {
    uni.getStorage({
      key: key,
      success: function (res) {
        resolve(res);
      },
      fail: function () {
        reject();
      },
    });
  });
};

/*同步获取*/
export const GetStorageSync = (key: string) => {
  try {
    const value = uni.getStorageSync(key);
    if (value) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};

/*异步设置*/
export const SetStorage = (key: string, data: any, _ = false): void => {
  uni.setStorage({
    key: key,
    data: data,
    success: function () {},
    fail: function () {},
  });
};

/*同步设置*/
export const SetStorageSync = (key: string, data: any, _ = false): void => {
  try {
    uni.setStorageSync(key, data);
  } catch (e) {
    console.error(e);
  }
};

/*异步清除指定key*/
export const RemoveStorage = (key: string, _ = false): void => {
  uni.removeStorage({
    key,
    success() {},
    fail(e) {
      console.error(e);
    },
  });
};

/*同步清除指定key*/
export const RemoveStorageSync = (key: string, _ = false): void => {
  try {
    uni.removeStorageSync(key);
  } catch (e) {
    console.error(e);
  }
};

/*异步清除所有缓存*/
export const ClearStorage = (_ = false): void => {
  uni.clearStorage();
};

/*同步清除所有缓存*/
export const ClearStorageSync = (_ = false): void => {
  try {
    uni.clearStorageSync();
  } catch (e) {
    console.error(e);
  }
};
