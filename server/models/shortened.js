const mongoose = require("mongoose");

const ShortenedSchema = new mongoose.Schema({
    "original_url": String,
    "short_url": String
});

const Shortened = mongoose.model("Shortened", ShortenedSchema);

module.exports = Shortened;