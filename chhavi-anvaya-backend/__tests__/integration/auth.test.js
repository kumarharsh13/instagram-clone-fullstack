const request = require("supertest");
const app = require("../../app");

describe("Auth Routes", () => {
  test("POST /api/auth/login should fail without body", async () => {
    const res = await request(app).post("/api/auth/login").send({});

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});
