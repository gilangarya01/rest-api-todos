// Import require module
const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo");

// Initialize express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/todos", todoRoutes);

// Start server
const PORT = 8090;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
