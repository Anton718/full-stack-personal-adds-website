exports.insertposts = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    await db.query("INSERT INTO posts(content, username) VALUES ($1, $2)", [
      req.body.post,
      user.username,
    ]);
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
