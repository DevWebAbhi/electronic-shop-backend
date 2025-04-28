const express = require("express");

const routes = express.Router();

const {productModel,cartModel} = require("../models/productModel");

routes.get("/",async(req,res)=>{
    try {
        const products = await productModel.find();
        return res.status(200).send({message:"data fetched sucessfully",products});
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"something went wrong"});
    }
})

routes.post("/",async(req,res)=>{
    try {
        const {name,price,quantity,power,category}=req.body;
        if(!name || !price || !quantity ||!power || !category){
            return res.status(400).send({message:"please fill all fields"});
        }
        /*await productModel.insertOne({
            name,price,quantity,power,category
        })*/

        const newProduct = new productModel({
            name,price,quantity,power,category
        });

        await newProduct.save();

        return res.status(201).send({message:"product created sucessfully",createdProducr:newProduct});

    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"something went wrong"});
    }
})

routes.put("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send({message:"please send id as params"});
        }

        const {name,price,quantity,power,category}=req.body;
        if(!name || !price || !quantity ||!power || !category){
            return res.status(400).send({message:"please fill all fields"});
        }
        const updatedProduct = await productModel.findByIdAndUpdate({_id:id},{name,price,quantity,power,category});
        if(!updatedProduct){
            return res.status(404).send({message:"product not found"});
        }
        return res.status(200).send({message:"product updated sucessfully"});
    } catch (error) {
        return res.status(500).send({message:"something went wrong"});
    }
})


routes.delete("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send({message:"please send id as params"});
        }
        const deletedProduct = await productModel.findByIdAndDelete({_id:id});
        if(!deletedProduct){
            return res.status(404).send({message:"product not found"});
        }
        return res.status(200).send({message:"product deleted sucessfully"});
    } catch (error) {
        return res.status(500).send({message:"something went wrong"});
    }
})



module.exports = routes;