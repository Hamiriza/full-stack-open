const listHelper = require("../utils/list_helper");
const { emptyBlog, listWithOneBlog, blogs } = require("./test-data");

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes(emptyBlog)).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});
