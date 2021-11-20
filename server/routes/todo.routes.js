const express = require("express")
const { createTodo, getAllUserTodos, getSingleTodo, deleteTodo, updateTodo } = require("../controllers/todo.controller")

const router = express.Router()

router.get("/", getAllUserTodos)
router.post("/", createTodo)
router.get("/:id", getSingleTodo)
router.patch("/:id", updateTodo)
router.delete("/:id", deleteTodo)

module.exports = router