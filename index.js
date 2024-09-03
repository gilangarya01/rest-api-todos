// Import require module
const express = require("express");
const todoRoutes = require("./routes/todo");

// Initialize express
const app = express();

// Routes
app.use("/todo", todoRoutes);

// Start server
const PORT = 8090;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
