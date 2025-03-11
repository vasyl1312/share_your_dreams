const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();

const homeRoutes = require("./routes/homeRoutes");
const dreamRoutes = require("./routes/dreamRoutes");
const allDreamsRoutes = require("./routes/allDreamsRoutes");
const addDreamsRoutes = require("./routes/addDreamsRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/views"));
// app.use("/views/image", express.static(__dirname + "/views/image"));
app.use(
  "/views/css",
  (req, res, next) => {
    res.type("text/css");
    next();
  },
  express.static(__dirname + "/views/css")
);
app.use(
  "/views/js",
  (req, res, next) => {
    res.type("application/javascript");
    next();
  },
  express.static(__dirname + "/views/js")
);
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: `${process.env.USERNAME}`,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.use(fileMiddleware.single("avatar"));

app.use("/", homeRoutes);
app.use("/dream", dreamRoutes);
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
