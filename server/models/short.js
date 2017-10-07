const mongoose = require("mongoose");

const ShortSchema = new mongoose.Schema({
    "original_url": String,
    "short_url": String
});

const Short = mongoose.model("Short", ShortSchema);

module.exports = Short;