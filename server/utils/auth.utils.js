const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword)
}

const generateToken = async (id, name) => {
    return await jwt.sign({id, name}, process.env.JWT_SECRETE_KEY, {expiresIn: "30d"})
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken
}
  