exports.getposts = async (req, res) => {
  let responseBody = {
    parent_title: req.body.parent_title,
    parent_content: req.body.parent_content,
    parent_username: req.body.parent_username,
    parent_post_id: req.body.parent_post_id,
    child_comment_content: req.body.child_comment,
  };
  let posts;
  await db
    .query("SELECT * FROM posts ORDER BY id DESC")
    .then((result) => (posts = result))
    .catch((error) => console.log(error));
  let replies;
  await db
    .query("SELECT * FROM comments")
    .then((result) => (replies = result))
    .catch((error) => console.log(error));
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    return res.render("blog", {
      active: "blog",
      posts: posts,
      replies: replies,
      response: "",
      token: token,
      user: user.username,
    });
  } else {
    res.render("blog", {
      active: "blog",
      posts: posts,
      replies: replies,
      response: "",
      token: "",
      user: "",
    });
  }
};
