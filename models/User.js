const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  auth0Id: String
});

mongoose.model("users", userSchema);
