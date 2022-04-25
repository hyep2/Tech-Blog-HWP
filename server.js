require("dotenv").config;

const session = require("express-session");
const express = require("express");
const { join } = require("path");

const app = express();

//MIDDLEWARE
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//EXPRESS-SESSION MIDDLEWARE
const sess = {
  secret: "Super secret secret",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

app.use(require("./routes"));

async function init() {
  await require("./config/config.js").sync();
  app.listen(process.env.PORT || 3001);
}

init();
