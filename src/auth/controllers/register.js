exports.register = async (req, res) => {
  const savedHash = await db.query("SELECT pass FROM users WHERE name = $1", [
    req.body.name,
  ]);
  const responseUser = {
    username: req.body.name,
    password: req.body.pass,
  };

  if (savedHash[0]) {
    res.render("signup", {
      active: "signup",
      response: "Username is not available",
      token: "",
      user: "",
    });
  } else {
    await bcrypt.hash(req.body.pass, 10, async function (err, hash) {
      if (err) throw err;
      await db.query("INSERT INTO Users(name, pass) VALUES ($1, $2)", [
        req.body.name.toLowerCase(),
        hash,
      ]);
      response = `You signed up`;
      const token = jwt.sign(responseUser, "rwervterbj353jhbdkfhv", {
        expiresIn: 900,
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000000,
        signed: true,
      });
      res.render("signin", {
        active: "signin",
        response: `You signed up as ${req.body.name.toLowerCase()}`,
        token: token,
        user: req.body.name,
        yourBio: "",
      });
    });
  }
};
