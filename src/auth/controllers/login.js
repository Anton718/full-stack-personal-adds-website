exports.login = async (req, res) => {
  const savedHash = await db.query("SELECT pass FROM users WHERE name = $1", [
    req.body.name,
  ]);
  const responseUser = {
    username: req.body.name,
    password: req.body.pass,
  };

  if (savedHash[0]) {
    await bcrypt.compare(
      req.body.pass,
      savedHash[0].pass,
      function (err, result) {
        if (!result) {
          response = `User ${req.body.name.toLowerCase()} exists but the password is wrong`;
          return res.render("signin", {
            active: "signin",
            resonse: response,
            token: "",
            user: "",
            yourBio: "",
          });
        } else {
          response = null;
          const token = jwt.sign(responseUser, "rwervterbj353jhbdkfhv", {
            expiresIn: 10000000,
          });
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 10000000,
            signed: true,
          });
          res.redirect("signin");
        }
      }
    );
  } else {
    response = `You are not registered. Go to Signup`;
    res.render("signin", {
      active: "signin",
      response: response,
      token: "",
      user: req.body.name,
      yourBio: "",
    });
  }
};
