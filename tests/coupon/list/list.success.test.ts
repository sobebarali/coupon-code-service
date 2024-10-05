import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('LIST COUPON - SUCCESS', () => {
  test('should successfully list a coupon', async () => {
    const userId = 'userId_value';
    const page = null;
    const perPage = null;

    const response = await request(app).get('/api/coupons').send({
      userId,
      page,
      perPage,
    });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      data: {
        coupon: expect.any(Object),
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
