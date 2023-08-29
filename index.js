const express = require("express");
const bodyPaarser = require("body-parser");
const cors = require("cors");
const app = express()
app.use(bodyPaarser.urlencoded({extended : false}));
app.use(bodyPaarser.json());
app.use(cors());
const AuthRoute = require("./Controller/Auth.Controller");
const todoRoute = require("./Controller/Todo.Controller");
const ProductRoutes = require("./Controller/Product.Controller");

const mongoose = require("mongoose");
const Todo = require("./models");
const {generatePassword,validPassword} = require("./common");

mongoose.connect("mongodb://localhost:27017/todos",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.Connection;

// create a Todo

app.use("/Auth",AuthRoute);
app.use("/todo",todoRoute);
app.use("/Product",ProductRoutes);


app.listen(5000,() => {
    console.log("Server Running on 5000");
})