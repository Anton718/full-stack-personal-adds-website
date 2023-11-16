const express = require("express");
const router = express.Router();
const logout = require("./controllers/logout");
const login = require("./controllers/login");
const register = require("./controllers/register");

router.post(["/signin"], urlencodedParser, login.login);

router.post("/signup", urlencodedParser, register.register);

router.get("/logout", logout.logout);

module.exports = router;
