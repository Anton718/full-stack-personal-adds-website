exports.mailer = async (req, res) => {
  responseForm = {
    email: req.body.email,
    text: req.body.textarea,
  };
  await db
    .one("INSERT INTO messages(email, text) VALUES ($1, $2)", [
      req.body.email,
      req.body.textarea,
    ])
    .then((data) => {
      console.log("DATA:", data.value);
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });

  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    res.render("form", { active: "", token: token, user: user.username });
  } else {
    res.render("form", { active: "", token: "", user: "" });
  }
};
