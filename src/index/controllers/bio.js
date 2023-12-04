exports.bio = async (req, res) => {
  const token = req.signedCookies.token;
  if (token && req.body.bio !== "") {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    await db.query("UPDATE users SET bio = $1 WHERE name = $2", [
      req.body.bio,
      user.username,
    ]);
  }
  res.redirect("signin");
};
