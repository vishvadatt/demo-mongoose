const router = require("express").Router();
const {Todo} = require("../models");
const {generatePassword,validPassword} = require("../common");
const jwt = require("jsonwebtoken");

router.post("/login",async (req,res) => {
    try {
        const findOneTodo = await Todo.findOne({email : req.body.email})
        
        if(findOneTodo !== null){
            console.log(findOneTodo.password);
            const checkPass = await validPassword(findOneTodo.password,req.body.password);
            
            if(!checkPass){
                return res.status(200).json({message : "Password Not Match"})
            }
            const secretKey = "secret";
            const payload = { userId : findOneTodo._id,name : findOneTodo.name, email : findOneTodo.email}
            const token = jwt.sign(payload,secretKey);
            
            const response = {
                token : token,
                userDetails : findOneTodo
            }
            delete findOneTodo?.userDetails?.password
            res.status(200).json(response);

        }else{
            return res.status(200).json({message : "User Not Found With this Email Address"})
        }

    } catch (e) {
        console.log(e);
    }
});

module.exports = router;