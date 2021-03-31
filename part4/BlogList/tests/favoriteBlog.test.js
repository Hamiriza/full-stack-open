const listHelper = require("../utils/list_helper");
const { emptyBlog, listWithOneBlog, blogs } = require("./test-data");

describe("favorite blog", () => {
  test("of empty list is empty object", () => {
    expect(listHelper.favoriteBlog(emptyBlog)).toEqual({});
  });

  test("when list has only one blog returns that blog", () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(
      listWithOneBlog[0]
    );
  });

  test("of a bigger list is the blog with most likes", () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});
