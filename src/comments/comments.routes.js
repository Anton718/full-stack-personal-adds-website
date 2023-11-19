const express = require("express");
const router = express.Router();
const insertComment = require("./controllers/insertComment");

router.post("/addcomment", urlencodedParser, insertComment.insertComment);

module.exports = router;
