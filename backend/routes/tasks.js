const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ADD task
router.post("/", async (req, res) => {
  try {
    const task = new Task({
      task: req.body.task,
      completed: false,
    });

    const saved = await task.save();
    res.send(saved);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// UPDATE task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.send({ message: "Deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
