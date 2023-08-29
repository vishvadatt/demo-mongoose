const router = require("express").Router();
const {generatePassword,validPassword} = require("../common");
const {Todo} = require("../models");
const Joi = require("joi");

const userSchema = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().required(),
    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).max(10).required(),
    Gender : Joi.string(),
    Designation : Joi.string(),
});

router.post("/create-todo", async (req,res) => {
    try {
        let bodyData = req.body
        const {error,value} = userSchema.validate(bodyData);
        console.log("err...",error);
        if(error){
            return res.status(400).json({ error: error.details[0].message });
        }

        const findOneTodo = await Todo.findOne({email : req.body.email});
        
        if(findOneTodo !== null){
            return res.status(200).json({message : "Email Address Already Exist Please try to another one"})
        }
        const newPassword = await generatePassword(bodyData.password)
        bodyData.password = newPassword
        console.log(bodyData);
        const todo = new Todo(bodyData)
        console.log(todo);
        const response = await todo.save();
    
        res.status(200).json(response)
    } catch (e) {
        console.log(e);
    }
})


router.get("/get-todos", async (req,res) => {
    try {
        console.log(req.query);
        const {gender,Designation} = req.query
        let query =  {}
        // 1st try to get All Data
        // const result = await Todo.find();

        // 2nd try with Filter and search
        const search = req.query.search;
        if(gender){
            query["Gender"] = gender
        }
        
        if(Designation){
            query["Designation"] = Designation
        }

        if(search){
            query["name"] = { "$regex" : search, '$options' : "i"} 
        }

        
        const result = await Todo.aggregate([
            {
                $match : query
            }
        ])
        res.status(200).json(result)
    } catch (e) {
        console.log(e);
    }
});

router.get("/get-todo/:id" ,async(req,res) => {
    try {
        const id = req.params.id;
        const result = await Todo.findById(id);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
    }
});

router.put("/update-todo/:id",async(req,res) => {
    try {
        const id = req.params.id
        const result = await Todo.findByIdAndUpdate(id,req.body,{new : true});
        if(!result){
            return res.status(404).json({message : "Todo not found"});
        }
        res.status(200).json(result)
    } catch (e) {
        console.log(e);
    }
});

router.delete("/delete-todo/:id", async(req,res) => {
    try {
        const id = req.params.id;
        const result = await Todo.findByIdAndDelete(id);
        res.status(200).json(result)
    } catch (e) {
        console.log(e);
    }
})


module.exports = router