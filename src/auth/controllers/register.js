exports.register = async (req, res) => {
  let name = req.body.name.toLowerCase();
  const savedHash = await db.query("SELECT pass FROM users WHERE name = $1", [
    name,
  ]);
  const responseUser = {
    username: name,
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
        name,
        hash,
      ]);
      response = `You signed up`;
      const token = jwt.sign(responseUser, "rwervterbj353jhbdkfhv", {
        expiresIn: 900,
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000000,
        signed: true,
      });
      res.render("signin", {
        active: "signin",
        response: `You signed up as ${name}`,
        token: token,
        user: name,
        yourBio: "",
      });
    });
  }
};
