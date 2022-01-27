import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import Product from '../models/product.js';

const router = express.Router();

// get all products in the db
router.get("/",expressAsyncHandler(async (req,res)=>{
    const products = await Product.find({});
    res.send(products);
}));

// get specific product 
router.get("/:id",expressAsyncHandler(async (req,res)=>{
    const product = await Product.find({productId:req.params.id});
    if(product){
        res.send(product);
    }
    else{
        //give 404
        res.status(404).send({message:"product with given ID is not found"});
    }
}));

// insert one product to the DB
// assuming a post request from the form
router.post('/addProduct',expressAsyncHandler(async (req,res)=>{
    // assuming a json of data recieved as name newProduct
    const newProduct = req.body.newProduct;
    //if product exists, skip adding and return message
    const product = Product.find({productId: newProduct.productId})
    if (product.length>0){
        res.send({message: "product already in the database. skipping operation..."});
        return
    }
    if (newProduct){
        var prod = new Product();
        prod.productId = newProduct.productId;
        prod.productName = newProduct.productName;
        prod.price = newProduct.price;
        prod.save((err,data)=>{
            if(err){
                console.error(err);
            }
            else{
                res.status(200).send("inserted")
            }
        })
    }
}));

// delete product with given product id
router.get('/deleteProduct/:id',expressAsyncHandler((req,res)=>{
    //check if the product actually exists in the table
    const product = Product.find({productId:req.params.id});
    if(product == null){
        res.send({message:"product not in database. skipping delete ..."})
        return
    }
    Product.deleteOne({productId:req.params.id}, (err,_)=>{
       if(err){
        res.send({message:"cannot dedlete data from DB due to error : "+err});
       }
       else{
           res.send({message:"deleted"})
       }
    });
}));

// updating values of a product in DB where product id is body.product.productId
router.post('/updateProduct',expressAsyncHandler(async (req,res)=>{
    const updatedProductValue = req.body.updatedProduct
    Product.updateOne({productId: updatedProductValue.productId}, updatedProductValue, (err,_)=>{
        if(err){
            res.send({message:"error updating values due to error: "+err});
        }
        else{
            res.send({message:"updated"})
        }

    });

    // assuming that product Id is same , if product Id can also be updated, will need to specify based on what to update
} ));

export default router