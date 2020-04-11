const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: String,
  description: String,
  status: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateMade: Date
});

mongoose.model("tasks", taskSchema);
