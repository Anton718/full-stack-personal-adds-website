const express = require("express");
const router = express.Router();
const getcontacts = require("./controllers/getcontacts");
const sendemail = require("./controllers/sendemail");

router.get("/contacts", getcontacts.contacts);

router.post("/form", urlencodedParser, sendemail.mailer);

module.exports = router;
