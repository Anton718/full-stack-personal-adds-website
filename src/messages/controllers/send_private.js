exports.sendPrivMessage = async (req, res) => {
  const token = req.signedCookies.token;
  const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
  if (token) {
    if (req.body.private) {
      await db.query(
        "INSERT INTO private(to_user, from_user, content) VALUES ($1, $2, $3)",
        [req.body.to_user, user.username, req.body.private]
      );
      res.render("user_profile", {
        active: "",
        token: token,
        response: `sent FROM: "${user.username}",
        TO: "${req.body.to_user}",
        MESSAGE: "${req.body.private}"`,
        user: user.username,
        data: [{ name: req.body.to_user, bio: req.body.bio }],
      });
    } else {
      res.render("user_profile", {
        active: "",
        token: token,
        response: "empty message",
        user: user.username,
        data: [{ name: req.body.to_user, bio: req.body.bio }],
      });
    }
  }
};
