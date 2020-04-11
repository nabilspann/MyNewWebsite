const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupTasksSchema = new Schema({
  //   auth0Id: String
});

mongoose.model("groupTasks", groupTasksSchema);
