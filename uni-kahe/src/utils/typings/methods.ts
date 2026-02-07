namespace RequestFunc {
  type RequestData<T> = {
    methodType: "GET" | "POST";
    data?: T;
    url: string;
  };

  export type RequestConfig = {
    baseUrl?: string;
    header?: any;
    loading?: boolean;
    dataType?: string;
    urlAppend?: boolean;
  };

  type RequestReturnData<T> = {
    code: 200 | 500 | number;
    data: T;
    msg: string;
    success: boolean;
  };

  export type request = <R = AnyObject, T = AnyObject>(
    data: RequestData<T>,
    config?: RequestConfig
  ) => Promise<RequestReturnData<R>>;
}
