import { CustomError } from "@src/utils/customError";
import Coupon from "../schema/coupon.schema";

export default async function couponList({
  userId,
  page,
  perPage,
}: {
  userId: string | undefined;
  page: number;
  perPage: number;
}) {
  try {
    const coupons = await Coupon.findOne({ userId, page, perPage });
    return coupons;
  } catch (error) {
    console.error("26983038 Error coupon list", error);
    throw new CustomError("DB_ERROR", `Error listing coupon`);
  }
}
