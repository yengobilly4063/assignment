const jwt = require("jsonwebtoken")
const {User} = require("../models/user.model.js")

const userProtected =  async (req, res, next) => {
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
      token = req.headers.authorization.split(" ")[1]
      if(!token){
        return res.status(401).json({"error": "Not authorized, No token found"})
      }

      const decodedUserInfo = jwt.verify(token, process.env.JWT_SECRETE_KEY)

      const user = await User.findById(decodedUserInfo.id).select("-password")

      if(!user){
        return res.status(401).json({"error": "Invalid token"})
      }

      if(user) req.user = user
      next()
    } catch (error) {
      res.status(401).json({"error": "Invalid token"})
    }
  }else{
    return res.status(401).json({error: "Unauthorized"})
  }
  
}

module.exports = {userProtected}