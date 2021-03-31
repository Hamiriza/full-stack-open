const mostLikes = require("../utils/list_helper").mostLikes;
const { emptyBlog, listWithOneBlog, blogs } = require("./test-data");

describe("most likes", () => {
  test("with empty list returns empty object", () => {
    expect(mostLikes(emptyBlog)).toEqual({});
  });

  test("with list of one blog returns the author and number of likes", () => {
    expect(mostLikes(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("with author of most blogs returns the author and number of blogs", () => {
    expect(mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
