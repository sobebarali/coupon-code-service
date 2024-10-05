import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';
import { v4 as uuidv4 } from "uuid";

describe('CREATE COUPON - SUCCESS', () => {
  test('should successfully create a coupon', async () => {
    const userId = "sobebarali";
    const code = uuidv4();
    const repeatCountConfig = {
      globalTotal:10,
      userTotal: 3,
      userDaily: 1,
      userWeekly: 1
    };
    
    const response = await request(app).post('/api/v1/coupon').send({
      userId,
      code,
      repeatCountConfig,
    });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        userId,
        couponId: expect.any(String),
        code,
        repeatCountConfig,
        usageCount: expect.any(Number),
        userUsage: expect.any(Array),
      },
      error: null,
    });
  });
});
