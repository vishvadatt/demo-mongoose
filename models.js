const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    Gender : String,
    Designation : String
});


const productSchema = new mongoose.Schema({
    productName : String,
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Todo"
    },
    Qty : String,
    Brand : String,
    Category : String
})


const Todo = mongoose.model('Todo',todoSchema);
const Product = mongoose.model('Product',productSchema);

module.exports = {Todo,Product};