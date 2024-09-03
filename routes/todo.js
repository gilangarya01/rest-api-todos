// Import module
const express = require("express");
const fs = require("fs");

// Initialize router
const router = express.Router();

// Get all todos
router.get("/get/all", (req, res) => {
  try {
    let id = req.params;
    fs.readFile("data/todos.json", async (err, data) => {
      res.status(200).json(await JSON.parse(data));
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve todos" });
  }
});

// Get todos with id
router.get("/get/:id", (req, res) => {
  try {
    let params = req.params;
    fs.readFile("data/todos.json", async (err, data) => {
      let todos = await JSON.parse(data).filter(
        (todo) => todo.id === Number(params.id)
      );
      res.status(200).json(todos);
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve todos" });
  }
});

module.exports = router;
