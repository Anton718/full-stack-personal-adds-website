exports.deleteposts = async (req, res) => {
  await db.query("DELETE FROM posts WHERE id=$1", [req.params.id]);
  res.redirect("/blog");
};
