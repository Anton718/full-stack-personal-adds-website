const express = require("express");
const router = express.Router();
const getposts = require("./controllers/getposts");
const deleteposts = require("./controllers/deletepost");
const insertposts = require("./controllers/insertpost");

router.get("/blog", urlencodedParser, getposts.getposts);

router.get("/blog/:id", deleteposts.deleteposts);

router.post("/post", urlencodedParser, insertposts.insertposts);

module.exports = router;
