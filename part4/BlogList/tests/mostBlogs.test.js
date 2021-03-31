const mostBlogs = require("../utils/list_helper").mostBlogs;
const { emptyBlog, listWithOneBlog, blogs } = require("./test-data");

describe("most blogs", () => {
  test("with empty list returns empty object", () => {
    expect(mostBlogs(emptyBlog)).toEqual({});
  });

  test("with list of one blog returns the author and number of blogs", () => {
    expect(mostBlogs(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("with author of most blogs returns the author and number of blogs", () => {
    expect(mostBlogs(blogs)).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });
});
