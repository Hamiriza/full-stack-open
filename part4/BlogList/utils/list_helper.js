const blog = require("../models/blog");
const { blogs } = require("../tests/test-data");
const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return {};
  const reducer = (blogWithMaxLikes, currentBlog) =>
    blogWithMaxLikes.likes >= currentBlog.likes
      ? blogWithMaxLikes
      : currentBlog;
  return blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
  if (blogs.length < 1) return {};

  const result = _.chain(blogs)
    .countBy("author")
    .toPairs()
    .sortBy((a) => a[1])
    .last()
    .value();

  return {
    author: result[0],
    blogs: result[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length < 1) return {};

  const result = _.chain(blogs)
    .groupBy("author")
    .map((value, key) => {
      return { author: key, likes: _(value).sumBy("likes") };
    })
    .sortBy((a) => a.likes)
    .last()
    .value();

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
