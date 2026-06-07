const request = require("supertest");
const app = require("../../app");

describe("Auth Routes", () => {
  test("POST /api/auth/signin returns 400 with empty body", async () => {
    const res = await request(app).post("/api/auth/signin").send({});
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  test("POST /api/auth/signup returns 400 with empty body", async () => {
    const res = await request(app).post("/api/auth/signup").send({});
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  test("POST /api/auth/signin returns 400 with invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/signin")
      .send({ email: "notexist@example.com", password: "wrongpass" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  test("GET /api/auth/verify_token returns 401 without cookie", async () => {
    const res = await request(app).get("/api/auth/verify_token");
    expect(res.statusCode).toBe(401);
  });

  test("Health check returns 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
  });
});
