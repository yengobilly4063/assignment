const { Todo } = require("../models/todo.model")

const createTodo = async (req, res, next) => {
    const {title, description} = req.body

    const todo = await Todo.create({title, description, userId: req.user.id})

    if(!todo){
        res.status(400),
        res.json({error: "Todo creation operation failed"})
    }

    return res.json(todo)
}

const getSingleTodo = async (req, res, next) => {
    const {id} = req.params

    const todo = await Todo.findById(id)

    if(!todo){
        res.status(400)
        return res.json({error: "Todo not found"})
    }

    return res.json(todo)
}

const getAllUserTodos = async (req, res, next) => {
    const todo = await Todo.find({userId: req.user.id})

    if(!todo){
        res.status(400)
        return res.json({error: "Todo not found"})
    }

    return res.json(todo)
}

const updateTodo = async (req, res, next) => {
    const {title, description} = req.body
    const {id} = req.params

    const todo = await Todo.findById(id)

    if(!todo){
        res.status(400)
        return res.json({error: "Todo not found"})
    }

    todo.title = title
    todo.description = description

    await Todo.updateOne({_id: id}, {title, description}).then(() => {
        res.json(todo)
    }).catch((error) => {
        res.status(400);
        return res.json({error: "Save operation failed"})
    })

}


const deleteTodo = async (req, res, next) => {
    const {id} = req.params

    const todoToDelete = await Todo.findById(id);

    if(!todoToDelete){
        res.status(400)
        return res.json({error: "Todo not found"})
    }

    await Todo.deleteOne({_id: id}).then(() => {
        return res.json({deleted: true})
    }).catch((error) => {
        res.status(400);
        return res.json({error: "Delete operation failed"})
    })
}

module.exports = {
    createTodo,
    getSingleTodo,
    getAllUserTodos,
    deleteTodo,
    updateTodo
}