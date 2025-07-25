const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.post = async (req, res, next) => {
  let listing = await Listing.findById(req.params.id);
  console.log(req.params);
  let newReview = new Review(req.body.review);
  newReview.owner = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "Your review has been successfully added");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroy = async (req, res, next) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Your review has been successfully deleted");
  res.redirect(`/listings/${id}`);
};
