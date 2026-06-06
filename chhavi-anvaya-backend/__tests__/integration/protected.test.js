const request = require("supertest");
const app = require("../../app");

describe("Protected Routes", () => {
  test("GET /api/protected should block unauthenticated user", async () => {
    const res = await request(app).get("/api/protected");

    expect([401, 403]).toContain(res.statusCode);
  });
});
