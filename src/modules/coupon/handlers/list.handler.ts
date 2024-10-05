import {
  typeResult,
  typeResultData,
  typeResultError,
} from '../types/list.types';
import couponList from '../repository/list.repository';

export default async function listCoupon({
  userId,
  page,
  perPage,
}: {
  userId: string | undefined;
  page: number;
  perPage: number;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    // Perform the list operation using the repository function
    await couponList({ userId, page, perPage });
  } catch (err: any) {
    console.error('[COUPON] LIST Error: ', err);
    error = {
      code: err.errorCode || 'SOMETHING_WENT_WRONG',
      message: err.message || 'Something went wrong',
      statusCode: err.statusCode || 500,
    };
  }

  return { data, error };
}
