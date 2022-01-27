import express from 'express';
import mongoose from 'mongoose';
import router from './routers/productRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const dbUrl = "mongodb://localhost:27017"

mongoose.connect(dbUrl);

app.use('/product',router);

app.get('/',(req,res)=>{
    res.send("server running")
})

const port = 5000
app.listen(port,()=>{
    console.log(`server started at localhost:${port}`);
});