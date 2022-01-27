import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import Product from '../models/product';

const router = express.Router();

// get all products in the db
router.get("/",expressAsyncHandler(async (req,res)=>{
    const products = await Product.find({});
    res.send(products);
}));

// get specific product 
router.get("/:id",expressAsyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);
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
    if (product){
        res.send({message: "product already in the database. skipping operation..."});
        return
    }
    if (newProduct){
        Product.create(newProduct,(err,res)=>{
            if(err) res.send({message:"could not save data. try again due to error:"+err});
        });
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
    Product.deleteOne({productId:req.params.id}, (err,res)=>{
       if(err) res.send({message:"cannot dedlete data from DB due to error : "+err});
    });
}));

// updating values of a product in DB where product id is body.product.productId
router.post('/updateProduct',expressAsyncHandler(async (req,res)=>{
    const updatedProductValue = req.body.updatedProduct
    Product.updateOne({productId: updatedProductValue.productId}, updatedProductValue, (err,res)=>{
        if(err) res.send({message:"error updating values due to error: "+err});
    }); 
    // assuming that product Id is same , if product Id can also be updated, will need to specify based on what to update
} ));

export default router