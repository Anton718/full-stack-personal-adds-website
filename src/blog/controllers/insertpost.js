exports.insertposts = async (req, res) => {
  responsePost = {
    title: req.body.title,
    post: req.body.post,
  };
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    await db.query(
      "INSERT INTO posts(title, content, username) VALUES ($1, $2, $3)",
      [req.body.title, req.body.post, user.username]
    );
    res.redirect("blog");
  } else {
    response = "You need to be logged in to post";
    return res.render("blog", {
      active: "blog",
      response: response,
      posts: "",
      token: "",
      user: "",
    });
  }
};
