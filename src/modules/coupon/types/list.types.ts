export type typePayload = {
  userId: string | undefined;
  page: number;
  perPage: number;
};

export type typeResultData = {
  coupon: {
    userId: string;
    couponId: string;
    code: string;
    repeatCountConfig: {
      globalTotal: number;
      userTotal: number;
      userDaily: number;
      userWeekly: number;
    };
    usageCount: number;
    userUsage: any;
  }[];
  page: number;
  perPage: number;
};

export type typeResultError = {
  code: string;
  message: string;
  statusCode: number;
};

export type typeResult = {
  data: null | typeResultData;
  error: null | typeResultError;
};
