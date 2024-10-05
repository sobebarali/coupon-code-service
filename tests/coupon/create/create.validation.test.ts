import app from "../../../src/app";
import request from "supertest";
import { expect, describe, test } from "@jest/globals";

describe("CREATE COUPON - VALIDATION", () => {
  test("should fail to create a coupon", async () => {
    const userId = "sobebarali";
    const code = undefined;
    const repeatCountConfig = undefined;

    const response = await request(app).post("/api/v1/coupon").send({
      userId,
      code,
      repeatCountConfig,
    });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(400);

    expect(response.body.error).toEqual({
      code: "VALIDATION_ERROR",
      message: expect.any(String),
    });
  });
});
