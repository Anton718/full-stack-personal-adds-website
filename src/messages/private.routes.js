const express = require("express");
const router = express.Router();
const deleteprivate = require("./controllers/delete_private_messages");
const view_profile = require("./controllers/view_profile");
const sendPrivMessages = require("./controllers/send_private");
const sendPrivMessages2 = require("./controllers/send_private2");

router.get("/user_profile/:id", view_profile.view_profile);

router.get("/private/:id", deleteprivate.deleteprivate);

router.post("/sendprivate", urlencodedParser, sendPrivMessages.sendPrivMessage);

router.post(
  "/sendprivate2",
  urlencodedParser,
  sendPrivMessages2.sendPrivMessage2
);

module.exports = router;
