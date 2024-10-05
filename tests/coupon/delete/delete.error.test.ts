import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('DELETE COUPON - ERROR', () => {
  test('should fail to delete a coupon', async () => {
    const couponId = undefined;

    const response = await request(app)
      .post('/api/coupon/:id')
      .query({ id: 'test_id' });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(400);

    expect(response.body.error).toBeDefined();
  });
});
