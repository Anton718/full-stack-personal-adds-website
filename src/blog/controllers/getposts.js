exports.getposts = async (req, res) => {
  let responseBody = {
    parent_title: req.body.parent_title,
    parent_content: req.body.parent_content,
    parent_username: req.body.parent_username,
    parent_post_id: req.body.parent_post_id,
    child_comment_content: req.body.child_comment,
  };
  let replies;
  await db
    .query("SELECT * FROM users, comments WHERE users.name = comments.username")
    .then((result) => (replies = result))
    .catch((error) => error);
  console.log(replies);
  let posts;
  await db
    .query(
      "SELECT * FROM users, posts WHERE users.name = posts.username ORDER BY posts.id DESC"
    )
    .then((result) => (posts = result))
    .catch((error) => error);
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
