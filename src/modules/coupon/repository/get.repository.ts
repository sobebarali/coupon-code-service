import { CustomError } from "@src/utils/customError";
import Coupon from "../schema/coupon.schema";

export default async function couponGet({ couponId }: { couponId: string }) {
  try {
    const coupon = await Coupon.findOne({ couponId });

     if (!coupon) {
       throw new CustomError(
         "NOT_FOUND",
         `Coupon with ID ${couponId} not found`,
         404
       );
     }

    return coupon;
  } catch (error) {
    console.error("1566558 Error coupon get", error);
    throw new CustomError("DB_ERROR", `Error geting coupon`);
  }
}
