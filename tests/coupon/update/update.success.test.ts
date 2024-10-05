import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('UPDATE COUPON - SUCCESS', () => {
  test('should successfully update a coupon', async () => {
    const couponId = null;
    const code = null;
    const repeatCountConfig = null;
    const userTotal = null;
    const userDaily = null;
    const userWeekly = null;

    const response = await request(app).post('/api/coupon').send({
      couponId,
      code,
      repeatCountConfig,
      userTotal,
      userDaily,
      userWeekly,
    });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      data: {
        couponId: expect.any(String),
        code: expect.any(String),
        repeatCountConfig: expect.any(Object),
        userTotal: expect.any(Number),
        userDaily: expect.any(Number),
        userWeekly: expect.any(Number),
      },
      error: null,
    });
  });
});
