const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.get("/getTodos", async (req, res) => {
  try {
    const Todos = await Todo.find({});
    res.status(200).json(Todos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/getTodo/:_id", async (req, res) => {
  try {
    const findOne = await Todo.findById(req.params._id);
    if (findOne) return res.status(200).json(findOne);
    throw new Error("Id not found");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/addTodo", async (req, res) => {
  const { name, description, date } = req.body;
  const errors = [];
  try {
    for (let key in (ob = { name, description, date })) {
      if (!ob[key])
        errors.push({
          keyVal: `${key}ValidationErr`,
          errMessage: `${key} is undefined`,
        });
    }
    if (errors.length) throw new Error("Something went wrong");
    const createTodo = await new Todo({
      name,
      description,
      date,
    }).save();
    res.status(201).json(createTodo);
  } catch (error) {
    res.status(400).json({ error: error.message, errors });
  }
});

router.put("/editTodo/:_id", async (req, res) => {
  const { name, description, date } = req.body;
  const errors = [];
  try {
    const findOne = await Todo.findById(req.params._id);
    if (findOne) {
      let updatedKeys = {};
      for (let key in (ob = { name, description, date })) {
        if (!ob[key])
          errors.push({
            keyVal: `${key}ValidationErr`,
            errMessage: `${key} is undefined`,
          });
        else Object.assign(updatedKeys, { [key]: ob[key] });
      }
      if (errors.length) throw new Error("Something went wrong");
      const updateOne = await Todo.findByIdAndUpdate(req.params._id, {
        $set: updatedKeys,
      });

      res.status(201).json({ updated: true, updateOne });
    }
  } catch (error) {
    res.status(400).json({ error: error.message, errors });
  }
});

router.delete("/deleteTodo/:_id", async (req, res) => {
  try {
    const findOne = await Todo.findById(req.params._id);
    if (findOne) {
      await Todo.findByIdAndDelete(req.params._id);
      return res.status(200).json({ deleted: "ok" });
    }

    throw new Error("data to delete not found");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
