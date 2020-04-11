const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const statusValidation = require("../middlewares/statusValidation");
const objectIdValidation = require("../middlewares/objectIdValidation");

const Task = mongoose.model("tasks");

module.exports = app => {
  app.post("/api/tasks", requireLogin, statusValidation, async (req, res) => {
    // console.log("tasks", req.body);
    const { title, description, status } = req.body;
    const survey = new Task({
      title,
      description,
      status,
      _user: req.user.id,
      dateMade: Date.now()
    });
    await survey.save();
    res.send("Suvery sucessful");
  });

  app.get("/api/tasks", requireLogin, async (req, res) => {
    const tasks = await Task.find({ _user: req.user.id });

    res.send(tasks);
  });

  app.get(
    "/api/tasks/:taskId",
    requireLogin,
    objectIdValidation,
    async (req, res) => {
      // console.log("TRY THIS OUT");
      const { taskId } = req.params;
      try {
        const task = await Task.findOne({ _user: req.user.id, _id: taskId });
        // console.log("Task", task);
        if (task === null) {
          res
            .status(401)
            .send("Task not found")
            .end();
        }
        res.send(task);
      } catch (err) {
        res
          .status(400)
          .send(err)
          .end();
      }
    }
  );

  app.delete("/api/tasks/:taskId", requireLogin, async (req, res) => {
    const { taskId } = req.params;
    const isIdValid = mongoose.Types.ObjectId.isValid(taskId);
    if (!isIdValid) {
      res
        .status(400)
        .send("Invalid ObjectId")
        .end();
    }
    try {
      await Task.findOneAndDelete({ _user: req.user.id, _id: taskId });

      res.send("The task has been deleted");
    } catch (err) {
      res
        .status(400)
        .send(err)
        .end();
    }
  });

  app.put(
    "/api/tasks/:taskId",
    requireLogin,
    statusValidation,
    objectIdValidation,
    async (req, res) => {
      const { taskId } = req.params;
      const { title, description, status } = req.body;
      try {
        const newTask = await Task.findOneAndUpdate(
          { _user: req.user.id, _id: taskId },
          {
            title,
            description,
            status
          }
        );

        res.send(newTask);
      } catch (err) {
        console.log(err);
        res
          .status(400)
          .send(err)
          .end();
      }
    }
  );
};
