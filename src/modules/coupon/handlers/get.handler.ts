import {
  typeResult,
  typeResultData,
  typeResultError,
} from '../types/get.types';
import couponGet from '../repository/get.repository';

export default async function getCoupon({
  couponId,
}: {
  couponId: string;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    // Perform the get operation using the repository function
    await couponGet({ couponId });
  } catch (err: any) {
    console.error('[COUPON] GET Error: ', err);
    error = {
      code: err.errorCode || 'SOMETHING_WENT_WRONG',
      message: err.message || 'Something went wrong',
      statusCode: err.statusCode || 500,
    };
  }

  return { data, error };
}
