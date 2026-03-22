import { onUnmounted, ref } from "vue";
import dayjs from "dayjs";

export function useTimeCount() {
  let interval = 0;
  const remainingTime = ref("");
  const endTime = ref(0);
  const isTimeout = ref(false);
  const day = ref("0");
  const hour = ref("0");
  const minute = ref("0");
  const second = ref("0");

  const updateRemainingTim = () => {
    const now: Date = new Date();
    const timeDifference = Number(endTime.value) - Number(now.getTime());
    if (timeDifference <= 0) {
      isTimeout.value = true;
      clearInterval(interval);
      remainingTime.value = "已结束";
      day.value = "00";
      minute.value = "00";
      hour.value = "00";
      second.value = "00";
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      remainingTime.value = `${
        hours < 10 ? "0" + hours : hours
      }:${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
      day.value = `${days}`;
      hour.value = `${hours < 10 ? "0" + hours : hours}`;
      minute.value = `${minutes < 10 ? "0" + minutes : minutes}`;
      second.value = `${seconds < 10 ? "0" + seconds : seconds}`;
    }
  };

  const startTimeRemain = (time: string) => {
    endTime.value = dayjs(time).valueOf();
    const now: Date = new Date();
    const timeDifference = Number(endTime.value) - Number(now.valueOf());
    // console.log('timeDifference:', Number(endTime.value), Number(now.valueOf()))
    if (timeDifference > 0) {
      updateRemainingTim();
      interval = setInterval(updateRemainingTim, 1000);
    } else {
      isTimeout.value = true;
      remainingTime.value = "已结束";
      if (interval) {
        clearInterval(interval);
      }
    }
  };

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval);
    }
  });
  return {
    day,
    hour,
    minute,
    second,
    remainingTime,
    isTimeout,
    startTimeRemain,
  };
}
