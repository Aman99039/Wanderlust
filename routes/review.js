const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, validateReview, isOwnerReview } = require("../middleware");
const listingController = require("../controllers/review");
//Reviews
//Post Route
router.post("/", validateReview, isLoggedIn, wrapAsync(listingController.post));

//Delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isOwnerReview,
  wrapAsync(listingController.destroy)
);

module.exports = router;
