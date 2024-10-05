import { CustomError } from "@src/utils/customError";
import Coupon from "../schema/coupon.schema";

export default async function couponCreate({
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
}) {
  try {
    const coupon = await Coupon.create({
      userId,
      code,
      repeatCountConfig,
    });
    return { isCreated: true, coupon };
  } catch (error: any) {
    console.error("64479237 Error coupon create", error);
    if (error.code === 11000 && error.keyPattern?.code) {
      throw new CustomError(
        "DUPLICATE_CODE",
        `Coupon code '${code}' already exists.`,
        500
      );
    } else {
      throw new CustomError("DB_ERROR", `Error createing coupon`, 500);
    }
  }
}
