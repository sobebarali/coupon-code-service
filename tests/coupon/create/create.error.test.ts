import app from "../../../src/app";
import request from "supertest";
import { expect, describe, test } from "@jest/globals";
import { v4 as uuidv4 } from "uuid";

describe("CREATE COUPON - ERROR", () => {
  test("should fail to create a coupon", async () => {
    const userId = "sobebarali";
    const code = uuidv4();
    const repeatCountConfig = {
      globalTotal: 10,
      userTotal: 3,
      userDaily: 1,
      userWeekly: 1,
    };

    const code1 = await request(app).post("/api/v1/coupon").send({
      userId,
      code,
      repeatCountConfig,
    });

    console.log(`response.body`, code1.body);

    expect(code1.status).toBe(200);
    const code2 = await request(app).post("/api/v1/coupon").send({
      userId,
      code,
      repeatCountConfig,
    });

    console.log(`response.body`, code2.body);

    expect(code2.status).toBe(500);
    expect(code2.body).toEqual({
      data: null,
      error: {
        code: "DUPLICATE_CODE",
        message: `Coupon code '${code}' already exists.`,
        statusCode: 500,
      },
    });
  });
});
