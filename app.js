const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();
const path = require("path");

const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");
const dreamRoutes = require("./routes/dreamRoutes");
const genresRoutes = require("./routes/genresRoutes");
const authorRoutes = require("./routes/authorRoutes");
const profileRoutes = require("./routes/profileRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const allDreamsRoutes = require("./routes/allDreamsRoutes");
const addDreamsRoutes = require("./routes/addDreamsRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: `${process.env.USERNAME}`,
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
app.use(
  "/views/css",
  (req, res, next) => {
    res.type("text/css");
    next();
  },
  express.static(__dirname + "/views/css")
);
app.use(
  "/views/scripts",
  (req, res, next) => {
    res.type("application/javascript");
    next();
  },
  express.static(__dirname + "/views/scripts")
);

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/dream", dreamRoutes);
app.use("/author", authorRoutes);
app.use("/genres", genresRoutes);
app.use("/profile", profileRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/all_dreams", allDreamsRoutes);
app.use("/add_new_dreams", addDreamsRoutes);

const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);

    app.listen(port, () => {
      console.log(`Server listen on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
