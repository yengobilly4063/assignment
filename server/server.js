const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
require('dotenv').config()

// routes
const userRoutes = require("./routes/user.routes.js")
const todoRoutes = require("./routes/todo.routes.js")
const authRoutes = require("./routes/auth.routes.js")
const { userProtected } = require("./middlewares/auth.middleware.js")

const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });


app.use("/api/users", userProtected, userRoutes)
app.use("/api/todos", userProtected, todoRoutes)
app.use("/api/auth", authRoutes)

const PORT = 3005

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
})
