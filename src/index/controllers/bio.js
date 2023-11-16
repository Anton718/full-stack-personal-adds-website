exports.bio = async (req, res) => {
  const token = req.signedCookies.token;
  if (token && req.body.bio !== "") {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    await db
      .one("UPDATE users SET bio=$2 WHERE name=$1", [
        user.username,
        req.body.bio,
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
