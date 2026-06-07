jest.mock("../../../models", () => ({
  User: { findOne: jest.fn() },
  Post: { create: jest.fn(), findAndCountAll: jest.fn() },
  Like: { findOne: jest.fn(), create: jest.fn() },
  Comment: { create: jest.fn() },
  Follow: { findAll: jest.fn() },
}));

jest.mock("../../../middleware/post_image", () => ({
  single: () => (req, res, cb) => cb(),
}));

const { Post, Like, Comment, Follow } = require("../../../models");
const {
  createLike,
  deleteLike,
  createComment,
  getPosts,
} = require("../../../controllers/postController");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => jest.clearAllMocks());

// ── createLike ────────────────────────────────────────────────────────────────

describe("createLike", () => {
  test("returns 400 if already liked", async () => {
    Like.findOne.mockResolvedValue({ id: 1 });
    const req = { body: { post_id: 1 }, user: { id: 2 } };
    const res = mockRes();
    await createLike(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining("already liked") })
    );
  });

  test("creates like and returns 201", async () => {
    Like.findOne.mockResolvedValue(null);
    Like.create.mockResolvedValue({ id: 5, post_id: 1, user_id: 2 });
    const req = { body: { post_id: 1 }, user: { id: 2 } };
    const res = mockRes();
    await createLike(req, res);
    expect(Like.create).toHaveBeenCalledWith({ post_id: 1, user_id: 2 });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });
});

// ── deleteLike ────────────────────────────────────────────────────────────────

describe("deleteLike", () => {
  test("returns 400 if like not found", async () => {
    Like.findOne.mockResolvedValue(null);
    const req = { body: { post_id: 1 }, user: { id: 2 } };
    const res = mockRes();
    await deleteLike(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("destroys like and returns 200", async () => {
    const mockLike = { destroy: jest.fn() };
    Like.findOne.mockResolvedValue(mockLike);
    const req = { body: { post_id: 1 }, user: { id: 2 } };
    const res = mockRes();
    await deleteLike(req, res);
    expect(mockLike.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });
});

// ── createComment ─────────────────────────────────────────────────────────────

describe("createComment", () => {
  test("creates comment and returns 200", async () => {
    const newComment = { id: 1, comment: "nice", post_id: 1, user_id: 2 };
    Comment.create.mockResolvedValue(newComment);
    const req = { body: { comment: "nice", post_id: 1 }, user: { id: 2 } };
    const res = mockRes();
    await createComment(req, res);
    expect(Comment.create).toHaveBeenCalledWith({ comment: "nice", post_id: 1, user_id: 2 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });
});

// ── getPosts ──────────────────────────────────────────────────────────────────

describe("getPosts", () => {
  test("returns paginated posts", async () => {
    Post.findAndCountAll.mockResolvedValue({ count: 2, rows: [{}, {}] });
    const req = { query: { page: "1", limit: "10" } };
    const res = mockRes();
    await getPosts(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        pagination: expect.objectContaining({ page: 1, total: 2 }),
      })
    );
  });
});
