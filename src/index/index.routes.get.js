const express = require("express");
const router = express.Router();
const signup = require("./controllers/signup");
const signin = require("./controllers/signin");
const bio = require("./controllers/bio");
const profileImage = require("./controllers/profileImage");

router.get(["/", "/signin", "/index"], signin.signin);

router.get("/signup", signup.signup);

router.post("/addbio", urlencodedParser, bio.bio);

router.post("/addimage", fileUpload(), profileImage.addImage);

module.exports = router;
