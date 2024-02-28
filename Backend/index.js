import  Express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import {PORT,mongoURL} from "./config.js";
import booksRoute from './routes/bookRoute.js'

const app = Express();
app.use(Express.json())
app.use(cors())
app.use('/books',booksRoute);
app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send('Welcome all')
})

mongoose.connect(mongoURL).then(()=>{app.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`)
    })}).catch((err)=>
    console.log(`Hi there is ${err}`));

