var secured = require("../middlewares/secured");

/* GET user profile. */
module.exports = app => {
  app.get("/user", secured, function(req, res, next) {
    // const { _raw, _json, ...userProfile } = req.user;
    // console.log("req.user", req.user);
    res.send(req.user);
    // res.render("user", {
    //   userProfile: JSON.stringify(userProfile, null, 2),
    //   title: "Profile page"
    // });
  });
};
