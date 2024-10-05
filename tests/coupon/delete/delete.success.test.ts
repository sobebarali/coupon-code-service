import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';
import { v4 as uuidv4 } from "uuid";


describe('DELETE COUPON - SUCCESS', () => {
  test('should successfully delete a coupon', async () => {
     const userId = "sobebarali";
     const code = uuidv4();
     const repeatCountConfig = {
       globalTotal: 10,
       userTotal: 3,
       userDaily: 1,
       userWeekly: 1,
     };

     const couponCreate = await request(app).post("/api/v1/coupon").send({
       userId,
       code,
       repeatCountConfig,
     });

     expect(couponCreate.status).toBe(200);

    const couponId = couponCreate.body.data.couponId;

    const response = await request(app).delete("/api/v1/coupon").send({
      couponId,
    });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      data: {
        code: expect.any(String),
        message: expect.any(String),
      },
      error: null,
    });
  });
});
