const express = require("express");

require("dotenv").config();

const mongoose = require("mongoose");

const routes = require("./controllers/routes");

const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(express.json());



app.get("/",(req,res)=>{
    res.send("This is eletronic shop backend")
})

app.use("/products",routes);

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("db connected sucessfully")
    app.listen(3232,()=>{
        console.log("server connected sucessfully");
    })
}).catch((err)=>{
    console.log(err)
})

