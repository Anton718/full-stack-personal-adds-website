exports.contacts = (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    return res.render("contacts", {
      active: "contacts",
      token: token,
      response: "",
      user: user.username,
    });
  } else {
    res.render("contacts", {
      active: "contacts",
      token: "",
      response: "",
      user: "",
    });
  }
};
