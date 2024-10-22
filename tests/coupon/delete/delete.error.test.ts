import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('DELETE COUPON - ERROR', () => {
  test('should fail to delete a coupon due to wrong coupouId', async () => {
    const couponId = "jfkklsdjfsd"; //<--- wrong couponId

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
