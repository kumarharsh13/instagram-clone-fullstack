const request = require("supertest");
const app = require("../../app");

describe("Protected Routes", () => {
  test("GET /api/protected/homepage blocks unauthenticated user", async () => {
    const res = await request(app).get("/api/protected/homepage");
    expect([401, 403]).toContain(res.statusCode);
  });

  test("GET /api/posts/get_my_posts requires auth", async () => {
    const res = await request(app).get("/api/posts/get_my_posts");
    expect([401, 403]).toContain(res.statusCode);
  });

  test("GET /api/follow/get_follow_suggestion requires auth", async () => {
    const res = await request(app).get("/api/follow/get_follow_suggestion");
    expect([401, 403]).toContain(res.statusCode);
  });
});
