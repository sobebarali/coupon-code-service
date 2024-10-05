import {
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/create.types";
import couponCreate from "../repository/create.repository";

export default async function createCoupon({
  userId,
  code,
  repeatCountConfig,
}: {
  userId: string;
  code: string;
  repeatCountConfig: {
    globalTotal: number;
    userTotal: number;
    userDaily: number;
    userWeekly: number;
  };
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
   let createResult = await couponCreate({ userId, code, repeatCountConfig });

   if(createResult.isCreated){
    data = {
      userId,
      couponId: createResult.coupon._id as string,
      code,
      repeatCountConfig,
      usageCount: createResult.coupon.usageCount,
      userUsage: createResult.coupon.userUsage,
    };
   }

  } catch (err: any) {
    console.error("[COUPON] CREATE Error: ", err);
    error = {
      code: err.errorCode || "SOMETHING_WENT_WRONG",
      message: err.message || "Something went wrong",
      statusCode: err.statusCode || 500,
    };
  }

  return { data, error };
}
