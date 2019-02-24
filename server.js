const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const posts = require("./router/API/posts");
const profile = require("./router/API/profile");
const users = require("./router/API/users");

const app = express();
// CẤU HÌNH CHO BODYPARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CẤU HÌNH CHO DB
const db = require("./config/keys").mongoURI;

// CONNNECT TỚI MONGODB
mongoose
  .connect(db)
  .then(() => {
    console.log("mongoDb đã chạy");
  })
  .catch(err => {
    console.log(err);
  });

// CẤU HÌNH CHO PASSPORT
app.use(passport.initialize()); //Dòng này để thông báo sử dụng passport
require("./config/passport")(passport);

// USE ROUTER
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

// SETUP SERVER TRONG PRODUCTION
if (process.env.NODE_ENV === "production") {
  // TRỎ VÀO THƯ MỤC BUILD
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", (req, res) => {
  return res.send("xin chào");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server đã chạy ở port ${port}`);
});
