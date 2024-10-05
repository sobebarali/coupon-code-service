import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('UPDATE COUPON - VALIDATION', () => {
  test('should fail to update a coupon', async () => {
    const couponId = undefined;
    const code = undefined;
    const repeatCountConfig = undefined;
    const userTotal = undefined;
    const userDaily = undefined;
    const userWeekly = undefined;

    const response = await request(app).post('/api/coupon').send({
      couponId,
      code,
      repeatCountConfig,
      userTotal,
      userDaily,
      userWeekly,
    });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(400);

    expect(response.body.error).toEqual({
      code: 'VALIDATION_ERROR',
      message: expect.any(String),
    });
  });
});
