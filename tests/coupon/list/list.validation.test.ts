import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('LIST COUPON - VALIDATION', () => {
  test('should fail to list a coupon', async () => {
    const userId = undefined;
    const page = undefined;
    const perPage = undefined;

    const response = await request(app).get('/api/coupons').send({
      userId,
      page,
      perPage,
    });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(400);

    expect(response.body.error).toEqual({
      code: 'VALIDATION_ERROR',
      message: expect.any(String),
    });
  });
});
