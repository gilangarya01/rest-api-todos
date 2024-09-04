// Import module
const express = require("express");
const fs = require("fs").promises;

// Initialize router
const router = express.Router();

// Utility
// Read Todos.json
const readTodosJSON = async () => {
  try {
    const data = await fs.readFile("data/todos.json");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Failed to read todos file");
  }
};

// Write Todos.json
const writeTodoJSON = async (todos) => {
  try {
    await fs.writeFile("data/todos.json", JSON.stringify(todos, null, 2));
  } catch (error) {
    throw new Error("Failed to write todos file");
  }
};

// Get all todos
router.get("/get/all", async (req, res) => {
  try {
    // Get data todos
    const todos = await readTodosJSON();

    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve todos" });
  }
});

// Get todos with id
router.get("/get/:id", async (req, res) => {
  try {
    // Get id from params
    let { id } = req.params;
    // Get data todos
    const data = await readTodosJSON();
    // Filter data according to params id
    const todos = data.filter((todo) => todo.id == id);

    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve todos" });
  }
});

// Add todos
router.post("/add/:title/:description", async (req, res) => {
  try {
    // Get data todos
    const todos = await readTodosJSON();
    // Get title and description from params
    let { title, description } = req.params;
    // Initialize new todos
    let newTodos = {
      id: Math.floor(Math.random() * 1000000),
      title: title,
      description: description,
      due_date: Date.now(),
      completed: false,
    };

    // Add new todos to array todos
    todos.push(newTodos);
    // Write todos to file json
    await writeTodoJSON(todos);

    res.send(JSON.stringify({ msg: "Data todos saved", todo: newTodos }));
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve todos" });
  }
});

// Delete todos
router.delete("/delete/:id", async (req, res) => {
  try {
    const data = await readTodosJSON();
    const { id } = req.params;
    const todos = data.filter((todo) => todo.id != id);
    await writeTodoJSON(todos);
    res.send({ msg: "Data todos deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve todos" });
  }
});

// Update todos
router.put("/update/:id/:title/:description", async (req, res) => {
  try {
    const datas = await readTodosJSON();
    const { id, title, description } = req.params;
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve todos" });
  }
});

module.exports = router;
