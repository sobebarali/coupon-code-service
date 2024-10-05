import mongoose, { Schema, Document, Model } from "mongoose";

interface IRepeatCountConfig {
  globalTotal: number;
  userTotal: number;
  userDaily: number;
  userWeekly: number;
}

interface IUserUsage {
  userId: string;
  count: number;
  lastUsed: Date;
}

interface ICoupon extends Document {
  code: string;
  repeatCountConfig: IRepeatCountConfig;
  usageCount: number;
  userUsage: IUserUsage[];
}

const repeatCountConfigSchema: Schema = new Schema(
  {
    globalTotal: { type: Number, default: 0 },
    userTotal: { type: Number, default: 0 },
    userDaily: { type: Number, default: 0 },
    userWeekly: { type: Number, default: 0 },
  },
  { _id: false }
);

const userUsageSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    count: { type: Number, required: true },
    lastUsed: { type: Date, required: true },
  },
  { _id: false }
);

const couponSchema: Schema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    repeatCountConfig: { type: repeatCountConfigSchema, required: true },
    usageCount: { type: Number, default: 0 },
    userUsage: { type: [userUsageSchema], required: true },
    expireAt: { type: Date, index: { expires: "1d" } },
  },
  {
    timestamps: true,
  }
);

couponSchema.index({ code: 1 });
couponSchema.index({ code: 1 }, { unique: true });
couponSchema.index({ code: 1, usageCount: -1 }); 

const Coupon: Model<ICoupon> = mongoose.model<ICoupon>("Coupon", couponSchema);

export default Coupon;
