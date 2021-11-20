const {User} = require("../models/user.model.js")
const { hashPassword } = require("../utils/auth.utils.js")

const getUser = async (req, res, next) => {
    return res.json(req.user) 
}

module.exports = {
    getUser
}