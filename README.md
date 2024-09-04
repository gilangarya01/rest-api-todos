## REST API Todos with JSON

### Decription

This is a REST API for managing a Todos list using JSON as the data format. The API is built with Express.js and supports basic CRUD operations: Create, Read, Update, and Delete.

### Tech Stack

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### How To Use

Install Node Modules

```bash
npm install
```

Jalankan REST API dengan node js

```bash
node index.js
```

## Endpoints

- **GET /todos**  
  Retrieve all todos.

- **GET /todos/:id**  
  Retrieve a single todo by ID.

- **POST /todos**  
  Create a new todo.  
  _Body Parameters:_

  - `title`: String (required)
  - `description`: String

- **PUT /todos/:id**  
  Update a todo by ID.  
  _Body Parameters:_

  - `title`: String
  - `description`: String
  - `completed`: Boolean

- **DELETE /todos/:id**  
  Delete a todo by ID.

## Example Request

### Get All Todos

```bash
GET /todos
```

### Get Single Todos

```bash
GET /todos/1
```

### Create a Todo

```bash
POST /todos
{
  "title": "Buy groceries",
  "description": "Milk, Bread, Eggs"
}
```

### Update a Todo

```bash
PUT /todos/1
{
  "title": "Buy groceries",
  "description": "Milk, Bread, Eggs",
  "completed": true
}
```

### Delete a Todo

```bash
DELETE /todos/1
```
