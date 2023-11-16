exports.sendPrivMessage2 = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    const data = await db.query("SELECT * FROM private WHERE to_user = $1", [
      user.username,
    ]);
    if (req.body.private) {
      await db.query(
        "INSERT INTO private(to_user, from_user, content) VALUES ($1, $2, $3)",
        [req.body.to_user, req.body.from_user, req.body.private]
      );
      res.render("private", {
        active: "",
        response: `sent FROM: "${req.body.from_user}",
      TO: "${req.body.to_user}",
      MESSAGE: "${req.body.private}"`,
        token: token,
        user: user.username,
        data: data,
      });
    } else {
      res.render("private", {
        active: "",
        response: `Message is empty`,
        token: token,
        user: user.username,
        data: data,
      });
    }
  }
};
