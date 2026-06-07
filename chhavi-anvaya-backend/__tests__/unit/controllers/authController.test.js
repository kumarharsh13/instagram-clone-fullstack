const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../../../models", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
  Follow: {
    create: jest.fn(),
  },
}));

const { User, Follow } = require("../../../models");
const { signUp, signIn } = require("../../../controllers/authController");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
  process.env.JWT_SECRET = "test-secret";
});

// ── signUp ────────────────────────────────────────────────────────────────────

describe("signUp", () => {
  const validBody = {
    email: "test@example.com",
    username: "testuser",
    password: "Password1",
    mobile: "9876543210",
    fullName: "Test User",
  };

  test("returns 400 if email already exists", async () => {
    User.findOne.mockResolvedValueOnce({ id: 1, email: validBody.email });
    const req = { body: validBody };
    const res = mockRes();
    await signUp(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Email ID already in use." });
  });

  test("returns 400 if username already exists", async () => {
    User.findOne
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ id: 2, username: validBody.username });
    const req = { body: validBody };
    const res = mockRes();
    await signUp(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Username already in use." });
  });

  test("returns 400 if password too weak", async () => {
    User.findOne.mockResolvedValue(null);
    const req = { body: { ...validBody, password: "weakpw" } };
    const res = mockRes();
    await signUp(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("creates user and returns 201 on valid input", async () => {
    User.findOne.mockResolvedValue(null);
    const newUser = { id: 10, ...validBody };
    User.create.mockResolvedValue(newUser);
    Follow.create.mockResolvedValue({});

    const req = { body: validBody };
    const res = mockRes();
    await signUp(req, res);
    expect(User.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });

  test("auto-follow skipped if default user not found", async () => {
    User.findOne
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null); // defaultToFollow lookup
    User.create.mockResolvedValue({ id: 10 });

    const req = { body: validBody };
    const res = mockRes();
    await signUp(req, res);
    expect(Follow.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

// ── signIn ────────────────────────────────────────────────────────────────────

describe("signIn", () => {
  test("returns 400 if user not found", async () => {
    User.findOne.mockResolvedValue(null);
    const req = { body: { email: "x@x.com", password: "pass" } };
    const res = mockRes();
    await signIn(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });

  test("returns 400 if password wrong", async () => {
    User.findOne.mockResolvedValue({
      id: 1,
      email: "x@x.com",
      password: await bcrypt.hash("correct", 10),
    });
    const req = { body: { email: "x@x.com", password: "wrong" } };
    const res = mockRes();
    await signIn(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });

  test("returns 200 with token on valid credentials", async () => {
    const hashed = await bcrypt.hash("Password1", 10);
    User.findOne.mockResolvedValue({
      id: 1,
      email: "x@x.com",
      username: "xuser",
      password: hashed,
    });
    const req = { body: { email: "x@x.com", password: "Password1" } };
    const res = mockRes();
    await signIn(req, res);
    expect(res.cookie).toHaveBeenCalledWith("token", expect.any(String), expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, token: expect.any(String) })
    );
  });
});
