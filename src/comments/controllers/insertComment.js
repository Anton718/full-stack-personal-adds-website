exports.insertComment = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    if (req.body.child_comment) {
      await db.query(
        "INSERT INTO comments(parent_id, text, username) VALUES ($1, $2, $3)",
        [req.body.parent_post_id, req.body.child_comment, user.username]
      );
    }
  }
  res.redirect("/blog");
};
