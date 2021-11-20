const express = require("express")
const { getUser } = require("../controllers/user.controller")

const router = express.Router()

router.get("/me", getUser)

module.exports = router