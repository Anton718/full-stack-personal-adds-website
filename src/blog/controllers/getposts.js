exports.getposts = async (req, res) => {
  let posts;
  await db
    .query("SELECT * FROM posts ORDER BY id DESC")
    .then((result) => (posts = result))
    .catch((error) => console.log(error));
  try {
    const token = req.signedCookies.token;
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    return res.render("blog", {
      active: "blog",
      posts: posts,
      response: "",
      token: token,
      user: user.username,
    });
  } catch {
    undefined;
  }
  res.render("blog", {
    active: "blog",
    posts: posts,
    response: "",
    token: "",
    user: "",
  });
};
