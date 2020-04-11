var passport = require("passport");
var util = require("util");
var url = require("url");
var querystring = require("querystring");
const keys = require("../config/keys");

module.exports = app => {
  // Perform the login, after login Auth0 will redirect to callback
  app.get(
    "/auth/login",
    passport.authenticate("auth0", {
      scope: "openid email profile"
    }),
    function(req, res) {
      res.redirect("/");
    }
  );

  // Perform the final stage of authentication and redirect to previously requested URL or '/user'
  app.get("/auth/callback", function(req, res, next) {
    passport.authenticate("auth0", function(err, user, info) {
      // console.log("user", user);
      // console.log("info", info);
      if (err) {
        console.log("First error");
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, function(err) {
        if (err) {
          console.log("Second error");
          return next(err);
        }
        // console.log("REQ", req);
        const returnTo = req.session.returnTo;
        // console.log("returnTo", returnTo);
        delete req.session.returnTo;
        res.redirect(returnTo || "/");
      });
    })(req, res, next);
  });

  // Perform session logout and redirect to homepage
  app.get("/api/logout", (req, res) => {
    req.logout();
    var returnTo = req.protocol + "://" + req.hostname;

    var port = req.connection.localPort;
    //port !== undefined && port !== 80 && port !== 443
    if (process.env.NODE_ENV !== "production") {
      returnTo += ":" + 3000;
    }

    console.log("returnTo", returnTo);
    // var logoutURL = new url.URL(
    //   util.format("https://%s/v2/logout", keys.auth0Domain)
    // );
    // var searchString = querystring.stringify({
    //   client_id: keys.auth0ClientId,
    //   returnTo: returnTo
    // });
    // logoutURL.search = searchString;
    res.redirect(
      `https://dev-v-ev0-64.auth0.com/v2/logout?returnTo=${returnTo}`
      // "/"
    );
    // res.redirect("http://localhost:3000/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
