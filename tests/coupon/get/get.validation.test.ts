import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('GET COUPON - VALIDATION', () => {
  test('should fail to get a coupon', async () => {
    const couponId = undefined;

    const response = await request(app)
      .post('/api/coupon/:id')
      .query({ id: 'test_id' });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(400);

    expect(response.body.error).toEqual({
      code: 'VALIDATION_ERROR',
      message: expect.any(String),
    });
  });
});
