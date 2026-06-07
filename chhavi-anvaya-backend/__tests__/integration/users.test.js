const request = require("supertest");
const app = require("../../app");

describe("User Routes", () => {
  test("GET /api/users/search requires auth", async () => {
    const res = await request(app).get("/api/users/search").query({ query: "test" });
    expect([401, 403]).toContain(res.statusCode);
  });

  test("POST /api/users/change_password requires auth", async () => {
    const res = await request(app).post("/api/users/change_password").send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  test("POST /api/users/edit_profile requires auth", async () => {
    const res = await request(app).post("/api/users/edit_profile").send({});
    expect([401, 403]).toContain(res.statusCode);
  });
});
