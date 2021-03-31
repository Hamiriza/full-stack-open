const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { blogsInDb } = require("../tests/test_helper");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const token = request.token;
  // const decodedToken = jwt.verify(token, process.env.SECRET);
  // if (!token || !decodedToken.id) {
  //   return response.status(401).json({ error: "token missing or invalid" });
  // }

  // const user = await User.findById(decodedToken.id);
  const user = request.user;

  if (!body.likes) {
    body.likes = 0;
  }

  if (!body.title && !body.url) {
    return response.status(400).end();
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decodedToken.id);

  const blogToDelete = await Blog.findById(request.params.id);

  if (blogToDelete.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  } else {
    return response.status(401).json({ error: "Unauthorized" });
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body;

  if (!title && !author && !url && !likes) {
    res.status(400).end();
    return;
  }

  let blog;
  if (!title || (!author && !url)) {
    const blogs = await blogsInDb();
    const blogToBeUpdated = blogs.find((blogEl) => blogEl.id === req.params.id);
    blog = blogToBeUpdated;
    blog.likes = likes;
  } else {
    blog = {
      title,
      author,
      url,
      likes,
    };
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.status(200).json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
