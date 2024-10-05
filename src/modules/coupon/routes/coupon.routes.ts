import express from 'express';

import endpointCreateCoupon from '../api/create.controller';
import endpointGetCoupon from '../api/get.controller';
import endpointUpdateCoupon from '../api/update.controller';
import endpointDeleteCoupon from '../api/delete.controller';
import endpointListCoupon from '../api/list.controller';

const couponRouter = express.Router();

couponRouter.post('/coupon', endpointCreateCoupon);
couponRouter.get('/coupon', endpointGetCoupon);
couponRouter.put('/coupon', endpointUpdateCoupon);
couponRouter.delete('/coupon', endpointDeleteCoupon);
couponRouter.get('/coupons', endpointListCoupon);

export default couponRouter;
