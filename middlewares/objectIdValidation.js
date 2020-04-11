const mongoose = require("mongoose");
module.exports = (req, res, next) => {
  const { taskId } = req.params;
  const isIdValid = mongoose.Types.ObjectId.isValid(taskId);
  if (!isIdValid) {
    res
      .status(400)
      .send("Invalid ObjectId")
      .end();
  }
  next();
};
