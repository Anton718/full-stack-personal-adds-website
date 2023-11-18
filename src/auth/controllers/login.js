exports.login = async (req, res) => {
  let name = req.body.name.toLowerCase();
  const savedHash = await db.query("SELECT pass FROM users WHERE name = $1", [
    name,
  ]);
  const responseUser = {
    username: name,
    password: req.body.pass,
  };
  console.log(responseUser);
  if (savedHash[0]) {
    await bcrypt.compare(
      req.body.pass,
      savedHash[0].pass,
      function (err, result) {
        if (!result) {
          return res.render("signin", {
            active: "signin",
            resonse: `User ${name} exists but the password is wrong`,
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
            secure: false,
            maxAge: 10000000,
            signed: true,
          });
          res.redirect("signin");
        }
      }
    );
  } else {
    res.render("signin", {
      active: "signin",
      response: `You are not registered. Go to Signup`,
      token: "",
      user: name,
      yourBio: "",
    });
  }
};
