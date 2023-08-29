const jwt = require("jsonwebtoken");
const {ObjectId} = require("mongodb");
const { Todo } = require("../models");

const Protect = async (req,res,next) => {
    console.log("Check Token",req.headers.authorization);
    let token;
    let message = "Not Authorized to access this route."
    let msg = "The user belonging to this token does not exist."

    // check header for authorization
    if(req.headers.authorization){
        if(req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1];
        }else{
            token = req.headers.authorization
        }
    }

    if(!token){
        res.status(200).json({message : message})
    }

    try {
        const decoded = jwt.verify(token,"secret");
        const user = await Todo.findById(decoded.userId);
        console.log(user);
        if(user){
            req.user = user
            next()
        }
    } catch (e) {
        console.log("e",e);
    }

    
}

module.exports = {
    Protect
}