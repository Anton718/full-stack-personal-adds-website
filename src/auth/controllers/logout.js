exports.logout = async (req, res) => {
  res.clearCookie("token");
  var response = "You logged out";
  res.render("signin", { active: "signin", response: response, token: "" });
};
