import { CustomError } from "@src/utils/customError";
import Coupon from "../schema/coupon.schema";

export default async function couponDelete({ couponId }: { couponId: string }) {
  try {
    const result = await Coupon.deleteOne({ couponId });
    if (result.deletedCount === 0) {
      throw new CustomError(
        "NOT_FOUND",
        `Coupon with ID ${couponId} does not exist`,
        404
      );
    }
    return { isDeleted: true };
  } catch (error) {
    console.error("42539490 Error coupon delete", error);
    throw new CustomError("DB_ERROR", `Error deleting coupon`);
  }
}
