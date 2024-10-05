export type typePayload = {
  userId: string;
  code: string;
  repeatCountConfig: {
    globalTotal: number;
    userTotal: number;
    userDaily: number;
    userWeekly: number;
  };
};

export type typeResultData = {
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
