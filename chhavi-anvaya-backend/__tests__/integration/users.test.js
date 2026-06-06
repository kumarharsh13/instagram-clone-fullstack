const request = require("supertest");
const app = require("../../app");

describe("User Routes", () => {
  test("GET /api/users should require auth", async () => {
    const res = await request(app).get("/api/users");

    expect([401, 403]).toContain(res.statusCode);
  });
});
