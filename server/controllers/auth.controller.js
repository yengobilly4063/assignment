const { User } = require("../models/user.model");
const { generateToken, comparePassword, hashPassword } = require("../utils/auth.utils");

const loginUser = async (req, res, next) => {
    const {email, password} = req.body;

    const userExists = await User.findOne({email: email})

    if(!userExists){
        res.status(400)
        return res.json({error: "Invalid credentials"})
    }

    const passwordVerified = await comparePassword(password, userExists.password)

    if(!passwordVerified){
        res.status(400);
        return res.json({error: "Invalid credentials"})
    }

    const {_id, name} = userExists;
    const token = await generateToken(_id, name)
    res.json({token: token})
}

const registerUser = async (req, res, next) => {
    const {name, email, password} = req.body
    try {

        const userExists = await User.findOne({email: email})
        if(userExists){
            res.status(400)
            return res.json({error: `User with email already exists`})
        }
        
        const user = await User.create({
            name, email, 
            password: await hashPassword(password)
        })
        
        if(user){
            delete user.password
            return res.send(user)
        }
    } catch (error) {
        console.log(error);
    }   
}

module.exports = {
    registerUser, 
    loginUser
}