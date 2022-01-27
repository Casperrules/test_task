import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId: {type:String},
    productName: {type:String},
    price: {type:String},
})

const Product = mongoose.model('Product',productSchema);

export default Product;