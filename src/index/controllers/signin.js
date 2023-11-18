exports.signin = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    console.log(user);
    const bio = await db.query("SELECT bio FROM users WHERE name = $1", [
      user.username,
    ]);
    console.log(bio);
    res.render("signin", {
      active: "signin",
      response: "",
      token: token,
      user: user.username,
      yourBio: bio[0].bio,
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