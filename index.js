const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const flash = require("connect-flash");
const userInView = require("./middlewares/userInView");
const mongoose = require("mongoose");
const keys = require("./config/keys");

require("./models/User");
require("./models/Task");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// View engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

app.use(logger("dev"));
app.use(cookieParser());

// app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(path.join(__dirname, "public")));

app.use(flash());

// Handle auth failure error messages
app.use(function(req, res, next) {
  if (req && req.query && req.query.error) {
    req.flash("error", req.query.error);
  }
  if (req && req.query && req.query.error_description) {
    req.flash("error_description", req.query.error_description);
  }
  next();
});

// app.use(userInView());
// app.use('/', authRouter);
require("./routes/auth")(app);
// app.use("/", indexRouter);
require("./routes/taskRoutes")(app);
require("./routes/user")(app);
// app.get("/", (req, res) => {
//   res.send("Hello there");
//   // res.render("index", { title: "Auth0 Webapp sample Nodejs" });
// });
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  //sess.cookie.secure = true; // serve secure cookies, requires https
  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  app.enable("trust proxy");
}

// Catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// Error handlers

// Development error handler
// Will print stacktrace
// if (process.env.NODE_ENV !== "production") {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render("error", {
//       message: err.message,
//       error: err
//     });
//   });
// }

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
