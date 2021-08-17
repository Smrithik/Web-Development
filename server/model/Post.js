const mongoose = require("mongoose");
const { use } = require("../routes/auth");

var postSchema = new mongoose.Schema(
  {
    username: { type: String },
    title: { type: String },
    userpost: { type: String },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Post", postSchema);
