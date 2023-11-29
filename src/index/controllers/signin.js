exports.signin = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    const bio = await db.query("SELECT bio FROM users WHERE name = $1", [
      user.username,
    ]);
    const userImage = await db.query("SELECT image FROM users WHERE name=$1", [
      user.username,
    ]);
    const count = await db.query(
      "SELECT COUNT(*) FROM private WHERE to_user = $1",
      [user.username]
    );
    res.render("signin", {
      active: "signin",
      response: "",
      token: token,
      user: user.username,
      yourBio: bio[0].bio,
      count: count[0].count,
      image: userImage[0].image,
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
