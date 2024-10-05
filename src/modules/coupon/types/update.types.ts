export type typePayload = {
  couponId: string;
  code: string;
  repeatCountConfig: {
    globalTotal: number;
    userTotal: number;
    userDaily: number;
    userWeekly: number;
  };
};

export type typeResultData = {
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
