import {
  typeResult,
  typeResultData,
  typeResultError,
} from '../types/delete.types';
import couponDelete from '../repository/delete.repository';

export default async function deleteCoupon({
  couponId,
}: {
  couponId: string;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
   let deleteResult = await couponDelete({ couponId });

   if(deleteResult.isDeleted){
    data = {
      code: "COUPON_DELETED",
      message: "Coupon deleted succesfullly"
    }
   }
  } catch (err: any) {
    console.error('[COUPON] DELETE Error: ', err);
    error = {
      code: err.errorCode || 'SOMETHING_WENT_WRONG',
      message: err.message || 'Something went wrong',
      statusCode: err.statusCode || 500,
    };
  }

  return { data, error };
}
