exports.bio = async (req, res) => {
  const token = req.signedCookies.token;
  if (token && req.body.bio !== "") {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    await db
      .one("UPDATE users SET bio = $1 WHERE name = $2", [
        req.body.bio,
        user.username,
      ])
      .then((data) => {
        console.log("DATA:", data.value);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
    return res.redirect("signin");
  }
  return res.redirect("signin");
};
