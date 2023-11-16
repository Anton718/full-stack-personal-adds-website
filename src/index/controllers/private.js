exports.private = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    const data = await db.query(
      "SELECT * FROM private WHERE to_user = $1 ORDER by id DESC",
      [user.username]
    );

    res.render("private", {
      active: "",
      response: "",
      token: token,
      user: user.username,
      data: data,
    });
  }
};
