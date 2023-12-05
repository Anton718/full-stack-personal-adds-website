exports.getposts = async (req, res) => {
  let replies = await db.query(
    "SELECT * FROM users, comments WHERE users.name = comments.username"
  );
  let posts = await db.query(
    "SELECT * FROM users, posts WHERE users.name = posts.username ORDER BY posts.id DESC"
  );
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    return res.render("blog", {
      active: "blog",
      replies: replies,
      response: "",
      token: token,
      user: user.username,
      posts: posts,
    });
  } else {
    res.render("blog", {
      active: "blog",
      replies: replies,
      response: "",
      token: "",
      user: "",
      posts: posts,
    });
  }
};
