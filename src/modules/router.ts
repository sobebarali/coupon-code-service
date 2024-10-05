import express from 'express';
import couponRouter from './coupon/routes/coupon.routes';

const router = express.Router();

router.use(couponRouter);

export default router;
