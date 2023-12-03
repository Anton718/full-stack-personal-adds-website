exports.addImage = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    if (req.files) {
      let fileName = `${Math.random() * 10000000000000000}${path.extname(
        req.files.image.name
      )}`;
      req.files.image.mv("public/images/" + fileName);
      let imagePath = `images/${fileName}`;
      await db.query("UPDATE users SET image = $1 WHERE name = $2", [
        imagePath,
        user.username,
      ]);
    }
    res.redirect("signin");
  }
};
