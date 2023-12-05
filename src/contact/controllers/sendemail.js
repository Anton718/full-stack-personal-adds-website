exports.mailer = async (req, res) => {
  await db.query("INSERT INTO messages(email, text) VALUES ($1, $2)", [
    req.body.email,
    req.body.textarea,
  ]);
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    res.render("form", { 
      active: "", 
      token: token, 
      user: user.username 
    });
  } else {
    res.render("form", { 
      active: "",
      token: "", 
      user: "" });
  }
};
