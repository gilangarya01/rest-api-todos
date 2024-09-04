// Import module
const express = require("express");
const fs = require("fs").promises;

// Initialize router
const router = express.Router();

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
router.get("/", async (req, res) => {
  try {
    // Get data todos
    const todos = await readTodosJSON();

    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve todos" });
  }
});

// Get todos with id
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
  try {
    // Get data todos
    const todos = await readTodosJSON();
    // Get title and description from params
    const { title, description } = req.body;

    if (!title) {
      res.status(400).json({ error: "Title todos undefined" });
      return;
    }

    // Initialize new todos
    let newTodos = {
      id: Math.floor(Math.random() * 1000000),
      title: title,
      description: description ? description : "",
      due_date: Date.now(),
      completed: false,
    };

    // Add new todos to array todos
    todos.push(newTodos);
    // Write todos to file json
    await writeTodoJSON(todos);

    res
      .status(200)
      .send(JSON.stringify({ msg: "Data todos saved", todo: newTodos }));
  } catch (error) {
    res.status(400).json({ error: "Failed to added todos" });
  }
});

// Delete todos
router.delete("/:id", async (req, res) => {
  try {
    // Get data todos
    const data = await readTodosJSON();
    // Get id from params
    const { id } = req.params;
    // Filter to remove data that is the same as id
    const todos = data.filter((todo) => todo.id != id);
    // Write todos to file json
    await writeTodoJSON(todos);

    res.status(200).send({ msg: "Data todos deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to deleted todos" });
  }
});

// Update todos
router.put("/:id", async (req, res) => {
  try {
    // Get data todos
    const todos = await readTodosJSON();
    // Get id, title, dan description from params
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Update data todos according to id params
    todos.forEach((todo) => {
      if (todo.id == id) {
        todo.title = title ? title : todo.title;
        todo.description = description ? description : todo.description;
        todo.completed = completed ? completed : todo.completed;
        // Save data updated
        updateTodos = todo;
      }
    });

    if (updateTodos) {
      // Write todos to file json
      await writeTodoJSON(todos);
      res.status(200).send({ msg: "Data todos updated", todo: updateTodos });
    } else {
      res.status(404).send({ msg: "Todo not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to updated todos" });
  }
});

module.exports = router;
