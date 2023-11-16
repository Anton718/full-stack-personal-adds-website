exports.signin = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    const bio = await db.one("SELECT bio FROM users WHERE name = $1", [
      user.username,
    ]);
    res.render("signin", {
      active: "signin",
      response: "",
      token: token,
      user: user.username,
      yourBio: bio.bio,
    });
  } else {
    res.render("signin", {
      active: "signin",
      response: "Sign in to post and send messages",
      token: "",
      user: "",
      yourBio: "",
    });
  }
};
