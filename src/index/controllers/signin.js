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
    const data = await db.query(
      "SELECT * FROM private WHERE to_user = $1 ORDER by id DESC",
      [user.username]
    );
    const userData = await db.query("SELECT * FROM users WHERE name = $1", [
      req.query.userData,
    ]);

    res.render("signin", {
      active: "signin",
      response: "",
      token: token,
      user: user.username,
      yourBio: bio[0].bio,
      image: userImage[0].image,
      data: data,
      userData: userData[0],
    });
  } else {
    res.render("signin", {
      active: "signin",
      response: "Sign in to post and send messages",
      token: "",
    });
  }
};
