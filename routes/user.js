const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const listingController = require("../controllers/user");

router
  .route("/signup")
  .get(listingController.signup)
  .post(wrapAsync(listingController.signuppost));

router
  .route("/login")
  .get(listingController.login)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(listingController.loginpost)
  );

router.get("/logout", listingController.logout);

module.exports = router;
