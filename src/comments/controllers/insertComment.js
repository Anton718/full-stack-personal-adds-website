exports.insertComment = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    let responseBody = {
      parent_title: req.body.parent_title,
      parent_content: req.body.parent_content,
      parent_username: req.body.parent_username,
      parent_post_id: req.body.parent_post_id,
      child_comment_content: req.body.child_comment,
      child_username: req.body.chile_username,
    };
    console.log(responseBody);
    if (req.body.child_comment) {
      await db.query(
        "INSERT INTO comments(parent_id, text, username) VALUES ($1, $2, $3)",
        [req.body.parent_post_id, req.body.child_comment, user.username]
      );
    }
  }
  res.redirect("/blog");
};
