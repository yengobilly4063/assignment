const mongoose = require("mongoose")
const {Schema} = mongoose

const todoSchema = new Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: String
    },
    userId: {
        type: String, required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

const Todo = mongoose.model("todos", todoSchema)

module.exports = {Todo}