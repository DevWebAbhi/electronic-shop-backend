const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name:{type:String,required:true,trim:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true,default:0},
    power:{type:Number,required:true},
    category:{type:String,required:true,enum:["ac","iron-box","fridge","cooler","washing machine","mobile"]}
})


const productModel = mongoose.model("gadgets",schema);
const cartModel = "Model";

module.exports = {productModel,cartModel};

