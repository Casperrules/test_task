import express from 'express';
import mongoose from 'mongoose';
import productRouters from './routers/productRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const dbUrl = "mongodb+srv://Adarsh:<password>@cluster0.5747a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use('/product',productRouters);

const port = 5000
app.listen(port,()=>{
    console.log(`server started at localhost:${port}`);
});