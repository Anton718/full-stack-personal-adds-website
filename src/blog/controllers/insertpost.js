exports.insertposts = async (req, res) => {
  responsePost = {
    title: req.body.title,
    post: req.body.post,
  };
  try {
    const token = req.signedCookies.token;
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    if (user) {
      await db
        .one(
          "INSERT INTO posts(title, content, username) VALUES ($1, $2, $3)",
          [req.body.title, req.body.post, user.username]
        )
        .then((data) => {
          console.log("DATA:", data.value);
        })
        .catch((error) => {
          console.log("ERROR:", error);
        });
      res.redirect("blog");
    }
  } catch {
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
