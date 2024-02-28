
import express  from "express";
import {Book} from '../models/bookModel.js';

const router = express.Router();


router.post('/',async(req,res)=>{

    try{
        if(!req.body.title||
            !req.body.author||
            !req.body.publishYear){
                return res.status(400).send({
                    message:'Not All feilds received'
                });
            }
            const newBook ={
                title:req.body.title,
                author:req.body.author,
                publishYear:req.body.publishYear,
            }
            const book = await Book.create(newBook);
            return res.status(200).send(book);
        }
        catch(err){
            console.log(err);
        }
         
})

router.get('/:id',(req,res)=>{
    const {id}=req.params;
    Book.findById(id).then((result)=>{
        if(result) return res.send(result);
        return res.json({message:"No Book Found"})
    }).catch((err)=>{console.log(err)})
})

router.get('/',(req,res)=>{
    Book.find({}).then((result)=>{
       return res.json({count:result.length,
    data:result})
    }).catch((err)=>{console.log(err)})
})


router.put('/:id',async(req,res)=>{

    try{
        if(!req.body.title||
            !req.body.author||
            !req.body.publishYear){
                return res.status(400).send({
                    message:'Not All feilds received'
                });
            }
         
            const id = req.params.id;
            const result= await Book.findByIdAndUpdate(id,req.body)
            if(!result)return res.json({message:"not updated"});
            else res.json({message:"The book is updated"});
        }
        catch(err){
            console.log(err);
        }
         
})
router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    Book.findByIdAndDelete(id).then((result)=>{
        if(result)return res.json({message:"Book is Deleted"});
        return res.json({message:"Book is not Deleted"});
    }).catch((err)=>{console.log(err)})
})

export default router;
  