const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const moment = require("moment");
const port = process.env.port || 3000;

global.bodyParser = require("body-parser");
global.urlencodedParser = bodyParser.urlencoded({ extended: false });
global.pgp = require("pg-promise")();
global.db = pgp("postgres://postgres:postgres@localhost:5432/postgres");
global.path = require("path");
global.bcrypt = require("bcrypt");
global.jwt = require("jsonwebtoken");
global.fileUpload = require("express-fileupload");

const indexGetRoutes = require("./src/index/index.routes.get");
const blogRoutes = require("./src/blog/blog.routes");
const authRoutes = require("./src/auth/auth.routes");
const contactRoute = require("./src/contact/contact.routes");
const messagesRoutes = require("./src/messages/private.routes");
const commentsRoutes = require("./src/comments/comments.routes");
const fileUpload = require("express-fileupload");

app.set("view engine", "ejs");

app.use(cookieParser("rwervterbj353jhbdkfhv"));
app.use(indexGetRoutes);
app.use(messagesRoutes);
app.use(blogRoutes);
app.use(authRoutes);
app.use(contactRoute);
app.use(commentsRoutes);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => {
  console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
});
