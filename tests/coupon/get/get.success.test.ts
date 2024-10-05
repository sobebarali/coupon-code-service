import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('GET COUPON - SUCCESS', () => {
  test('should successfully get a coupon', async () => {
    const couponId = null;

    const response = await request(app)
      .post('/api/coupon/:id')
      .query({ id: 'test_id' });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      data: {
        userId: expect.any(String),
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
