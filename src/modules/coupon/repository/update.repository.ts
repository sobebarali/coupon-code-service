import { CustomError } from "@src/utils/customError";
import Coupon from "../schema/coupon.schema";

export default async function couponUpdate({
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
      }
    | undefined;
}) {
  try {
    const coupon = await Coupon.findOneAndUpdate(
      { couponId },
      {
        code,
        repeatCountConfig,
      },
      {
        new: true,
      }
    );

    if (!coupon) {
      throw new CustomError(
        "NOT_FOUND",
        `Coupon with ID ${couponId} not found`,
        404
      );
    }

    return coupon;
  } catch (error) {
    console.error("45456335 Error coupon update", error);
    throw new CustomError("DB_ERROR", `Error updateing coupon`);
  }
}
