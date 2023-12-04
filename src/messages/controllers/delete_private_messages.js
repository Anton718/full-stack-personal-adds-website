exports.deleteprivate = async (req, res) => {
  await db.query("DELETE FROM private WHERE id = $1", [req.params.id]);
  res.redirect("/signin");
};
