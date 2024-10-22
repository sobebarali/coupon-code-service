import {
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/update.types";
import couponUpdate from "../repository/update.repository";

export default async function updateCoupon({
  couponId,
  code,
  repeatCountConfig,
}: {
  couponId: string;
  code: string | undefined;
  repeatCountConfig: {
    globalTotal: number | undefined;
    userTotal: number | undefined;
    userDaily: number | undefined;
    userWeekly: number | undefined;
  } | undefined;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    // Perform the update operation using the repository function
    await couponUpdate({ couponId, code, repeatCountConfig });
  } catch (err: any) {
    console.error("[COUPON] UPDATE Error: ", err);
    error = {
      code: err.errorCode || "SOMETHING_WENT_WRONG",
      message: err.message || "Something went wrong",
      statusCode: err.statusCode || 500,
    };
  }

  return { data, error };
}
