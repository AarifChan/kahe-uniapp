import { orderInfoRequest } from "@/api";

type PaymentStatus = "pending" | "success" | "failed";

function checkPaymentStatus(orderId: string): Promise<PaymentStatus> {
  return new Promise((resolve) => {
    orderInfoRequest(orderId)
      .then((res) => {
        console.log(
          "checkPaymentStatus:",
          "res.data.payed",
          res.data.payed,
          res
        );
        if (res.code === 200) {
          if (res.data.payed) {
            resolve("success");
          } else {
            resolve("pending");
          }
        } else {
          resolve("pending");
        }
      })
      .catch((err) => {
        resolve("pending");
      });
  });
}

export function pollPaymentStatus(
  orderId: string,
  interval: number,
  maxAttempts: number
): Promise<PaymentStatus> {
  let attempts = 0;
  return new Promise((resolve, reject) => {
    const poll = async () => {
      attempts++;
      console.log(
        `Attempt ${attempts}: Checking payment status for payment ID ${orderId}...`
      );
      try {
        const status = await checkPaymentStatus(orderId);
        console.log(`Attempt ${attempts} checkPaymentStatus: ${status}`);
        if (status === "success" || status === "failed") {
          resolve(status);
        } else if (attempts >= maxAttempts) {
          // 达到最大尝试次数，结束轮询
          console.log("Max attempts reached. Stopping polling.");
          reject(new Error("Max attempts reached"));
        } else {
          // 继续轮询
          setTimeout(poll, interval);
        }
      } catch (error) {
        // 处理查询失败的情况
        console.error("Error checking payment status:", error);
        reject(error);
      }
    };
    poll();
  });
}
