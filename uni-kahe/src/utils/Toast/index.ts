type Icon = "none" | "success" | "loading" | "error";

type Position = "center" | "top" | "bottom";

export const ShowToast = (
  title: string,
  duration = 1500,
  icon: Icon = "none",
  position: Position = "center"
) => {
  return new Promise((resolve, reject) => {
    uni.showToast({
      title,
      duration,
      icon,
      position,
      success: resolve,
      fail: reject,
    });
  });
};

export const ShowModal = (title: string, content: string) => {
  uni
    .showModal({
      title,
      content,
    })
    .then(() => {
      console.log("showModal");
    });
};

export const HideToast = () => {
  uni.hideToast();
};

export const showLoading = (tips = "加载中...") => {
  uni.showLoading({
    title: tips,
    mask: true,
  });
  // uni.showNavigationBarLoading()
  // return () => {
  //     uni.hideLoading()
  //     // uni.hideNavigationBarLoading()
  //     return null
  // }
};

export const hideLoading = () => {
  uni.hideLoading();
};
