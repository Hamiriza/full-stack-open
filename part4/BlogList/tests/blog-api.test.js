const mongoose = require("mongoose");
const supertest = require("supertest");
const { nonExistingId, blogsInDb } = require("./test_helper");
const { emptyBlog, listWithOneBlog, blogs } = require("./test-data");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash, blogs: [] });

  await user.save();

  await Blog.deleteMany({});

  const blogObjects = blogs.map(
    (blog) => new Blog({ ...blog, user: user._id })
  );
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("testing GET:", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("All blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length);
  });

  test("A specific blog can be returned", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);
    expect(titles).toContainEqual("React patterns");
  });

  test("Verify if id property of the blog posts exists", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("testing POST: ", () => {
  test("A new blog post is created", async () => {
    const toSend = { username: "root", password: "sekret" };
    const receivedFromLogin = await api.post("/api/login").send(toSend);
    const token = receivedFromLogin.body.token;

    const newBlog = {
      title: "The Ranger's Apprentice",
      author: "John Flanagan",
      url: "https://flanagan.fandom.com/wiki/Blog:Recent_posts",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .set({
        Authorization: `bearer ${token}`,
      })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfterPost = await blogsInDb();
    expect(blogsAfterPost).toHaveLength(blogs.length + 1);
  });

  test("if likes prop is missing, it defaults to 0", async () => {
    const toSend = { username: "root", password: "sekret" };
    const receivedFromLogin = await api.post("/api/login").send(toSend);
    const token = receivedFromLogin.body.token;
    const newBlog = {
      title: "The Ranger's Apprentice",
      author: "John Flanagan",
      url: "https://flanagan.fandom.com/wiki/Blog:Recent_posts",
    };

    const apiResponse = await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(apiResponse.body.likes).toBe(0);
  });

  test("if title and url properties are missing api responds with 400 status code", async () => {
    const toSend = { username: "root", password: "sekret" };
    const receivedFromLogin = await api.post("/api/login").send(toSend);
    const token = receivedFromLogin.body.token;

    const newBlog = {
      author: "Li Jiang",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(400);
  });

  test("if token is not provided, test will return the appropriate response", async () => {
    const newBlog = {
      title: "The Ranger's Apprentice",
      author: "John Flanagan",
      url: "https://flanagan.fandom.com/wiki/Blog:Recent_posts",
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

describe("testing DELETE: ", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const toSend = { username: "root", password: "sekret" };
    const receivedFromLogin = await api.post("/api/login").send(toSend);
    const token = receivedFromLogin.body.token;

    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `bearer ${token}` })
      .expect(204);

    const blogsAfterDeletion = await blogsInDb();
    expect(blogsAfterDeletion).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAfterDeletion.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("testing PUT: ", () => {
  test("can update all fields of an individual blogpost", async () => {
    const blogs = await blogsInDb();
    const updatedBlog = {
      likes: 25,
      title: "The 10 Component Commandments",
      author: "selbekk",
      url: "https://dev.to/selbekk/the-10-component-commandments-2a7f",
    };
    await api.put(`/api/blogs/${blogs[0].id}`).send(updatedBlog).expect(200);

    const blogsAfterPut = await blogsInDb();
    Object.entries(updatedBlog).forEach((blog) => {
      expect(Object.entries(blogsAfterPut[0])).toContainEqual(blog);
    });
  });

  test("can update likes field if it's the only field of req body", async () => {
    const blogs = await blogsInDb();
    const newLikesVal = blogs[0].likes + 1;
    const updatedBlogRes = await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send({ likes: newLikesVal })
      .expect(200);
    expect(updatedBlogRes.body.likes).toBe(newLikesVal);
  });

  test("put req with empty body returns 400", async () => {
    const blogs = await blogsInDb();
    await api.put(`/api/blogs/${blogs[0].id}`).send({}).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
