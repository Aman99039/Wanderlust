const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

Mongo_URL = "mongodb://127.0.0.1:27017/Wanderlust";

async function main() {
  await mongoose.connect(Mongo_URL);
}

main()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68820fdbc19db87669eb2a44",
  }));
  await Listing.insertMany(initData.data);
  console.log(`Data was initialized`);
};

initDB();
